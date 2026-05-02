"""
NightDesk.agency — Performance Optimization Engine
====================================================
Monitors campaign performance across Google Ads, Facebook/Meta Ads, and Microsoft
Advertising. Tracks ROAS, Cost Per Booking, Core Web Vitals, and booking conversion
rates. Fires alerts for underperforming campaigns and generates weekly reports.

Usage:
    python performance_optimization_engine.py --mode [full|fetch|alert|report|vitals]

Requirements:
    pip install google-ads facebook-business requests python-dotenv

Configuration:
    Copy .env.example to .env and fill in your API credentials.
"""

import os
import json
import argparse
import datetime
from pathlib import Path
from typing import Optional

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

PROPERTY_NAME = os.getenv("PROPERTY_NAME", "NightDesk Hotel")
SITE_URL = os.getenv("SITE_URL", "https://nightdesk.agency")
ALERT_EMAIL = os.getenv("ALERT_EMAIL", "hello@nightdesk.agency")

# Google Ads
GOOGLE_ADS_CUSTOMER_ID = os.getenv("GOOGLE_ADS_CUSTOMER_ID", "")
GOOGLE_ADS_DEVELOPER_TOKEN = os.getenv("GOOGLE_ADS_DEVELOPER_TOKEN", "")
GOOGLE_ADS_CREDENTIALS_FILE = os.getenv("GOOGLE_ADS_CREDENTIALS_FILE", "google_ads_credentials.yaml")

# Meta (Facebook / Instagram)
META_ACCESS_TOKEN = os.getenv("META_ACCESS_TOKEN", "")
META_AD_ACCOUNT_ID = os.getenv("META_AD_ACCOUNT_ID", "")  # format: act_XXXXXXXXX

# Microsoft Advertising (Bing)
BING_CLIENT_ID = os.getenv("BING_CLIENT_ID", "")
BING_CLIENT_SECRET = os.getenv("BING_CLIENT_SECRET", "")
BING_REFRESH_TOKEN = os.getenv("BING_REFRESH_TOKEN", "")
BING_CUSTOMER_ID = os.getenv("BING_CUSTOMER_ID", "")
BING_ACCOUNT_ID = os.getenv("BING_ACCOUNT_ID", "")

OUTPUT_DIR = Path(os.getenv("OUTPUT_DIR", "performance_output"))
REPORTS_DIR = OUTPUT_DIR / "reports"

# Performance thresholds — trigger alerts if breached
THRESHOLDS = {
    "min_roas": 2.0,           # Alert if ROAS drops below this
    "max_cost_per_booking": 80.0,  # Alert if CPB exceeds this (USD)
    "min_ctr_percent": 2.0,    # Alert if CTR falls below this
    "max_cpc_google": 4.0,     # Alert if Google CPC exceeds this (USD)
    "max_cpc_bing": 2.5,       # Alert if Bing CPC exceeds this (USD)
    "min_conversion_rate": 0.8,  # Alert if booking conversion rate below this %
}

# Booking ADR for ROAS calculation (set to your average)
AVERAGE_BOOKING_VALUE_USD = float(os.getenv("AVERAGE_BOOKING_VALUE_USD", "180"))


# ---------------------------------------------------------------------------
# Data Models
# ---------------------------------------------------------------------------

class CampaignMetrics:
    """Holds standardised performance metrics for any channel."""

    def __init__(
        self,
        channel: str,
        campaign_name: str,
        impressions: int = 0,
        clicks: int = 0,
        spend: float = 0.0,
        conversions: float = 0.0,
        conversion_value: float = 0.0,
    ):
        self.channel = channel
        self.campaign_name = campaign_name
        self.impressions = impressions
        self.clicks = clicks
        self.spend = spend
        self.conversions = conversions
        self.conversion_value = conversion_value

    @property
    def ctr(self) -> float:
        return (self.clicks / self.impressions * 100) if self.impressions else 0.0

    @property
    def cpc(self) -> float:
        return (self.spend / self.clicks) if self.clicks else 0.0

    @property
    def cost_per_booking(self) -> float:
        return (self.spend / self.conversions) if self.conversions else 0.0

    @property
    def roas(self) -> float:
        return (self.conversion_value / self.spend) if self.spend else 0.0

    @property
    def conversion_rate(self) -> float:
        return (self.conversions / self.clicks * 100) if self.clicks else 0.0

    def to_dict(self) -> dict:
        return {
            "channel": self.channel,
            "campaign": self.campaign_name,
            "impressions": self.impressions,
            "clicks": self.clicks,
            "spend": round(self.spend, 2),
            "conversions": round(self.conversions, 1),
            "conversion_value": round(self.conversion_value, 2),
            "ctr_pct": round(self.ctr, 2),
            "cpc": round(self.cpc, 2),
            "cpb": round(self.cost_per_booking, 2),
            "roas": round(self.roas, 2),
            "conversion_rate_pct": round(self.conversion_rate, 2),
        }


