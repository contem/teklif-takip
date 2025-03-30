# 1. Hafif Node image kullan
FROM node:18-alpine

# 2. Uygulama dizini oluştur
WORKDIR /app

# 3. package.json ve package-lock.json'u kopyala
COPY package*.json ./

# 4. Bağımlılıkları yükle
RUN npm install

# 5. Tüm kaynak kodları kopyala
COPY . .

# 6. NestJS derlemesi
RUN npm run build

# 7. Uygulamayı başlat
CMD ["node", "dist/main"]
