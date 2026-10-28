import type { ReactNode } from 'react';
import { siteConfig } from '@/config/site';
import SectionHeading from '@/components/ui/SectionHeading';
import ButtonLink from '@/components/ui/ButtonLink';

const MAPS_LINK = 'https://maps.google.com/maps?q=SMP%20Inshafuddin%2C%20Banda%20Aceh';

interface ContactItemProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

function ContactItem({ title, icon, children }: ContactItemProps) {
  return (
    <div className="flex gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-control bg-surface-white/10 text-brand-gold-light">
        {icon}
      </span>
      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-surface-white">{title}</h3>
        <div className="mt-1 text-sm leading-relaxed text-ink-on-dark">{children}</div>
      </div>
    </div>
  );
}

const ICON_CLASS = 'h-5 w-5';

export default function ContactSection() {
  return (
    <section aria-labelledby="contact-heading" className="bg-surface-white py-16 lg:py-24">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="contact-heading"
          eyebrow="Informasi & Lokasi"
          title="Kunjungi dan hubungi sekolah kami"
          description="Kami siap menyambut kehadiran Bapak/Ibu orang tua, calon siswa, serta masyarakat di SMP Inshafuddin Banda Aceh."
          align="center"
        />

        <div className="grid grid-cols-1 overflow-hidden rounded-hero shadow-lift lg:grid-cols-12">
          <div className="relative isolate flex flex-col bg-brand-emerald-deep p-8 sm:p-10 lg:col-span-5">
            <div className="relative space-y-7">
              <ContactItem
                title="Alamat Sekolah"
                icon={
                  <svg aria-hidden="true" className={ICON_CLASS} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.66 16.66L13.41 20.9a2 2 0 01-2.83 0l-4.24-4.24a8 8 0 1111.32 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                }
              >
                <p>{siteConfig.contact.address}</p>
                <p className="mt-1 text-xs">(Kompleks Dayah Terpadu Inshafuddin)</p>
              </ContactItem>

              <ContactItem
                title="Jam Pelayanan Kantor"
                icon={
                  <svg aria-hidden="true" className={ICON_CLASS} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              >
                <p>{siteConfig.contact.hours}</p>
                <p className="mt-1 text-xs">Hari Minggu dan libur nasional tutup</p>
              </ContactItem>

              <ContactItem
                title="Surel Resmi"
                icon={
                  <svg aria-hidden="true" className={ICON_CLASS} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
              >
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="focus-ring-dark break-all rounded font-semibold text-brand-gold-light underline decoration-brand-gold/50 underline-offset-4 hover:text-surface-white"
                >
                  {siteConfig.contact.email}
                </a>
                <p className="mt-1 text-xs">{siteConfig.contact.phoneDisplay}</p>
              </ContactItem>
            </div>

            <div className="relative mt-10 lg:mt-auto lg:pt-10">
              <ButtonLink href={MAPS_LINK} variant="gold" external className="w-full">
                Buka di Google Maps
              </ButtonLink>
            </div>
          </div>

          <div className="relative min-h-[360px] bg-surface-sage lg:col-span-7">
            <iframe
              src={siteConfig.contact.mapsUrl}
              title="Peta lokasi SMP Inshafuddin Banda Aceh"
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
