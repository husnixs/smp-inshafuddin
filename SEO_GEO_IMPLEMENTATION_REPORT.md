# SEO & GEO Implementation Report — SMP Inshafuddin Banda Aceh

**Tanggal:** 28 Oktober 2026
**Branch:** `refactor/ui-modern-islamic-elegant`
**Stack teraudit:** Next.js 15.5.28 (App Router), React 19, TypeScript strict, Tailwind 3, WordPress REST API (`www.smpinshafuddin.sch.id/wp-json/wp/v2`), Yoast SEO aktif di WordPress.

> Laporan ini memisahkan **yang benar-benar diuji** dari **yang masih perlu divalidasi di server staging/produksi**. Tidak ada skor SEO/GEO/Lighthouse yang diklaim.

---

## A. Audit Summary

### Kondisi awal

- Route publik (App Router): `/`, `/tentang-kami/`, `/akademik/`, `/fasilitas/`, `/ekstrakurikuler/`, `/berita/` (+ `?page=N`), `/[slug]/` (artikel root-slug), `robots.txt`, `sitemap.xml`, 404.
- Metadata: `metadata` statis per halaman + `generateMetadata` di artikel; `metadataBase`, OG, dan canonical di-hardcode ke `siteConfig.url`.
- WordPress: respons `/posts` memuat `yoast_head_json` (title, og_*, canonical, robots, schema) dan `yoast_head`. `description` Yoast bernilai `null` pada artikel yang diperiksa; `featured_media` = 0 (gambar ada di dalam konten). Total 77 artikel (`X-WP-Total`).
- Tidak ada mekanisme staging vs produksi; tidak ada JSON-LD; ESLint tidak terpasang.

### Temuan

| Prioritas | Temuan |
|---|---|
| **Critical** | Tidak ada noindex untuk staging — `smpinshafuddin.husnixs.id` dan subdomain review dapat diindeks (robots.txt `Allow: /`, meta robots `index`). |
| **Critical** | Judul artikel ganda: title Yoast `"Judul - SMP Inshafuddin"` + template `"| SMP Inshafuddin Banda Aceh"`. |
| **High** | Halaman dalam mewarisi `openGraph` homepage (Next.js mengganti objek `openGraph` parent secara utuh) → `og:url`/`og:title` salah di semua halaman kecuali artikel. Layout juga memasang `canonical` homepage sebagai default untuk halaman tanpa canonical. |
| **High** | Kegagalan API WordPress pada artikel menghasilkan **404** (`getPostBySlug` menelan error → `notFound()`), berisiko men-cache 404 palsu via ISR. |
| **High** | Sitemap: `lastModified = new Date()` untuk semua URL (tanggal tidak valid), slug artikel tanpa pagination (maks. 100), tidak memfilter artikel `noindex`. |
| **High** | URL WordPress lama tanpa route Next.js (akan 404 setelah cutover): `/visi-misi/`, `/sejarah/`, `/profil/`, `/struktur-sekolah/`, `/tenaga-administrasi/`, `/gallery/`, `/hubungi-kami/`, `/home/`. **Tidak diubah** — lihat F. |
| **Medium** | `/berita/?page=abc` → `NaN` dikirim ke API; halaman di luar rentang → halaman kosong ber-status 200 (soft 404); canonical halaman 2+ menunjuk ke halaman 1. |
| **Medium** | Tidak ada structured data (School, WebSite, Article, BreadcrumbList). |
| **Medium** | Decoding HTML entity terbatas (hanya 6 entity) pada title/excerpt. |
| **Medium** | Fetch WordPress tanpa timeout. |
| **Low** | OG image default = logo 199×73 px (terlalu kecil untuk kartu sosial). |
| **Low** | H1 homepage tidak memuat nama sekolah (entitas utama halaman tidak eksplisit). |
| **Low** | Konfigurasi gambar tanpa AVIF/WebP eksplisit dan cache TTL default 60 detik. |

---

## B. Changes Implemented

### File baru

| File | Fungsi |
|---|---|
| `src/lib/seo/config.ts` | `NEXT_PUBLIC_SITE_URL` (origin canonical produksi, tervalidasi) dan `SITE_ENV` (hanya `production` yang boleh diindeks). `absoluteUrl()` mengikuti kebijakan trailing slash. |
| `src/lib/seo/metadata.ts` | Satu-satunya pembentuk metadata: `buildPageMetadata`, `buildArticleMetadata`, `buildRobots`. Normalisasi title Yoast, fallback description, pemilihan OG image. |
| `src/lib/seo/pages.ts` | Title & description halaman statis (sumber tunggal untuk metadata, sitemap, dan JSON-LD). |
| `src/lib/seo/jsonld.ts` | Builder schema.org: School, WebSite, WebPage/AboutPage/CollectionPage, BreadcrumbList, NewsArticle; `siteGraph()` dengan `@id` konsisten. |
| `src/components/seo/JsonLd.tsx` | Render JSON-LD aman: `<`, `>`, `&`, U+2028/2029 di-escape. |
| `src/app/error.tsx` | Tampilan error 500 yang selaras desain (dipakai saat WordPress tidak dapat dijangkau). |
| `.env.example` | Dokumentasi variabel environment (tanpa secret). |

