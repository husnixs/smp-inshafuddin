# Product Requirements Document (PRD)
## Redesign Frontend Website SMP Inshafuddin Banda Aceh

**Versi:** 0.4 — Headless WordPress sebagai sumber tunggal konten publik, tanpa mock data/media  
**Tanggal:** 28 Oktober 2026  
**Status:** Arah visual dan fokus homepage dipilih pada 28 Oktober 2026; **implementasi belum dimulai**  
**Legacy:** https://www.smpinshafuddin.sch.id/  
**Teknologi target:** Next.js App Router, TypeScript, Tailwind CSS  
**Referensi audit:** [`AUDIT_LEGACY.md`](./AUDIT_LEGACY.md)  
**Blueprint desain terpilih:** [`DESIGN_BLUEPRINT.md`](./DESIGN_BLUEPRINT.md)  
**Spesifikasi wireframe:** [`WIREFRAME_SPEC.md`](./WIREFRAME_SPEC.md)  
**Kontrak Headless WP:** [`HEADLESS_WORDPRESS_PLAN.md`](./HEADLESS_WORDPRESS_PLAN.md)

---

## 1. Ringkasan

Mendesain ulang **frontend publik** SMP Inshafuddin Banda Aceh dari website berbasis CMS menjadi antarmuka Next.js yang **modern, clean, responsif, mudah dipahami, ringan, aksesibel, dan ramah SEO**, dengan mempertahankan URL legacy yang terbukti aktif/terindeks. Fase implementasi nanti membangun **frontend headless Next.js yang membaca konten publik asli melalui REST API WordPress existing**; tidak ada mock artikel, foto mock, backend/admin/database/CMS baru, login, atau formulir pemrosesan data siswa. Saat ini **hanya perencanaan, tanpa coding**.

### Prinsip inti

1. **Content-first:** Desain mengikuti konten sekolah yang benar; tidak mengarang statistik, prestasi, data, tautan, kebijakan, atau foto.
2. **Preserve URLs:** Jangan ubah slug legacy tanpa pemetaan resmi dan rencana redirect.
3. **Mobile-first:** Navigasi dan konten mengutamakan pengunjung ponsel (orang tua/calon siswa).
4. **Performance-first:** Minim JavaScript client, gambar responsif, tidak memakai animasi berat.
5. **Accessible-by-default:** Semantik, kontras, keyboard navigation, fokus, dan reduced motion.
6. **Headless live + cache:** WordPress existing adalah sumber tunggal konten editorial/media; Next.js mengambilnya server-side melalui REST API typed, menerapkan caching/revalidation sesuai halaman. Dilarang mengganti kegagalan API dengan konten palsu.

## 2. Masalah yang hendak ditangani

- Penyajian konten beranda masih cenderung panjang; informasi penting tidak cukup cepat dipindai.
- Teks indeks memperlihatkan statistik `0+`, berisiko menyesatkan jika tampil demikian pada HTML awal.
- Footer menampilkan telepon tidak lengkap `(0651)`.
- Konten tersebar di beberapa halaman, perlu konsistensi navigasi, tipografi dan CTA.
- Informasi akreditasi, registrasi, kontak resmi, dan daftar berita komprehensif belum diverifikasi; tidak boleh ditebak.
- Sebelum implementasi perlu audit tambahan pada header asli, seluruh URL, media, dan canonical; direct fetch ke legacy belum berhasil.

## 3. Tujuan dan kriteria sukses

### Tujuan

- Identitas sekolah kuat: nilai karakter, keunggulan akademik dan pendidikan dayah, kehidupan siswa.
- Pengunjung bisa menemukan profil, akademik, fasilitas, ekstrakurikuler, berita, dan kontak dalam <=3 interaksi dari beranda pada viewport mobile.
- Halaman sekolah dan berita mudah dibaca serta dapat dibagikan.
- URL legacy utama tetap bekerja; perubahan URL hanya dengan keputusan eksplisit.
- Frontend mudah dipelihara oleh developer/AI agent dan siap menerima data nyata pada tahap berikutnya.

### Target kualitas setelah implementasi

