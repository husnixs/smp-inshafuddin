# Spec Desain — Refactor UI "Mihrab sebagai Sistem"

**Tanggal:** 28 Oktober 2026
**Branch:** `refactor/ui-modern-islamic-elegant`
**Status:** Disetujui di sesi brainstorming, menunggu review spec tertulis
**Melengkapi:** `DESIGN_BLUEPRINT.md` (Modern Islamic Elegant), `WIREFRAME_SPEC.md` (urutan section)

## 1. Tujuan

Memperkuat karakter sekolah Islam yang terpadu dengan pesantren (Dayah Terpadu Inshafuddin) tanpa mengganti palet warna. Nuansa Islami dibangun dari **struktur** (bentuk lengkung mihrab sebagai token desain), bukan dari ornamen yang ditempel.

**Kriteria berhasil**

- Lengkung mihrab tampil sebagai bahasa bentuk yang konsisten pada foto dan panel penting.
- Pola girih turun dari 11 pemakaian menjadi 2 (footer, `PageHero`).
- Pola visual generik dihapus: pill badge di atas H1, blur orb, gradient garis emas, bento grid, tag pill ber-blur, header glass.
- Palet, font, isi teks/data, route, SEO, dan adapter WordPress tidak berubah.
- `typecheck`, `lint`, `build` hijau; tanpa overflow horizontal di 320–1440px.

## 2. Keputusan pemilik (sesi 28 Okt 2026)

| Topik | Keputusan |
|---|---|
| Motif utama | Mihrab & arsitektur |
| Teks Arab | **Tidak ada** teks Arab (label, salam, maupun kutipan) |
| Pendekatan | A — Mihrab sebagai sistem (tanpa tepi lengkung hero dari opsi C) |
| Cakupan | Seluruh halaman publik: beranda, halaman dalam, artikel, 404/error, header, footer |

## 3. Batasan

- Patuh `AGENTS.md`: tanpa konten dummy, tanpa ayat/hadis/kaligrafi dekoratif, tanpa ornamen masjid di tiap kartu, tanpa dependency baru.
- Palet tetap (`brand.*`, `surface.*`, `ink.*`, `divider`). Teks emas di latar terang hanya `gold-ink`; di latar emerald hanya `gold-light`.
- Fraunces (display) + Plus Jakarta Sans (UI) tetap.
- Motion: hanya hover/focus. Tanpa animasi loop. `prefers-reduced-motion` tetap dihormati.

## 4. Sistem visual

### 4.1 Bentuk

| Token / komponen | Bentuk | Dipakai untuk |
|---|---|---|
| `MihrabFrame` (komponen baru, `src/components/ui/MihrabFrame.tsx`) | Puncak lengkung runcing (pointed arch) lewat SVG `clipPath` dengan `clipPathUnits="objectBoundingBox"` sehingga responsif. Prop `outline` menambah garis emas tipis sejajar di luar bingkai. Membungkus `next/image` `fill`. | Foto hero, foto kepala sekolah (beranda & `/tentang-kami/`) |
| `.arch-top` (utility di `globals.css`) | Puncak lengkung bulat lebar: `border-radius: 160px 160px 10px 10px`. Varian `.arch-top-sm` untuk ceruk ikon kecil: `9999px 9999px 4px 4px`. Nilai px tetap agar lengkung tidak lonjong pada panel lebar. | Panel program, panel emerald halaman dalam, foto kartu fasilitas/ekskul (`.arch-top`); ceruk ikon pilar (`.arch-top-sm`) |
| `ArchDivider` (komponen baru, `src/components/ui/ArchDivider.tsx`) | Garis emas tipis horizontal dengan siluet lengkung kecil di tengah (SVG inline, `aria-hidden`) | Penanda eyebrow pada `SectionHeading` dan `PageHero`; pengganti `StarMark` |

Radius: `control` 12px tetap (tombol, input). `card` turun 16px → 10px. `hero` 24px dipakai hanya untuk blok kontak dan gambar utama artikel. Lengkung = penanda penting, tidak dipakai di semua elemen.

### 4.2 Ornamen

- **Girih** hanya di `Footer` dan `PageHero`. Dihapus dari: `HeroSection` (2×), `WelcomeSection`, `ProgramsSection`, `ContactSection`, `NewsCard`, `MobileNav`, `not-found`, `tentang-kami`, `akademik`.
- **`StarMark`** tidak lagi dipakai sebagai eyebrow maupun bullet. Komponen dihapus jika tidak ada pemakai tersisa.
- Bullet list program/visi: titik emas 6px (`bg-brand-gold`, rounded-full).
- Pita lengkung footer: satu SVG statis berisi deretan lengkung tipis (stroke emas, opasitas rendah) di tepi atas footer. Ini satu-satunya momen "serambi".

### 4.3 Pola yang dihapus

| Pola | Lokasi | Pengganti |
|---|---|---|
| Pill badge nama sekolah di atas H1 | `HeroSection` | Baris teks biasa (sans, semibold, `gold-ink`) di dalam H1 |
| Blur orb emas | `WelcomeSection` | Dihapus |
| Gradient emerald pada blok | `WelcomeSection`, `PageHero` | Emerald solid (`emerald-deep` / `emerald`) |
| Garis gradient emas `from-gold/0 via-gold to-gold/0` | `PageHero`, `Footer` | Garis emas solid 1px atau dihapus |
| Bento grid fasilitas | `FacilitiesPreview` | Grid 3 kartu setara |
| Tag pill ber-blur di atas foto | `MediaCard` | Label teks kecil `gold-ink` di atas judul |
| Header glass (`backdrop-blur`) | `Header` | Latar `surface-white` solid + border bawah |

## 5. Penerapan per area

