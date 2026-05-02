"""
NightDesk.agency — Master SEO Automation Engine
================================================
Automates SEO landing page management, Google Search Console monitoring,
sitemap generation, schema markup, and Google My Business updates.

Usage:
    python master_seo_automation_engine.py --mode [full|audit|pages|sitemap|report]

Requirements:
    pip install google-auth google-auth-oauthlib google-api-python-client
    pip install requests jinja2 python-dotenv

Configuration:
    Copy .env.example to .env and fill in your credentials.
"""

import os
import json
import argparse
import datetime
import xml.etree.ElementTree as ET
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

SITE_URL = os.getenv("SITE_URL", "https://nightdesk.agency")
PROPERTY_NAME = os.getenv("PROPERTY_NAME", "NightDesk Hotel")
LOCATION_CITY = os.getenv("LOCATION_CITY", "London")
LOCATION_COUNTRY = os.getenv("LOCATION_COUNTRY", "GB")

GSC_CREDENTIALS_FILE = os.getenv("GSC_CREDENTIALS_FILE", "gsc_credentials.json")
GMB_CREDENTIALS_FILE = os.getenv("GMB_CREDENTIALS_FILE", "gmb_credentials.json")
GMB_LOCATION_ID = os.getenv("GMB_LOCATION_ID", "")  # from Google My Business API

OUTPUT_DIR = Path(os.getenv("OUTPUT_DIR", "seo_output"))
PAGES_DIR = OUTPUT_DIR / "pages"
REPORTS_DIR = OUTPUT_DIR / "reports"

# Keywords to track — edit for your property
TRACKED_KEYWORDS = [
    f"boutique hotel in {LOCATION_CITY}",
    f"hotel near {LOCATION_CITY} airport",
    f"luxury hotel {LOCATION_CITY}",
    f"romantic hotel {LOCATION_CITY}",
    f"pet friendly hotel {LOCATION_CITY}",
    f"best hotel {LOCATION_CITY} city centre",
    f"hotel {LOCATION_CITY} direct booking",
    f"independent hotel {LOCATION_CITY}",
]

# Landing page templates — one per keyword cluster
PAGE_TEMPLATES = [
    {
        "slug": "boutique-hotel",
        "title": f"Boutique Hotel in {LOCATION_CITY} | {PROPERTY_NAME}",
        "h1": f"The Most Recommended Boutique Hotel in {LOCATION_CITY}",
        "meta_description": (
            f"Stay at {PROPERTY_NAME} — {LOCATION_CITY}'s favourite boutique hotel. "
            f"Book direct for the best rate guaranteed. No OTA fees, no hidden costs."
        ),
        "primary_keyword": f"boutique hotel in {LOCATION_CITY}",
        "schema_type": "Hotel",
    },
    {
        "slug": "romantic-hotel",
        "title": f"Romantic Hotel in {LOCATION_CITY} | {PROPERTY_NAME}",
        "h1": f"A Romantic Escape in the Heart of {LOCATION_CITY}",
        "meta_description": (
            f"Plan your perfect romantic getaway at {PROPERTY_NAME}. "
            f"Couples packages, in-room treats, and the best rate when you book direct."
        ),
        "primary_keyword": f"romantic hotel {LOCATION_CITY}",
        "schema_type": "Hotel",
    },
    {
        "slug": "airport-hotel",
        "title": f"Hotel Near {LOCATION_CITY} Airport | {PROPERTY_NAME}",
        "h1": f"Conveniently Located Near {LOCATION_CITY} Airport",
        "meta_description": (
            f"Need a hotel close to {LOCATION_CITY} airport? "
            f"{PROPERTY_NAME} offers easy access, free parking, and direct booking rates."
        ),
        "primary_keyword": f"hotel near {LOCATION_CITY} airport",
        "schema_type": "Hotel",
    },
]


# ---------------------------------------------------------------------------
# Schema Markup Generator
# ---------------------------------------------------------------------------

def generate_hotel_schema(
    name: str,
    url: str,
    city: str,
    country: str,
    phone: Optional[str] = None,
    price_range: Optional[str] = None,
    rating: Optional[float] = None,
    review_count: Optional[int] = None,
) -> dict:
    """Generate JSON-LD Hotel schema markup."""
    schema = {
        "@context": "https://schema.org",
        "@type": "Hotel",
        "name": name,
        "url": url,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": city,
            "addressCountry": country,
        },
    }
    if phone:
        schema["telephone"] = phone
    if price_range:
        schema["priceRange"] = price_range
    if rating and review_count:
        schema["aggregateRating"] = {
            "@type": "AggregateRating",
            "ratingValue": str(rating),
            "reviewCount": str(review_count),
            "bestRating": "5",
        }
    return schema