| Area | Target | Metode |
| --- | --- | --- |
| Responsivitas | 320px sampai desktop lebar; tanpa horizontal overflow | Browser responsive review |
| Aksesibilitas | WCAG 2.2 AA untuk komponen utama dan alur navigasi | Keyboard + axe + manual |
| Lighthouse | >=90 pada Performance, Accessibility, Best Practices, SEO untuk halaman representatif (target lab) | Lighthouse mobile, build production |
| Core Web Vitals | LCP <=2,5 dtk; INP <=200ms; CLS <=0,1 pada p75 data lapangan ketika tersedia | CrUX/GSC setelah live |
| URL | 100% URL yang masuk manifest migrasi memiliki halaman yang benar atau redirect disetujui | Automated URL comparison |
| Interaksi | Tidak ada tombol/menu mati; search, filter, pagination hanya jika berfungsi | E2E test |
| Konten | 100% informasi yang diterbitkan berasal dari data diverifikasi / disetujui | Content sign-off |

**Catatan:** Skor dan metrik adalah target, **bukan hasil pengukuran website sekarang**.

## 4. Audiens & kebutuhan

| Audiens | Kebutuhan utama | Jalur prioritas |
| --- | --- | --- |
| Calon siswa & orang tua | Memahami sekolah, pendekatan pendidikan, fasilitas, kontak | Home → Profil/Akademik → Fasilitas → Kontak |
| Siswa | Mengetahui berita/kegiatan dan ekstrakurikuler | Home → Berita/Ekstrakurikuler |
| Guru & staf | Publikasi kegiatan serta representasi resmi sekolah | Berita → Detail artikel |
| Masyarakat/alumni | Profil dan kabar sekolah | Profil/Berita |

## 5. Ruang lingkup

### Termasuk pada fase frontend

- Design system dasar, responsive header, menu mobile, footer.
- Homepage.
- Halaman Profil/Tentang Kami.
- Halaman Akademik.
- Halaman Fasilitas.
- Halaman Ekstrakurikuler.
- Arsip Berita, detail artikel yang URL-nya terverifikasi.
- Akses read-only REST API WordPress existing untuk halaman, berita, gambar/file, kategori, metadata, menu/footer bila endpoint tersedia; tidak ada konten mock.
- Metadata SEO, OG, JSON-LD berbasis informasi valid, sitemap dan robots frontend, canonical konsisten.
- 404, loading/empty states, keyboard behavior, responsive imagery.
- Quality assurance, unit/component testing terbatas dan E2E critical routes.

### Tidak termasuk

- Admin/backoffice, CMS baru, migrasi database WordPress, backend API, akun siswa/orang tua, login, dashboard akademik.
- Formulir pendaftaran/PPDB yang menyimpan data, pembayaran, chat realtime, sistem penilaian/rapor.
- Import otomatis seluruh artikel dan media (hanya strategi/manifest disiapkan).
- Membuat halaman, slug atau taxonomy baru tanpa persetujuan.

## 6. Inventaris URL dan aturan preservasi

| Prioritas | URL legacy | Route Next.js | Ketentuan |
| --- | --- | --- | --- |
| P0 | `/` | `app/page.tsx` | Halaman utama |
| P0 | `/tentang-kami/` | `app/tentang-kami/page.tsx` | Jangan ganti menjadi `/profil` |
| P0 | `/akademik/` | `app/akademik/page.tsx` | Pertahankan path |
| P0 | `/fasilitas/` | `app/fasilitas/page.tsx` | Pertahankan path |
| P0 | `/ekstrakurikuler/` | `app/ekstrakurikuler/page.tsx` | Pertahankan path |
| P0 | `/berita/` | `app/berita/page.tsx` | Arsip berita |
| P0 | `/satuan-pendidikan-aman-bencana-langkah-nyata-smp-inshafuddin-banda-aceh-melindungi-siswa-baru/` | `app/[slug]/page.tsx` | Contoh artikel di root, dengan whitelist manifest |

Route lain (pagination, author, kategori, media, page, file, URL berparameter) masih berstatus **TBD** berdasarkan crawl resmi. Untuk trailing slash gunakan kebijakan `trailingSlash` yang disetujui, konsisten dengan URL lama; uji behavior redirect 308/301 serta canonical. **Jangan membangun redirect sembarang berdasarkan dugaan.**

## 7. Arsitektur informasi & navigasi (USULAN)

