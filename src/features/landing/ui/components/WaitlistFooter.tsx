import { Link } from 'react-router-dom';
import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  Youtube,
  type LucideProps,
} from 'lucide-react';

/** Official X (Twitter) wordmark — Lucide `X` is a close glyph, not the brand. */
function XIcon({ className, size = 16, ...props }: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
      {...props}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const columns = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about-us' },
      { label: 'Contact Us', to: '/contact-us' },
      { label: 'Become a Provider', to: '/seller' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', to: '/faqs' },
      { label: 'Terms', to: '/terms-and-conditions' },
      { label: 'Privacy Policy', to: '/privacy-policy' },
    ],
  },
] as const;

const social = [
  {
    icon: Facebook,
    label: 'Facebook',
    href: 'https://www.facebook.com/share/1HJnHFWWhW/?mibextid=wwXIfr',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    href: 'https://www.instagram.com/arentzo_/',
  },
  {
    icon: XIcon,
    label: 'X',
    href: 'https://x.com/arentzoo',
  },
  {
    icon: Youtube,
    label: 'YouTube',
    href: 'https://youtube.com/@arentzo',
  },
] as const;

export function WaitlistFooter() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-8 md:grid-cols-4 lg:gap-6">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2">
              <img
                src="/logo.svg"
                alt=""
                className="size-9 rounded-full object-cover"
              />
              <span className="text-lg font-bold text-primary">Arentzo</span>
            </Link>
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-background/55">
              Rent everything you need from verified providers across India.
            </p>
            <div className="mt-5 flex gap-2">
              {social.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full border border-background/15 text-background/70 transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="min-w-0">
              <h4 className="text-sm font-semibold text-background">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-xs text-background/55 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 min-w-0 sm:col-span-1">
            <h4 className="text-sm font-semibold text-background">Need Help?</h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="tel:+916361562262"
                  className="inline-flex items-center gap-2 text-xs text-background/55 hover:text-primary"
                >
                  <Phone className="size-3.5 shrink-0" aria-hidden />
                  +91 63615 62262
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@arentzo.com"
                  className="inline-flex max-w-full items-center gap-2 break-all text-xs text-background/55 hover:text-primary"
                >
                  <Mail className="size-3.5 shrink-0" aria-hidden />
                  support@arentzo.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-background/10 pt-6 text-center">
          <p className="text-xs text-background/45">
            © 2026 Arentzo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
