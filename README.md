# SMP Inshafuddin Banda Aceh — Frontend Redesign

Dokumentasi perencanaan **redesign website sekolah** dari situs CMS legacy menuju frontend publik Next.js dengan tampilan modern, clean, responsif, ringan, dan SEO-friendly.

> **Status per 28 Oktober 2026:** **DESIGN + DATA SOURCE APPROVED / PLAN ONLY** — belum ada project Next.js atau kode frontend yang dihasilkan dalam paket ini. WordPress existing dipertahankan sebagai headless CMS melalui REST API; tidak ada backend/admin/CMS baru yang dibuat. **Pilihan visual: Modern Islamic Elegant. Fokus homepage: Profil & Informasi Sekolah yang seimbang. Belum ada izin coding.**

**Website legacy:** https://www.smpinshafuddin.sch.id/

## Isi paket

| Berkas | Isi |
| --- | --- |
| [`AUDIT_LEGACY.md`](./AUDIT_LEGACY.md) | Hasil penelusuran konten, URL, navigasi usulan, footer, ketidakpastian dan checklist verifikasi |
| [`PRD.md`](./PRD.md) | Product goals, scope, pages, design, technical plan, acceptance criteria, risiko & milestone |
| [`DESIGN_BLUEPRINT.md`](./DESIGN_BLUEPRINT.md) | Warna, tipografi, grid, wireframe desktop/mobile, halaman, komponen, dan gate approval Modern Islamic Elegant |
| [`WIREFRAME_SPEC.md`](./WIREFRAME_SPEC.md) | **Baru:** rincian homepage seimbang, wireframe desktop/mobile, kontrak konten per section, navigasi, copy proposal, fallback dan checklist persetujuan |
| [`HEADLESS_WORDPRESS_PLAN.md`](./HEADLESS_WORDPRESS_PLAN.md) | **Baru:** arsitektur read-only REST API, kontrak data dan media asli, cache, SEO, navigasi/footer, verifikasi endpoint, deployment |
| [`AGENTS.md`](./AGENTS.md) | Instruksi wajib AI coding agent: sumber data WordPress asli, larangan data/media mock, no coding before approval, URL/SEO, quality gates |
| `README.md` | Ringkasan proyek, dokumen, dan cara memulai setelah approval |

## Stack yang disepakati untuk tahap frontend

- **Next.js App Router**
- **TypeScript** (strict)
- **Tailwind CSS**
- **WordPress existing sebagai single source of truth untuk konten publik**, dibaca lewat WordPress REST API (tanpa database atau API baru).
- **Tidak ada mock data, mock artikel, ataupun foto stok/AI** pada frontend; untuk wireframe, kotak kosong hanya menunjukkan *slot tata letak*, bukan konten yang akan diterbitkan.
- Server Components mengambil data dari WordPress secara server-side; cache/revalidation sesuai sumber data. Endpoint dan payload aktual **belum dapat diverifikasi** pada 28 Oktober 2026.
- React Server Components sebagai default, client components hanya untuk interaksi.

## Scope situs yang sudah ditemukan

- `/` — beranda
- `/tentang-kami/` — profil/sejarah/visi-misi
- `/akademik/` — pendidikan sekolah dan dayah
- `/fasilitas/` — sarana/prasarana
- `/ekstrakurikuler/` — kegiatan siswa
- `/berita/` — arsip berita
- Satu URL artikel root slug sebagai bukti pola permalink, lihat `AUDIT_LEGACY.md`.

**Penting:** Daftar bukan seluruh URL. Pengambilan halaman langsung dan sitemap legacy belum berhasil diverifikasi. Menu header asli dan total berita tetap memerlukan akses tambahan.

## Arah produk

**Keputusan 28 Oktober 2026:** Pemilik memilih **Modern Islamic Elegant**, fokus homepage **Profil & Informasi Sekolah yang seimbang**, serta **integrasi live read-only Headless WordPress** tanpa konten/media mock. Palet emerald + gold subtle + ivory, tipografi Plus Jakarta Sans dan homepage content-first tercatat di [`DESIGN_BLUEPRINT.md`](./DESIGN_BLUEPRINT.md). Palet dan copy belum menggantikan brand/copy resmi sekolah sampai diverifikasi.

Website memprioritaskan identitas SMP Inshafuddin sebagai sekolah dengan pendidikan nasional, nilai Islami/dayah, pembentukan karakter, keterampilan, serta kehidupan siswa. Hindari carousel berat, animasi berlebihan, copy panjang di beranda, dan statistik yang tidak sah.

Navigasi **usulan**: `Beranda | Profil | Akademik | Fasilitas | Ekstrakurikuler | Berita`. Jangan menganggap ini hasil verifikasi menu lama.

## Alur memulai proyek (setelah persetujuan)

1. Verifikasi WordPress REST API, inventaris konten dan media, izin read-only dan alternatif host WordPress setelah cutover. Baca `HEADLESS_WORDPRESS_PLAN.md`.
2. Petakan logo, foto sekolah, gambar kegiatan, page fields, kontak, menu/footer dan metadata dari WordPress; jika belum diekspos API, catat gap (jangan membuat data dummy).
3. Review sitemap informasi, wireframe, dan desain homepage.
4. Setelah ada instruksi **mulai implementasi**, lakukan scaffold Next.js/TypeScript/Tailwind di repository yang ditunjuk. Jika repo sudah ada, periksa dan gunakan struktur existing.
5. Setelah approval coding, bangun akses data WP server-side → global layout → halaman P0 → berita root slug → SEO/accessibility/performance → QA.
6. Jalankan pengujian di build production; catat hasil aktual, bukan target yang belum diukur.

## Proposal struktur (belum dibuat)

```text
src/app/
src/components/
src/content/
src/lib/
src/types/
public/images/
```

Panduan teknis lengkap berada di `PRD.md` dan perintah AI agent di `AGENTS.md`.

## Persyaratan sebelum go-live

- Inventaris lengkap URL dan media dari CMS lama.
- Finalisasi canonical host, redirect, dan seluruh tautan artikel.
- Verifikasi statistik, staf sekolah, kurikulum, nomor telepon/email, jam dan media sosial.
- Persetujuan hak pakai foto siswa.
- Audit meta SEO, sitemap, robots, Search Console dan tes 404.
- Persetujuan pemilik produk/sekolah.

## Catatan integrasi masa depan

Backend atau CMS dapat disambungkan setelah fase prototype dengan mengganti implementasi di layer repository konten, bukan menulis ulang komponen UI. Dokumen ini tidak menetapkan CMS/API final.

## Sumber

- Legacy: https://www.smpinshafuddin.sch.id/
- Next.js docs: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
- Core Web Vitals: https://developers.google.com/search/docs/appearance/core-web-vitals?hl=id

**Next action:** Konfirmasi desain + jalur deployment CMS WordPress dan ketersediaan JSON endpoint, terutama `pages`, `posts`, `media`, dan sumber menu/footer; baca `HEADLESS_WORDPRESS_PLAN.md`. **Jangan coding sampai mendapat instruksi eksplisit.**