# ---------------------------------------------------------------------------
# Google Ads Fetcher
# ---------------------------------------------------------------------------

def fetch_google_ads_metrics(days: int = 7) -> list[CampaignMetrics]:
    """
    Fetch campaign-level metrics from Google Ads API.
    Returns a list of CampaignMetrics objects.
    """
    if not GOOGLE_ADS_CUSTOMER_ID or not os.path.exists(GOOGLE_ADS_CREDENTIALS_FILE):
        print("  [Google Ads] Credentials not configured. Using demo data.")
        return [
            CampaignMetrics("Google Ads", "NightDesk — Search", 12400, 486, 312.50, 8.2, 1476.0),
            CampaignMetrics("Google Ads", "NightDesk — Hotel Ads", 8200, 310, 198.00, 5.5, 990.0),
            CampaignMetrics("Google Ads", "NightDesk — Remarketing", 22000, 190, 87.00, 3.1, 558.0),
        ]

    try:
        from google.ads.googleads.client import GoogleAdsClient
        client = GoogleAdsClient.load_from_storage(GOOGLE_ADS_CREDENTIALS_FILE)
        ga_service = client.get_service("GoogleAdsService")

        end_date = datetime.date.today()
        start_date = end_date - datetime.timedelta(days=days)

        query = f"""
            SELECT
                campaign.name,
                metrics.impressions,
                metrics.clicks,
                metrics.cost_micros,
                metrics.conversions,
                metrics.conversions_value
            FROM campaign
            WHERE segments.date BETWEEN '{start_date.isoformat()}' AND '{end_date.isoformat()}'
            ORDER BY metrics.cost_micros DESC
        """

        results = []
        stream = ga_service.search_stream(
            customer_id=GOOGLE_ADS_CUSTOMER_ID,
            query=query,
        )
        for batch in stream:
            for row in batch.results:
                m = row.metrics
                results.append(CampaignMetrics(
                    channel="Google Ads",
                    campaign_name=row.campaign.name,
                    impressions=m.impressions,
                    clicks=m.clicks,
                    spend=m.cost_micros / 1_000_000,
                    conversions=m.conversions,
                    conversion_value=m.conversions_value,
                ))
        return results

    except Exception as e:
        print(f"  [Google Ads] Fetch error: {e}")
        return []


# ---------------------------------------------------------------------------
# Meta (Facebook/Instagram) Fetcher
# ---------------------------------------------------------------------------

def fetch_meta_metrics(days: int = 7) -> list[CampaignMetrics]:
    """
    Fetch campaign-level metrics from the Meta Marketing API.
    Returns a list of CampaignMetrics objects.
    """
    if not META_ACCESS_TOKEN or not META_AD_ACCOUNT_ID:
        print("  [Meta Ads] Credentials not configured. Using demo data.")
        return [
            CampaignMetrics("Meta Ads", "NightDesk — Retargeting", 45000, 320, 198.00, 5.2, 936.0),
            CampaignMetrics("Meta Ads", "NightDesk — Lookalike", 38000, 210, 152.00, 3.8, 684.0),
        ]

    try:
        import requests
        end_date = datetime.date.today()
        start_date = end_date - datetime.timedelta(days=days)

        url = f"https://graph.facebook.com/v19.0/{META_AD_ACCOUNT_ID}/campaigns"
        params = {
            "access_token": META_ACCESS_TOKEN,
            "fields": "name,insights{impressions,clicks,spend,actions,action_values}",
            "time_range": json.dumps({
                "since": start_date.isoformat(),
                "until": end_date.isoformat(),
            }),
        }
        resp = requests.get(url, params=params, timeout=30)
        resp.raise_for_status()
        data = resp.json().get("data", [])

        results = []
        for campaign in data:
            insights = (campaign.get("insights", {}).get("data") or [{}])[0]
            actions = {a["action_type"]: float(a["value"]) for a in insights.get("actions", [])}
            action_values = {a["action_type"]: float(a["value"]) for a in insights.get("action_values", [])}
            conversions = actions.get("purchase", 0.0)
            conversion_value = action_values.get("purchase", conversions * AVERAGE_BOOKING_VALUE_USD)

            results.append(CampaignMetrics(
                channel="Meta Ads",
                campaign_name=campaign["name"],
                impressions=int(insights.get("impressions", 0)),
                clicks=int(insights.get("clicks", 0)),
                spend=float(insights.get("spend", 0)),
                conversions=conversions,
                conversion_value=conversion_value,
            ))
        return results

    except Exception as e:
        print(f"  [Meta Ads] Fetch error: {e}")
        return []


