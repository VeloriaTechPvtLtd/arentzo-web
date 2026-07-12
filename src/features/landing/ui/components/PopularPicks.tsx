import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Heart, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { landingAssets } from '../assets';

const picks = [
  {
    id: '1',
    category: 'CAR',
    title: 'BMW X5 2023',
    price: '₹9,999',
    rating: 4.9,
    reviews: 128,
    image: landingAssets.car,
  },
  {
    id: '2',
    category: 'BIKE',
    title: 'KTM Duke 390',
    price: '₹1,499',
    rating: 4.8,
    reviews: 86,
    image: landingAssets.bike,
  },
  {
    id: '3',
    category: 'ELECTRONICS',
    title: 'MacBook Pro 14"',
    price: '₹1,299',
    rating: 4.9,
    reviews: 210,
    image: landingAssets.electronics,
  },
  {
    id: '4',
    category: 'FURNITURE',
    title: 'L-Shaped Sofa',
    price: '₹999',
    rating: 4.7,
    reviews: 64,
    image: landingAssets.furniture,
  },
  {
    id: '5',
    category: 'ELECTRONICS',
    title: 'Canon EOS R6',
    price: '₹1,999',
    rating: 4.8,
    reviews: 97,
    image: landingAssets.electronics,
  },
] as const;

export function PopularPicks() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const pageCount = 5;

  const scrollBy = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.85 * dir;
    el.scrollBy({ left: amount, behavior: 'smooth' });
    setPage((p) => Math.min(pageCount - 1, Math.max(0, p + dir)));
  };

  return (
    <section className="bg-background px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3 sm:mb-10 sm:gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase">
              Marketplace
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              Popular Picks{' '}
              <span className="text-primary">(Coming Soon)</span>
            </h2>
          </div>
          <Link
            to="/browse"
            className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            View All Items
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        <div className="relative">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="absolute top-1/2 -left-1 z-10 size-9 -translate-y-1/2 rounded-full border-border bg-card shadow-md sm:-left-2 sm:size-10 md:-left-4"
            onClick={() => scrollBy(-1)}
            aria-label="Previous products"
          >
            <ChevronLeft className="size-5" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="absolute top-1/2 -right-1 z-10 size-9 -translate-y-1/2 rounded-full border-border bg-card shadow-md sm:-right-2 sm:size-10 md:-right-4"
            onClick={() => scrollBy(1)}
            aria-label="Next products"
          >
            <ChevronRight className="size-5" />
          </Button>

          <div
            ref={scrollerRef}
            className="-mx-4 flex gap-3 overflow-x-auto scroll-smooth px-4 pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:gap-4 sm:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {picks.map((pick) => (
              <Card
                key={pick.id}
                className="landing-surface w-[min(240px,78vw)] shrink-0 snap-start gap-0 overflow-hidden rounded-[1rem] border-border/80 py-0 shadow-sm transition-shadow hover:shadow-md sm:w-[260px] sm:rounded-[1.25rem]"
              >
                <div className="landing-media-top relative aspect-[4/3] overflow-hidden rounded-t-[1rem] bg-muted sm:rounded-t-[1.25rem]">
                  <img
                    src={pick.image}
                    alt={pick.title}
                    className="landing-media-top__img size-full object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-3 right-3 z-[1] flex size-8 items-center justify-center rounded-full bg-card/95 text-muted-foreground shadow-sm backdrop-blur-sm transition-colors hover:text-primary"
                    aria-label={`Save ${pick.title}`}
                  >
                    <Heart className="size-4" />
                  </button>
                </div>
                <CardContent className="space-y-1.5 p-4">
                  <p className="text-[10px] font-semibold tracking-wider text-primary uppercase">
                    {pick.category}
                  </p>
                  <h3 className="truncate text-sm font-semibold text-foreground">
                    {pick.title}
                  </h3>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-bold text-foreground">
                      {pick.price}{' '}
                      <span className="font-medium text-muted-foreground">/ day</span>
                    </p>
                    <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="size-3.5 fill-primary text-primary" aria-hidden />
                      {pick.rating}
                      <span>({pick.reviews})</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => {
                setPage(i);
                const el = scrollerRef.current;
                if (el) {
                  el.scrollTo({
                    left: (el.scrollWidth / pageCount) * i,
                    behavior: 'smooth',
                  });
                }
              }}
              className={cn(
                'size-2 rounded-full transition-colors',
                i === page ? 'bg-primary' : 'bg-border',
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
