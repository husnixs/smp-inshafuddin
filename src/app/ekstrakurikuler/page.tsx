import type { Metadata } from 'next';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import PageHero from '@/components/ui/PageHero';
import MediaCard from '@/components/ui/MediaCard';
import SectionHeading from '@/components/ui/SectionHeading';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Ekstrakurikuler & Kegiatan Siswa',
  description:
    'Kegiatan ekstrakurikuler di SMP Inshafuddin Banda Aceh: Pramuka, Sanggar Seni Tari, dan Olahraga untuk mengasah potensi dan kepribadian siswa.',
  alternates: {
    canonical: `${siteConfig.url}/ekstrakurikuler/`,
  },
};

export default function EkstrakurikulerPage() {
  const activities = [
    {
      title: 'Gerakan Pramuka',
      desc: 'Kegiatan kepramukaan di SMP Inshafuddin Banda Aceh merupakan salah satu wadah utama untuk mengasah keterampilan fisik, intelektual, emosional, dan sosial siswa. Menanamkan kemandirian, kepemimpinan, gotong royong, dan cinta alam berjiwa Islami.',
      tag: 'Karakter & Kepanduan',
      image: '/images/ekskul/pramuka-kartun.svg',
      alt: 'Ilustrasi Kartun Kegiatan Pramuka SMP Inshafuddin',
    },
    {
      title: 'Sanggar Seni Tari Tradisional & Kaligrafi',
      desc: 'Dengan tenaga pelatih profesional, kami melatih siswa dalam olah seni tari tradisional Aceh, kaligrafi Islam, dan drama pentas seni. Kami menyelenggarakan pagelaran untuk mendorong rasa percaya diri siswa dalam melestarikan budaya lokal yang selaras dengan syariat.',
      tag: 'Seni & Budaya',
      image: '/images/ekskul/seni-kartun.svg',
      alt: 'Ilustrasi Kartun Seni Tari Tradisional dan Kaligrafi Islam',
    },
    {
      title: 'Olahraga & Atletik (Sepak Bola)',
      desc: 'Memberi ruang bagi siswa dalam menyalurkan potensi, minat, dan bakat di bidang kebugaran jasmani. Sepak bola, futsal, dan cabang atletik dibina secara rutin untuk menumbuhkan sportivitas dan kekompakan tim.',
      tag: 'Jasmani & Sportivitas',
      image: '/images/ekskul/olahraga-kartun.svg',
      alt: 'Ilustrasi Kartun Olahraga Sepak Bola Siswa SMP Inshafuddin',
    },
  ];

  const galleryImages = [
    {
      url: 'https://www.smpinshafuddin.sch.id/wp-content/uploads/2024/08/milad1-1024x683.jpeg',
      caption: 'Peringatan Milad & Kegiatan Akbar Sekolah',
    },
    {
      url: 'https://www.smpinshafuddin.sch.id/wp-content/uploads/2024/07/santribaru24.jpg',
      caption: 'Masa Orientasi Siswa & Santri Baru',
    },
    {
      url: 'https://www.smpinshafuddin.sch.id/wp-content/uploads/2024/04/festval-seni.png',
      caption: 'Penampilan Kreativitas Seni Siswa',
    },
    {
      url: 'https://www.smpinshafuddin.sch.id/wp-content/uploads/2024/07/pertemuanwali24.jpg',
      caption: 'Pertemuan Silaturrahmi Bersama Wali Murid',
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Kehidupan Siswa"
        title="Ekstrakurikuler & Kehidupan Siswa"
        description="Pengembangan diri di luar jam kelas untuk menumbuhkan kepemimpinan, bakat seni, ketangkasan fisik, dan jiwa sosial santri/siswa."
        breadcrumb={[{ label: 'Ekstrakurikuler' }]}
      />

      <section aria-label="Kegiatan ekstrakurikuler" className="bg-surface-ivory py-16 lg:py-24">
        <div className="mx-auto grid max-w-content grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-3 lg:gap-8 lg:px-8">
          {activities.map((activity) => (
            <MediaCard
              key={activity.title}
              title={activity.title}
              description={activity.desc}
              tag={activity.tag}
              image={activity.image}
              imageAlt={activity.alt}
              imageSizes="(max-width: 768px) 100vw, 400px"
              headingLevel="h2"
            />
          ))}
        </div>
      </section>

      {/* Dokumentasi kegiatan dari Media Library WordPress */}
      <section aria-labelledby="galeri-heading" className="bg-surface-white py-16 lg:py-24">
        <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
          <SectionHeading id="galeri-heading" eyebrow="Dokumentasi Resmi" title="Galeri dokumentasi kegiatan siswa" />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {galleryImages.map((img) => (
              <figure key={img.url} className="group">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card bg-surface-sage shadow-card">
                  <Image
                    src={img.url}
                    alt={img.caption}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                    className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
                  />
                </div>
                <figcaption className="mt-3 border-l-2 border-brand-gold pl-3 text-sm font-medium leading-snug text-ink-primary">
                  {img.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
