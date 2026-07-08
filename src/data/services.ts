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
