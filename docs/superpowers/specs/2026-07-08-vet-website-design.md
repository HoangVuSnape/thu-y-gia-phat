# Thiết kế Website Phòng khám Thú Y Gia Phát

**Ngày:** 2026-07-08
**Trạng thái:** Đã duyệt hướng thiết kế (nhiều trang, Next.js, phong cách ấm áp thân thiện)

## 1. Mục tiêu

Website giới thiệu chuyên nghiệp cho phòng khám Thú Y Gia Phát — 2 cơ sở tại
Biên Hòa và Dĩ An. Mục tiêu: tạo độ tin cậy (bác sĩ có học vị, bằng cấp),
giới thiệu đầy đủ dịch vụ, và giúp khách gọi điện / tìm đường / kết nối
Facebook-Zalo-TikTok nhanh nhất. Khách truy cập chủ yếu từ Facebook trên
điện thoại → mobile-first.

Slogan: **"Cùng bạn chăm sóc sức khỏe vật nuôi"**

## 2. Công nghệ

- **Next.js 15 (App Router) + Tailwind CSS**, TypeScript.
- **Static export** (`output: 'export'`) — không backend, không database.
- Deploy: **Vercel** (khuyến nghị) hoặc GitHub Pages.
- Toàn bộ nội dung động (dịch vụ, cơ sở, liên hệ) đặt trong
  `src/data/*.ts` để chủ web sửa chữ mà không đụng component.
- Ảnh dùng từ thư mục `asset/` hiện có, copy vào `public/` khi build cấu trúc.

## 3. Sơ đồ trang (5 trang)

| Route | Trang | Nội dung |
|---|---|---|
| `/` | Trang chủ | Hero (slogan + logo + CTA gọi ngay), lưới 6 dịch vụ tóm tắt, giới thiệu bác sĩ ngắn + link sang trang giới thiệu, khối 2 cơ sở, CTA cuối trang |
| `/dich-vu` | Dịch vụ | 6 mục chi tiết: Khám & điều trị · Tắm–Cắt tỉa–Spa · X-quang–Siêu âm · Xét nghiệm · Phẫu thuật · Pet Shop. Mỗi mục: icon, mô tả 2–3 câu, ảnh minh họa nếu có |
| `/gioi-thieu` | Về chúng tôi | Hồ sơ BS. Nguyễn Minh Tú (ảnh `asset/avatar2.png`, bằng cấp, số chứng chỉ hành nghề, phạm vi cấp phép), câu chuyện phòng khám, gallery chứng chỉ (`asset/certi/`) |
| `/co-so` | Cơ sở | 2 cơ sở: địa chỉ, Google Maps nhúng, hotline, QR Facebook riêng từng cơ sở |
| `/lien-he` | Liên hệ | Hotline, QR Facebook/TikTok, nút gọi + nút Zalo, giờ mở cửa (hiển thị khi có dữ liệu) |

Header (logo + menu 5 mục) và Footer (2 địa chỉ, hotline, social) dùng chung
mọi trang. Trên mobile có nút **"Gọi ngay"** nổi cố định góc dưới màn hình.

## 4. Dữ liệu cơ sở

**CS1 — Long Bình Tân (Biên Hòa)**
- Địa chỉ: 1/F2 QL51, Khu phố 1, Long Bình Tân, Biên Hòa
- Maps: https://maps.app.goo.gl/T989XVqo7uHPizs99
- QR Facebook: `asset/qr/fb_giaphat_LongBinhTan.png`

**CS2 — Dĩ An**
- Địa chỉ: 406A Trần Hưng Đạo, P. Dĩ An, TP. Hồ Chí Minh
- Maps: https://maps.app.goo.gl/9Voee3xpnf8Ht6YM6
- QR Facebook: `asset/qr/fb_giaphat_diAn.png`

**Bác sĩ phụ trách — Nguyễn Minh Tú**
- Sinh năm 1984, quê An Giang
- Bằng cấp chuyên môn: Kỹ sư Chăn nuôi Thú y
- Chứng chỉ hành nghề thú y số 75/CCCNTYTS-CCHN do Chi cục Chăn nuôi,
  Thú y và Thủy sản tỉnh Bình Dương cấp ngày 16/09/2024
- Phạm vi hành nghề được cấp phép: tiêm phòng, chữa bệnh, phẫu thuật động
  vật; khám bệnh, chẩn đoán bệnh động vật; xét nghiệm bệnh động vật;
  tư vấn thú y; buôn bán thuốc thú y
- Ảnh chân dung: `asset/avatar2.png` (chính — nền trắng, vest) và
  `asset/avatar.jpg` (lễ tốt nghiệp)
- Ảnh chứng chỉ: `asset/certi/certi_1.jpg` — hiển thị ở trang Giới thiệu
  để tạo độ tin cậy
- Trang `/gioi-thieu` dùng các thông tin trên làm hồ sơ bác sĩ: tên, năm
  kinh nghiệm, bằng cấp, số chứng chỉ hành nghề, phạm vi được cấp phép

**Chung**
- Hotline: 0915 888 884 – 0947 257 222
- TikTok QR: `asset/qr/tiktok.png` · FB cá nhân: `asset/qr/fb_a_tu.png`
- Giờ mở cửa: chưa có — schema data có trường `openingHours?`, UI chỉ
  hiển thị khi được điền. Không chặn việc ra mắt.

## 5. Hệ thống thiết kế — ấm áp, thân thiện

- **Màu:** đỏ chủ đạo lấy từ logo `#D42B2B`; nền kem ấm `#FFF8F0`;
  chữ nâu đậm `#3D2B24`; cam nhạt phụ trợ (màu mèo trong logo) `#F0944A`.
- **Font:** tiêu đề Baloo 2 (tròn trịa, hỗ trợ tiếng Việt), nội dung
  Be Vietnam Pro. Load qua `next/font/google`.
- **Hình khối:** bo góc lớn (rounded-2xl+), shadow mềm, họa tiết dấu chân
  🐾 trang trí nhẹ ở section divider.
- **Icon dịch vụ:** bộ icon nét vẽ dễ thương đồng bộ phong cách logo
  (SVG inline, tự vẽ hoặc lucide tùy chỉnh màu).
- **Accessibility:** tương phản chữ/nền đạt WCAG AA, ảnh có alt tiếng Việt.

## 6. SEO & metadata

- Title/description tiếng Việt riêng từng trang; Open Graph image dùng logo.
- `sitemap.xml` + `robots.txt` tự sinh khi export.
- Schema.org `VeterinaryCare` (JSON-LD) cho 2 cơ sở — giúp hiện đẹp trên Google.

## 7. Kiểm thử & nghiệm thu

- `npm run build` xuất static thành công, không lỗi TypeScript/ESLint.
- Kiểm tra responsive 3 mức: 375px (mobile), 768px (tablet), 1280px (desktop).
- Mọi link `tel:`, Maps, QR hoạt động; Lighthouse mobile ≥ 90 điểm Performance.

## 8. Ngoài phạm vi (làm sau nếu cần)

- Form đặt lịch khám online
- Blog / tin tức
- Đa ngôn ngữ (chỉ tiếng Việt)
- Ảnh thực tế phòng khám: chèn thêm khi chủ web cung cấp, layout đã chừa chỗ
