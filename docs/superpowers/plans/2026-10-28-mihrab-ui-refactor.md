# Refactor UI "Mihrab sebagai Sistem" — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mengganti ornamen tempelan dengan bahasa bentuk lengkung mihrab yang konsisten di seluruh halaman publik, tanpa mengubah palet, font, konten, route, SEO, atau adapter WordPress.

**Architecture:** Tiga primitif presentasional baru (`MihrabFrame`, `ArchDivider`, `MihrabMark`) + dua utility CSS (`.arch-top`, `.arch-top-sm`) menjadi fondasi. Setiap task berikutnya mengganti pemakaian `GirihPattern`/`StarMark`/`frame-arch`/`rounded-hero` di satu area dengan primitif tersebut. Semua komponen tetap Server Component kecuali yang sudah `use client`.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript strict, Tailwind CSS 3.4.

**Spec:** `docs/superpowers/specs/2026-10-28-mihrab-ui-refactor-design.md`

## Global Constraints

- Palet tetap: `brand.*`, `surface.*`, `ink.*`, `divider` di `tailwind.config.ts`. Tidak menambah warna.
- Teks emas di latar terang hanya `text-brand-gold-ink`; di latar emerald hanya `text-brand-gold-light`. `brand-gold` hanya untuk garis/ornamen.
- Font tetap Fraunces (`font-display`) + Plus Jakarta Sans (`font-sans`).
- **Tidak ada teks Arab** dalam bentuk apa pun.
- Tidak mengubah copy, data, route, metadata SEO, JSON-LD, atau `src/lib/wordpress/*`.
- Tidak menambah dependency (termasuk ESLint/Playwright).
- Motion hanya hover/focus; tanpa animasi loop.
- Girih akhir hanya di `Footer.tsx` dan `PageHero.tsx`. `StarMark` dihapus total.
- Radius: `control` 12px tetap; `card` 16px → **10px**; `hero` 24px hanya untuk blok kontak dan gambar utama artikel.
- `.arch-top` = `border-radius: 160px 160px 10px 10px`; `.arch-top-sm` = `border-radius: 9999px 9999px 4px 4px`.

**Catatan verifikasi:** proyek tidak punya test runner dan ESLint tidak terpasang (`npm run lint` akan meminta setup interaktif — jangan jalankan setup itu; laporkan sebagai tidak tersedia). Bukti tiap task: `npm run typecheck` + assertion `grep` + cek visual di browser pane (`npm run dev`, port 3000). Build penuh di Task 11.

## Review Focus

1. **Lebar 320px** — bingkai mihrab hero dan panel `arch-top` tidak boleh memotong teks atau menimbulkan scroll horizontal; lengkung 160px pada panel sempit harus tetap terbaca (bukan lonjong menelan judul). Cek di Task 4, 5, 11.
2. **Judul berita panjang / artikel tanpa gambar** dari WordPress — kartu fallback `MihrabMark` tetap proporsional dan tinggi kartu seragam. Cek di Task 8.
3. **Focus ring terpotong** oleh `overflow-hidden` + `clip-path` pada elemen lengkung — link/tombol di dalam panel `arch-top` harus tetap menampilkan ring penuh. Cek di Task 5, 7.
4. **LCP hero** — `Image` di dalam `MihrabFrame` harus tetap `priority` dengan `sizes` benar; ukuran bingkai tidak bergeser saat gambar dimuat (CLS). Cek di Task 4.
5. **Drawer mobile setelah header jadi solid** — drawer tetap di atas konten, fokus kembali ke tombol pembuka saat ditutup, Escape menutup. Cek di Task 3.

---

### Task 1: Primitif bentuk & token

**Files:**
- Modify: `tailwind.config.ts` (`borderRadius.card`)
- Modify: `src/app/globals.css` (`@layer components`)
- Create: `src/components/ui/mihrab-path.ts`
- Create: `src/components/ui/MihrabFrame.tsx`
- Create: `src/components/ui/ArchDivider.tsx`
- Create: `src/components/ui/MihrabMark.tsx`

**Interfaces:**
- Produces:
  - `export const MIHRAB_PATH: string` — path dalam unit 0..1 (objectBoundingBox): `'M0 1V0.38C0 0.17 0.22 0.05 0.5 0C0.78 0.05 1 0.17 1 0.38V1Z'`
  - `MihrabFrame({ children: ReactNode; outline?: boolean; outlineTone?: 'light' | 'dark'; className?: string })` — `className` membawa rasio/ukuran (mis. `aspect-[4/5] w-full`). Anak diharapkan `next/image` `fill`.
  - `ArchDivider({ className?: string })` — SVG `aria-hidden` 40×12, `stroke="currentColor"`; pemanggil mengatur warna lewat `className` (mis. `text-brand-gold`).
  - `MihrabMark({ className?: string })` — SVG garis siluet mihrab, `viewBox="0 0 1 1"`, `preserveAspectRatio="none"`, stroke `currentColor` dengan `vectorEffect="non-scaling-stroke"`.
  - Class CSS `.arch-top`, `.arch-top-sm`.

