# 🤖 MatchStep AI - Career Recommendation Model

## 📌 Overview

MatchStep AI merupakan sistem rekomendasi karier berbasis Deep Learning yang dirancang untuk membantu mahasiswa atau individu menemukan kelompok karier IT yang paling sesuai berdasarkan profil kemampuan yang dimiliki.

Model menganalisis kombinasi:

- Hard Skill (kemampuan teknis)
- Soft Skill (kemampuan interpersonal)
- Pengalaman teknis

Kemudian menghasilkan rekomendasi kelompok karier beserta tingkat keyakinan (confidence score).

---

## 🎯 Objective

Tujuan utama model adalah:

1. Mengidentifikasi kecocokan kompetensi pengguna.
2. Mengelompokkan berbagai profesi IT ke dalam kategori yang lebih mudah dipahami.
3. Memberikan rekomendasi karier berbasis data.
4. Membantu pengguna memahami jalur karier yang paling sesuai dengan kemampuan saat ini.

---

## 🏗️ Career Categories

Model memetakan berbagai profesi IT ke dalam 5 kelompok utama:

| Career Group | Example Careers |
|-------------|----------------|
| Software Development | Front End Developer, Back End Developer, Software Engineer, Mobile Developer |
| Data & AI | Data Scientist, Machine Learning Engineer, AI Engineer |
| Infrastructure & Security | Network Engineer, DevOps Engineer, Cybersecurity Analyst |
| Management & Analysis | Systems Analyst, IT Consultant, Project Manager |
| Support & Design | QA Engineer, UI/UX Designer, Technical Writer |

---

# 📊 Input Features

## Hard Skills

Model menggunakan berbagai indikator kemampuan teknis:

- Python
- Java
- C++
- JavaScript
- C#
- PHP
- Ruby
- Swift
- Go
- Rust
- Software Development Experience
- Database Management
- Networking Skills
- Web Development Experience

Total Hard Skill Features: **14**

---

## Soft Skills

Model juga mempertimbangkan kemampuan interpersonal:

- Communication Skills
- Problem Solving Abilities
- Teamwork & Collaboration
- Time Management
- Adaptability

Total Soft Skill Features: **5**

---

# ⚙️ Data Processing Pipeline

## 1. Data Loading

Dataset dibaca menggunakan Pandas.

```python
df = pd.read_csv("new_dataset_bersih.csv")
```

---

## 2. Career Mapping

Profesi spesifik diubah menjadi kategori karier utama.

Contoh:

```text
Front End Developer
↓
Software Development
```

```text
Cybersecurity Analyst
↓
Infrastructure & Security
```

---

## 3. Feature Extraction

Dataset dipisahkan menjadi:

### Hard Skill Matrix

```python
hard_skill_data
```

### Soft Skill Matrix

```python
soft_skill_data
```

### Target Label

```python
Target_Karier_Grouped
```

---

## 4. Label Encoding

Target kategori karier diubah menjadi representasi numerik.

Contoh:

```text
Data & AI               → 0
Infrastructure Security → 1
Management Analysis     → 2
Software Development    → 3
Support Design          → 4
```

---

## 5. Dataset Splitting

Proporsi data:

| Dataset | Percentage |
|----------|-----------|
| Training | 80% |
| Validation | 10% |
| Testing | 10% |

Menggunakan:

```python
train_test_split(..., stratify=y)
```

agar distribusi kelas tetap seimbang.

---

## 6. Feature Scaling

Normalisasi dilakukan menggunakan:

```python
StandardScaler()
```

untuk memastikan semua fitur berada pada skala yang konsisten.

---

# 🧠 Model Architecture

Model menggunakan pendekatan:

## Dual Input Neural Network

Karena Hard Skill dan Soft Skill memiliki karakteristik yang berbeda, keduanya diproses melalui jalur (branch) terpisah.

---

## Branch 1 — Hard Skill Network

```text
Input Hard Skill
        ↓
Dense(612)
        ↓
Batch Normalization
        ↓
Dropout(0.3)
        ↓
Dense(512)
        ↓
Dropout(0.2)
```

---

## Branch 2 — Soft Skill Network

