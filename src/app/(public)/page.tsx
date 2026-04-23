import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  GraduationCap,
  Users,
  Globe,
  Award,
  ArrowRight,
  Sparkles,
  Heart,
  Shield,
} from "lucide-react";

const chapters = [
  { name: "Atlanta", slug: "atlanta" },
  { name: "Austin", slug: "austin" },
  { name: "Boston", slug: "boston" },
  { name: "Chicago", slug: "chicago" },
  { name: "Cleveland", slug: "cleveland" },
  { name: "Colorado", slug: "colorado" },
  { name: "Connecticut", slug: "connecticut" },
  { name: "Dallas Fort Worth", slug: "dallas" },
  { name: "Greater Cincinnati", slug: "cincinnati" },
  { name: "Houston", slug: "houston" },
  { name: "Las Vegas", slug: "las-vegas" },
  { name: "Minneapolis", slug: "minneapolis" },
  { name: "Nashville", slug: "nashville" },
  { name: "Nebraska", slug: "nebraska" },
  { name: "New York", slug: "new-york" },
  { name: "North Carolina", slug: "north-carolina" },
  { name: "Philadelphia", slug: "philadelphia" },
  { name: "Phoenix", slug: "phoenix" },
  { name: "San Francisco Bay Area", slug: "san-francisco-bay-area" },
  { name: "Seattle", slug: "seattle" },
  { name: "Southeast Florida", slug: "southeast-florida" },
  { name: "Southern California", slug: "southern-california" },
  { name: "St. Louis", slug: "st-louis" },
  { name: "Utah", slug: "utah" },
];

const benefits = [
  {
    icon: GraduationCap,
    title: "Education",
    description:
      "Top-notch education across all chapters, monthly webinars, and 24/7 access to the video education library.",
  },
  {
    icon: Users,
    title: "Networking",
    description:
      "Connect with reputable, seasoned professionals. Access members-only events and build lasting industry relationships.",
  },
  {
    icon: Globe,
    title: "Community",
    description:
      "25 chapters nationwide. Be at the forefront of trends and connect at coffee chats and member-only gatherings.",
  },
  {
    icon: Award,
    title: "Recognition",
    description:
      "Be acknowledged as an industry expert. Increase your opportunity for media coverage and professional growth.",
  },
];

const vendorCategories = [
  "Event Planners",
  "Florists",
  "Photographers",
  "Videographers",
  "Caterers",
  "Venues",
  "DJs",
  "Cake Designers",
  "Entertainers",
  "Rental Companies",
  "Officiants",
  "Invitation Designers",
  "Hoteliers",
  "Decor Specialists",
  "Musicians",
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-dark sm:min-h-[80vh]">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <p className="mb-4 font-display text-sm font-light uppercase tracking-[0.3em] text-gold">
            Est. 2008
          </p>
          <h1 className="text-3xl font-light leading-tight text-white sm:text-4xl md:text-5xl lg:text-7xl">
            Elevating the
            <span className="block font-normal italic text-gold">
              Wedding Industry
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
            WIPA is a not-for-profit association fostering excellence through
            comprehensive education, dynamic networking, and the highest ethical
            standards for wedding professionals.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/membership/join">
              <Button
                size="lg"
                className="bg-gold px-8 text-white hover:bg-gold-dark"
              >
                Become a Member
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/about/our-story">
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 px-8 text-white hover:bg-white/10"
              >
                Our Story
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-light text-muted-foreground/40 sm:text-4xl">
            <span className="text-foreground">What is WIPA</span>
          </h2>
          <div className="mx-auto mt-4 h-px w-24 bg-gold" />
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
            WIPA (Wedding Industry Professionals Association) is a not-for-profit
            association for leading wedding professionals in North America and
            around the world. Our mission is to foster excellence in the wedding
            industry through comprehensive education, dynamic networking
            opportunities, and valuable resource offerings. We are committed to
            empowering all wedding professionals with the knowledge and
            connections needed to drive industry innovation and uphold the highest
            ethical practices.
          </p>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="bg-secondary py-12 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-3xl font-light sm:text-4xl">
              Member Benefits
            </h2>
            <div className="mx-auto mt-4 h-px w-24 bg-gold" />
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <Card
                key={benefit.title}
                className="border-0 bg-background shadow-sm transition-shadow hover:shadow-md"
              >
                <CardContent className="p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10">
                    <benefit.icon className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold">{benefit.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/membership/benefits">
              <Button variant="outline" className="border-primary">
                View All Benefits
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Chapters Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-3xl font-light sm:text-4xl">
              Our Chapters
            </h2>
            <div className="mx-auto mt-4 h-px w-24 bg-gold" />
            <p className="mt-6 text-muted-foreground">
              25 chapters across North America and growing
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-3 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {chapters.map((chapter) => (
              <Link
                key={chapter.slug}
                href={`/chapters/${chapter.slug}`}
                className="group rounded-lg border border-border p-4 text-center transition-all hover:border-gold hover:shadow-sm"
              >
                <span className="text-sm font-medium text-foreground transition-colors group-hover:text-gold">
                  {chapter.name}
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/chapters/start-a-chapter"
              className="text-sm text-gold hover:text-gold-dark"
            >
              Interested in starting a chapter in your area?{" "}
              <ArrowRight className="ml-1 inline h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* Vendor Categories */}
      <section className="bg-dark py-12 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-3xl font-light text-white sm:text-4xl">
              Our Members
            </h2>
            <div className="mx-auto mt-4 h-px w-24 bg-gold" />
            <p className="mt-6 text-white/60">
              WIPA members represent a multitude of wedding disciplines
            </p>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            {vendorCategories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-white/20 px-5 py-2 text-sm text-white/70 transition-colors hover:border-gold hover:text-gold"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold">
                <Shield className="h-7 w-7 text-gold" />
              </div>
              <h3 className="mt-6 text-lg font-semibold">Ethical Standards</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Our comprehensive Professional Code of Conduct and Ethics sets
                the standard for the wedding industry.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold">
                <Heart className="h-7 w-7 text-gold" />
              </div>
              <h3 className="mt-6 text-lg font-semibold">Community First</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                A member-run organization where professionals support each other
                and give back to the communities they serve.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold">
                <Sparkles className="h-7 w-7 text-gold" />
              </div>
              <h3 className="mt-6 text-lg font-semibold">Industry Innovation</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Stay at the forefront of trends, design, and technology with
                industry-leading education and networking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-secondary py-12 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-light sm:text-4xl">
            Ready to Join?
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            The decision to join WIPA is an investment in your future success.
            Connect with the industry&apos;s leading professionals and elevate
            your career.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/membership/join">
              <Button
                size="lg"
                className="bg-gold px-8 text-white hover:bg-gold-dark"
              >
                Apply for Membership
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/membership/benefits">
              <Button variant="outline" size="lg" className="border-primary px-8">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-light text-muted-foreground">
            Sponsors
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-gold" />
          <p className="mt-6 text-sm text-muted-foreground">
            WIPA&apos;s membership reach is strong, loyal and diverse. For your
            next sponsorship opportunity, connect with us through{" "}
            <a
              href="mailto:info@wipa.org"
              className="text-gold hover:text-gold-dark"
            >
              info@wipa.org
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
