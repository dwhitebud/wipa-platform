import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  GraduationCap,
  Users,
  Megaphone,
  Heart,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export const metadata = {
  title: "Membership Benefits",
  description: "Discover the benefits of becoming a WIPA member.",
};

const benefitSections = [
  {
    icon: GraduationCap,
    title: "Education",
    items: [
      "Receive top-notch and timely education across all chapters",
      "A WIPA member can attend any WIPA chapter event",
      "Tickets on a discounted rate to WIPA events",
      "Network with reputable and seasoned members in the industry",
      "Attend monthly WIPA Webinars — Free for WIPA members",
      "Access 24/7 to the member video education library",
      "Be connected to the industry's top wedding resources",
    ],
  },
  {
    icon: Users,
    title: "Networking",
    items: [
      "Access to WIPA members only events",
      "Realize your potential for growth and leadership within the organization & industry",
      "Relish in a sense of community and create alliances through special interest groups",
      "Interact and share with members on Facebook, Instagram and LinkedIn",
      "Access up-to-date information on business practices and career information",
    ],
  },
  {
    icon: Megaphone,
    title: "Promotion",
    items: [
      "Be acknowledged as an expert and increase your opportunity for media coverage",
      "Submit news to the WIPA blog and reach other members",
      "Follow @WIPA_org on Instagram for updates, event photos, and sneak peeks",
      "Receive membership support delivered by webinars and monthly electronic newsletters",
    ],
  },
  {
    icon: Heart,
    title: "Community",
    items: [
      "Be at the forefront of trends and leading edge design & technology",
      "Connect with other members at coffee chats and other free member only gatherings",
      "Access discounts from partner companies and national conferences",
      "Feel a sense of pride in adopting a comprehensive Professional Code of Conduct and Ethics",
    ],
  },
];

export default function BenefitsPage() {
  return (
    <>
      <section className="relative border-b border-border bg-dark py-20">
        <img
          src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-4xl font-light text-white sm:text-5xl">
            Membership Benefits
          </h1>
          <div className="mx-auto mt-4 h-px w-24 bg-gold" />
          <p className="mt-6 text-lg text-white/60">
            The decision to join WIPA is an investment in your future success.
            As a WIPA Member, experience:
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {benefitSections.map((section) => (
              <Card key={section.title} className="overflow-hidden border-0 shadow-sm">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="flex items-center justify-center bg-dark p-8 md:w-48">
                      <div className="text-center">
                        <section.icon className="mx-auto h-10 w-10 text-gold" />
                        <h2 className="mt-3 text-xl font-light text-white">
                          {section.title}
                        </h2>
                      </div>
                    </div>
                    <div className="flex-1 p-8">
                      <ul className="space-y-3">
                        {section.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-sm text-muted-foreground"
                          >
                            <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/membership/join">
              <Button
                size="lg"
                className="bg-gold px-8 text-white hover:bg-gold-dark"
              >
                Apply for Membership
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Have questions?{" "}
              <Link
                href="/membership/faq"
                className="text-gold hover:text-gold-dark"
              >
                Check our FAQs
              </Link>{" "}
              or email{" "}
              <a
                href="mailto:info@wipa.org"
                className="text-gold hover:text-gold-dark"
              >
                info@wipa.org
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
