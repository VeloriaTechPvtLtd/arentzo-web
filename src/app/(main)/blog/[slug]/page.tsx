import type { Metadata } from 'next';
import { BlogDetailPage } from '@/features/business-pages';
import { BLOG_SLUGS, createPageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BLOG_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const label = slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

  return createPageMetadata({
    title: label,
    description: `Read “${label}” on the Arentzo blog — rental tips, product updates, and marketplace insights.`,
    path: `/blog/${slug}`,
  });
}

export default function BlogDetailRoute() {
  return <BlogDetailPage />;
}