- [ ] **Step 1: Ubah `borderRadius.card` di `tailwind.config.ts` dari `'16px'` ke `'10px'`.**

- [ ] **Step 2: Tambah `.arch-top` dan `.arch-top-sm` di `@layer components` `globals.css`** dengan nilai dari Global Constraints. Biarkan `.frame-arch` dulu (dihapus di Task 10).

- [ ] **Step 3: Buat `mihrab-path.ts`** berisi `MIHRAB_PATH` persis seperti di Interfaces.

- [ ] **Step 4: Buat `MihrabFrame.tsx`.** Pendekatan: `useId()` → id `clipPath` (sanitasi seperti `GirihPattern`), SVG 0×0 berisi `<clipPath clipPathUnits="objectBoundingBox"><path d={MIHRAB_PATH}/></clipPath>`, wrapper `relative overflow-hidden` dengan `style={{ clipPath: \`url(#id)\` }}` dan latar `bg-surface-sage`. Jika `outline`: SVG absolut `-inset-3` (sm: `-inset-4`) `aria-hidden`, `viewBox="0 0 1 1"` `preserveAspectRatio="none"`, path `MIHRAB_PATH` stroke `brand-gold` (`outlineTone='dark'` → `brand-gold-light`), `strokeWidth={1}` + `vectorEffect="non-scaling-stroke"`, `fill="none"`. Bukan client component.

- [ ] **Step 5: Buat `ArchDivider.tsx`** — garis horizontal kiri (x 0–14), lengkung kecil di tengah (x 14–26, puncak y 1, kaki y 11), garis kanan (x 26–40), semua di y 11; `strokeWidth={1.25}`, `fill="none"`.

- [ ] **Step 6: Buat `MihrabMark.tsx`** sesuai Interfaces.

- [ ] **Step 7: Verifikasi**

Run: `npm run typecheck`
Expected: exit 0, tanpa output error.

Run: `grep -n "arch-top" src/app/globals.css`
Expected: 2 baris (`.arch-top`, `.arch-top-sm`).

- [ ] **Step 8: Commit**

```bash
git add tailwind.config.ts src/app/globals.css src/components/ui/mihrab-path.ts src/components/ui/MihrabFrame.tsx src/components/ui/ArchDivider.tsx src/components/ui/MihrabMark.tsx
git commit -m "feat: primitif bentuk mihrab dan token arch-top"
```

---

### Task 2: SectionHeading & PageHero

**Files:**
- Modify: `src/components/ui/SectionHeading.tsx:2,48-51`
- Modify: `src/components/ui/PageHero.tsx`

**Interfaces:**
- Consumes: `ArchDivider` (Task 1).
- Produces: props `SectionHeading` dan `PageHero` tidak berubah.

- [ ] **Step 1: `SectionHeading`** — ganti `<StarMark …/>` di eyebrow dengan `<ArchDivider className="h-3 w-10 text-brand-gold" />`; hapus import `StarMark`.

- [ ] **Step 2: `PageHero`** — `header` jadi `bg-brand-emerald-deep` solid (hapus `bg-gradient-to-br …`); `GirihPattern` tetap; eyebrow pakai `ArchDivider` seperti Step 1; hapus `div` garis gradient emas di bawah, ganti `border-b border-brand-gold/40` pada `header`.

- [ ] **Step 3: Verifikasi**

Run: `npm run typecheck && grep -c "StarMark" src/components/ui/SectionHeading.tsx src/components/ui/PageHero.tsx`
Expected: typecheck lolos; kedua file `0`.

Visual (`npm run dev`): `/` dan `/akademik/` — eyebrow menampilkan garis-lengkung emas; PageHero tanpa gradient.

- [ ] **Step 4: Commit** — `git commit -m "refactor: eyebrow ArchDivider dan PageHero solid"` (add kedua file).

---

### Task 3: Header & navigasi

**Files:**
- Modify: `src/components/layout/Header.tsx:4,10,22`
- Modify: `src/components/layout/MobileNav.tsx:9,61,68`