**Header desktop:** logo/nama sekolah | Beranda | Profil | Akademik | Fasilitas | Ekstrakurikuler | Berita.  
**Header mobile:** logo/nama sekolah | hamburger membuka panel navigasi berlabel, lengkap dengan close, Escape, focus handling.  
**Footer:** identitas, navigasi ringkas, alamat, jam kerja, email valid, sosial resmi jika tersedia.

Menu di atas adalah **struktur usulan**, bukan klaim menu aktual. CTA `Pendaftaran` hanya setelah URL atau prosedur resmi dikonfirmasi; bila belum, gunakan tombol `Lihat Profil Sekolah` dan `Jelajahi Akademik` yang berfungsi.

### Wireframe prioritas beranda

1. Utility/header minimal dengan logo, nama, menu.
2. Hero: nama sekolah, proposisi nilai terverifikasi, foto sekolah asli, CTA primer `Kenali Sekolah` dan sekunder `Program Akademik`.
3. Kenapa SMP Inshafuddin? Tiga nilai konten: karakter & akhlak, akademik, pendidikan dayah (ringkasan yang disetujui).
4. Dua jalur pembelajaran: Pendidikan Sekolah dan Pendidikan Dayah; tautan Akademik.
5. Sambutan Kepala Sekolah: ringkasan + tautan Profil; nama/jabatan/foto setelah verifikasi.
6. Eksplorasi Fasilitas: 3–6 item dengan gambar representatif asli.
7. Ekstrakurikuler: Pramuka, Sanggar Seni Tari, Olahraga.
8. Berita terbaru: maksimal 3–4 artikel dari daftar valid; tautan ke arsip.
9. Kontak cepat: alamat, email, jam; tidak ada CTA telepon sebelum nomor lengkap diverifikasi.
10. Footer.

**Statistik** bersifat opsional: hanya bila sumber dan tahun data jelas; tidak boleh `0+`, angka estimasi, atau ilustrasi yang tampak nyata.

## 8. Kebutuhan fungsional

| ID | Fitur | Kriteria penerimaan |
| --- | --- | --- |
| FR-01 | Responsive header | Menu desktop/mobile menuju route yang ada; fokus dan aria benar |
| FR-02 | Hero & CTA | CTA ke URL internal benar; foto menggunakan aset berizin |
| FR-03 | Profil | Sejarah/visi/misi/tujuan bisa dibaca dalam hierarki semantik; tidak mengubah kebijakan |
| FR-04 | Akademik | Konten dan media akademik ditarik dari halaman/fields WordPress yang terverifikasi, bukan data lokal fiktif |
| FR-05 | Fasilitas | Grid responsif; alt text dan fallback untuk media yang hilang |
| FR-06 | Ekstrakurikuler | Ketiga kegiatan teramati tampil; tidak menambahkan jadwal fiktif |
| FR-07 | Arsip berita | Item berjudul, tanggal, cuplikan, gambar opsional; tidak link ke slug yang belum diinventarisasi |
| FR-08 | Detail berita | Route root slug yang whitelist; metadata per artikel; long-form typography; 404 untuk slug lain |
| FR-09 | Footer | Alamat/jam/email benar; no dead link; telepon tidak dibuat-buat |
| FR-10 | SEO teknis | metadata, canonical, OG, sitemap, robots, breadcrumb schema, JSON-LD valid yang didukung data |
| FR-11 | State UI | 404, no-results/empty, media fallback dan error state tidak mengklaim konten tidak ada |
| FR-12 | Privacy | Tidak mengumpulkan data pengguna di fase prototype; foto siswa memerlukan persetujuan |

## 9. Arah visual & design system — **MODERN ISLAMIC ELEGANT (DIPILIH)**

**Keputusan pemilik produk:** konsep visual *Modern Islamic Elegant* dan fokus homepage *Profil & Informasi Sekolah yang seimbang* telah dipilih. Identitas resmi/logo masih menunggu aset sekolah. Semua detail UI, token dan wireframe berada di [`DESIGN_BLUEPRINT.md`](./DESIGN_BLUEPRINT.md).

**Arah:** suasana tenang, bersih, profesional, hangat, nilai Islam ditampilkan halus (ornamen geometri minimal), dominasi foto asli sekolah, whitespace dan hierarki jelas. **Hindari** decorative Islamic clichés, gradient emas berlebih, slider autoplay, dan statistik tidak valid.

