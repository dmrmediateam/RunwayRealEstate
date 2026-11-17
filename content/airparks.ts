/* ==========================================================================
   North Texas airpark directory. Every airfield value below was read from
   FAA Form 5010 data as published by AirNav / airport-data.com (effective
   2026-09-03) or the named source. Fields we could not verify are null and
   render as "Verify" rather than a guess. Keep it that way: pilots check.
   ========================================================================== */

export type Region = "North" | "Northwest" | "West" | "South";

export interface Runway {
  designation: string;
  lengthFt: number;
  widthFt: number | null;
  surface: "asphalt" | "concrete" | "turf" | "asphalt/turf";
  surfaceNote?: string;
  lighted: boolean | null;
}

export interface Airpark {
  /** FAA location identifier, also the URL segment (lowercased) */
  id: string;
  name: string;
  /** Community name when it differs from the airport's FAA name */
  community?: string;
  city: string;
  county: string;
  zip?: string;
  region: Region;
  ownership: "public-use" | "private";
  owner?: string;
  runways: Runway[];
  elevationFt: number;
  fuel: string | null;
  ctafMhz: number | null;
  /** One line for the directory card */
  summary: string;
  /** Editorial paragraphs for the airpark page */
  overview: string[];
  /** Short, factual bullets a buyer should know before writing an offer */
  buyerNotes: string[];
  image: string;
  /** Marks Jeanie's featured development */
  featured?: boolean;
  sources: string[];
  lastVerified: string;
}

const V = "2026-11-17";

