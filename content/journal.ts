/* ==========================================================================
   Hangar Journal: evergreen guides for airpark and hangar buyers. Body is a
   small markdown subset rendered by lib/journalMarkdown.ts (paragraphs, ##,
   ordered/unordered lists, > quotes, **bold**). Keep claims general and
   verifiable; never quote a specific airpark fact that isn't in airparks.ts.
   ========================================================================== */

export interface JournalPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  readMinutes: number;
  category: string;
  image: string;
  body: string;
}

export const journal: JournalPost[] = [
  {
    slug: "hangar-home-buyers-checklist",
    title: "The hangar home buyer's checklist: twelve things to verify before you write an offer",
    excerpt:
      "A hangar home is a house, an aircraft facility and a membership in an airport all at once. Here is what Jeanie checks before a client commits.",
    date: "2026-11-10",
    readMinutes: 7,
    category: "Buying",
    image: "/photos/hva-hangar-dusk.jpg",
    body: `
A hangar home is three purchases in one: a house, an aircraft facility, and a stake in an airport that someone else operates. Most of what decides whether it works for you never appears in an MLS field. These are the twelve things Jeanie verifies for every client before an offer goes in.

## The airport itself

1. **Who owns the runway.** Some airparks are owned by the property owners' association, some by a private landowner, and some sit beside a municipal airport. Each model changes your rights, your dues and what happens if the owner's plans change. Pull the governing documents, not the listing description.
2. **Public use or private use.** A privately owned, public-use field welcomes transient traffic; a private-use field requires prior permission. Neither is better, but they feel very different on a Saturday morning.
3. **Runway length, width and surface, from the FAA record.** Marketing copy rounds up. Read the FAA Form 5010 data for the field, then run your aircraft's performance numbers at the elevation and on a hot Texas afternoon.
4. **Lighting and fuel.** Can you come home after dark? Is there fuel on the field, and is it available to you or only to co-op members? If there is no fuel, where is the nearest pump and how far is it by air?
5. **Operating rules.** Touch-and-go restrictions, noise abatement, weight limits, flight training bans, night closures. These are usually in the association rules and the FAA remarks, and they are enforced by your neighbors.

## The property

6. **Taxiway access and easements.** Is the taxiway to your lot owned by you, by the association, or crossing someone else's land? Through-the-fence arrangements to a municipal field need to be in writing with the airport sponsor.
7. **Hangar door type, clear opening and clear height.** Measure the door opening, not the building. Bifold, hydraulic and sliding doors each have maintenance profiles, and a door that clears your current airplane may not clear the next one.
8. **Slab, drainage and structure.** Hangar slabs carry point loads and get wet. Ask for a structural inspection by someone who has inspected hangars before, and walk the site after rain if you can.
9. **Utilities and insurance.** Confirm water, sewer or septic, electric service to the hangar, and fiber. Then call an aviation-literate insurance broker before closing, not after.

## The deal

10. **Association dues, assessments and reserves.** Airport infrastructure is expensive. A runway resurfacing that was never reserved for becomes a special assessment.
11. **Deed restrictions and permitted use.** Can you run a business from the hangar? Store a motorcoach? Rent to a non-resident? The answer is in the covenants.
12. **Financing.** Not every lender understands a house with a 60-foot door attached. Jeanie works with lenders who finance hangar homes regularly, and knowing that before you shop keeps a good contract from falling apart on appraisal.

> Inventory at most North Texas airparks is measured in single digits per year. Do the diligence early, so that when the right hangar home lists you can move with confidence instead of starting the homework.
`,
  },
  {
    slug: "own-the-land-vs-ground-lease",
    title: "Own the land or ground lease? How hangar ownership actually works",
    excerpt:
      "Two hangars can look identical on the ramp and be completely different assets. The difference is what happens to the dirt underneath.",
    date: "2026-11-03",
    readMinutes: 6,
    category: "Ownership",
    image: "/photos/ace-hangar-rows-aerial.jpg",
    body: `
Two hangars can look identical from the ramp and be completely different assets. The difference is the dirt underneath, and whether you own it.

## Fee-simple: you own the land and the hangar

At private residential airparks and at developments like Aero Country East, the hangar sits on a lot you own outright. The deed is yours, the building is yours, and the arrangement does not expire. You pay property taxes and association dues, and you follow the association's rules, but nobody can decline to renew your right to be there.

Conventional and portfolio lenders understand fee-simple property. Appraisers can find comparables. Resale is a normal real estate transaction. This is the simplest form of hangar ownership, and it is why "own the land, no ground lease" is worth saying out loud in a listing.

## Ground lease: you own the building, the airport owns the land

At most municipal and county airports, private hangars are built on long-term ground leases from the airport sponsor. You own the improvements; the city or airport authority owns the land and collects rent. Leases commonly run twenty to forty years, often with reversion clauses that hand the building to the airport at the end of the term.

Ground-lease hangars can be excellent buys, especially for commercial aviation use at a larger field with instrument approaches and services. But they underwrite differently:

- **Term matters.** A hangar with eight years left on its lease is a very different asset from one with thirty. Financing gets harder as the term shortens.
- **Rent escalates.** Read the escalation schedule and any fair-market-value reset language.
- **Transfer requires consent.** Most sponsors must approve an assignment, and some charge for it.
- **Reversion is real.** Understand exactly what happens to the building at the end of the term.

## Condominium and association structures

A third model, common in hangar communities, is a condominium or association where you own your unit and share the ramp, taxiways and common areas. The documents govern everything from door colors to whether you can run a maintenance shop. They are worth reading twice.

## How to compare

Price per square foot is almost meaningless across these structures. Compare instead on total cost of occupancy over your expected hold, the strength of your rights, and your exit. A fee-simple toybox hangar at a residential airpark and a ground-lease box hangar at a towered field can both be the right answer. They are just answers to different questions.

> Jeanie's background is in airport development as well as sales, which means she reads ground leases, airport layout plans and association documents as part of the work, not as an afterthought.
`,
  },
  {
    slug: "what-is-a-toybox-hangar",
    title: "What a toybox hangar is, and who is buying them",
    excerpt:
      "Part aircraft hangar, part car barn, part clubhouse. Toybox hangars are the fastest-growing product in aviation real estate, and North Texas is building them.",
    date: "2026-10-27",
    readMinutes: 5,
    category: "Toybox Hangars",
    image: "/photos/ace-hangar-cars.jpg",
    body: `
Walk into a modern toybox hangar and the first thing you notice is that it is not quite a hangar. There is an airplane, usually. There is also a row of cars under good light, a bar with a propeller over it, a lounge, a full bath, and a door big enough to drive a motorcoach through. It is a hangar designed around the owner rather than the aircraft.

## What makes it a toybox

The defining features are consistent across the category:

- **A clear-span steel building**, commonly in the 60 by 60 foot range, with ceiling height to clear a tail.
- **A hydraulic or bifold door** wide enough for an aircraft and tall enough for an RV.
- **Finished interior space**: climate control in part or all of the building, a bathroom, a kitchenette, often a mezzanine.
- **Utilities to residential standards**: water, sewer, electric, fiber.
- **A residential airpark address**, so the hangar has taxiway access to a runway and sits within an association rather than on a commercial ramp.

At Aero Country East in McKinney, the new-construction toybox hangars are 60 by 60 by 26 feet with a 54 by 18 foot hydraulic door, a full bath with washer and dryer hookups, a kitchenette, and city utilities and fiber. Land and hangar sell together with no ground lease.

## Who buys them

The buyer pool is wider than pilots. Jeanie's toybox clients include:

- **Owner-pilots** who want the airplane five minutes from home instead of forty, with somewhere to sit after the flight.
- **Car and motorcycle collectors** who have run out of garage and want a secure, conditioned space that doubles as a place to host.
- **RV and motorcoach owners** who are tired of storage lots.
- **Business owners and executives** who use the hangar as a private retreat and meeting space for a small circle.

## What to check before you buy

Use restrictions vary. Many developments, Aero Country East among them, prohibit retail and commercial use and flight schools; personal aircraft, car collections, RVs, motorcoaches and motorcycles are the intended use. Confirm whether overnight stays are permitted, what the association requires for exterior finishes, and how insurance treats a building that is part hangar and part lounge.

> If you have ever stood in your garage and wished it were three times bigger, had a bathroom, and opened onto a runway, this is the product that was built for you.
`,
  },
];

export const journalBySlug = (slug: string) => journal.find((j) => j.slug === slug);
