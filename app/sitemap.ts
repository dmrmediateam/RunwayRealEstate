import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { legalDocs } from "@/lib/legal";
import { airparks } from "@/content/airparks";
import { journal } from "@/content/journal";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = site.meta.siteUrl ?? "https://example.com";
  const now = new Date();
  return [
    { url: siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/listings`, lastModified: now, changeFrequency: "hourly", priority: 0.9 },
    { url: `${siteUrl}/airparks`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/aero-country-east`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/journal`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    ...airparks.map((a) => ({ url: `${siteUrl}/airparks/${a.id.toLowerCase()}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...journal.map((j) => ({ url: `${siteUrl}/journal/${j.slug}`, lastModified: new Date(j.date), changeFrequency: "yearly" as const, priority: 0.5 })),
    ...site.pages
      .filter((page) => page.slug !== "listings")
      .map((page) => ({
        url: `${siteUrl}/${page.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ...legalDocs(site).map((doc) => ({
      url: `${siteUrl}/legal/${doc.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
