import type { Metadata } from "next";
import SiteChrome from "@/components/SiteChrome";
import ContactForm from "@/components/leads/ContactForm";
import { airparkById } from "@/content/airparks";
import { site } from "@/content/site";

/* ==========================================================================
   Aero Country East (T31), McKinney: the client's featured development and
   the page she sends buyers to. Facts come from aerocountryeast.com (her own
   developer site) and FAA 5010 data; nothing here is invented. Lot counts and
   phase availability are deliberately not stated: she updates those by phone.
   ========================================================================== */

export const metadata: Metadata = {
  title: "Aero Country East (T31) McKinney: Hangar Home Lots & Toybox Hangars – Runway Real Estate",
  description:
    "North Texas's newest airpark, between Prosper, Frisco and Plano. Residential hangar-home lots from $375,000 and new-construction 60×60 toybox hangars from $850,000. Own the land and the hangar, no ground lease. Exclusive broker Jeanie Cline, Real Broker LLC.",
  alternates: { canonical: "/aero-country-east" },
  openGraph: { images: ["/photos/ace-entrance-aerial-wide.jpg"] },
};

const ARROW = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg>
);

const FAQ = [
  { q: "Is there a ground lease at Aero Country East?", a: "No. Lots and toybox hangars are sold fee-simple: you own the land and the hangar outright. There is no ground lease and no reversion to an airport sponsor." },
  { q: "What can I keep in a toybox hangar?", a: "Aircraft, car collections, RVs, motorcoaches and motorcycles. Retail or commercial use of the hangar is not permitted, and flight schools are not allowed." },
  { q: "What are the hangar dimensions?", a: "The new-construction toybox hangars have a 60 by 60 by 26 foot footprint with a 54 by 18 foot hydraulic door, a full bathroom with washer and dryer hookups, a kitchenette, four windows and a man door." },
  { q: "Can I build a home on a lot?", a: "Yes. The residential homesites are zoned for detached hangar homes. Bring your builder and design a one- to three-story residence with a private hangar; rooftop decks are an option on many plans." },
  { q: "What is the runway like?", a: "Aero Country's paved, lighted runway is roughly 3,000 feet, with an additional turf section to the north, 100LL self-serve fuel available 24 hours, and a maximum aircraft weight of 6,500 pounds. The airport is privately owned by its property owners association and open to the public." },
  { q: "Who is the broker?", a: "Jeanie Cline of Runway Real Estate represents Aero Country East through Real Broker, LLC, the exclusive brokerage for the development. Call or text (972) 369-3509 for the current lot map and availability." },
];

