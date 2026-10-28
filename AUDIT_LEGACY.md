# Audit Awal Website Legacy — SMP Inshafuddin Banda Aceh

**Tanggal:** 28 Oktober 2026  
**Sumber utama:** https://www.smpinshafuddin.sch.id/  
**Status:** Audit awal berbasis halaman yang berhasil diindeks mesin pencari; **bukan** crawl HTML lengkap.

## 1. Metode dan batasan verifikasi

- Halaman web legacy tidak dapat dibuka langsung melalui alat audit (timeout), tetapi teks sejumlah halaman tersedia dari indeks pencarian, dengan crawl sekitar September–Oktober 2026.
- Akses ke `robots.txt` dan `sitemap_index.xml` tidak berhasil diverifikasi. **Jangan menyimpulkan bahwa file tersebut tidak ada.**
- Urutan dan label menu header yang benar, submenu, perilaku interaksi, desain visual asli, media asset, HTTP status, jumlah seluruh artikel, redirect, dan struktur sitemap **belum terverifikasi**.
- Halaman/URL di bawah adalah **URL yang terkonfirmasi melalui hasil indeks**, bukan inventaris seluruh website.
- Sebelum cutover, lakukan crawl resmi dari server lama atau ekspor URL dari CMS + Google Search Console (jika tersedia), kemudian validasi HTTP/SEO dan seluruh media.

## 2. Inventaris URL teramati

| Jenis | URL legacy terkonfirmasi | Konten utama | Tindakan frontend |
| --- | --- | --- | --- |
| Home | `/` | Hero/visi ringkas, sambutan kepala sekolah, profil tim, statistik, ekstrakurikuler | Desain ulang homepage; struktur tetap |
| Halaman | `/tentang-kami/` | Sejarah berdiri 1974, visi, misi, tujuan, statistik | Pertahankan URL; ringkas dan rapikan hierarki |
| Halaman | `/akademik/` | Kurikulum nasional dan dayah; kegiatan akademik | Pertahankan URL; layout kartu/section |
| Halaman | `/fasilitas/` | Ruang kelas, lab bahasa/IPA/komputer, perpustakaan, lapangan | Pertahankan URL; detail foto setelah aset disediakan |
| Halaman | `/ekstrakurikuler/` | Pramuka, sanggar seni tari, olahraga | Pertahankan URL; kartu yang bisa dipindai |
| Arsip | `/berita/` | Daftar berita terbaru, judul, tanggal, nama penulis, cuplikan | Pertahankan URL; pagination bila terbukti digunakan |
| Artikel | `/satuan-pendidikan-aman-bencana-langkah-nyata-smp-inshafuddin-banda-aceh-melindungi-siswa-baru/` | Artikel 18 Juli 2026 | Artikel ada di root, **bukan** `/berita/[slug]` |

**Catatan routing penting:** Struktur artikel yang terlihat memakai slug langsung di root. Jika frontend Next.js menyajikan artikel pada `/berita/[slug]` tanpa redirect yang benar, backlink dan hasil indeks dapat rusak. Rancang route `app/[slug]/page.tsx` hanya untuk slug yang tercantum dalam manifest artikel dan periksa konflik dengan route statis. Jangan menciptakan slug untuk artikel yang URL aslinya belum diperiksa.

### Contoh berita yang teramati pada indeks arsip

- Satuan Pendidikan Aman Bencana — 18 Juli 2026.
- MPLS siswa baru tahun ajaran 2026/2027 — 13 Juli 2026.
- “Inshafuddin Is Calling” — 6 Juli 2026.
- Sekolah Kinerja Terbaik Tahun 2026 — 26 Juni 2026.
- Pengajian rutin Dayah — 18 Juni 2026.
- Rapat kenaikan kelas — 17 Juni 2026.
- Pawai 1 Muharram — 15 Juni 2026.
- Rapat penyusunan rapor — 15 Juni 2026.
- Dua santriwati Dayah lulus ke Al Azhar — 11 Juni 2026.

**Review editorial:** Beberapa artikel arsip mencakup kegiatan Dayah atau lulusan SMA, tidak hanya SMP. Jangan mengubah fakta atau mengklaim semua pencapaian tersebut milik SMP. Labeli konteks asalnya setelah dikonfirmasi.

## 3. Inventaris konten per halaman

### Beranda