### Header (`Header.tsx`, `DesktopNav.tsx`, `MobileNav.tsx`)
- Pita identitas atas tetap, `StarMark` dihapus.
- Nav aktif: garis bawah emas 2px dengan ujung membulat.
- Header solid putih. Drawer mobile: overlay `emerald-deep/60` tanpa blur, girih dihapus.

### Hero beranda (`HeroSection.tsx`)
- Kiri: H1 = nama sekolah (baris kecil) + kalimat utama (Fraunces besar). Deskripsi, CTA `Kenali Sekolah` (primer, panah) dan `Program Akademik` (sekunder), `dl` 1974 / Sekolah & Dayah — teks tidak berubah.
- Kanan: foto dalam `MihrabFrame` dengan `outline`, rasio 4:5, di atas bidang emerald (bidang kanan desktop tetap). Mobile: bingkai mihrab penuh lebar, maksimal tinggi wajar agar CTA tetap dekat lipatan.
- Gambar tetap `priority` (LCP).

### Tiga pilar (`OverviewSection.tsx`)
- Struktur `ol` bernomor tetap. Kotak ikon sage → ceruk `arch-top` kecil (lebar 48, tinggi 56).

### Dua program (`ProgramsSection.tsx`)
- Kedua panel `arch-top`. Sekolah: putih + border. Dayah: emerald solid tanpa girih. Bullet titik emas.

### Sambutan (`WelcomeSection.tsx`)
- Blok emerald solid, tanpa girih/orb/gradient. Foto kepala sekolah dalam `MihrabFrame` dengan `outline`; figcaption nama tetap.

### Fasilitas & ekskul (`FacilitiesPreview.tsx`, `ExtracurricularPreview.tsx`, `MediaCard.tsx`)
- 3 kartu setara di desktop. Foto kartu memakai `arch-top` (lengkung bulat lembut di puncak foto, di dalam kartu). Label kategori sebagai teks.
- Halaman `/fasilitas/` dan `/ekstrakurikuler/` mewarisi perubahan `MediaCard`.

### Berita (`LatestNewsSection.tsx`, `NewsCard.tsx`, `/berita/`)
- Kartu tanpa girih. Kartu tanpa gambar: blok emerald polos + siluet mihrab garis tipis `gold-light` (SVG kecil, `aria-hidden`).

### Kontak (`ContactSection.tsx`)
- Girih dihapus. Layout dan isi tetap.

### Footer (`Footer.tsx`)
- Pita lengkung SVG di tepi atas. Girih tetap tipis. `FooterHeading` tanpa `StarMark`.

### Halaman dalam (`PageHero.tsx`, `tentang-kami`, `akademik`, `[slug]`, `not-found`, `error`)
- `PageHero`: emerald solid + girih, eyebrow memakai `ArchDivider`, garis gradient bawah dihapus.
- Panel emerald di `/tentang-kami/` dan `/akademik/`: `arch-top`, tanpa girih, bullet titik emas.
- Foto kepala sekolah di `/tentang-kami/`: `MihrabFrame`.
- Artikel `[slug]`: eyebrow `ArchDivider`; gambar utama tetap persegi `rounded-hero` (konten editorial, tidak dipaksa lengkung).
- `not-found` / `error`: tanpa girih; `StarMark` diganti siluet mihrab kecil.

## 6. Error handling & data

Tidak ada perubahan pada fetch WordPress, empty state berita, atau kondisi `failed`. Komponen baru murni presentasional (Server Components, tanpa `use client`).

## 7. Pengujian

1. `npm run typecheck`, `npm run lint`, `npm run build` — semua hijau, output nyata dilaporkan.
2. Visual di browser pane: viewport 320, 375, 768, 1024, 1440 pada `/`, `/tentang-kami/`, `/akademik/`, `/fasilitas/`, `/berita/`, satu artikel, dan 404. Cek: tanpa overflow horizontal, lengkung tidak terpotong konten, CTA hero terlihat di 375px.
3. Keyboard: tab melalui header, drawer mobile, CTA; focus ring terlihat.
4. Kontras: hanya token yang sudah lolos AA dipakai untuk teks; verifikasi pasangan baru (jika ada) dengan pemeriksa kontras.
5. `grep` memastikan `GirihPattern` tinggal di `Footer` dan `PageHero`, dan `StarMark` tidak dipakai lagi.

Catatan: proyek belum memiliki test runner. Penambahan unit/E2E test (Playwright) di luar cakupan refactor visual ini dan tidak menambah dependency tanpa persetujuan terpisah.

## 8. Di luar cakupan

- Teks Arab dalam bentuk apa pun.
- Perubahan konten, copy, route, metadata SEO, atau adapter WordPress.
- Aset foto baru, logo baru, perubahan palet.
- Transisi section berbentuk lengkung (opsi C).

## 9. Revisi pemilik (29 Oktober 2026)

Lengkung dihapus di bagian yang memotong gambar atau tidak diinginkan:

- **Hero beranda:** foto kembali persegi (`rounded-hero`, rasio 4:3 / 16:11, bingkai emas offset) agar foto tidak terpotong. `MihrabFrame` tidak dipakai di hero.
- **Dua program pembelajaran:** box kembali ke bentuk semula (`rounded-hero`, `p-8 sm:p-10`, girih pada panel Dayah).
- **`MediaCard` (fasilitas, ekstrakurikuler):** tanpa lengkung. Gambar memenuhi kartu, teks (label, judul, deskripsi) di atas gambar dengan gradient emerald (`.media-scrim`) yang menempel pada blok teks.
- **`/akademik/`:** tanpa lengkung; panel Kurikulum Nasional dan Dayah kembali `rounded-hero`/`card-surface`, girih pada panel Dayah.

Girih kini dipakai di Footer, PageHero, panel Dayah beranda, dan panel Dayah `/akademik/`.
