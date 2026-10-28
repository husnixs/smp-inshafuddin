import SectionHeading from '@/components/ui/SectionHeading';
import ArrowLink from '@/components/ui/ArrowLink';
import MediaCard from '@/components/ui/MediaCard';

const ACTIVITIES = [
  {
    title: 'Gerakan Pramuka',
    description:
      'Mengasah keterampilan fisik, intelektual, emosional, kemandirian, dan kepemimpinan sosial siswa melalui kepanduan berjiwa Islami.',
    tag: 'Karakter & Disiplin',
    image: '/images/ekskul/pramuka-kartun.svg',
    alt: 'Ilustrasi kegiatan Pramuka',
  },
  {
    title: 'Sanggar Seni Tari & Kaligrafi',
    description:
      'Mengembangkan minat dan bakat seni tradisi Aceh dan Islam, drama, serta seni kaligrafi Arab dengan pembimbing profesional.',
    tag: 'Seni & Budaya',
    image: '/images/ekskul/seni-kartun.svg',
    alt: 'Ilustrasi kegiatan seni tari dan kaligrafi',
  },
  {
    title: 'Olahraga (Sepak Bola & Futsal)',
    description:
      'Wadah pembinaan bakat olahraga, kesehatan jasmani, kerja sama tim, dan sportivitas siswa di lapangan olahraga sekolah.',
    tag: 'Jasmani & Prestasi',
    image: '/images/ekskul/olahraga-kartun.svg',
    alt: 'Ilustrasi kegiatan olahraga sepak bola',
  },
];

export default function ExtracurricularPreview() {
  return (
    <section aria-labelledby="activities-heading" className="bg-surface-white py-16 lg:py-24">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="activities-heading"
          eyebrow="Kehidupan Siswa"
          title="Kegiatan ekstrakurikuler unggulan"
          action={<ArrowLink href="/ekstrakurikuler/">Lihat semua kegiatan</ArrowLink>}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {ACTIVITIES.map((activity) => (
            <MediaCard
              key={activity.title}
              title={activity.title}
              description={activity.description}
              tag={activity.tag}
              image={activity.image}
              imageAlt={activity.alt}
              imageSizes="(max-width: 768px) 100vw, 400px"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
