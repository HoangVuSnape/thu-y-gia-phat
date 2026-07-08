import Image from "next/image";
import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import PawDivider from "@/components/PawDivider";
import Reveal from "@/components/Reveal";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { locations } from "@/data/locations";
import { doctor } from "@/data/doctor";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 pb-12 pt-14 text-center md:flex-row md:text-left">
        <Reveal className="flex-1">
          <h1 className="font-heading text-4xl font-bold leading-tight text-brand md:text-5xl">
            {site.slogan}
          </h1>
          <p className="mt-4 text-lg opacity-80">
            Phòng khám thú y {site.name} — khám chữa bệnh, spa grooming và pet shop
            cho các bé cưng tại Biên Hòa &amp; Dĩ An.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
            <a
              href={site.primaryTel}
              className="rounded-full bg-brand px-6 py-3 font-heading font-bold text-white shadow-lg shadow-brand/30 transition-transform hover:scale-105"
            >
              📞 {site.hotlines[0]}
            </a>
            <Link
              href="/dich-vu"
              className="rounded-full border-2 border-brand px-6 py-3 font-heading font-bold text-brand transition-colors hover:bg-brand hover:text-white"
            >
              Xem dịch vụ
            </Link>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <Image
            src="/images/logo.png"
            alt="Logo Thú Y Gia Phát — chó và mèo"
            width={280}
            height={263}
            priority
            className="animate-float drop-shadow-xl"
          />
        </Reveal>
      </section>

      {/* Services grid */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <Reveal>
          <SectionTitle sub="Chăm sóc sức khỏe toàn diện cho thú cưng của bạn">
            Dịch vụ của phòng khám
          </SectionTitle>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 90}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
      </section>

      <PawDivider />

      {/* Clinic banner */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <Reveal>
          <SectionTitle sub="Yêu thú cưng, yêu cuộc sống — kết nối tình yêu, nuôi dưỡng niềm vui">
            Không gian phòng khám
          </SectionTitle>
        </Reveal>
        <Reveal delay={150}>
          <Image
            src={site.clinicBanner}
            alt="Không gian và dịch vụ Thú Y Gia Phát: đưa đón tận nhà, pet shop, spa cắt tỉa lông, khách sạn thú cưng, đào tạo grooming"
            width={1280}
            height={722}
            className="w-full rounded-3xl border border-brand/10 shadow-md"
          />
        </Reveal>
      </section>

      <PawDivider />

      {/* Doctor teaser */}
      <section className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-4 py-8 sm:flex-row">
        <Reveal>
          <Image
            src={doctor.photo}
            alt={`Bác sĩ ${doctor.name}`}
            width={220}
            height={300}
            className="rounded-3xl bg-white object-cover shadow-md"
          />
        </Reveal>
        <Reveal delay={150} className="text-center sm:text-left">
          <h2 className="font-heading text-2xl font-bold text-brand">
            BS. {doctor.name}
          </h2>
          <p className="mt-1 font-medium text-accent">{doctor.degree}</p>
          <p className="mt-3 opacity-80">
            Bác sĩ có chứng chỉ hành nghề thú y, trực tiếp khám và điều trị tại cả
            hai cơ sở của phòng khám.
          </p>
          <Link
            href="/gioi-thieu"
            className="mt-4 inline-block font-heading font-bold text-brand underline"
          >
            Tìm hiểu về chúng tôi →
          </Link>
        </Reveal>
      </section>

      <PawDivider />

      {/* Locations */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <Reveal>
          <SectionTitle sub="Ghé cơ sở gần bạn nhất — hoặc gọi trước để được hỗ trợ nhanh">
            Hai cơ sở phục vụ bạn
          </SectionTitle>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2">
          {locations.map((loc, i) => (
            <Reveal key={loc.id} delay={i * 120}>
              <div className="rounded-3xl border border-brand/10 bg-white p-6 shadow-sm">
                <h3 className="font-heading text-lg font-bold">{loc.name}</h3>
                <p className="mt-1 text-sm opacity-80">📍 {loc.address}</p>
                <a
                  href={loc.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-sm font-bold text-brand underline"
                >
                  Chỉ đường trên Google Maps →
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
