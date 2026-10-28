/**
 * Title & description halaman statis. Title tanpa nama situs — template layout menambahkan
 * " | SMP Inshafuddin" — kecuali homepage yang memakai title absolut.
 */

export const HOME_TITLE = 'SMP Inshafuddin Banda Aceh | Sekolah & Dayah Terpadu';
export const HOME_DESCRIPTION =
  'SMP Inshafuddin Banda Aceh memadukan kurikulum nasional dan pendidikan dayah. Kenali profil, program akademik, fasilitas, dan kegiatan sekolah.';

interface StaticPageSeo {
  path: string;
  title: string;
  description: string;
  breadcrumbLabel: string;
}

export const PAGE_SEO = {
  tentangKami: {
    path: '/tentang-kami/',
    title: 'Profil & Tentang Kami',
    description:
      'Sejarah berdirinya SMP Inshafuddin Banda Aceh sejak tahun 1974, visi, misi, tujuan pendidikan, serta struktur pimpinan sekolah.',
    breadcrumbLabel: 'Tentang Kami',
  },
  akademik: {
    path: '/akademik/',
    title: 'Akademik & Kurikulum',
    description:
      'Kurikulum terpadu SMP Inshafuddin Banda Aceh: kurikulum nasional Kementerian Pendidikan dipadukan dengan kurikulum Dayah Terpadu Inshafuddin.',
    breadcrumbLabel: 'Akademik',
  },
  fasilitas: {
    path: '/fasilitas/',
    title: 'Fasilitas & Sarana Prasarana',
    description:
      'Sarana dan prasarana penunjang kegiatan belajar mengajar di SMP Inshafuddin Banda Aceh: ruang pembelajaran, lab komputer, lab IPA, perpustakaan, dan lapangan olahraga.',
    breadcrumbLabel: 'Fasilitas',
  },
  ekstrakurikuler: {
    path: '/ekstrakurikuler/',
    title: 'Ekstrakurikuler & Kegiatan Siswa',
    description:
      'Kegiatan ekstrakurikuler di SMP Inshafuddin Banda Aceh: Pramuka, Sanggar Seni Tari, dan Olahraga untuk mengasah potensi dan kepribadian siswa.',
    breadcrumbLabel: 'Ekstrakurikuler',
  },
  berita: {
    path: '/berita/',
    title: 'Arsip Berita & Informasi',
    description:
      'Warta kegiatan, informasi akademik, dan agenda penting terkini dari lingkungan SMP Inshafuddin Banda Aceh.',
    breadcrumbLabel: 'Berita',
  },
} satisfies Record<string, StaticPageSeo>;
