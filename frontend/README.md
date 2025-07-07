# Teklif Takip Uygulaması (Frontend)

## Modern Kurulum ve Geliştirme

### 1. Bağımlılıkları Kurun
```bash
npm install
```

### 2. Geliştirme Sunucusunu Başlatın
```bash
npm run dev
```

### 3. Kullanılan Teknolojiler
- Vue 3 + Vite
- Element Plus (UI Kit)
- VeeValidate + Yup (Form validasyonu)
- Axios (API çağrıları)

### 4. Proje Yapısı
- `src/services/api.js` → Tüm API çağrıları burada merkezi olarak toplanır.
- `src/composables/` → Tekrar eden veri çekme ve işleme kodları burada.
- `src/views/Customers.vue` ve `src/views/Offers.vue` → Modern, responsive ve validasyonlu sayfalar.

### 5. UI Kit ve Validasyon Entegrasyonu
- Element Plus ve VeeValidate global olarak `main.js`'te entegre edilmiştir.
- Tüm formlar ve listeler Element Plus bileşenleriyle yazılmıştır.
- Toast bildirimler ve skeleton loader'lar entegre edilmiştir.

### 6. Responsive ve Modern Tasarım
- Tüm sayfalar mobil uyumlu ve kurumsal renk paletiyle tasarlanmıştır.

### 7. Backend ile Entegrasyon
- API adresi: `http://localhost:3000`
- Backend ile tam uyumlu veri modelleri ve endpointler kullanılır.

### 8. Görsel ve Kullanıcı Deneyimi İyileştirmeleri
- Header ve menü tamamen ortalı, modern ve responsive olarak tasarlandı.
- Müşteri kartlarında satır arası boşluklar ve padding optimize edildi.
- Tüm inputlar Element Plus + VeeValidate ile tam uyumlu şekilde bağlandı (`:model-value` ve `@update:model-value`).
- Footer'da © 2025 yılına güncellendi.

---
Eski örnek bileşenler ve kodlar temizlenmiştir. Geliştirme için sadece `src/views/` ve `src/composables/` klasörlerini kullanmanız önerilir.
