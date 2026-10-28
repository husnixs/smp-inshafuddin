# WIREFRAME_SPEC.md — Homepage Balanced Profile & School Information

**Proyek:** SMP Inshafuddin Banda Aceh — Redesain Frontend Publik  
**Versi:** 1.0 · 28 Oktober 2026  
**Status:** **UX PLANNING / LOW-FIDELITY WIREFRAME — BUKAN KODE**  
**Arah visual dipilih:** Modern Islamic Elegant  
**Fokus homepage dipilih:** **Profil & Informasi Sekolah yang seimbang**  
**Dibaca bersama:** `PRD.md`, `DESIGN_BLUEPRINT.md`, `HEADLESS_WORDPRESS_PLAN.md`, `AUDIT_LEGACY.md`, `AGENTS.md`.

> Keputusan *arah visual* dan *fokus homepage* telah disetujui pengguna. Bentuk visual final, redaksi, foto, dan menu aktual sekolah **belum disetujui**. Dokumen ini tidak mengizinkan coding atau perubahan situs produksi.

## A. Konteks dan keputusan desain

- Identitas utama: **SMP Inshafuddin Banda Aceh**, bukan seluruh satuan pendidikan di lingkungan Dayah Terpadu Inshafuddin.
- Pengunjung harus mengenali sekolah dan memahami gambaran pendidikan secara cepat, lalu menemukan profil, akademik, fasilitas, kegiatan, berita, dan kontak tanpa kebingungan.
- Homepage **bukan feed berita**, landing page promosi pendaftaran, atau dashboard statistik.
- Menonjolkan karakter Islami secara halus: warna emerald dan ivory, aksen emas terbatas, dekorasi geometri minimal, foto autentik berizin.
- Enam tautan navigasi adalah **rekomendasi informasi** sesuai URL yang teramati, bukan bukti urutan menu header lama.
- Kontak dan klaim akreditasi/statistik/staf tidak boleh digunakan tanpa verifikasi sekolah. CTA pendaftaran tidak ditampilkan kecuali ada jalur resmi.

### Keputusan terkunci

| ID | Keputusan | Status |
| --- | --- | --- |
| D-01 | Modern Islamic Elegant | Dipilih pengguna |
| D-02 | Homepage seimbang: profil, pendidikan, fasilitas, kegiatan, berita | Dipilih pengguna |
| D-03 | Frontend publik Next.js, TypeScript, Tailwind; tanpa backend/CMS baru | Scope disepakati |
| D-04 | **Tidak coding** sampai perintah baru yang eksplisit | Wajib |
| D-05 | Usulan menu 6 item, URL legacy tetap | Proposal dengan URL dasar teramati |
| D-06 | Homepage tanpa statistik angka tidak valid dan tanpa CTA pendaftaran palsu | Guardrail |

## B. Prioritas informasi

1. **P1 — Above the fold:** nama sekolah, identitas, konteks sekolah/dayah, foto autentik jika tersedia, CTA Profil dan Akademik; seluruhnya tetap terbaca di 320px.
2. **P1 — Sesudah hero:** ringkasan karakter pendidikan dan dua pendekatan pendidikan, dengan tautan ke `/akademik/`.
3. **P2 — Kredibilitas:** sambutan kepala sekolah (setelah validasi nama, jabatan, foto, ringkasan).
4. **P2 — Bukti pengalaman sekolah:** fasilitas dan kegiatan ekstrakurikuler dengan media asli, bukan angka palsu.
5. **P2 — Aktualisasi:** berita SMP yang relevan, tanggal jelas, maksimal tiga pada homepage.
6. **P1 — Penutup:** alamat, jam, kanal kontak terverifikasi, tautan ke menu inti.

**Fokus proposional:** Tidak ada satu blok yang mendominasi setelah hero. Berita dibatasi agar konten permanen tentang sekolah tetap menjadi inti. Keputusan ini bukan penilaian statistik trafik atau riset pengguna yang sudah selesai.

