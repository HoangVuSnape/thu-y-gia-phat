import type { Metadata } from "next";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import Reveal from "@/components/Reveal";
import { site } from "@/data/site";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Dịch vụ",
  description: `Các dịch vụ của ${site.name}: khám và điều trị, spa grooming, X-quang, siêu âm, xét nghiệm, phẫu thuật, pet shop.`,
};

export default function ServicesPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <SectionTitle sub="Đầy đủ dịch vụ chăm sóc sức khỏe và làm đẹp cho thú cưng">
        Dịch vụ của phòng khám
      </SectionTitle>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.slug} delay={i * 90}>
            <ServiceCard service={s} detailed />
          </Reveal>
        ))}
      </div>
      <div className="mt-12 rounded-3xl bg-brand p-8 text-center text-white">
        <p className="font-heading text-2xl font-bold">
          Chưa chắc bé nhà bạn cần dịch vụ nào?
        </p>
        <p className="mt-2 opacity-90">
          Gọi cho phòng khám — bác sĩ tư vấn miễn phí trước khi bạn đưa bé đến.
        </p>
        <a
          href={site.primaryTel}
          className="mt-5 inline-block rounded-full bg-white px-6 py-3 font-heading font-bold text-brand transition-transform hover:scale-105"
        >
          📞 {site.hotlines[0]}
        </a>
      </div>
    </section>
  );
}
