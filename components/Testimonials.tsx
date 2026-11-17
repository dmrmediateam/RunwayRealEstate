import type { SiteContent } from "@/content/site";

/** Masonry wall of client reviews on navy, with the airpark as a mono chip. */
export default function Testimonials({ content, id }: { content: SiteContent; id?: string }) {
  const items = content.testimonials ?? [];
  if (items.length === 0) return null;
  return (
    <section className="rw-quotes lp-vertical-paddings" id={id}>
      <div className="lp-container">
        <div className="rw-quotes__head reveal">
          <h2 className="lp-h2">What pilots and owners say about working with Jeanie.</h2>
          <p>Client reviews · Verified buyers and sellers</p>
        </div>
        <div className="rw-quotes__grid">
          {items.map((t, i) => (
            <figure className="rw-quote reveal" data-delay={(i % 3) * 100 || undefined} key={t.name + i}>
              <span className="rw-quote__mark" aria-hidden="true">&ldquo;</span>
              <blockquote><p>{t.quote}</p></blockquote>
              <div className="rw-quote__foot">
                <strong>{t.name}</strong>
                {t.context && <span>{t.context}</span>}
                {t.airpark && <span className="rw-id rw-id--dark">{t.airpark}</span>}
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
