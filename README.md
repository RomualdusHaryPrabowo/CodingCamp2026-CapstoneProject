# 🎓 MatchStep AI: Capstone Project Coding Camp 2026

**[Data Science]**

## Deskripsi Proyek: Permasalahan & Solusi

**Permasalahan:**  
Mahasiswa Program Studi Teknik Informatika di Institut Teknologi Sumatera (ITERA) kerap menghadapi tantangan dalam memetakan potensi diri mereka ke spesialisasi karier yang tepat di industri teknologi. Selama ini, pendekatan evaluasi karier yang terlalu bergantung pada riwayat akademik atau metrik teoretis (seperti transkrip nilai dan IPK) sering kali tidak relevan dalam mencerminkan kompetensi praktis serta kesiapan kerja yang sebenarnya.

**Solusi:**  
Proyek Data Science ini menghadirkan **MatchStep AI**, sebuah sistem rekomendasi karier cerdas berbasis *machine learning*. Sistem ini mengubah pendekatan konvensional dengan beralih memanfaatkan data penilaian mandiri (*self-assessment*) dari indikator *hard skill* dan *soft skill*. Hasilnya, sistem mampu mengevaluasi profil mahasiswa secara lebih objektif dan holistik untuk memberikan rekomendasi spesialisasi karier yang terpersonalisasi.

---

## Pertanyaan Bisnis
Analisis dan visualisasi data dalam proyek ini dibangun untuk menjawab beberapa pertanyaan bisnis utama:
1. Bagaimana korelasi antara kombinasi penguasaan spesifik bahasa pemrograman terhadap pemetaan target karier mahasiswa?
2. Sejauh mana tingkat penguasaan *hard skill* (seperti pengalaman *software development* dan *database management*) memengaruhi probabilitas klasifikasi profesi?
3. Apakah terdapat perbedaan yang signifikan dalam distribusi *soft skill* antara mahasiswa yang cocok untuk peran manajerial/analis dibandingkan dengan mereka yang cocok di peran teknis murni?

---

## Detail Dataset
Dataset mentah awal terdiri dari **8.000 observasi dan 28 atribut**. Dataset ini telah melalui tahap standardisasi dengan karakteristik berikut:
* Data berfokus pada metrik *self-assessment* yang diukur pada rentang skala **0 hingga 9**.
* Atribut berbasis akademik (seperti IPK dan penyelesaian tugas) dieliminasi pada fase pembersihan data, memvalidasi pergeseran fokus murni pada evaluasi mandiri sehingga menyisakan **22 fitur utama**.
* **Indikator Keterampilan**: Mencakup bahasa pemrograman (seperti Python, Java, C++, dll), keahlian infrastruktur/jaringan, serta keterampilan interpersonal (komunikasi, kerja sama, dan pemecahan masalah).

---

## Alur Kerja (Workflow)

1. **Pengumpulan Data (Data Gathering):** Memuat dan memeriksa dimensi awal dataset `dataset.csv` untuk memastikan tidak adanya duplikasi atau nilai kosong (*missing values*).
2. **Pembersihan Data (Data Cleaning):** Standarisasi rentang nilai pada skala rasional dan seleksi fitur yang relevan dengan metode *self-assessment*.
3. **Feature Engineering:** Ekstraksi fitur sintetik tambahan untuk mengukur tingkat kepakaran teknis dan interaksi kompetensi secara holistik sebelum data dilatih.
4. **Exploratory Data Analysis (EDA):** Menggunakan *Barplot* dan *Heatmap* untuk memvisualisasikan keseimbangan distribusi target (*well-balanced*) dan mendeteksi korelasi multikolinearitas antar variabel keahlian.
5. **A/B Testing:** Mengeksekusi pengujian statistik menggunakan *Two-Proportion Z-Test* (`proportions_ztest`) untuk melakukan perbandingan metrik dari pendekatan algoritma baru.
6. **Report Generation:** Mengotomatiskan pelaporan (*export*) dari *environment* menggunakan modul `fpdf` ke format PDF sebagai dokumentasi teknis.

---

# Dashboard Analitik MatchStep AI

Sebuah *dashboard* interaktif yang dibangun menggunakan **Streamlit** untuk mengeksplorasi dan menganalisis korelasi antara pola keterampilan mahasiswa (berdasarkan *self-assessment*) dengan target spesialisasi karier mereka di bidang Teknologi Informasi (TI).

Dashboard ini merupakan bagian dari proyek **MatchStep AI**, sebuah sistem rekomendasi karier berbasis *Deep Learning* yang dirancang untuk membantu mahasiswa memetakan potensi diri mereka secara presisi.

---

## Fitur Utama

Dashboard ini memvisualisasikan data ke dalam 4 bagian analitik utama:
* **Indikator Metrik Utama (KPI) & Filter Demografi:** Menampilkan panel parameter dinamis berdasarkan target karier yang dipilih, dilengkapi ringkasan rata-rata skor kompetensi teknis (*coding*) maupun *soft skill*, serta porsi demografi status mahasiswa.
* **Overview Distribusi Karier:** Memuat metrik proporsional serta *Bar Chart* yang memvisualisasikan sebaran volume mahasiswa pada masing-masing klaster spesialisasi karier di industri teknologi.
* **Profil Bahasa Pemrograman per Karier:** Menampilkan visualisasi *Heatmap* untuk menyoroti intensitas dan rata-rata penguasaan berbagai bahasa pemrograman yang dipetakan secara matriks terhadap masing-masing peran profesi.
* **Pemetaan Hard Skill Utama:** Membedah spesifikasi keahlian teknis (seperti pengalaman pengembangan *web*, *software*, dan jaringan) menggunakan *Heatmap* untuk melihat korelasi *skill* dominan pada setiap target karier.
* **Distribusi Soft Skill Utama:** Menggunakan grafik *Boxplot* untuk membandingkan sebaran skor keterampilan interpersonal (pemecahan masalah, komunikasi, kerja sama). Grafik ini menyoroti perbedaan krusial antara kebutuhan *soft skill* pada kategori peran manajerial/analis berbanding terbalik dengan posisi teknis murni.


**Fitur Interaktif:**
- **Filter Dinamis:** Pengguna dapat memfilter data berdasarkan "Pengalaman Kepemimpinan" dan memilih kombinasi "Target Karier" secara bebas melalui panel *sidebar*.
- **Grafik Responsif:** Tinggi grafik akan menyesuaikan secara otomatis (*auto-scaling*) berdasarkan jumlah data yang difilter agar teks tetap terbaca dengan jelas.

---

## Teknologi yang Digunakan

- **Python 3.x**
- **[Streamlit](https://streamlit.io/):** Framework untuk membangun antarmuka *dashboard* web.
- **[Pandas](https://pandas.pydata.org/):** Manipulasi, prapemrosesan, dan agregasi data (*Data Wrangling*).
- **[Plotly Express](https://plotly.com/python/):** Pembuatan visualisasi grafik interaktif yang modern.

---
