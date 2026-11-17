/* ==========================================================================
   Site content — everything rendered on the page lives here.
   Swap this file's values per client; no component edits needed.
   ========================================================================== */

export interface NavLink {
  label: string;
  href: string;
}

export interface GalleryCard {
  /** Small letterspaced line above the title (omit to hide) */
  preTitle?: string;
  title: string;
  /** Underlined line below the title (omit to hide) */
  cta?: string;
  /** Longer text revealed on hover (overlay-style cards, e.g. areas) */
  description?: string;
  href: string;
  image: string;
}

export interface Listing {
  price: string;
  address: string;
  /** Matches the search filter values: single-family, condominium, townhouse, land */
  propertyType?: string;
  beds?: string;
  baths?: string;
  sqft?: string;
  /** e.g. "For Sale", "Pending", "Sold" */
  status?: string;
  mls?: string;
  image: string;
  href: string;
}

export interface TeamMember {
  name: string;
  /** e.g. "Founder & Lead Agent", "Buyer Specialist" */
  role: string;
  image: string;
  phone?: string;
  email?: string;
  license?: string;
  /** 1-2 sentence bio shown on the roster card */
  bio?: string;
  /** Optional link to a fuller profile (a standard SubPage works well) */
  href?: string;
}

export interface SubPage {
  /** Short mono label shown in the interior header, e.g. "02 / Buyers" */
  index?: string;
  /** Append the testimonials wall to this page */
  showTestimonials?: boolean;
  /** FAQ accordion (also emitted as FAQPage JSON-LD) */
  faq?: { q: string; a: string }[];
  /** Simple numbered steps block */
  steps?: { title: string; text: string }[];
  /** URL segment, e.g. "buy" */
  slug: string;
  /** "standard" = editorial; "search" = IDX search; "connect" = contact; "listings" = listing grid; "team" = roster */
  type?: "standard" | "search" | "connect" | "listings" | "team";
  title: string;
  preTitle?: string;
  heroImage: string;
  intro?: string[];
  /** Alternating image/text split sections */
  sections?: { heading: string; text: string; image?: string }[];
  cta?: { label: string; href: string };
  /** Append the client's listings grid to a standard page (e.g. buy) */
  showListings?: boolean;
  /** Render the working property search (filters + results) on this page */
  search?: boolean;
  /** Compact search form (hands off to /listings), e.g. on the buy page */
  searchPanel?: { kicker?: string; title?: string };
  /** Grid of the agent's sold listings, e.g. on the sell page */
  recentClosings?: { intro?: string };
  /** Override the heading over the showListings grid */
  listingsHeading?: { kicker?: string; title?: string };
  /** Prepend the 3-step "What's your property worth?" wizard (e.g. sell) */
  valuation?: boolean;
  /** Full-bleed background for the valuation wizard (defaults to heroImage) */
  valuationImage?: string;
}

