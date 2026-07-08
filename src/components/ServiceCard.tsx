import type { Service } from "@/data/services";

export default function ServiceCard({
  service,
  detailed = false,
}: {
  service: Service;
  detailed?: boolean;
}) {
  return (
    <div className="rounded-3xl border border-brand/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 text-3xl">
        {service.icon}
      </div>
      <h3 className="mt-4 font-heading text-xl font-bold">{service.name}</h3>
      <p className="mt-2 text-sm leading-relaxed opacity-80">
        {detailed ? service.long : service.short}
      </p>
    </div>
  );
}