## C. Wireframe desktop — 1440px viewport, container maks. 1240px

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ [LOGO] SMP INSHAFUDDIN       Beranda Profil Akademik Fasilitas Ekstra Berita │
├──────────────────────────────────────────────────────────────────────────────┤
│ KICKER: SMP Inshafuddin Banda Aceh              ┌──────────────────────────┐│
│ H1: Sekolah yang membangun ilmu & akhlak*        │ FOTO SEKOLAH RESMI       ││
│ Ringkasan singkat sekolah (2–3 baris)            │ [slot layout; wajib terisi media WP asli saat implementasi atau disembunyikan]   ││
│ [Kenali Sekolah] [Program Akademik]              └──────────────────────────┘│
├──────────────────────────────────────────────────────────────────────────────┤
│  SEKILAS SEKOLAH                                                        ↘   │
│ [Karakter & Akhlak]       [Pendidikan Sekolah]      [Pendidikan Dayah]       │
├──────────────────────────────────────────────────────────────────────────────┤
│  PROGRAM PENDIDIKAN                                                        │
│ [Pendidikan Sekolah: ilustrasi/foto + 2-3 poin] [Pendidikan Dayah: ...]      │
│ [Jelajahi Akademik →]                                                       │
├──────────────────────────────────────────────────────────────────────────────┤
│ [Foto kepala sekolah terverifikasi] | SAMBUTAN KEPALA SEKOLAH               │
│                                    | Ringkasan 80–110 kata + [Profil →]     │
├──────────────────────────────────────────────────────────────────────────────┤
│  FASILITAS SEKOLAH                                         [Semua fasilitas]│
│ [Fasilitas 1: foto]        [Fasilitas 2: foto]      [Fasilitas 3: foto]       │
├──────────────────────────────────────────────────────────────────────────────┤
│  KEHIDUPAN DAN KEGIATAN SISWA                           [Ekstrakurikuler →] │
│ [Pramuka]                 [Sanggar Seni Tari]       [Olahraga]               │
├──────────────────────────────────────────────────────────────────────────────┤
│  BERITA & KEGIATAN SEKOLAH                                     [Arsip →]    │
│ [Artikel SMP 1]           [Artikel SMP 2]           [Artikel SMP 3]         │
├──────────────────────────────────────────────────────────────────────────────┤
│  KONTAK SINGKAT: alamat · jam resmi · email terverifikasi                    │
├──────────────────────────────────────────────────────────────────────────────┤
│  FOOTER: Identitas | Navigasi | Alamat/jam | Kontak/sosial resmi            │
└──────────────────────────────────────────────────────────────────────────────┘
*H1 adalah arah copy, bukan slogan resmi atau redaksi final.
```

**Layout desktop:** 12 kolom konseptual; max-width 1200–1240px; hero teks/foto 6:6 atau 5:7 menyesuaikan aset; item karakter tiga kolom; akademik dua panel; fasilitas, kegiatan dan berita tiga kartu per baris. Section spacing 80–96px. Header boleh sticky sederhana bila tidak mengurangi area viewport secara berlebihan.

## D. Wireframe mobile — 390px (harus juga berfungsi pada 320px)

```text
┌────────────────────────────┐
│ [LOGO] SMP INSHAFUDDIN [☰]│
├────────────────────────────┤
│ SMP INSHAFUDDIN · BANDA ACEH│
│ H1: Nama/identitas sekolah │
│ Deskripsi ringkas 2–3 baris│
│ [Kenali Sekolah          ] │
│ [Program Akademik        ] │
│ [ FOTO SEKOLAH 4:3       ] │
├────────────────────────────┤
│ SEKILAS SEKOLAH            │
│ [Karakter & Akhlak       ] │
│ [Pendidikan Sekolah      ] │
│ [Pendidikan Dayah        ] │
├────────────────────────────┤
│ PROGRAM PENDIDIKAN         │
│ [Pendidikan Sekolah      ] │
│ [Pendidikan Dayah        ] │
│ [Jelajahi Akademik →     ] │
├────────────────────────────┤
│ SAMBUTAN KEPALA SEKOLAH    │
│ [Foto kecil] Ringkasan     │
├────────────────────────────┤
│ FASILITAS SEKOLAH          │
│ [Foto + judul 1]           │
│ [Foto + judul 2]           │
│ [Foto + judul 3]           │
│ [Lihat Seluruh Fasilitas]  │
├────────────────────────────┤
│ KEGIATAN SISWA             │
│ [Pramuka]                  │
│ [Seni Tari]                │
│ [Olahraga]                 │
├────────────────────────────┤
│ BERITA & KEGIATAN          │
│ [Artikel + tanggal 1]      │
│ [Artikel + tanggal 2]      │
│ [Artikel + tanggal 3]      │
├────────────────────────────┤
│ ALAMAT, KONTAK, JAM        │
│ FOOTER / MENU             │
└────────────────────────────┘
```

**Perilaku mobile:** satu kolom; section padding vertikal sekitar 48–56px, side padding 16px (boleh naik 20–24px di perangkat lebih lebar). Jangan memotong headline dalam card menjadi informasi tak terbaca. Menu hamburger berupa panel dengan tombol tutup, status buka/tutup yang dapat dibaca screen reader, focus management, tombol Escape, dan scroll lock sesuai kebutuhan. Tombol dan kontrol interaktif area target minimal 44×44px.

## E. Kontrak konten homepage per section

| ID | Section dan tujuan | Batas konten | CTA (route) | Fallback bila aset/data tak tersedia |
| --- | --- | --- | --- | --- |
| H-01 | Header: navigasi yang ringkas | 6 menu rencana, tanpa dropdown fiktif | `/`, `/tentang-kami/`, `/akademik/`, `/fasilitas/`, `/ekstrakurikuler/`, `/berita/` | Tampilkan nama sekolah teks apabila logo belum diserahkan |
| H-02 | Hero: identitas & langkah lanjut | 1 H1; 1 paragraf ~35–55 kata; 1 foto | `Kenali Sekolah` → `/tentang-kami/`; `Program Akademik` → `/akademik/` | Frame placeholder diberi label pada dokumen/prototipe; **jangan** publish foto stok seolah foto sekolah |
| H-03 | Sekilas sekolah: 3 nilai | 3 kartu, masing-masing maksimal ~25–35 kata | Tautan kontekstual opsional ke Akademik/Profil | Text-only cards tetap utuh |
| H-04 | Program pendidikan: ciri khas | 2 panel sekolah/dayah; masing-masing 40–70 kata | `Jelajahi Akademik` → `/akademik/` | Ikon dekoratif saja bila foto belum tersedia |
| H-05 | Sambutan: kredibilitas | 1 ringkasan 80–110 kata, nama/jabatan tervalidasi | `Selengkapnya` → `/tentang-kami/` | Sembunyikan nama/foto bila belum dikonfirmasi; jika sambutan belum disetujui, tampilkan editorial intro tanpa atribusi |
| H-06 | Fasilitas: perkenalkan sarana | 3 fasilitas pilihan dari daftar legacy, judul + 1 kalimat | `/fasilitas/` | Kartu tanpa foto menggunakan bidang sederhana; jangan klaim fasilitas aktif/baru tanpa verifikasi |
| H-07 | Ekstrakurikuler: dinamika siswa | 3 kartu Pramuka, Seni Tari, Olahraga | `/ekstrakurikuler/` | Text-only jika izin foto belum tersedia |
| H-08 | Berita & kegiatan: aktualitas | 3 berita relevan SMP, tanggal jelas, ditentukan daftar URL valid | `/berita/`; artikel di `/{slug}/` yang terverifikasi | Jika data contoh saja, label 'Contoh tampilan berita' di prototipe; jangan klaim *terbaru* secara live |
| H-09 | Kontak/footer: arah tindakan akhir | Alamat/jam/kontak yang dikonfirmasi | Navigasi internal, email resmi bila disetujui | Jangan tampilkan `tel:` untuk `(0651)` atau sosial/Maps belum valid |

**Pilihan fasilitas untuk desain awal:** ruang kelas, laboratorium komputer, perpustakaan; pilihan ini adalah contoh komposisi dari konten legacy, bukan bukti tersedia foto terkini. **Berita terpilih:** lebih utamakan kegiatan SMP (MPLS 2026, Satuan Pendidikan Aman Bencana, prestasi yang relevansinya dikonfirmasi) daripada artikel prestasi SMA/Dayah yang dapat disalahatribusikan.

## F. Navigasi dan alur pengunjung

| Pengunjung | Alur penting | Yang harus terlihat |
| --- | --- | --- |
| Orang tua / calon siswa | Beranda → Profil → Akademik → Fasilitas → Kontak | Identitas sekolah, pendekatan belajar, pengalaman siswa, alamat |
| Siswa | Beranda → Ekstrakurikuler atau Berita → Detail | Daftar kegiatan dan judul berita mudah dipahami |
| Guru/staf/alumni | Beranda → Berita → Detail | Tanggal, penulis jika valid, konteks SMP/Dayah jelas |
| Pengunjung dari Google | Artikel root slug → Breadcrumb → Berita/Profil | Navigasi balik, tidak redirect ke homepage |

**Perilaku header:** logo ke `/`; item menu menandai halaman aktif; tidak membuat menu dropdown/penambahan route baru sampai diverifikasi. Footer mengulang tautan penting sebagai secondary navigation.

## G. Wireframe halaman pendukung — ringkas

```text
PROFIL /tentang-kami/      : Header → Hero pendek → Sejarah → Visi/Misi → Tujuan → Tim terverifikasi → Footer
AKADEMIK /akademik/       : Header → Intro → Pendidikan Sekolah/Dayah → Program pendukung → Footer
FASILITAS /fasilitas/     : Header → Intro → Grid fasilitas (foto asli opsional) → Footer
EKSTRA /ekstrakurikuler/ : Header → Intro → Pramuka/Seni/Olahraga → Footer
BERITA /berita/           : Header → Intro → Daftar/arsip artikel → Pagination hanya bila data ada → Footer
ARTIKEL /{slug}/         : Header → Breadcrumb → H1/tanggal/penulis → Hero gambar bila sah → Isi → Footer
```

Perlu inventaris URL/CMS lanjutan sebelum menentukan taksonomi, pagination, penulis, tag, atau menu tambahan. Halaman artikel lama tampak menggunakan slug langsung di root domain; **jangan** otomatis menggantinya ke `/berita/{slug}/`.

## H. Design system dan perilaku UI

| Elemen | Rencana visual/interaction |
| --- | --- |
| Warna | Emerald `#103F35` untuk brand/primary; ivory `#FAF9F6`; gold `#BC9954` sebagai aksen dekoratif saja |
| Typography | Plus Jakarta Sans; 16–18px body; H1 34–38px mobile / 52–60px desktop; line length artikel 65–75 karakter |
| Grid | Mobile 1 kolom (konseptual grid 4), tablet 2 kartu (grid 8), desktop 2–3 kartu (grid 12) |
| Card | Radius 16px; border lembut; gambar 3:2 atau 16:9; tidak wajib hover animation |
| Button | Primer solid emerald, sekunder outline; fokus terlihat; target sentuh min. 44×44px |
| Icon/ornamen | Ringan, minimal, non-esensial; hindari pola/geometri sebagai pengganti informasi |
| Foto | Hero 4:3 mobile; rasio bisa 5:4 atau 4:3 desktop sesuai crop; tidak perlu hero slider |
| Aksesibilitas | WCAG 2.2 AA target; heading semantik, skip link, keyboard dan 200% zoom, reduced motion |
| Responsivitas | Review 320, 375, 390, 768, 1024, 1440px, termasuk landscape dan font scaling |
| Performa | Prioritaskan konten statis, media teroptimasi, tanpa video autoplay atau UI berat |

