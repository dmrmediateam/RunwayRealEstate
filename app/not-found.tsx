import type { Metadata } from "next";
import SiteChrome from "@/components/SiteChrome";
import { site } from "@/content/site";

/*
 * Branded 404. Next.js serves this with a real HTTP 404 status (never a
 * "soft 404" 200) and a noindex tag. The page's job is to
 * recover the visit: search, the main sections, and a direct line to the agent.
 */
export const metadata: Metadata = {
  title: `Page Not Found – ${site.brand.name}`,
  description: `The page you were looking for isn't here. Search homes or reach ${site.footer.agentName} directly.`,
  // Next.js adds <meta name="robots" content="noindex"> to not-found responses itself
};

const LINKS = [
  { label: "Texas Airpark Directory", href: "/airparks", note: "Thirteen North Texas fly-in communities" },
  { label: "Aero Country East", href: "/aero-country-east", note: "Hangar-home lots and toybox hangars at T31" },
  { label: "Buy a Hangar Home", href: "/buy", note: "Buyer representation for pilots and collectors" },
  { label: "Sell an Aviation Property", href: "/sell", note: "Pricing from aviation comparables" },
  { label: "Let's Connect", href: "/connect", note: `Talk to ${site.footer.agentName.split(" ")[0]} directly` },
];

export default function NotFound() {
  const phone = site.contact?.phone ?? "";
  const phoneHref = `tel:${phone.replace(/[^+\d]/g, "")}`;

  return (
    <SiteChrome content={site}>
      <section className="nf">
        {site.brand.decal && (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="nf__decal" src={site.brand.decal} alt="" aria-hidden="true" />
        )}
        <div className="lp-container nf__inner">
          <span className="nf__code">404</span>
          <h1 className="nf__title">This page has moved on.</h1>
          <p className="nf__lede">
            The page you were looking for isn&apos;t here, but the right hangar might be. Browse the
            airparks, or pick up where you meant to go.
          </p>

          <form className="nf__search" action="/listings" method="get" role="search">
            <label htmlFor="nf-city" className="visually-hidden">Search by city, neighborhood, or address</label>
            <input id="nf-city" name="city" type="text" placeholder="City, neighborhood, or address" />
            <button type="submit">Search Homes</button>
          </form>

          <ul className="nf__links">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>
                  <span className="nf__link-label">{link.label}</span>
                  <span className="nf__link-note">{link.note}</span>
                </a>
              </li>
            ))}
          </ul>

          <p className="nf__contact">
            Rather talk it through? Call or text <a href={phoneHref}>{phone}</a> or{" "}
            <a href="/">return home</a>.
          </p>
        </div>
      </section>
    </SiteChrome>
  );
}
