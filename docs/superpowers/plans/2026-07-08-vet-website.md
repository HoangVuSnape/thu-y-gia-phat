# Thú Y Gia Phát Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the 5-page static marketing website for the Thú Y Gia Phát veterinary clinic per `docs/superpowers/specs/2026-07-08-vet-website-design.md`.

**Architecture:** Next.js 15 App Router with `output: 'export'` (pure static, no backend). All editable content lives in `src/data/*.ts`. Shared Header/Footer/floating call button wrap every page. Warm palette derived from the logo, defined as Tailwind v4 theme tokens.

**Tech Stack:** Next.js 15, React 19, TypeScript (strict), Tailwind CSS v4, `next/font/google` (Baloo 2 + Be Vietnam Pro, vietnamese subsets).

**Testing note:** This site has no runtime logic beyond typed data files, so the red/green loop is: `npm run typecheck` + `npm run build` must pass after every task, and each page is visually verified in the dev server. No unit-test framework is added (YAGNI).

**Working directory:** all paths relative to `E:\DoCode\Tools_chill\A_tu_website`. The git repo root is the parent folder (`Tools_chill`), so `git add` paths from repo root are prefixed `A_tu_website/`.

---

### Task 1: Project scaffold, Tailwind theme, assets

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `.gitignore`, `src/app/globals.css`
- Create (copies): `public/images/**` from `asset/`

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "thu-y-gia-phat",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "typecheck": "tsc --noEmit"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run (PowerShell, in `A_tu_website`):
```powershell
npm install next@15 react@19 react-dom@19
npm install -D typescript @types/react @types/react-dom @types/node tailwindcss @tailwindcss/postcss
```
Expected: `added N packages` with no errors.

- [ ] **Step 3: Write `next.config.ts`**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
```

- [ ] **Step 4: Write `postcss.config.mjs`**

```js
export default { plugins: { "@tailwindcss/postcss": {} } };
```

- [ ] **Step 5: Write `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 6: Write `.gitignore`**

```gitignore
node_modules/
.next/
out/
next-env.d.ts
*.tsbuildinfo
```

- [ ] **Step 7: Write `src/app/globals.css`** (theme tokens from spec §5)

```css
@import "tailwindcss";

@theme {
  --color-brand: #d42b2b;
  --color-brand-dark: #b32222;
  --color-cream: #fff8f0;
  --color-ink: #3d2b24;
  --color-accent: #f0944a;
  --font-heading: var(--font-baloo), sans-serif;
  --font-body: var(--font-be-vietnam), sans-serif;
}

body {
  background: var(--color-cream);
  color: var(--color-ink);
  font-family: var(--font-body);
}
```

- [ ] **Step 8: Copy brand assets into `public/`**

Run (PowerShell):
```powershell
New-Item -ItemType Directory -Force public\images\qr, public\images\certi | Out-Null
Copy-Item asset\logo_thu_y.png public\images\logo.png
Copy-Item asset\avatar2.png public\images\doctor.png
Copy-Item asset\avatar.jpg public\images\doctor-graduation.jpg
Copy-Item asset\certi\certi_1.jpg public\images\certi\certi-1.jpg
Copy-Item asset\certi\qr_giaPhat.jpg public\images\qr\bank-vietqr.jpg
Copy-Item asset\qr\fb_a_tu.png public\images\qr\fb-a-tu.png
Copy-Item asset\qr\fb_giaphat_diAn.png public\images\qr\fb-di-an.png
Copy-Item asset\qr\fb_giaphat_LongBinhTan.png public\images\qr\fb-long-binh-tan.png
Copy-Item asset\qr\tiktok.png public\images\qr\tiktok.png
```
Expected: `public/images` contains logo.png, doctor.png, doctor-graduation.jpg, certi/certi-1.jpg, qr/ (5 files).

- [ ] **Step 9: Commit**

```powershell
git add A_tu_website/package.json A_tu_website/package-lock.json A_tu_website/tsconfig.json A_tu_website/next.config.ts A_tu_website/postcss.config.mjs A_tu_website/.gitignore A_tu_website/src/app/globals.css A_tu_website/public
git commit -m "feat: scaffold Next.js 15 static site with Tailwind v4 theme and brand assets"
```

---

### Task 2: Typed data layer

**Files:**
- Create: `src/data/site.ts`, `src/data/services.ts`, `src/data/locations.ts`, `src/data/doctor.ts`

- [ ] **Step 1: Write `src/data/site.ts`**