- [ ] **Step 1: `Header`** — class `header`: hapus `backdrop-blur-md supports-[backdrop-filter]:bg-surface-white/80`, `bg-surface-white/90` → `bg-surface-white`. Hapus `StarMark` di pita identitas (+ import). `DesktopNav` tidak diubah (garis bawah emas rounded sudah sesuai spec).

- [ ] **Step 2: `MobileNav`** — overlay: hapus `backdrop-blur-sm`. Hapus `GirihPattern` di panel kepala drawer (+ import). Perbarui komentar portal (baris ~57) agar tidak lagi menyebut backdrop-filter sebagai alasan; portal tetap dipertahankan (menghindari stacking context `sticky` header).

- [ ] **Step 3: Verifikasi**

Run: `npm run typecheck && grep -c "backdrop-blur\|GirihPattern\|StarMark" src/components/layout/Header.tsx src/components/layout/MobileNav.tsx`
Expected: lolos; kedua file `0`.

Visual 375px: buka drawer → tampil di atas konten; Escape menutup; fokus kembali ke tombol hamburger (Review Focus 5).

- [ ] **Step 4: Commit** — `git commit -m "refactor: header solid dan drawer tanpa ornamen"`.

---

### Task 4: Hero beranda

**Files:**
- Modify: `src/components/home/HeroSection.tsx`

**Interfaces:**
- Consumes: `MihrabFrame` (Task 1).

- [ ] **Step 1: Hapus kedua `GirihPattern` dan import `GirihPattern`, `StarMark`.** Bidang emerald kanan desktop (`div` `w-[42%] bg-brand-emerald-deep`) tetap.

- [ ] **Step 2: H1** — pill badge (span `rounded-full border … shadow-card`) diganti `span` blok `mb-4 font-sans text-sm font-semibold tracking-wide text-brand-gold-ink` berisi `SMP Inshafuddin Banda Aceh` + `sr-only ":"`. Kalimat utama, deskripsi, CTA, `dl` tidak berubah.

- [ ] **Step 3: Gambar** — ganti `div` bingkai offset + `div rounded-hero aspect-[4/3] sm:aspect-[16/11]` dengan `<MihrabFrame outline outlineTone="dark" className="aspect-[4/5] w-full shadow-lift">` berisi `Image` yang sama (`fill`, `priority`, `object-cover`). Kolom kanan: `mx-auto w-full max-w-[22rem] sm:max-w-md lg:max-w-none`; `sizes="(max-width: 640px) 352px, (max-width: 1024px) 448px, 600px"`.

- [ ] **Step 4: Verifikasi**

Run: `npm run typecheck && grep -c "GirihPattern\|StarMark\|rounded-full" src/components/home/HeroSection.tsx`
Expected: lolos; `0`.

Visual 320/375/1024/1440: tanpa scroll horizontal; garis emas outline tidak terpotong; di 375px tombol `Kenali Sekolah` terlihat tanpa scroll melewati gambar (gambar di bawah teks di mobile). Network tab: gambar hero dimuat dengan `fetchpriority="high"` (Review Focus 1, 4).

- [ ] **Step 5: Commit** — `git commit -m "refactor: hero dengan bingkai mihrab, tanpa pill badge"`.

---

### Task 5: Tiga pilar & dua program

**Files:**
- Modify: `src/components/home/OverviewSection.tsx` (span ikon)
- Modify: `src/components/home/ProgramsSection.tsx`

- [ ] **Step 1: `OverviewSection`** — span ikon: `h-12 w-12 rounded-control` → `h-14 w-12 arch-top-sm items-end pb-2.5`; warna & hover tetap.

- [ ] **Step 2: `ProgramsSection`** — `article`: `rounded-hero` → `arch-top`; padding atas `pt-14 sm:pt-16` agar badge tidak masuk area lengkung. Hapus `GirihPattern` (+ import) dan `StarMark` (+ import); bullet jadi `<span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold" />`.

- [ ] **Step 3: Verifikasi**

Run: `npm run typecheck && grep -c "GirihPattern\|StarMark\|rounded-hero" src/components/home/ProgramsSection.tsx`
Expected: lolos; `0`.

Visual 320px: badge & judul panel tidak terpotong lengkung. Tab ke `ArrowLink` di panel Dayah: ring focus terlihat penuh (Review Focus 1, 3).

- [ ] **Step 4: Commit** — `git commit -m "refactor: pilar dan panel program berbentuk lengkung"`.

---

### Task 6: Sambutan kepala sekolah

**Files:**
- Modify: `src/components/home/WelcomeSection.tsx`

