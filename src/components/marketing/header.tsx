"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const navigation = [
  {
    name: "About",
    href: "/about",
    children: [
      { name: "Our Story", href: "/about/our-story" },
      { name: "Code of Ethics", href: "/about/code-of-ethics" },
      { name: "Board of Directors", href: "/about/board-of-directors" },
      { name: "DEI + Belonging", href: "/about/dei" },
      { name: "Leadership Development", href: "/about/leadership-development-council" },
      { name: "Sponsors &amp; Partners", href: "/about/sponsors-partners" },
    ],
  },
  {
    name: "Membership",
    href: "/membership",
    children: [
      { name: "Benefits", href: "/membership/benefits" },
      { name: "Join WIPA", href: "/membership/join" },
      { name: "FAQs", href: "/membership/faq" },
      { name: "Partner Discounts", href: "/membership/partner-discounts" },
      { name: "Leadership Roles", href: "/membership/leadership-roles" },
    ],
  },
  {
    name: "Chapters",
    href: "/chapters",
    children: [
      { name: "All Chapters", href: "/chapters" },
      { name: "Chapters in Formation", href: "/chapters/in-formation" },
      { name: "Start a Chapter", href: "/chapters/start-a-chapter" },
    ],
  },
  {
    name: "Events",
    href: "/events",
  },
  {
    name: "Blog",
    href: "/blog",
  },
  {
    name: "Contact",
    href: "/contact",
    children: [
      { name: "Contact a Chapter", href: "/contact" },
      { name: "Sponsor Inquiry", href: "/contact/sponsor-inquiry" },
      { name: "Speaker Application", href: "/contact/speaker-application" },
      { name: "Leadership Interest", href: "/contact/leadership-interest" },
    ],
  },
];

export function Header() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center">
          <img
            src="/wipa-logo.png"
            alt="WIPA — Wedding Industry Professionals Association"
            className="h-8 w-auto sm:h-10"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() =>
                item.children && setOpenDropdown(item.name)
              }
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:text-gold"
              >
                {item.name}
                {item.children && (
                  <ChevronDown className="h-3 w-3" />
                )}
              </Link>
              {item.children && openDropdown === item.name && (
                <div className="absolute left-0 top-full z-50 min-w-[200px] rounded-md border border-border bg-background py-2 shadow-lg">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-2 text-sm text-foreground transition-colors hover:bg-secondary hover:text-gold"
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/membership/join">
            <Button
              variant="outline"
              size="sm"
              className="hidden border-primary text-primary hover:bg-primary hover:text-primary-foreground sm:inline-flex"
            >
              JOIN WIPA
            </Button>
          </Link>
          <Link href="/login">
            <Button
              size="sm"
              className="hidden bg-primary text-primary-foreground hover:bg-gold sm:inline-flex"
            >
              MEMBER CENTER
            </Button>
          </Link>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-secondary lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <SheetTitle className="text-2xl font-light tracking-[0.2em]">
                WIPA
              </SheetTitle>
              <nav className="mt-8 flex flex-col gap-1">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 text-lg font-medium text-foreground transition-colors hover:text-gold"
                    >
                      {item.name}
                    </Link>
                    {item.children && (
                      <div className="ml-4 flex flex-col gap-1 border-l border-border pl-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="block py-1 text-sm text-muted-foreground transition-colors hover:text-gold"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="mt-6 flex flex-col gap-3">
                  <Link href="/membership/join" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" className="w-full border-primary">
                      JOIN WIPA
                    </Button>
                  </Link>
                  <Link href="/login" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full bg-primary">
                      MEMBER CENTER
                    </Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
