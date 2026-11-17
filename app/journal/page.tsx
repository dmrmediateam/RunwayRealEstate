import type { Metadata } from "next";
import SiteChrome from "@/components/SiteChrome";
import InteriorHeader from "@/components/InteriorHeader";
import { journal } from "@/content/journal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Hangar Journal: Guides to Buying & Owning Aviation Property – Runway Real Estate",
  description:
    "Plain-language guides to hangar homes, toybox hangars, ground leases and airpark living in North Texas, written by aviation property specialist Jeanie Cline.",
  alternates: { canonical: "/journal" },
};

const fmt = (d: string) => new Date(d + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

export default function JournalPage() {
  const posts = [...journal].sort((a, b) => (a.date < b.date ? 1 : -1));
  return (
    <SiteChrome content={site}>
      <InteriorHeader
        content={site}
        page={{
          index: "Hangar Journal",
          title: "Notes from the ramp.",
          preTitle: "Guides to buying, owning and selling aviation property in North Texas, written for pilots, collectors and the people who love them.",
          heroImage: "/photos/ace-hangar-propeller-bar.jpg",
        }}
        chips={[`${posts.length} guides`]}
      />
      <section className="jn-list">
        <div className="lp-container">
          <div className="jn-grid">
            {posts.map((p, i) => (
              <a href={`/journal/${p.slug}`} className="jn-card reveal" data-delay={(i % 3) * 80 || undefined} key={p.slug}>
                <div className="jn-card__media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt="" loading={i < 3 ? "eager" : "lazy"} />
                </div>
                <span className="jn-card__meta"><span>{p.category}</span><span>{p.readMinutes} min read</span><span>{fmt(p.date)}</span></span>
                <h3>{p.title}</h3>
                <p>{p.excerpt}</p>
                <span className="jn-card__more">Read the guide</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