### File diubah

| File | Perubahan & alasan |
|---|---|
| `src/app/layout.tsx` | `metadataBase` dari env; title default homepage + template `%s \| SMP Inshafuddin`; robots dari env; **canonical default dihapus** agar tidak bocor ke halaman lain; OG image default = foto sekolah dari WordPress. |
| `src/app/page.tsx` | Metadata homepage sesuai brief (title absolut, canonical `/`); JSON-LD School + WebSite + WebPage; section berita disembunyikan bila API gagal (bukan menampilkan "belum ada berita"). |
| `src/app/{tentang-kami,akademik,fasilitas,ekstrakurikuler}/page.tsx` | Metadata via `buildPageMetadata` (canonical, OG, Twitter, robots per halaman); JSON-LD WebPage/AboutPage. |
| `src/app/berita/page.tsx` | `generateMetadata` per halaman pagination (canonical mandiri `?page=N`); validasi `?page` (non-angka → 404); halaman di luar rentang → 404; status gagal API dibedakan dari kosong; JSON-LD CollectionPage. |
| `src/app/[slug]/page.tsx` | Metadata dari Yoast (dinormalisasi) dengan fallback data WP; JSON-LD NewsArticle; 404 hanya bila artikel memang tidak ada. |
| `src/app/sitemap.ts` | URL canonical produksi, pagination WordPress, `lastmod` dari `modified_gmt` (homepage & `/berita/` = artikel terbaru; halaman statis tanpa `lastmod` karena tidak ada tanggal valid), filter Yoast `noindex`, revalidate 1 jam. |
| `src/app/robots.ts` | Produksi: allow semua + `Sitemap:`. Non-produksi: allow crawling (agar noindex terbaca), **tanpa** sitemap. |
| `src/app/not-found.tsx` | Title "Halaman Tidak Ditemukan" + `noindex`. |
| `next.config.mjs` | Header `X-Robots-Tag: noindex, nofollow` untuk semua respons non-produksi; `images.formats` AVIF/WebP; `minimumCacheTTL` 7 hari. |
| `src/lib/wordpress/api.ts` | `import 'server-only'`; timeout 10 detik; `WordPressApiError`; `getPosts` mengembalikan `failed`; `getPostBySlug` melempar error API (bukan `null`); `getAllPostsForSitemap` dengan pagination; `getAllPageSlugs` (tidak terpakai) dihapus. |
| `src/lib/wordpress/extract.ts` | `decodeHtmlEntities` (numerik + entity umum), `truncateText` pada batas kata. |
| `src/components/ui/Breadcrumb.tsx` | Menerbitkan JSON-LD BreadcrumbList dari data yang sama dengan breadcrumb visual. |
| `src/components/home/HeroSection.tsx` | Nama sekolah dipindah ke dalam `<h1>` (badge pill visual yang sama) — tanpa perubahan tampilan. |
| `src/components/news/NewsCard.tsx` | Excerpt memakai `truncateText`. |
| `src/config/site.ts` | `url` dari `SITE_URL` (env). |
| `src/types/wordpress.ts` | Tipe `yoast_head_json.robots`. |

### Keputusan teknis penting

- **Canonical selalu ke domain produksi**, termasuk di staging. Staging tetap noindex, jadi tidak ada risiko canonical mengarah ke staging.
- **Noindex staging berlapis:** meta robots + header `X-Robots-Tag` (mencakup sitemap/gambar). Crawling **tidak** diblokir di robots.txt agar crawler dapat membaca noindex.
- **Default aman:** `SITE_ENV` kosong/salah ketik → noindex. Indexing hanya terjadi jika secara eksplisit `production`.
- **Yoast:** dipakai sebagai prioritas untuk title (`og_title`, akhiran nama situs dibuang), description (`description` → `og_description` → excerpt), robots, dan OG image. **Schema Yoast tidak disalin** karena memakai `inLanguage: en-US`, `SearchAction` ke `/?s=` (tidak ada di Next.js), dan `Person` dari akun admin.
- **Author artikel:** akun WordPress tunggal `smpinsha` adalah akun institusi, bukan nama orang → schema `author` diarahkan ke entitas sekolah; `article:author` tidak diterbitkan. Tampilan UI tidak diubah.
- **NewsArticle** dipilih karena konten adalah warta kegiatan sekolah.
- **FAQPage tidak ditambahkan:** belum ada konten tanya-jawab resmi yang terlihat di halaman; menambah FAQ hanya untuk rich result melanggar brief. Lihat F.

