import type { Metadata } from "next";
import SiteChrome from "@/components/SiteChrome";
import InteriorHeader from "@/components/InteriorHeader";
import AirparkDirectory from "@/components/airparks/AirparkDirectory";
import { airparks } from "@/content/airparks";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Texas Airpark Directory: North Texas Fly-In Communities – Runway Real Estate",
  description:
    "Every residential airpark and hangar community in Dallas/Fort Worth with verified FAA runway data: Aero Country (T31), Hidden Valley (5TX0), Propwash (16X), Bourland Field (50F), Hicks (T67) and more.",
  alternates: { canonical: "/airparks" },
};

export default async function AirparksPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const siteUrl = site.meta.siteUrl ?? "";
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "North Texas Airpark Directory",
    itemListElement: airparks.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${siteUrl}/airparks/${a.id.toLowerCase()}`,
      name: `${a.community ?? a.name} (${a.id})`,
    })),
  };

  return (
    <SiteChrome content={site}>
      <InteriorHeader
        content={site}
        page={{
          index: "Texas Airpark Directory",
          title: "Thirteen North Texas airparks. One verified directory.",
          preTitle:
            "Runway length and surface, lighting, elevation, CTAF, fuel and ownership for every fly-in community in Dallas/Fort Worth, read from FAA data and the associations themselves.",
          heroImage: "/photos/airpark-runway-hangars-aerial.jpg",
        }}
        chips={["DFW", `${airparks.length} fields`, "FAA 5010 data"]}
      />
      <section className="rw-dir">
        <div className="lp-container">
          <AirparkDirectory airparks={airparks} initialQuery={q ?? ""} />
          <p className="rw-dir__note">
            Airfield data is compiled from FAA Form 5010 records as published by AirNav and airport-data.com, plus
            association and developer websites, and was last verified on {airparks[0].lastVerified}. It is published for
            real estate research only. Verify every figure against the current FAA Chart Supplement and NOTAMs before
            flight, and confirm access procedures with the airport owner. Runway Real Estate and Real Broker, LLC are
            not affiliated with or endorsed by any airport or association listed here.
          </p>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
    </SiteChrome>
  );
}