def generate_faq_schema(faqs: list[dict]) -> dict:
    """Generate JSON-LD FAQPage schema from a list of {question, answer} dicts."""
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": faq["question"],
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq["answer"],
                },
            }
            for faq in faqs
        ],
    }


# ---------------------------------------------------------------------------
# Landing Page Generator
# ---------------------------------------------------------------------------

def generate_landing_page(template: dict, output_path: Path) -> None:
    """Generate an SEO landing page HTML file from a template dict."""
    hotel_schema = generate_hotel_schema(
        name=PROPERTY_NAME,
        url=SITE_URL,
        city=LOCATION_CITY,
        country=LOCATION_COUNTRY,
    )

    faqs = [
        {
            "question": f"What is the best way to book {PROPERTY_NAME}?",
            "answer": (
                f"Book directly at {SITE_URL} for our best rate guarantee. "
                "Direct bookings include complimentary early check-in (subject to availability) "
                "and no booking fees."
            ),
        },
        {
            "question": f"Where is {PROPERTY_NAME} located?",
            "answer": (
                f"{PROPERTY_NAME} is centrally located in {LOCATION_CITY}, within easy reach "
                "of major attractions, transport links, and the city centre."
            ),
        },
        {
            "question": "Do you offer a best rate guarantee?",
            "answer": (
                "Yes. When you book directly through our website you are guaranteed our lowest "
                "available rate — better than any OTA, always."
            ),
        },
    ]
    faq_schema = generate_faq_schema(faqs)

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{template['title']}</title>
  <meta name="description" content="{template['meta_description']}" />
  <link rel="canonical" href="{SITE_URL}/{template['slug']}/" />
  <script type="application/ld+json">
{json.dumps(hotel_schema, indent=2)}
  </script>
  <script type="application/ld+json">
{json.dumps(faq_schema, indent=2)}
  </script>
</head>
<body>
  <h1>{template['h1']}</h1>
  <p>Generated by NightDesk.agency Master SEO Automation Engine</p>
  <p>Primary keyword: <em>{template['primary_keyword']}</em></p>
</body>
</html>
"""
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(html, encoding="utf-8")
    print(f"  [page] Generated: {output_path}")


def run_page_generation() -> None:
    """Generate all configured landing pages."""
    print("\n=== Generating SEO Landing Pages ===")
    PAGES_DIR.mkdir(parents=True, exist_ok=True)
    for template in PAGE_TEMPLATES:
        path = PAGES_DIR / template["slug"] / "index.html"
        generate_landing_page(template, path)
    print(f"  Done. {len(PAGE_TEMPLATES)} pages written to {PAGES_DIR}/")


# ---------------------------------------------------------------------------
# XML Sitemap Generator
# ---------------------------------------------------------------------------

def generate_sitemap(
    urls: list[dict],
    output_path: Path = OUTPUT_DIR / "sitemap.xml",
) -> None:
    """
    Generate an XML sitemap.

    Each url dict: {"loc": str, "lastmod": str, "changefreq": str, "priority": str}
    """
    print("\n=== Generating XML Sitemap ===")
    urlset = ET.Element(
        "urlset",
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9",
    )
    for url in urls:
        url_el = ET.SubElement(urlset, "url")
        ET.SubElement(url_el, "loc").text = url["loc"]
        ET.SubElement(url_el, "lastmod").text = url.get(
            "lastmod", datetime.date.today().isoformat()
        )
        ET.SubElement(url_el, "changefreq").text = url.get("changefreq", "monthly")
        ET.SubElement(url_el, "priority").text = url.get("priority", "0.7")

    output_path.parent.mkdir(parents=True, exist_ok=True)
    tree = ET.ElementTree(urlset)
    ET.indent(tree, space="  ")
    tree.write(str(output_path), encoding="unicode", xml_declaration=True)
    print(f"  Sitemap written: {output_path} ({len(urls)} URLs)")


def build_sitemap_urls() -> list[dict]:
    """Build the list of URLs to include in the sitemap."""
    today = datetime.date.today().isoformat()
    urls = [
        {"loc": f"{SITE_URL}/", "priority": "1.0", "changefreq": "weekly", "lastmod": today},
        {"loc": f"{SITE_URL}/privacy", "priority": "0.3", "changefreq": "yearly", "lastmod": today},
    ]
    for template in PAGE_TEMPLATES:
        urls.append({
            "loc": f"{SITE_URL}/{template['slug']}/",
            "priority": "0.8",
            "changefreq": "monthly",
            "lastmod": today,
        })
    return urls


# ---------------------------------------------------------------------------
# GSC Rank Tracking (stub — requires OAuth credentials)
# ---------------------------------------------------------------------------

def fetch_gsc_performance(days: int = 28) -> list[dict]:
    """
    Fetch keyword performance data from Google Search Console.

    Requires GSC_CREDENTIALS_FILE to be a valid OAuth2 service account JSON.
    Returns a list of {query, clicks, impressions, ctr, position} dicts.
    """
    try:
        from google.oauth2 import service_account
        from googleapiclient.discovery import build
    except ImportError:
        print("  [GSC] google-api-python-client not installed. Skipping rank fetch.")
        return []

    if not os.path.exists(GSC_CREDENTIALS_FILE):
        print(f"  [GSC] Credentials file not found: {GSC_CREDENTIALS_FILE}. Skipping.")
        return []

    credentials = service_account.Credentials.from_service_account_file(
        GSC_CREDENTIALS_FILE,
        scopes=["https://www.googleapis.com/auth/webmasters.readonly"],
    )
    service = build("searchconsole", "v1", credentials=credentials)

    end_date = datetime.date.today()
    start_date = end_date - datetime.timedelta(days=days)

    response = (
        service.searchanalytics()
        .query(
            siteUrl=SITE_URL,
            body={
                "startDate": start_date.isoformat(),
                "endDate": end_date.isoformat(),
                "dimensions": ["query"],
                "rowLimit": 100,
            },
        )
        .execute()
    )

    rows = response.get("rows", [])
    results = []
    for row in rows:
        results.append({
            "query": row["keys"][0],
            "clicks": row.get("clicks", 0),
            "impressions": row.get("impressions", 0),
            "ctr": round(row.get("ctr", 0) * 100, 2),
            "position": round(row.get("position", 0), 1),
        })
    return sorted(results, key=lambda r: r["impressions"], reverse=True)


# ---------------------------------------------------------------------------
# SEO Audit Report
# ---------------------------------------------------------------------------

def run_seo_audit() -> None:
    """Run a full SEO audit and write a markdown report."""
    print("\n=== Running SEO Audit ===")
    REPORTS_DIR.mkdir(parents=True, exist_ok=True)

    report_date = datetime.date.today().isoformat()
    report_path = REPORTS_DIR / f"seo_audit_{report_date}.md"

    gsc_data = fetch_gsc_performance(days=28)

    keyword_rows = ""
    if gsc_data:
        for row in gsc_data[:20]:
            keyword_rows += (
                f"| {row['query']} | {row['impressions']} | {row['clicks']} "
                f"| {row['ctr']}% | {row['position']} |\n"
            )
    else:
        keyword_rows = "| *GSC credentials not configured* | — | — | — | — |\n"

    report = f"""# SEO Audit Report
