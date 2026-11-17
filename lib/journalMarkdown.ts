/* Tiny markdown subset -> HTML for journal bodies. Input is first-party content
   from content/journal.ts, never user input, and every text run is escaped. */

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function inline(s: string): string {
  return esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
}

export function renderJournal(md: string): string {
  const lines = md.trim().split("\n");
  const out: string[] = [];
  let list: "ol" | "ul" | null = null;
  let para: string[] = [];

  const flushPara = () => {
    if (para.length) {
      out.push(`<p>${inline(para.join(" "))}</p>`);
      para = [];
    }
  };
  const closeList = () => {
    if (list) {
      out.push(`</${list}>`);
      list = null;
    }
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushPara();
      closeList();
      continue;
    }
    const h2 = line.match(/^##\s+(.*)/);
    const ol = line.match(/^\d+\.\s+(.*)/);
    const ul = line.match(/^-\s+(.*)/);
    const quote = line.match(/^>\s+(.*)/);
    if (h2) {
      flushPara(); closeList();
      out.push(`<h2>${inline(h2[1])}</h2>`);
    } else if (ol || ul) {
      flushPara();
      const kind = ol ? "ol" : "ul";
      if (list !== kind) { closeList(); out.push(`<${kind}>`); list = kind; }
      out.push(`<li>${inline((ol ?? ul)![1])}</li>`);
    } else if (quote) {
      flushPara(); closeList();
      out.push(`<blockquote>${inline(quote[1])}</blockquote>`);
    } else {
      closeList();
      para.push(line);
    }
  }
  flushPara();
  closeList();
  return out.join("\n");
}