export interface SiteContent {
  /**
   * Which homepage design this client uses. Interior pages are shared;
   * the homepage carries the visual identity.
   * "classic" - light, centered serif hero, floating search card (default)
   * "noir"    - dark cinematic gallery: Ken Burns hero, listings rail
   * "estate"  - bright architectural split hero, marquee, hover showcase
   */
  homeVariant?: "classic" | "noir" | "estate";
  /** Brand palette — injected as CSS variables, overrides the defaults in globals.css */
  theme: {
    /** Primary brand color: headings, buttons, accents (original: #004F71) */
    primary: string;
    /** Secondary/muted color: body text, hero overlay tint (original: #88786A) */
    secondary: string;
    /** Page background (original: #FBF9F7) */
    background: string;
    /** Optional bright accent (identifier chips, rules, hover states); defaults to primary */
    accent?: string;
  };
  brand: {
    /** Wordmark text in the header and footer (used when no logo images) */
    name: string;
    tagline: string;
    /**
     * Optional logo images. `light` shows over the transparent hero nav,
     * `dark` shows on the scrolled white nav and can be reused in the footer.
     */
    /** light = over photos/dark panels, dark = on white; menu = optional variant for the side menu */
    logo?: { light: string; dark: string; menu?: string };
    /**
     * Brokerage logo shown under the agent name in the header and footer,
     * sized slightly wider than the name so the brokerage leads.
     */
    brokerageLogo?: { light: string; dark: string };
    /** Brokerage emblem pinned to the bottom-right of the homepage hero */
    emblem?: string;
    /** Large faint mark used as a background decal on the homepage */
    decal?: string;
    /** Where the header logo links. Defaults to "/"; set per client scope. */
    homeHref?: string;
  };
  /**
   * First-visit splash (components/IntroSplash.tsx), on by default: the logo
   * rises in over the page canvas between two hairlines, once per browser.
   * `theme: "dark"` puts it on the primary color with the light logo;
   * `logo` overrides the image; `tagline` adds a small caps line beneath.
   * Turn it off with `splash: { enabled: false }`.
   */
  splash?: { enabled?: boolean; theme?: "light" | "dark"; logo?: string; tagline?: string };
  meta: {
    title: string;
    description: string;
    /** Production origin, no trailing slash (canonicals, sitemap, JSON-LD) */
    siteUrl?: string;
  };
  /**
   * Ad + analytics wiring. The Google Ads conversion id and labels are NOT
   * secrets (they ship in the page source of every site that uses them), so
   * they live here rather than in env and tracking works on deploy.
   * NEXT_PUBLIC_GTM_ID / _GA4_ID / _GOOGLE_ADS_ID still override.
   */
  analytics?: {
    /** Google Ads conversion id, e.g. "AW-17640808645" */
    googleAdsId?: string;
    /** GA4 measurement id, e.g. "G-XXXXXXXXXX" */
    ga4Id?: string;
    /** Maps our semantic events to Google Ads conversion labels */
    conversions?: Partial<Record<string, string>>;
  };
  hero: {
    preTitle: string;
    title: string;
    /** Optional background video; the image is used as poster/fallback */
    video?: {
      webm?: string;
      mp4?: string;
      /** Vertical cut served to portrait phones (sharper and lighter than cropping the landscape file) */
      mobileMp4?: string;
    };
    image: string;
  };
  searchBar: {
    placeholder: string;
    ctaLabel: string;
    ctaHref: string;
  };
  nav: {
    left: NavLink[];
    right: NavLink[];
    /** Hamburger side-menu links */
    menu: NavLink[];
  };
  /**
   * "Featured Properties" band on the homepage highlighting the client's own
   * active listings. Live data comes from IDX Broker when IDX_API_KEY is set
   * in the deployment env; `listings` here is the manual fallback. Hidden when
   * neither yields listings.
   */
  featured?: { title: string; subtitle?: string; listings?: Listing[] };
  /** Interior pages, rendered at /<slug> (or /<client>/<slug>) */
  pages: SubPage[];
  /**
   * IDX Broker hookup. Set the client's IDX subdomain (e.g. "eaganluxury" for
   * eaganluxury.idxbroker.com) and the search page embeds their hosted search.
   * Omit to show a "search coming soon" panel instead.
   */
  idx?: {
    subdomain?: string;
    searchPath?: string;
    /**
     * Custom domain the client's IDX-hosted pages live on (e.g.
     * "search.client.com", set up as a CNAME to subdomains.idxbroker.com and
     * enabled in the IDX control panel). Listings we cannot render natively
     * redirect here rather than to idxbroker.com. Falls back to
     * <subdomain>.idxbroker.com.
     */
    publicHost?: string;
  };
  /** Contact details for the connect page and footer */
  contact?: { phone?: string; email?: string };
  /**
   * Team roster, rendered by a page with type: "team". Individual agents
   * simply omit this. Team sites keep `about` as the founder/lead spotlight
   * (the pattern every reference team site uses) and link here for the
   * full roster.
   */
  team?: {
    /** Small line above the grid, e.g. "Nine specialists. One standard." */
    tagline?: string;
    members: TeamMember[];
  };
  /**
   * Regulatory/compliance values. Boilerplate legal pages (privacy, terms,
   * accessibility, fair housing) and the footer compliance accordion render
   * from these. MLS disclaimer text should be the client's MLS-required
   * paragraph; a generic "deemed reliable" fallback ships by default.
   */
  legal?: {
    licenseNumber?: string;
    licenseState?: string;
    mlsName?: string;
    mlsDisclaimer?: string;
    governingLaw?: string;
    stateCivilRightsAgency?: string;
    lastUpdated?: string;
  };
  /**
   * Ad landing pages (/home-value, /buyers). Stripped header with no nav links,
   * because a landing page that offers ten ways to leave converts worse than one
   * that offers a form. Accents are injected as CSS variables on the wrapper.
   */
  landing?: {
    /** Accent used for eyebrows, rules, and the submit button */
    accent: string;
    /** Lighter accent for hero eyebrows and outlines on dark ground */
    accentLight: string;
    /** Palest accent for small caps on glass */
    accentPale: string;
    /** Marketing line for the landing hero and footer */
    tagline: string;
    /** Title / credentials shown under the agent's name */
    designations: string[];
    /** Spelled-out credentials for the landing footer */
    designationsLong: string;
    /** Communities listed on landing pages; href links to a real page */
    communities: { label: string; href?: string }[];
    /** How the market is described in eyebrows, e.g. "Naples, Florida" */
    serviceArea: string;
    /** Brokerage license number for the landing footer disclosure */
    brokerageLicense?: string;
    /** /buyers hero headline (defaults to a neutral line) */
    buyersTitle?: string;
    /** /home-value hero headline (defaults to a neutral line) */
    homeValueTitle?: string;
    /** /buyers hero background (falls back to hero.image) */
    buyersImage?: string;
    /** /home-value hero background (falls back to hero.image) */
    homeValueImage?: string;
    /** Agent portrait for landing pages (falls back to about.image) */
    portrait?: string;
    /** /buyers brokerage-authority background (falls back to cta.image) */
    brandImage?: string;
    /** Numbered points in the /buyers brokerage-authority section */
    brokeragePoints?: { title: string; body: string }[];
    /** Buyer price bands on /buyers, low to high (defaults to $1M+ luxury bands) */
    priceBands?: string[];
    /** Bands that count as qualified for ad bidding (defaults to all but the lowest) */
    qualifiedBands?: string[];
  };
  /**
   * Registration gate on listing detail pages. The listing still renders (and
   * indexes) underneath; only a modal overlays it. freeViews 0 asks on the
   * first listing; dismissible adds a "Not now" link.
   */
  listingGate?: {
    enabled: boolean;
    freeViews: number;
    dismissible: boolean;
    heading: string;
    subheading: string;
  };
  /** Elfsight All-in-One Reviews widget, loaded site-wide (layout is set in the Elfsight dashboard) */
  reviews?: { elfsightAppId: string };
  /** Optional proof-point band rendered after the intro (e.g. "40+ / Years") */
  stats?: { value: string; label: string; note?: string }[];
  /** Client reviews; rendered on the homepage and the about page */
  testimonials?: { quote: string; name: string; context?: string; airpark?: string }[];
  /** Secondary hero line and the two hero buttons (Runway edition of classic) */
  heroExtras?: {
    subtitle?: string;
    primary?: { label: string; href: string };
    secondary?: { label: string; href: string };
    /** Identifier ticker along the hero's bottom edge */
    ticker?: string[];
  };
  /** Required brokerage disclosures (TREC IABS / CPN) linked in the footer */
  documents?: { label: string; href: string }[];
  services: GalleryCard[];
  intro: {
    title: string;
    paragraphs: string[];
    ctaLabel: string;
    ctaHref: string;
  };
  areas: GalleryCard[];
  about: {
    title: string;
    subtitle: string;
    image: string;
    /** "portrait" (default) = circular headshot; "photo" = wide team photo */
    imageStyle?: "portrait" | "photo";
    /** Optional square headshot shown beside the homepage statement, linking down to #about */
    avatar?: string;
    /** Alternate plain paragraphs and bolded lead-ins */
    blocks: { heading?: string; text: string }[];
  };
  cta: {
    title: string;
    description: string;
    buttonLabel: string;
    buttonHref: string;
    image: string;
  };
  footer: {
    agentName: string;
    brokerage: string;
    links: NavLink[];
    socials: { platform: "instagram" | "facebook" | "linkedin" | "youtube"; href: string }[];
    addressLines: string[];
    newsletter: {
      heading: string;
      tagline: string;
      consent: string;
    };
    copyright: string;
    /** Optional compliance row: Equal Housing logo + license/brokerage line */
    compliance?: { image: string; text: string };
  };
}

