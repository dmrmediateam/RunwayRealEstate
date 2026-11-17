import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteChrome from "@/components/SiteChrome";
import InteriorHeader from "@/components/InteriorHeader";
import ContactForm from "@/components/leads/ContactForm";
import ListingsGrid from "@/components/ListingsGrid";
import AirparkCard, { runwayLine } from "@/components/airparks/AirparkCard";
import { airparkById, airparks } from "@/content/airparks";
import { site } from "@/content/site";

export function generateStaticParams() {
  return airparks.map((a) => ({ id: a.id.toLowerCase() }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const a = airparkById(id);
  if (!a) return {};
  const name = a.community ?? a.name;
  return {
    title: `${name} (${a.id}) Hangar Homes & Lots, ${a.city} TX – Runway Real Estate`,
    description: `${a.summary} Runway ${runwayLine(a)}, ${a.elevationFt} ft MSL${a.fuel ? `, ${a.fuel}` : ""}. Buy or sell at ${a.id} with aviation specialist Jeanie Cline.`,
    alternates: { canonical: `/airparks/${a.id.toLowerCase()}` },
    openGraph: { images: [a.image] },
  };
}

const ARROW = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg>
);

export default async function AirparkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const a = airparkById(id);
  if (!a) notFound();
  const name = a.community ?? a.name;
  const r = a.runways[0];
  const related = airparks.filter((x) => x.id !== a.id && x.region === a.region).slice(0, 3);
  const fallback = airparks.filter((x) => x.id !== a.id && !related.includes(x)).slice(0, 3 - related.length);
  const nearby = [...related, ...fallback];
  const properties = (site.featured?.listings ?? []).filter((l) => l.address.includes(`(${a.id})`));
  const siteUrl = site.meta.siteUrl ?? "";
  const phone = site.contact?.phone ?? "";

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Airport",
      name: a.name,
      identifier: a.id,
      address: { "@type": "PostalAddress", addressLocality: a.city, addressRegion: "TX", postalCode: a.zip, addressCountry: "US" },
      description: a.summary,
      url: `${siteUrl}/airparks/${a.id.toLowerCase()}`,
      image: `${siteUrl}${a.image}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl || "/" },
        { "@type": "ListItem", position: 2, name: "Airparks", item: `${siteUrl}/airparks` },
        { "@type": "ListItem", position: 3, name: `${name} (${a.id})`, item: `${siteUrl}/airparks/${a.id.toLowerCase()}` },
      ],
    },
  ];

  return (
    <SiteChrome content={site}>
      <InteriorHeader
        content={site}
        page={{
          index: `Airpark · ${a.region} DFW`,
          title: name,
          preTitle: `${a.city}, Texas · ${a.county} County · ${a.ownership === "private" ? "Private-use field, prior permission required" : "Privately owned, open to the public"}`,
          heroImage: a.image,
        }}
        chips={[a.id, `${a.elevationFt} ft MSL`, a.fuel ? "Fuel" : "No fuel"]}
      />

      <section className="rw-ap">
        <div className="lp-container">
          <div className="rw-ap__body reveal">
            {a.overview.map((p, i) => <p key={i}>{p}</p>)}
            <div className="rw-notes" style={{ marginTop: 10 }}>
              <h2>Before you write an offer at {a.id}</h2>
              <ul>
                {a.buyerNotes.map((n) => <li key={n}>{n}</li>)}
              </ul>
            </div>
          </div>
          <aside className="rw-ap__side reveal" data-delay="120">
            <div className="rw-panel">
              <div className="rw-panel__head">
                <h2>Airfield data</h2>
                <span className="rw-id rw-id--dark">{a.id}</span>
              </div>
              <dl>
                <div><dt>Runway</dt><dd>{r.designation}</dd></div>
                <div><dt>Dimensions</dt><dd>{r.lengthFt.toLocaleString()} × {r.widthFt ?? "—"} ft</dd></div>
                <div className="wide"><dt>Surface</dt><dd style={{ textTransform: "capitalize" }}>{r.surface.replace("/", " + ")}{r.surfaceNote && <small>{r.surfaceNote}</small>}</dd></div>
                <div><dt>Lighting</dt>{r.lighted === null ? <dd className="verify">Verify</dd> : <dd>{r.lighted ? "Lighted" : "Unlighted"}</dd>}</div>
                <div><dt>Elevation</dt><dd>{a.elevationFt} ft MSL</dd></div>
                <div><dt>CTAF</dt>{a.ctafMhz ? <dd>{a.ctafMhz.toFixed(a.ctafMhz % 1 === 0 ? 1 : 3)} MHz</dd> : <dd className="verify">Verify</dd>}</div>
                <div><dt>Fuel</dt>{a.fuel ? <dd>{a.fuel}</dd> : <dd className="verify">None listed</dd>}</div>
                <div className="wide"><dt>Ownership</dt><dd>{a.ownership === "private" ? "Private use · PPR" : "Public use"}{a.owner && <small>{a.owner}</small>}</dd></div>
              </dl>
              <p className="rw-panel__foot">
                FAA 5010 data via AirNav and airport-data.com, last verified {a.lastVerified}. Not for navigation; check the current
                Chart Supplement and NOTAMs.{" "}
                {a.sources.map((s, i) => (
                  <span key={s}>{i > 0 && " · "}<a href={s} target="_blank" rel="noopener nofollow">Source {i + 1}</a></span>
                ))}
              </p>
            </div>
            <div className="rw-ap__cta">
              <a href="#inquire" className="rw-btn rw-btn--navy">Ask about {a.id}{ARROW}</a>
              <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="rw-btn rw-btn--outline">Text or call</a>
            </div>
          </aside>
        </div>
      </section>

      {properties.length > 0 && (
        <section className="solid-section">
          <div className="featured-band lp-vertical-paddings">
            <div className="lp-container">
              <div className="featured-band__head reveal">
                <span className="featured-band__kicker">At this airpark</span>
                <h2 className="lp-h2">Properties Jeanie represents at {a.id}</h2>
              </div>
              <ListingsGrid listings={properties} />
            </div>
          </div>
        </section>
      )}

      {a.featured && (
        <section className="rw-spotlight lp-vertical-paddings">
          <div className="lp-container">
            <div className="reveal">
              <div className="rw-spotlight__kicker"><span className="rw-id">Now selling</span><span>Exclusive broker</span></div>
              <h2 className="lp-h2">Aero Country East: hangar-home lots and toybox hangars at {a.id}.</h2>
              <p>Own the land and the hangar on the east side of the runway. Lots from $375,000, new-construction toybox hangars from $850,000.</p>
              <div className="rw-spotlight__actions">
                <a href="/aero-country-east" className="rw-btn rw-btn--navy">Explore Aero Country East{ARROW}</a>
              </div>
            </div>
            <div className="rw-collage reveal" data-delay="150">
              {/* eslint-disable @next/next/no-img-element */}
              <figure><img src="/photos/ace-entrance-pool-aerial.jpg" alt="" loading="lazy" /></figure>
              <figure><img src="/photos/ace-lounge-bar.jpg" alt="" loading="lazy" /></figure>
              <figure><img src="/photos/render-hangar-home-2.jpg" alt="" loading="lazy" /></figure>
              <figure><img src="/photos/ace-hangar-rows-aerial.jpg" alt="" loading="lazy" /></figure>
              {/* eslint-enable @next/next/no-img-element */}
            </div>
          </div>
        </section>
      )}

      <section className="rw-inquiry" id="inquire">
        <div className="lp-container">
          <div className="rw-inquiry__intro reveal">
            <span className="featured-band__kicker">Talk to Jeanie about {a.id}</span>
            <h2 className="lp-h2">Looking to buy or sell at {name}?</h2>
            <p>
              Tell Jeanie what you fly, what you need in a hangar, and your timeline. She will share what is on the market, what
              is likely to list, and what she knows about this field that the MLS does not.
            </p>
            <a className="tel" href={`tel:${phone.replace(/[^+\d]/g, "")}`}>{phone}</a>
          </div>
          <ContactForm consent={site.footer.newsletter.consent} agentFirstName="Jeanie" />
        </div>
      </section>

      <section className="rw-related">
        <div className="lp-container">
          <div className="rw-related__head reveal">
            <div>
              <span className="featured-band__kicker">Continue exploring</span>
              <h2 className="lp-h2">Nearby airparks</h2>
            </div>
            <a href="/airparks" className="rw-btn rw-btn--outline">Full directory{ARROW}</a>
          </div>
          <div className="rw-dir__grid">
            {nearby.map((x, i) => <AirparkCard airpark={x} key={x.id} index={i} />)}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </SiteChrome>
  );
}