---

## C. SEO Validation (diuji)

Pengujian dilakukan pada **production build** lokal (`next build` + `next start`) di salinan proyek terisolasi, dengan data **WordPress live**, untuk dua environment: `SITE_ENV=staging` dan `SITE_ENV=production`. Skrip validasi mem-parse HTML/header aktual.

| Pemeriksaan | Staging | Production |
|---|---|---|
| `npx tsc --noEmit` | ✅ lulus | ✅ lulus |
| `next build` | ✅ lulus (16 halaman) | ✅ lulus (16 halaman) |
| `next lint` | ⚠️ tidak dapat dijalankan — ESLint tidak terpasang di proyek | sama |
| Meta robots semua halaman | `noindex, nofollow` | `index, follow` |
| Header `X-Robots-Tag` | `noindex, nofollow` (HTML, robots.txt, sitemap) | tidak ada |
| `robots.txt` | `Allow: /`, tanpa Sitemap | `Allow: /`, `Sitemap: https://www.smpinshafuddin.sch.id/sitemap.xml` |
| Sitemap | 83 URL (6 statis + 77 artikel), 79 `lastmod`, 0 duplikat, host tunggal `https://www.smpinshafuddin.sch.id` | sama |
| Canonical & `og:url` 8 halaman uji | semua ke `https://www.smpinshafuddin.sch.id/...` dengan trailing slash; `/berita/?page=2` self-canonical | sama |
| Title unik | ✅ tidak ada duplikat; artikel: `Menelusuri Jejak Sejarah, Menghidupkan Kembali Harapan. \| SMP Inshafuddin` | sama |
| Description | terisi di semua halaman (106–167 karakter) | sama |
| H1 | tepat 1 per halaman | sama |
| JSON-LD | valid (`json.loads`), semua referensi `@id` ter-resolve dalam halaman | sama |
| 404 | `/halaman-tidak-ada-xyz/`, `/berita/?page=999`, `/berita/?page=abc` → status 404 + `noindex` | sama |
| API WordPress mati (build terpisah, API diarahkan ke `127.0.0.1:9`) | build tetap lulus; `/` 200 tanpa section berita; `/berita/` 200 dengan pesan gangguan; artikel → **500** (bukan 404) | — |
| Konsol browser (`/`, artikel, `/berita/?page=2`) | tidak ada error / hydration mismatch | — |

**Structured data per halaman (terverifikasi pada output):**

| Halaman | Node JSON-LD |
|---|---|
| `/` | School/EducationalOrganization, WebSite, WebPage |
| `/tentang-kami/` | School, WebSite, AboutPage (mainEntity = sekolah), BreadcrumbList |
| `/akademik/`, `/fasilitas/`, `/ekstrakurikuler/` | School, WebSite, WebPage, BreadcrumbList |
| `/berita/` | School, WebSite, CollectionPage, BreadcrumbList |
| Artikel | School, WebSite, NewsArticle, BreadcrumbList |

**Internal linking:** navigasi header/footer, breadcrumb, kartu berita → `/{slug}/` (root slug legacy dipertahankan), pagination `rel="prev"`/`rel="next"`. Tidak ada URL publik yang diubah.

**Belum divalidasi:** Google Rich Results Test / Schema Markup Validator (butuh URL publik), Search Console, dan perilaku di host staging aktual.

---

## D. GEO Readiness

- **Identitas entitas:** satu entitas `School` dengan `@id` `https://www.smpinshafuddin.sch.id/#school` dirujuk oleh WebSite (publisher), setiap WebPage (`about`), dan NewsArticle (publisher/author). Nama, alamat (Lambaro Skep, Kuta Alam, Banda Aceh, Aceh), tahun berdiri 1974, dan hubungan dengan Yayasan Pembina Inshafuddin diambil dari konten yang sudah tampil di situs.
- **Struktur informasi:** H1 homepage kini memuat "SMP Inshafuddin Banda Aceh"; satu H1 per halaman; section memakai `aria-labelledby`; heading section `<h2>`/`<h3>` berurutan.
- **Ekstraktabilitas:** seluruh konten utama dirender server-side (Server Components). Client Components hanya untuk navigasi (DesktopNav, MobileNav) dan error boundary.
- **AI crawler:** robots.txt produksi tidak memblokir crawler mana pun (termasuk GPTBot, ClaudeBot, PerplexityBot, Google-Extended). Ini keputusan default yang dapat diubah sekolah. `llms.txt` tidak dibuat (sesuai brief).

---

## E. Performance