/* --------------------------------------------------------------------------
   CLIENT: Runway Real Estate (runway-real-estate) - homepage variant "classic",
   Runway edition. Jeanie Cline, Real Broker LLC, aviation real estate, DFW.
   -------------------------------------------------------------------------- */

const CONSENT =
  "I agree to be contacted by Jeanie Cline and Real Broker, LLC via call, email, and text about real estate services. Reply STOP to opt out or HELP for assistance. Message and data rates may apply; frequency varies.";

export const site: SiteContent = {
  homeVariant: "classic",
  theme: {
    primary: "#050a30",
    secondary: "#55607a",
    background: "#f7f5f0",
    accent: "#15c9fd",
  },
  brand: {
    name: "Runway Real Estate",
    tagline: "Aviation Real Estate · Real Broker, LLC",
    logo: { light: "/brand/lockup-light.png", dark: "/brand/lockup-dark.png", menu: "/brand/lockup-light.png" },
    brokerageLogo: { light: "/brand/real-broker-light.png", dark: "/brand/real-broker.png" },
    emblem: "/brand/emblem.png",
    decal: "/brand/emblem.png",
    homeHref: "/",
  },
  splash: { theme: "dark", tagline: "Aviation Real Estate · North Texas" },
  meta: {
    siteUrl: "https://runwayrealestate.com",
    title: "Hangar Homes & Airpark Real Estate in North Texas – Runway Real Estate",
    description:
      "Jeanie Cline of Runway Real Estate represents hangar homes, toybox hangars, commercial hangars and airpark lots across Dallas/Fort Worth, including Aero Country East (T31). 15+ years in aviation real estate.",
  },
  hero: {
    preTitle: "Aviation Real Estate · Dallas / Fort Worth",
    title: "Where the runway ends at your front door.",
    image: "/video/hero-poster.jpg",
    video: { mp4: "/video/hero.mp4", mobileMp4: "/video/hero-mobile.mp4" },
  },
  heroExtras: {
    subtitle:
      "Hangar homes, toybox hangars, commercial hangars and airpark lots across North Texas, represented by a broker who grew up around them.",
    primary: { label: "Explore the Airparks", href: "/airparks" },
    secondary: { label: "Aero Country East", href: "/aero-country-east" },
    ticker: ["T31", "5TX0", "F69", "58T", "16X", "T56", "T38", "50F", "XBP", "XA86", "T67", "T76", "7TX4"],
  },
  searchBar: {
    placeholder: "Search by airpark, city or identifier",
    ctaLabel: "Talk to Jeanie",
    ctaHref: "/connect",
  },
  nav: {
    left: [
      { label: "Airparks", href: "/airparks" },
      { label: "Aero Country East", href: "/aero-country-east" },
      { label: "Buy", href: "/buy" },
    ],
    right: [
      { label: "Sell", href: "/sell" },
      { label: "About", href: "/about" },
    ],
    menu: [
      { label: "Home", href: "/" },
      { label: "Texas Airpark Directory", href: "/airparks" },
      { label: "Aero Country East (T31)", href: "/aero-country-east" },
      { label: "Featured Properties", href: "/listings" },
      { label: "Buy a Hangar Home", href: "/buy" },
      { label: "Sell an Aviation Property", href: "/sell" },
      { label: "Hangar Journal", href: "/journal" },
      { label: "About Jeanie", href: "/about" },
      { label: "Reviews", href: "/about#reviews" },
      { label: "Contact", href: "/connect" },
    ],
  },
  contact: { phone: "(972) 369-3509", email: "jeanie@runwayrealestate.com" },
  legal: {
    licenseNumber: "0670223",
    licenseState: "Licensed in Texas",
    mlsName: "North Texas Real Estate Information Systems (NTREIS)",
    governingLaw: "the State of Texas",
    stateCivilRightsAgency: "Texas Workforce Commission Civil Rights Division",
    lastUpdated: "November 2026",
  },
  documents: [
    { label: "TREC Information About Brokerage Services", href: "/docs/trec-information-about-brokerage-services.pdf" },
    { label: "TREC Consumer Protection Notice", href: "/docs/trec-consumer-protection-notice.pdf" },
  ],
  featured: {
    title: "On the Market",
    subtitle: "Featured Aviation Properties",
    listings: [
      {
        price: "Price on request",
        address: "9400 Beagle Lane, McKinney · Aero Country (T31)",
        propertyType: "hangar",
        status: "Featured",
        mls: "DEMO-T31-9400",
        image: "/photos/beagle-hangar-biplane.jpg",
        href: "/listings",
      },
      {
        price: "From $375,000",
        address: "Hangar Home Lots · Aero Country East, McKinney (T31)",
        propertyType: "land",
        status: "Now Selling",
        mls: "DEMO-ACE-LOTS",
        image: "/photos/ace-entrance-aerial-wide.jpg",
        href: "/aero-country-east",
      },
      {
        price: "From $850,000",
        address: "Toybox Hangars · Aero Country East, McKinney (T31)",
        propertyType: "hangar",
        sqft: "3,600",
        status: "New Construction",
        mls: "DEMO-ACE-TOYBOX",
        image: "/photos/ace-hangar-cars.jpg",
        href: "/aero-country-east",
      },
      {
        price: "Represented",
        address: "Hangar Home · Hidden Valley Airpark, Shady Shores (5TX0)",
        propertyType: "single-family",
        status: "Represented",
        mls: "DEMO-5TX0-160",
        image: "/photos/hva-home-dusk.jpg",
        href: "/airparks/5tx0",
      },
      {
        price: "Represented",
        address: "Hangar Home · North Texas airpark",
        propertyType: "single-family",
        status: "Represented",
        mls: "DEMO-6305",
        image: "/photos/airpark-runway-homes-aerial.jpg",
        href: "/airparks",
      },
      {
        price: "Represented",
        address: "Box Hangar · Texas airport",
        propertyType: "hangar",
        status: "Represented",
        mls: "DEMO-321",
        image: "/photos/rockport-hangar-open-2.jpg",
        href: "/airparks",
      },
    ],
  },
  pages: [
    {
      slug: "listings",
      type: "listings",
      index: "Featured Properties",
      title: "Featured Aviation Properties",
      preTitle: "Hangars, hangar homes and airpark lots",
      heroImage: "/photos/ace-hangar-rows-aerial.jpg",
      intro: [
        "Current listings and recent results across North Texas airparks. Live MLS search is being connected; in the meantime, call or text Jeanie for what is coming to market quietly.",
      ],
    },
    {
      slug: "buy",
      index: "01 / Buyers",
      title: "Buy a Hangar Home",
      preTitle: "Representation for pilots, collectors and operators",
      heroImage: "/photos/ace-lounge-wide.jpg",
      intro: [
        "Hangar homes and airport property do not trade like houses. Inventory is thin, every airpark has its own rules, and the details that decide whether a property works for you, door height, taxiway access, fuel, weight limits, ownership structure, never show up in an MLS field. Jeanie reads them before you ever tour.",
      ],
      steps: [
        { title: "Define the mission", text: "Aircraft type and wingspan, door clearance, whether you need Jet-A, how far you will commute, and whether this is a primary home, a toybox, or an investment hangar. Everything downstream follows from this." },
        { title: "Shortlist the fields", text: "Thirteen North Texas airparks, each with a different runway, surface, ownership model and culture. Jeanie narrows it to the two or three that actually fit, and tells you what is likely to come available." },
        { title: "Inspect like a pilot", text: "Hangar structure and door mechanism, slab, drainage, taxiway easements, through-the-fence rights, association covenants, insurance, and the airport's own rules. Jeanie coordinates the right inspectors and translates what matters." },
        { title: "Negotiate and close", text: "Specialized properties attract specialized sellers. Clients describe Jeanie staying with them through difficult negotiations until the hangar was theirs, and she stays on it until you have the keys and the hangar code." },
      ],
      sections: [
        {
          heading: "Hangar homes and airpark residences",
          text: "Homes with an attached or detached hangar and direct taxiway access, from established fields like Propwash and Hidden Valley to new construction at Aero Country East. Jeanie has represented clients at airparks across North Texas, from Propwash and Hidden Valley to Bridgeport Airport Estates, and knows the rules and quirks of each field.",
          image: "/photos/hva-hangar-dusk.jpg",
        },
        {
          heading: "Toybox and commercial hangars",
          text: "Standalone hangars for aircraft, car collections, motorcoaches or an aviation business. Own-the-land hangars, ground-lease hangars at municipal fields, and commercial facilities each carry different financing, tax and use implications. Jeanie walks you through them before you commit.",
          image: "/photos/ace-hangar-plane-truck.jpg",
        },
        {
          heading: "Lots and development",
          text: "Runway lots, hangar lots and airpark development parcels. Jeanie's background in airport development means she can read a plat, a zoning case and an airport layout plan, and tell you what you can actually build.",
          image: "/photos/render-hangar-home-4.jpg",
        },
      ],
      faq: [
        { q: "Do I need to be a pilot to buy in an airpark?", a: "No. Many owners are car collectors, aviation enthusiasts or families who simply like the space and the community. Some associations limit who may operate aircraft, so Jeanie will confirm the rules for the specific field." },
        { q: "What is the difference between owning the land and a ground lease?", a: "At private airparks and developments like Aero Country East you own the dirt under the hangar. At many municipal airports hangars sit on long-term ground leases from the city, which affects financing, resale and what happens at lease end. Both can be good buys; they are priced and underwritten differently." },
        { q: "Can I finance a hangar home?", a: "Yes, though not every lender understands them. Jeanie can point you to lenders who finance hangar homes, toybox hangars and airpark lots, including the preferred lender for Aero Country East." },
        { q: "How do showings work at a private field?", a: "Most private-use airparks are prior-permission-required. Jeanie arranges access with the association and the seller, whether you arrive by car or fly in." },
      ],
      cta: { label: "Start the Conversation", href: "/connect" },
      searchPanel: { kicker: "Search the market", title: "Hangars, hangar homes and lots" },
      showListings: true,
      listingsHeading: { kicker: "Portfolio", title: "Featured and Recently Represented" },
    },
    {
      slug: "sell",
      index: "02 / Sellers",
      title: "Sell an Aviation Property",
      preTitle: "The buyers for a hangar are not on Zillow",
      heroImage: "/photos/ace-hangar-propeller-bar.jpg",
      intro: [
        "A hangar home or airport facility is worth the most to the buyer who understands it. Jeanie prices from aviation comparables, presents the property the way a pilot evaluates it, and markets it directly to the aviation community across Texas and beyond.",
      ],
      sections: [
        {
          heading: "Pricing from the right comparables",
          text: "Automated estimates have no idea what a 60 by 60 hangar with a hydraulic door adds to a home. Jeanie prices from actual airpark sales, hangar construction cost, runway and fuel access, and the current depth of the buyer pool for your specific field.",
          image: "/photos/beagle-hangar-exterior.jpg",
        },
        {
          heading: "Presentation built for aviators",
          text: "Drone video of the approach and taxiway, hangar dimensions and door specs up front, utilities, weight limits and association rules documented so a serious buyer can underwrite from the listing. Photography and film that make the hangar the hero.",
          image: "/photos/ace-runway-35-aerial.jpg",
        },
        {
          heading: "Reach the aviation buyer directly",
          text: "Your listing goes to Jeanie's network of pilots, airpark owners, aircraft brokers and aviation lenders, plus the MLS, aviation property channels and targeted campaigns to pilots and collectors in and out of state.",
          image: "/photos/ramp-warbirds.jpg",
        },
        {
          heading: "A managed, pilot-literate process",
          text: "From pre-listing prep through inspection, appraisal and association approvals, Jeanie coordinates the specialists who understand hangars and keeps the transaction moving.",
          image: "/photos/rockport-hangar-interior.jpg",
        },
      ],
      cta: { label: "Request a Valuation", href: "/connect" },
      valuation: true,
      valuationImage: "/photos/ace-entrance-pool-aerial.jpg",
      recentClosings: { intro: "A selection of aviation properties Jeanie has represented across Texas. Sale details are shared in conversation." },
    },
    {
      slug: "about",
      index: "03 / About",
      title: "Meet Jeanie Cline",
      preTitle: "Raised around airplanes and real estate. More than 15 years in aviation property across Texas.",
      heroImage: "/brand/jeanie-cline-portrait.jpg",
      intro: [
        "Jeanie Cline brings more than 15 years of experience in aviation real estate, airport development and specialized property sales across Texas. Raised in a family of private pilots and commercial real estate professionals, she understands the details that make airport property different.",
        "Her work spans private hangars, airpark homes, airport developments, hangar homes, aviation facilities and properties with runway access. From hangar dimensions and taxiway access to airport ownership structures and buyer demand, Jeanie helps clients navigate a market that requires focused knowledge and experience.",
      ],
      sections: [
        {
          heading: "Aero Country East, T31",
          text: "Jeanie represents Aero Country East, the 30-plus acre development on the east side of Aero Country Airport (T31) in McKinney, through Real Broker, LLC, the development's exclusive brokerage. Residential hangar-home lots and new-construction toybox hangars where you own the land and the hangar, with no ground lease.",
          image: "/photos/ace-entrance-pool-aerial.jpg",
        },
        {
          heading: "Real Broker, LLC",
          text: "Runway Real Estate operates under Real Broker, LLC. Jeanie is licensed by the Texas Real Estate Commission, license 0670223, and works with buyers and sellers across Dallas/Fort Worth and the Texas airpark communities. The TREC Information About Brokerage Services and Consumer Protection Notice are linked in the footer of every page.",
          image: "/brand/jeanie-cline-tall.jpg",
        },
      ],
      showTestimonials: true,
      cta: { label: "Work With Jeanie", href: "/connect" },
    },
    {
      slug: "connect",
      type: "connect",
      index: "Contact",
      title: "Let's Talk Hangars",
      preTitle: "Call, text or send a note",
      heroImage: "/photos/ace-hangar-rows-aerial.jpg",
      intro: [
        "Whether you are buying your first hangar home, selling an airport facility, or weighing a lot at Aero Country East, start with a short conversation. Jeanie answers texts and calls personally.",
      ],
    },
  ],
  listingGate: {
    enabled: false,
    freeViews: 0,
    dismissible: true,
    heading: "See the full hangar details",
    subheading: "Tell us where to send dimensions, door specs, disclosures and anything the MLS does not show.",
  },
  landing: {
    accent: "#050a30",
    accentLight: "#15c9fd",
    accentPale: "#cdeefc",
    tagline: "Where the runway ends at your front door.",
    designations: ["Aviation Property Specialist", "Real Broker, LLC"],
    designationsLong: "Aviation Property Specialist · Real Broker, LLC · TREC License 0670223",
    communities: [
      { label: "Aero Country (T31)", href: "/airparks/t31" },
      { label: "Hidden Valley Airpark (5TX0)", href: "/airparks/5tx0" },
      { label: "Propwash Airport (16X)", href: "/airparks/16x" },
      { label: "Bourland Field (50F)", href: "/airparks/50f" },
      { label: "Hicks Airfield (T67)", href: "/airparks/t67" },
      { label: "Bridgeport Airport Estates (XBP)", href: "/airparks/xbp" },
    ],
    serviceArea: "North Texas Airparks",
    buyersTitle: "Find your hangar home in North Texas.",
    homeValueTitle: "What is your hangar property worth?",
    buyersImage: "/photos/ace-runway-35-aerial.jpg",
    homeValueImage: "/photos/hva-hangar-dusk.jpg",
    brandImage: "/photos/ace-hangar-rows-aerial.jpg",
    priceBands: ["Under $500K", "$500K to $1M", "$1M to $2M", "$2M+"],
    brokeragePoints: [
      { title: "Aviation is the specialty, not a sideline", body: "Fifteen-plus years of hangars, airparks and airport development, not a residential agent who once sold a house near a runway." },
      { title: "Every North Texas airpark, first-hand", body: "Thirteen fields, their boards, their rules and their sellers. Jeanie knows what is likely to come available before it lists." },
      { title: "Represents Aero Country East", body: "Direct access to new hangar-home lots and toybox hangars at T31 in McKinney, through Real Broker, LLC, the exclusive brokerage." },
    ],
  },
  stats: [
    { value: "15+", label: "Years in Aviation Real Estate", note: "Hangars, airparks, airport development" },
    { value: "13", label: "North Texas Airparks", note: "Verified specs in the directory" },
    { value: "T31", label: "Aero Country East", note: "Represented through Real Broker, LLC, exclusive brokerage" },
  ],
  services: [
    {
      title: "Hangar Homes",
      description: "Homes with an attached or detached hangar and taxiway access to the runway, at established airparks and new construction across North Texas.",
      cta: "Buy a hangar home",
      href: "/buy",
      image: "/photos/hva-hangar-dusk.jpg",
    },
    {
      title: "Toybox & Commercial Hangars",
      description: "Standalone hangars for aircraft, car collections, motorcoaches or an aviation business. Own the land, or understand the ground lease before you sign.",
      cta: "See toybox hangars",
      href: "/aero-country-east",
      image: "/photos/ace-hangar-cars.jpg",
    },
    {
      title: "Lots & Development",
      description: "Runway lots, hangar lots and airpark development parcels, read by a broker with an airport development background.",
      cta: "Browse the airparks",
      href: "/airparks",
      image: "/photos/render-hangar-home-1.jpg",
    },
  ],
  intro: {
    title: "Airport property is a different market. It deserves a broker who grew up in it.",
    paragraphs: [
      "Hangar dimensions and door clearance. Taxiway access and through-the-fence rights. Whether the runway is owned by the association, a private landowner or the city. Fuel, weight limits, noise rules, and how deep the buyer pool really is at each field. None of it shows up in an MLS field, and all of it decides whether a property works for you.",
      "Runway Real Estate represents private hangars, airpark homes, hangar homes, aviation facilities, runway lots and airport developments across Dallas/Fort Worth, and represents Aero Country East, North Texas's newest airpark, through Real Broker, LLC, the development's exclusive brokerage.",
    ],
    ctaLabel: "Meet Jeanie",
    ctaHref: "/about",
  },
  areas: [
    { title: "Aero Country (T31)", description: "McKinney. Paved, lighted runway, 24-hour 100LL, and the new Aero Country East hangar-home lots and toybox hangars.", href: "/airparks/t31", image: "/photos/ace-runway-35-aerial.jpg" },
    { title: "Hidden Valley Airpark (5TX0)", description: "Shady Shores. Gated lakeside community on Lake Lewisville with an HOA-owned paved strip.", href: "/airparks/5tx0", image: "/photos/hva-home-dusk.jpg" },
    { title: "Propwash Airport (16X)", description: "Justin. Established owners-association airpark, lighted 3,000 ft asphalt runway.", href: "/airparks/16x", image: "/photos/beagle-hangar-biplane.jpg" },
    { title: "Bourland Field (50F)", description: "Cresson. 4,049 ft lighted asphalt, 100LL and Jet-A, one of the largest airpark communities in Texas.", href: "/airparks/50f", image: "/photos/ace-hangar-rows-aerial.jpg" },
  ],
  testimonials: [
    {
      quote: "Very quick and professional. Gave you the straight and current info, whether it was what you wanted to hear or not. Great communicator and listener. Did a ton of work for not a very big commission on this land sale.",
      name: "PJ",
      context: "Bought an aviation lot",
      airpark: "Bridgeport Airport Estates (XBP)",
    },
    {
      quote: "There are only a few hangar homes on the market, and these properties require special expertise in dealing with the sellers, understanding the unique nature of these homes, their features, value, and assisting us through some tough negotiations. Jeanie stayed with us throughout the difficulties, and ultimately helped us get our home. I highly recommend her.",
      name: "Ram Pattisapu",
      context: "Bought an aviation home and hangar",
      airpark: "Propwash Airport (16X)",
    },
    {
      quote: "The search for my very own piece of aviation real estate led me to Jeanie Cline. Her professional attention to every detail closed the deal and made this real estate transaction smooth and easy. Her negotiating skills, flawless contract and follow-on attention made every step in purchasing my permanent landing place a pleasure.",
      name: "Verified buyer",
      context: "Bought an aviation home",
      airpark: "Bridgeport Airport Estates (XBP)",
    },
    {
      quote: "Jeanie is so thorough. She was an incredible advocate as a buyer. She is not pushy at all, and had the perfect tension of helping us make a decision while giving us the room to make our choices. She was on the cutting edge and not out of date on anything pertaining to our purchase.",
      name: "Nikayla Cottone",
      context: "Bought a home",
      airpark: "Justin, TX",
    },
    {
      quote: "Jeanie represented us during the sale of our home. She provided sound advice and helped the process move along quickly and efficiently. Professional, knowledgeable and resourceful. Would highly recommend.",
      name: "Freddy Peralta",
      context: "Sold a home",
      airpark: "Phillips Creek Ranch, Frisco",
    },
  ],
  about: {
    title: "Meet Jeanie Cline",
    subtitle: "Runway Real Estate · Real Broker, LLC",
    image: "/brand/jeanie-cline.jpg",
    blocks: [
      { text: "More than 15 years in aviation real estate, airport development and specialized property sales across Texas. Raised in a family of private pilots and commercial real estate professionals." },
      { heading: "Hangars, airparks and runway access", text: "Private hangars, airpark homes, airport developments, hangar homes, aviation facilities and properties with runway access. From hangar dimensions and taxiway access to airport ownership structures and buyer demand, Jeanie helps clients navigate a market that requires focused knowledge." },
      { heading: "Aero Country East (T31)", text: "North Texas's newest airpark development in McKinney: residential hangar-home lots and new-construction toybox hangars, land and hangar together, no ground lease. Jeanie represents it through Real Broker, LLC, the development's exclusive brokerage." },
    ],
  },
  cta: {
    title: "Cleared for the conversation.",
    description:
      "Buying a hangar home, selling an airport facility, or weighing a lot at Aero Country East: call or text Jeanie directly, or send a note and she will follow up personally.",
    buttonLabel: "Contact Jeanie",
    buttonHref: "/connect",
    image: "/photos/ace-runway-35-aerial.jpg",
  },
  footer: {
    agentName: "Jeanie Cline",
    brokerage: "Real Broker, LLC",
    links: [
      { label: "Airparks", href: "/airparks" },
      { label: "Aero Country East", href: "/aero-country-east" },
      { label: "Properties", href: "/listings" },
      { label: "Buy", href: "/buy" },
      { label: "Sell", href: "/sell" },
      { label: "Journal", href: "/journal" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/connect" },
    ],
    socials: [
      { platform: "instagram", href: "https://www.instagram.com/airparklifestyle/" },
      { platform: "facebook", href: "https://www.facebook.com/profile.php?id=61551380127332" },
      { platform: "youtube", href: "https://www.youtube.com/@jeanieclinetexasrealtoravi2674" },
    ],
    addressLines: ["Dallas / Fort Worth, Texas", "Aero Country East · 99 Lloyd Stearman Dr, McKinney, TX 75071"],
    newsletter: {
      heading: "Hangar Alerts",
      tagline: "New hangar homes, lots and off-market airpark properties, before they hit the portals.",
      consent: CONSENT,
    },
    copyright: `© ${new Date().getFullYear()} Runway Real Estate · Jeanie Cline, Real Broker, LLC · TREC License 0670223`,
    compliance: { image: "/equal-housing.png", text: "Real Broker, LLC · Equal Housing Opportunity" },
  },
};
