import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteChrome from "@/components/SiteChrome";
import InteriorHeader from "@/components/InteriorHeader";
import { journal, journalBySlug } from "@/content/journal";
import { renderJournal } from "@/lib/journalMarkdown";
import { site } from "@/content/site";

export function generateStaticParams() {
  return journal.map((j) => ({ slug: j.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = journalBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} – Runway Real Estate`,
    description: post.excerpt,
    alternates: { canonical: `/journal/${post.slug}` },
    openGraph: { type: "article", publishedTime: post.date, images: [post.image] },
  };
}

const fmt = (d: string) => new Date(d + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

export default async function JournalPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = journalBySlug(slug);
  if (!post) notFound();
  const html = renderJournal(post.body);
  const others = journal.filter((j) => j.slug !== post.slug).slice(0, 2);
  const siteUrl = site.meta.siteUrl ?? "";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    image: `${siteUrl}${post.image}`,
    author: { "@type": "Person", name: site.footer.agentName },
    publisher: { "@type": "Organization", name: site.brand.name },
    mainEntityOfPage: `${siteUrl}/journal/${post.slug}`,
  };

  return (
    <SiteChrome content={site}>
      <InteriorHeader
        content={site}
        page={{ index: `Hangar Journal · ${post.category}`, title: post.title, preTitle: post.excerpt, heroImage: post.image }}
        chips={[`${post.readMinutes} min read`, fmt(post.date)]}
      />
      <article className="jn-article">
        <div className="lp-container">
          <aside className="jn-article__aside">
            <span>By {site.footer.agentName}</span>
            <span>{fmt(post.date)}</span>
            <a href="/journal">All guides</a>
          </aside>
          <div>
            <div className="jn-body" dangerouslySetInnerHTML={{ __html: html }} />
            <div className="jn-cta">
              <p>
                <strong>Have a question this guide did not answer?</strong>
                Jeanie answers texts and calls personally.
              </p>
              <a href="/connect" className="rw-btn rw-btn--solid">Ask Jeanie</a>
            </div>
          </div>
          <div />
        </div>
      </article>
      {others.length > 0 && (
        <section className="rw-related">
          <div className="lp-container">
            <div className="rw-related__head reveal">
              <div>
                <span className="featured-band__kicker">Keep reading</span>
                <h2 className="lp-h2">More from the journal</h2>
              </div>
            </div>
            <div className="jn-grid">
              {others.map((p) => (
                <a href={`/journal/${p.slug}`} className="jn-card reveal" key={p.slug}>
                  <div className="jn-card__media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt="" loading="lazy" />
                  </div>
                  <span className="jn-card__meta"><span>{p.category}</span><span>{p.readMinutes} min read</span></span>
                  <h3>{p.title}</h3>
                  <span className="jn-card__more">Read the guide</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </SiteChrome>
  );
}
