import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-emerald text-surface-white border-t-2 border-brand-gold/40">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: School Identity */}
          <div className="space-y-4">
            <div className="bg-surface-white p-3 rounded-lg inline-block w-48 shadow-sm">
              <div className="relative w-full h-12">
                <Image
                  src={siteConfig.logo.url}
                  alt={siteConfig.logo.alt}
                  fill
                  sizes="192px"
                  className="object-contain object-left"
                />
              </div>
            </div>
            <p className="text-sm text-surface-sage/90 leading-relaxed">
              SMP Inshafuddin merupakan sekolah di bawah naungan Yayasan Pembina Inshafuddin di lingkungan Dayah Terpadu Inshafuddin Banda Aceh, memadukan kurikulum nasional dan pendidikan dayah sejak 1974.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h3 className="text-base font-semibold text-brand-gold mb-4 tracking-wide uppercase">
              Tautan Navigasi
            </h3>
            <ul className="space-y-2 text-sm">
              {siteConfig.navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-surface-sage/80 hover:text-surface-white hover:underline transition-colors focus:outline-none focus:ring-1 focus:ring-brand-gold py-1 inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Jam Kerja & Layanan */}
          <div>
            <h3 className="text-base font-semibold text-brand-gold mb-4 tracking-wide uppercase">
              Jam Layanan Kantor
            </h3>
            <div className="space-y-2 text-sm text-surface-sage/90">
              <p className="font-medium text-surface-white">
                {siteConfig.contact.hours}
              </p>
              <p className="text-xs text-surface-sage/75">
                Pelayanan administrasi sekolah dan informasi pendidikan bagi orang tua dan calon siswa.
              </p>
              <div className="pt-2">
                <span className="inline-block px-2.5 py-1 rounded bg-brand-emerald-hover text-xs text-brand-gold border border-brand-gold/30">
                  Pendidikan Nasional & Dayah
                </span>
              </div>
            </div>
          </div>

          {/* Column 4: Kontak Resmi */}
          <div>
            <h3 className="text-base font-semibold text-brand-gold mb-4 tracking-wide uppercase">
              Kontak Resmi
            </h3>
            <div className="space-y-3 text-sm text-surface-sage/90">
              <p className="leading-relaxed">
                <span className="block font-semibold text-surface-white">Alamat:</span>
                {siteConfig.contact.address}
              </p>
              <p>
                <span className="block font-semibold text-surface-white">Email:</span>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-brand-gold hover:underline focus:outline-none focus:ring-1 focus:ring-brand-gold"
                >
                  {siteConfig.contact.email}
                </a>
              </p>
              <p className="text-xs text-surface-sage/70 pt-1">
                {siteConfig.contact.phoneDisplay}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-surface-sage/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-surface-sage/70">
          <p>
            &copy; {currentYear} SMP Inshafuddin Banda Aceh. Hak cipta dilindungi.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/tentang-kami/" className="hover:text-surface-white transition-colors">
              Profil Sekolah
            </Link>
            <span>•</span>
            <Link href="/akademik/" className="hover:text-surface-white transition-colors">
              Kurikulum
            </Link>
            <span>•</span>
            <Link href="/berita/" className="hover:text-surface-white transition-colors">
              Kabar Terbaru
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
