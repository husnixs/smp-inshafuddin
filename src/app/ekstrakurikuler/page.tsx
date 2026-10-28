import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';

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
              <li className="text-brand-emerald font-semibold">Ekstrakurikuler</li>
            </ol>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-emerald tracking-tight">
            Ekstrakurikuler & Kehidupan Siswa
          </h1>
          <p className="text-base text-ink-muted mt-2 max-w-3xl">
            Pengembangan diri di luar jam kelas untuk menumbuhkan kepemimpinan, bakat seni, ketangkasan fisik, dan jiwa sosial santri/siswa.
          </p>
        </div>

        {/* 3 Ekstrakurikuler Utama dengan Ilustrasi Kartun Sample */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {activities.map((a) => (
            <div
              key={a.title}
              className="bg-surface-white rounded-card border border-divider hover:border-brand-emerald/40 transition-all hover:shadow-lg flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Ilustrasi Kartun Sample */}
                <div className="relative aspect-[16/10] w-full bg-surface-sage overflow-hidden border-b border-divider">
                  <Image
                    src={a.image}
                    alt={a.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 380px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-6 sm:p-8">
                  <span className="inline-block px-2.5 py-1 rounded bg-surface-sage text-brand-emerald text-xs font-semibold mb-3">
                    {a.tag}
                  </span>
                  <h2 className="text-xl font-bold text-brand-emerald mb-3">
                    {a.title}
                  </h2>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    {a.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dokumentasi Kegiatan Asli dari Media Library */}
        <section className="space-y-6">
          <div>
            <h2 className="text-xs font-bold text-brand-gold tracking-widest uppercase mb-2">
              Dokumentasi Resmi
            </h2>
            <p className="text-2xl font-bold text-brand-emerald">
              Galeri Dokumentasi Kegiatan Siswa
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryImages.map((img, idx) => (
              <figure
                key={idx}
                className="bg-surface-white rounded-card border border-divider overflow-hidden shadow-sm flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] w-full bg-surface-sage">
                  <Image
                    src={img.url}
                    alt={img.caption}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="p-3 text-xs text-ink-muted text-center font-medium">
                  {img.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