```ts
export const site = {
  name: "Thú Y Gia Phát",
  slogan: "Cùng bạn chăm sóc sức khỏe vật nuôi",
  description:
    "Phòng khám thú y Gia Phát — khám và điều trị, spa grooming, X-quang, siêu âm, xét nghiệm, phẫu thuật và pet shop cho thú cưng tại Biên Hòa và Dĩ An.",
  hotlines: ["0915 888 884", "0947 257 222"],
  /** tel: link for the primary hotline */
  primaryTel: "tel:0915888884",
  qr: {
    tiktok: "/images/qr/tiktok.png",
    facebookPersonal: "/images/qr/fb-a-tu.png",
    bank: "/images/qr/bank-vietqr.jpg",
  },
  bank: {
    bankName: "Vietcombank",
    accountName: "Hộ kinh doanh Gia Phát",
  },
};
```

- [ ] **Step 2: Write `src/data/services.ts`**

```ts
export type Service = {
  slug: string;
  icon: string; // emoji, rendered in a colored circle
  name: string;
  short: string; // one-liner for home grid
  long: string; // 2–3 sentences for /dich-vu
};

export const services: Service[] = [
  {
    slug: "kham-dieu-tri",
    icon: "🩺",
    name: "Khám & điều trị",
    short: "Khám tổng quát, chẩn đoán và điều trị bệnh cho chó mèo.",
    long: "Khám lâm sàng tổng quát, chẩn đoán và điều trị các bệnh nội — ngoại khoa cho thú cưng. Bác sĩ tư vấn tận tình phác đồ điều trị và cách chăm sóc tại nhà, theo dõi sát tình trạng của bé đến khi khỏe hẳn.",
  },
  {
    slug: "spa-grooming",
    icon: "✂️",
    name: "Tắm – Cắt tỉa – Spa",
    short: "Tắm vệ sinh, cắt tỉa lông, chăm sóc móng cho bé cưng.",
    long: "Dịch vụ tắm vệ sinh với sữa tắm chuyên dụng, cắt tỉa lông theo yêu cầu, vệ sinh tai, cắt móng. Các bé được chăm sóc nhẹ nhàng, thoải mái như đi spa thật sự.",
  },
  {
    slug: "chan-doan-hinh-anh",
    icon: "🩻",
    name: "X-quang – Siêu âm",
    short: "Chẩn đoán hình ảnh chính xác với máy X-quang và siêu âm.",
    long: "Hệ thống X-quang và siêu âm hỗ trợ chẩn đoán chính xác các vấn đề về xương khớp, nội tạng, thai sản. Kết quả nhanh, bác sĩ đọc phim và tư vấn ngay trong buổi khám.",
  },
  {
    slug: "xet-nghiem",
    icon: "🧪",
    name: "Xét nghiệm",
    short: "Xét nghiệm máu, ký sinh trùng, bệnh truyền nhiễm.",
    long: "Xét nghiệm máu, test nhanh các bệnh truyền nhiễm nguy hiểm (Care, Parvo, FPV...), soi da tìm ký sinh trùng. Phát hiện bệnh sớm giúp điều trị kịp thời và tiết kiệm chi phí.",
  },
  {
    slug: "phau-thuat",
    icon: "🏥",
    name: "Phẫu thuật",
    short: "Triệt sản, mổ đẻ và các ca phẫu thuật ngoại khoa.",
    long: "Phẫu thuật triệt sản, mổ đẻ, xử lý vết thương và các ca ngoại khoa khác trong phòng mổ vô trùng. Bé được gây mê an toàn, theo dõi hậu phẫu chu đáo đến khi hồi phục.",
  },
  {
    slug: "pet-shop",
    icon: "🛍️",
    name: "Pet Shop",
    short: "Thức ăn, phụ kiện và sản phẩm chăm sóc thú cưng.",
    long: "Cửa hàng đầy đủ thức ăn hạt, pate, sữa tắm, vòng cổ, chuồng nệm và đồ chơi cho chó mèo. Sản phẩm chính hãng, được bác sĩ tư vấn chọn đúng loại phù hợp với từng bé.",
  },
];
```

- [ ] **Step 3: Write `src/data/locations.ts`**

