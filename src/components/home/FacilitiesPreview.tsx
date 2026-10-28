import SectionHeading from '@/components/ui/SectionHeading';
import ArrowLink from '@/components/ui/ArrowLink';
import MediaCard from '@/components/ui/MediaCard';

const FACILITIES = [
  {
    title: 'Ruang Pembelajaran',
    image: '/images/ruang-pembelajaran.webp',
    alt: 'Fasilitas Ruang Pembelajaran SMP Inshafuddin',
    description:
      'Ruang belajar yang nyaman dan kondusif untuk mendukung proses kegiatan belajar mengajar tatap muka secara efektif dan interaktif.',
    tag: 'Sarana Belajar',
  },
  {
    title: 'Lab Komputer',
    image: '/images/lab-komputer.webp',
    alt: 'Fasilitas Laboratorium Komputer SMP Inshafuddin',
    description:
      'Fasilitas praktikum teknologi informasi ber-AC yang terkoneksi internet serta sarana lab bahasa untuk pengembangan bahasa Arab dan Inggris.',
    tag: 'Praktikum & TI',
  },
  {
    title: 'Perpustakaan',
    image: '/images/perpustakaan.webp',
    alt: 'Fasilitas Perpustakaan Sekolah SMP Inshafuddin',
    description:
      'Koleksi lengkap buku pelajaran, referensi umum, dan kitab-kitab penunjang, didukung lab sains untuk eksperimen biologi dan fisika.',
    tag: 'Pustaka & Sains',
  },
];

export default function FacilitiesPreview() {
  return (
    <section aria-labelledby="facilities-heading" className="bg-surface-ivory py-16 lg:py-24">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="facilities-heading"
          eyebrow="Sarana & Prasarana"
          title="Fasilitas pendukung kegiatan belajar"
          action={<ArrowLink href="/fasilitas/">Lihat seluruh fasilitas</ArrowLink>}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {FACILITIES.map((facility) => (
            <MediaCard
              key={facility.title}
              title={facility.title}
              description={facility.description}
              tag={facility.tag}
              image={facility.image}
              imageAlt={facility.alt}
              imageSizes="(max-width: 768px) 100vw, 400px"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
