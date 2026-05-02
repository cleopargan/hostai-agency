import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { ArrowRight, Loader2, CheckCircle2, Trash2, Eye, Sparkles, Mail, Share2 } from "lucide-react";
import MarketingNavbar from "@/components/MarketingNavbar";

const TOPIC_BANK = [
  { topic: "Why boutique hotels lose 63% of bookings to OTAs and how to fix it", category: "Hotel Revenue" },
  { topic: "How Google Ads drives direct hotel bookings: a complete guide", category: "Google Ads" },
  { topic: "What is an AI receptionist for hotels and does your property need one", category: "AI Technology" },
  { topic: "The true cost of Booking.com commission: what hotel owners need to know", category: "Revenue Management" },
  { topic: "SEO for boutique hotels: how to rank for hotel near your landmark", category: "SEO" },
  { topic: "Direct booking vs OTA: the honest breakdown for independent hotels", category: "Strategy" },
  { topic: "Facebook Ads for hotels: retargeting guests who almost booked", category: "Social Ads" },
  { topic: "How to reduce OTA dependency in 90 days without losing revenue", category: "Strategy" },
  { topic: "Google Hotel Ads vs Booking.com: which drives more direct bookings", category: "Google Ads" },
  { topic: "How boutique hotels use WhatsApp to increase direct bookings by 30%", category: "Digital Concierge" },
  { topic: "The hotel marketing funnel: why most properties lose guests at every stage", category: "Hotel Revenue" },
  { topic: "Bing Ads for hotels: the underpriced channel your competitors ignore", category: "Paid Search" },
];