**Status interaksi:** Wireframe hanya spesifikasi perilaku, bukan implementasi yang sudah berjalan.

## I. Copywriting proposal — untuk persetujuan editorial

| Lokasi | Teks rekomendasi | Status |
| --- | --- | --- |
| Eyebrow | `SMP Inshafuddin • Banda Aceh` | Nama/daerah teramati; tipografi usulan |
| H1 hero | `Belajar dengan Ilmu, Tumbuh dengan Akhlak` | **Copy baru, bukan slogan resmi** |
| Supporting | `Kenali SMP Inshafuddin Banda Aceh, lingkungan pendidikan yang memadukan pembelajaran sekolah dan pendidikan dayah dalam pengembangan karakter serta potensi peserta didik.` | Parafrase editorial untuk diperiksa sekolah |
| CTA primer | `Kenali Sekolah` | `/tentang-kami/` |
| CTA sekunder | `Program Akademik` | `/akademik/` |
| H2 | `Sekilas SMP Inshafuddin` | Proposal |
| H2 | `Pendidikan Sekolah dan Dayah` | Mengikuti dua kategori legacy |
| H2 | `Kegiatan dan Kehidupan Siswa` | Proposal |
| H2 | `Berita & Kegiatan Sekolah` | Jika dataset tidak aktual, label harus jujur |

