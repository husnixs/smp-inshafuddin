# AGENTS.md — Instruksi Wajib untuk AI Coding Agent

**Project:** SMP Inshafuddin Banda Aceh — Frontend Redesign  
**Tahap sekarang:** UI/UX planning — **Modern Islamic Elegant** + homepage **Profil & Informasi Sekolah yang seimbang** dipilih, **belum ada izin implementasi**  
**Baca terlebih dahulu:** `PRD.md`, `HEADLESS_WORDPRESS_PLAN.md`, `WIREFRAME_SPEC.md`, `DESIGN_BLUEPRINT.md`, `AUDIT_LEGACY.md`, `README.md`.

## 1. Peran

Bertindak sebagai **Senior Frontend Engineer + UI/UX Designer + Technical SEO Engineer**. Bekerja berdasarkan bukti, menjaga nama/identitas/URL asli sekolah, menghasilkan frontend Next.js yang ringan, konsisten, dan dapat di-maintain.

## 2. Guardrail mutlak

1. **JANGAN memulai coding, scaffolding, menambah dependency, atau memodifikasi project hingga pemilik produk memberi perintah implementasi eksplisit.**
2. Fokus **frontend publik saja**. Gunakan WordPress existing sebagai backend/CMS eksternal read-only; DILARANG membuat backend, database, admin, CMS baru, login, autentikasi, layanan form pendaftaran, atau pembayaran. Integrasi konsumsi REST API WordPress adalah scope yang secara eksplisit disetujui.
3. **JANGAN MENEBak:** URL, slug berita, menu header legacy, nomor telepon, media sosial, angka siswa/guru/prestasi, logo, kurikulum terbaru, nama/jabatan, tautan PPDB, akreditasi, atau foto siswa.
4. Jika data tak tersedia, tulis `TBD / perlu verifikasi`, sertakan dampak dan opsi aman. **DILARANG membuat konten dummy/mock, fake berita, data hardcoded pengganti CMS, dan stock/AI image pengganti gambar sekolah.** Bila data belum tersedia dari API, nyatakan gap dan hilangkan section/pakai empty state non-fiktif yang sesuai, jangan pura-pura konten tersedia.
5. **Pertahankan semua URL legacy yang sudah diverifikasi.** Artikel yang teramati berada di root slug: `/contoh-slug/`, bukan otomatis `/berita/contoh-slug/`.
6. Jangan mengubah URL, title, sejarah, visi, misi, tujuan, kutipan, tanggal, nama, gelar, maupun konteks berita tanpa persetujuan editorial.
7. Jangan menyatakan *audit lengkap*, *live metrics*, *real-time data*, atau *seluruh menu* bila tidak memiliki bukti.
8. Jangan mempublikasikan aset orang terutama siswa yang belum mendapat izin. Jangan gunakan stok foto yang seolah menggambarkan sekolah nyata.
9. JANGAN menempatkan secret, token API, atau data pribadi di repository atau client bundle.
10. Jangan mengubah site production/canonical/DNS/redirect hingga sudah ada migration manifest dan persetujuan cutover.
11. **Patuhi konsep terpilih Modern Islamic Elegant:** jangan menggantinya dengan tema minimalis generik atau tema academic navy tanpa perintah pemilik. Proposal token di `DESIGN_BLUEPRINT.md` untuk review; logo/brand resmi dapat menuntut penyesuaian.
12. **Konflik data resmi:** email/telepon dan akreditasi antara legacy, direktori pemerintah, dan portal lain belum sinkron. Jangan memilih salah satu secara otomatis sebelum persetujuan sekolah.

## 3. Aturan sumber kebenaran (priority order)

1. Pernyataan eksplisit terbaru pemilik produk.
2. Dokumen proyek yang telah disetujui (`PRD.md`, inventaris URL/konten yang diverifikasi).
3. Data publik dari WordPress REST API live (setelah endpoint diverifikasi), ekspor resmi CMS, screenshot asli, aset asli berizin, atau data resmi sekolah.
4. Temuan audit indeks legacy — **terbatas, tidak sepenuhnya terverifikasi**.
5. Hipotesis/desain usulan AI — selalu berlabel *usulan*.

**Keputusan yang sudah ada:** arah visual Modern Islamic Elegant **dan fokus homepage seimbang**. Nilai hex, headline hero, persetujuan detail 9 bagian, fitur ekstra, dan file aset masih berupa proposal review.

Jika ada konflik, berhenti pada bagian tersebut dan daftar pertanyaan spesifik; lanjutkan bagian lain yang aman setelah izin implementasi diberikan.

## 4. Aturan stack saat coding diizinkan

