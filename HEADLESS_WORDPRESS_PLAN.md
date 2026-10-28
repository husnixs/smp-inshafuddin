# HEADLESS_WORDPRESS_PLAN.md — Integrasi Konten Asli WordPress → Next.js

**Proyek:** SMP Inshafuddin Banda Aceh  
**Tanggal:** 28 Oktober 2026  
**Status:** **Keputusan sumber data disepakati; endpoint masih menunggu verifikasi; belum ada izin coding**  
**Referensi:** `PRD.md`, `AGENTS.md`, `WIREFRAME_SPEC.md`, `AUDIT_LEGACY.md`, `DESIGN_BLUEPRINT.md`

## A. Keputusan terkonfirmasi

- **H-01:** WordPress **existing** tetap CMS/editorial backend dan tempat pengelolaan file/media, bukan diganti.
- **H-02:** Next.js App Router + TypeScript + Tailwind CSS menjadi frontend publik dan bertanggung jawab UI/UX responsif, aksesibilitas, SEO dan integrasi read-only.
- **H-03:** Semua foto, logo/asset konten, halaman informasi, berita, artikel, kategori, metadata, dan file publik yang ditampilkan harus berasal dari **WordPress asli** atau sumber resmi yang disetujui terpisah. **Tidak ada mockup foto, artikel mock, angka palsu, atau konten editorial dummy.**
- **H-04:** Tema **Modern Islamic Elegant** dan fokus homepage **profil + informasi sekolah secara seimbang** tetap berlaku.
- **H-05:** **Belum coding** sampai owner memberi perintah eksplisit.
- **H-06:** Jangan migrasi, menghapus, memodifikasi atau menulis kembali konten WordPress pada fase frontend.

## B. Arsitektur data yang diusulkan

```text
Pengunjung (browser)
   │
   ▼
Next.js (public website, HTML server-rendered, React Server Components)
   │ server-to-server HTTPS GET read-only
   │ cache / time-based revalidation (dan webhook opsional di fase nanti)
   ▼
WordPress REST API existing (/wp-json/wp/v2/*)
   ├─ posts / pages / categories / tags / authors
   ├─ featured_media / media / thumbnails / attachments
   ├─ meta/custom fields (HANYA jika diekspos)
   └─ menu / footer / opsi situs (HARUS periksa eksposur REST)
        │
        └─ Database dan uploads WordPress existing, dikelola WordPress
```

Server Components Next.js mengambil data secara server-side, tidak menggantungkan pembacaan konten SEO pada JavaScript browser. API origin adalah konfigurasi server, bukan URL yang diketik pengguna di browser. Pengaturan CORS browser umumnya tidak diperlukan untuk panggilan GET dari server Next.js. Hindari credential/admin bearer untuk data publik; gunakan konten dengan status `publish`.

## C. Endpoint WordPress: RENCANA BUKAN HASIL UJI

Base kandidat: `https://www.smpinshafuddin.sch.id/wp-json/wp/v2/`. **Belum dapat dipastikan akses JSON-nya.** Endpoint standar WordPress yang perlu dites:

