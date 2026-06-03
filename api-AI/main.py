from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
import tensorflow as tf
import joblib
from tensorflow.keras.layers import Layer

# Library untuk API Generative AI
import google.generativeai as genai
import os
from dotenv import load_dotenv


# Deklarasi custom component
class FeatureEmphasisLayer(Layer):
    def __init__(self, **kwargs):
        super(FeatureEmphasisLayer, self).__init__(**kwargs)

    def build(self, input_shape):
        self.w = self.add_weight(
            shape=(input_shape[-1],), initializer="ones", trainable=True
        )
        super(FeatureEmphasisLayer, self).build(input_shape)

    def call(self, inputs):
        return inputs * self.w


class CategoricalFocalLoss(tf.keras.losses.Loss):
    def __init__(self, gamma=2.0, name="categorical_focal_loss", **kwargs):
        super(CategoricalFocalLoss, self).__init__(name=name, **kwargs)
        self.gamma = gamma

    def call(self, y_true, y_pred):
        y_pred = tf.clip_by_value(
            y_pred, tf.keras.backend.epsilon(), 1.0 - tf.keras.backend.epsilon()
        )
        cross_entropy = -y_true * tf.math.log(y_pred)
        weight = tf.math.pow(1.0 - y_pred, self.gamma)
        return tf.reduce_sum(weight * cross_entropy, axis=-1)


# Inisialisasi FastAPI dan load aset
app = FastAPI(title="MatchStep AI Backend API")

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="MatchStep AI Backend API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*"
    ],  # Mengizinkan semua domain (termasuk localhost frontend) mengakses API
    allow_credentials=True,
    allow_methods=["*"],  # Mengizinkan semua HTTP methods (GET, POST, dll)
    allow_headers=["*"],  # Mengizinkan semua HTTP headers
)


#  Konfigurasi API Key untuk Google Gemini (Generative AI)

load_dotenv() # Membaca file .env
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY tidak ditemukan! Pastikan file .env sudah dibuat.")


genai.configure(api_key=GEMINI_API_KEY)
# Menggunakan model gemini-2.5-flash untuk respon teks
llm_model = genai.GenerativeModel("gemini-2.5-flash")


print("Memanaskan mesin AI...")
# Load Model
model = tf.keras.models.load_model(
    "model-ai/best_model.keras",
    custom_objects={
        "FeatureEmphasisLayer": FeatureEmphasisLayer,
        "CategoricalFocalLoss": CategoricalFocalLoss,
    },
)
# Load Transformers
scaler_hard = joblib.load("model-ai/scaler_hard.pkl")
scaler_soft = joblib.load("model-ai/scaler_soft.pkl")
label_encoder = joblib.load("model-ai/label_encoder.pkl")
print("Semua aset berhasil dimuat! Server siap.")


# Aturan input
class MahasiswaInput(BaseModel):
    hard_skills: list[float]  # Akan menolak jika input bukan list angka
    soft_skills: list[float]