```text
Input Soft Skill
        ↓
Dense(218)
        ↓
Dense(64)
        ↓
Dropout(0.2)
```

---

## Feature Fusion

Kedua representasi digabung menggunakan:

```python
Concatenate()
```

```text
Hard Skill Features
          +
Soft Skill Features
          ↓
Combined Representation
```

---

## Custom Feature Emphasis Layer

Model menggunakan custom layer:

```python
FeatureEmphasisLayer
```

yang memberikan bobot dinamis terhadap fitur hasil penggabungan.

Tujuan:

- Menekankan fitur yang lebih penting.
- Mengurangi pengaruh fitur yang kurang relevan.
- Meningkatkan kemampuan representasi model.

Konsep:

```text
Feature Vector
      ×
Trainable Weights
      ↓
Weighted Features
```

---

## Classification Head

```text
Dense(562)
      ↓
BatchNorm
      ↓
Dropout(0.3)
      ↓
Dense(282)
      ↓
Softmax Output
```

Output:

```text
5 Career Categories
```

---

# 🔄 Training Pipeline

## Optimizer

```python
Adam
```

Learning Rate:

```python
0.001
```

---

## Loss Function

```python
Sparse Categorical Crossentropy
```

Digunakan karena target sudah berbentuk integer label.

---

## Metrics

```python
Accuracy
```

---

## Early Stopping

Training dihentikan otomatis jika performa validasi tidak meningkat.

```python
EarlyStopping(
    monitor='val_loss',
    patience=10
)
```

---

## Learning Rate Scheduler

```python
ReduceLROnPlateau
```

Menurunkan learning rate ketika model stagnan.

---

## Model Checkpoint

Model terbaik disimpan berdasarkan:

```python
val_accuracy
```

File:

```text
best_model.keras
```

---

# 💾 Model Persistence

Setelah training selesai, beberapa artefak disimpan:

| File | Description |
|--------|------------|
| matchstep_ai_model.keras | Trained AI Model |
| scaler_hard.pkl | Hard Skill Scaler |
| scaler_soft.pkl | Soft Skill Scaler |
| label_encoder.pkl | Career Label Encoder |

---

# 🔍 Inference Workflow

## Step 1

User memasukkan skor kemampuan.

Contoh:

```python
Hard Skill:
[7,6,5,3,0,0,4,0,4,0,4,3,5,4]

Soft Skill:
[7,5,8,0,0]
```

---

## Step 2

Input dinormalisasi menggunakan scaler hasil training.

```python
scaler_hard.transform()
scaler_soft.transform()
```

---

## Step 3

Model melakukan prediksi probabilitas.

```python
loaded_model.predict()
```

---

## Step 4

Probabilitas diurutkan dari tertinggi ke terendah.

Contoh:

| Career Group | Score |
|-------------|--------|
| Software Development | 74.32% |
| Data & AI | 15.81% |
| Infrastructure & Security | 5.72% |
| Management & Analysis | 2.40% |
| Support & Design | 1.75% |

---

## Step 5

Sistem menampilkan:

- Rekomendasi karier utama
- Tingkat keyakinan
- Top Career Matches

---

# 📂 Project Structure

```text
AI/

├── notebook/
│   └── model_training.ipynb
│
├── dataset/
│   └── new_dataset_bersih.csv
│
├── model/
│   ├── matchstep_ai_model.keras
│   ├── scaler_hard.pkl
│   ├── scaler_soft.pkl
│   └── label_encoder.pkl
│
└── README.md
```

---

# 🚀 Future Improvements

Beberapa pengembangan yang direncanakan:

- Penambahan dataset nyata dari mahasiswa Indonesia.
- Explainable AI (XAI) untuk menjelaskan alasan rekomendasi.
- Career Gap Analysis.
- Skill Recommendation System.
- Personalized Learning Path Recommendation.
- Hybrid Deep Learning + Rule Based Recommendation.

---

# 👥 Team AI Responsibilities

Tim AI bertanggung jawab terhadap:

- Data preprocessing
- Feature engineering
- Model development
- Model training
- Hyperparameter tuning
- Model evaluation
- Model deployment preparation
- AI recommendation logic

---

# 📜 License

This project is developed as part of the MatchStep Capstone Project.

All rights reserved by the development team.