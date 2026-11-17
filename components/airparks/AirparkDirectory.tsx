"use client";

import { useMemo, useState } from "react";
import type { Airpark, Region } from "@/content/airparks";
import { REGIONS } from "@/content/airparks";
import AirparkCard from "@/components/airparks/AirparkCard";

type Surface = "all" | "paved" | "turf";

/** Filterable grid of airparks: text search over name, city, county, identifier; region and surface toggles. */
export default function AirparkDirectory({ airparks, initialQuery = "" }: { airparks: Airpark[]; initialQuery?: string }) {
  const [q, setQ] = useState(initialQuery);
  const [region, setRegion] = useState<Region | "all">("all");
  const [surface, setSurface] = useState<Surface>("all");
  const [fuelOnly, setFuelOnly] = useState(false);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return airparks.filter((a) => {
      if (region !== "all" && a.region !== region) return false;
      if (surface === "paved" && a.runways[0].surface === "turf") return false;
      if (surface === "turf" && !a.runways[0].surface.includes("turf")) return false;
      if (fuelOnly && !a.fuel) return false;
      if (!needle) return true;
      const hay = [a.id, a.name, a.community, a.city, a.county, a.zip, a.summary].filter(Boolean).join(" ").toLowerCase();
      return hay.includes(needle);
    });
  }, [airparks, q, region, surface, fuelOnly]);

  return (
    <div className="rw-dir__inner">
      <div className="rw-dir__bar" role="search">
        <label className="rw-dir__search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Airpark, city, county or identifier (e.g. T31)"
            aria-label="Search airparks"
          />
        </label>
        <div className="rw-dir__group" role="group" aria-label="Region">
          <button type="button" aria-pressed={region === "all"} onClick={() => setRegion("all")}>All DFW</button>
          {REGIONS.map((r) => (
            <button type="button" key={r} aria-pressed={region === r} onClick={() => setRegion(r)}>{r}</button>
          ))}
        </div>
        <div className="rw-dir__group" role="group" aria-label="Runway surface">
          <button type="button" aria-pressed={surface === "all"} onClick={() => setSurface("all")}>Any surface</button>
          <button type="button" aria-pressed={surface === "paved"} onClick={() => setSurface("paved")}>Paved</button>
          <button type="button" aria-pressed={surface === "turf"} onClick={() => setSurface("turf")}>Turf</button>
        </div>
        <div className="rw-dir__group" role="group" aria-label="Fuel">
          <button type="button" aria-pressed={fuelOnly} onClick={() => setFuelOnly((v) => !v)}>Fuel on field</button>
        </div>
        <span className="rw-dir__count" aria-live="polite">{results.length} of {airparks.length} airparks</span>
      </div>

      {results.length === 0 ? (
        <div className="rw-dir__empty">
          <p>No airpark matches that search yet. Try an identifier like <b>T31</b>, a city like <b>Justin</b>, or clear the filters.</p>
        </div>
      ) : (
        <div className="rw-dir__grid">
          {results.map((a, i) => <AirparkCard airpark={a} key={a.id} index={i} />)}
        </div>
      )}
    </div>
  );
}