- Next.js App Router + TypeScript strict + Tailwind CSS.
- Gunakan project existing jika tersedia; cek `package.json`, lockfile, versi framework, dan konvensi direktori sebelum membuat perubahan.
- React Server Components default. `use client` hanya jika interaksi browser dibutuhkan.
- Komponen reusable, tipe kuat, file pendek dan single responsibility; tidak perlu overengineering.
- **Sumber seluruh konten editorial = WordPress REST API.** Akses melalui fungsi server-only `src/lib/wordpress/` atau abstraksi typed setara; jangan memuat fake array berita, data sekolah, daftar media, atau mock HTML. Konfigurasi desain statis dan string UI non-editorial tetap boleh.
- Query publik read-only; fetch utama dari server Next.js (bukan client browser), schema-validate respon, tangani timeout/404/5xx dan paginasi.
- API URL, gambar dan metadata nyata harus diverifikasi; CORS browser tidak diperlukan untuk server-side fetch.
- Cache dengan revalidate sesuai konten; gunakan invalidasi terkontrol bila webhook resmi sudah disetujui.
- Featured media bisa dari `featured_media`, `/_embedded`, atau endpoint media; jangan asumsikan gambar hero/halaman disimpan sebagai featured image.
- Header/footer dari WordPress REST jika tersedia; jika tidak, laporkan kekurangan kontrak dan pilih alternatif yang disetujui, **tanpa menebak**.
- Tidak ada hardcoded URL eksternal yang belum tervalidasi.
- Hindari `any`, hidden side effects, carousel autoplay, animasi berat, library besar tanpa nilai jelas.
- Gunakan semantic HTML, `next/image`, `next/link`, Next.js Metadata API.
- Gunakan slug **yang benar-benar ada di WP**, root dynamic `[slug]` resolving via REST pada runtime (dengan route statis prioritas), `notFound()` untuk slug tidak ditemukan/privat, bukan whitelist berita manual yang perlu diubah ketika WordPress menerbitkan artikel baru.
- Perhatikan kebijakan trailing slash, canonical origin, dan preservasi permalink lama.
- Buat `not-found.tsx` dan state kosong yang informatif; tidak ada tombol dummy.

## 5. Route manifest P0 (terverifikasi dari indeks)

```text
/
/tentang-kami/
/akademik/
/fasilitas/
/ekstrakurikuler/
/berita/
/satuan-pendidikan-aman-bencana-langkah-nyata-smp-inshafuddin-banda-aceh-melindungi-siswa-baru/
```

**Catatan:** Daftar belum lengkap. Tambahkan halaman/pagination/author/taxonomy setelah sumber resmi mengonfirmasi. Jangan berpura-pura telah mencrawl semua URL.

## 6. Workflow kerja agent

### Saat planning (sekarang)

1. Baca dokumen.
2. Bandingkan daftar konten dan halaman yang tersedia dengan `AUDIT_LEGACY.md`.
3. Buat daftar gap, risk, asumsi, dan pertanyaan keputusan kepada pemilik.
4. Ajukan arsitektur informasi, wireframe, dan design token sebagai **proposal**.
5. **Berhenti tanpa menulis kode sampai ada approval**.

### Setelah perintah implementasi eksplisit

1. Inspect repository dan environment; rangkum kondisi existing.
2. Implementasi dasar: design system, layout, navigation, footer.
3. Implementasi adapter WordPress typed server-side, pengecekan endpoint live, lalu halaman P0. Semua materi yang tampil bersumber dari WordPress published content dan media asli.
4. Implementasi berita + route legacy yang diverifikasi.
5. Metadata, robots/sitemap, accessibility, responsive QA.
6. Jalankan dan laporkan lint, typecheck, build, test; jika gagal, tunjukkan error sebenarnya.
7. Tulis daftar file diubah, cara test, risiko tersisa, dan apa yang belum diimplementasikan.

## 7. Definition of Done per halaman

- [ ] URL dan canonical sesuai manifest.
- [ ] H1 tunggal semantik, title dan description unik.
- [ ] Konten dari WordPress published API, tidak ada data fake, tidak ada gambar mock atau berita mock.
- [ ] Mobile 320px–desktop, tanpa horizontal overflow.
- [ ] Navigasi keyboard dan focus visible.
- [ ] Gambar berizin, `alt` tepat, dimensi/aspect-ratio untuk cegah CLS.
- [ ] Link dan tombol berfungsi; tidak ada `href="#"` sebagai placeholder interaktif.
- [ ] Article links hanya menunjuk slug yang diketahui dan dipetakan.
- [ ] Tidak ada error TypeScript, lint, build, atau console browser.
- [ ] Test E2E minimal pada homepage, navigation, berita, detail artikel, 404.

## 8. Quality gate final dan pelaporan

Lakukan test pada viewport 320, 375, 390, 768, 1024, 1440 px. Target Lighthouse >=90 pada kategori utama; Core Web Vitals LCP <=2.5s, INP <=200ms, CLS <=0.1 (data lapangan saat tersedia). Ini **target**, bukan klaim pengukuran yang telah selesai.

Format laporan tiap milestone:

```md
## Selesai
- [fitur, file/path yang benar-benar telah dibuat]
## Diuji
- [perintah + hasil nyata, jangan fiktif]
## Temuan
- [risiko/perbedaan terhadap PRD]
## Menunggu persetujuan
- [pertanyaan spesifik, dampak, default aman]
```

