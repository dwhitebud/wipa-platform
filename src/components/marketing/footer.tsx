import Link from "next/link";
import { Instagram, Twitter, Facebook } from "lucide-react";

const footerLinks = {
  about: [
    { name: "Our Story", href: "/about/our-story" },
    { name: "Code of Ethics", href: "/about/code-of-ethics" },
    { name: "Board of Directors", href: "/about/board-of-directors" },
    { name: "DEI + Belonging", href: "/about/dei" },
  ],
  membership: [
    { name: "Benefits", href: "/membership/benefits" },
    { name: "Join WIPA", href: "/membership/join" },
    { name: "FAQs", href: "/membership/faq" },
    { name: "Partner Discounts", href: "/membership/partner-discounts" },
  ],
  connect: [
    { name: "Contact a Chapter", href: "/contact" },
    { name: "Sponsor Inquiry", href: "/contact/sponsor-inquiry" },
    { name: "Speaker Application", href: "/contact/speaker-application" },
    { name: "Events Calendar", href: "/events" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-block">
              <img
                src="/wipa-logo.png"
                alt="WIPA"
                className="h-8 w-auto brightness-0 invert"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Wedding Industry Professionals Association — a not-for-profit
              association for leading wedding professionals in North America.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://www.instagram.com/wipa_org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 transition-colors hover:text-gold"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://twitter.com/WIPA_org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 transition-colors hover:text-gold"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://www.facebook.com/WIPAorg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 transition-colors hover:text-gold"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              About
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-gold"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Membership
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.membership.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-gold"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Connect
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.connect.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-gold"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 sm:mt-12 sm:pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-white/40">
              &copy; {new Date().getFullYear()} Wedding Industry Professionals
              Association. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy-policy"
                className="text-xs text-white/40 transition-colors hover:text-gold"
              >
                Privacy Policy
              </Link>
              <Link
                href="/fulfillment-policy"
                className="text-xs text-white/40 transition-colors hover:text-gold"
              >
                Fulfillment Policy
              </Link>
              <Link
                href="/contact"
                className="text-xs text-white/40 transition-colors hover:text-gold"
              >
                Contact Us
              </Link>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-white/30">
            1001 Wilshire Boulevard, Suite 1540, Los Angeles, CA 90017 USA
          </p>
        </div>
      </div>
    </footer>
  );
}
