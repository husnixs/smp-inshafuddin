import { SITE_URL } from '@/lib/seo/config';

export interface NavItem {
  label: string;
  href: string;
}

export const siteConfig = {
  name: 'SMP Inshafuddin Banda Aceh',
  shortName: 'SMP Inshafuddin',
  tagline: 'Membangun Generasi Berkarakter, Unggul Prestasi, dan Berakhlak Mulia',
  url: SITE_URL,
  logo: {
    url: 'https://www.smpinshafuddin.sch.id/wp-content/uploads/2023/02/logo.png',
    width: 199,
    height: 73,
    alt: 'Logo Resmi SMP Inshafuddin Banda Aceh',
  },
  contact: {
    address: 'Jl. Taman Sri Ratu Shafiatuddin No. 3, Lambaro Skep, Kuta Alam, Banda Aceh',
    email: 'smp.inshafuddinbna@gmail.com',
    hours: 'Senin – Sabtu, 07.30 – 15.00 WIB',
    mapsUrl: 'https://maps.google.com/maps?q=SMP%20Inshafuddin%2C%20Banda%20Aceh&t=m&z=18&output=embed&iwloc=near',
    // Telepon di CMS legacy berformat incomplete '+62 (0651)', disimpan sebagai referensi internal tanpa tautan tel:
    phoneDisplay: '(0651) — hubungi via email resmi',
  },
  navItems: [
    { label: 'Beranda', href: '/' },
    { label: 'Profil', href: '/tentang-kami/' },
    { label: 'Akademik', href: '/akademik/' },
    { label: 'Fasilitas', href: '/fasilitas/' },
    { label: 'Ekstrakurikuler', href: '/ekstrakurikuler/' },
    { label: 'Berita', href: '/berita/' },
  ] as NavItem[],
};