- Identitas: **SMP Inshafuddin Banda Aceh**.
- Pesan utama: insan berkarakter, unggul dalam prestasi, dan bertakwa kepada Allah SWT.
- Narasi: lingkungan belajar suportif, inspiratif, religius.
- Sambutan kepala sekolah: Warnidah, S.Pd.I. (harus diverifikasi masih menjabat sebelum tayang).
- Pengelola/tim yang disebut: Warnidah, S.Pd.I; Salsabila Dahniar, S.Pd; Nurul Sri Wahyuni, S.Pd (nama/jabatan/foto perlu konfirmasi).
- Ekstrakurikuler unggulan: Pramuka, Sanggar Seni Tari, Olahraga.
- Statistik terindeks tampil sebagai `0+` untuk siswa, guru/staf, lulusan, prestasi. **Ini belum tentu data sesungguhnya**; mungkin keadaan awal penghitung animasi. Jangan menampilkan `0+` atau mengarang angka saat prototipe.

### Tentang Kami

- Sejarah: disebut berdiri **1974**, naungan Yayasan Pembina Inshafuddin, lingkungan Dayah Terpadu Inshafuddin.
- Visi, delapan butir misi, beberapa butir tujuan operasional.
- Banyak kalimat dan ejaan memerlukan penyuntingan redaksional; revisi resmi harus disetujui sekolah.
- Beberapa target seperti rata-rata nilai/KKM perlu ditinjau apakah masih berlaku.

### Akademik

- Pendidikan sekolah berlandaskan kurikulum nasional.
- Pendidikan Dayah: pembelajaran kitab, ibadah, Al-Qur'an, bahasa Arab, dan pembentukan akhlak.
- Pertunjukan seni, olimpiade, teknologi informasi, bahasa asing (Arab/Inggris), hafalan Al-Qur'an.
- Kalimat tentang kebijakan kurikulum jangan dipublikasikan ulang tanpa pemeriksaan tahun ajaran aktif.

### Fasilitas

- Ruang kelas; laboratorium Bahasa; laboratorium IPA; laboratorium Komputer; perpustakaan; lapangan olahraga.
- Deskripsi pendahuluan juga menyebut ruang ibadah, UKS, dan ruang kesenian, namun tidak seluruhnya punya section tersendiri.
- Tambahan galeri/foto/alt text berdasarkan foto asli dan persetujuan sekolah, bukan stok yang salah representasi.

### Ekstrakurikuler

- Pramuka, Sanggar Seni Tari, Olahraga.
- Aktivitas yang disebut dalam narasi: tari, drama, kaligrafi, sepak bola.
- Tidak ada jadwal/pembina yang terverifikasi; jika didesain, statusnya hanya opsional hingga data diberikan.

### Berita

- Arsip berisi judul, penulis `smpinsha`, tanggal dan cuplikan.
- Halaman artikel contoh berisi narasi kegiatan, tanggal dan gambar. Struktur global harus mendukung judul panjang, deskripsi, gambar, caption, tanggal, kategori, isi berita, dan artikel terkait jika tersedia.
- Belum bisa menghitung jumlah total berita atau memastikan bentuk pagination, arsip kategori, dan pencarian.

## 4. Audit navigasi / header

**Yang dapat dibuktikan:** Terdapat enam URL utama pada tabel di atas dan sebuah tautan teks `Akademik` di konten beranda. **Yang tidak dapat dibuktikan:** label, urutan, jumlah, dropdown, dan CTA **menu header aktual** karena HTML/header belum dapat diakses langsung.

### Usulan struktur menu baru — belum dianggap struktur legacy

`Beranda | Profil | Akademik | Fasilitas | Ekstrakurikuler | Berita`

- `Beranda` → `/`
- `Profil` → `/tentang-kami/`
- `Akademik` → `/akademik/`
- `Fasilitas` → `/fasilitas/`
- `Ekstrakurikuler` → `/ekstrakurikuler/`
- `Berita` → `/berita/`

Usulan CTA **Pendaftaran** hanya setelah pihak sekolah menyediakan URL/prosedur resmi. Sebelum itu, jangan pasang tombol yang tidak berfungsi atau formulir pengumpulan data.

## 5. Audit footer

Teks footer yang berulang di halaman terindeks:

| Kelompok | Informasi teramati | Status |
| --- | --- | --- |
| Identitas | SMP Inshafuddin | Teramati |
| Alamat | Jl. Taman Sri Ratu Shafiatudin No. 3, Lambaro Skep, Kuta Alam, Banda Aceh | Teramati; ejaan resmi perlu validasi |
| Jam kerja | Senin–Sabtu, 07.30–15.00 | Teramati; jam terkini perlu validasi |
| Telepon | `(0651)` saja | **Tidak lengkap**, jangan dibuat `tel:` |
| Email | `smp.inshafuddinbna@gmail.com` | Teramati; validasi pengelola |
| Media sosial | Belum berhasil diverifikasi | Jangan mengarang URL atau ikon aktif |
| Peta | Belum berhasil diverifikasi pada footer | Tambahkan hanya alamat/tautan peta yang disetujui |
| Kebijakan privasi | Belum berhasil diverifikasi | Opsional, harus ada isi sah jika mengumpulkan data pengguna |