**Alternatif H1 yang lebih institusional:** `SMP Inshafuddin Banda Aceh — Pendidikan, Karakter, dan Prestasi`. Jangan melabeli salah satu sebagai visi/tagline resmi tanpa persetujuan.

## J. Inventaris aset dan data untuk review

| Item | Penanggung jawab konfirmasi | Status | Dampak jika tidak ada |
| --- | --- | --- | --- |
| Logo resmi dan izin penggunaan | Pihak sekolah | Perlu diminta | Pakai wordmark teks pada wireframe |
| Foto hero (lingkungan SMP) | Pihak sekolah | Perlu diminta | Placeholder pada desain review; tidak tayang sebagai foto resmi |
| Foto kepala sekolah + nama/jabatan terkini | Pihak sekolah | Perlu dikonfirmasi | Tidak menampilkan klaim personel |
| Foto fasilitas dan kegiatan (izin publikasi anak) | Pihak sekolah | Perlu diminta | Kartu text-only yang masih informatif |
| Sambutan ringkas/izin penyuntingan | Pihak sekolah | Perlu disetujui | Gunakan deskripsi institusi generik yang disahkan |
| Alamat, jam operasional, email, telepon | Pihak sekolah | **Ada konflik data** | Kontak tidak boleh dipalsukan |
| Peta dan akun sosial | Pihak sekolah | Belum terverifikasi | Omit sampai tersedia |
| Daftar lengkap permalink artikel (CMS/GSC/sitemap) | Pengelola CMS | Belum ada | Prototype hanya subset berlabel; migrasi SEO tertahan |
| Tahun akreditasi, angka siswa/guru, klaim prestasi | Pihak sekolah | Belum dikonfirmasi | **Tidak menampilkan badges/counters** |