**Palet proposal:** Emerald `#103F35`, Gold `#BC9954` (aksen saja), Ivory `#FAF9F6`, Sage `#E9F2EE`, Ink `#192B27`, Muted `#52615A`. Putih di atas Emerald berkontras ~11,77:1; Gold di atas putih ~2,68:1 sehingga dilarang dipakai untuk teks normal. Warna final disesuaikan setelah logo resmi diberikan.

**Tipografi:** Plus Jakarta Sans sebagai font utama dan fallback sistem; teks body minimum 16px; artikel 65–75 karakter per baris. Arabic-specific fonts hanya untuk teks Arab yang benar dan disetujui.

**Layout:** max-width 1200–1240px, mobile-first; 1 kolom di mobile, 2 pada konten yang cocok di tablet, grid editorial 12 kolom di desktop. Tombol sentuh minimal 44px; section spacing mobile ~48–56px dan desktop ~80–96px.

**Homepage:** Header → Hero edukasi sekolah & dayah → 3 nilai utama → Dua jalur pembelajaran → Sambutan kepala sekolah → Fasilitas → Ekstrakurikuler → Berita → Kontak → Footer. Foto sekolah asli dan izin penggunaan wajib. CTA utama `Kenali Sekolah` (`/tentang-kami/`) dan `Program Akademik` (`/akademik/`). Hero copy perlu persetujuan editor.

**Menu P0 usulan:** Beranda | Profil | Akademik | Fasilitas | Ekstrakurikuler | Berita. Mobile nav memakai accessible drawer/panel, bukan menu palsu. Footer menampung identitas, navigasi, alamat, jam, dan kontak yang sudah diverifikasi.

**Status keputusan:** Pilihan tema **disetujui**; detail visual & konten **masih untuk review**; tidak ada izin memulai coding.

## 10. Arsitektur teknis frontend

- **Next.js App Router** dengan TypeScript strict.
- **Tailwind CSS** untuk styling dan design tokens.
- React Server Components sebagai default; `use client` hanya untuk menu/interaksi yang perlu.
- Buat interface/repository typed seperti `getNewsList`, `getNewsBySlug`, `getPageBySlug`, `getMedia` yang memakai WordPress REST API aktual, **bukan** array data lokal/mock.
- Gunakan `next/image` untuk image pipeline yang cocok dengan lingkungan deployment; untuk media legacy yang masih eksternal, konfigurasi hostname setelah tervalidasi.
- `next/font` atau alternatif local/system yang legal dan optimal; tidak menyimpan file font tidak berlisensi.
- `next/link`, metadata API, `generateMetadata` untuk berita, `sitemap.ts`, `robots.ts` jika sesuai kondisi deploy.
- Server-side fetch WordPress pada App Router; cache/revalidation diatur eksplisit. Build/prerender tidak boleh secara diam-diam menerbitkan data kosong ketika WordPress tidak tersedia.
- Hindari dependency UI besar tanpa alasan, DOM manipulation, `any`, dan client-side fetch untuk konten statis.
- **Routing artikel:** `app/[slug]/page.tsx` untuk root article slug; resolve berdasarkan slug API runtime sehingga berita baru muncul tanpa update daftar manual; pastikan static routes prioritas dan hindari slug collision.

### Struktur direktori yang direncanakan

```text
src/
  app/
    layout.tsx
    page.tsx
    tentang-kami/page.tsx
    akademik/page.tsx
    fasilitas/page.tsx
    ekstrakurikuler/page.tsx
    berita/page.tsx
    [slug]/page.tsx
    not-found.tsx
    sitemap.ts
    robots.ts
  components/
    layout/
    home/
    common/
    news/
  lib/
    wordpress/             # klien, skema, adapter, pemetaan media, server-only
    seo.ts
    url-manifest.ts        # aturan URL legacy, bukan daftar berita hardcoded
  config/                  # token desain, label UI non-editorial (bukan data mock)
  types/
  styles/
public/
  brand/   # hanya asset branding resmi jika diizinkan; foto/berita dari WP
```

**Jangan buat struktur ini sekarang:** Ini desain implementasi untuk persetujuan.

## 11. Strategi konten dan tata kelola

