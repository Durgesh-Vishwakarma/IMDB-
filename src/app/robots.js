import { SITE_URL } from "@/lib/site";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Only /api is blocked here. /search pages are kept crawlable on
        // purpose: they carry their own "noindex, follow" meta tag, which keeps
        // them out of the index while still letting crawlers traverse through
        // to the film pages they link to. A robots.txt Disallow would block the
        // fetch outright, so that meta tag would never be read and those links
        // would never be followed.
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
