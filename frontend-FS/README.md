# 🎨 MATCHSTEP AI — Frontend Dashboard

> **Neo-Brutalist Career Analysis Dashboard**
> Bagian dari proyek [MATCHSTEP AI](https://github.com/RomualdusHaryPrabowo/capstone-project-coding-camp-2026) — Capstone Project Coding Camp 2026

---

## 📑 Daftar Isi

- [Penjelasan Proyek](#-penjelasan-proyek)
- [Tech Stack & Framework](#-tech-stack--framework)
- [Struktur Direktori](#-struktur-direktori)
- [Petunjuk Setup Environment](#-petunjuk-setup-environment)
- [Konfigurasi Environment Variables](#-konfigurasi-environment-variables)
- [Petunjuk Penggunaan Aplikasi](#-petunjuk-penggunaan-aplikasi)
- [Deployment](#-deployment)
- [Tautan Model AI](#-tautan-model-ai)
- [Informasi Penting & Batasan Scope](#-informasi-penting--batasan-scope)
- [Keamanan & Kredensial](#-keamanan--kredensial)

---

## 🧭 Penjelasan Proyek

**MATCHSTEP AI Frontend** adalah antarmuka pengguna (_user interface_) utama untuk platform analisis karier IT berbasis AI. Dibangun dengan desain bertema **Neo-Brutalist** yang premium, interaktif, responsif, dan dilengkapi animasi mikro yang memukau.

Fitur utama antarmuka:

- 🎯 **Prediksi karier IT** — evaluasi keahlian dengan input skill interaktif
- 📊 **Visualisasi radar** — tampilan grafis 3D neo-brutalist untuk skor kecocokan
- 💬 **Forum diskusi** — komunitas pengguna dengan filter tag
- 📋 **Riwayat prediksi** — dashboard histori personal
- 🔐 **Google Sign-In** — autentikasi aman via OAuth 2.0

| Informasi | Detail |
|---|---|
| 🌐 Production URL | [https://matchstepai.my.id](https://matchstepai.my.id) |
| ⚙️ Backend API URL | [https://backend.matchstepai.my.id](https://backend.matchstepai.my.id) |
| 📦 Package Name | `frontend` |

---

## 🛠️ Tech Stack & Framework

| Kategori | Teknologi | Versi |
|---|---|---|
| Framework | React.js | v19.2 |
| Build Tool | Vite | v8.0 |
| CSS Framework | Tailwind CSS | v3.4 |
| UI Components | RetroUI + Base UI | Latest |
| Animation | Framer Motion | v12 |
| Routing | React Router DOM | v7.15 |
| Form Handling | React Hook Form + Zod | Latest |
| Auth | @react-oauth/google | v0.13 |
| HTTP Client | Axios | v1.16 |
| Icons | Lucide React | v1.16 |
| Typography | Inter (via @fontsource) | Variable |

---

## 📂 Struktur Direktori

```
frontend-FS/
├── public/                      # Aset statis (favicon, images, dll)
├── src/
│   ├── components/              # Reusable UI components (RetroUI + custom)
│   ├── contexts/                # React Context (AuthContext, dll)
│   ├── lib/                     # Library utilities (cn, api client)
│   ├── pages/
│   │   ├── LandingPage.jsx      # Halaman utama / hero
│   │   ├── SignInPage.jsx       # Halaman login
│   │   ├── SignUpPage.jsx       # Halaman registrasi
│   │   ├── KnowsCareerPage.jsx # Prediksi karier spesifik (short-form)
│   │   ├── GeneralPredictPage.jsx # Prediksi karier umum (19 skills)
│   │   ├── CareerDetailPage.jsx # Detail hasil prediksi
│   │   ├── HistoryPage.jsx      # Riwayat prediksi
│   │   ├── DiscussionPage.jsx   # Forum diskusi komunitas
│   │   └── NotFoundPage.jsx     # Halaman 404
│   ├── styles/                  # Custom CSS & theme variables
│   ├── utils/                   # Utility/helper functions
│   ├── App.jsx                  # Root component & routing
│   └── main.jsx                 # Entry point React
├── .env.example                 # Template environment variables (AMAN)
├── .gitignore                   # Git ignore rules
├── components.json              # Konfigurasi RetroUI registry
├── index.html                   # Entry point HTML
├── package.json                 # Dependencies & scripts
├── postcss.config.js            # Konfigurasi PostCSS
├── tailwind.config.js           # Konfigurasi Tailwind CSS
└── vite.config.js               # Konfigurasi Vite bundler
```

---

## 🚀 Petunjuk Setup Environment

### Prasyarat (Prerequisites)

Pastikan sudah terinstall di sistem Anda:

| Software | Versi Minimum | Keterangan |
|---|---|---|
| Node.js | ≥ 18.x | [Download](https://nodejs.org/) |
| npm | ≥ 9.x | Sudah termasuk dalam Node.js |
| Git | Any | [Download](https://git-scm.com/) |

### Langkah 1 — Instalasi Dependensi

```bash
cd frontend-FS
npm install
```

### Langkah 2 — Konfigurasi Environment

```bash
# Salin template environment
cp .env.example .env
```

> [!WARNING]
> Edit file `.env` dan isi dengan kredensial yang sesuai. **JANGAN** gunakan nilai dari `.env.example` untuk production!

### Langkah 3 — Jalankan Dev Server

```bash
npm run dev
```

Aplikasi berjalan di: **http://localhost:5173**

### Langkah 4 — Build untuk Production

```bash
npm run build
```

Output di folder `dist/`.

### Langkah 5 — Preview Build

```bash
npm run preview
```

---

## 🔑 Konfigurasi Environment Variables

Salin `.env.example` → `.env`, lalu isi nilai sesuai kebutuhan:

```env
# =============================================
# MATCHSTEP AI — Frontend Environment Variables
# =============================================

# --- Google OAuth 2.0 ---
# Dapatkan di: https://console.cloud.google.com/apis/credentials
VITE_GOOGLE_CLIENT_ID="your-google-client-id-here"

# --- Backend API ---
# Development: http://localhost:3000
# Production : https://backend.matchstepai.my.id
VITE_BACKEND_URL="http://localhost:3000"
```

| Variable | Wajib | Deskripsi |
|---|---|---|
| `VITE_GOOGLE_CLIENT_ID` | ✅ | Client ID Google OAuth untuk Sign-In |
| `VITE_BACKEND_URL` | ✅ | URL endpoint backend API |

> [!NOTE]
> Semua environment variable di Vite **harus** diawali prefix `VITE_` agar dapat diakses di client-side code.

---

## 📱 Petunjuk Penggunaan Aplikasi

### 1. Halaman Utama (Landing Page)

- Visualisasi hero section bertema neo-brutalist dengan animasi teks floating dan terminal mock
- Navigasi scroll responsif ke bagian: Alur Analisa, Pilihan Karier IT, FAQ, Forum Diskusi
- Akses via: **[https://matchstepai.my.id](https://matchstepai.my.id)**

### 2. Login & Registrasi

- Klik tombol **"Login dengan Google"** untuk masuk
- Sistem otomatis membuat akun baru jika belum terdaftar
- Autentikasi aman via Google OAuth 2.0

### 3. Prediksi Karier IT

#### a. Targeted Predict (`/knows`)
- Evaluasi keahlian **6 parameter skill** sesuai rumpun karier pilihan
- Rumpun tersedia: Software Engineering, Data & AI, Infrastructure & Security, Management & Analysis, Support & Design

#### b. General Predict (`/predict`)
- Evaluasi kecocokan karier dari **19 parameter skill** penuh
- 10 programming skills, 4 hard skills, 5 soft skills
- Input menggunakan slider taktil interaktif

### 4. Hasil Analisis & Visualisasi

- Persentase kecocokan dalam visualisasi bar 3D neo-brutalist
- Rekomendasi Roadmap Belajar komprehensif (powered by Gemini AI)
- Teknologi relevan & proyek portofolio pemula

### 5. Riwayat Prediksi (`/history`)

- Semua hasil prediksi disimpan otomatis
- Bandingkan perkembangan keahlian dari waktu ke waktu

### 6. Forum Diskusi (`/discussions`)

- Tempat berkumpul komunitas untuk bertanya dan berbagi
- Filter diskusi berdasarkan trending hashtag
- Mobile accordion drawer responsif

---

## 🌐 Deployment

### NPM Scripts

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Jalankan dev server Vite (HMR) |
| `npm run build` | Build production bundle |
| `npm run preview` | Preview build lokal |
| `npm run lint` | Jalankan ESLint |

### Deploy ke Vercel / Hosting

1. Build project:
   ```bash
   npm run build
   ```

2. Upload folder `dist/` ke hosting, atau deploy otomatis via Vercel:
   - Connect repository GitHub
   - Set **Root Directory** ke `frontend`
   - Set **Build Command** ke `npm run build`
   - Set **Output Directory** ke `dist`
   - Tambah Environment Variables di dashboard

### Environment Variables di Hosting

| Variable | Value |
|---|---|
| `VITE_GOOGLE_CLIENT_ID` | _(Google OAuth Client ID)_ |
| `VITE_BACKEND_URL` | `https://backend.matchstepai.my.id` |

---

## 🤖 Tautan Model AI

Untuk menjalankan AI Service secara lokal, unduh model Machine Learning:

> [!IMPORTANT]
> 👉 **[Download Model MatchStep AI](https://drive.google.com/drive/folders/LINK_MODEL_MENYUSUL_DARI_TIM_AI)**
>
> *(Tautan akan diperbarui oleh Tim AI — hubungi Tim AI jika belum aktif)*

---

## ℹ️ Informasi Penting & Batasan Scope

### Fitur Frontend

- ✅ Desain Neo-Brutalist premium dengan animasi mikro (Framer Motion)
- ✅ Fully responsive — desktop & mobile
- ✅ Google OAuth 2.0 Sign-In
- ✅ Prediksi karier IT (short-form & full 19-parameter)
- ✅ Visualisasi radar/bar chart 3D
- ✅ AI-generated roadmap & saran karier (via Gemini)
- ✅ Forum diskusi dengan filter tag
- ✅ Riwayat prediksi personal
- ✅ Form validation real-time (React Hook Form + Zod)

### Batasan

- ❌ Autentikasi hanya mendukung Google OAuth (tidak ada email/password)
- ❌ Tidak mencakup fitur pembayaran/langganan
- ❌ Belum mendukung dark mode toggle (tema fixed neo-brutalist)
- ❌ Tidak ada fitur notifikasi push

### Domain & URL

| Environment | URL |
|---|---|
| Frontend (Production) | `matchstepai.my.id` |
| Frontend (Development) | `http://localhost:5173` |
| Backend API (Production) | `backend.matchstepai.my.id` |
| Backend API (Development) | `http://localhost:3000` |

---

<p align="center">
  <strong>MATCHSTEP AI Frontend</strong> · <code>matchstepai.my.id</code> · Coding Camp 2026
</p>
