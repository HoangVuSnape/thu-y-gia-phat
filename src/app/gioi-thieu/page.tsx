import type { Metadata } from "next";
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";
import PawDivider from "@/components/PawDivider";
import Reveal from "@/components/Reveal";
import { doctor } from "@/data/doctor";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Về chúng tôi",
  description: `BS. ${doctor.name} — ${doctor.degree}, phụ trách chuyên môn tại ${site.name}.`,
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-14">
      <SectionTitle sub={site.slogan}>Về {site.name}</SectionTitle>

      {/* Doctor profile */}
      <Reveal className="flex flex-col items-center gap-8 rounded-3xl border border-brand/10 bg-white p-8 shadow-sm md:flex-row md:items-start">
        <Image
          src={doctor.photo}
          alt={`Chân dung bác sĩ ${doctor.name}`}
          width={240}
          height={330}
          className="rounded-3xl object-cover"
          priority
        />
        <div>
          <h3 className="font-heading text-2xl font-bold text-brand">
            BS. {doctor.name}
          </h3>
          <p className="font-medium text-accent">{doctor.title}</p>
          <p className="mt-3">
            🎓 <strong>{doctor.degree}</strong>
          </p>
          <p className="mt-2 text-sm opacity-80">📜 {doctor.license}</p>
          <p className="mt-4 font-heading font-bold">Phạm vi hành nghề được cấp phép:</p>
          <ul className="mt-2 space-y-1 text-sm">
            {doctor.licensedScope.map((item) => (
              <li key={item}>✅ {item}</li>
            ))}
          </ul>
        </div>
      </Reveal>

      <PawDivider />

      {/* Story */}
      <Reveal className="text-center">
        <h3 className="font-heading text-2xl font-bold text-brand">
          Câu chuyện phòng khám
        </h3>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed opacity-90">
          {doctor.story}
        </p>
        <Image
          src={doctor.photoGraduation}
          alt={`Bác sĩ ${doctor.name} trong lễ tốt nghiệp`}
          width={340}
          height={510}
          className="mx-auto mt-8 rounded-3xl object-cover shadow-md"
        />
      </Reveal>

      <PawDivider />

      {/* Certificate */}
      <Reveal className="text-center">
        <h3 className="font-heading text-2xl font-bold text-brand">
          Chứng chỉ hành nghề
        </h3>
        <Image
          src={doctor.certImage}
          alt="Chứng chỉ hành nghề thú y của bác sĩ Nguyễn Minh Tú"
          width={800}
          height={560}
          className="mx-auto mt-6 rounded-2xl border border-brand/10 shadow-md"
        />
      </Reveal>
    </section>
  );
}
