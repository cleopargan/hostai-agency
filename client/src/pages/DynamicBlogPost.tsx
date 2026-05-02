import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowRight, Clock, Tag } from "lucide-react";
import { trpc } from "@/lib/trpc";
import MarketingNavbar from "@/components/MarketingNavbar";
import BlogRenderer from "@/components/BlogRenderer";

export default function DynamicBlogPost() {
  const params = useParams<{ slug: string }>();
  const { data: post, isLoading } = trpc.blog.get.useQuery({ slug: params.slug ?? "" }, { enabled: !!params.slug });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen" style={{ background: "#080810" }}>
        <MarketingNavbar />
        <div style={{ paddingTop: "12rem", textAlign: "center", fontFamily: "'DM Sans', sans-serif", color: "rgba(245,240,232,0.3)" }}>
          Loading…
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen" style={{ background: "#080810" }}>
        <MarketingNavbar />
        <div style={{ paddingTop: "12rem", textAlign: "center" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(245,240,232,0.4)", marginBottom: "1.5rem" }}>Article not found.</p>
          <Link href="/blog" style={{ color: "#C9A84C", fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem" }}>← Back to Blog</Link>
        </div>
      </div>
    );
  }

  let sections: any[] = [];
  try { sections = JSON.parse(post.content); } catch { sections = []; }

  return (
    <div className="min-h-screen" style={{ background: "#080810", color: "#F5F0E8" }}>
      <MarketingNavbar />

      <div style={{ paddingTop: "9rem", paddingBottom: "6rem", maxWidth: "760px", margin: "0 auto", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>

        <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "rgba(245,240,232,0.35)", textDecoration: "none", marginBottom: "2.5rem", fontSize: "0.75rem", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.06em" }}>
          <ArrowLeft size={13} /> Back to Blog
        </Link>

        {/* Meta */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
          {post.category && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C9A84C" }}>
              <Tag size={9} /> {post.category}
            </span>
          )}
          {post.readTime && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "rgba(245,240,232,0.28)" }}>
              <Clock size={10} /> {post.readTime}
            </span>
          )}
          {post.publishedAt && (
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "rgba(245,240,232,0.28)" }}>
              {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(2rem, 4.5vw, 3rem)", fontWeight: 600,
          lineHeight: 1.1, letterSpacing: "-0.015em", color: "#F5F0E8",
          marginBottom: "2.5rem",
        }}>
          {post.title}
        </h1>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "2.5rem" }}>
          <BlogRenderer sections={sections} />
        </div>

        {/* Footer */}
        <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "rgba(245,240,232,0.35)", textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem" }}>
            <ArrowLeft size={13} /> All Articles
          </Link>
          <a href="/#contact" className="btn-gold" style={{ padding: "0.75rem 1.75rem", fontSize: "0.8rem" }}>
            Get a Free Hotel Audit <ArrowRight size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}
