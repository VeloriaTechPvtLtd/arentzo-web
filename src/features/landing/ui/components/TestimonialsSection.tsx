import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Star,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { landingAssets } from '../assets';

const reviews = [
  {
    name: 'Jacob Smith',
    role: 'Adventure Enthusiast',
    quote:
      'Rented a bike for the weekend — seamless booking and the bike was in perfect condition. Arentzo is my go-to now.',
    avatar: landingAssets.avatars[0],
  },
  {
    name: 'Priya Sharma',
    role: 'Home Owner',
    quote:
      'Furnished my new apartment entirely through Arentzo. Flexible terms and verified providers made it stress-free.',
    avatar: landingAssets.avatars[1],
  },
  {
    name: 'Marcus Lee',
    role: 'Photographer',
    quote:
      'Got a Canon body for a shoot at a fraction of buying cost. Fast delivery and excellent support throughout.',
    avatar: landingAssets.avatars[2],
  },
  {
    name: 'Elena Rossi',
    role: 'Traveler',
    quote:
      'Picked up a car at the airport with zero hassle. Transparent pricing and a smooth return process.',
    avatar: landingAssets.avatars[3],
  },
] as const;

export function TestimonialsSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * 0.8 * dir, behavior: 'smooth' });
  };

  return (
    <section className="landing-section-muted px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-widest text-primary uppercase">
              Testimonials
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              What Our <span className="text-primary">Users</span> Say
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            View All Reviews
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        <div className="relative">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="absolute top-1/2 -left-2 z-10 hidden size-10 -translate-y-1/2 rounded-full bg-card shadow-md md:inline-flex"
            onClick={() => scrollBy(-1)}
            aria-label="Previous reviews"
          >
            <ChevronLeft className="size-5" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="absolute top-1/2 -right-2 z-10 hidden size-10 -translate-y-1/2 rounded-full bg-card shadow-md md:inline-flex"
            onClick={() => scrollBy(1)}
            aria-label="Next reviews"
          >
            <ChevronRight className="size-5" />
          </Button>

          <div
            ref={scrollerRef}
            className="flex gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {reviews.map((review) => (
              <Card
                key={review.name}
                className="landing-surface w-[300px] shrink-0 gap-0 border-border/80 py-0 shadow-sm transition-shadow hover:shadow-md sm:w-[340px]"
              >
                <CardContent className="flex h-full flex-col p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <img
                      src={review.avatar}
                      alt=""
                      className="size-12 rounded-full object-cover shadow-xs"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-foreground">
                          {review.name}
                        </p>
                        <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold text-primary">
                          <BadgeCheck className="size-3" aria-hidden />
                          Verified Renter
                        </span>
                      </div>
                      <div className="mt-1 flex gap-0.5 text-primary" aria-label="5 star rating">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="size-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground italic">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                  <p className="mt-4 text-xs font-medium text-muted-foreground">
                    {review.role}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