# ---------------------------------------------------------------------------
# Microsoft Advertising (Bing) Fetcher
# ---------------------------------------------------------------------------

def fetch_bing_metrics(days: int = 7) -> list[CampaignMetrics]:
    """
    Fetch campaign-level metrics from Microsoft Advertising.
    Returns a list of CampaignMetrics objects.
    """
    if not BING_CLIENT_ID or not BING_ACCOUNT_ID:
        print("  [Bing Ads] Credentials not configured. Using demo data.")
        return [
            CampaignMetrics("Bing Ads", "NightDesk — Search (Bing)", 5200, 218, 78.50, 3.4, 612.0),
        ]

    # Microsoft Advertising Python SDK integration point
    # Full implementation: https://docs.microsoft.com/en-us/advertising/guides/get-started-python
    print("  [Bing Ads] Bing SDK integration configured — extend fetch logic here.")
    return []


# ---------------------------------------------------------------------------
# Alert Engine
# ---------------------------------------------------------------------------

def check_thresholds(metrics_list: list[CampaignMetrics]) -> list[dict]:
    """Check all campaigns against performance thresholds. Returns alert list."""
    alerts = []
    for m in metrics_list:
        if m.spend < 1.0:
            continue  # Skip campaigns with negligible spend

        if m.roas < THRESHOLDS["min_roas"]:
            alerts.append({
                "severity": "HIGH",
                "channel": m.channel,
                "campaign": m.campaign_name,
                "metric": "ROAS",
                "value": m.roas,
                "threshold": THRESHOLDS["min_roas"],
                "message": f"ROAS {m.roas:.2f}x is below minimum {THRESHOLDS['min_roas']}x",
            })

        if 0 < m.cost_per_booking > THRESHOLDS["max_cost_per_booking"]:
            alerts.append({
                "severity": "HIGH",
                "channel": m.channel,
                "campaign": m.campaign_name,
                "metric": "CPB",
                "value": m.cost_per_booking,
                "threshold": THRESHOLDS["max_cost_per_booking"],
                "message": f"Cost Per Booking ${m.cost_per_booking:.2f} exceeds maximum ${THRESHOLDS['max_cost_per_booking']:.2f}",
            })

        if m.ctr < THRESHOLDS["min_ctr_percent"]:
            alerts.append({
                "severity": "MEDIUM",
                "channel": m.channel,
                "campaign": m.campaign_name,
                "metric": "CTR",
                "value": m.ctr,
                "threshold": THRESHOLDS["min_ctr_percent"],
                "message": f"CTR {m.ctr:.2f}% is below minimum {THRESHOLDS['min_ctr_percent']}%",
            })

        cpc_threshold = (
            THRESHOLDS["max_cpc_google"]
            if "Google" in m.channel
            else THRESHOLDS["max_cpc_bing"]
        )
        if m.cpc > cpc_threshold:
            alerts.append({
                "severity": "MEDIUM",
                "channel": m.channel,
                "campaign": m.campaign_name,
                "metric": "CPC",
                "value": m.cpc,
                "threshold": cpc_threshold,
                "message": f"CPC ${m.cpc:.2f} exceeds threshold ${cpc_threshold:.2f}",
            })

    return alerts