| Kebutuhan frontend | Endpoint dan pola GET (standar WP) | Field kunci yang wajib diperiksa |
| --- | --- | --- |
| Arsip berita | `/posts?per_page=10&page=1&_embed` | `id`, `slug`, `date`, `modified`, `status`, `title.rendered`, `excerpt.rendered`, `featured_media`, `_embedded`, pagination headers |
| Detail artikel | `/posts?slug={slug}&_embed` | `content.rendered`, `author`, `categories`, `date`, `modified`, media dan SEO fields bila diekspos |
| Halaman profil/akademik/fasilitas/ekstra | `/pages?slug={slug}` | `content.rendered`, `featured_media`, `acf`/`meta` bila tersedia, `link` |
| Beranda WordPress | `/pages` dan setting `page_on_front` jika izin memungkinkan | Identifikasi homepage page ID; bedakan homepage template dari payload konten yang benar |
| Gambar/file | `/media?per_page=...` atau `/media/{id}` | `source_url`, `media_details.sizes`, `alt_text`, `caption`, tipe MIME, `post` |
| Kategori & tag | `/categories`, `/tags` | ID, slug, nama dan parent untuk pemetaan navigasi jika dibutuhkan |
| Author | `/users/{id}` | Hanya profil publik yang bisa diakses tanpa autentikasi |
| Menus | `/menus`, `/menu-items`, atau endpoint plugin/tema | **Tidak dijamin publik/tersedia**; cek versi WP, permission dan tipe navigasi |
| Pengaturan/footer/logo/hero | Endpoint custom REST, exposed registered meta/ACF atau settings khusus | **Belum terbukti ada**; jangan mengasumsikan theme-options muncul otomatis di API |
| SEO meta | REST extension SEO (mis. Yoast `yoast_head_json` bila terpasang dan aktif) | Tidak dijamin tersedia; fallback ke judul/excerpt artikel asli dan canonical publik |

WordPress core punya API posts/pages/media. Akses menu, footer, homepage hero, serta blok page builder sangat bergantung tema, plugin, pengaturan dan permission. Jangan menambahkan plugin/endpoints secara otomatis—catat kebutuhan dan minta persetujuan terpisah apabila API existing belum mencukupi.

### Contoh URL untuk pemeriksaan manual (bukan hasil terverifikasi)

- `https://www.smpinshafuddin.sch.id/wp-json/`
- `https://www.smpinshafuddin.sch.id/wp-json/wp/v2/posts?per_page=3&_embed`
- `https://www.smpinshafuddin.sch.id/wp-json/wp/v2/pages?slug=tentang-kami`
- `https://www.smpinshafuddin.sch.id/wp-json/wp/v2/media?per_page=3`
- `https://www.smpinshafuddin.sch.id/wp-json/wp/v2/categories`
- Jika rewrite REST nonaktif: uji alternatif `?rest_route=/wp/v2/posts` lewat lingkungan yang memiliki akses ke situs.

**Verifikasi 28 Oktober 2026:** Percobaan inspeksi langsung via web audit tidak berhasil mendapat payload JSON; direct homepage juga timeout di alat ini, sementara konten web terindeks tersedia. **Ini tidak membuktikan WordPress API diblokir atau rusak**. Uji dari server/browser pemilik diperlukan.

## D. Matriks sumber per section homepage (tanpa dummy)

| Area | Sumber WordPress yang diharapkan | Perilaku jika belum tersedia |
| --- | --- | --- |
| Identitas header/logo | WP site identity/logo jika diekspos; file logo asli dalam Media Library | Tampilkan nama sekolah sebagai teks, tanpa logo palsu |
| Hero foto | Media asli yang dipilih sekolah, ID media yang diakses via API/custom field | Jangan gunakan gambar stok/AI; layout hero text-only bila tidak ada media resmi |
| Headline/deskripsi hero | Konten halaman beranda WP/field yang terstruktur dan terverifikasi | Jangan mengganti dengan slogan fiktif; tampilkan heading identitas sekolah yang faktual |
| Sekilas sekolah | Ringkasan halaman `/tentang-kami/`, bukan copy hasil karangan | Jika belum terstruktur, beri ruang tanpa kartu yang mengklaim informasi baru; mapping editorial perlu disetujui |
| Pendidikan sekolah + dayah | Konten `/akademik/` + media yang terkait | Tampilkan teks/tautan asli; jangan klaim custom field sudah ada |
| Sambutan kepala sekolah | Section homepage WP / halaman profil + potret WP | Tunda section bila nama/kutipan/foto aktual belum diverifikasi |
| Fasilitas | `/fasilitas/` beserta attachment dalam HTML atau exposed fields | Tampilkan uraian asli tanpa gambar bila relasi media tidak tersedia |
| Ekstrakurikuler | `/ekstrakurikuler/` beserta attachment/fields | Tampilkan program dengan teks resmi; tanpa thumbnail fake |
| Berita terbaru | `/posts`, filter published dan pilih konteks SMP secara editorial jika taxonomy mendukung | Jika API error, bedakan dari daftar kosong; jangan tulis 3 artikel palsu |
| Footer | Data kontak/navigation WP yang terekspos; validasi editorial | Sembunyikan nilai belum valid; tidak membuat nomor tel, sosial atau akreditasi fiktif |

