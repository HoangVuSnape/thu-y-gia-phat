import type { Metadata } from "next";
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";
import Reveal from "@/components/Reveal";
import { site } from "@/data/site";
import { locations } from "@/data/locations";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: `Liên hệ ${site.name}: hotline ${site.hotlines.join(" – ")}, Facebook, TikTok.`,
};

const qrCards = [
  ...locations.map((loc) => ({
    src: loc.fbQr,
    label: `Facebook — ${loc.name}`,
  })),
  { src: site.qr.facebookPersonal, label: "Facebook bác sĩ Minh Tú" },
  { src: site.qr.tiktok, label: "TikTok phòng khám" },
];

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-14">
      <SectionTitle sub="Gọi điện, nhắn tin hoặc quét QR — phòng khám luôn sẵn sàng hỗ trợ">
        Liên hệ với chúng tôi
      </SectionTitle>

      {/* Hotlines */}
      <div className="grid gap-4 sm:grid-cols-2">
        {site.hotlines.map((phone, i) => (
          <Reveal key={phone} delay={i * 120}>
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="block rounded-3xl bg-brand p-6 text-center font-heading text-2xl font-bold text-white shadow-lg shadow-brand/30 transition-transform hover:scale-105"
            >
              📞 {phone}
            </a>
          </Reveal>
        ))}
      </div>

      {/* Addresses */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {locations.map((loc) => (
          <div key={loc.id} className="rounded-3xl border border-brand/10 bg-white p-6">
            <p className="font-heading font-bold">{loc.name}</p>
            <p className="mt-1 text-sm opacity-80">📍 {loc.address}</p>
            {loc.openingHours && <p className="mt-1 text-sm">🕐 {loc.openingHours}</p>}
          </div>
        ))}
      </div>

      {/* Social QR */}
      <h3 className="mt-12 text-center font-heading text-2xl font-bold text-brand">
        Kết nối với phòng khám
      </h3>
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {qrCards.map((qr) => (
          <div
            key={qr.label}
            className="rounded-3xl border border-brand/10 bg-white p-4 text-center"
          >
            <Image
              src={qr.src}
              alt={`Mã QR ${qr.label}`}
              width={160}
              height={160}
              className="mx-auto rounded-xl"
            />
            <p className="mt-2 text-xs font-medium opacity-80">{qr.label}</p>
          </div>
        ))}
      </div>

      {/* Bank QR */}
      <h3 className="mt-12 text-center font-heading text-2xl font-bold text-brand">
        Thanh toán chuyển khoản
      </h3>
      <div className="mx-auto mt-6 max-w-xs rounded-3xl border border-brand/10 bg-white p-6 text-center">
        <Image
          src={site.qr.bank}
          alt={`Mã VietQR ${site.bank.bankName} — ${site.bank.accountName}`}
          width={240}
          height={370}
          className="mx-auto rounded-xl"
        />
        <p className="mt-3 text-sm font-medium">
          {site.bank.bankName} — {site.bank.accountName}
        </p>
      </div>
    </section>
  );
}
