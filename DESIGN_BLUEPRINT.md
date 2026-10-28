# DESIGN_BLUEPRINT.md — Modern Islamic Elegant
## SMP Inshafuddin Banda Aceh | Frontend Website

**Versi:** 1.1 — Konsep visual dan fokus homepage disetujui; detail wireframe untuk review  
**Tanggal:** 28 Oktober 2026  
**Status:** DESIGN PLANNING ONLY — **belum boleh coding atau scaffold**  
**Acuan:** [PRD.md](./PRD.md) · [WIREFRAME_SPEC.md](./WIREFRAME_SPEC.md) · [AUDIT_LEGACY.md](./AUDIT_LEGACY.md) · [AGENTS.md](./AGENTS.md)

> **Keputusan:** Pemilik proyek memilih arah visual **Modern Islamic Elegant** serta fokus **Profil & Informasi Sekolah yang seimbang**. Warna/tipografi/detail di bawah adalah *proposal terukur*, bukan klaim warna identitas resmi sekolah. Detail urutan section, CTA, konten, dan wireframe responsif dicatat pada `WIREFRAME_SPEC.md`. Memerlukan konfirmasi aset brand dan tanda setuju sebelum implementasi.

---

## 1. Inti konsep

Tiga pilar visual:

1. **Islamic, subtle:** Kesantunan visual; sedikit motif geometri Islam, bidang lengkung yang sederhana, tanpa ornamen berlebihan atau ayat/hadis untuk penghias yang belum disetujui.
2. **Elegant, credible:** Tipografi formal tetapi ramah, banyak ruang negatif, elevasi minimal, garis pemisah halus, komposisi tertib.
3. **Modern, approachable:** Responsive/mobile-first, cepat, kontras baik, CTA jelas, foto sekolah nyata dan autentik.

**Tone:** tenang, hangat, informatif, inklusif, berorientasi pada orang tua dan calon siswa.  
**Anti-pattern:** gradient emas berlebihan, efek glassmorphism dominan, foto stok yang berpura-pura sebagai sekolah, animasi carousel otomatis, ornamen masjid pada setiap kartu, ikon sosial palsu.

## 2. Design tokens (proposal)

| Token | Nilai | Peruntukan |
| --- | --- | --- |
| `brand-emerald` | `#103F35` | Warna utama, CTA, header tertentu |
| `brand-emerald-hover` | `#0A312A` | Hover/pressed tombol utama |
| `brand-gold` | `#BC9954` | Accent line, simbol dekoratif, border detail (bukan teks kecil pada putih) |
| `surface-ivory` | `#FAF9F6` | Permukaan hangat / section lembut |
| `surface-sage` | `#E9F2EE` | Permukaan hijau muda |
| `surface-white` | `#FFFFFF` | Kartu dan halaman |
| `text-ink` | `#192B27` | Teks utama |
| `text-muted` | `#52615A` | Teks sekunder |
| `border` | `#DCE6E0` | Pemisah halus |

### Rasio kontras terhitung (WCAG)

- Putih `#FFFFFF` di atas Emerald `#103F35`: **11,77:1**, lolos AA/AAA teks normal.
- Ink `#192B27` di atas Ivory `#FAF9F6`: **14,08:1**, lolos AA/AAA.
- Muted `#52615A` di atas Ivory: **6,20:1**, lolos AA.
- Gold `#BC9954` di atas putih: **2,68:1**, **tidak boleh** untuk teks normal ukuran kecil.

Kontras akhir diperiksa lagi jika warna logo/resmi memaksa perubahan; jangan menganggap warna dekorasi sudah cocok untuk semua fungsi aksesibilitas.

## 3. Tipografi

**Pilihan utama:** Plus Jakarta Sans untuk seluruh UI dan teks artikel, sehingga konsisten, mudah dipindai, dan meminimalkan banyak font download. Pakai fallback `system-ui, sans-serif` saat belum ada aset font. Jika nantinya memakai naskah Arab asli, gunakan font Arab yang sesuai dan lisensinya jelas; jangan mengarang kaligrafi atau kutipan suci.

