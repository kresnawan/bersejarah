# Bersejarah
Aplikasi berbasis web yang berfungsi untuk menampilkan titik peta tempat bersejarah. Dibuat untuk memenuhi Tugas Proyek Akhir mata kuliah Pengantar Sistem Informasi yang diampu oleh bapak Suprapto

# Tech-stack
- React + Vite
- Go
- MySQL

# Cara menjalankan (debugging)
Yang dibutuhkan:
- MySQL Server
- Go v1.25.3
- npm v10.9.3
- Node.js v22.19.0

Sebelum menjalankan back-end, pastikan server MySQL telah dijalankan dan dibuat schema dengan DDL dan DML
yang terdapat pada `db/dump.sql`, lalu pada `internal/env/init.go` ubah nama database, username, 
berserta password sesuai dengan server MySQL yang telah dijalankan<br><br>
1. Jalankan back-end dengan perintah `go run ./cmd/api` pada root folder<br>
2. Jalankan laman admin dengan perintah `cd admin`, lalu `npm install` untuk mengunduh dependensi, lalu `npm run dev` untuk memulai aplikasi<br>
3. Jalankan aplikasi dengan perintah `cd website`, lalu `npm install` untuk mengunduh dependensi, lalu `npm run dev` untuk memulai aplikasi<br>

# AI
