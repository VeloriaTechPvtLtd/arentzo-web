import { Armchair, ArrowRight, Bike, Car, Monitor } from 'lucide-react';
import { landingAssets } from '../assets';

const categories = [
  {
    title: 'Cars',
    description: 'Drive your dream without ownership',
    cta: 'Join Waitlist',
    image: landingAssets.car,
    imageAlt: 'Car available to rent',
    icon: Car,
    imagePosition: 'object-center',
  },
  {
    title: 'Bikes',
    description: 'Ride more, worry less',
    cta: 'Join Waitlist',
    image: landingAssets.bike,
    imageAlt: 'Motorcycle available to rent',
    icon: Bike,
    imagePosition: 'object-[center_30%]',
  },
  {
    title: 'Electronics',
    description: 'Latest tech, zero commitment',
    cta: 'Join Waitlist',
    image: landingAssets.electronics,
    imageAlt: 'Electronics available to rent',
    icon: Monitor,
    imagePosition: 'object-center',
  },
  {
    title: 'Furniture',
    description: 'Furnish beautifully, live comfortably',
    cta: 'Join Waitlist',
    image: landingAssets.furniture,
    imageAlt: 'Furniture available to rent',
    icon: Armchair,
    imagePosition: 'object-[center_40%]',
  },
] as const;

function scrollToWaitlist() {
  document
    .getElementById('waitlist-hero-form')
    ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

export function WhatYouCanRent() {
  return (
    <section
      id="what-you-can-rent"
      className="bg-background px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-[2.5rem]">
          Coming soon by category
        </h2>
        <p className="mx-auto mt-3 max-w-lg px-1 text-center text-sm text-muted-foreground sm:text-base">
          Cars, bikes, electronics, and furniture — join the waitlist to get
          early access.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 md:grid-cols-4 md:gap-5">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <a
                key={category.title}
                href="#waitlist-hero-form"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToWaitlist();
                }}
                className="landing-surface group relative flex h-48 w-full min-w-0 flex-col overflow-hidden text-left shadow-[0_8px_24px_rgb(0,0,0,0.08)] transition-transform duration-300 active:scale-[0.99] sm:h-56 md:h-64 md:hover:-translate-y-1 md:hover:shadow-[0_12px_36px_rgb(0,0,0,0.12)] lg:h-72"
              >
                <img
                  src={category.image}
                  alt={category.imageAlt}
                  className={`absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${category.imagePosition}`}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/75"
                  aria-hidden
                />

                <div className="relative z-10 flex h-full min-h-0 flex-col justify-between p-3 sm:p-4 md:p-5">
                  <div className="min-w-0">
                    <span className="mb-2 flex size-7 items-center justify-center rounded-full bg-white text-foreground shadow-md sm:mb-3 sm:size-9">
                      <Icon
                        className="size-3.5 sm:size-4"
                        strokeWidth={1.75}
                        aria-hidden
                      />
                    </span>
                    <h3 className="truncate text-sm font-bold tracking-tight text-white sm:text-base md:text-lg lg:text-xl">
                      {category.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-white/90 sm:mt-1.5 sm:text-xs md:text-sm">
                      {category.description}
                    </p>
                  </div>

                  <span className="mt-2 inline-flex w-fit max-w-full items-center gap-1 rounded-full border border-white/90 px-2 py-1 text-[10px] font-medium text-white transition-colors duration-300 group-hover:bg-white group-hover:text-foreground sm:mt-3 sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs">
                    <span className="truncate max-sm:hidden">{category.cta}</span>
                    <span className="truncate sm:hidden">Join</span>
                    <ArrowRight
                      className="size-3 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 sm:size-3.5"
                      aria-hidden
                    />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
