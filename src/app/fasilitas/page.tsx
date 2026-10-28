import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Fasilitas & Sarana Prasarana',
  description:
    'Sarana dan prasarana penunjang kegiatan belajar mengajar di SMP Inshafuddin Banda Aceh: ruang kelas, lab komputer, lab IPA, perpustakaan, dan lapangan olahraga.',
  alternates: {
    canonical: `${siteConfig.url}/fasilitas/`,
  },
};

export default function FasilitasPage() {
  const facilities = [
    {
      title: 'Ruang Kelas Pembelajaran',
      desc: 'Untuk kegiatan tatap muka dalam proses kegiatan belajar mengajar (KBM), kami memiliki prasarana ruang kelas yang representatif dan memadai dengan pencahayaan dan sirkulasi udara baik.',
      type: 'Ruang Teori',
    },
    {
      title: 'Laboratorium Komputer',
      desc: 'Sebagai penunjang kegiatan belajar mengajar modern, kami memiliki Laboratorium Komputer yang lengkap, full AC, dan terkoneksi internet untuk pelatihan teknologi informasi siswa.',
      type: 'Praktikum TI',
    },
    {
      title: 'Laboratorium Bahasa',
      desc: 'Untuk kegiatan praktikum bahasa Inggris dan bahasa Arab, laboratorium bahasa dilengkapi sarana audio pembelajaran yang membantu siswa melatih listening dan speaking.',
      type: 'Praktikum Bahasa',
    },
    {
      title: 'Laboratorium IPA',
      desc: 'Dilengkapi dengan berbagai peralatan dan bahan praktikum sains untuk kegiatan eksperimen biologi, fisika, dan kimia dasar peserta didik.',
      type: 'Praktikum Sains',
    },
    {
      title: 'Perpustakaan Sekolah',
      desc: 'Menyediakan koleksi buku cetak, buku referensi penunjang kurikulum, buku bacaan umum, serta kitab-kitab penunjang pendidikan dayah yang dapat dipinjam siswa.',
      type: 'Pusat Literasi',
    },
    {
      title: 'Lapangan Olahraga',
      desc: 'Sarana olahraga terbuka sebagai tempat mengasah kemampuan fisik, keterampilan, dan kesehatan siswa dalam cabang sepak bola, basket, futsal, dan senam.',
      type: 'Area Terbuka',
    },
    {
      title: 'Ruang Ibadah / Mushalla',
      desc: 'Tempat pelaksanaan shalat berjamaah, pembinaan keagamaan, serta pengajian rutin siswa dan guru di lingkungan sekolah.',
      type: 'Sarana Ibadah',
    },
    {
      title: 'Unit Kesehatan Sekolah (UKS)',
      desc: 'Penyediaan pertolongan pertama pada kecelakaan/sakit dan tempat istirahat sementara bagi siswa yang membutuhkan penanganan medis ringan.',
      type: 'Kesehatan',
    },
    {
      title: 'Ruang Kesenian',
      desc: 'Ruang berekspresi untuk mengasah minat dan bakat seni tari tradisi Aceh, kaligrafi Islam, dan persiapan pergelaran seni siswa.',
      type: 'Kreativitas',
    },
  ];

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumb & Header */}
        <div className="border-b border-divider pb-8">
          <nav aria-label="Breadcrumb" className="text-xs text-ink-muted mb-4">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-brand-emerald">
                  Beranda
                </Link>
              </li>
              <li>/</li>
              <li className="text-brand-emerald font-semibold">Fasilitas</li>
            </ol>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-emerald tracking-tight">
            Sarana & Prasarana Sekolah
          </h1>
          <p className="text-base text-ink-muted mt-2 max-w-3xl">
            Untuk kegiatan belajar mengajar di dalam dan di luar kelas, SMP Inshafuddin menyediakan fasilitas pembelajaran yang aman, nyaman, dan mendukung potensi siswa.
          </p>
        </div>

        {/* Grid Fasilitas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {facilities.map((f) => (
            <div
              key={f.title}
              className="bg-surface-white p-6 sm:p-8 rounded-card border border-divider hover:border-brand-emerald/40 transition-all hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-2.5 py-1 rounded bg-surface-sage text-brand-emerald text-xs font-semibold mb-4">
                  {f.type}
                </span>
                <h2 className="text-lg font-bold text-brand-emerald mb-3">
                  {f.title}
                </h2>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
