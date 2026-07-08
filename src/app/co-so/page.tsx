import type { Metadata } from "next";
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";
import Reveal from "@/components/Reveal";
import { locations } from "@/data/locations";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Cơ sở",
  description: `${site.name} có 2 cơ sở: Long Bình Tân (Biên Hòa) và Dĩ An (TP.HCM).`,
};

export default function LocationsPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <SectionTitle sub="Hai cơ sở — một chất lượng chăm sóc">Cơ sở phòng khám</SectionTitle>
      <div className="space-y-10">
        {locations.map((loc, i) => (
          <Reveal
            key={loc.id}
            delay={i * 120}
            className="grid overflow-hidden rounded-3xl border border-brand/10 bg-white shadow-sm md:grid-cols-2"
          >
            <iframe
              title={`Bản đồ ${loc.name}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(loc.mapsEmbedQuery)}&output=embed`}
              className="h-72 w-full border-0 md:h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="p-8">
              <h3 className="font-heading text-2xl font-bold text-brand">{loc.name}</h3>
              <p className="mt-2">📍 {loc.address}</p>
              {loc.openingHours && <p className="mt-1">🕐 {loc.openingHours}</p>}
              <p className="mt-1">
                📞{" "}
                <a href={site.primaryTel} className="font-bold text-brand">
                  {site.hotlines.join(" – ")}
                </a>
              </p>
              <a
                href={loc.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block rounded-full bg-brand px-5 py-2.5 font-heading font-bold text-white transition-transform hover:scale-105"
              >
                🧭 Chỉ đường
              </a>
              <div className="mt-6">
                <p className="text-sm font-medium opacity-70">
                  Quét QR theo dõi Facebook cơ sở này:
                </p>
                <Image
                  src={loc.fbQr}
                  alt={`QR Facebook ${loc.name}`}
                  width={120}
                  height={120}
                  className="mt-2 rounded-xl border border-brand/10"
                />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
