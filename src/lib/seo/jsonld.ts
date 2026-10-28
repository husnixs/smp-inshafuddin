import type { WPPost } from '@/types/wordpress';
import { siteConfig } from '@/config/site';
import { SITE_LANGUAGE, SITE_NAME, SITE_SHORT_NAME, SITE_URL, absoluteUrl } from './config';
import { getPostDescription, getPostImage, getPostTitle, toIsoUtc } from './metadata';

export type JsonLdObject = Record<string, unknown>;

export const SCHOOL_ID = `${SITE_URL}/#school`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Entitas sekolah. Hanya memuat properti yang tersedia dari konten resmi situs.
 * Sengaja TIDAK memuat: telepon (data legacy tidak lengkap), email (belum dikonfirmasi pengelola),
 * NPSN, akreditasi, koordinat, dan sameAs media sosial — lihat SEO_GEO_IMPLEMENTATION_REPORT.md.
 */
export function schoolSchema(): JsonLdObject {
  return {
    '@type': ['School', 'EducationalOrganization'],
    '@id': SCHOOL_ID,
    name: SITE_NAME,
    alternateName: SITE_SHORT_NAME,
    url: `${SITE_URL}/`,
    logo: {
      '@type': 'ImageObject',
      url: siteConfig.logo.url,
      width: siteConfig.logo.width,
      height: siteConfig.logo.height,
    },
    description:
      'Sekolah menengah pertama swasta di lingkungan Dayah Terpadu Inshafuddin Banda Aceh yang memadukan kurikulum nasional dan pendidikan dayah.',
    foundingDate: '1974',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jl. Taman Sri Ratu Shafiatuddin No. 3, Lambaro Skep, Kuta Alam',
      addressLocality: 'Banda Aceh',
      addressRegion: 'Aceh',
      addressCountry: 'ID',
    },
    parentOrganization: {
      '@type': 'Organization',
      name: 'Yayasan Pembina Inshafuddin',
    },
  };
}

export function websiteSchema(): JsonLdObject {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    alternateName: SITE_SHORT_NAME,
    inLanguage: SITE_LANGUAGE,
    publisher: { '@id': SCHOOL_ID },
  };
}

interface WebPageInput {
  type?: 'WebPage' | 'AboutPage' | 'CollectionPage';
  path: string;
  name: string;
  description: string;
  /** Entitas utama halaman (mis. sekolah pada halaman profil). */
  mainEntityId?: string;
}

export function webPageSchema({ type = 'WebPage', path, name, description, mainEntityId }: WebPageInput): JsonLdObject {
  const url = absoluteUrl(path);
  return {
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: SITE_LANGUAGE,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': SCHOOL_ID },
    ...(mainEntityId ? { mainEntity: { '@id': mainEntityId } } : {}),
  };
}

export interface BreadcrumbEntry {
  name: string;
  /** Path internal; item terakhir boleh tanpa path (halaman aktif). */
  path?: string;
}

export function breadcrumbSchema(entries: BreadcrumbEntry[]): JsonLdObject {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: entries.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      ...(entry.path ? { item: absoluteUrl(entry.path) } : {}),
    })),
  };
}

export function articleSchema(post: WPPost): JsonLdObject {
  const url = absoluteUrl(`/${post.slug}/`);
  const image = getPostImage(post);

  return {
    '@type': 'NewsArticle',
    '@id': `${url}#article`,
    headline: getPostTitle(post),
    description: getPostDescription(post),
    url,
    mainEntityOfPage: url,
    datePublished: toIsoUtc(post.date_gmt),
    dateModified: toIsoUtc(post.modified_gmt),
    inLanguage: SITE_LANGUAGE,
    isPartOf: { '@id': WEBSITE_ID },
    publisher: { '@id': SCHOOL_ID },
    // Akun WordPress penerbit adalah akun institusi ("smpinsha"), bukan nama orang — jangan dijadikan Person.
    author: { '@id': SCHOOL_ID },
    ...(image ? { image: [image.url] } : {}),
  };
}

/** Membungkus beberapa node ke dalam satu @graph agar referensi @id saling terhubung. */
export function graph(...nodes: JsonLdObject[]): JsonLdObject {
  return { '@context': 'https://schema.org', '@graph': nodes };
}

/** Graph halaman yang selalu menyertakan entitas sekolah & website agar referensi @id dapat di-resolve. */
export function siteGraph(...nodes: JsonLdObject[]): JsonLdObject {
  return graph(schoolSchema(), websiteSchema(), ...nodes);
}