- [ ] **Step 1:** Blok: `bg-gradient-to-br from-… to-…` → `bg-brand-emerald`. Hapus `GirihPattern`, `div` blur orb, `StarMark` (eyebrow pakai `ArchDivider className="h-3 w-10 text-brand-gold"`); perbarui import.

- [ ] **Step 2:** Foto: ganti dua `div frame-arch` (outline + bingkai) dengan `<MihrabFrame outline outlineTone="dark" className="aspect-[3/4] w-full shadow-lift">` berisi `Image` + gradient bawah yang ada. `figcaption` tetap.

- [ ] **Step 3: Verifikasi**

Run: `npm run typecheck && grep -c "GirihPattern\|StarMark\|blur-3xl\|frame-arch\|bg-gradient-to-br" src/components/home/WelcomeSection.tsx`
Expected: lolos; `0`.

- [ ] **Step 4: Commit** — `git commit -m "refactor: sambutan solid dengan foto bingkai mihrab"`.

---

### Task 7: MediaCard, fasilitas, ekskul

**Files:**
- Modify: `src/components/ui/MediaCard.tsx`
- Modify: `src/components/home/FacilitiesPreview.tsx`

- [ ] **Step 1: `MediaCard`** — wadah gambar dibungkus padding `p-3 pb-0`, wadah gambar diberi `arch-top overflow-hidden`. Hapus span tag pill di atas foto; tampilkan `tag` sebagai `<p className="text-xs font-semibold uppercase tracking-wider text-brand-gold-ink">` tepat di atas `Heading`. Props tidak berubah (`aspectClass` tetap dipakai).

- [ ] **Step 2: `FacilitiesPreview`** — hapus destrukturisasi `featured/others` dan grid bento; render `FACILITIES.map` ke `grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8` dengan `imageSizes="(max-width: 768px) 100vw, 400px"`, tanpa `aspectClass`/`className` khusus. Hapus komentar "Bento".

- [ ] **Step 3: Verifikasi**

Run: `npm run typecheck && grep -c "backdrop-blur\|rounded-full" src/components/ui/MediaCard.tsx; grep -c "featured\|row-span" src/components/home/FacilitiesPreview.tsx`
Expected: lolos; `0` dan `0`.

Visual: `/`, `/fasilitas/`, `/ekstrakurikuler/` — kartu setara, lengkung foto rapi, ilustrasi SVG ekskul tidak terdistorsi.

- [ ] **Step 4: Commit** — `git commit -m "refactor: MediaCard foto lengkung, fasilitas grid setara"`.

---

### Task 8: Kartu berita

**Files:**
- Modify: `src/components/news/NewsCard.tsx:5-6,37-41`

**Interfaces:**
- Consumes: `MihrabMark` (Task 1).

- [ ] **Step 1:** Fallback tanpa gambar: hapus `GirihPattern` + `StarMark` (+ import); isi `div bg-brand-emerald` dengan `<MihrabMark className="h-16 w-12 text-brand-gold-light/70" />`.

- [ ] **Step 2: Verifikasi**

Run: `npm run typecheck && grep -c "GirihPattern\|StarMark" src/components/news/NewsCard.tsx`
Expected: lolos; `0`.

Visual `/berita/`: kartu dengan judul 3 baris dan kartu tanpa gambar sejajar tingginya dalam satu baris grid. Jika tidak ada post tanpa gambar dari API, sementara ubah kondisi lokal ke `false` untuk melihat fallback, lalu kembalikan sebelum commit (Review Focus 2).

- [ ] **Step 3: Commit** — `git commit -m "refactor: fallback kartu berita siluet mihrab"`.

---

### Task 9: Kontak & footer

**Files:**
- Modify: `src/components/home/ContactSection.tsx:5,45`
- Modify: `src/components/layout/Footer.tsx`
- Create: `src/components/ui/ArcadeBand.tsx`

**Interfaces:**
- Produces: `ArcadeBand({ className?: string })` — SVG `aria-hidden`, lebar 100%, tinggi 14px, `<pattern>` berulang tiap 28px berisi satu lengkung setengah lingkaran (stroke `currentColor`, `fill="none"`, `strokeWidth={1}`); `id` pattern dari `useId()`.

- [ ] **Step 1: `ContactSection`** — hapus `GirihPattern` + import.

- [ ] **Step 2: Buat `ArcadeBand.tsx`** sesuai Interfaces.

- [ ] **Step 3: `Footer`** — ganti `div` garis gradient emas dengan `<ArcadeBand className="relative text-brand-gold/40" />`; `FooterHeading` tanpa `StarMark` (+ import). `GirihPattern` tetap.

