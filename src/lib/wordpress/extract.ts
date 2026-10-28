/**
 * Ekstraksi URL gambar pertama dari rendered HTML konten WordPress.
 * Diperlukan karena posting WP legacy menyimpan gambar langsung di dalam konten,
 * sementara featured_media bernilai 0.
 */
export function extractFirstImage(html: string): string | null {
  if (!html) return null;
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

/**
 * Membersihkan tag HTML dan entity untuk menghasilkan teks cuplikan ringkas.
 */
export function stripHtml(html: string): string {
  if (!html) return '';
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#8211;/g, '–')
    .replace(/&#8217;/g, '’')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&laquo;|&raquo;/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Format tanggal ISO ke format bahasa Indonesia formal (contoh: 18 Juli 2026).
 */
export function formatIndonesianDate(isoString: string): string {
  if (!isoString) return '';
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return isoString;

  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}