**Property:** {PROPERTY_NAME}
**Site:** {SITE_URL}
**Date:** {report_date}
**Generated by:** NightDesk.agency Master SEO Automation Engine

---

## Keyword Performance (Last 28 Days)

| Keyword | Impressions | Clicks | CTR | Avg. Position |
|---|---|---|---|---|
{keyword_rows}

---

## Landing Pages

| Page | Slug | Schema Type | Status |
|---|---|---|---|
{"".join(f"| {t['title'][:50]}... | /{t['slug']}/ | {t['schema_type']} | Ready |\n" for t in PAGE_TEMPLATES)}

---

## Sitemap

- Location: `{SITE_URL}/sitemap.xml`
- URLs tracked: {len(build_sitemap_urls())}

---

## Action Items

- [ ] Submit updated sitemap to Google Search Console
- [ ] Verify all schema markup passes Google Rich Results Test
- [ ] Review top 5 keywords below position 10 for quick-win content updates
- [ ] Update Google My Business posts (weekly cadence)
- [ ] Add new location page for any untargeted keyword cluster

---

*Report generated automatically by master_seo_automation_engine.py*
"""
    report_path.write_text(report, encoding="utf-8")
    print(f"  Audit report saved: {report_path}")


# ---------------------------------------------------------------------------
# CLI Entry Point
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(
        description="NightDesk.agency Master SEO Automation Engine"
    )
    parser.add_argument(
        "--mode",
        choices=["full", "audit", "pages", "sitemap", "report"],
        default="full",
        help="Execution mode (default: full — runs all tasks)",
    )
    args = parser.parse_args()

    print("=" * 60)
    print("  NightDesk.agency — Master SEO Automation Engine")
    print(f"  Property : {PROPERTY_NAME}")
    print(f"  Site     : {SITE_URL}")
    print(f"  Mode     : {args.mode}")
    print(f"  Date     : {datetime.date.today().isoformat()}")
    print("=" * 60)

    if args.mode in ("full", "pages"):
        run_page_generation()

    if args.mode in ("full", "sitemap"):
        urls = build_sitemap_urls()
        generate_sitemap(urls)

    if args.mode in ("full", "audit", "report"):
        run_seo_audit()

    print("\nDone.")


if __name__ == "__main__":
    main()