| Elemen | Mobile | Desktop | Catatan |
| --- | --- | --- | --- |
| H1 hero | 34–38px / 1,15 | 52–60px / 1,1 | maksimum 2–4 baris tergantung viewport |
| H2 section | 26–30px / 1,2 | 34–40px / 1,15 | konsisten antarsection |
| H3/card | 19–21px / 1,3 | 22–24px / 1,3 | ringan, tidak all-caps |
| Body | 16px / 1,65 | 16–18px / 1,65 | teks tidak diperkecil pada mobile |
| Nav | 14–15px / 1,5 | 14–15px / 1,5 | label jelas |
| Caption | 13–14px / 1,5 | 13–14px / 1,5 | tidak kurang dari AA secara visual |

Konten long-form artikel: lebar teks target 65–75 karakter; heading H1 hanya satu per halaman.

## 4. Grid, ukuran, dan rhythm

- **Mobile:** 320–767px, 4-column conceptual grid, gutter 16px; tombol/elemen sentuh tinggi minimal 44px; satu kolom konten.
- **Tablet:** 768–1023px, grid 8 kolom; kartu bisa 2 kolom; navigasi mobile sampai lebar cukup.
- **Desktop:** >=1024px, grid 12 kolom, max-width konten 1200–1240px, gutter 24–32px.
- Section vertical padding: mobile 48–56px; tablet 64px; desktop 80–96px.
- Radius: kontrol 10–12px, kartu 16px, hero image 20–24px.
- Shadow: hanya komponen yang memerlukan pemisahan visual; lebih sering gunakan border.
- Motion 150–250ms, dengan `prefers-reduced-motion` dan tanpa dekorasi yang menghambat konten.

## 5. UI homepage (wireframe low fidelity)

**Keputusan fokus yang baru:** Profil & Informasi Sekolah seimbang, bukan dominasi berita atau PPDB. `WIREFRAME_SPEC.md` menjadi sumber utama untuk urutan dan kontrak konten. Urutan yang konsisten: **Hero → Sekilas Sekolah → Program Pendidikan → Sambutan Kepala Sekolah → Fasilitas → Ekstrakurikuler → Berita → Kontak/Footer**.

### Desktop >=1024px

```text
┌──────────────────────────────────────────────────────────────────┐
│ LOGO SMP INSHAFUDDIN      Beranda Profil Akademik Fasilitas      │
│                           Ekstrakurikuler Berita                 │
├──────────────────────────────────────────────────────────────────┤
│ [eyebrow: Pendidikan Sekolah & Dayah]  │ [FOTO ASLI KEGIATAN / ] │
│ Judul identitas sekolah                  │ [LINGKUNGAN SEKOLAH  ] │
│ Subtitle 2–3 baris                        │ [                    ] │
│ [Kenali Sekolah] [Program Akademik]       │ [                    ] │
├──────────────────────────────────────────────────────────────────┤
│ 3 NILAI UTAMA       Karakter | Akademik | Pendidikan Dayah        │
├──────────────────────────────────────────────────────────────────┤
│ 2 JALUR PEMBELAJARAN    Pendidikan Sekolah | Pendidikan Dayah    │
├──────────────────────────────────────────────────────────────────┤
│ Sambutan Kepala Sekolah (singkat)  | Foto kepala sekolah (resmi) │
├──────────────────────────────────────────────────────────────────┤
│ FASILITAS      [Kartu 1] [Kartu 2] [Kartu 3]                     │
├──────────────────────────────────────────────────────────────────┤
│ KEGIATAN SISWA [Pramuka] [Seni Tari] [Olahraga]                  │
├──────────────────────────────────────────────────────────────────┤
│ BERITA TERBARU [Berita 1] [Berita 2] [Berita 3]                  │
├──────────────────────────────────────────────────────────────────┤
│ KONTAK & LOKASI        CTA email / alamat / jam (terverifikasi) │
├──────────────────────────────────────────────────────────────────┤
│ FOOTER: identitas | menu | kontak | legal                        │
└──────────────────────────────────────────────────────────────────┘
```

### Mobile 320–767px