```ts
export type ClinicLocation = {
  id: string;
  name: string;
  address: string;
  /** Google Maps share link (opens app) */
  mapsUrl: string;
  /** Query string for the free keyless embed: https://www.google.com/maps?q=<query>&output=embed */
  mapsEmbedQuery: string;
  fbQr: string;
  openingHours?: string; // optional per spec — UI hides when absent
};

export const locations: ClinicLocation[] = [
  {
    id: "long-binh-tan",
    name: "Cơ sở 1 — Long Bình Tân",
    address: "1/F2 QL51, Khu phố 1, Long Bình Tân, Biên Hòa",
    mapsUrl: "https://maps.app.goo.gl/T989XVqo7uHPizs99",
    mapsEmbedQuery: "Thú Y Gia Phát, 1/F2 QL51, Long Bình Tân, Biên Hòa",
    fbQr: "/images/qr/fb-long-binh-tan.png",
  },
  {
    id: "di-an",
    name: "Cơ sở 2 — Dĩ An",
    address: "406A Trần Hưng Đạo, P. Dĩ An, TP. Hồ Chí Minh",
    mapsUrl: "https://maps.app.goo.gl/9Voee3xpnf8Ht6YM6",
    mapsEmbedQuery: "Thú Y Gia Phát, 406A Trần Hưng Đạo, Dĩ An",
    fbQr: "/images/qr/fb-di-an.png",
  },
];
```

- [ ] **Step 4: Write `src/data/doctor.ts`**

```ts
export const doctor = {
  name: "Nguyễn Minh Tú",
  title: "Bác sĩ phụ trách phòng khám",
  degree: "Kỹ sư Chăn nuôi Thú y",
  license:
    "Chứng chỉ hành nghề thú y số 75/CCCNTYTS-CCHN — Chi cục Chăn nuôi, Thú y và Thủy sản tỉnh Bình Dương cấp ngày 16/09/2024",
  licensedScope: [
    "Tiêm phòng, chữa bệnh, phẫu thuật động vật",
    "Khám bệnh, chẩn đoán bệnh động vật",
    "Xét nghiệm bệnh động vật",
    "Tư vấn các hoạt động liên quan đến lĩnh vực thú y",
    "Buôn bán thuốc thú y",
  ],
  photo: "/images/doctor.png",
  photoGraduation: "/images/doctor-graduation.jpg",
  certImage: "/images/certi/certi-1.jpg",
  story:
    "Với mong muốn mang đến dịch vụ chăm sóc sức khỏe toàn diện cho thú cưng, Thú Y Gia Phát ra đời và không ngừng phát triển — từ cơ sở đầu tiên tại Long Bình Tân (Biên Hòa) đến cơ sở thứ hai tại Dĩ An. Phòng khám rất hân hạnh được đồng hành cùng quý khách trong hành trình chăm sóc và bảo vệ sức khỏe các bé cưng.",
};
```

- [ ] **Step 5: Verify types compile**

Run: `npm run typecheck`
Expected: exits 0, no output errors.

- [ ] **Step 6: Commit**

```powershell
git add A_tu_website/src/data
git commit -m "feat: add typed content data (site, services, locations, doctor)"
```

---

### Task 3: Root layout, fonts, Header, Footer, floating call button

**Files:**
- Create: `src/app/layout.tsx`, `src/components/Header.tsx`, `src/components/Footer.tsx`, `src/components/FloatingCallButton.tsx`

- [ ] **Step 1: Write `src/components/Header.tsx`**

Sticky header; nav scrolls horizontally on small screens (no JS hamburger — zero-JS, always accessible).

```tsx
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
          <Image src="/images/logo.png" alt="Logo Thú Y Gia Phát" width={44} height={40} priority />
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
```

- [ ] **Step 2: Write `src/components/Footer.tsx`**

```tsx
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
```

- [ ] **Step 3: Write `src/components/FloatingCallButton.tsx`**

```tsx
import { site } from "@/data/site";

export default function FloatingCallButton() {
  return (
    <a
      href={site.primaryTel}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-brand px-5 py-3 font-heading font-bold text-white shadow-lg shadow-brand/40 transition-transform hover:scale-105 md:hidden"
    >
      📞 Gọi ngay
    </a>
  );
}
```

- [ ] **Step 4: Write `src/app/layout.tsx`** (fonts, metadata, JSON-LD per spec §6)

