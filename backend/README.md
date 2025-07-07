# Teklif Takip Uygulaması (Backend)

Kurumsal teklif ve müşteri takibi için geliştirilen NestJS tabanlı backend API.

## Özellikler
- Müşteri ve teklif yönetimi için RESTful API
- TypeORM ile veri tabanı yönetimi
- DTO ve entity seviyesinde tip güvenliği ve validasyon
- Frontend (Vue 3 + Element Plus) ile tam uyum

## Kurulum
1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
2. Geliştirme sunucusunu başlatın:
   ```bash
   npm run start:dev
   ```
3. (Opsiyonel) Docker ile başlatmak için:
   ```bash
   docker-compose up --build
   ```

## API Uç Noktaları

### Müşteriler
- `GET    /customers`           → Müşteri listesini getirir
- `POST   /customers`           → Yeni müşteri ekler
- `DELETE /customers/:id`       → Müşteri siler

### Teklifler
- `GET    /offers`              → Teklif listesini getirir
- `POST   /offers`              → Yeni teklif ekler
- `PATCH  /offers/:id`          → Teklif durumunu günceller
- `DELETE /offers/:id`          → Teklif siler

## DTO ve Validasyon
- Tüm endpointler, frontend ile birebir uyumlu DTO ve entity yapısı kullanır.
- Zorunlu alanlar ve tipler frontend validasyonuyla eşleşir.

## Frontend ile Uyum
- API response formatı sade ve tip güvenlidir.
- Frontend ile tam entegre çalışır, ek alan veya değişiklik gerektiğinde DTO'lar kolayca güncellenebilir.

## Geliştirici Notları
- .env ve veri tabanı ayarlarını değiştirmeden kullanabilirsiniz.
- Testler ve geliştirme için ek komutlar:
  ```bash
  npm run test       # Service/unit testleri
  ```