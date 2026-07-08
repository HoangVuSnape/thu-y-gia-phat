import Image from "next/image";
import Link from "next/link";

const nav = [
  { href: "/", label: "Trang chủ" },
  { href: "/dich-vu", label: "Dịch vụ" },
  { href: "/gioi-thieu", label: "Về chúng tôi" },
  { href: "/co-so", label: "Cơ sở" },
  { href: "/lien-he", label: "Liên hệ" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand/10 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-3 gap-y-1 px-4 py-2">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image src="/images/logo.png" alt="Logo Thú Y Gia Phát" width={44} height={41} priority />
          <span className="font-heading text-lg font-bold leading-tight text-brand">
            Thú Y Gia Phát
          </span>
        </Link>
        <nav className="ml-auto flex overflow-x-auto">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-colors hover:bg-brand hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
