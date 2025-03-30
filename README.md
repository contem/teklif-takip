# 🧾 Teklif Takip Uygulaması

Bu uygulama sade arayüzüyle müşteri ve teklif süreçlerini kolaylaştırır.  
Vue 3 (Vite), NestJS API ve PostgreSQL ile geliştirildi. Docker desteklidir.

---

## 📌 Özellikler

- 👥 Müşteri oluşturma, listeleme, silme
- 🧾 Teklif ekleme, güncelleme, filtreleme, silme
- 📊 Duruma göre teklif özeti (Beklemede, Kabul Edildi, Teslim Edildi)
- 🔎 Arama ve filtreleme (müşteri & teklif)
- 🧱 Docker ile tüm servisleri ayağa kaldırma
- 🚀 TypeScript + NestJS + Vue 3 + Composition API

---

## ⚙️ Kurulum (Tek Komutla)

```bash
git clone https://github.com/contem/teklif-takip.git
cd teklif-takip
cp .env.example .env # veya elle oluştur
docker-compose up --build -d
```

> Ardından tarayıcıda:
> - Vue Arayüz → http://localhost:5173  
> - NestJS API → http://localhost:3000

---

## ⚙️ Geliştirici Kurulumu (elle başlatmak isteyenler için)

> Alternatif olarak klasik yöntemle projeyi ayrı ayrı çalıştırmak da mümkün:

### 1️⃣ PostgreSQL'i Docker ile başlat

```bash
docker-compose up -d postgres
```

### 2️⃣ Backend (NestJS)

```bash
cd backend
npm install
npm run start:dev
```

### 3️⃣ Frontend (Vue 3 + Vite)

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 .env Dosyası

Proje kök dizinine `.env` dosyasını oluştur:

```env
POSTGRES_USER=teklif_admin
POSTGRES_PASSWORD=gucluSifre123
POSTGRES_DB=teklifdb
```

NestJS backend zaten bu değerleri `docker-compose.yml` üzerinden alır.  
Frontend için ek yapılandırma gerekmez.

---

## 📁 Proje Yapısı

```
teklif-takip/
├── backend/               # NestJS API (Docker destekli)
├── frontend/              # Vue 3 arayüz (Docker destekli)
├── docker-compose.yml     # Tüm servisleri tanımlar
├── .env                   # Ortak env dosyası
└── README.md
```

---

## 🚀 Kullanım Notları

- Vue üzerinden müşteri ve teklif eklenebilir
- Teklif durumu güncellenebilir (Beklemede, Kabul Edildi, Teslim Edildi)
- Duruma ve başlığa göre filtrelenebilir
- Giriş/şifre yoktur – sadece local kullanım için uygundur

---

## 💡 Katkı ve Öneri

Eğer bu uygulamayı kullanabilecek tanıdıklarınız varsa paylaşabilirsiniz.  
Geri bildirim ve katkılara açığım 🙌

---

## 📄 Lisans

```
MIT Lisansı
```