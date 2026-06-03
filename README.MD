# 🌟 MATCHSTEP AI — Capstone Project Coding Camp 2026

> Powered by **DBS Foundation × Dicoding Indonesia**

**MATCHSTEP AI** adalah platform cerdas berbasis kecerdasan buatan (_Artificial Intelligence_) yang dirancang untuk menganalisis, merekomendasikan, dan memvalidasi kesiapan karier IT pengguna berdasarkan standar industri global. Sistem ini memanfaatkan algoritma _Neural Network_ untuk memberikan rekomendasi jalur karier yang akurat dan personal.

| Domain | URL |
|---|---|
| 🌐 Frontend (Production) | [https://matchstepai.my.id](https://matchstepai.my.id) |
| ⚙️ Backend API (Production) | [https://backend.matchstepai.my.id](https://backend.matchstepai.my.id) |
| ⚙️ AI API (Production) | [https://hyporom-matchstep-api.hf.space/](https://hyporom-matchstep-api.hf.space/) |
---

## 📑 Daftar Isi

- [Anggota Tim & Peran](#-anggota-tim--peran)
- [Arsitektur & Teknologi](#-arsitektur--teknologi)
- [Struktur Repositori](#-struktur-repositori)
- [Aturan Percabangan GitHub](#-aturan-percabangan-github)
- [Petunjuk Setup Environment](#-petunjuk-setup-environment)
- [Petunjuk Penggunaan Aplikasi](#-petunjuk-penggunaan-aplikasi)
- [Tautan Unduhan Model AI](#-tautan-unduhan-model-ai)
- [Informasi Penting & Batasan Scope](#-informasi-penting--batasan-scope)
- [Keamanan & Kredensial](#-keamanan--kredensial)

---

## 👥 Anggota Tim & Peran

| Nama | Peran |
|---|---|
| **Romualdus Hary Prabowo** | AI Engineer |
| **Juliani Leony Putri Melati Manalu** | AI Engineer |
| **Reyhan Capri Moraga** | Full Stack Developer |
| **Daniel Calvin Simanjuntak** | Full Stack Developer |
| **Septa Bagas Setyawan** | Data Scientist |
| **Devina Kartika** | Data Scientist |

---

## 🏗️ Arsitektur & Teknologi

```
┌─────────────────────┐     ┌──────────────────────────┐     ┌──────────────────────┐
│   Frontend (Client)  │────▶│   Backend (API Gateway)   │────▶│   AI Service (ML)     │
│                      │     │                           │     │                       │
│  React 19 + Vite 8   │     │  Express.js + Prisma ORM  │     │  FastAPI + TensorFlow │
│  Tailwind CSS        │     │  PostgreSQL (Aiven)       │     │  Scikit-learn          │
│  Framer Motion       │     │  Vercel Deployment        │     │  Hugging Face Spaces   │
│  RetroUI + Base UI   │     │                           │     │                       │
└─────────────────────┘     └──────────────────────────┘     └──────────────────────┘
     matchstepai.my.id        backend.matchstepai.my.id        https://hyporom-matchstep-api.hf.space
```

### Teknologi yang Digunakan

| Layer | Stack |
|---|---|
| **Frontend** | React v19, Vite v8, Tailwind CSS v3, Framer Motion, RetroUI, Base UI, React Router v7, React Hook Form + Zod |
| **Backend** | Express.js v4, Prisma ORM v7, PostgreSQL (Aiven Cloud), Axios, Multer, Zod Validation |
| **AI Service** | FastAPI, TensorFlow/Keras, Scikit-learn (di-host terpisah di Hugging Face Spaces) |
| **Auth** | Google OAuth 2.0 (`@react-oauth/google`), JWT decode |
| **Deployment** | Frontend: Vercel/Custom Domain, Backend: Vercel Serverless, AI: Hugging Face Spaces |

---

## 📂 Struktur Repositori

```
capstone-project-coding-camp-2026/
├── 📁 frontend/                  # Aplikasi React + Vite (Client-Side)
│   ├── public/                   # Aset statis
│   ├── src/                      # Source code React
│   ├── .env.example              # Template environment variables
│   ├── .gitignore                # Git ignore rules
│   ├── index.html                # Entry point HTML
│   ├── package.json              # Dependencies & scripts
│   ├── tailwind.config.js        # Konfigurasi Tailwind CSS
│   ├── vite.config.js            # Konfigurasi Vite bundler
│   └── ...
├── 📁 backend/                   # API Gateway Express.js (Server-Side)
│   ├── prisma/                   # Schema & migrasi database
│   ├── src/                      # Source code API
│   ├── .env.example              # Template environment variables
│   ├── .gitignore                # Git ignore rules
│   ├── package.json              # Dependencies & scripts
│   ├── vercel.json               # Konfigurasi deployment Vercel
│   └── ...
├── 📄 README.md                  # Dokumentasi utama (file ini)
└── 📄 .gitignore                 # Git ignore rules (root)
```

---

## 🌿 Aturan Percabangan GitHub

### Sistem Branching

Tiap _learning path_ memiliki cabang khusus dengan format penamaan:

```
branch-tim-[nama-learning-path]
```

| Learning Path | Nama Branch | Anggota |
|---|---|---|
| AI Engineer | `branch-tim-ai` | Romualdus, Juliani |
| Full Stack Developer | `branch-tim-fullstack` | Reyhan, Daniel |
| Data Science | `branch-tim-data-science` | Septa, Devina |

### Alur Kerja

1. Setiap anggota melakukan **push** ke branch _learning path_ masing-masing.
2. Pembagian frekuensi dan detail push **dibebaskan** sesuai kesepakatan tiap tim.
3. Setelah fitur stabil, buat **Pull Request** ke branch `main` untuk review dan merge.
4. **JANGAN** langsung push ke `main` tanpa melalui PR.

```bash
# Contoh workflow
git checkout branch-tim-fullstack
git pull origin branch-tim-fullstack
# ... lakukan perubahan ...
git add .
git commit -m "feat: tambah fitur login OAuth"
git push origin branch-tim-fullstack
```

---

## 🛠️ Petunjuk Setup Environment

### Prasyarat

Pastikan sudah terinstall di sistem Anda:

- **Node.js** ≥ 18.x ([Download](https://nodejs.org/))
- **npm** ≥ 9.x (sudah termasuk dalam Node.js)
- **Git** ([Download](https://git-scm.com/))
- **PostgreSQL** (opsional untuk development lokal, atau gunakan cloud database)

### Langkah 1 — Kloning Repositori

```bash
git clone https://github.com/RomualdusHaryPrabowo/capstone-project-coding-camp-2026.git
cd capstone-project-coding-camp-2026
```

---

### Langkah 2 — Setup Backend

```bash
# Masuk ke direktori backend
cd backend

# Install dependensi
npm install

# Salin template environment
cp .env.example .env

# ⚠️ Edit file .env dan isi dengan kredensial yang sesuai:
#    - DATABASE_URL    → Connection string PostgreSQL
#    - MATCHSTEP_AI_URL → URL service AI (Hugging Face)
#    - CORS_ORIGIN     → URL frontend
#    - GEMINI_API_KEY   → API key Gemini (opsional)

# Jalankan migrasi database
npx prisma db push

# (Opsional) Buka Prisma Studio untuk inspeksi database
npx prisma studio

# Jalankan server development
npm run dev
# Server berjalan di http://localhost:3000
```

---

### Langkah 3 — Setup Frontend

```bash
# Buka terminal baru, masuk ke direktori frontend
cd frontend

# Install dependensi
npm install

# Salin template environment
cp .env.example .env

# ⚠️ Edit file .env dan isi:
#    - VITE_GOOGLE_CLIENT_ID → Google OAuth Client ID
#    - VITE_BACKEND_URL      → URL backend API

# Jalankan server development
npm run dev
# Aplikasi berjalan di http://localhost:5173
```

---

### Langkah 4 — Build untuk Production

```bash
# Frontend
cd frontend
npm run build
# Output di folder dist/

# Backend (generate Prisma client)
cd backend
npm run build
```

---

## 📱 Petunjuk Penggunaan Aplikasi

### 1. Registrasi & Login
- Buka aplikasi di [https://matchstepai.my.id](https://matchstepai.my.id)
- Klik tombol **"Login dengan Google"** untuk masuk menggunakan akun Google
- Sistem akan secara otomatis membuat akun baru jika belum terdaftar

### 2. Prediksi Karier IT
- Setelah login, navigasi ke halaman **Prediksi** / **Dashboard**
- Isi formulir penilaian keahlian IT Anda (skill assessment)
- Sistem AI akan menganalisis input dan memberikan **rekomendasi jalur karier** yang paling cocok
- Hasil prediksi mencakup: skor kecocokan, visualisasi radar keahlian, dan saran pengembangan

### 3. Riwayat Prediksi
- Semua hasil prediksi disimpan secara otomatis
- Akses halaman **Riwayat** untuk melihat histori prediksi sebelumnya
- Bandingkan perkembangan keahlian dari waktu ke waktu

### 4. Forum Diskusi Komunitas
- Gunakan fitur **Forum** untuk berdiskusi dengan pengguna lain
- Bagikan pengalaman dan tips seputar karier IT

---

## 🤖 Tautan Unduhan Model AI

Untuk menjalankan layanan AI secara lokal (opsional), Anda memerlukan file model _Machine Learning_.

> [!IMPORTANT]
> **Unduh model Machine Learning** (seperti `best_model.keras`, scaler, encoder) melalui tautan berikut:
>
> 👉 **[Download Model MatchStep AI](https://drive.google.com/drive/folders/LINK_MODEL_MENYUSUL_DARI_TIM_AI)**
>
> *(Tautan akan diperbarui oleh Tim AI — jika tautan belum aktif, hubungi Tim AI)*
>
> Setelah diunduh, tempatkan file model ke dalam direktori yang sesuai agar dapat dibaca oleh API AI Service.

---

## ℹ️ Informasi Penting & Batasan Scope

### Framework & Library Utama

| Komponen | Teknologi | Versi |
|---|---|---|
| Frontend Framework | React | v19 |
| Build Tool | Vite | v8 |
| CSS Framework | Tailwind CSS | v3.4 |
| UI Components | RetroUI + Base UI | Latest |
| Animation | Framer Motion | v12 |
| Backend Framework | Express.js | v4 |
| ORM | Prisma | v7 |
| Database | PostgreSQL | Aiven Cloud |
| AI/ML | TensorFlow, Scikit-learn | Latest |
| AI API | FastAPI | Latest |

### Batasan Scope Aplikasi

- ✅ Aplikasi web responsif (desktop & mobile)
- ✅ Rekomendasi karier IT berbasis AI/Neural Network
- ✅ Visualisasi radar keahlian (skill chart)
- ✅ Forum diskusi komunitas
- ✅ Dashboard riwayat hasil prediksi personal
- ✅ Autentikasi via Google OAuth 2.0
- ❌ Tidak mendukung login selain Google OAuth
- ❌ Tidak mencakup fitur pembayaran/langganan
- ❌ AI model berjalan di server terpisah (Hugging Face Spaces), bukan di backend utama

### Domain & Deployment

| Layanan | Domain | Platform |
|---|---|---|
| Frontend | `matchstepai.my.id` | Vercel |
| Backend API | `backend.matchstepai.my.id` | Vercel Serverless |
| AI Service | Hugging Face Spaces | Hugging Face |
| Database | Aiven Cloud PostgreSQL | Aiven |

---

## 🔒 Keamanan & Kredensial

> [!CAUTION]
> **DILARANG KERAS** mengunggah data sensitif ke repositori!

### Aturan Wajib

1. **JANGAN** commit file `.env`, `.env.production`, `.env.local` ke repositori
2. **JANGAN** menyertakan API Key, password, token OAuth, atau connection string database asli di kode
3. **SELALU** gunakan file `.env.example` sebagai template (tanpa nilai kredensial asli)
4. **PASTIKAN** file `.gitignore` mencakup semua file sensitif
5. **PERIKSA** ulang sebelum push — pastikan tidak ada kredensial yang bocor

### Checklist Sebelum Push

```
✅ File .env TIDAK ikut ter-commit
✅ Tidak ada API key/password hardcoded di source code
✅ File .env.example hanya berisi placeholder
✅ .gitignore sudah mencakup .env, .env.*, node_modules, dist
```

---

## 📝 Lisensi

Proyek ini dikembangkan sebagai bagian dari program **Coding Camp 2026 — DBS Foundation × Dicoding Indonesia**.

---

<p align="center">
  Dibuat dengan ❤️ oleh <strong>Tim MatchStep AI</strong> — Coding Camp 2026
</p>