def print_alerts(alerts: list[dict]) -> None:
    """Print formatted alerts to stdout."""
    if not alerts:
        print("  All campaigns within threshold. No alerts.")
        return
    print(f"\n  {'='*50}")
    print(f"  ALERTS ({len(alerts)} found)")
    print(f"  {'='*50}")
    for a in sorted(alerts, key=lambda x: x["severity"]):
        icon = "🔴" if a["severity"] == "HIGH" else "🟡"
        print(f"  {icon} [{a['severity']}] {a['channel']} — {a['campaign']}")
        print(f"     {a['message']}")
    print()


# ---------------------------------------------------------------------------
# Weekly Performance Report
# ---------------------------------------------------------------------------

def generate_performance_report(all_metrics: list[CampaignMetrics]) -> Path:
    """Generate a weekly performance report in Markdown."""
    REPORTS_DIR.mkdir(parents=True, exist_ok=True)
    report_date = datetime.date.today().isoformat()
    report_path = REPORTS_DIR / f"performance_report_{report_date}.md"

    total_spend = sum(m.spend for m in all_metrics)
    total_conversions = sum(m.conversions for m in all_metrics)
    total_revenue = sum(m.conversion_value for m in all_metrics)
    total_clicks = sum(m.clicks for m in all_metrics)
    overall_roas = total_revenue / total_spend if total_spend else 0
    overall_cpb = total_spend / total_conversions if total_conversions else 0

    campaign_rows = ""
    for m in sorted(all_metrics, key=lambda x: x.roas, reverse=True):
        campaign_rows += (
            f"| {m.channel} | {m.campaign_name[:35]} | "
            f"${m.spend:.0f} | {m.conversions:.0f} | "
            f"${m.cost_per_booking:.0f} | {m.roas:.2f}x | {m.ctr:.1f}% |\n"
        )

    alerts = check_thresholds(all_metrics)
    alert_rows = ""
    for a in alerts:
        severity_icon = "🔴" if a["severity"] == "HIGH" else "🟡"
        alert_rows += f"- {severity_icon} **{a['channel']}** — {a['message']}\n"
    if not alert_rows:
        alert_rows = "- ✅ All campaigns within performance thresholds\n"

    ota_commission_rate = 0.18
    ota_equivalent_cost = total_revenue * ota_commission_rate
    commission_saved = ota_equivalent_cost - total_spend

    report = f"""# Weekly Performance Report
**Property:** {PROPERTY_NAME}
**Period:** Last 7 Days
**Report Date:** {report_date}
**Generated by:** NightDesk.agency Performance Optimization Engine

---

## Executive Summary

| Metric | Value |
|---|---|
| Total Ad Spend | ${total_spend:,.2f} |
| Total Direct Bookings | {total_conversions:.0f} |
| Total Direct Revenue | ${total_revenue:,.2f} |
| Overall ROAS | {overall_roas:.2f}x |
| Cost Per Booking | ${overall_cpb:.2f} |
| OTA Commission Saved | ${commission_saved:,.2f} |

---

## Campaign-Level Performance

| Channel | Campaign | Spend | Bookings | CPB | ROAS | CTR |
|---|---|---|---|---|---|---|
{campaign_rows}

---

## Alerts This Week

{alert_rows}

---

## Recommended Actions

- [ ] Review any HIGH severity alerts and adjust bids within 48 hours
- [ ] A/B test new ad copy on campaigns with CTR below {THRESHOLDS['min_ctr_percent']}%
- [ ] Reallocate budget from campaigns below {THRESHOLDS['min_roas']}x ROAS to top performers
- [ ] Confirm conversion tracking is firing on all booking confirmations
- [ ] Update negative keyword lists based on search term reports

---

## Next Week Budget Recommendation

Based on this week's performance:
- **Google Ads:** Maintain or increase budget on campaigns with ROAS > {THRESHOLDS['min_roas']}x
- **Meta Ads:** Refresh creative on campaigns running > 14 days (creative fatigue risk)
- **Bing Ads:** Review impression share — consider bid increases on high-intent terms

---

*Generated automatically by performance_optimization_engine.py*
*NightDesk.agency | {SITE_URL}*
"""
    report_path.write_text(report, encoding="utf-8")
    print(f"  Report saved: {report_path}")
    return report_path


# ---------------------------------------------------------------------------
# Core Web Vitals Monitor
# ---------------------------------------------------------------------------