- [ ] **Step 4: Verifikasi**

Run: `npm run typecheck && grep -c "GirihPattern" src/components/home/ContactSection.tsx; grep -c "StarMark\|via-brand-gold" src/components/layout/Footer.tsx`
Expected: lolos; `0`; `0`.

- [ ] **Step 5: Commit** — `git commit -m "refactor: footer pita serambi, kontak tanpa girih"`.

---

### Task 10: Halaman dalam, 404, error, pembersihan

**Files:**
- Modify: `src/app/tentang-kami/page.tsx:10-11,111-115,133,161,184-185`
- Modify: `src/app/akademik/page.tsx:8-9,77,88-92` (+ bullet `StarMark` lain bila ada di file)
- Modify: `src/app/[slug]/page.tsx:11,57`
- Modify: `src/app/not-found.tsx`
- Modify: `src/app/error.tsx:5,21`
- Modify: `src/app/globals.css` (hapus `.frame-arch`)
- Delete: `src/components/ui/StarMark.tsx`

- [ ] **Step 1: `tentang-kami`** — panel emerald (111): `rounded-hero` → `arch-top`, `pt-14 sm:pt-16`, hapus `GirihPattern`. Eyebrow (115, 133) → `ArchDivider` (tone sesuai latar: `text-brand-gold`). Bullet (161) → titik emas seperti Task 5. Foto (184-185) → `MihrabFrame outline className="aspect-[3/4] w-full shadow-card"`.

- [ ] **Step 2: `akademik`** — eyebrow (77, 92) → `ArchDivider`; `article` (88) → `arch-top` + `pt-14 sm:pt-16`, hapus `GirihPattern`; setiap bullet `StarMark` → titik emas.

- [ ] **Step 3: `[slug]`** — eyebrow (57) → `ArchDivider`. Gambar utama (84) tetap `rounded-hero`.

- [ ] **Step 4: `not-found`** — hapus `GirihPattern`; `StarMark` → `<MihrabMark className="mx-auto mt-6 h-8 w-6 text-brand-gold" />`. **`error`** — `StarMark` → `MihrabMark` ukuran sama.

- [ ] **Step 5:** Hapus `.frame-arch` dari `globals.css`; hapus `src/components/ui/StarMark.tsx`.

- [ ] **Step 6: Verifikasi**

Run: `npm run typecheck`
Expected: exit 0.

Run: `grep -rln "StarMark\|frame-arch" src`
Expected: tanpa output.

Run: `grep -rln "GirihPattern" src --include=*.tsx | grep -v "ui/GirihPattern.tsx"`
Expected: tepat dua baris: `src/components/layout/Footer.tsx`, `src/components/ui/PageHero.tsx`.

- [ ] **Step 7: Commit** — `git add -A src && git commit -m "refactor: halaman dalam memakai sistem mihrab, hapus StarMark"`.

---

### Task 11: Verifikasi akhir

**Files:** tidak ada perubahan kecuali perbaikan dari temuan.

- [ ] **Step 1:** Run: `npm run build` — Expected: `✓ Compiled successfully`, tanpa error tipe. Jika fetch WordPress gagal saat build, catat pesan nyata; itu bukan regresi refactor bila build di commit dasar `4761d95` (via `git worktree add`) menunjukkan perilaku sama.

- [ ] **Step 2:** `npm run lint` — jangan setup ESLint; laporkan "lint tidak tersedia (ESLint tidak terpasang)".

- [ ] **Step 3: Visual QA** (browser pane, `npm run dev`): viewport 320, 375, 768, 1024, 1440 pada `/`, `/tentang-kami/`, `/akademik/`, `/fasilitas/`, `/ekstrakurikuler/`, `/berita/`, satu artikel, `/tidak-ada/` (404). Per halaman cek via JS `document.documentElement.scrollWidth <= innerWidth` → `true`. Console tanpa error.

- [ ] **Step 4: Keyboard** — Tab dari skip-link melalui header, CTA hero, ArrowLink panel program, kartu berita; ring focus terlihat penuh.

- [ ] **Step 5: Kontras** — pasangan teks baru: label `MediaCard` (`gold-ink` di `surface-white`) dan nama sekolah hero (`gold-ink` di `surface-ivory`); verifikasi ≥4.5:1 dengan pemeriksa kontras.

- [ ] **Step 6:** Laporkan dengan format milestone `AGENTS.md` §8 (Selesai / Diuji / Temuan / Menunggu persetujuan). Commit perbaikan bila ada: `git commit -m "fix: temuan QA refactor mihrab"`.