export default function AeroCountryEastPage() {
  const t31 = airparkById("T31");
  const phone = site.contact?.phone ?? "";
  const siteUrl = site.meta.siteUrl ?? "";
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Place",
      name: "Aero Country East",
      description: metadata.description,
      address: { "@type": "PostalAddress", streetAddress: "99 Lloyd Stearman Drive", addressLocality: "McKinney", addressRegion: "TX", postalCode: "75071", addressCountry: "US" },
      geo: { "@type": "GeoCoordinates", latitude: 33.20845, longitude: -96.74194 },
      url: `${siteUrl}/aero-country-east`,
      image: `${siteUrl}/photos/ace-entrance-aerial-wide.jpg`,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <SiteChrome content={site} animateIn>
      {/* ============ HERO ============ */}
      <section className="video-section rw-hero ace-hero">
        <div className="video-wrapper">
          <video poster="/video/ace-poster.jpg" loop muted autoPlay playsInline preload="metadata">
            <source src="/video/ace.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="overlay-component"></div>
        <div className="middle-content-wrapper">
          <div className="text-section">
            <h5 className="pre-title">Now selling · Aero Country Airport (T31) · McKinney, Texas</h5>
            <h1 className="lp-h1">Aero Country East</h1>
            <p className="rw-hero__sub">
              North Texas&rsquo;s newest airpark. Residential hangar-home lots and new-construction toybox hangars on the
              east side of the runway, between Prosper, Frisco and Plano. Own the land. Own the hangar. No ground lease.
            </p>
            <div className="rw-hero__actions">
              <a href="#inquire" className="rw-btn rw-btn--solid">Request the lot map{ARROW}</a>
              <a href="#toybox" className="rw-btn rw-btn--glass">Toybox hangar specs</a>
            </div>
          </div>
        </div>
      </section>

      <div className="ace-ribbon">
        <div className="lp-container">
          <span><b>From $375,000</b> Hangar home lots</span>
          <span><b>From $850,000</b> Toybox hangars</span>
          <span><b>30+ acres</b> East of the runway</span>
          <span><b>Fee simple</b> No ground lease</span>
          <span><b>Exclusive brokerage</b> Real Broker, LLC · Jeanie Cline</span>
        </div>
      </div>

      {/* ============ TWO WAYS TO OWN ============ */}
      <section className="ace-offer">
        <div className="lp-container">
          <div className="ace-offer__head reveal">
            <span className="featured-band__kicker">Two ways to own at T31</span>
            <h2 className="lp-h2">A homesite with a hangar, or a hangar built for everything you own.</h2>
            <p>
              Aero Country is an established airport and airpark in McKinney. Aero Country East is the new development on the
              east side of the runway: a private, gated section with city utilities, fiber, and taxiway access to a paved,
              lighted runway with 24-hour fuel.
            </p>
          </div>
          <div className="ace-offer__grid">
            <article className="ace-offer__card reveal">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/photos/render-hangar-home-4.jpg" alt="Rendering of a three-story hangar home at Aero Country East" loading="lazy" />
              <span className="rw-id">Residential</span>
              <div className="ace-offer__body">
                <span className="ace-offer__price">Hangar home lots<b>From $375,000</b></span>
                <h3>Bring your builder. Design the house around the airplane.</h3>
                <p>Homesites newly re-zoned for residential detached hangar homes. Select your lot, then design a one- to three-story residence with a private hangar and an optional rooftop deck.</p>
                <ul className="ace-offer__list">
                  <li>You own the land; standard residential financing applies</li>
                  <li>Taxiway access to the runway from your lot</li>
                  <li>City water and sewer, CoServ gas and electric, AT&amp;T fiber</li>
                  <li>Developer states the homesites are in Prosper ISD; confirm per lot with the district</li>
                </ul>
                <a href="#inquire" className="rw-btn rw-btn--navy">Ask about available lots{ARROW}</a>
              </div>
            </article>
            <article className="ace-offer__card reveal" data-delay="120" id="toybox">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/photos/ace-hangar-plane-truck.jpg" alt="Aircraft and classic truck inside a finished toybox hangar" loading="lazy" />
              <span className="rw-id">Toybox</span>
              <div className="ace-offer__body">
                <span className="ace-offer__price">New-construction toybox hangars<b>From $850,000</b></span>
                <h3>Sixty by sixty, finished like a clubhouse, with a door that fits the motorcoach.</h3>
                <p>Pre-engineered, insulated steel hangars with a hydraulic door, full bath, kitchenette and city utilities. Land and hangar sell together. Phases 1 and 2 are sold out; ask about current and upcoming releases.</p>
                <ul className="ace-offer__list">
                  <li>60&prime; × 60&prime; × 26&prime; footprint, 54&prime; × 18&prime; hydraulic door</li>
                  <li>Aircraft, car collections, RVs, motorcoaches and motorcycles</li>
                  <li>No retail or commercial use; no flight schools</li>
                  <li>Own the land and the hangar, no ground lease</li>
                </ul>
                <a href="#inquire" className="rw-btn rw-btn--navy">Ask about the next release{ARROW}</a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ============ SPECS ============ */}
      <section className="ace-specs">
        <div className="lp-container">
          <div className="ace-specs__intro reveal">
            <span className="rw-id rw-id--dark">Toybox hangar specification</span>
            <h2 className="lp-h2" style={{ marginTop: 18 }}>Built to a spec a pilot can underwrite from.</h2>
            <p>
              Every toybox hangar at Aero Country East is a pre-engineered steel building on its own fee-simple lot. The
              numbers below are the developer&rsquo;s published specification; Jeanie will walk you through plans, finishes
              and the current release in person.
            </p>
            <p className="ace-specs__note">
              Specification per aerocountryeast.com. Airfield data per FAA Form 5010 via AirNav, last verified {t31?.lastVerified}.
              Verify before flight.
            </p>
          </div>
          <dl className="ace-specs__table reveal" data-delay="120">
            <div><dt>Footprint</dt><dd>60&prime; × 60&prime; × 26&prime;</dd></div>
            <div><dt>Hangar door</dt><dd>54&prime; × 18&prime;<small>PowerLift hydraulic</small></dd></div>
            <div><dt>Structure</dt><dd>Pre-engineered steel<small>Insulated; four windows and one man door</small></dd></div>
            <div><dt>Interior</dt><dd>Full bath + kitchenette<small>Washer and dryer hookups</small></dd></div>
            <div className="wide"><dt>Utilities</dt><dd>City water &amp; sewer · CoServ gas &amp; electric · AT&amp;T fiber, cable, phone</dd></div>
            <div><dt>Permitted use</dt><dd>Aircraft · cars · RVs<small>Motorcoaches and motorcycles; no retail, commercial or flight-school use</small></dd></div>
            <div><dt>Ownership</dt><dd>Fee simple<small>Land and hangar together; no ground lease</small></dd></div>
            <div><dt>Runway</dt><dd>3,000&prime; paved, lighted<small>Plus turf section north; runway 17/35</small></dd></div>
            <div><dt>Fuel</dt><dd>{t31?.fuel ?? "100LL, 24-hour self-serve"}</dd></div>
            <div><dt>Max aircraft weight</dt><dd>6,500 lb</dd></div>
            <div><dt>Elevation · CTAF</dt><dd>{t31?.elevationFt ?? 765} ft MSL · {t31?.ctafMhz?.toFixed(1) ?? "122.9"}</dd></div>
          </dl>
        </div>
      </section>

      {/* ============ GALLERY RAIL ============ */}
      <section className="ace-gallery">
        <div className="lp-container">
          <div className="ace-gallery__head reveal">
            <div>
              <span className="featured-band__kicker">Inside Aero Country East</span>
              <h2 className="lp-h2">Hangars that live like homes.</h2>
            </div>
            <span className="ace-gallery__hint">Scroll →</span>
          </div>
          <div className="ace-gallery__rail reveal" data-delay="100">
            {/* eslint-disable @next/next/no-img-element */}
            <figure><img src="/photos/ace-entrance-aerial-wide.jpg" alt="Aerial of Aero Country East hangars and entrance" loading="lazy" /><figcaption>Aerial · East side of T31</figcaption></figure>
            <figure className="tall"><img src="/photos/ace-lounge-bar.jpg" alt="Hangar lounge with bar seating and runway view" loading="lazy" /><figcaption>Toybox lounge</figcaption></figure>
            <figure><img src="/photos/ace-hangar-cars.jpg" alt="Car collection inside a toybox hangar" loading="lazy" /><figcaption>Collection floor</figcaption></figure>
            <figure className="tall"><img src="/photos/ace-lounge-kitchen.jpg" alt="Kitchen inside a toybox hangar" loading="lazy" /><figcaption>Kitchen</figcaption></figure>
            <figure><img src="/photos/ace-hangar-propeller-bar.jpg" alt="Brick bar with propeller inside a hangar" loading="lazy" /><figcaption>Hangar bar</figcaption></figure>
            <figure><img src="/photos/ace-entrance-pool-aerial.jpg" alt="Aerial of the Aero Country East pool and entrance" loading="lazy" /><figcaption>Entrance and pool</figcaption></figure>
            <figure><img src="/photos/render-hangar-home-1.jpg" alt="Rendering of a two-story hangar home" loading="lazy" /><figcaption>Hangar home concept</figcaption></figure>
            <figure><img src="/photos/render-pool.jpg" alt="Rendering of hangar homes beside a pool" loading="lazy" /><figcaption>Hangar home concept</figcaption></figure>
            <figure><img src="/photos/ace-runway-35-aerial.jpg" alt="Runway 35 at Aero Country Airport" loading="lazy" /><figcaption>Runway 35 · T31</figcaption></figure>
            {/* eslint-enable @next/next/no-img-element */}
          </div>
        </div>
      </section>

      {/* ============ LOCATION ============ */}
      <section className="ace-location">
        <div className="lp-container">
          <div className="ace-location__text reveal">
            <span className="featured-band__kicker">Location</span>
            <h2 className="lp-h2">In the North Dallas corridor, with a runway out back.</h2>
            <p>
              Aero Country sits in McKinney between Prosper, Frisco and Plano. It is one of the few residential airparks in the
              country inside a major metro&rsquo;s growth corridor, which is exactly why the east side is being built now.
            </p>
            <dl className="ace-location__facts">
              <div><dt>Address</dt><dd>99 Lloyd Stearman Dr, McKinney, TX 75071</dd></div>
              <div><dt>Airport</dt><dd>Aero Country (T31), privately owned, public use</dd></div>
              <div><dt>Coordinates</dt><dd>33°12′30″N 96°44′31″W</dd></div>
              <div><dt>Airpark guide</dt><dd><a href="/airparks/t31" style={{ borderBottom: "1px solid var(--accent)" }}>T31 airfield data →</a></dd></div>
            </dl>
          </div>
          <div className="ace-location__map reveal" data-delay="120">
            <iframe
              title="Map of Aero Country East, McKinney, Texas"
              src="https://www.google.com/maps?q=99+Lloyd+Stearman+Dr,+McKinney,+TX+75071&z=14&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* ============ PARTNERS ============ */}
      <section className="ace-partners">
        <dl className="lp-container reveal">
          <div><dt>Exclusive brokerage</dt><dd>Real Broker, LLC<small>Jeanie Cline, TREC License 0670223</small></dd></div>
          <div><dt>Preferred hangar builder</dt><dd>DALNOR<small>Pre-engineered steel hangars</small></dd></div>
          <div><dt>Preferred lender for aviators</dt><dd>AmNat<small>Financing for hangar homes and toybox hangars</small></dd></div>
        </dl>
      </section>

      {/* ============ FAQ ============ */}
      <section className="rw-faq" id="faq">
        <div className="lp-container">
          <div className="reveal">
            <span className="featured-band__kicker">Questions</span>
            <h2 className="lp-h2">What buyers ask about Aero Country East.</h2>
          </div>
          <div className="rw-faq__list reveal" data-delay="100">
            {FAQ.map((item, i) => (
              <details key={item.q} open={i === 0}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============ INQUIRE ============ */}
      <section className="rw-inquiry" id="inquire" style={{ background: "var(--paper-2)" }}>
        <div className="lp-container">
          <div className="rw-inquiry__intro reveal">
            <span className="featured-band__kicker">Lot map · pricing · availability</span>
            <h2 className="lp-h2">Request the Aero Country East lot map.</h2>
            <p>
              Tell Jeanie whether you are looking at a homesite or a toybox hangar, what you fly or collect, and your timeline.
              She will send the current lot map and pricing and set up a visit, by car or by air.
            </p>
            <a className="tel" href={`tel:${phone.replace(/[^+\d]/g, "")}`}>{phone}</a>
          </div>
          <ContactForm consent={site.footer.newsletter.consent} agentFirstName="Jeanie" />
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </SiteChrome>
  );
}
