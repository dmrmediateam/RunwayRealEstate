import type { CSSProperties } from "react";
import SiteChrome from "@/components/SiteChrome";
import ListingsGrid from "@/components/ListingsGrid";
import Testimonials from "@/components/Testimonials";
import AirparkRail from "@/components/home/AirparkRail";
import { airparks } from "@/content/airparks";
import type { Listing, SiteContent } from "@/content/site";

/* ==========================================================================
   Home variant "classic", Runway edition. Keeps the classic skeleton (centered
   serif hero over full-bleed footage, floating search card, editorial cards,
   stats, areas, circular about portrait, parallax CTA) and layers the
   aviation identity on top: identifier ticker, instrument strip, the Aero
   Country East spotlight, the airpark directory rail, and a testimonial wall.
   ========================================================================== */

const ARROW = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg>
);

export default function HomeClassic({
  content,
  liveListings,
}: {
  content: SiteContent;
  liveListings?: Listing[] | null;
}) {
  const featuredListings = liveListings ?? content.featured?.listings ?? [];
  const ticker = content.heroExtras?.ticker ?? [];
  const tickerItems = ticker.map((id) => {
    const a = airparks.find((x) => x.id === id);
    return { id, label: a ? `${a.community ?? a.name} · ${a.city}` : "" };
  });
  const ace = airparks.find((a) => a.id === "T31");

  return (
    <SiteChrome content={content} animateIn>
      {/* ============ HERO ============ */}
      <section className="video-section rw-hero">
        <div className="video-wrapper">
          {content.hero.video ? (
            <video poster={content.hero.image} loop muted autoPlay playsInline preload="metadata">
              {content.hero.video.webm && <source src={content.hero.video.webm} type="video/webm" media="(min-width: 700px)" />}
              {content.hero.video.mobileMp4 && <source src={content.hero.video.mobileMp4} type="video/mp4" media="(max-width: 699px) and (orientation: portrait)" />}
              {content.hero.video.mp4 && <source src={content.hero.video.mp4} type="video/mp4" />}
            </video>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={content.hero.image} alt="" />
          )}
        </div>
        <div className="overlay-component"></div>
        <div className="middle-content-wrapper">
          <div className="text-section">
            <h5 className="pre-title">{content.hero.preTitle}</h5>
            <h1 className="lp-h1">{content.hero.title}</h1>
            {content.heroExtras?.subtitle && <p className="rw-hero__sub">{content.heroExtras.subtitle}</p>}
            {(content.heroExtras?.primary || content.heroExtras?.secondary) && (
              <div className="rw-hero__actions">
                {content.heroExtras.primary && (
                  <a href={content.heroExtras.primary.href} className="rw-btn rw-btn--solid">{content.heroExtras.primary.label}{ARROW}</a>
                )}
                {content.heroExtras.secondary && (
                  <a href={content.heroExtras.secondary.href} className="rw-btn rw-btn--glass">{content.heroExtras.secondary.label}</a>
                )}
              </div>
            )}
          </div>
        </div>
        {content.brand.emblem && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={content.brand.emblem} alt="" className="rw-hero__emblem" aria-hidden="true" />
        )}
        {tickerItems.length > 0 && (
          <div className="rw-ticker" aria-hidden="true">
            <div className="rw-ticker__track">
              {[...tickerItems, ...tickerItems].map((t, i) => (
                <span className="rw-ticker__item" key={t.id + i}><b>{t.id}</b>{t.label}</span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ============ HANGAR DOORS (services) ============ */}
      <section className="rw-doors" aria-label="What Runway represents">
        {content.services.map((card, i) => (
          <a href={card.href} className="rw-door" key={card.title}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={card.image} alt="" className="rw-door__img" loading={i === 0 ? "eager" : "lazy"} />
            <span className="rw-door__num">0{i + 1}</span>
            <div className="rw-door__body">
              <h3 className="rw-door__title">{card.title}</h3>
              <div className="rw-door__reveal">
                <div>
                  {card.description && <p className="rw-door__desc">{card.description}</p>}
                  <span className="rw-door__cta">{card.cta ?? "Explore"}{ARROW}</span>
                </div>
              </div>
            </div>
            <span className="rw-door__arrow" aria-hidden="true">{ARROW}</span>
          </a>
        ))}
      </section>

      {/* ============ MEET JEANIE ============ */}
      <AboutBlock content={content} />

      {/* ============ INTRO ============ */}
      <section className="solid-section rw-intro">
        <div className="boxed-text lp-vertical-paddings">
          <div className="lp-container">
            <div className="rw-intro__grid">
              <div className="reveal">
                <div className="rw-intro__kicker"><span className="rw-eyebrow">Why Runway</span></div>
                <h2 className="lp-h2">{content.intro.title}</h2>
              </div>
              <div className="reveal" data-delay="120">
                <div className="boxed-text__description">
                  {content.intro.paragraphs.map((text, i) => <p key={i}>{text}</p>)}
                </div>
                <div className="boxed-text__btn">
                  <a href={content.intro.ctaHref} className="rw-btn rw-btn--outline">{content.intro.ctaLabel}{ARROW}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ INSTRUMENT STRIP (stats) ============ */}
      {content.stats && (
        <section className="rw-instruments">
          <div className="lp-container reveal">
            {content.stats.map((stat) => (
              <div className="rw-instruments__item" key={stat.label}>
                <span className="rw-instruments__value">{stat.value}</span>
                <span className="rw-instruments__label">{stat.label}</span>
                {stat.note && <span className="rw-instruments__note">{stat.note}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ============ SPOTLIGHT: AERO COUNTRY EAST ============ */}
      <section className="rw-spotlight lp-vertical-paddings">
        <div className="lp-container">
          <div className="reveal">
            <div className="rw-spotlight__kicker"><span className="rw-eyebrow">Featured development · T31 · Exclusive broker</span></div>
            <h2 className="lp-h2">Aero Country East. North Texas&rsquo;s newest airpark, now selling.</h2>
            <p>
              Thirty-plus acres on the east side of Aero Country Airport in McKinney, between Prosper, Frisco and Plano.
              Residential hangar-home lots and new-construction toybox hangars where you own the land and the hangar.
              No ground lease.
            </p>
            <dl className="rw-specs">
              <div><dt>Hangar home lots</dt><dd>From $375,000</dd></div>
              <div><dt>Toybox hangars</dt><dd>From $850,000</dd></div>
              <div><dt>Hangar footprint</dt><dd>60&prime; × 60&prime; × 26&prime;</dd></div>
              <div><dt>Hydraulic door</dt><dd>54&prime; × 18&prime;</dd></div>
              <div><dt>Paved runway</dt><dd>3,000&prime; lighted</dd></div>
              <div><dt>Fuel</dt><dd>{ace?.fuel ?? "100LL"}</dd></div>
            </dl>
            <div className="rw-spotlight__actions">
              <a href="/aero-country-east" className="rw-btn rw-btn--navy">Explore Aero Country East{ARROW}</a>
              <a href="/connect" className="rw-btn rw-btn--outline">Request the lot map</a>
            </div>
          </div>
          <div className="rw-collage reveal" data-delay="150">
            <span className="rw-collage__tag rw-id">McKinney, TX · 75071</span>
            {/* eslint-disable @next/next/no-img-element */}
            <figure><img src="/photos/ace-entrance-aerial-wide.jpg" alt="Aerial view of Aero Country East hangars and entrance" loading="lazy" /></figure>
            <figure><img src="/photos/ace-lounge-island.jpg" alt="Toybox hangar lounge with kitchen island" loading="lazy" /></figure>
            <figure><img src="/photos/ace-hangar-plane-truck.jpg" alt="Aircraft and classic truck inside a toybox hangar" loading="lazy" /></figure>
            <figure><img src="/photos/render-hangar-home-4.jpg" alt="Rendering of a three-story hangar home at Aero Country East" loading="lazy" /></figure>
            {/* eslint-enable @next/next/no-img-element */}
          </div>
        </div>
      </section>

      {/* ============ FEATURED PROPERTIES ============ */}
      {content.featured && featuredListings.length > 0 && (
        <section className="solid-section">
          <div className="featured-band lp-vertical-paddings">
            <div className="lp-container">
              <div className="featured-band__head reveal rw-rail__head">
                <div>
                  {content.featured.subtitle && <span className="featured-band__kicker">{content.featured.subtitle}</span>}
                  <h2 className="lp-h2">{content.featured.title}</h2>
                </div>
                <a href="/listings" className="rw-btn rw-btn--outline">All properties{ARROW}</a>
              </div>
              <ListingsGrid listings={featuredListings.slice(0, 3)} />
            </div>
          </div>
        </section>
      )}

      {/* ============ AIRPARK DIRECTORY RAIL ============ */}
      <section className="rw-rail lp-vertical-paddings" id="airparks">
        <div className="lp-container">
          <div className="rw-rail__head reveal">
            <div>
              <span className="featured-band__kicker">Texas Airpark Directory</span>
              <h2 className="lp-h2">Thirteen North Texas airparks, specs verified.</h2>
            </div>
            <a href="/airparks" className="rw-btn rw-btn--outline">Open the directory{ARROW}</a>
          </div>
          <AirparkRail airparks={airparks.slice(0, 8)} />
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <Testimonials content={content} />

      {/* ============ CTA (parallax) ============ */}
      <section
        className="image-section parallax-enabled"
        id="cta-parallax"
        style={{
          "--sectionBackground": `linear-gradient(rgba(5,10,48,0.55), rgba(5,10,48,0.55)), url('${content.cta.image}')`,
        } as CSSProperties}
      >
        <div className="work-with-us">
          <div className="container">
            <h2 className="reveal">{content.cta.title}</h2>
            <div className="description reveal" data-delay="100">{content.cta.description}</div>
            <div className="btn-container reveal" data-delay="200">
              <a href={content.cta.buttonHref} className="btn btn--primary-light">{content.cta.buttonLabel}</a>
            </div>
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}

function AboutBlock({ content }: { content: SiteContent }) {
  return (
    <section className="solid-section rw-about">
      <div className="about-flow lp-vertical-paddings">
        <div className="lp-container">
          <div className="about-flow__body reveal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={content.about.image} alt={content.about.title} className="about-flow__portrait" />
            <h2 className="lp-h2">{content.about.title}</h2>
            <div className="lp-text--subtitle">
              <h5>{content.about.subtitle}</h5>
              {content.about.blocks.map((block, i) => (
                <div key={i}>
                  {block.heading && <p><strong>{block.heading}</strong></p>}
                  <p>{block.text}</p>
                </div>
              ))}
              <div className="about-flow__links">
                <a href="/about" className="rw-btn rw-btn--navy">About Jeanie{ARROW}</a>
                <a href="/about#reviews" className="rw-btn rw-btn--outline">Read the reviews</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
