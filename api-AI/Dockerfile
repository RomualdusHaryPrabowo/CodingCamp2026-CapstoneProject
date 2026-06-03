# Menggunakan OS Linux dengan Python 3.11
FROM python:3.11-slim

# Menentukan folder kerja di dalam server cloud
WORKDIR /code

# Menyalin daftar library dan menginstalnya
COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Menyalin seluruh file kodingan Anda ke server
COPY . /code

# Menggunakan port 7860 -> Perintah menyalakan server API Anda.
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]