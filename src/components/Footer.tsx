import Link from "next/link";
import { site } from "@/data/site";
import { locations } from "@/data/locations";
import { FacebookIcon, TikTokIcon } from "@/components/SocialIcons";

function SocialPill({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-ink"
    >
      {icon}
      {label}
    </a>
  );
}

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
      {/* Social links */}
      <div className="border-t border-cream/10 px-4 py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-12">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest opacity-60">
              Fanpage phòng khám
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              {locations.map((loc) => (
                <SocialPill
                  key={loc.id}
                  href={loc.fbUrl}
                  label={loc.shortName}
                  icon={<FacebookIcon />}
                />
              ))}
            </div>
          </div>
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest opacity-60">
              Bác sĩ &amp; mạng xã hội
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              <SocialPill
                href={site.socials.doctorFacebook}
                label="FB Bác sĩ Minh Tú"
                icon={<FacebookIcon />}
              />
              <SocialPill
                href={site.socials.tiktok}
                label="TikTok"
                icon={<TikTokIcon />}
              />
            </div>
          </div>
        </div>
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
