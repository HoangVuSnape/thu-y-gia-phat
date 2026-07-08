export type ClinicLocation = {
  id: string;
  name: string;
  /** Short label for tight spots like the footer social row */
  shortName: string;
  address: string;
  /** Google Maps share link (opens app) */
  mapsUrl: string;
  /** Query string for the free keyless embed: https://www.google.com/maps?q=<query>&output=embed */
  mapsEmbedQuery: string;
  fbQr: string;
  /** Fanpage URL decoded from the QR image */
  fbUrl: string;
  openingHours?: string; // optional per spec — UI hides when absent
};

export const locations: ClinicLocation[] = [
  {
    id: "long-binh-tan",
    name: "Cơ sở 1 — Long Bình Tân",
    shortName: "CS1 Long Bình Tân",
    address: "1/F2 QL51, Khu phố 1, Long Bình Tân, Biên Hòa",
    mapsUrl: "https://maps.app.goo.gl/T989XVqo7uHPizs99",
    mapsEmbedQuery: "Thú Y Gia Phát, 1/F2 QL51, Long Bình Tân, Biên Hòa",
    fbQr: "/images/qr/fb-long-binh-tan.png",
    fbUrl: "https://www.facebook.com/vetstore.giaphat",
  },
  {
    id: "di-an",
    name: "Cơ sở 2 — Dĩ An",
    shortName: "CS2 Dĩ An",
    address: "406A Trần Hưng Đạo, P. Dĩ An, TP. Hồ Chí Minh",
    mapsUrl: "https://maps.app.goo.gl/9Voee3xpnf8Ht6YM6",
    mapsEmbedQuery: "Thú Y Gia Phát, 406A Trần Hưng Đạo, Dĩ An",
    fbQr: "/images/qr/fb-di-an.png",
    fbUrl: "https://www.facebook.com/profile.php?id=61566383177381",
  },
];
