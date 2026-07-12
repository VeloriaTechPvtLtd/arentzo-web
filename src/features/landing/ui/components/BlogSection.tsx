import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { landingAssets } from '../assets';

const posts = [
  {
    category: 'TIPS',
    title: '5 Ways Renting Saves You Money This Year',
    date: 'May 12, 2024',
    read: '5 min read',
    image: landingAssets.car,
    slug: 'renting-saves-money',
  },
  {
    category: 'GUIDE',
    title: 'How to Choose the Right Rental for Your Trip',
    date: 'May 8, 2024',
    read: '7 min read',
    image: landingAssets.bike,
    slug: 'choose-right-rental',
  },
  {
    category: 'ADVENTURE',
    title: 'Weekend Getaways with Rented Gear',
    date: 'May 3, 2024',
    read: '4 min read',
    image: landingAssets.electronics,
    slug: 'weekend-getaways',
  },
  {
    category: 'NEWS',
    title: 'Arentzo Launch: What Early Members Get',
    date: 'Apr 28, 2024',
    read: '3 min read',
    image: landingAssets.furniture,
    slug: 'arentzo-launch',
  },
] as const;

export function BlogSection() {
  return (
    <section className="bg-background px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3 sm:mb-10 sm:gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase">
              Insights
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              Latest From Our <span className="text-primary">Blog</span>
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            Visit Blog
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {posts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="group">
              <Card className="landing-surface h-full gap-0 overflow-hidden border-border/80 py-0 shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md">
                <div className="landing-media-top relative aspect-[16/10] overflow-hidden bg-muted">
                  <img
                    src={post.image}
                    alt=""
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <Badge className="absolute top-3 left-3 rounded-full bg-card/95 px-2 py-0.5 text-[10px] font-bold tracking-wide text-foreground uppercase shadow-xs backdrop-blur-sm">
                    {post.category}
                  </Badge>
                </div>
                <CardContent className="space-y-3 p-4">
                  <h3 className="line-clamp-2 text-sm font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {post.date} · {post.read}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