## K. Kriteria persetujuan desain (bukan test kode)

- [x] Tema **Modern Islamic Elegant** diterima pemilik.
- [x] Fokus **Profil & Informasi Sekolah yang seimbang** diterima pemilik.
- [x] Rencana homepage prioritas institusi/pendidikan dan berita tidak dominan.
- [ ] Susunan sembilan bagian dan enam menu proposal ditinjau/disetujui.
- [ ] Copy hero, nama sambutan, dan redaksi faktual disetujui.
- [ ] Logo dan minimal foto hero sekolah berizin tersedia atau fallback resmi disepakati.
- [ ] Kontak resmi, akreditasi dan informasi yang saling berbeda diverifikasi.
- [ ] Sitemap/URL dan artikel dibakukan dari ekspor resmi sebelum migrasi produksi.
- [ ] Visual high fidelity dan prototype klik (jika diminta) ditinjau.
- [ ] **Perintah eksplisit memulai coding diberikan; sampai itu terjadi dilarang implementasi.**

## L. Catatan sumber dan keterbatasan

- Website sekolah yang terindeks: `https://www.smpinshafuddin.sch.id/`, `/tentang-kami/`, `/akademik/`, `/fasilitas/`, `/berita/`.
- Direktori satuan pendidikan resmi: `https://referensi.data.kemendikdasmen.go.id/pendidikan/npsn/10105419`.
- Foto dari media pihak ketiga dan dari lingkungan **Dayah** tidak otomatis merupakan foto fasilitas SMP atau memiliki hak pakai bebas.
- Pada sesi audit, URL langsung beberapa kali timeout/menampilkan halaman verifikasi; **menu aktual, sitemap, jumlah URL, dan detail footer HTML belum berhasil diaudit menyeluruh**.

**Penutup:** Dokumen ini menyempurnakan arsitektur informasi, wireframe, microcopy, responsive behavior, dan data checklist. Tidak ada kode aplikasi yang dibuat.


## K. Keputusan konten H-01 — API WordPress asli, bukan mock (28 Oktober 2026)

Perubahan requirement: setiap area yang di wireframe memakai istilah *placeholder/foto resmi jika tersedia* hanyalah **slot komposisi pada dokumen wireframe**, bukan izin untuk menyisipkan gambar fiktif. Semua isi yang tampil pada frontend produksi harus bersumber dari WordPress asli melalui API (atau sumber resmi sekolah yang disetujui dan dipetakan jelas), terutama hero, berita/artikel, media/fasilitas, sambutan, program dan kontak.

- Hero → halaman/field WordPress dan media ID asli; jika gambar belum ada, layout **text-only**.
- Tiga nilai sekolah dan dua kartu program → konten halaman profil/akademik WP; jika tidak ada field terstruktur, lakukan audit HTML `content.rendered` dan proposal mapping/REST field; jangan tulis ringkasan buatan sebagai fakta.
- Sambutan → WordPress content + foto media resmi; jika nama/foto tidak valid, tunda.
- Fasilitas/ekstrakurikuler → halaman WordPress dan media yang dapat dilacak; jika tak ada media, kartu teks tanpa gambar.
- Berita → 3 artikel **published** dari REST posts (berlatar konteks SMP jika taxonomy/kurasi terverifikasi); tak ada fixture atau judul mock.
- Footer → kontak dan navigasi dari WordPress jika endpoint menyediakan; belum tersedia berarti *TBD*, bukan menebak.

**Gate wireframe → implementasi:** dokumentasikan payload JSON dan media actual dari WordPress, tangani gambar kosong, loading/error API, mobile content overflow, caching, dan canonical. Lihat `HEADLESS_WORDPRESS_PLAN.md`.