- Bentuk `Content Inventory` berisi URL legacy, tipe, H1, title, description, sumber, tanggal verifikasi, status media, status persetujuan.
- Seluruh konten produksi berasal dari WordPress existing. Wireframe dapat memakai *slot visual kosong*, tetapi UI hasil coding **tidak boleh** memakai ringkasan, berita, foto, angka, atau data mock.
- Pertahankan nama, gelar, tanggal, konteks Dayah vs SMP; tim sekolah melakukan sign-off.
- Informasi aktual perlu dicek: kepala sekolah, daftar pengelola, jumlah siswa/staf/lulusan/prestasi, akreditasi, kurikulum, program, kontak, jam kerja.
- Foto siswa harus memiliki hak pakai dan persetujuan yang tepat; metadata EXIF sensitif dibersihkan sebelum publikasi.
- Berita dari legacy harus dipetakan satu per satu sebelum cutover dan diuji untuk broken links.

## 12. SEO dan preservasi migrasi

- URL dan canonical: gunakan origin resmi `https://www.smpinshafuddin.sch.id` sampai sekolah menetapkan canonical host lain. Pilih **satu** host canonical dan redirect `www/non-www` dengan kebijakan hosting.
- Titles/descriptions unik per halaman; OG/Twitter preview, `lang="id"`.
- Structured data `School`/`EducationalOrganization` dan `Article`/`BreadcrumbList` hanya dengan properti yang sah.
- `sitemap.xml`, `robots.txt`; jangan membuka indexing staging; pastikan production tidak `noindex`.
- Semua URL artikel lama: pilih path yang sama atau 301/308 yang sudah disahkan; jangan redirect massal ke homepage.
- Simpan dokumentasi canonical/redirect/link internal dan gambar di manifest migrasi.
- Sebelum live, simpan snapshot GSC, indexed URLs, title/meta, halaman dengan traffic organik dan halaman backlink.

## 13. Aksesibilitas, keamanan dan performa

- Kontras >=4.5:1 untuk teks normal, focus visible, keyboard reachable, skip link.
- Image width/height / aspect ratio konsisten untuk cegah CLS; compress AVIF/WebP tanpa mengorbankan kualitas.
- `alt` informatif untuk gambar bermakna; `alt=""` untuk dekorasi.
- Jangan expose secrets/env sensitif; konsumsi WordPress server-side adalah integrasi wajib, bukan backend baru. Jangan memberikan token WordPress ke client bundle.
- Hindari form data pribadi sampai tersedia privacy review dan backend resmi.
- Pastikan build berjalan dengan `lint`, `typecheck`, `build`, test. UI mobile diuji di 320/375/390/768/1024/1440px.

## 14. Tahapan kerja dan deliverable

| Fase | Aktivitas | Deliverable | Gerbang keputusan |
| --- | --- | --- | --- |
| 0 — Discovery | Audit URL/menu/footer/media; kumpulkan brand assets dan persetujuan | `AUDIT_LEGACY.md`, inventaris URL lengkap | Daftar URL dan konten diverifikasi |
| 1 — UX | Sitemap usulan, wireframe dan moodboard, design tokens | Review prototype visual | Sekolah/setuju arah desain |
| 2 — Foundation | Setup App Router TS Tailwind; typed WordPress REST adapter dan layout/navigation/footer berdasar API yang tersedia | Frontend skeleton terintegrasi data asli | API & build/QA dasar lulus |
| 3 — Pages | Home, profil, akademik, fasilitas, ekstra, berita, artikel memakai data + media WordPress | Semua route prioritas | Tidak ada artikel/foto mock; responsivitas lulus |
| 4 — Quality | SEO, accessibility, media, tests, performance | Hasil audit & perbaikan | Acceptance criteria terpenuhi |
| 5 — Handoff | Dokumentasi, manifest URL & daftar pekerjaan integrasi nanti | README/AGENTS/test report | Persetujuan sebelum cutover |

Fase 0 dan 1 harus tuntas **sebelum** mengubah website produksi. Timeline kalender belum ditetapkan.

## 15. Risiko, asumsi, keputusan tertunda