**Diterapkan:**
- `next/image` dengan AVIF/WebP, `sizes` responsif, aspect-ratio tetap (anti-CLS), cache hasil optimasi 7 hari.
- Hero image `priority` (kandidat LCP); gambar lain lazy (default `next/image`); iframe peta `loading="lazy"`.
- Font via `next/font` (self-hosted, `display: swap`).
- Fetch WordPress dengan ISR (`revalidate` 5–60 menit) dan timeout 10 detik.
- First Load JS bersama: **103 kB**; per halaman 106–111 kB (output `next build`).

**Hasil pengukuran:** Lighthouse/PageSpeed **tidak dijalankan** (tidak tersedia di lingkungan ini). Target CWV (LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1) **belum terverifikasi**.

**Potensi bottleneck tersisa:**
- Hero/LCP image adalah JPEG "scaled" dari WordPress; ukuran asli besar, bergantung pada optimasi `/_next/image` di server deployment.
- Logo header juga `priority` (dua gambar prioritas).
- Fraunces italic tidak dimuat (italic disintesis browser) — pilihan sadar untuk menghemat satu file font.
- Konten artikel (`content.rendered`) memuat `<img>` mentah dari WordPress, tidak melalui `next/image`.

---

## F. Pending Actions

### Data resmi sekolah yang belum tersedia (sengaja tidak dimasukkan ke schema)
- **Telepon:** data legacy hanya `(0651)` (tidak lengkap).
- **Email:** `smp.inshafuddinbna@gmail.com` tampil di situs, tetapi belum dikonfirmasi pengelola (konflik data sesuai `AGENTS.md` §2.12) → tidak dimasukkan ke JSON-LD.
- **NPSN, akreditasi, koordinat, kode pos** — tidak tersedia dari sumber resmi.
- **`sameAs` media sosial** — akun resmi belum terverifikasi.
- **Person (kepala sekolah/pimpinan)** — nama perlu konfirmasi sebelum publikasi (`AGENTS.md` §9).
- **FAQ** — perlu daftar tanya-jawab resmi dari sekolah (lokasi, program, pendaftaran) sebelum ditampilkan dan diberi `FAQPage`.

### Konfigurasi deployment yang dibutuhkan
- Staging (`smpinshafuddin.husnixs.id`) dan subdomain review: **jangan set** `SITE_ENV`, atau set `SITE_ENV=staging`. Set `NEXT_PUBLIC_SITE_URL=https://www.smpinshafuddin.sch.id`.
- Produksi: `SITE_ENV=production`, `NEXT_PUBLIC_SITE_URL=https://www.smpinshafuddin.sch.id`.
- Kedua variabel harus tersedia **saat build** (halaman statis dan header dibentuk saat build).
- Jangan mengirim sitemap staging ke Search Console.

### Pengujian yang belum dapat diselesaikan
- Deploy ke staging lalu verifikasi `curl -I` (header `X-Robots-Tag`), Rich Results Test, dan PageSpeed Insights di host nyata.
- Pengujian lint (pasang ESLint + `eslint-config-next` bila disetujui).
- E2E (Playwright) belum ada di proyek.

### Persiapan migrasi ke domain resmi
1. **Peta redirect 301 untuk halaman WordPress tanpa route Next.js** (perlu persetujuan editorial):

   | URL WordPress | Usulan tujuan |
   |---|---|
   | `/visi-misi/`, `/sejarah/`, `/profil/`, `/struktur-sekolah/`, `/tenaga-administrasi/` | `/tentang-kami/` |
   | `/hubungi-kami/` | `/#contact-heading` atau halaman kontak baru |
   | `/gallery/` | `/ekstrakurikuler/` (galeri dokumentasi) |
   | `/home/` | `/` |

   Alternatif: route fallback di `[slug]` yang merender halaman WordPress (`/pages?slug=`), dengan risiko markup page builder.
2. Tentukan host WordPress setelah cutover (mis. `cms.` subdomain) dan perbarui `NEXT_PUBLIC_WORDPRESS_API_URL` serta `images.remotePatterns`; pastikan WordPress lama diberi `noindex` atau di-redirect agar tidak terjadi duplikasi konten.
3. Yoast `canonical` di WordPress saat ini menunjuk ke domain yang sama; setelah cutover, pastikan WordPress tidak lagi tampil publik di domain produksi.
4. Pertimbangkan sanitasi HTML artikel (`content.rendered` dirender via `dangerouslySetInnerHTML`, kondisi existing). Sumber konten adalah CMS sekolah sendiri, tetapi sanitizer (mis. `sanitize-html`) memerlukan dependency baru sehingga ditunda untuk persetujuan.
5. Hapus fetch `getPageBySlug('tentang-kami')` yang hasilnya tidak dipakai di `/tentang-kami/` (kondisi existing, tidak berdampak SEO).
