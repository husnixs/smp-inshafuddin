import { siteConfig } from '@/config/site';

export default function ContactSection() {
  return (
    <section className="py-16 lg:py-20 bg-surface-white">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-bold text-brand-gold tracking-widest uppercase mb-2">
            Informasi & Lokasi
          </h2>
          <p className="text-2xl sm:text-3xl font-bold text-brand-emerald">
            Kunjungi dan Hubungi Sekolah Kami
          </p>
          <p className="text-sm text-ink-muted mt-3">
            Kami siap menyambut kehadiran Bapak/Ibu orang tua, calon siswa, serta masyarakat di kampus SMP Inshafuddin Banda Aceh.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Info Card */}
          <div className="lg:col-span-5 bg-surface-ivory p-8 rounded-card border border-divider shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-brand-emerald mb-2">
                  Alamat Sekolah
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {siteConfig.contact.address}
                </p>
                <p className="text-xs text-ink-muted/80 mt-1">
                  (Kompleks Dayah Terpadu Inshafuddin)
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-brand-emerald mb-2">
                  Jam Pelayanan Kantor
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {siteConfig.contact.hours}
                </p>
                <p className="text-xs text-ink-muted/80 mt-1">
                  Hari Minggu dan Libur Nasional Tutup
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-brand-emerald mb-2">
                  Surel Resmi
                </h3>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-sm font-semibold text-brand-emerald hover:underline"
                >
                  {siteConfig.contact.email}
                </a>
                <p className="text-xs text-ink-muted/80 mt-1">
                  {siteConfig.contact.phoneDisplay}
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-divider">
              <a
                href="https://maps.google.com/maps?q=SMP%20Inshafuddin%2C%20Banda%20Aceh"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center px-4 py-3 rounded-xl bg-brand-emerald text-surface-white font-semibold text-xs hover:bg-brand-emerald-hover focus:outline-none focus:ring-2 focus:ring-brand-emerald transition-colors min-h-[44px]"
              >
                Buka Peta di Google Maps &rarr;
              </a>
            </div>
          </div>

          {/* Map Embed */}
          <div className="lg:col-span-7 rounded-card overflow-hidden border border-divider shadow-sm min-h-[350px] relative bg-surface-sage">
            <iframe
              src={siteConfig.contact.mapsUrl}
              title="Peta Lokasi SMP Inshafuddin Banda Aceh"
              aria-label="Peta Lokasi SMP Inshafuddin Banda Aceh"
              className="w-full h-full min-h-[350px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
