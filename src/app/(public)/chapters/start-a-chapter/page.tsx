import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Start a Chapter",
  description: "Learn how to start a WIPA chapter in your area.",
};

const requirements = [
  "A minimum of 20 founding members committed to joining",
  "An identified Chapter President and core leadership team",
  "A geographic area not currently served by an existing WIPA chapter",
  "Commitment to hosting a minimum of 6 events per year",
  "Adherence to WIPA's Code of Ethics and bylaws",
  "Completion of the Chapter Formation application and approval by the National Board",
];

const steps = [
  { title: "Express Interest", description: "Contact WIPA National to express your interest in starting a chapter in your area." },
  { title: "Recruit Founding Members", description: "Gather at least 20 committed wedding professionals in your region." },
  { title: "Form Leadership Team", description: "Identify a Chapter President, Vice President, and committee chairs." },
  { title: "Submit Application", description: "Complete the Chapter Formation application with your founding member list." },
  { title: "National Board Review", description: "The WIPA National Board will review your application and schedule a call." },
  { title: "Charter Approval", description: "Once approved, your chapter will be officially chartered and announced." },
];

export default function StartAChapterPage() {
  return (
    <>
      <section className="border-b border-border bg-dark py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-4xl font-light text-white sm:text-5xl">
            Start a Chapter
          </h1>
          <div className="mx-auto mt-4 h-px w-24 bg-gold" />
          <p className="mt-6 text-lg text-white/60">
            Bring WIPA to your community
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-lg leading-relaxed text-muted-foreground">
            Is there no WIPA chapter in your area? You can help bring one to
            life! Starting a WIPA chapter is a rewarding way to build community
            among wedding professionals in your region while gaining valuable
            leadership experience.
          </p>

          <h2 className="mt-10 text-2xl font-light">Requirements</h2>
          <ul className="mt-4 space-y-3">
            {requirements.map((req) => (
              <li key={req} className="flex items-start gap-3 text-sm text-muted-foreground">
                <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />
                {req}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 text-2xl font-light">How It Works</h2>
          <div className="mt-6 space-y-6">
            {steps.map((step, i) => (
              <div key={step.title} className="flex gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gold text-sm font-semibold text-white">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/contact">
              <Button className="bg-gold text-white hover:bg-gold-dark">
                Contact Us to Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Or email{" "}
              <a href="mailto:operations@wipa.org" className="text-gold hover:text-gold-dark">
                operations@wipa.org
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