```text
┌─────────────────────────┐
│ LOGO  NAMA SEKOLAH   ☰  │
├─────────────────────────┤
│ Eyebrow                  │
│ HEADLINE 3–4 baris       │
│ Subtitle                 │
│ [Kenali Sekolah      ]   │
│ [Program Akademik    ]   │
│ [Foto sekolah 4:3    ]   │
├─────────────────────────┤
│ TIGA NILAI UTAMA         │
│ [Karakter]               │
│ [Akademik]               │
│ [Pendidikan Dayah]       │
├─────────────────────────┤
│ PROGRAM PEMBELAJARAN     │
│ [Sekolah] [Dayah] stacked│
├─────────────────────────┤
│ SAMBUTAN KEPALA SEKOLAH  │
├─────────────────────────┤
│ FASILITAS (1 card/row)   │
├─────────────────────────┤
│ EKSTRAKURIKULER          │
├─────────────────────────┤
│ BERITA TERBARU           │
├─────────────────────────┤
│ KONTAK + FOOTER          │
└─────────────────────────┘
```

Wireframe merepresentasikan **arah komposisi**, bukan screenshot/hasil kode, dan tidak menjanjikan konten/gambar yang belum terverifikasi.

### Section rules dan CTA

| Section | Peran | Pola desain | Konten/aksi |
| --- | --- | --- | --- |
| Header | Orientasi | satu baris, sticky subtle setelah scroll bila tidak menutupi konten | Enam menu P0, tanpa dropdown sebelum dibutuhkan |
| Hero | Identitas | dua kolom desktop, satu kolom mobile; 1 foto berkualitas | `Kenali Sekolah` → `/tentang-kami/`; `Program Akademik` → `/akademik/` |
| Nilai utama | Membedakan sekolah | tiga item berbasis konten, bukan angka statistik | Karakter/akhlak, pendidikan nasional, pendidikan dayah |
| Akademik | Menjelaskan model belajar | dua panel editorial | Tautan `/akademik/` |
| Sambutan | Kepercayaan | potongan 100–150 kata dari teks yang sudah disetujui | Nama/foto jabatan dicek ulang; tautan profil |
| Fasilitas | Bukti visual | max 3–4 kartu homepage, detail di halaman | `/fasilitas/` |
| Ekstrakurikuler | Aktivitas siswa | tiga kartu: Pramuka, Seni Tari, Olahraga | `/ekstrakurikuler/` |
| Berita | Kebaruan | tiga berita valid; tanggal eksplisit | `/berita/` dan detail permalink asli |
| Kontak | Konversi yang aman | alamat dan jam, email apabila dikonfirmasi | Hanya link yang aktif dan terverifikasi |
| Footer | Navigasi final | 3–4 kolom desktop, accordion bukan keharusan mobile | Kontak, menu, copyright, tautan sosial resmi |

**Keputusan konten:** jangan memasang counter statistik sampai datanya valid. Galeri "School Life" hanya boleh ditambahkan setelah foto asli berizin tersedia. CTA PPDB/SPMB tidak tampil tanpa prosedur/URL pendaftaran resmi.

## 6. Desain per halaman

### `/tentang-kami/` — Profil

Hero pendek → Sejarah → Visi & misi → Tujuan pendidikan → Tim sekolah (hanya anggota yang masih menjabat & foto berizin). Teks panjang dibagi dengan subheading dan whitespace. Jika foto staf belum tersedia, gunakan text-only block, bukan avatar AI.

### `/akademik/` — Akademik

Hero ringkas → Perbandingan dua jalur `Pendidikan Sekolah` dan `Pendidikan Dayah` → rincian program (bahasa, teknologi, tahfiz, seni/olimpiade bila benar) → CTA kontak. Desain bukan tab tersembunyi agar isi mudah diindeks dan dipindai.

### `/fasilitas/` — Fasilitas

Hero + pengantar → kumpulan fasilitas (ruang kelas, lab bahasa/IPA/komputer, perpustakaan, olahraga) → foto per item bila tersedia. Hindari menyebut kapasitas/peralatan spesifik tanpa bukti.

### `/ekstrakurikuler/` — Ekstrakurikuler

Hero → tiga aktivitas (Pramuka, Sanggar Seni Tari, Olahraga) dengan foto, deskripsi dan tujuan → info kontak yang valid; jangan membuat jadwal/pembina fiktif.

### `/berita/` — Arsip

