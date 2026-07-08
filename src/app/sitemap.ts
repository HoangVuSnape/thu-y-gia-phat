import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const base = "https://thuygiaphat.vercel.app"; // update when custom domain exists

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/dich-vu", "/gioi-thieu", "/co-so", "/lien-he"].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