Usulan footer: logo + deskripsi singkat, tautan halaman utama, alamat/kontak tervalidasi, jam operasional, hak cipta dinamis, dan tautan sosial **hanya yang asli**. Pertahankan email sampai sekolah mengonfirmasi penggantian.

## 6. Temuan dan peluang UI/UX

1. **Hierarki konten:** Home mencampur narasi panjang dan sambutan panjang. Tampilkan ringkasan + tautan ke halaman detail.
2. **Statistik:** Hindari counter bernilai nol pada hasil render awal. Jika angka belum terverifikasi, hilangkan section statistik.
3. **Kekhasan sekolah:** Jadikan kombinasi kurikulum nasional, pendidikan dayah, karakter Islami, bahasa Arab/Inggris, dan kegiatan siswa sebagai identitas konten; jangan mengubah klaim menjadi janji tanpa persetujuan.
4. **Kejelasan artikel:** Buat tipografi baca nyaman, tanggal eksplisit, foto dengan rasio dan keterangan, breadcrumb dan kategori yang tepat.
5. **Fasilitas dan ekstrakurikuler:** Tingkatkan scanning dengan grid dan foto aktual berkualitas.
6. **Kualitas editorial:** Koreksi typo/kapitalisasi hanya dalam tahap review; jangan ubah isi visi, misi, kebijakan sekolah secara sepihak.
7. **Privasi siswa:** Dapatkan persetujuan penggunaan foto/video siswa dan hindari data pribadi atau rincian identitas tanpa dasar yang sah.
8. **Kontak:** Telepon terpotong di footer; perlu diverifikasi dengan pihak sekolah sebelum menjadi tautan.
9. **SEO migrasi:** Semua URL lama yang sudah terindeks harus dicatat, dirender atau diarahkan secara benar. Jangan menebak redirect.

## 7. Daftar verifikasi sebelum produksi

- [ ] Crawl lengkap WordPress/CMS (`sitemap`, seluruh post, halaman, taxonomy, media) dengan otorisasi.
- [ ] Inventaris URL legacy dan HTTP status, canonical, permalink, redirect, gambar.
- [ ] Cocokkan menu dan footer aktual dari screenshot/HTML lama.
- [ ] Konfirmasi nama dan jabatan kepala sekolah serta struktur tim.
- [ ] Validasi statistik, kurikulum terkini, fasilitas aktif, jam operasional, nomor telepon, email, sosial media.
- [ ] Minta aset logo SVG/PNG, foto gedung, fasilitas, ekstrakurikuler, dan izin penggunaan.
- [x] Keputusan: WordPress existing tetap menjadi CMS/headless sumber berita dan media; **tidak ada berita atau media mock**.
- [ ] Uji endpoint REST API asli (`/wp-json/`, `/wp-json/wp/v2/posts`, `/pages`, `/media`) dan cek skema/izin publik; percobaan audit eksternal 28 Oktober 2026 belum mengembalikan JSON.
- [ ] Validasi data yang benar-benar diekspos: menu, footer, foto hero, fasilitas, metadata SEO, custom fields.
- [ ] Tentukan routing saat cutover: host WordPress CMS dipindah ke subdomain atau tetap lewat reverse proxy untuk `/wp-json`, `/wp-content/uploads`, `wp-admin`.
- [ ] Audit metadata, sitemap, Search Console dan baseline trafik sebelum cutover.

## 8. Referensi halaman legacy

- https://www.smpinshafuddin.sch.id/
- https://www.smpinshafuddin.sch.id/tentang-kami/
- https://www.smpinshafuddin.sch.id/akademik/
- https://www.smpinshafuddin.sch.id/fasilitas/
- https://www.smpinshafuddin.sch.id/ekstrakurikuler/
- https://www.smpinshafuddin.sch.id/berita/
- https://www.smpinshafuddin.sch.id/satuan-pendidikan-aman-bencana-langkah-nyata-smp-inshafuddin-banda-aceh-melindungi-siswa-baru/


## 9. Addendum audit 28 Oktober 2026 — Identitas, kontak, dan sumber visual

**Sumber tambahan resmi:** https://referensi.data.kemendikdasmen.go.id/pendidikan/npsn/10105419 (halaman referensi Kemendikdasmen yang terindeks dan dapat dibaca saat audit).

