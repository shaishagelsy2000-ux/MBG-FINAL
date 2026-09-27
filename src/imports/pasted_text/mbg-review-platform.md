buatlah kode untuk membuat web 
Judul Proyek Web: RateThePlate MBG (Makanan Bergizi Gratis)
Deskripsi / Tujuan Web: Platform digital transparan untuk akses review makanan, pemantauan food waste (limbah makanan), dan evaluasi program MBG (Makanan Bergizi Gratis) bagi guru, pelajar, serta ibu hamil dan menyusui.
1. ATURAN VISUAL, IKON, & INTERAKSI (GAYA INSTAGRAM)
Gaya Ikon Modern (Outline to Filled State):
Seluruh simbol navigasi menggunakan ikon vektor garis (outline/stroke icons) minimalis yang bersih dan modern, menggantikan emoji biasa.
Interaktif & Berubah Otomatis (Interactive State): Ketika sebuah menu, tombol navigasi, atau status aktif diklik/dipilih oleh pengguna, bentuk ikon harus berubah otomatis menjadi ikon padat (solid/filled icon) disertai aksen warna yang kontras (seperti kuning keemasan khas logo Badan Gizi Nasional atau putih terang), persis seperti perilaku navigasi di aplikasi Instagram.
Fitur Klik & Scrolling Otomatis (Smooth Scrolling): Setiap tombol navigasi di halaman utama (seperti Grafik Favorit, Ulasan Publik, Food Waste) bersifat interaktif dan langsung melakukan scroll otomatis ke bagian konten yang dituju saat diklik.
Akses Fitur Terbatas (Protected Routes): Kartu informasi spesifik (pemantauan gizi, grafik personal, food waste mandiri, review prioritas) serta menu Monitoring Guru wajib mengarahkan pengguna yang belum login ke halaman Login / Pendaftaran akun terlebih dahulu.
2. STRUKTUR & FITUR HALAMAN UTAMA (HOME PAGE)
Bagian Header & Navigasi Cepat:
Judul Utama: RateThePlate MBG (Makanan Bergizi Gratis) (Ukuran teks: 32px–40px, Bold).
Penjelasan Singkat: Teks pengantar tentang tujuan transparansi program MBG (Makanan Bergizi Gratis).
Tombol Menu Navigasi Atas (dilengkapi ikon garis modern):
Grafik Favorit (Ikon Bar Chart) $\rightarrow$ Scroll ke grafik makanan favorit.
Ulasan Publik (Ikon Chat Bubble) $\rightarrow$ Scroll ke daftar komentar & foto asli.
Food Waste (Ikon Statistik/Tempat Sampah) $\rightarrow$ Scroll ke grafik sisa makanan.
Ibu Hamil & Menyusui (Ikon Kesehatan Ibu & Anak) $\rightarrow$ Akses data khusus.
Info Guru (Ikon Pengajar/Atribut Sekolah) $\rightarrow$ Akses info pelaporan guru.
Tombol Navigasi Kanan Atas: Ikon titik tiga untuk menu Login, Daftar, serta Tombol Sakelar Tema (Mode Terang / Dark Mode).
Bagian Dashboard Publik:
Grafik makanan favorit menggunakan standar menu utama: Ayam, Telor, Ikan, Daging, Tahu, dan Tempe.
Ulasan/Komentar Publik: Menampilkan daftar review dari pengguna yang dilengkapi dengan foto makanan asli dari porsi yang diterima, serta keterangan nama sekolah, kota, dan kabupaten khusus pengulas dari kalangan pelajar.
Grafik food waste global.
3. SISTEM OTENTIKASI (LOGIN & DAFTAR)
Menu Login:
Input: Email (Gmail) dan Password (menggunakan Gmail agar tidak ada duplikasi akun yang sama).
Tautan di Bawah: Label teks "Belum punya akun?" yang mengarahkan ke menu pendaftaran.
Tombol Masuk / Login.
Menu Daftar (Registrasi Akun dengan Form Dinamis Berdasarkan Peran):
Input Umum: Email (Gmail), Username/Nama Lengkap (wajib nama sendiri), Password, dan pilihan Peran (Pelajar, Ibu Hamil, Ibu Menyusui, atau Guru).
Ketentuan Form Tambahan Berdasarkan Peran:
Jika memilih Pelajar: Wajib mengisi Asal Sekolah, Kota/Kabupaten, Alergi, dan Penyakit Bawaan.
Jika memilih Ibu Hamil / Ibu Menyusui: Wajib mengisi Alergi dan Penyakit Bawaan.
Jika memilih Guru: Tidak ada kolom alergi dan penyakit bawaan (formulir dibuat lebih bersih dan ringkas).
Pengguna wajib login ulang setelah proses daftar berhasil dengan sistem role-state yang akurat (memastikan akun guru masuk ke dasbor guru, bukan ke dasbor pelajar).
4. FITUR BERDASARKAN PERAN & PERSONALISASI (SETELAH LOGIN)
A. Khusus Pelajar, Ibu Hamil, dan Ibu Menyusui:
Informasi, data, dan grafik yang dipersonalisasi sesuai peran masing-masing.
Food Waste Mandiri: Khusus untuk ibu hamil dan ibu menyusui, pencatatan dan pemantauan food waste dilakukan secara mandiri melalui akun masing-masing.
Standar Pilihan Menu: Seluruh grafik dan polling favorit konsisten menggunakan variasi menu utama: Ayam, Telor, Ikan, Daging, Tahu, dan Tempe.
B. Khusus Peran Guru (Monitoring Laporan Institusi):
Hak akses khusus untuk monitoring porsi MBG di sekolah (fokus murni pada laporan):
Mengisi data jumlah porsi MBG yang datang ke sekolah wajib menyertakan foto tempat/wadah makan saat diberikan oleh mobil pengantar MBG.
Mengisi data porsi yang benar-benar dimakan/diambil siswa serta mencatat sisa porsi (food waste).
Wajib menyertakan foto kondisi wadah/tempat makan saat dikembalikan/dipulangkan kembali setelah selesai digunakan.
5. PANDUAN WARNA (MODE TERANG & GELAP) & TIPOGRAFI
Skema Warna (Berdasarkan Logo Badan Gizi Nasional / BGN):
Dark Mode: Latar belakang utama Biru Tua Malam (#0B1B3D), latar belakang kartu Biru Muda Keabuan (#1E3A6E), warna teks putih bersih (#FFFFFF).
Light Mode: Latar belakang utama Putih/Abu sangat muda (#F4F7FC), latar belakang kartu Biru Muda Pastel (#D6E4FC), warna teks Biru Tua Gelap (#0B1B3D).
Aturan Tipografi (Font Inter):
Judul Utama (H1): 32px – 40px, Bold (700).
Judul Bagian (H2): 24px – 28px, Semi Bold (600).
Sub-Bagian (H3): 18px – 20px, Medium (500).
Teks Isi / Paragraf (Body Text): Standar 16px, Regular (400), jarak baris (line-height) 1,5 – 1,6.
Teks Pendukung / Caption: 12px – 14px, Regular (400).