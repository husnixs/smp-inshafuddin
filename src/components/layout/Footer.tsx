import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import GirihPattern from '@/components/ui/GirihPattern';
import ArcadeBand from '@/components/ui/ArcadeBand';

function FooterHeading({ children }: { children: string }) {
  return (
    <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-brand-gold-light">
      {children}
    </h2>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden bg-brand-emerald-deep text-ink-on-dark">
      <GirihPattern className="text-brand-gold/[0.07]" />
      <ArcadeBand className="relative text-brand-gold/40" />

      <div className="relative mx-auto max-w-content px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="space-y-5 lg:col-span-5">
            <div className="inline-block rounded-control bg-surface-white p-3 shadow-card">
              <span className="relative block h-11 w-44">
                <Image
                  src={siteConfig.logo.url}
                  alt={siteConfig.logo.alt}
                  fill
                  sizes="176px"
                  className="object-contain object-left"
                />
              </span>
            </div>
            <p className="max-w-md text-sm leading-relaxed">
              SMP Inshafuddin berada di bawah naungan Yayasan Pembina Inshafuddin, di lingkungan Dayah Terpadu
              Inshafuddin Banda Aceh, memadukan kurikulum nasional dan pendidikan dayah sejak 1974.
            </p>
          </div>

          <div className="lg:col-span-2">
            <FooterHeading>Jelajahi</FooterHeading>
            <ul className="space-y-1 text-sm">
              {siteConfig.navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="focus-ring-dark inline-flex min-h-[36px] items-center rounded transition-colors hover:text-surface-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <FooterHeading>Jam Layanan</FooterHeading>
            <p className="text-sm font-medium text-surface-white">{siteConfig.contact.hours}</p>
            <p className="mt-2 text-xs leading-relaxed">
              Pelayanan administrasi sekolah dan informasi pendidikan bagi orang tua dan calon siswa.
            </p>
          </div>

          <div className="lg:col-span-3">
            <FooterHeading>Kontak Resmi</FooterHeading>
            <address className="space-y-4 text-sm not-italic leading-relaxed">
              <p>{siteConfig.contact.address}</p>
              <p>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="focus-ring-dark break-all rounded font-semibold text-brand-gold-light underline decoration-brand-gold/50 underline-offset-4 hover:text-surface-white"
                >
                  {siteConfig.contact.email}
                </a>
              </p>
              <p className="text-xs">{siteConfig.contact.phoneDisplay}</p>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-surface-white/10 pt-8 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {currentYear} SMP Inshafuddin Banda Aceh. Hak cipta dilindungi.</p>
          <p className="text-brand-gold-light">Membina ilmu dan akhlak sejak 1974</p>
        </div>
      </div>
    </footer>
  );
}