Header ringkas → list/grid berita berisi gambar, judul, tanggal, ringkasan, URL legacy; batasi panjang judul visual tanpa mengubah konten SEO. Pagination/search hanya jika data lengkap dan interaksi benar-benar berfungsi. Jangan mengklaim "terbaru" bila dataset mock berlabel.

### `/{slug}/` — Detail artikel lama

Breadcrumb → kategori (bila terverifikasi) → H1 artikel → tanggal, penulis → cover media + caption → isi long-form → berita relevan (opsional) → breadcrumb/navigation. Pertahankan slug root, jangan otomatis pindah ke `/berita/{slug}/`.

## 7. Header, mobile navigation, footer

### Desktop header

- Logo dan nama lengkap di kiri, enam tautan P0 di kanan.
- Jika menambah CTA utama, pastikan tidak memaksa overflow dan action resmi tersedia.
- Sticky header maksimal ~72–80px dan latar solid agar kontras terbaca.

### Mobile header

- Logo/nama (nama bisa dua baris) + tombol menu dengan label aksesibel.
- Menu sebagai panel/drawer dengan overlay dan judul navigasi; close button, Escape, focus management, body scroll lock, `aria-expanded` dan `aria-controls`.
- Menu satu tingkat dahulu; jangan membuat submenu fiktif.
- Semua tautan nyata dan tinggi target minimal 44px.

### Footer

- Blok 1: nama sekolah, identitas singkat, logo resmi setelah diverifikasi.
- Blok 2: tautan navigasi inti yang sesuai route lama.
- Blok 3: alamat, jam, email dan telepon **yang sudah dikonfirmasi**.
- Blok 4 opsional: sosial resmi dan tautan pendaftaran resmi jika benar-benar tersedia.
- Peta lebih aman sebagai link eksplisit "Lihat Lokasi" dibanding embed berat, setelah lokasi dipastikan.

## 8. Interaksi dan state

- Button: primary emerald, secondary outlined emerald; focus ring 2–3px, hover halus dan tidak bergantung warna saja.
- Card: seluruh kartu boleh clickable bila tujuan tunggal; jangan membuat komponen click di dalam card click yang ambigu.
- Gambar: rasio baku (hero 4:3, kartu 16:9 atau 3:2, portrait staf 4:5), dengan alt/caption informatif.
- Empty data: gunakan keterangan jujur, tidak ada dummy artikel yang tampak sebagai berita nyata.
- Tidak ada autoplay video, parallax berat, atau modals promosi pada kunjungan pertama.
- Jangan memaksa popup cookie tanpa kebutuhan tracking yang nyata.

## 9. Prinsip SEO, aksesibilitas, performa

- Utamakan preservasi slug asli dan canonical yang disetujui. Site news memakai root article slug.
- Copy harus dapat dibaca tanpa JS; tidak menaruh isi utama di carousel interaktif.
- Title dan meta berbeda tiap halaman, satu H1, urutan heading semantik, breadcrumbs.
- WCAG 2.2 AA sebagai target; 320px no-horizontal-scroll, keyboard/zoom 200%, reduced motion.
- Target Lighthouse >=90 kategori utama pada halaman representatif (setelah build) dan target CWV LCP <=2.5s, INP <=200ms, CLS <=0.1 (p75 lapangan bila tersedia): **bukan skor existing**.
- Hero image prioritas loading, sisanya lazy; tidak memakai slider/image hero 4K tanpa kebutuhan.

## 10. Gate persetujuan sebelum coding

### P0: wajib untuk desain disetujui

- [x] Pemilik memilih konsep **Modern Islamic Elegant**.
- [ ] Finalisasi warna terhadap logo/identitas resmi sekolah.
- [ ] Setujui urutan section homepage, hero copy dan CTA.
- [ ] Verifikasi keenam menu/URL P0 dengan pengurus sekolah.
- [ ] Terima logo resmi dan minimal satu foto hero berizin (atau putuskan placeholder netral hingga tersedia).
- [ ] Verifikasi alamat/email/telepon dan akreditasi sebelum tampil publik.
- [ ] Putuskan cakupan sampel berita fase frontend serta sumber file kontennya.
- [ ] Pemilik memberi instruksi eksplisit **"mulai coding/implementasi"**.

### P1: setelah UI foundation

