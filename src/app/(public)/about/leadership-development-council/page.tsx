import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Leadership Development Council",
  description: "WIPA's Leadership Development Council fosters the next generation of industry leaders.",
};

export default function LeadershipDevelopmentCouncilPage() {
  return (
    <>
      <section className="border-b border-border bg-dark py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-4xl font-light text-white sm:text-5xl">
            Leadership Development Council
          </h1>
          <div className="mx-auto mt-4 h-px w-24 bg-gold" />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-lg leading-relaxed text-muted-foreground">
            The WIPA Leadership Development Council (LDC) was created to
            cultivate the next generation of leaders within our organization
            and the wedding industry at large. The council provides a
            structured pathway for members who demonstrate exceptional
            leadership potential to grow their skills and take on greater
            responsibility.
          </p>

          <div className="mt-8 space-y-6">
            <div className="rounded-lg border border-border p-6">
              <h3 className="font-semibold text-gold">Mission</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                To identify, mentor, and develop emerging leaders who will carry
                forward WIPA&apos;s mission of excellence, ethics, and
                community in the wedding industry.
              </p>
            </div>
            <div className="rounded-lg border border-border p-6">
              <h3 className="font-semibold text-gold">Program Structure</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                The LDC program runs annually and includes mentorship pairings
                with seasoned WIPA leaders, leadership workshops, project-based
                learning opportunities, and a capstone presentation at the
                WIPA National Conference.
              </p>
            </div>
            <div className="rounded-lg border border-border p-6">
              <h3 className="font-semibold text-gold">Eligibility</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Active WIPA members who have demonstrated leadership potential
                through committee involvement, chapter participation, or
                industry recognition are encouraged to apply. Nominations are
                also accepted from chapter presidents and board members.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/contact/leadership-interest">
              <Button className="bg-gold text-white hover:bg-gold-dark">
                Express Interest
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
