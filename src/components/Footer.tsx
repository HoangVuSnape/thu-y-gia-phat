import Link from "next/link";
import { site } from "@/data/site";
import { locations } from "@/data/locations";

export default function Footer() {
  return (
    <footer className="mt-16 bg-ink text-cream">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="font-heading text-xl font-bold text-accent">{site.name}</p>
          <p className="mt-1 text-sm opacity-80">{site.slogan} 🐾</p>
          <p className="mt-3 text-sm">
            Hotline:{" "}
            <a href={site.primaryTel} className="font-semibold text-accent">
              {site.hotlines.join(" – ")}
            </a>
          </p>
        </div>
        {locations.map((loc) => (
          <div key={loc.id}>
            <p className="font-heading font-bold">{loc.name}</p>
            <p className="mt-1 text-sm opacity-80">{loc.address}</p>
            <a
              href={loc.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm font-medium text-accent underline"
            >
              Xem bản đồ →
            </a>
          </div>
        ))}
      </div>
      <div className="border-t border-cream/10 py-4 text-center text-xs opacity-60">
        © {new Date().getFullYear()} {site.name}.{" "}
        <Link href="/lien-he" className="underline">
          Liên hệ
        </Link>
      </div>
    </footer>
  );
}
