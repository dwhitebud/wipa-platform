import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Fulfillment Policy",
  description: "WIPA Fulfillment Policy — membership dues, refunds, and cancellations.",
};

export default function FulfillmentPolicyPage() {
  return (
    <>
      <section className="border-b border-border bg-dark py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-4xl font-light text-white sm:text-5xl">
            Fulfillment Policy
          </h1>
          <div className="mx-auto mt-4 h-px w-24 bg-gold" />
          <p className="mt-6 text-sm text-white/60">Last updated: March 2026</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl space-y-8 px-4 text-sm leading-relaxed text-muted-foreground sm:px-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Membership Dues</h2>
            <p className="mt-2">
              WIPA membership dues are billed annually via credit or debit card. Membership dues are as follows: Individual Membership $350/year, Corporate Membership $550/year, Emerging Membership $275/year. All new memberships include a one-time $50 application fee.
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="text-lg font-semibold text-foreground">Refund Policy</h2>
            <p className="mt-2">
              There are no refunds on membership dues. Once payment is processed and membership is activated, dues are non-refundable for the current membership period.
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="text-lg font-semibold text-foreground">Cancellation</h2>
            <p className="mt-2">
              Members may cancel their membership at any time. Cancellation will take effect at the end of the current billing period. Members will retain access to all benefits until the end of their paid period.
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="text-lg font-semibold text-foreground">Event Tickets</h2>
            <p className="mt-2">
              Event ticket purchases are non-refundable but may be transferred to another individual by contacting your chapter president at least 48 hours before the event. National event tickets may have separate cancellation policies which will be communicated at the time of purchase.
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="text-lg font-semibold text-foreground">Contact</h2>
            <p className="mt-2">
              For questions about billing, refunds, or cancellations, please contact{" "}
              <a href="mailto:operations@wipa.org" className="text-gold hover:text-gold-dark">
                operations@wipa.org
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
