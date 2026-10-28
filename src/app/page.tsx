import { getPosts } from '@/lib/wordpress/api';
import HeroSection from '@/components/home/HeroSection';
import OverviewSection from '@/components/home/OverviewSection';
import ProgramsSection from '@/components/home/ProgramsSection';
import WelcomeSection from '@/components/home/WelcomeSection';
import FacilitiesPreview from '@/components/home/FacilitiesPreview';
import ExtracurricularPreview from '@/components/home/ExtracurricularPreview';
import LatestNewsSection from '@/components/home/LatestNewsSection';
import ContactSection from '@/components/home/ContactSection';

export const revalidate = 300; // 5 menit

export default async function HomePage() {
  const { posts } = await getPosts({ perPage: 3 });

  return (
    <>
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Sekilas Sekolah (3 Nilai) */}
      <OverviewSection />

      {/* 3. Program Pendidikan (2 Jalur) */}
      <ProgramsSection />

      {/* 4. Sambutan Kepala Sekolah */}
      <WelcomeSection />

      {/* 5. Fasilitas Sekolah (3 Preview) */}
      <FacilitiesPreview />

      {/* 6. Kehidupan & Kegiatan Siswa (3 Preview) */}
      <ExtracurricularPreview />

      {/* 7. Berita & Kegiatan Terbaru (3 Kartu Berita Asli dari WP) */}
      <LatestNewsSection posts={posts} />

      {/* 8. Kontak & Lokasi */}
      <ContactSection />
    </>
  );
}