| Risiko | Mitigasi |
| --- | --- |
| Menu/header asli belum terinspeksi | Validasi menggunakan akses CMS/screenshot/crawl sebelum finalisasi IA |
| Belum semua URL ditemukan | Ekspor sitemap/CMS/GSC dan lakukan URL reconciliation |
| Konten usang atau typo | Workflow editorial approval, bukan AI silent rewrite |
| Telepon footer tidak lengkap | Hilangkan tel link sampai nomor resmi tersedia |
| Angka statistik 0+ | Nonaktifkan statistik tanpa data sah |
| Foto siswa/izin | Gunakan hanya media WordPress yang berizin; jika tidak tersedia, hilangkan gambar/section, tanpa ilustrasi/gambar pengganti fiktif |
| Pendaftaran belum tersedia | Tidak membuat tombol mati/form palsu |
| Berita berkonteks Dayah/SMA | Klarifikasi atribut organisasi & label tanpa mengubah isi |
| Dynamic route konflik | Resolve slug dari API WordPress dan uji seluruh static routes + permalink lama |
| SEO turun saat migrasi | Pertahankan path, map redirects, uji canonical, sitemap, dan Search Console |

## 16. Pertanyaan keputusan pemilik produk

1. **SUDAH DIPUTUSKAN:** WordPress existing tetap menjadi CMS/sumber data read-only untuk frontend; **tanpa mock artikel, mock data, atau mock gambar**. Yang perlu diverifikasi adalah endpoint REST publik dan struktur payload.
2. Apakah **struktur menu enam item** yang diusulkan diterima, atau sekolah mempunyai menu/submenu tambahan?
3. Apakah tersedia **logo, warna resmi, foto sekolah, dan gambar kegiatan** yang boleh digunakan?
4. Apakah ada **informasi pendaftaran siswa (SPMB/PPDB)** resmi beserta tautan yang perlu ditonjolkan?
5. Apakah sekolah akan menyediakan **kontak, sosial, statistik, dan nama/jabatan pengelola** yang telah diperbarui?

**Status:** Tema Modern Islamic Elegant, fokus homepage seimbang, dan sumber data WordPress REST **sudah dipilih**. Masih menunggu validasi aset, kontak/akreditasi dan detail IA/copy, serta perintah eksplisit sebelum memulai coding.

## 17. Validasi konten resmi yang belum sinkron

- Legacy menampilkan `smp.inshafuddinbna@gmail.com` dan telepon tidak lengkap `(0651)`, sedangkan portal Kemendikdasmen menampilkan `smp.inshafuddin@gmail.com` serta `065132089`. Jangan mengganti/menggabungkan tanpa konfirmasi.
- Direktori Kemendikdasmen yang diperiksa menunjukkan akreditasi **A**, sementara sumber lain menunjukkan **B**; pastikan keputusan berdasarkan sertifikat berlaku dan persetujuan sekolah.
- Ejaan alamat dan nama jalan bervariasi. Tampilkan alamat resmi yang telah dikonfirmasi; tautan maps dapat dibuat setelah verifikasi.
- Foto dari sumber berita eksternal Dayah Inshafuddin boleh sebagai referensi internal, tidak boleh dipasang langsung tanpa izin.

## 18. Referensi teknis

- Next.js Metadata & OG: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
- Next.js Dynamic metadata: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- Google Core Web Vitals: https://developers.google.com/search/docs/appearance/core-web-vitals?hl=id
- Audit legacy: [`AUDIT_LEGACY.md`](./AUDIT_LEGACY.md)

- Blueprint desain: [`DESIGN_BLUEPRINT.md`](./DESIGN_BLUEPRINT.md)
- Portal sekolah Kemendikdasmen: https://referensi.data.kemendikdasmen.go.id/pendidikan/npsn/10105419


## 19. Keputusan UX-02 — Homepage Profil & Informasi Sekolah yang Seimbang

**Ditetapkan pengguna pada 28 Oktober 2026:** homepage mengutamakan penyajian profil dan informasi sekolah yang **seimbang**, bukan portal berita maupun fokus tunggal pendaftaran. Tema **Modern Islamic Elegant** tetap berlaku.

### Hirarki final untuk tahap wireframe

1. Header dan navigasi 6 item (menu usulan).
2. Hero identitas sekolah, satu foto asli, dua CTA ke Profil dan Akademik.
3. Sekilas Sekolah: Karakter & Akhlak, Pendidikan Sekolah, Pendidikan Dayah.
4. Program Pendidikan: dua panel Sekolah dan Dayah.
5. Sambutan Kepala Sekolah setelah verifikasi.
6. Preview fasilitas tiga item.
7. Preview kegiatan siswa tiga item.
8. Berita & Kegiatan Sekolah tiga artikel relevan dan terverifikasi.
9. Kontak resmi dan footer.