**Penting:** WordPress REST biasanya mengembalikan `content.rendered` sebagai HTML. Tidak otomatis memecah hero, daftar fasilitas, CTA, profil guru, atau widget-footer menjadi JSON terstruktur. Jika halaman saat ini memakai Elementor, shortcode, atau page builder, wajib audit HTML yang benar-benar dikembalikan. Jika perlu pemetaan terstruktur, ajukan approval register REST meta/ACF atau endpoint khusus di WordPress existing sebagai dependency *terpisah*, bukan mengarang struktur data.

## E. Media asli dan file

1. Foto berita: gunakan `featured_media`/`_embedded['wp:featuredmedia']` atau media ID; pilih ukuran `media_details.sizes` yang tepat, periksa `source_url`, width/height, alt.
2. Foto fasilitas/hero/kepala sekolah: **jangan** menganggap semua foto otomatis dapat dicari via `featured_media`; perlu relasi konten/field/ID media nyata.
3. File seperti PDF yang ada di Media Library dapat ditautkan dari `source_url`, dengan penanda ukuran/jenis file bila tersedia; tidak menyalin secara manual ke Next.js.
4. Gunakan `next/image` hanya untuk host sumber yang sudah diverifikasi/diizinkan, dengan remotePatterns spesifik. Jika origin media berubah pada cutover, petakan URL dengan aman; jangan mengganti domain dalam HTML mentah tanpa audit semua elemen.
5. Hargai izin publikasi gambar siswa, alt text, dan akurasi konten. Media yang tidak tersedia tidak digantikan dengan stok/AI/placeholder berisi gambar palsu.
6. Jangan melakukan bulk-download media atau migrasi image di fase ini; WordPress tetap sumber file.

## F. Caching dan freshness (proposal; angka belum disetujui)

| Jenis | Proposal revalidation | Alasan |
| --- | --- | --- |
| Berita homepage | 5 menit | Update relatif rutin; hemat request WP |
| Arsip berita | 5 menit | Artikel terbaru/paginasi cukup segar |
| Detail artikel | 15 menit | Koreksi editorial dan metadata berubah |
| Profil, akademik, fasilitas, ekstrakurikuler | 60 menit | Jarang berubah |
| Identitas/menu/footer | 60 menit | Jarang berubah; invalidasi manual saat perubahan penting |

Revalidation menandai interval penyegaran/invalidasi, **bukan jaminan konten otomatis berubah tepat pada menitnya**. Untuk update mendekati instan, gunakan webhook WordPress ke invalidasi path/tag Next.js di fase implementasi berikutnya **hanya setelah pemilik mengizinkan integrasi tambahan**. Lindungi secret webhook jika digunakan dan pastikan tidak memicu recursive invalidation. Jangan cache data privat atau draf publik.

Error handling: bedakan 404, daftar benar-benar kosong, respons timeout/5xx dan skema JSON tidak valid. Jika cache terakhir tersedia dan valid, boleh melayani stale saat revalidasi gagal sesuai model runtime; **dilarang membangkitkan fake articles**. Pada build pertama saat API gagal, tampilkan error yang dapat diaudit, bukan membangun homepage kosong diam-diam.

## G. SEO dan URL legacy

