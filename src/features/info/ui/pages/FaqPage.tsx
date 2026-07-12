import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Mic, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { InfoPageLayout } from '../components/InfoPageLayout';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    id: 1,
    question: 'How do I reset my password?',
    answer:
      "To reset your password, go to the login screen and tap on the 'Forgot Password' link. You will receive an email with instructions on how to set a new password for your account.",
  },
  {
    id: 2,
    question: 'How do I update my billing information?',
    answer:
      'You can update your billing information in the Payment Methods section of your profile settings. Select the card you wish to update or add a new payment method.',
  },
  {
    id: 3,
    question: 'Can I change my subscription plan?',
    answer:
      "Yes, you can upgrade or downgrade your subscription plan at any time from your account settings under the 'Subscription' tab.",
  },
];

export function FaqPage() {
  const [openId, setOpenId] = useState<number | null>(1);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = faqs.filter(
    (f) =>
      !searchQuery.trim() ||
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <InfoPageLayout width="narrow">
      <div className="mb-8 text-center sm:mb-10">
        <p className="text-xs font-semibold tracking-widest text-primary uppercase">
          Support
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
          Help Center
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          Answers to common questions — or reach out and we&apos;ll help.
        </p>
      </div>

      <div className="relative mb-8">
        <Search
          className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          type="search"
          placeholder="How can we help you?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-12 rounded-full border-border bg-card pl-11 pr-11 text-sm shadow-xs"
        />
        <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground">
          <Mic className="size-4" aria-hidden />
        </span>
      </div>

      <section className="mb-10">
        <h2 className="mb-4 text-base font-semibold tracking-tight text-foreground sm:text-lg">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {filtered.map((faq) => {
            const open = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="overflow-hidden rounded-[1.25rem] border border-border/80 bg-card shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : faq.id)}
                  className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-muted/40"
                >
                  <span className="text-sm font-semibold tracking-tight text-foreground sm:text-[15px]">
                    {faq.question}
                  </span>
                  {open ? (
                    <ChevronUp className="size-5 shrink-0 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="size-5 shrink-0 text-muted-foreground" />
                  )}
                </button>
                {open ? (
                  <div className="border-t border-border/60 px-5 py-4 text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </div>
                ) : null}
              </div>
            );
          })}
          {filtered.length === 0 ? (
            <p className="rounded-[1.25rem] border border-border/80 bg-card px-5 py-6 text-center text-sm text-muted-foreground">
              No matching questions. Try another search or contact us below.
            </p>
          ) : null}
        </div>
      </section>

      <section className="rounded-[1.5rem] border border-border/80 bg-card p-6 shadow-sm sm:p-8">
        <h2 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
          Still need help?
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Send us a message and we&apos;ll get back to you.
        </p>

        <form className="mt-6 space-y-3" onSubmit={(e) => e.preventDefault()}>
          <Input
            type="text"
            name="name"
            placeholder="Name"
            className="h-11 rounded-full border-border bg-muted/40"
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            className="h-11 rounded-full border-border bg-muted/40"
          />
          <textarea
            name="message"
            placeholder="Message"
            rows={4}
            className={cn(
              'w-full resize-none rounded-[1.25rem] border border-border bg-muted/40 px-4 py-3 text-sm',
              'placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none',
            )}
          />
          <Button type="submit" size="lg" className="h-11 w-full font-semibold">
            Send Message
          </Button>
        </form>

        <div className="mt-6 space-y-1.5 text-sm text-muted-foreground">
          <p>
            Email:{' '}
            <a
              href="mailto:support@arentzo.com"
              className="font-medium text-primary hover:underline"
            >
              support@arentzo.com
            </a>
          </p>
          <p>
            Hours: <span className="text-foreground/80">Mon–Fri, 9 AM – 6 PM IST</span>
          </p>
          <p>
            Or visit our{' '}
            <Link to="/contact-us" className="font-medium text-primary hover:underline">
              Contact page
            </Link>
            .
          </p>
        </div>
      </section>
    </InfoPageLayout>
  );
}
