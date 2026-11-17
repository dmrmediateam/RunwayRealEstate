import type { SiteContent, SubPage } from "@/content/site";

/** Interior page header: navy type panel on the left, photography on the right. */
export default function InteriorHeader({
  page,
  content,
  chips,
}: {
  page: Pick<SubPage, "title" | "preTitle" | "heroImage" | "index">;
  content: SiteContent;
  /** Optional mono chips over the photo (e.g. FAA identifier, county) */
  chips?: string[];
}) {
  return (
    <header className="rw-ih">
      <div className="rw-ih__panel">
        <span className="rw-ih__index">{page.index ?? content.brand.name}</span>
        <h1 className="lp-h1 rw-ih__title">{page.title}</h1>
        {page.preTitle && <p className="rw-ih__pre">{page.preTitle}</p>}
      </div>
      <div className="rw-ih__media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={page.heroImage} alt="" fetchPriority="high" />
        {chips && chips.length > 0 && (
          <div className="rw-ih__meta">
            {chips.map((c) => <span className="rw-id rw-id--dark" key={c}>{c}</span>)}
          </div>
        )}
      </div>
    </header>
  );
}