**Perubahan terhadap versi 0.2:** susunan Program Pendidikan dan Sambutan diseragamkan agar pendidikan tampil lebih dahulu. Statistik numerik tetap tidak ditampilkan tanpa data sah. Pusat daftar berita tidak menjadi hero. CTA pendaftaran tidak dibuat tanpa prosedur resmi. Spesifikasi penempatan, copy, media/fallback, responsivitas, state, dan acceptance ada di [`WIREFRAME_SPEC.md`](./WIREFRAME_SPEC.md).

### Kriteria penerimaan tahap perencanaan

- [x] Arah visual dipilih.
- [x] Fokus informasi beranda disepakati.
- [x] Wireframe desktop/mobile, konten, CTA, dan fallback diusulkan.
- [ ] Periksa dan setujui urutan section serta 6 menu.
- [ ] Konfirmasi redaksi H1 dan 2 CTA.
- [ ] Verifikasi aset resmi/izin foto, identitas kepala sekolah, kontak & akreditasi.
- [ ] Lakukan inventaris URL total sebelum pemindahan dari CMS lama.
- [ ] Setelah desain review selesai, pemilik memberikan **perintah baru memulai coding** jika diinginkan.

**Scope tetap:** frontend Next.js publik + pembacaan REST API WordPress existing; tanpa backend/CMS baru. Tidak ada kode, repo, dependensi, API, database, atau UI yang telah diimplementasikan pada pembaruan dokumen ini.


## 20. ADR H-01 — Headless WordPress Live, Tanpa Mock Content (28 Oktober 2026)

**Keputusan langsung pemilik** menggantikan seluruh rencana data lokal/mock pada dokumen versi sebelumnya. Rincian endpoint, pemetaan UI–WP, media, caching, failure mode, SEO, hosting dan checklist ada di [`HEADLESS_WORDPRESS_PLAN.md`](./HEADLESS_WORDPRESS_PLAN.md).

### Perubahan acceptance produk

| ID | Kebutuhan wajib | Acceptance |
| --- | --- | --- |
| HFR-01 | WordPress existing jadi source of truth | Tidak ada CMS baru, Next fetch GET publik dari REST WordPress dengan adapter server-side typed |
| HFR-02 | Berita/artikel nyata | Arsip dan detail berasal dari `posts` WP: slug, title, excerpt/content, tanggal, author, kategori, featured media aktual |
| HFR-03 | Halaman sekolah nyata | Profil, akademik, fasilitas dan ekstrakurikuler dari `pages` WP + field/media yang memang diekspos |
| HFR-04 | Gambar dan file asli | Foto hero/fasilitas/berita/galeri dan tautan berkas berasal dari Media Library atau URL resmi yang tervalidasi; tidak ada dummy/fake/stok |
| HFR-05 | Tidak mengarang header/footer | Sumber navigasi/kontak/footer via WP API bila tersedia; butuh keputusan field exposure apabila tidak ada endpoint |
| HFR-06 | Cache terkendali | Waktu revalidation sesuai konten; failure mode terukur; konten baru tampil setelah refresh, bukan menunggu redeploy manual |
| HFR-07 | SEO dan route lama | Slug artikel root tetap, canonical frontend, sitemap dari konten published, handling media/origin setelah cutover |
| HFR-08 | Security dan konten | Hanya `publish` untuk publik; validasi struktur JSON, sanitasi HTML, tidak bocorkan secret/preview/draft |
| HFR-09 | No build dummy | API error tidak dikonversi menjadi konten palsu atau hasil produksi yang seolah valid |

### Open decisions (bukan coding block untuk kegiatan perencanaan)

1. Apakah WordPress saat cutover berada pada subdomain CMS atau lewat reverse proxy `wp-json/wp-content/uploads/wp-admin` di host publik yang sama?
2. Apakah WordPress current REST mengekspos fields untuk hero, logo, menu, footer, profil guru dan fasilitas, atau memerlukan custom fields REST?
3. Apakah perlu pembaruan mendekati instan via webhook, atau time-based revalidation (proposal 5 menit berita / 60 menit halaman) sudah memadai?

**Status:** konsep UI/UX sudah dipilih, sumber data live WordPress sudah dipilih; **akses endpoint API dan detail hosting belum terverifikasi, dan belum ada izin coding**.
