import type { SiteContent } from "@/content/site";

/* ==========================================================================
   First-visit intro (~3s), shared by every client site. Styles: app/intro.css.

     0.10-0.95s  two hairlines glide in from the screen edges and meet
     0.55-1.50s  the logo rises out of a mask and comes into focus
     1.15-1.95s  the tagline settles in underneath
     2.40-3.00s  the screen fades and the logo lifts away

   Shown once per browser. introScript() (inlined at the top of <head>) decides
   before first paint by setting html[data-intro="play"], so there is never a
   flash of the page underneath and returning visitors never see it. Skipped
   for prefers-reduced-motion, crawlers, /client-portal, and when storage is
   blocked (better no intro than one on every page). Any tap or key skips it;
   append ?intro=1 to any URL to replay it. Without JavaScript the overlay
   stays display:none, so the site never depends on it.

   Configure per client with `site.splash` (theme, logo, tagline), or turn it
   off with `splash: { enabled: false }`.
   ========================================================================== */

const HOLD_MS = 2400; // fade starts; + FADE_MS = 3s total
const FADE_MS = 600;

export function introEnabled(content: SiteContent): boolean {
  return content.splash?.enabled !== false;
}

/** The logo the intro draws: explicit override, else the brand logo that suits the backdrop. */
export function introLogo(content: SiteContent): string | undefined {
  const dark = content.splash?.theme === "dark";
  return content.splash?.logo ?? (dark ? content.brand.logo?.light : content.brand.logo?.dark);
}

export function introScript(content: SiteContent): string {
  const key = `intro-seen-${content.brand.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return `(function(){try{
var d=document.documentElement,l=location;
if(l.pathname.indexOf("/client-portal")===0)return;
var force=/[?&]intro=1(&|$)/.test(l.search);
if(!force&&(localStorage.getItem(${JSON.stringify(key)})||matchMedia("(prefers-reduced-motion: reduce)").matches||/bot|crawl|spider|slurp|lighthouse|facebookexternalhit|Google-InspectionTool/i.test(navigator.userAgent)))return;
localStorage.setItem(${JSON.stringify(key)},"1");
d.setAttribute("data-intro","play");
function leave(){if(d.getAttribute("data-intro")==="play"){d.setAttribute("data-intro","leaving");setTimeout(function(){d.setAttribute("data-intro","done");},${FADE_MS});}}
setTimeout(leave,${HOLD_MS});
addEventListener("pointerdown",leave,{once:true});
addEventListener("keydown",leave,{once:true});
}catch(e){}})();`;
}

export default function IntroSplash({ content }: { content: SiteContent }) {
  const logo = introLogo(content);
  const tagline = content.splash?.tagline;
  return (
    <div className={`intro intro--${content.splash?.theme ?? "light"}`} aria-hidden="true">
      <div className="intro__stage">
        <span className="intro__mark">
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} alt="" decoding="sync" />
          ) : (
            <span className="intro__name">{content.brand.name}</span>
          )}
        </span>
        <span className="intro__line">
          <span className="intro__rule intro__rule--l" />
          <span className="intro__dot" />
          <span className="intro__rule intro__rule--r" />
        </span>
        {tagline &&<span className="intro__tagline">{tagline}</span>}
      </div>
    </div>
  );
}
