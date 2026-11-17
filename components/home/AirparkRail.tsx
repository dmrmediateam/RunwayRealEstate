"use client";

import { useState } from "react";
import type { Airpark } from "@/content/airparks";

/** Directory preview: rows on the left; the hovered airpark's photo on the right. */
export default function AirparkRail({ airparks }: { airparks: Airpark[] }) {
  const [active, setActive] = useState(0);
  const current = airparks[active];

  return (
    <div className="rw-rail__grid">
      <ul className="rw-rail__list reveal" onMouseLeave={() => setActive(0)}>
        {airparks.map((a, i) => {
          const rwy = a.runways[0];
          return (
            <li key={a.id}>
              <a
                href={`/airparks/${a.id.toLowerCase()}`}
                className={`rw-rail__row${i === active ? " is-active" : ""}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <span className="rw-id">{a.id}</span>
                <span className="rw-rail__name">
                  <strong>{a.community ?? a.name}</strong>
                  <span>{a.city}, Texas · {a.county} County</span>
                </span>
                <span className="rw-rail__spec">
                  <b>{rwy.lengthFt.toLocaleString()} ft</b> {rwy.surface.replace("/", " / ")}
                  {a.fuel ? " · fuel" : ""}
                </span>
                <span className="rw-rail__arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
      <div className="rw-rail__media reveal" data-delay="150" aria-hidden="true">
        {airparks.map((a, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={a.id} src={a.image} alt="" className={i === active ? "is-active" : undefined} loading={i === 0 ? "eager" : "lazy"} />
        ))}
        <div className="rw-rail__caption">
          <div>
            <span>{current.id} · {current.ownership === "private" ? "Private use" : "Public use"}</span>
            <strong>{current.community ?? current.name}</strong>
          </div>
          <span>{current.elevationFt} ft MSL</span>
        </div>
      </div>
    </div>
  );
}
