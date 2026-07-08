import { site } from "@/data/site";

export default function FloatingCallButton() {
  return (
    <a
      href={site.primaryTel}
      className="animate-pulse-ring fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-brand px-5 py-3 font-heading font-bold text-white shadow-lg shadow-brand/40 transition-transform hover:scale-105 md:hidden"
    >
      📞 Gọi ngay
    </a>
  );
}