- [ ] Tentukan apakah ada galeri kehidupan sekolah dan aset yang diizinkan.
- [ ] Tentukan CTA pendaftaran hanya jika prosedur/tautan resmi tersedia.
- [ ] Tetapkan kumpulan foto sekolah dan format izin publikasi.
- [ ] Putuskan opsi dark mode (default **tidak diperlukan** untuk MVP).

## 11. Keputusan dan risiko konten khusus

- Kontak di legacy: `smp.inshafuddinbna@gmail.com` dan telepon terpotong `(0651)`; direktori Kemendikdasmen mencantumkan `smp.inshafuddin@gmail.com` serta `065132089`. Keduanya **belum boleh otomatis disatukan**.
- Portal Kemendikdasmen menampilkan akreditasi **A** pada halaman terindeks yang diperiksa, sementara sumber ketiga menampilkan **B**; verifikasi sertifikat/tanggal berlaku dan keputusan pihak sekolah sebelum membuat badge akreditasi.
- Foto eksternal Dayah Terpadu Inshafuddin yang beredar di berita bisa menjadi referensi moodboard namun **bukan aset berlisensi otomatis** bagi website SMP.
- Narasi copy hero yang diusulkan: **"Membentuk Generasi Berilmu, Berakhlak, dan Berprestasi"** — wajib editorial approval, bukan kutipan persis visi sekolah.

## 12. Link referensi verifikasi

- Legacy homepage: https://www.smpinshafuddin.sch.id/
- Legacy profil: https://www.smpinshafuddin.sch.id/tentang-kami/
- Legacy akademik: https://www.smpinshafuddin.sch.id/akademik/
- Legacy fasilitas: https://www.smpinshafuddin.sch.id/fasilitas/
- Legacy berita: https://www.smpinshafuddin.sch.id/berita/
- Kemendikdasmen: https://referensi.data.kemendikdasmen.go.id/pendidikan/npsn/10105419
- Direktori lain dengan perbedaan akreditasi: https://smp.sch.id/sekolah/10105419

**Final:** Blueprint ini merupakan bahan diskusi/desain untuk persetujuan. **Belum ada codebase Next.js, perubahan produksi, atau implementasi frontend.**


## 13. Addendum UX — Fokus Homepage Seimbang (28 Oktober 2026)

**Disetujui pengguna:** Homepage seimbang antara profil, pendidikan, fasilitas, kegiatan siswa, dan berita. Ini melengkapi keputusan Modern Islamic Elegant.

- H-01 header dan H-02 hero: brand + CTA Profil/Akademik, tidak menampilkan menu PPDB tanpa link resmi.
- H-03 nilai/karakter dan H-04 dua jalur pendidikan adalah inti identitas; **program pendidikan mendahului sambutan** untuk memberi konteks pengunjung.
- H-05 sambutan: ringkas, tanpa menampilkan pejabat/foto yang belum dikonfirmasi.
- H-06 fasilitas, H-07 ekstrakurikuler, H-08 berita: masing-masing maksimal tiga kartu di homepage (desktop); mobile satu kolom.
- H-09 kontak/footer menggunakan hanya data yang sudah disetujui.
- Dokumentasi paling spesifik (wireframe viewport desktop/mobile, fallback konten, alur pengunjung, acceptance checklist) ada di [`WIREFRAME_SPEC.md`](./WIREFRAME_SPEC.md).
- **Dilarang memulai coding pada tahap ini.**


## Keputusan H-01 — Integrasi konten dan media live dari WordPress

Keputusan pengguna (28 Oktober 2026): **tanpa mockup gambar dan tanpa berita/artikel mock**. Foto/berkas dipilih dari Media Library WP melalui ID/URL REST nyata; headline, profil, sambutan, program dan kartu berita mengikuti data WP yang dapat diverifikasi. Semua gambar dalam sketsa design adalah **zona layout**, tidak boleh diganti gambar stok/AI. Bila tidak ada file resmi, adaptasikan layout menjadi text-only atau hilangkan modul visual tersebut. Brand/design tokens tetap statis karena merupakan UI config, bukan konten editorial.

Periksa juga `HEADLESS_WORDPRESS_PLAN.md` untuk cache, API, pemetaan media, dan kondisi when fields unavailable.
