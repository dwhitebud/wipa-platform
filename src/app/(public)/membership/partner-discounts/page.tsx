import { Card, CardContent } from "@/components/ui/card";
import { Tag } from "lucide-react";

export const metadata = {
  title: "Partner Discounts",
  description: "Exclusive discounts for WIPA members from our industry partners.",
};

const discounts = [
  { partner: "Honeybook", offer: "50% off for 1 year", description: "Client management software for creative entrepreneurs." },
  { partner: "The Knot Pro", offer: "Preferred pricing", description: "Wedding marketplace listing and lead generation." },
  { partner: "Pic-Time", offer: "20% off annual plans", description: "Online photo galleries and album proofing." },
  { partner: "Flodesk", offer: "50% off first year", description: "Email marketing designed for creatives." },
  { partner: "Later", offer: "15% off annual plan", description: "Social media scheduling and analytics." },
  { partner: "Canva Pro", offer: "Special pricing", description: "Design tools for marketing materials." },
];

export default function PartnerDiscountsPage() {
  return (
    <>
      <section className="border-b border-border bg-dark py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-4xl font-light text-white sm:text-5xl">
            Partner Discounts
          </h1>
          <div className="mx-auto mt-4 h-px w-24 bg-gold" />
          <p className="mt-6 text-lg text-white/60">
            Exclusive savings for WIPA members
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="mx-auto max-w-3xl text-center text-muted-foreground">
            As a WIPA member, you have access to exclusive discounts from our
            valued industry partners. Log in to the Member Center to access
            discount codes and redemption links.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {discounts.map((d) => (
              <Card key={d.partner}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-gold" />
                    <span className="text-sm font-semibold text-gold">{d.offer}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold">{d.partner}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{d.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 rounded-lg bg-secondary p-8 text-center">
            <h2 className="text-xl font-light">Want to Partner with WIPA?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              If your company would like to offer a discount to WIPA members,
              contact{" "}
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
