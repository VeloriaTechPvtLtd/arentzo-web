import { useState } from 'react';
import { ChevronDown, ChevronUp, Mic, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

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

export const HelpCenterSettings: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(1);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="settings-view px-5 pt-2 pb-6">
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
          className="h-11 rounded-full border-border bg-card pl-11 pr-11 text-sm shadow-xs"
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
          {faqs.map((faq) => {
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
        </div>
      </section>

      <section className="mb-6 rounded-[1.5rem] border border-border/80 bg-card p-6 shadow-xs">
        <h2 className="text-lg font-bold tracking-tight text-foreground">
          Still need help?
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Contact us.
        </p>

        <form className="mt-5 space-y-3" onSubmit={(e) => e.preventDefault()}>
          <Input
            type="text"
            placeholder="Name"
            className="h-11 rounded-full border-border bg-muted/40"
          />
          <Input
            type="email"
            placeholder="Email"
            className="h-11 rounded-full border-border bg-muted/40"
          />
          <textarea
            placeholder="Message"
            rows={4}
            className={cn(
              'w-full resize-none rounded-[1.25rem] border border-border bg-muted/40 px-4 py-3 text-sm',
              'placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none',
            )}
          />
          <Button type="submit" className="h-11 w-full font-semibold">
            Send Message
          </Button>
        </form>

        <div className="mt-5 space-y-1.5 text-[13px] text-muted-foreground">
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
            Hours:{' '}
            <span className="text-foreground/80">Mon–Fri, 9 AM – 6 PM IST</span>
          </p>
        </div>
      </section>
    </div>
  );
};