export const airparks: Airpark[] = [
  {
    id: "T31",
    name: "Aero Country Airport",
    community: "Aero Country & Aero Country East",
    city: "McKinney",
    county: "Collin",
    zip: "75071",
    region: "North",
    ownership: "public-use",
    owner: "Aero Country Property Owners Association",
    runways: [
      { designation: "17/35", lengthFt: 4352, widthFt: 60, surface: "asphalt/turf", surfaceNote: "South 3,000 ft asphalt and lighted; north section turf", lighted: true },
    ],
    elevationFt: 765,
    fuel: "100LL, 24-hour self-serve",
    ctafMhz: 122.9,
    summary: "North Texas's newest airpark development, between Prosper, Frisco and Plano. Jeanie is the exclusive broker for Aero Country East.",
    overview: [
      "Aero Country is a privately owned, public-use airport in McKinney, Texas, owned and governed by its property owners association. It sits in the North Dallas corridor between Prosper, Frisco and Plano, which makes it one of the few residential airparks in the country where you can keep an airplane at the house and still be minutes from a major metro.",
      "The east side of the runway is home to Aero Country East, a 30-plus acre development of residential hangar-home lots and new-construction toybox hangars. Land and hangar sell together: there is no ground lease. Jeanie Cline represents the development as its exclusive broker through Real Broker, LLC.",
      "AirNav remarks flag the field as a residential airpark: expect vehicles on taxiways, and note that transient flight training and touch-and-go operations are not permitted.",
    ],
    buyerNotes: [
      "Privately owned by the POA, open to the public. Review the POA rules and airport operating rules before you offer.",
      "The runway's paved, lighted section is roughly 3,000 ft; the north portion is turf. Plan performance accordingly.",
      "Aero Country East lots are zoned for detached residential hangar homes. Toybox hangars carry use restrictions: no retail or commercial use and no flight schools.",
      "On-field 100LL self-serve fuel is available 24 hours.",
    ],
    image: "/photos/ace-runway-35-aerial.jpg",
    featured: true,
    sources: ["https://www.airnav.com/airport/T31", "https://airport-data.com/airport/T31/", "https://aerocountryeast.com"],
    lastVerified: V,
  },
  {
    id: "5TX0",
    name: "Hidden Valley Airpark",
    city: "Shady Shores",
    county: "Denton",
    zip: "76208",
    region: "North",
    ownership: "private",
    owner: "Hidden Valley HOA",
    runways: [{ designation: "17/35", lengthFt: 2600, widthFt: 35, surface: "asphalt", lighted: null }],
    elevationFt: 611,
    fuel: "100LL, fuel co-op members only",
    ctafMhz: 122.9,
    summary: "A gated, lakeside fly-in community near Lake Lewisville with an HOA-owned paved strip and its own fuel co-op.",
    overview: [
      "Hidden Valley Airpark is a private-use residential airpark in Shady Shores, on the north shore of Lake Lewisville in Denton County. The field is owned by the Hidden Valley homeowners association and prior permission is required before landing.",
      "Homes here range from original airpark houses to new custom builds with attached hangars, and the community's location puts Denton, Frisco and the DFW airports all within a short drive.",
    ],
    buyerNotes: [
      "Private-use field: PPR. Ask the HOA about guest procedures before you fly in for a showing.",
      "Fuel is 100LL through a members-only co-op; confirm membership terms with the association.",
      "Runway is 2,600 by 35 ft asphalt. Lighting is not listed in FAA data; verify directly.",
    ],
    image: "/photos/hva-home-dusk.jpg",
    sources: ["https://www.airnav.com/airport/5TX0", "https://airport-data.com/airport/5TX0/"],
    lastVerified: V,
  },
  {
    id: "F69",
    name: "Air Park-Dallas Airport",
    community: "Air Park Estates (Dallas Air Park Estates)",
    city: "Plano",
    county: "Collin",
    zip: "75093",
    region: "North",
    ownership: "public-use",
    owner: "Crow-Billingsley Airpark Ltd",
    runways: [{ designation: "16/34", lengthFt: 3080, widthFt: 30, surface: "asphalt", lighted: null }],
    elevationFt: 695,
    fuel: null,
    ctafMhz: 122.9,
    summary: "The closest-in airpark to Dallas: a 1965 runway inside Addison's Class D, ringed by homes with covenant-protected runway access.",
    overview: [
      "Air Park-Dallas opened in 1965 as a privately owned, public-use airport on the Plano and Collin County line. Unusually, the runway is owned by a private landowner rather than the homeowners; the surrounding Air Park Estates homes hold runway access under restrictive covenants, and residents are organized through the Air Park Common Area Preservation Association.",
      "The field sits inside Addison Airport's Class D airspace, which means a radio call to Addison Tower before departure and arrival. For a pilot who works in Dallas or Plano, nothing else is this close to the office.",
    ],
    buyerNotes: [
      "Runway ownership and access rights here are covenant-based. Have your title company pull the restrictive covenants and confirm access before closing.",
      "Operations are inside Addison Class D; plan on tower communication.",
      "No fuel on the field. FAA data lists the asphalt in poor condition; inspect it yourself.",
    ],
    image: "/photos/airpark-runway-homes-aerial.jpg",
    sources: ["https://www.airnav.com/airport/F69", "https://en.wikipedia.org/wiki/Air_Park-Dallas_Airport"],
    lastVerified: V,
  },
  {
    id: "58T",
    name: "Heritage Creek Airstrip",
    community: "Heritage Creek Airpark",
    city: "Rhome",
    county: "Wise",
    zip: "76078",
    region: "Northwest",
    ownership: "public-use",
    owner: "Heritage Creek Pilots Association",
    runways: [{ designation: "13/31", lengthFt: 3000, widthFt: 60, surface: "turf", lighted: true }],
    elevationFt: 883,
    fuel: null,
    ctafMhz: 122.9,
    summary: "Acreage runway lots on a lighted 3,000 ft turf strip in Wise County, with room for horses and hangars both.",
    overview: [
      "Heritage Creek is a pilots-association airpark northwest of Fort Worth near Rhome. The strip is turf, 3,000 by 60 ft, with low-intensity edge lights activated on CTAF, and the surrounding sections offer multi-acre runway lots where horses are permitted.",
      "It is a taildragger and backcountry-friendly field in a part of the county that still feels like ranch land, fifteen minutes from the Alliance corridor.",
    ],
    buyerNotes: [
      "Turf runway: ask about drainage and how the association handles wet-weather closures.",
      "Rhome Meadows (T76) is about 1.5 miles away; be aware of overlapping traffic patterns.",
      "Decatur-area schools; confirm ISD boundaries per lot.",
    ],
    image: "/photos/airpark-homes-aerial.jpg",
    sources: ["https://www.airnav.com/airport/58T", "https://airport-data.com/airport/58T/"],
    lastVerified: V,
  },
  {
    id: "16X",
    name: "Propwash Airport",
    city: "Justin",
    county: "Denton",
    zip: "76247",
    region: "Northwest",
    ownership: "public-use",
    owner: "Propwash Owners Association",
    runways: [{ designation: "17/35", lengthFt: 3000, widthFt: 60, surface: "asphalt", lighted: true }],
    elevationFt: 804,
    fuel: null,
    ctafMhz: 122.9,
    summary: "An established owners-association airpark in Justin with a lighted 3,000 ft paved runway and a strong warbird and homebuilt culture.",
    overview: [
      "Propwash is one of the longer-standing airparks in the Metroplex, owned by the Propwash Owners Association and open to the public. The runway is asphalt, 3,000 by 60 ft, with pilot-controlled lighting on the CTAF.",
      "Homes range across several decades of construction, and hangar homes here come to market rarely. Jeanie has represented buyers at Propwash through the kind of negotiation these one-of-a-kind properties tend to require.",
    ],
    buyerNotes: [
      "Hangar-home inventory is thin; be ready to move when the right one lists.",
      "No fuel listed on the field in FAA data. Nearby options include Northwest Regional (52F).",
      "Association rules govern hangar use and aircraft operations; request them early.",
    ],
    image: "/photos/beagle-hangar-biplane.jpg",
    sources: ["https://www.airnav.com/airport/16X", "https://airport-data.com/airport/16X/"],
    lastVerified: V,
  },
  {
    id: "T56",
    name: "Eagle's Nest Estates Airport",
    city: "Midlothian",
    county: "Ellis",
    zip: "76065",
    region: "South",
    ownership: "public-use",
    owner: "Eagles Nest Property Owners Association",
    runways: [{ designation: "17/35", lengthFt: 3216, widthFt: 36, surface: "concrete", lighted: true }],
    elevationFt: 780,
    fuel: null,
    ctafMhz: 122.975,
    summary: "South of Dallas in Midlothian: a concrete 3,216 ft runway with medium-intensity lighting and threshold strobes.",
    overview: [
      "Eagle's Nest Estates is a property-owners-association airpark in Midlothian, Ellis County, and the primary fly-in community south of the Metroplex. The runway is concrete in good condition, 3,216 by 36 ft, with medium-intensity edge lights and strobes marking both thresholds.",
      "Because there is no line of sight between the runway ends, the lights are used for all operations. Lots here tend to be larger, with a rural feel and a quick run up US-67 into Dallas.",
    ],
    buyerNotes: [
      "Unique CTAF of 122.975; brief any ferry pilot.",
      "No fuel on the field. Mid-Way Regional (JWY) is the nearest full-service option.",
      "POA governs hangar setbacks and taxiway access; review before you design a build.",
    ],
    image: "/photos/home-481-addison-aerial.jpg",
    sources: ["https://www.airnav.com/airport/T56", "https://airport-data.com/airport/T56/"],
    lastVerified: V,
  },
  {
    id: "T38",
    name: "Bar V K Airport",
    community: "Bar V K Air Ranch Estates",
    city: "Sanger",
    county: "Denton",
    zip: "76266",
    region: "North",
    ownership: "public-use",
    owner: "Bar V K Air Ranch Estates Association",
    runways: [{ designation: "18/36", lengthFt: 2900, widthFt: 100, surface: "turf", lighted: true }],
    elevationFt: 765,
    fuel: null,
    ctafMhz: 122.85,
    summary: "A wide turf ranch strip north of Denton with glider activity and acreage homesites.",
    overview: [
      "Bar V K Air Ranch Estates sits north of Denton near Sanger and Bolivar. Its turf runway is unusually wide at 2,900 by 100 ft, with low-intensity lighting, a 1,400 ft turf taxiway at the north end, and active glider operations.",
      "The field is closed at night to non-residents and offers no services, which is exactly the point for owners who want quiet acreage and a strip out the back door.",
    ],
    buyerNotes: [
      "Turf is soft when wet; ask the association about seasonal closures.",
      "CTAF is 122.85 and lights activate on 122.825 per FAA remarks; verify current procedures.",
      "No fuel or services on the field.",
    ],
    image: "/photos/airpark-runway-hangars-aerial.jpg",
    sources: ["https://www.airnav.com/airport/T38", "https://airport-data.com/airport/T38/"],
    lastVerified: V,
  },
  {
    id: "50F",
    name: "Bourland Field",
    community: "Bourland Field Estates",
    city: "Cresson",
    county: "Parker",
    zip: "76035",
    region: "West",
    ownership: "public-use",
    owner: "Bourland Field Estates HOA",
    runways: [{ designation: "17/35", lengthFt: 4049, widthFt: 60, surface: "asphalt", lighted: true }],
    elevationFt: 873,
    fuel: "100LL self-serve and Jet-A",
    ctafMhz: 123.0,
    summary: "One of the largest airpark communities in Texas: a 4,049 ft lighted asphalt runway with 100LL and Jet-A on the field.",
    overview: [
      "Developed in 1981 southwest of Fort Worth, Bourland Field is a 140-acre HOA-owned, public-use airport with well over a hundred based aircraft, a community hangar and T-hangars. The runway is asphalt in good condition, 4,049 by 60 ft, and both 100LL and Jet-A are available.",
      "For turbine owners who want a residential airpark, Bourland's runway length and fuel make it the obvious shortlist entry on the west side of the Metroplex.",
    ],
    buyerNotes: [
      "Aircraft over 12,500 lb are prohibited; transient student traffic is not permitted.",
      "HOA-owned field: hangar and home deed restrictions apply. Pull the governing documents before you offer.",
      "Weatherford and Granbury are both within an easy drive; confirm ISD per address.",
    ],
    image: "/photos/ace-hangar-rows-aerial.jpg",
    sources: ["https://www.airnav.com/airport/50F", "https://en.wikipedia.org/wiki/Bourland_Field"],
    lastVerified: V,
  },
  {
    id: "XBP",
    name: "Bridgeport Municipal Airport",
    community: "Bridgeport Airport Estates",
    city: "Bridgeport",
    county: "Wise",
    zip: "76426",
    region: "Northwest",
    ownership: "public-use",
    owner: "City of Bridgeport",
    runways: [{ designation: "18/36", lengthFt: 5005, widthFt: 75, surface: "asphalt", lighted: true }],
    elevationFt: 864,
    fuel: "100LL 24-hour self-serve and Jet-A",
    ctafMhz: 123.0,
    summary: "Homes and aviation lots with taxiway access to a city-owned 5,005 ft runway near Lake Bridgeport.",
    overview: [
      "Bridgeport Airport Estates adjoins Bridgeport Municipal, a city-owned public airport in Wise County with the longest runway on this list: 5,005 by 75 ft asphalt, lighted, with 24-hour 100LL and Jet-A. Lots in the Estates connect to the field by taxiway.",
      "It is an hour northwest of Fort Worth near Lake Bridgeport, and Jeanie has closed both aviation lots and hangar homes here for buyers looking for runway length without a big-city price.",
    ],
    buyerNotes: [
      "Taxiway access from a private subdivision to a municipal airport runs on agreements with the city. Confirm the terms and any fees in writing.",
      "A 5,000 ft runway with Jet-A opens the door to light jets and turboprops; check weight limits with the airport manager.",
      "Lake Bridgeport is minutes away; many owners pair a hangar home with a boat.",
    ],
    image: "/photos/rockport-hangar-open.jpg",
    sources: ["https://www.airnav.com/airport/XBP", "https://en.wikipedia.org/wiki/Bridgeport_Municipal_Airport"],
    lastVerified: V,
  },
  {
    id: "XA86",
    name: "Driftwood Ranch Airport",
    community: "Driftwood Ranch on the Brazos",
    city: "Weatherford",
    county: "Parker",
    zip: "76087",
    region: "West",
    ownership: "private",
    owner: "Driftwood Ranch Airpark Association",
    runways: [{ designation: "16/34", lengthFt: 2975, widthFt: 40, surface: "asphalt", lighted: null }],
    elevationFt: 711,
    fuel: null,
    ctafMhz: 122.9,
    summary: "A gated ranch community on the Brazos River with a private paved strip, taxiway hangar lots and a community boat launch.",
    overview: [
      "Driftwood Ranch is a gated community south of Weatherford along the Brazos River. Its private-use airstrip is asphalt in good condition, 2,975 by 40 ft, operated by the airpark association on a prior-permission basis with noise-sensitive procedures and no touch-and-goes without approval.",
      "Owners belong to two associations, one for the neighborhood and one for the airpark, and hangar lots connect to the runway by taxiway. The river frontage, boat dock and launch make it a rare combination of flying and water.",
    ],
    buyerNotes: [
      "Two mandatory associations with separate dues; budget for both.",
      "Private-use, PPR field; runway lighting is not listed in FAA data.",
      "Weatherford ISD per listings; verify per lot.",
    ],
    image: "/photos/pool-sunset.jpg",
    sources: ["https://www.airnav.com/airport/XA86", "https://airport-data.com/airport/XA86/"],
    lastVerified: V,
  },
  {
    id: "T67",
    name: "Hicks Airfield",
    city: "Fort Worth",
    county: "Tarrant",
    zip: "76179",
    region: "Northwest",
    ownership: "public-use",
    owner: "Hicks Airfield Pilots Association",
    runways: [{ designation: "14/32", lengthFt: 3740, widthFt: 60, surface: "asphalt", lighted: true }],
    elevationFt: 855,
    fuel: "100LL, 24-hour self-serve",
    ctafMhz: 123.05,
    summary: "Fort Worth's hangar community: hundreds of based aircraft, on-field businesses and commercial hangars for sale and lease.",
    overview: [
      "Hicks Airfield opened in 1985 northwest of Fort Worth and is owned and governed by the Hicks Airfield Pilots Association. With several hundred based aircraft it is one of the busiest private fields in Texas, and unlike most entries on this list it is a hangar community rather than a residential airpark: maintenance shops, builders and aviation businesses operate here with association approval.",
      "For buyers who want a commercial or investment hangar close to the city, or a place to base a collection, Hicks is the first call.",
    ],
    buyerNotes: [
      "On-field businesses require HAPA approval; confirm permitted use before purchasing for commercial purposes.",
      "Expect vehicle traffic near hangars and on taxiways; the PAPI is non-standard per FAA remarks.",
      "Traffic pattern altitude is 1,700 ft MSL.",
    ],
    image: "/photos/ace-hangar-cars.jpg",
    sources: ["https://www.airnav.com/airport/T67", "https://en.wikipedia.org/wiki/Hicks_Airfield", "https://www.t67.org"],
    lastVerified: V,
  },
  {
    id: "T76",
    name: "Rhome Meadows Airport",
    city: "Rhome",
    county: "Wise",
    zip: "76078",
    region: "Northwest",
    ownership: "public-use",
    owner: "Rhome Meadows Management Group",
    runways: [{ designation: "13/31", lengthFt: 3700, widthFt: 60, surface: "turf", lighted: null }],
    elevationFt: 900,
    fuel: null,
    ctafMhz: 122.9,
    summary: "A 238-acre turf field north of Rhome with a 3,700 ft strip and quiet, noise-abatement flying.",
    overview: [
      "Rhome Meadows is a privately owned, public-use turf airport on 238 acres in Wise County. The runway is 3,700 by 60 ft, defined by mowing, and the field runs strict noise abatement: no repetitive takeoffs and landings and no touch-and-goes.",
      "It is the quieter neighbor to Heritage Creek, a mile and a half to the northeast, and suits owners who want land first and a strip second.",
    ],
    buyerNotes: [
      "Turf runway is soft when wet.",
      "A 248 ft cell tower stands a quarter mile west of the runway; note it in your approach briefing.",
      "No fuel or services on the field.",
    ],
    image: "/photos/airpark-homes-aerial.jpg",
    sources: ["https://www.airnav.com/airport/T76", "https://en.wikipedia.org/wiki/Rhome_Meadows_Airport"],
    lastVerified: V,
  },
  {
    id: "7TX4",
    name: "Hillcrest Airport",
    community: "Hillcrest Estates",
    city: "Keller",
    county: "Tarrant",
    zip: "76244",
    region: "Northwest",
    ownership: "private",
    owner: "Hillcrest Airport Homeowners Association",
    runways: [{ designation: "17/35", lengthFt: 2000, widthFt: 30, surface: "asphalt", lighted: true }],
    elevationFt: 710,
    fuel: null,
    ctafMhz: 122.9,
    summary: "A small, private HOA strip tucked into Keller with acre-plus lots and Keller ISD schools.",
    overview: [
      "Hillcrest Estates is a private residential airpark in Keller, north of Fort Worth, owned by its homeowners association. The strip is short at 2,000 by 30 ft asphalt with low-intensity edge lights, which keeps it a light-aircraft field, and lots run just over an acre in one of the most sought-after school districts in Tarrant County.",
      "For a family that wants suburban schools and a plane in the backyard, there is nothing else like it on the north side of Fort Worth.",
    ],
    buyerNotes: [
      "Private-use, PPR field with a 2,000 ft runway; check your aircraft's performance numbers honestly.",
      "HOA assessments apply; listings have cited annual dues, so request the current figure from the association.",
      "Keller ISD per listings; verify per address.",
    ],
    image: "/photos/hva-hangar-dusk.jpg",
    sources: ["https://www.airnav.com/airport/7TX4", "https://airport-data.com/airport/7TX4/"],
    lastVerified: V,
  },
];

export const airparkById = (id: string): Airpark | undefined =>
  airparks.find((a) => a.id.toLowerCase() === id.toLowerCase());

export const REGIONS: Region[] = ["North", "Northwest", "West", "South"];
