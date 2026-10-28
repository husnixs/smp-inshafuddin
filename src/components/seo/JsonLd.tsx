import type { JsonLdObject } from '@/lib/seo/jsonld';

interface JsonLdProps {
  data: JsonLdObject;
}

/**
 * Menyisipkan JSON-LD. Karakter `<`, `>`, `&`, dan pemisah baris Unicode di-escape agar konten
 * WordPress (judul, deskripsi) tidak dapat menutup tag <script> atau menyuntikkan HTML.
 */
export default function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