| Atribut | Legacy website | Sumber Kemendikdasmen | Status tindakan |
| --- | --- | --- | --- |
| Email | `smp.inshafuddinbna@gmail.com` | `smp.inshafuddin@gmail.com` | **Berbeda; wajib konfirmasi** |
| Telepon | `(0651)` (terpotong) | `065132089` | Jangan memasang `tel:` sampai sekolah mengonfirmasi |
| Akreditasi | Tidak tervalidasi di legacy | **A** pada halaman terindeks | Halaman referensi Kemendikbud yang lebih lama juga menampilkan **B**; verifikasi sertifikat resmi aktif dan periode akreditasi |
| Alamat | `Jl. Taman Sri Ratu Shafiatudin no.3` | `Jln. Taman Ratu Safiatuddin No. 3 Lambaro Skep` | Perbedaan ejaan/format; verifikasi alamat resmi |
| NPSN | Belum dapat dikonfirmasi pada legacy | `10105419` | Kode terindeks dari portal pemerintah; cek bersama sekolah bila ditampilkan |

**Penting:** Hasil indeks mungkin tidak sama dengan kondisi web live. Fetch langsung ke situs masih timeout pada pemeriksaan 28 Oktober 2026, sehingga header/menu aktual, markup, responsivitas asli dan sitemap belum diaudit penuh.

**Referensi foto:** Beberapa publikasi eksternal memuat foto lingkungan *Dayah Terpadu Inshafuddin*; hubungan kelembagaan dengan SMP tidak otomatis membuktikan bahwa foto tertentu menggambarkan ruang SMP atau bebas hak cipta. Untuk rencana desain baru, gunakan sebagai referensi visual internal dan **mintakan media resmi berizin** kepada sekolah.

**Keputusan desain baru:** Modern Islamic Elegant dipilih pemilik proyek. Dokumen UI/UX detail: [`DESIGN_BLUEPRINT.md`](./DESIGN_BLUEPRINT.md).


## 10. Catatan audit tambahan untuk pilihan homepage seimbang (28 Oktober 2026)

- Halaman `/akademik/` menguraikan pendidikan sekolah/dayah, seni, kompetisi, teknologi, bahasa asing, dan hafalan Al-Qur'an. Untuk homepage **cukup** dua pilar pendidikan; detail lainnya berada di halaman Akademik dan perlu validasi kebijakan tahun berjalan.
- Halaman `/fasilitas/` menguraikan ruang kelas, laboratorium Bahasa/IPA/Komputer, perpustakaan dan lapangan olahraga. Tiga preview awal pada wireframe (kelas, lab komputer, perpustakaan) adalah pilihan desain, **bukan** inventaris final yang telah difoto.
- Indeks `/berita/` memuat artikel 2026 tentang MPLS SMP, keselamatan bencana, serta publikasi terkait Dayah yang lebih luas. Kartu homepage sebaiknya bertema **kegiatan SMP yang jelas** agar atribusi tidak keliru. Semua artikel lama tetap dicatat untuk preservasi URL saat migrasi.
- Situs langsung masih tidak selalu dapat diakses oleh crawler web; satu endpoint menampilkan verifikasi dan yang lain timeout. Tidak dapat mengklaim header/footer HTML, seluruh sitemap, atau urutan seluruh artikel benar-benar diaudit.
- Portal referensi Kemendikdasmen **saat pemeriksaan terbaru** menampilkan Akreditasi A, sedangkan halaman portal referensi Kemendikbud yang lebih lama menampilkan B untuk NPSN yang sama. Ini adalah **perbedaan antar rekaman pemerintah dengan kemungkinan masa pembaruan berbeda**; jangan pilih salah satu tanpa dokumen akreditasi dan konfirmasi sekolah.

**Spesifikasi layout berdasarkan audit ini:** [`WIREFRAME_SPEC.md`](./WIREFRAME_SPEC.md).


## Catatan audit REST API Headless (28 Oktober 2026)

- Wordpress REST endpoint yang layak diuji: `/wp-json/`, `/wp-json/wp/v2/posts`, `/wp-json/wp/v2/pages`, `/wp-json/wp/v2/media`, `?rest_route=/wp/v2/posts`.
- Pemeriksaan menggunakan browser web audit pada 28 Oktober 2026 **tidak berhasil memperoleh respons JSON** (akses langsung situs juga mengalami timeout), sehingga status endpoint **BELUM TERVERIFIKASI**, bukan dapat dinyatakan aktif/nonaktif.
- Search engine masih menampilkan halaman dan berita nyata, tetapi itu **tidak** membuktikan skema REST API/media custom fields tersedia.
- Wajib verifikasi API actual dari jaringan pemilik sebelum pengerjaan; audit potensi page builder, menu/footer, home hero/media file, SEO meta dan host WordPress setelah cutover.
- Ketentuan desain baru: **dilarang membuat gambar mockup, artikel mock, dan data profil fiktif** untuk implementasi. Wireframe diagram tidak menjadi sumber berita/gambar. Lihat `HEADLESS_WORDPRESS_PLAN.md`.
