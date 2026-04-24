import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = "https://vidayanta.nsjbgroups.com";

const routes = [
  "/",
  "/login",
  "/about",
  "/contact",
  "/pricing",
  "/feedback",
  "/reviews",
  "request-demo",
  "/best-school-erp"
];

const generateSitemap = () => {
  const urls = routes.map(route => {
    return `
    <url>
      <loc>${baseUrl}${route}</loc>
      <priority>${route === "/" ? "1.0" : "0.7"}</priority>
    </url>`;
  }).join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  fs.writeFileSync(path.join(__dirname, "public", "sitemap.xml"), sitemap);
  console.log("✅ Sitemap generated!");
};

generateSitemap();