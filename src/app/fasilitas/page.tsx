import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { PAGE_SEO } from '@/lib/seo/pages';
import { siteGraph, webPageSchema } from '@/lib/seo/jsonld';
import JsonLd from '@/components/seo/JsonLd';
import PageHero from '@/components/ui/PageHero';
import MediaCard from '@/components/ui/MediaCard';

export const revalidate = 3600;

export const metadata: Metadata = buildPageMetadata(PAGE_SEO.fasilitas);

export default function FasilitasPage() {
  const facilities = [
    {
      title: 'Ruang Pembelajaran',
      image: '/images/ruang-pembelajaran.webp',
      alt: 'Fasilitas Ruang Pembelajaran SMP Inshafuddin',
      desc: 'Untuk kegiatan tatap muka dalam proses kegiatan belajar mengajar (KBM), kami memiliki prasarana ruang kelas yang representatif dan memadai dengan pencahayaan dan sirkulasi udara baik.',
      type: 'Ruang Teori',
    },
    {
      title: 'Lab Komputer',
      image: '/images/lab-komputer.webp',
      alt: 'Fasilitas Laboratorium Komputer SMP Inshafuddin',
      desc: 'Sebagai penunjang kegiatan belajar mengajar modern, kami memiliki Laboratorium Komputer yang lengkap, full AC, dan terkoneksi internet untuk pelatihan teknologi informasi siswa.',
      type: 'Praktikum TI',
    },
    {
      title: 'Lab Bahasa',
      image: '/images/lab-bahasa.webp',
      alt: 'Fasilitas Laboratorium Bahasa SMP Inshafuddin',
      desc: 'Untuk kegiatan praktikum bahasa Inggris dan bahasa Arab, laboratorium bahasa dilengkapi sarana audio pembelajaran yang membantu siswa melatih listening dan speaking.',
      type: 'Praktikum Bahasa',
    },
    {
      title: 'Lab IPA',
      image: '/images/lab-ipa.webp',
      alt: 'Fasilitas Laboratorium IPA SMP Inshafuddin',
      desc: 'Dilengkapi dengan berbagai peralatan dan bahan praktikum sains untuk kegiatan eksperimen biologi, fisika, dan kimia dasar peserta didik.',
      type: 'Praktikum Sains',
    },
    {
      title: 'Perpustakaan',
      image: '/images/perpustakaan.webp',
      alt: 'Fasilitas Perpustakaan Sekolah SMP Inshafuddin',
      desc: 'Menyediakan koleksi buku cetak, buku referensi penunjang kurikulum, buku bacaan umum, serta kitab-kitab penunjang pendidikan dayah yang dapat dipinjam siswa.',
      type: 'Pusat Literasi',
    },
    {
      title: 'Lapangan Olahraga',
      image: '/images/lapangan-olahraga.webp',
      alt: 'Fasilitas Lapangan Olahraga SMP Inshafuddin',
      desc: 'Sarana olahraga terbuka sebagai tempat mengasah kemampuan fisik, keterampilan, dan kesehatan siswa dalam cabang sepak bola, basket, futsal, dan senam.',
      type: 'Area Terbuka',
    },
    {
      title: 'Mushalla',
      image: '/images/mushalla.webp',
      alt: 'Fasilitas Mushalla SMP Inshafuddin',
      desc: 'Tempat pelaksanaan shalat berjamaah, pembinaan keagamaan, serta pengajian rutin siswa dan guru di lingkungan sekolah.',
      type: 'Sarana Ibadah',
    },
    {
      title: 'UKS',
      image: '/images/uks.webp',
      alt: 'Fasilitas Unit Kesehatan Sekolah (UKS) SMP Inshafuddin',
      desc: 'Penyediaan pertolongan pertama pada kecelakaan/sakit dan tempat istirahat sementara bagi siswa yang membutuhkan penanganan medis ringan.',
      type: 'Kesehatan',
    },
    {
      title: 'Ruang Kesenian',
      image: '/images/ruang-kesenian.webp',
      alt: 'Fasilitas Ruang Kesenian SMP Inshafuddin',
      desc: 'Ruang berekspresi untuk mengasah minat dan bakat seni tari tradisi Aceh, kaligrafi Islam, dan persiapan pergelaran seni siswa.',
      type: 'Kreativitas',
    },
  ];

  return (
    <>
      <JsonLd
        data={siteGraph(
          webPageSchema({
            path: PAGE_SEO.fasilitas.path,
            name: PAGE_SEO.fasilitas.title,
            description: PAGE_SEO.fasilitas.description,
          }),
        )}
      />
      <PageHero
        eyebrow="Sarana & Prasarana"
        title="Sarana & Prasarana Sekolah"
        description="Untuk kegiatan belajar mengajar di dalam dan di luar kelas, SMP Inshafuddin menyediakan fasilitas pembelajaran yang aman, nyaman, dan mendukung potensi siswa."
        breadcrumb={[{ label: 'Fasilitas' }]}
      />

      <section aria-label="Daftar fasilitas" className="bg-surface-ivory py-16 lg:py-24">
        <div className="mx-auto grid max-w-content grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 lg:px-8">
          {facilities.map((facility) => (
            <MediaCard
              key={facility.title}
              title={facility.title}
              description={facility.desc}
              tag={facility.type}
              image={facility.image}
              imageAlt={facility.alt}
              imageSizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
              headingLevel="h2"
            />
          ))}
        </div>
      </section>
    </>
  );
}
