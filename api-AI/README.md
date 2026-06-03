````markdown
# MatchStep AI — Backend Machine Learning API

Backend API berbasis **FastAPI** untuk melakukan prediksi dan rekomendasi jalur karier mahasiswa Informatika menggunakan model *Deep Learning*.

API ini menerima data **hard skill** dan **soft skill**, kemudian menghasilkan rekomendasi karier, lengkap dengan analisis dinamis berbasis AI yang akan muncul secara otomatis.

---

# 📁 Struktur Folder

```text
matchstep-api/
│
├── model-ai/                     # Folder model AI (tidak di-push ke GitHub)
│   ├── best_model.keras
│   ├── label_encoder.pkl
│   ├── matchstep_ai_model.pkl
│   ├── scaler_hard.pkl
│   └── scaler_soft.pkl
│
├── main.py                       # Main FastAPI server
├── requirements.txt              # Dependency Python
├── .env.example                  # Template environment variable
└── README.md                     # Dokumentasi 
````

---

# 🚀 Teknologi yang Digunakan

* Python
* FastAPI
* TensorFlow / Keras
* Scikit-learn
* Uvicorn
* Pickle
* Google Gemini API

---

# ⚠️ Informasi Penting

Model *Deep Learning* tersimpan terpisah di google drive, sehingga folder `model-ai/` beserta seluruh isinya di-*ignore* menggunakan `.gitignore`.

Artinya, setelah melakukan `git clone` atau `git pull`, folder `model-ai/` **tidak akan tersedia secara otomatis**.

Perlu melakukan setup model secara manual sebelum server dapat dijalankan.

---

# 🛠️ Setup dan Menjalankan Project

## 1. Clone Repository

```bash
git clone [url]
```

---

## 2. Masuk ke Folder Project

```bash
cd matchstep-api
```

---

# 🔑 Setup Environment Variables (.env)

Di root project, kalian akan menemukan file:

```text
.env.example
```

Copy atau rename file tersebut menjadi:

```text
.env
```

Lalu isi API Key Gemini pada file `.env`.

Contoh:

```env
GEMINI_API_KEY=api-key-anda
```
---

# 🤖 Setup Model AI

Download seluruh isi folder `model-ai/` dari Google Drive berikut:

```text
https://drive.google.com/drive/folders/12P0FQCN6R_jbyzczULNLsDasKwiR7dYe?usp=drive_link
```

Isi folder tersebut terdiri dari:

```text
best_model.keras
label_encoder.pkl
matchstep_ai_model.pkl
scaler_hard.pkl
scaler_soft.pkl
```

---

## Setelah Download

Buat folder bernama:

```text
model-ai
```

di dalam folder:

```text
matchstep-api/
```

Kemudian masukkan seluruh file model ke dalam folder tersebut hingga struktur akhirnya menjadi:

```text
matchstep-api/
│
├── model-ai/
│   ├── best_model.keras
│   ├── label_encoder.pkl
│   ├── matchstep_ai_model.pkl
│   ├── scaler_hard.pkl
│   └── scaler_soft.pkl
```

---

# 📦 Install Dependency

## (Opsional jika belum install)

```bash
pip install -r requirements.txt
```

---

# ▶️ Menjalankan Server

Jalankan server menggunakan:

```bash
uvicorn main:app --reload
```

Server akan berjalan di:

```text
http://127.0.0.1:8000
```

---

# 📖 Dokumentasi API

Swagger Documentation tersedia di:

```text
http://127.0.0.1:8000/docs
```

---

# 🔌 Endpoint API

## 1. Health Check

### Request

* Method: `GET`
* Endpoint:

```text
/
```

### Response

```json
{
  "pesan": "Server MatchStep AI aktif dan berjalan normal."
}
```

---

# 🎯 Endpoint Prediksi Karier

## Request

* Method: `POST`
* Endpoint:

```text
http://127.0.0.1:8000/predict
```

---

# 📥 Format Input

## Hard Skill (14 Fitur)

Urutan fitur wajib sesuai berikut:

```text
[
  Python,
  Java,
  C++,
  JavaScript,
  C#,
  PHP,
  Ruby,
  Swift,
  Go,
  Rust,
  Software_Development_Experience,
  Database_Management,
  Networking_Skills,
  Web_Development_Experience
]
```

---

## Soft Skill (5 Fitur)

```text
[
  Communication_Skills,
  Problem_Solving_Abilities,
  Teamwork_Collaboration,
  Time_Management,
  Adaptability
]
```

---

# 📤 Contoh Request

```json
{
  "hard_skills": [
    8.5,
    9.2,
    8.0,
    7.5,
    3.0,
    4.0,
    9.0,
    0.0,
    8.0,
    3.0,
    4.0,
    1.0,
    8.0,
    4.0
  ],
  "soft_skills": [
    8.8,
    9.0,
    8.5,
    4.0,
    1.0
  ]
}
```

---

# 📤 Contoh Response

```json
{
  "status": "sukses",
  "rekomendasi_utama": "Software Engineering",
  "tingkat_keyakinan": 94.52,
  "detail_matriks": [
    {
      "karier": "Software Engineering",
      "probabilitas_persen": 94.52
    },
    {
      "karier": "Data & AI",
      "probabilitas_persen": 3.20
    }
  ],
  "analisis_dinamis": "Karier yang paling cocok untuk Anda adalah Software Engineering. Berdasarkan hasil analisis MatchStep AI, kombinasi logika teknismu yang tinggi...\n\nSkill penting yang perlu dipelajari:\n1. Algoritma...\n2. Git..."
}
```

---

# 🖥️ Integrasi dengan Frontend

Frontend cukup mengambil value dari:

```json
analisis_dinamis
```

dan menampilkannya di halaman hasil rekomendasi karier.

Contoh penggunaan di UI:

* Di bawah kartu hasil rekomendasi
* Di section “Analisis AI”
* Di halaman detail karier

---

# ⚠️ Validasi Input

* `hard_skills` wajib berisi **14 nilai**
* `soft_skills` wajib berisi **5 nilai**
* Urutan fitur wajib sesuai dokumentasi

---

# 🌐 Konfigurasi CORS

CORS sudah diaktifkan secara global di `main.py`, sehingga frontend seperti:

* React
* Next.js
* Vue
* Flutter Web

dapat langsung mengakses API tanpa masalah CORS saat development.

---

# 👨‍💻 Catatan Pengembangan

Jika terjadi error saat menjalankan server:

* Pastikan folder `model-ai/` sudah ada
* Pastikan semua file `.keras` dan `.pkl` sudah lengkap
* Pastikan file `.env` sudah dibuat
* Pastikan API Key Gemini valid
* Pastikan dependency sudah terinstall
```
