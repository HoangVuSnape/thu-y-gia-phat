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
  metadataBase: new URL("https://thuygiaphat.vercel.app"),
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
      <head>
        {/* Chay ngay luc trinh duyet doc toi, truoc khi ve khung hinh dau
            tien: khong co no thi hieu ung xuat hien khong bat, va trang
            van doc duoc binh thuong. Dat trong <head> chu khong phai
            useEffect vi useEffect chay SAU khi ve - se thay noi dung nhay. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js")`,
          }}
        />
      </head>
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
