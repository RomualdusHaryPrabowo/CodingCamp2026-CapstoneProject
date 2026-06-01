import os
import gdown

def unduh_model():
    # Membuat folder
    os.makedirs("model-ai", exist_ok=True)
    
    # Daftar aset model AI beserta ID file Google Drive-nya
    aset_ai = {
        "best_model.keras": "1JnZVXsebDHzBH3jrM_XYM67_x7Mf0xpv",
        "scaler_hard.pkl": "1PpGOWdpKFnkuCVt3KClD2zz9sRqutedZ",
        "scaler_soft.pkl": "1YhzgHnREgBErN0JEUEn1m1u93_ZB0hp6",
        "label_encoder.pkl": "1y3swVR54SCMaZgHAov_8ktFqwRrmyTT-"
    }

    for nama_file, file_id in aset_ai.items():
        path_simpan = f"model-ai/{nama_file}"
        # Hanya unduh jika file belum ada
        if not os.path.exists(path_simpan):
            print(f"Sedang mengunduh {nama_file}...")
            # Menghasilkan direct link download
            url = f'https://drive.google.com/uc?id={file_id}'
            gdown.download(url, path_simpan, quiet=False)
            print(f"{nama_file} berhasil didownload")

if __name__ == "__main__":
    print("Setup model AI sedang berjalan. Harap tunggu...")
    unduh_model()