function CopyBox({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(245,240,232,0.3)" }}>{label}</span>
        <button onClick={copy} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", color: copied ? "#6EE7B7" : "#C9A84C", background: "none", border: "none", cursor: "pointer" }}>
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>
      <div style={{ padding: "0.875rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "rgba(245,240,232,0.65)", lineHeight: 1.7, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
        {value}
      </div>
    </div>
  );
}

function SocialEmailGenerator() {
  const [topic, setTopic] = useState("");
  const [tab, setTab] = useState<"social" | "email">("social");
  const [socialResult, setSocialResult] = useState<any>(null);
  const [emailResult, setEmailResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const socialMutation = trpc.social.generate.useMutation();
  const emailMutation = trpc.email.generate.useMutation();

  const generate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setSocialResult(null);
    setEmailResult(null);
    try {
      if (tab === "social") {
        const r = await socialMutation.mutateAsync({ topic });
        setSocialResult(r);
      } else {
        const r = await emailMutation.mutateAsync({ topic });
        setEmailResult(r);
      }
    } catch (e: any) { alert("Failed: " + e.message); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ marginBottom: "3rem" }}>
      {/* Tabs */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
        {(["social", "email"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.5rem 1.25rem", background: tab === t ? "rgba(201,168,76,0.08)" : "transparent", border: `1px solid ${tab === t ? "rgba(201,168,76,0.4)" : "rgba(255,255,255,0.08)"}`, color: tab === t ? "#C9A84C" : "rgba(245,240,232,0.45)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: tab === t ? 600 : 400, cursor: "pointer" }}>
            {t === "social" ? <><Share2 size={12} /> Wednesday Social Posts</> : <><Mail size={12} /> Friday Email + Ad Copy</>}
          </button>
        ))}
      </div>

      <div style={{ padding: "1.75rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem" }}>
          <input
            value={topic}
            onChange={e => setTopic(e.target.value)}
            placeholder={tab === "social" ? "e.g. How hotels reduce OTA commission" : "e.g. Direct booking strategies for boutique hotels"}
            style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", padding: "0.75rem 1rem", color: "#F5F0E8", fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", outline: "none" }}
            onKeyDown={e => e.key === "Enter" && generate()}
          />
          <button onClick={generate} disabled={loading || !topic.trim()} className="btn-gold" style={{ padding: "0.75rem 1.5rem", fontSize: "0.8rem", opacity: loading ? 0.6 : 1 }}>
            {loading ? <><Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} /> Writing…</> : <><Sparkles size={13} /> Generate</>}
          </button>
        </div>

        {/* Social results */}
        {tab === "social" && socialResult && (
          <div>
            <CopyBox label="LinkedIn" value={socialResult.linkedin ?? ""} />
            <CopyBox label="Instagram" value={socialResult.instagram ?? ""} />
            <CopyBox label="Facebook" value={socialResult.facebook ?? ""} />
          </div>
        )}

        {/* Email results */}
        {tab === "email" && emailResult && (
          <div>
            <div className="grid sm:grid-cols-2 gap-4" style={{ marginBottom: "1rem" }}>
              <CopyBox label="Subject Line" value={emailResult.subject ?? ""} />
              <CopyBox label="Preview Text" value={emailResult.preview ?? ""} />
            </div>
            <CopyBox label="Intro" value={emailResult.intro ?? ""} />
            <CopyBox label="Body" value={emailResult.body ?? ""} />
            <CopyBox label="Case Study Teaser" value={emailResult.caseStudy ?? ""} />
            <CopyBox label="CTA Button Text" value={emailResult.ctaText ?? ""} />
            <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "1rem" }}>Google Ads Copy</div>
              {(emailResult.headlines ?? []).map((h: string, i: number) => (
                <CopyBox key={i} label={`Headline ${i + 1} (${h.length}/30 chars)`} value={h} />
              ))}
              {(emailResult.descriptions ?? []).map((d: string, i: number) => (
                <CopyBox key={i} label={`Description ${i + 1} (${d.length}/90 chars)`} value={d} />
              ))}
              <CopyBox label="Ad CTA" value={emailResult.adCta ?? ""} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ContentAdmin() {
  const [customTopic, setCustomTopic] = useState("");
  const [generating, setGenerating] = useState<string | null>(null);
  const [generatingAll, setGeneratingAll] = useState(false);
  const [allProgress, setAllProgress] = useState<{ done: number; total: number; current: string } | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { data: posts, refetch } = trpc.blog.list.useQuery({ status: "all" });
  const generateMutation = trpc.blog.generate.useMutation();
  const publishMutation = trpc.blog.publish.useMutation();
  const deleteMutation = trpc.blog.delete.useMutation();

  const generate = async (topic: string, category?: string) => {
    setGenerating(topic);
    setSuccess(null);
    try {
      const result = await generateMutation.mutateAsync({ topic, category });
      setSuccess(`"${result.title}" saved as draft`);
      refetch();
    } catch (e: any) {
      alert("Generation failed: " + e.message);
    } finally {
      setGenerating(null);
    }
  };

  const publishAll = async () => {
    const drafts = (posts ?? []).filter((p: any) => p.status === "draft");
    if (!drafts.length) { alert("No drafts to publish."); return; }
    if (!confirm(`Publish all ${drafts.length} drafts?`)) return;
    for (const post of drafts) {
      await publishMutation.mutateAsync({ id: post.id });
    }
    refetch();
    setSuccess(`${drafts.length} articles published to /blog`);
  };

  const generateAll = async () => {
    if (!confirm(`Generate all 12 articles? This will take about 3 minutes and save them all as drafts.`)) return;
    setGeneratingAll(true);
    setSuccess(null);
    let done = 0;
    for (const item of TOPIC_BANK) {
      setAllProgress({ done, total: TOPIC_BANK.length, current: item.topic });
      try {
        await generateMutation.mutateAsync({ topic: item.topic, category: item.category });
        done++;
        refetch();
      } catch {
        // continue on error
        done++;
      }
    }
    setAllProgress(null);
    setGeneratingAll(false);
    setSuccess(`All ${done} articles generated and saved as drafts.`);
    refetch();
  };

  const publish = async (id: number) => {
    await publishMutation.mutateAsync({ id });
    refetch();
  };

  const remove = async (id: number) => {
    if (!confirm("Delete this post?")) return;
    await deleteMutation.mutateAsync({ id });
    refetch();
  };

  return (
    <div className="min-h-screen" style={{ background: "#080810", color: "#F5F0E8" }}>
      <MarketingNavbar />
      <div style={{ paddingTop: "9rem", paddingBottom: "6rem", maxWidth: "900px", margin: "0 auto", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>

        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "rgba(245,240,232,0.35)", textDecoration: "none", marginBottom: "2rem", fontSize: "0.75rem", fontFamily: "'DM Sans', sans-serif" }}>
          ← Back to Home
        </Link>

        <div style={{ marginBottom: "3rem" }}>
          <span className="section-label" style={{ display: "inline-flex", marginBottom: "1rem" }}>Content Engine</span>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, color: "#F5F0E8", marginBottom: "0.75rem" }}>
            AI Content{" "}
            <em style={{ fontStyle: "italic", background: "linear-gradient(90deg, #BFA06A, #E8C96A, #C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Generator
            </em>
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "rgba(245,240,232,0.42)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            Generate interactive SEO blog articles with real data, charts, and callouts. Each article is written in a human, expert voice — not AI-sounding.
          </p>
          <button
            onClick={generateAll}
            disabled={generatingAll || !!generating}
            className="btn-gold"
            style={{ padding: "0.875rem 2rem", fontSize: "0.85rem", opacity: generatingAll ? 0.7 : 1 }}
          >
            {generatingAll
              ? <><Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> Generating {allProgress?.done ?? 0} / {allProgress?.total ?? 12} — {(allProgress?.current ?? "").slice(0, 40)}…</>
              : <><Sparkles size={14} /> Generate All 12 Articles</>}
          </button>
        </div>

        {/* Custom topic */}
        <div style={{ padding: "1.75rem", background: "rgba(201,168,76,0.04)", border: "1px solid rgba(201,168,76,0.18)", marginBottom: "2.5rem" }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.25rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1rem" }}>Write on a Custom Topic</h3>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <input
              value={customTopic}
              onChange={e => setCustomTopic(e.target.value)}
              placeholder="e.g. How to increase direct bookings during low season"
              style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", padding: "0.75rem 1rem", color: "#F5F0E8", fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", outline: "none" }}
              onKeyDown={e => e.key === "Enter" && customTopic.trim() && generate(customTopic.trim())}
            />
            <button
              onClick={() => customTopic.trim() && generate(customTopic.trim())}
              disabled={!!generating || !customTopic.trim()}
              className="btn-gold"
              style={{ padding: "0.75rem 1.5rem", fontSize: "0.8rem", opacity: generating ? 0.6 : 1 }}
            >
              {generating === customTopic ? <><Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} /> Writing…</> : <><Sparkles size={13} /> Generate</>}
            </button>
          </div>
          {success && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.875rem", fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "#6EE7B7" }}>
              <CheckCircle2 size={13} /> {success}
            </div>
          )}
        </div>

        {/* Topic bank */}
        <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.4rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1.25rem" }}>
          12-Week Topic Bank
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "3rem" }}>
          {TOPIC_BANK.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", padding: "1rem 1.25rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", transition: "border-color 0.2s" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.2)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)"}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "rgba(245,240,232,0.75)", marginBottom: "0.2rem" }}>{item.topic}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9A84C" }}>{item.category}</div>
              </div>
              <button
                onClick={() => generate(item.topic, item.category)}
                disabled={!!generating}
                style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "none", border: "1px solid rgba(201,168,76,0.25)", padding: "0.4rem 0.875rem", color: "#C9A84C", fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", cursor: generating ? "not-allowed" : "pointer", opacity: generating ? 0.5 : 1, whiteSpace: "nowrap" }}
              >
                {generating === item.topic ? <Loader2 size={11} style={{ animation: "spin 1s linear infinite" }} /> : <Sparkles size={11} />}
                {generating === item.topic ? "Writing…" : "Generate"}
              </button>
            </div>
          ))}
        </div>

        {/* Social + Email generators */}
        <SocialEmailGenerator />

        {/* Generated posts */}
        {posts && posts.length > 0 && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.4rem", fontWeight: 600, color: "#F5F0E8" }}>
                Generated Articles ({posts.length})
              </h3>
              {(posts as any[]).some((p: any) => p.status === "draft") && (
                <button onClick={publishAll} className="btn-gold" style={{ padding: "0.5rem 1.25rem", fontSize: "0.75rem" }}>
                  <ArrowRight size={12} /> Publish All Drafts
                </button>
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {posts.map((post: any) => (
                <div key={post.id} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1.25rem 1.5rem", background: "rgba(255,255,255,0.02)", border: `1px solid ${post.status === "published" ? "rgba(110,231,183,0.2)" : "rgba(255,255,255,0.06)"}` }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "#F5F0E8", marginBottom: "0.3rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{post.title}</div>
                    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: post.status === "published" ? "#6EE7B7" : "#C9A84C" }}>
                        {post.status}
                      </span>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "rgba(245,240,232,0.3)" }}>{post.category} · {post.readTime}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                    <Link href={`/blog/${post.slug}`}>
                      <button style={{ display: "flex", alignItems: "center", gap: "0.3rem", background: "rgba(74,144,226,0.08)", border: "1px solid rgba(74,144,226,0.2)", padding: "0.4rem 0.75rem", color: "#4A90E2", fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", cursor: "pointer" }}>
                        <Eye size={11} /> View
                      </button>
                    </Link>
                    {post.status === "draft" && (
                      <button onClick={() => publish(post.id)} style={{ display: "flex", alignItems: "center", gap: "0.3rem", background: "rgba(110,231,183,0.08)", border: "1px solid rgba(110,231,183,0.2)", padding: "0.4rem 0.75rem", color: "#6EE7B7", fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", cursor: "pointer" }}>
                        <ArrowRight size={11} /> Publish
                      </button>
                    )}
                    <button onClick={() => remove(post.id)} style={{ display: "flex", alignItems: "center", gap: "0.3rem", background: "rgba(248,113,113,0.06)", border: "1px solid rgba(248,113,113,0.15)", padding: "0.4rem 0.75rem", color: "#f87171", fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", cursor: "pointer" }}>
                      <Trash2 size={11} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