```tsx
import type { Metadata } from "next";
import { Baloo_2, Be_Vietnam_Pro } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import { site } from "@/data/site";
import { locations } from "@/data/locations";
import "./globals.css";

const baloo = Baloo_2({
  subsets: ["vietnamese", "latin"],
  variable: "--font-baloo",
});

const beVietnam = Be_Vietnam_Pro({
  weight: ["400", "500", "600", "700"],
  subsets: ["vietnamese", "latin"],
  variable: "--font-be-vietnam",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.slogan}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.slogan,
    images: ["/images/logo.png"],
  },
};

const jsonLd = locations.map((loc) => ({
  "@context": "https://schema.org",
  "@type": "VeterinaryCare",
  name: `${site.name} — ${loc.name}`,
  address: loc.address,
  telephone: "+84915888884",
  url: loc.mapsUrl,
}));

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${baloo.variable} ${beVietnam.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingCallButton />
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Add a placeholder home page so the app builds** — write `src/app/page.tsx`:

```tsx
export default function HomePage() {
  return <p>Thú Y Gia Phát</p>;
}
```

- [ ] **Step 6: Verify build**

Run: `npm run typecheck` then `npm run build`
Expected: build succeeds, route `/` listed as static (`○`), `out/` directory created.

- [ ] **Step 7: Commit**

```powershell
git add A_tu_website/src/app A_tu_website/src/components
git commit -m "feat: add root layout with fonts, header, footer, floating call button"
```

---

### Task 4: Shared UI pieces (SectionTitle, ServiceCard, PawDivider)

**Files:**
- Create: `src/components/SectionTitle.tsx`, `src/components/ServiceCard.tsx`, `src/components/PawDivider.tsx`

- [ ] **Step 1: Write `src/components/SectionTitle.tsx`**

```tsx
export default function SectionTitle({
  children,
  sub,
}: {
  children: React.ReactNode;
  sub?: string;
}) {
  return (
    <div className="mb-8 text-center">
      <h2 className="font-heading text-3xl font-bold text-brand">{children}</h2>
      {sub && <p className="mx-auto mt-2 max-w-xl opacity-80">{sub}</p>}
    </div>
  );
}
```

- [ ] **Step 2: Write `src/components/ServiceCard.tsx`**

```tsx
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
```

- [ ] **Step 3: Write `src/components/PawDivider.tsx`**

```tsx
export default function PawDivider() {
  return (
    <div aria-hidden className="my-12 select-none text-center text-xl tracking-[1em] opacity-30">
      🐾 🐾 🐾
    </div>
  );
}
```

- [ ] **Step 4: Verify** — `npm run typecheck` passes.

- [ ] **Step 5: Commit**

```powershell
git add A_tu_website/src/components
git commit -m "feat: add shared SectionTitle, ServiceCard, PawDivider components"
```

---

### Task 5: Home page

**Files:**
- Modify: `src/app/page.tsx` (replace placeholder entirely)

- [ ] **Step 1: Write `src/app/page.tsx`**

```tsx
import Image from "next/image";
import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import PawDivider from "@/components/PawDivider";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { locations } from "@/data/locations";
import { doctor } from "@/data/doctor";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 pb-12 pt-14 text-center md:flex-row md:text-left">
        <div className="flex-1">
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
        </div>
        <Image
          src="/images/logo.png"
          alt="Logo Thú Y Gia Phát — chó và mèo"
          width={280}
          height={256}
          priority
          className="drop-shadow-xl"
        />
      </section>

      {/* Services grid */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <SectionTitle sub="Chăm sóc sức khỏe toàn diện cho thú cưng của bạn">
          Dịch vụ của phòng khám
        </SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </section>

      <PawDivider />

      {/* Doctor teaser */}
      <section className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-4 py-8 sm:flex-row">
        <Image
          src={doctor.photo}
          alt={`Bác sĩ ${doctor.name}`}
          width={220}
          height={300}
          className="rounded-3xl bg-white object-cover shadow-md"
        />
        <div className="text-center sm:text-left">
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
        </div>
      </section>

      <PawDivider />

      {/* Locations */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <SectionTitle sub="Ghé cơ sở gần bạn nhất — hoặc gọi trước để được hỗ trợ nhanh">
          Hai cơ sở phục vụ bạn
        </SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2">
          {locations.map((loc) => (
            <div
              key={loc.id}
              className="rounded-3xl border border-brand/10 bg-white p-6 shadow-sm"
            >
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
          ))}
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verify in dev server**

Run: `npm run dev`, open `http://localhost:3000`.
Expected: hero with slogan + logo, 6 service cards, doctor teaser with photo, 2 location cards. No console errors.

- [ ] **Step 3: Verify build** — `npm run typecheck && npm run build` pass.

- [ ] **Step 4: Commit**

```powershell
git add A_tu_website/src/app/page.tsx
git commit -m "feat: build home page (hero, services grid, doctor teaser, locations)"
```

---

### Task 6: Services page `/dich-vu`

**Files:**
- Create: `src/app/dich-vu/page.tsx`

- [ ] **Step 1: Write `src/app/dich-vu/page.tsx`**

```tsx
import type { Metadata } from "next";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
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
        {services.map((s) => (
          <ServiceCard key={s.slug} service={s} detailed />
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
```

- [ ] **Step 2: Verify** — dev server `/dich-vu` shows 6 detailed cards + red CTA banner; `npm run build` passes.

- [ ] **Step 3: Commit**

```powershell
git add A_tu_website/src/app/dich-vu
git commit -m "feat: build services page with detailed cards and call CTA"
```

---

### Task 7: About page `/gioi-thieu`

**Files:**
- Create: `src/app/gioi-thieu/page.tsx`

- [ ] **Step 1: Write `src/app/gioi-thieu/page.tsx`**

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";
import PawDivider from "@/components/PawDivider";
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
      <div className="flex flex-col items-center gap-8 rounded-3xl border border-brand/10 bg-white p-8 shadow-sm md:flex-row md:items-start">
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
      </div>

      <PawDivider />

      {/* Story */}
      <div className="text-center">
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
      </div>

      <PawDivider />

      {/* Certificate */}
      <div className="text-center">
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
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify** — dev server `/gioi-thieu` shows profile card, story + graduation photo, certificate image; build passes.

- [ ] **Step 3: Commit**

```powershell
git add A_tu_website/src/app/gioi-thieu
git commit -m "feat: build about page with doctor profile, story and certificate"
```

---

### Task 8: Locations page `/co-so`

**Files:**
- Create: `src/app/co-so/page.tsx`

- [ ] **Step 1: Write `src/app/co-so/page.tsx`**

Maps use the keyless embed `https://www.google.com/maps?q=<query>&output=embed`; the share links open the Maps app via the "Chỉ đường" button.

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";
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
        {locations.map((loc) => (
          <div
            key={loc.id}
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
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify** — dev server `/co-so`: both map iframes render the right area, "Chỉ đường" opens the goo.gl link, QR images show; build passes.

- [ ] **Step 3: Commit**

```powershell
git add A_tu_website/src/app/co-so
git commit -m "feat: build locations page with embedded maps and per-branch QR"
```

---

### Task 9: Contact page `/lien-he`

**Files:**
- Create: `src/app/lien-he/page.tsx`

- [ ] **Step 1: Write `src/app/lien-he/page.tsx`**

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";
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
        {site.hotlines.map((phone) => (
          <a
            key={phone}
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="rounded-3xl bg-brand p-6 text-center font-heading text-2xl font-bold text-white shadow-lg shadow-brand/30 transition-transform hover:scale-105"
          >
            📞 {phone}
          </a>
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
```

- [ ] **Step 2: Verify** — dev server `/lien-he`: two tappable hotline cards, addresses, 4 social QRs, bank QR; build passes.

- [ ] **Step 3: Commit**

```powershell
git add A_tu_website/src/app/lien-he
git commit -m "feat: build contact page with hotlines, social QR and bank QR"
```

---

### Task 10: SEO files, full verification, responsive pass

**Files:**
- Create: `src/app/sitemap.ts`, `src/app/robots.ts`, `.claude/launch.json`

- [ ] **Step 1: Write `src/app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const base = "https://thuygiaphat.vercel.app"; // update when custom domain exists

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/dich-vu", "/gioi-thieu", "/co-so", "/lien-he"].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
```

- [ ] **Step 2: Write `src/app/robots.ts`**

```ts
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://thuygiaphat.vercel.app/sitemap.xml",
  };
}
```

- [ ] **Step 3: Full build check**

Run: `npm run typecheck && npm run build`
Expected: all 5 routes + `/sitemap.xml` + `/robots.txt` exported statically into `out/`.

- [ ] **Step 4: Create `.claude/launch.json`** (project-local, for preview tooling)

```json
{
  "version": "0.0.1",
  "configurations": [
    { "name": "vet-website", "runtimeExecutable": "npm", "runtimeArgs": ["run", "dev"], "port": 3000 }
  ]
}
```

- [ ] **Step 5: Responsive verification** (spec §7)

With the dev server running, check each of the 5 pages at 375px, 768px, 1280px:
- no horizontal page scroll at 375px,
- header nav usable (scrollable) on mobile,
- floating "Gọi ngay" visible on mobile only,
- all images load, `tel:` links correct.
Fix anything found before committing.

- [ ] **Step 6: Commit**

```powershell
git add A_tu_website/src/app/sitemap.ts A_tu_website/src/app/robots.ts A_tu_website/.claude/launch.json
git commit -m "feat: add sitemap, robots and launch config; responsive pass"
```

---

## Out of scope (per spec §8)

Booking form, blog, multi-language, real clinic photos (layout already has room — add to `public/images/` and reference in data files later). Opening hours: fill `openingHours` in `src/data/locations.ts` when the owner provides them; UI shows them automatically.
