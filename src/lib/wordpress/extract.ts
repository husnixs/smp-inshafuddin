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

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  ndash: '–',
  mdash: '—',
  hellip: '…',
  lsquo: '‘',
  rsquo: '’',
  ldquo: '“',
  rdquo: '”',
  laquo: '«',
  raquo: '»',
};

/** Mendekode HTML entity numerik (desimal/heksadesimal) dan entity bernama yang umum dari WordPress. */
export function decodeHtmlEntities(text: string): string {
  if (!text) return '';
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity: string) => {
    if (entity[0] === '#') {
      const isHex = entity[1].toLowerCase() === 'x';
      const codePoint = parseInt(entity.slice(isHex ? 2 : 1), isHex ? 16 : 10);
      return Number.isFinite(codePoint) && codePoint > 0 && codePoint <= 0x10ffff
        ? String.fromCodePoint(codePoint)
        : match;
    }
    return NAMED_ENTITIES[entity.toLowerCase()] ?? match;
  });
}

/**
 * Membersihkan tag HTML dan entity untuk menghasilkan teks cuplikan ringkas.
 */
export function stripHtml(html: string): string {
  if (!html) return '';
  const withoutTags = html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ');
  return decodeHtmlEntities(withoutTags)
    .replace(/\[(?:…|&hellip;|\.\.\.)\]/g, '…')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Memotong teks pada batas kata terdekat dan menambahkan elipsis bila terpotong. */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const slice = text.slice(0, maxLength);
  const lastSpace = slice.lastIndexOf(' ');
  const cut = lastSpace > maxLength * 0.6 ? slice.slice(0, lastSpace) : slice;
  return `${cut.replace(/[\s,.;:–-]+$/, '')}…`;
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
