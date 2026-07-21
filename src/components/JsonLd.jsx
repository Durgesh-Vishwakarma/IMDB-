/**
 * Renders a schema.org JSON-LD block.
 *
 * Keys with undefined/null/empty values are stripped — Google's Rich Results
 * test flags `"director": null` as an error, and a partially-invalid block can
 * disqualify the whole page from rich results.
 */
function prune(value) {
  if (Array.isArray(value)) {
    const cleaned = value.map(prune).filter((v) => v !== undefined);
    return cleaned.length ? cleaned : undefined;
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value)
      .map(([k, v]) => [k, prune(v)])
      .filter(([, v]) => v !== undefined);
    return entries.length ? Object.fromEntries(entries) : undefined;
  }
  if (value === null || value === "" || value === undefined) return undefined;
  return value;
}

export default function JsonLd({ data }) {
  const cleaned = prune(data);
  if (!cleaned) return null;

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is inserted into a <script> block; escaping "<"
      // prevents a movie overview containing "</script>" from breaking out.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(cleaned).replace(/</g, "\\u003c"),
      }}
    />
  );
}
