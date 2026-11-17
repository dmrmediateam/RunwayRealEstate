import type { Airpark } from "@/content/airparks";

export function runwayLine(a: Airpark): string {
  const r = a.runways[0];
  const surf = r.surface === "asphalt/turf" ? "asphalt + turf" : r.surface;
  return `${r.lengthFt.toLocaleString()}${r.widthFt ? ` × ${r.widthFt}` : ""} ft ${surf}`;
}

export default function AirparkCard({ airpark: a, index = 0 }: { airpark: Airpark; index?: number }) {
  return (
    <a href={`/airparks/${a.id.toLowerCase()}`} className="rw-card reveal" data-delay={(index % 3) * 80 || undefined}>
      <div className="rw-card__media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={a.image} alt={`${a.community ?? a.name}, ${a.city}, Texas`} loading={index < 3 ? "eager" : "lazy"} />
        <span className="rw-id">{a.id}</span>
        {a.featured && <span className="rw-card__flag">Now selling</span>}
      </div>
      <div className="rw-card__body">
        <h3>{a.community ?? a.name}</h3>
        <span className="rw-card__city">{a.city}, Texas · {a.county} County · {a.region} DFW</span>
        <p className="rw-card__sum">{a.summary}</p>
        <div className="rw-card__specs">
          <span><b>RWY</b> {runwayLine(a)}</span>
          <span><b>ELEV</b> {a.elevationFt} ft</span>
          <span><b>{a.fuel ? "FUEL" : "NO FUEL"}</b>{a.fuel ? ` ${a.fuel.split(",")[0]}` : ""}</span>
          <span><b>{a.ownership === "private" ? "PRIVATE · PPR" : "PUBLIC USE"}</b></span>
        </div>
      </div>
    </a>
  );
}
