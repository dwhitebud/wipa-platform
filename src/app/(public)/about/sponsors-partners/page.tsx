import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Sponsors & Partners",
  description: "Partner with WIPA and reach our diverse membership.",
};

export default function SponsorsPartnersPage() {
  return (
    <>
      <section className="border-b border-border bg-dark py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-4xl font-light text-white sm:text-5xl">
            Sponsors &amp; Partners
          </h1>
          <div className="mx-auto mt-4 h-px w-24 bg-gold" />
          <p className="mt-6 text-lg text-white/60">
            Partner with WIPA and connect with the wedding industry&apos;s top professionals
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-lg leading-relaxed text-muted-foreground">
            WIPA&apos;s membership reach is strong, loyal and diverse. For your
            next sponsorship opportunity, connect with us to explore how your
            brand can reach thousands of leading wedding professionals across
            North America.
          </p>

          <div className="mt-8 space-y-6">
            <div className="rounded-lg border border-border p-6">
              <h3 className="font-semibold text-gold">National Sponsorships</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Reach WIPA members coast to coast through national conference
                sponsorships, webinar sponsorships, newsletter placements, and
                video library partnerships.
              </p>
            </div>
            <div className="rounded-lg border border-border p-6">
              <h3 className="font-semibold text-gold">Chapter Sponsorships</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Connect with professionals in specific markets through local
                chapter event sponsorships, design showcase partnerships, and
                regional networking event branding.
              </p>
            </div>
            <div className="rounded-lg border border-border p-6">
              <h3 className="font-semibold text-gold">In-Kind Partnerships</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Provide products or services to WIPA events and gain exposure
                to our curated community of wedding industry leaders.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/contact/sponsor-inquiry">
              <Button className="bg-gold text-white hover:bg-gold-dark">
                Submit a Sponsor Inquiry
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Or email{" "}
              <a href="mailto:info@wipa.org" className="text-gold hover:text-gold-dark">
                info@wipa.org
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
