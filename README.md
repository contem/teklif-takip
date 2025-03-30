# 🧾 Teklif Takip Uygulaması

Müşteri ve teklif süreçlerini yönetmek için geliştirilen sade, güvenli ve Docker destekli bir web uygulamasıdır.  
Vue 3 + Vite arayüzü, NestJS API ve PostgreSQL veritabanı kullanır.

---

## 📌 Özellikler

- 👥 Müşteri oluşturma, listeleme, silme
- 🧾 Teklif ekleme, güncelleme, filtreleme, silme
- 📊 Duruma göre teklif özeti
- 🔎 Arama ve filtreleme (müşteri & teklif)
- 🧱 Docker ile veritabanı yönetimi
- 🚀 TypeScript + NestJS + Vue 3 + Composition API

---

## ⚙️ Kurulum (Teknik Olmayanlar İçin)

### 1️⃣ Gerekli Programlar

- **Node.js** – [nodejs.org](https://nodejs.org)
- **Docker Desktop** – [docker.com](https://www.docker.com/products/docker-desktop/)

### 2️⃣ Projeyi İndir

```bash
git clone https://github.com/contem/teklif-takip.git
cd teklif-takip
```

### 3️⃣ Veritabanını Başlat

```bash
docker-compose up -d
```

> PostgreSQL otomatik olarak `5432` portundan çalışır.

### 4️⃣ API'yi Başlat (Backend)

```bash
cd teklif-takip-api
npm install
npm run start:dev
```

### 5️⃣ Arayüzü Başlat (Frontend)

```bash
cd ../teklif-takip-ui
npm install
npm run dev
```

### ✅ Uygulama çalıştı!

- Vue Arayüz → [http://localhost:5173](http://localhost:5173)
- NestJS API → [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Kurulum (Teknik Kullanıcılar İçin)

### .env içeriği (`teklif-takip-api/.env`)

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=teklif_admin
DB_PASSWORD=strongpassword357
DB_NAME=teklifdb
```

### Docker PostgreSQL + pgAdmin

> `docker-compose.yml` PostgreSQL’i otomatik olarak çalıştırır.  
Gerekirse pgAdmin gibi GUI araçları ile bağlantı kurabilirsin.

---

## 📂 Proje Yapısı

```
teklif-takip/
├── teklif-takip-api/       → NestJS API
├── teklif-takip-ui/        → Vue 3 + Vite arayüz
├── docker-compose.yml      → PostgreSQL servisi
└── README.md
```

---

## 🚀 Kullanım Notları

- Arayüzden müşteri & teklif ekleyebilirsin
- Tekliflerin durumunu (Beklemede, Kabul Edildi, Teslim Edildi...) güncelleyebilirsin
- Tüm kayıtlar filtrelenebilir ve özetlenir
- Authentication (giriş) yoktur, sadece local kullanım için uygundur

---

## 📄 Lisans

```
MIT Lisansı
```