## 9. Ketentuan editorial & kontak

- Nama kepala sekolah di indeks: Warnidah, S.Pd.I, **konfirmasi sebelum publikasi**.
- Statistik legacy terindeks sebagai `0+` — jangan publikasi angka nol tanpa verifikasi.
- Nomor footer terindeks `(0651)` — tidak lengkap, jangan buat `tel:`.
- Email terindeks `smp.inshafuddinbna@gmail.com` — konfirmasi pengelola sebelum produksi.
- Informasi sekolah dan berita Dayah/SMA harus dibedakan secara akurat.

## 10. Yang dilarang dalam output

- Frasa seperti “sudah diverifikasi seluruh menu/URL” tanpa crawl penuh.
- Membuat fake navigasi `PPDB`, `Kontak` atau `Galeri` seolah URL legacy yang ada.
- Mengganti permalink artikel root secara diam-diam.
- Menambah data statistik, prestasi, atau testimoni tidak bersumber.
- Membuat implementasi backend atau admin karena asumsi pribadi.

**Prinsip kerja:** Bila informasi belum tersedia, **jangan menebak — tandai TBD dan pilih fallback yang aman**, sembari tetap melanjutkan bagian lain yang dapat dikerjakan sesuai perintah dan scope.


## 11. Keputusan fokus Homepage UX-02 (28 Oktober 2026)

Pemilik produk memilih fokus **Profil & Informasi Sekolah yang seimbang**. Agent wajib:

1. Menjadikan `WIREFRAME_SPEC.md` sumber utama urutan 9 bagian dan kontrak section; jika narasi lain berbeda, laporkan konflik, ikuti keputusan teranyar pengguna.
2. Saat masih dalam tahap perencanaan, hanya menyusun opsi desain, wireframe, konten/microcopy, daftar aset, dan checklist. **Tidak menulis kode, menjalankan scaffold, memasang dependency, atau mengubah produksi.**
3. Menempatkan konteks sekolah dan dua pendekatan pendidikan sebelum preview berita; maksimal 3 kartu untuk fasilitas, ekstrakurikuler, dan berita pada homepage.
4. Menggunakan link CTA `Kenali Sekolah` → `/tentang-kami/` dan `Program Akademik` → `/akademik/` sebagai **usulan**. Tidak membuat CTA PPDB palsu.
5. Mengecualikan statistik yang tidak valid, foto siswa tanpa izin, akreditasi yang belum disahkan, sosial/kontak yang belum terverifikasi.
6. Menandai **teks hero sebagai copy editorial usulan**, bukan slogan sekolah.
7. Memilah berita terkait SMP agar tidak mengatribusikan prestasi SMA/Dayah kepada SMP; tetap menjaga semua konten lama ketika migrasi nanti.
8. Menunggu izin eksplisit terpisah sebelum implementasi; keputusan arah desain **bukan** izin coding.


## 12. ADR H-01 — WordPress Headless sebagai Sumber Kebenaran (28 Oktober 2026)

**Menggantikan seluruh ketentuan lama yang menyebut `data lokal`, `mock`, `fake image`, `future integration`, dan `static-only`.** Baca `HEADLESS_WORDPRESS_PLAN.md` sebagai kontrak integrasi.

1. **JANGAN membuat atau menampilkan** fixture berita, halaman profil palsu, mock foto, feed berita buatan, data statistik dummy, atau foto stok/AI untuk sekolah. Tidak boleh fallback yang terlihat seolah data produksi.
2. **Semua konten/editorial/media bersumber dari REST API WordPress existing**, yang terhubung server-side. String UI (nama tombol, label menu desain, token warna) bukan data editorial, namun menu aktual jangan diklaim dari WP tanpa audit.
3. **Jangan menganggap API sudah berfungsi.** Akses JSON live belum berhasil diverifikasi dari sesi audit; sebelum coding uji `/wp-json/`, `/wp/v2/posts`, `/pages`, `/media` dari lokasi jaringan yang bisa menjangkau server.
4. Jika bagian hero, menu, footer, atau blok page builder tidak terpapar di WP REST, **catat missing field** lalu minta keputusan untuk exposure REST/meta/plugin WordPress; jangan mengubah CMS diam-diam.
5. Buat adapter typed dan pagination; resolve artikel root slug langsung dari endpoint WordPress. Render detail memakai status published; draf/privat tidak ditampilkan.
6. Gunakan media WP (featured image, size, alt, caption) asli; kosong berarti text-only/hide image, bukan mock image.
7. Tentukan dan uji strategi caching/revalidation, canonical public host, cutover WP (`cms` subdomain vs reverse-proxy path), remote media host, security sanitasi HTML, 404 dan kegagalan fetch.
8. Beranda boleh memiliki komposisi kartu sesuai `WIREFRAME_SPEC.md`, tapi isi kartu wajib diambil dari data aktual. Bagian tanpa konten WP cukup disembunyikan atau disusun ulang setelah review.
9. **Belum ada izin coding.** File ini adalah requirement untuk agent setelah perintah implementasi eksplisit.