def check_core_web_vitals(url: str = SITE_URL) -> dict:
    """
    Run a PageSpeed Insights API call to check Core Web Vitals.
    Requires PAGESPEED_API_KEY in environment.
    """
    api_key = os.getenv("PAGESPEED_API_KEY", "")
    if not api_key:
        print("  [Vitals] PAGESPEED_API_KEY not set. Skipping Core Web Vitals check.")
        return {}

    try:
        import requests
        endpoint = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed"
        params = {
            "url": url,
            "key": api_key,
            "strategy": "mobile",
            "category": ["performance", "seo"],
        }
        resp = requests.get(endpoint, params=params, timeout=60)
        resp.raise_for_status()
        data = resp.json()

        categories = data.get("lighthouseResult", {}).get("categories", {})
        audits = data.get("lighthouseResult", {}).get("audits", {})

        vitals = {
            "url": url,
            "performance_score": round(categories.get("performance", {}).get("score", 0) * 100),
            "seo_score": round(categories.get("seo", {}).get("score", 0) * 100),
            "lcp_ms": audits.get("largest-contentful-paint", {}).get("numericValue", 0),
            "cls": audits.get("cumulative-layout-shift", {}).get("numericValue", 0),
            "fid_ms": audits.get("max-potential-fid", {}).get("numericValue", 0),
            "ttfb_ms": audits.get("server-response-time", {}).get("numericValue", 0),
        }

        print(f"\n  Core Web Vitals — {url}")
        print(f"    Performance Score : {vitals['performance_score']}/100")
        print(f"    SEO Score         : {vitals['seo_score']}/100")
        print(f"    LCP               : {vitals['lcp_ms']:.0f}ms (target: <2500ms)")
        print(f"    CLS               : {vitals['cls']:.3f} (target: <0.1)")
        print(f"    TTFB              : {vitals['ttfb_ms']:.0f}ms (target: <800ms)")
        return vitals

    except Exception as e:
        print(f"  [Vitals] Error: {e}")
        return {}


# ---------------------------------------------------------------------------
# CLI Entry Point
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(
        description="NightDesk.agency Performance Optimization Engine"
    )
    parser.add_argument(
        "--mode",
        choices=["full", "fetch", "alert", "report", "vitals"],
        default="full",
        help="Execution mode (default: full — runs all tasks)",
    )
    parser.add_argument(
        "--days",
        type=int,
        default=7,
        help="Lookback window in days (default: 7)",
    )
    args = parser.parse_args()

    print("=" * 60)
    print("  NightDesk.agency — Performance Optimization Engine")
    print(f"  Property : {PROPERTY_NAME}")
    print(f"  Mode     : {args.mode}")
    print(f"  Window   : Last {args.days} days")
    print(f"  Date     : {datetime.date.today().isoformat()}")
    print("=" * 60)

    all_metrics: list[CampaignMetrics] = []

    if args.mode in ("full", "fetch", "alert", "report"):
        print("\n=== Fetching Campaign Metrics ===")
        all_metrics += fetch_google_ads_metrics(days=args.days)
        all_metrics += fetch_meta_metrics(days=args.days)
        all_metrics += fetch_bing_metrics(days=args.days)
        print(f"  Fetched {len(all_metrics)} campaigns across all channels.")

        totals = {
            "spend": sum(m.spend for m in all_metrics),
            "bookings": sum(m.conversions for m in all_metrics),
            "revenue": sum(m.conversion_value for m in all_metrics),
        }
        overall_roas = totals["revenue"] / totals["spend"] if totals["spend"] else 0
        print(f"\n  Totals: Spend ${totals['spend']:.2f} | "
              f"Bookings {totals['bookings']:.0f} | "
              f"ROAS {overall_roas:.2f}x")

    if args.mode in ("full", "alert"):
        print("\n=== Checking Performance Thresholds ===")
        alerts = check_thresholds(all_metrics)
        print_alerts(alerts)

    if args.mode in ("full", "report"):
        print("\n=== Generating Performance Report ===")
        generate_performance_report(all_metrics)

    if args.mode in ("full", "vitals"):
        print("\n=== Checking Core Web Vitals ===")
        check_core_web_vitals(SITE_URL)

    print("\nDone.")


if __name__ == "__main__":
    main()