# Endpoint ini menerima data dari frontend, memprosesnya, dan mengembalikan rekomendasi karier
@app.post("/predict")
def prediksi_karier(data: MahasiswaInput):
    # Validasi: Harus 14 hard skill dan 5 soft skill
    if len(data.hard_skills) != 14 or len(data.soft_skills) != 5:
        raise HTTPException(
            status_code=400,
            detail="Jumlah nilai fitur tidak sesuai. Butuh 14 Hard Skill dan 5 Soft Skill.",
        )

    try:
        # Ubah ke format Numpy
        input_hard = np.array([data.hard_skills])
        input_soft = np.array([data.soft_skills])

        # Normalisasi
        hard_scaled = scaler_hard.transform(input_hard)
        soft_scaled = scaler_soft.transform(input_soft)

        # Inferensi Model
        prediksi_prob = model.predict([hard_scaled, soft_scaled], verbose=0)[0]

        # Susun matriks skor
        daftar_karier = label_encoder.classes_
        matriks_skor = list(zip(daftar_karier, prediksi_prob))
        matriks_skor_terurut = sorted(matriks_skor, key=lambda x: x[1], reverse=True)

        # Ambil Top 5 untuk dikirim ke website
        hasil_top5 = []
        for karier, prob in matriks_skor_terurut[:5]:
            hasil_top5.append(
                {
                    "karier": str(karier),
                    "probabilitas_persen": round(float(prob) * 100, 2),
                }
            )

        #  Prompt generatif untuk memberikan analisis singkat berdasarkan hasil prediksi
        rekomendasi_terbaik = hasil_top5[0]["karier"]
        probabilitas_terbaik = hasil_top5[0]["probabilitas_persen"]

        prompt_analisis = f"""
            Kamu adalah mentor karier virtual bernama MatchStep AI yang membantu pengguna memahami hasil rekomendasi karier berdasarkan analisis skill menggunakan Machine Learning.

            Data hasil prediksi:
            - Karier rekomendasi utama: {rekomendasi_terbaik}
            - Tingkat keyakinan model: {probabilitas_terbaik}%
            - Nilai hard skill tertinggi pengguna: {max(data.hard_skills)} dari skala 1 - 10
            - Nilai soft skill tertinggi pengguna: {max(data.soft_skills)} dari skala 1 - 10

            Tugasmu adalah memberikan analisis karier yang:
            - Natural, modern, profesional, suportif, dan mudah dipahami.
            - Tidak terdengar seperti robot atau template kaku.
            - Fokus pada potensi pengguna dan langkah pengembangan selanjutnya.

            Aturan penulisan:
            1. Selalu awali jawaban dengan kalimat:
            “Karier yang paling cocok untuk Anda adalah {rekomendasi_terbaik}.”

            2. Setelah itu, lanjutkan dengan penjelasan menggunakan pembuka natural seperti:
            “Berdasarkan hasil analisis MatchStep AI...”

            3. Jelaskan secara singkat mengapa skill pengguna cocok dengan bidang tersebut berdasarkan kombinasi hard skill dan soft skill mereka.

            4. Setelah penjelasan utama, tampilkan roadmap belajar sederhana dengan format berikut:

            Skill penting yang perlu dipelajari:
            1. ...
            2. ...
            3. ...

            Teknologi atau tools yang relevan:
            1. ...
            2. ...
            3. ...

            Project sederhana untuk portofolio:
            1. ...

            5. Roadmap harus relevan dengan karier {rekomendasi_terbaik} dan cocok untuk pemula.

            6. Gunakan bahasa Indonesia yang modern, memotivasi, tetapi tetap profesional.

            7. Jika menyebut skor atau nilai, selalu jelaskan bahwa nilainya menggunakan skala 1 - 10.

            8. Jangan menyebutkan probabilitas atau persentase keyakinan model di dalam analisis akhir.

            9. Hindari kalimat terlalu umum seperti:
            “tetap semangat”, “jangan menyerah”, atau “Anda pasti bisa”.
            Fokus pada insight yang konkret dan actionable.

            10. Variasikan gaya bahasa agar setiap hasil rekomendasi terasa lebih personal dan tidak repetitif.

            11. Pastikan output rapi, mudah dibaca, dan tidak terlalu panjang.
            """

        try:
            # Meminta Gemini merangkai kata
            respons_llm = llm_model.generate_content(prompt_analisis)
            teks_analisis = respons_llm.text.strip()
        except Exception as e:
            # Fallback (cadangan) jika API Gemini sedang gangguan agar server tidak error
            print(f"Peringatan Gemini API: {e}")
            teks_analisis = f"Profil kemampuanmu sangat sejalan dengan jalur {rekomendasi_terbaik}. Terus kembangkan potensimu untuk bersiap menghadapi industri!"

        # Format JSON akhir yang dikembalikan ke website
        # Format JSON akhir yang dikembalikan ke website
        return {
            "status": "sukses",
            "rekomendasi_utama": hasil_top5[0]["karier"],
            "tingkat_keyakinan": hasil_top5[0]["probabilitas_persen"],
            "detail_matriks": hasil_top5,
            "analisis_dinamis": teks_analisis, 
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error Internal Model: {str(e)}")


# Endpoint penanda server menyala
@app.get("/")
def cek_koneksi():
    return {"pesan": "Server MatchStep AI aktif."}