- Pertahankan path `/`, `/tentang-kami/`, `/akademik/`, `/fasilitas/`, `/ekstrakurikuler/`, `/berita/` dan artikel yang berada di root `/{slug}/`.
- Next dynamic route `[slug]` meng-query WordPress berdasarkan slug (tanpa update whitelist tiap berita); route statis prioritas, 404 untuk slug tidak dikenal/privat.
- Gunakan title, excerpt, tanggal, penulis, featured media dan SEO meta dari WordPress jika benar-benar tersedia. Sanitasi rendered HTML: jangan sisipkan script inline/iframe arbitrer tanpa whitelist, jangan pakai HTML mentah tanpa pengamanan.
- WordPress `link`, `guid` atau SEO canonical bisa menunjuk domain lama atau subdomain CMS. Canonical di Next harus menunjuk origin frontend publik yang disepakati, bukan otomatis copy URL API/CMS.
- Jika WordPress dipindah ke subdomain CMS, atur `noindex` untuk halaman publik CMS (bukan untuk frontend Next); pastikan endpoint dan file media tetap terjangkau.
- Sitemap dinamis Next perlu mencakup post/page published yang valid, seluruh pagination WordPress bila perlu. Pertahankan jalur dan redirect lama saat cutover.

## H. Opsi routing domain untuk produksi (BELUM DIPUTUSKAN)

**Opsi A — WordPress pada `cms.smpinshafuddin.sch.id` + Next pada `www`**
- Pemisahan host jelas, monitoring dan security lebih mudah.
- Harus audit `siteurl/home`, URL media lama, redirect, preview, WP login, SEO/canonical dan crawl duplicate. Media mungkin masih memakai URL `www` lama.

**Opsi B — WordPress tetap di server existing, Nginx reverse proxy split-path pada domain publik**
- `www` melayani frontend Next untuk halaman publik; path tertentu seperti `/wp-json/`, `/wp-content/uploads/`, `/wp-admin/`, `/wp-login.php` dialihkan ke WordPress.
- Bisa mempertahankan path media, tetapi konfigurasi proxy, cookie/admin, rewrite dan caching lebih sensitif; cek juga asset editor WordPress lain sebelum memilih.

**Keputusan tertunda:** pilih opsi berdasarkan akses server, konfigurasi WordPress, performa, SEO, dan kebijakan keamanan. **Jangan mengubah DNS, domain WordPress, atau Nginx sebelum approval.**

## I. Acceptance / gate sebelum coding

- [ ] Endpoint `/wp-json/` menghasilkan JSON valid pada jaringan pemilik.
- [ ] `posts` publik (minimal 3 contoh) memiliki slug/judul/tanggal, HTML isi, dan gambarnya bila ada.
- [ ] `pages?slug=tentang-kami`, `akademik`, `fasilitas`, `ekstrakurikuler` memberi data yang diperlukan.
- [ ] Identifikasi sumber foto hero/logo dan cara menghubungkannya melalui API WordPress.
- [ ] Tentukan apakah menu/footer tersedia sebagai JSON publik; jika tidak, putuskan extension atau alternatif konfigurasi resmi.
- [ ] Audit apakah halaman menggunakan Elementor, Gutenberg, tema atau shortcode dan apakah `content.rendered` representatif.
- [ ] Pastikan hanya konten publik; tidak perlu token admin untuk pembacaan API.
- [ ] Tetapkan canonical domain dan lokasi WordPress setelah frontend Next live.
- [ ] Verifikasi image host, HTTP caching, rate limit, dan apakah CDN/WAF memblokir panggilan server-to-server.
- [ ] Audit URL lengkap dari WP/sitemap dan bandingkan dengan route target.
- [ ] Konfirmasi hak publikasi materi khususnya foto siswa; cek konflik kontak/akreditasi.
- [ ] Tinjau persetujuan pemilik untuk mulai coding; saat ini **belum diizinkan**.

## J. Referensi standar

- WordPress REST reference: https://developer.wordpress.org/rest-api/reference/
- WP posts: https://developer.wordpress.org/rest-api/reference/posts/
- WP pages: https://developer.wordpress.org/rest-api/reference/pages/
- WP media: https://developer.wordpress.org/rest-api/reference/media/
- WP embed: https://developer.wordpress.org/rest-api/using-the-rest-api/global-parameters/
- Next.js ISR: https://nextjs.org/docs/app/guides/incremental-static-regeneration
