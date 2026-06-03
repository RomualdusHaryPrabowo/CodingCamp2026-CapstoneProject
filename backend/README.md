# ⚙️ MATCHSTEP AI — Backend API Gateway

> **REST API Gateway & Prediction Service**
> Bagian dari proyek [MATCHSTEP AI](https://github.com/RomualdusHaryPrabowo/capstone-project-coding-camp-2026) — Capstone Project Coding Camp 2026

---

## 📑 Daftar Isi

- [Penjelasan Proyek](#-penjelasan-proyek)
- [Tech Stack & Framework](#-tech-stack--framework)
- [Struktur Direktori](#-struktur-direktori)
- [Petunjuk Setup Environment](#-petunjuk-setup-environment)
- [Konfigurasi Environment Variables](#-konfigurasi-environment-variables)
- [Petunjuk Penggunaan API](#-petunjuk-penggunaan-api)
- [Setup Database Aiven Cloud](#-setup-database-aiven-cloud-postgresql)
- [Deployment ke Vercel](#-deployment-ke-vercel)
- [Tautan Model AI](#-tautan-model-ai)
- [Informasi Penting & Batasan Scope](#-informasi-penting--batasan-scope)
- [Keamanan & Kredensial](#-keamanan--kredensial)

---

## 🧭 Penjelasan Proyek

**MATCHSTEP AI Backend** adalah REST API Gateway yang bertanggung jawab untuk:

- 🔐 **Autentikasi pengguna** via Google OAuth JWT verification
- 🤖 **Meneruskan data prediksi** ke FastAPI AI Service (Hugging Face Spaces)
- 💾 **Menyimpan riwayat prediksi** ke database PostgreSQL via Prisma ORM
- 💬 **Mengelola forum diskusi** komunitas (CRUD discussions)
- ✅ **Validasi input** secara ketat menggunakan Zod schema

| Informasi         | Detail                                                                 |
| ----------------- | ---------------------------------------------------------------------- |
| 🌐 Production URL | [https://backend.matchstepai.my.id](https://backend.matchstepai.my.id) |
| 🔗 Frontend URL   | [https://matchstepai.my.id](https://matchstepai.my.id)                 |
| 📦 Package Name   | `matchstep-backend`                                                    |
| 📌 Versi          | `1.0.0`                                                                |

---

## 🛠️ Tech Stack & Framework

| Kategori     | Teknologi                      | Versi       |
| ------------ | ------------------------------ | ----------- |
| Runtime      | Node.js                        | ≥ 18.x      |
| Framework    | Express.js                     | v4.18       |
| ORM          | Prisma                         | v7.0        |
| Database     | PostgreSQL                     | Aiven Cloud |
| Validasi     | Zod                            | v3.22       |
| HTTP Client  | Axios                          | v1.6        |
| File Upload  | Multer                         | v2.1        |
| AI Generatif | @google/generative-ai (Gemini) | v0.24       |
| Deployment   | Vercel Serverless              | Latest      |

---

## 📂 Struktur Direktori

```
backend/
├── prisma/
│   ├── migrations/          # File migrasi database
│   ├── schema.prisma        # Schema definisi tabel database
│   └── seed.js              # Script seed data contoh
├── src/
│   ├── config/              # Konfigurasi app (database, cors, dll)
│   ├── features/
│   │   ├── discussion/      # Modul forum diskusi (controller, route, service)
│   │   ├── history/         # Modul riwayat prediksi
│   │   └── recommendation/  # Modul rekomendasi karier AI
│   ├── middleware/           # Express middleware (auth, error handler)
│   ├── utils/               # Utility functions
│   └── index.js             # Entry point server
├── .env.example             # Template environment variables (AMAN)
├── .gitignore               # Git ignore rules
├── package.json             # Dependencies & scripts
├── prisma.config.js         # Konfigurasi Prisma
└── vercel.json              # Konfigurasi deployment Vercel
```

---

## 🚀 Petunjuk Setup Environment

### Prasyarat (Prerequisites)

Pastikan sudah terinstall di sistem Anda:

| Software   | Versi Minimum | Keterangan                       |
| ---------- | ------------- | -------------------------------- |
| Node.js    | ≥ 18.x        | [Download](https://nodejs.org/)  |
| npm        | ≥ 9.x         | Sudah termasuk dalam Node.js     |
| PostgreSQL | Any           | Lokal atau cloud (Aiven)         |
| Git        | Any           | [Download](https://git-scm.com/) |

### Langkah 1 — Instalasi Dependensi

```bash
cd backend
npm install
```

### Langkah 2 — Konfigurasi Environment

```bash
# Salin template environment
cp .env.example .env
```

> [!WARNING]
> Edit file `.env` dan isi dengan kredensial yang sesuai. **JANGAN** gunakan nilai dari `.env.example` untuk production!

### Langkah 3 — Migrasi Database

```bash
# Push schema ke database
npx prisma db push

# ATAU jalankan migrasi formal
npm run prisma:migrate
```

### Langkah 4 — Seed Data (Opsional)

```bash
npm run prisma:seed
```

### Langkah 5 — Jalankan Server

```bash
# Development (dengan auto-reload via nodemon)
npm run dev

# Production
npm start
```

Server berjalan di: **http://localhost:3000**

### Langkah 6 — Verifikasi

```bash
# Cek status server
curl http://localhost:3000/

# Buka Prisma Studio (GUI database)
npx prisma studio
```

---

## 🔑 Konfigurasi Environment Variables

Salin `.env.example` → `.env`, lalu isi nilai sesuai kebutuhan:

```env
# ============================================
# MATCHSTEP AI — Backend Environment Variables
# ============================================
# Salin file ini menjadi .env dan isi dengan nilai yang sesuai.
# JANGAN commit file .env ke repositori!
# ============================================

# --- Server ---
# Port dan mode environment untuk server Express
PORT=8000
NODE_ENV=development

# --- Database (PostgreSQL) ---
# Connection string ke database PostgreSQL
# Update dengan kredensial database Anda
DATABASE_URL="postgresql://user:password@localhost:5432/MATCHSTEP_db"

# --- AI Service ---
# URL endpoint FastAPI AI Service (Hugging Face Spaces / lokal)
MATCHSTEP_AI_URL="http://localhost:8000"

# --- CORS ---
# URL frontend yang diizinkan mengakses API
# Development: http://localhost:5173
# Production : https://matchstepai.my.id
CORS_ORIGIN="http://localhost:5173"
```

| Variable           | Deskripsi                       |
| ------------------ | ------------------------------- |
| `PORT`             | Port server (default: `8000`)   |
| `NODE_ENV`         | `development` atau `production` |
| `DATABASE_URL`     | Connection string PostgreSQL    |
| `MATCHSTEP_AI_URL` | URL FastAPI AI Service          |
| `CORS_ORIGIN`      | URL frontend yang diizinkan     |

---

## 📡 Petunjuk Penggunaan API

### NPM Scripts

| Perintah                 | Fungsi                                |
| ------------------------ | ------------------------------------- |
| `npm run dev`            | Jalankan server development (nodemon) |
| `npm start`              | Jalankan server production            |
| `npm run build`          | Generate Prisma Client                |
| `npm run lint`           | Jalankan ESLint                       |
| `npm run prisma:migrate` | Jalankan migrasi database             |
| `npm run prisma:studio`  | Buka GUI database Prisma Studio       |
| `npm run prisma:seed`    | Isi database dengan data contoh       |

### API Endpoints

#### 1. Health Check

```
GET /
```

Response: Status koneksi backend & AI service.

#### 2. Prediksi Karier Spesifik (Short-Form)

```
POST /api/v1/recommendations/specific
```

Validasi target karier spesifik dengan input 6 parameter skill.

```json
{
  "target_career": "Software Development",
  "skills_filled": {
    "Ruby": 8.5,
    "JavaScript": 7.0,
    "Rust": 6.5,
    "Go": 8.0,
    "Communication": 7.5,
    "Problem Solving": 8.0
  }
}
```

#### 3. Riwayat Prediksi

```
GET /api/v1/recommendations/history
```

Mengambil riwayat prediksi pengguna (max 50 data).

#### 4. Forum Diskusi

```
GET /api/v1/discussions
```

Mengambil daftar diskusi komunitas dengan filter tag.

---

## ☁️ Setup Database Aiven Cloud (PostgreSQL)

Aiven menyediakan layanan **PostgreSQL gratis** yang cocok untuk deployment.

### Langkah Singkat

1. **Buat akun** di [https://aiven.io](https://aiven.io)
2. **Buat service** PostgreSQL → Pilih region terdekat (Singapore) → Free Plan
3. **Salin Connection URI** dari halaman Overview → Connection Information
4. **Paste** ke `DATABASE_URL` di file `.env`

Format URI:

```
postgres://avnadmin:PASSWORD@HOSTNAME:PORT/defaultdb?sslmode=require
```

> [!IMPORTANT]
> Pastikan `sslmode=require` ada di akhir URL. Jika Aiven memberikan `sslmode=verify-full`, **ganti** menjadi `sslmode=require` agar kompatibel dengan Vercel.

### Troubleshooting

| Masalah                   | Solusi                                                       |
| ------------------------- | ------------------------------------------------------------ |
| `self-signed certificate` | Ganti `sslmode=verify-full` → `sslmode=require`              |
| `Connection refused`      | Pastikan service Aiven statusnya **Running**                 |
| `authentication failed`   | Cek ulang password di Aiven Console                          |
| `prisma generate` gagal   | Tambah `"postinstall": "prisma generate"` di `package.json`  |
| SSL error saat seed lokal | `$env:NODE_TLS_REJECT_UNAUTHORIZED="0"; node prisma/seed.js` |

---

## 🌐 Deployment ke Vercel

### Konfigurasi Vercel

File `vercel.json` sudah dikonfigurasi:

```json
{
  "version": 2,
  "builds": [{ "src": "src/index.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "src/index.js" }]
}
```

### Environment Variables di Vercel

Tambahkan variabel berikut di **Vercel Dashboard → Settings → Environment Variables**:

| Variable           | Value                              |
| ------------------ | ---------------------------------- |
| `NODE_ENV`         | `production`                       |
| `DATABASE_URL`     | _(connection string Aiven)_        |
| `MATCHSTEP_AI_URL` | _(URL Hugging Face AI service)_    |
| `CORS_ORIGIN`      | `https://matchstepai.my.id`        |
| `GEMINI_API_KEY`   | _(API key Gemini, jika digunakan)_ |

---

## 🤖 Tautan Model AI

Untuk menjalankan AI Service secara lokal, unduh model AI berikut:

> [!IMPORTANT]
> 👉 **[Download Model MatchStep AI](https://drive.google.com/drive/folders/12P0FQCN6R_jbyzczULNLsDasKwiR7dYe?usp=sharing)**

---

## ℹ️ Informasi Penting & Batasan Scope

### Fitur Backend

- ✅ REST API Gateway terintegrasi dengan FastAPI AI Service
- ✅ Validasi input ketat menggunakan **Zod** (skill range: `0`–`10`)
- ✅ **Data Padding Algorithm** — mapping otomatis 6 skill input → 19 parameter model AI
- ✅ Penyimpanan riwayat prediksi per-user ke PostgreSQL
- ✅ Forum diskusi komunitas (CRUD + filter tag)
- ✅ Google OAuth JWT verification
- ✅ AI-powered roadmap & rekomendasi via Gemini API

### Batasan

- ❌ Backend TIDAK menjalankan model AI secara langsung — hanya meneruskan ke FastAPI service
- ❌ Autentikasi hanya mendukung Google OAuth (tidak ada email/password)
- ❌ Rate limiting belum diimplementasikan

---

<p align="center">
  <strong>MATCHSTEP AI Backend</strong> · <code>backend.matchstepai.my.id</code> · Coding Camp 2026
</p>
