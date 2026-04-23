import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  GraduationCap,
  Megaphone,
  Users,
  Globe,
  Award,
  Heart,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "Leadership Roles",
  description: "Learn about WIPA committee and leadership opportunities.",
};

const committees = [
  {
    icon: GraduationCap,
    name: "Education Committee",
    description:
      "Helps the Director organize activities to impart information, knowledge or skills related to wedding design and management, and secures all speakers and reviews all educational content for general meetings, seminars, webinars, etc.",
  },
  {
    icon: Megaphone,
    name: "Communications Committee",
    description:
      "Prepares communications to provide information to the membership, prospective members and the general public; assists with production of the chapter newsletter, directory and website.",
  },
  {
    icon: Users,
    name: "Membership Committee",
    description:
      "Defines membership benefits & requirements as well as methods to attract new members and retain existing members; processes membership applications and maintains membership roster; acts as a formal welcoming committee for new members.",
  },
  {
    icon: Globe,
    name: "Chapter Formation Committee",
    description:
      "Oversees the development of local chapters nationally for WIPA. Ensuring all requirements for chapter formation is met prior to going to charter.",
  },
  {
    icon: Award,
    name: "Awards Committee",
    description:
      "Oversees the development and implementation of WIPA's Awards program.",
  },
  {
    icon: Heart,
    name: "Community Development Committee",
    description:
      "WIPA believes that part of a strong business and a strong association is giving back to the community it thrives in. Our community development committee works with our chapters on collaborating with our members, using their core competencies, and bringing memories, togetherness, and joy to those in our communities.",
  },
];

export default function LeadershipRolesPage() {
  return (
    <>
      <section className="border-b border-border bg-dark py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-4xl font-light text-white sm:text-5xl">
            Leadership Roles
          </h1>
          <div className="mx-auto mt-4 h-px w-24 bg-gold" />
          <p className="mt-6 text-lg text-white/60">
            WIPA board members consist of a group of esteemed professionals
            whose passion for our industry is evident in the work they produce.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-muted-foreground">
              Joining a committee is a great way to learn more about WIPA and
              form closer relationships with your local chapter. Contact your
              local chapter president to learn more about joining these
              committees after you join.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {committees.map((committee) => (
              <Card key={committee.name} className="transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10">
                    <committee.icon className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold">
                    {committee.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {committee.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 rounded-lg bg-secondary p-8 text-center">
            <h2 className="text-xl font-light">
              Interested in a Leadership Role?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Contact your local chapter president or email{" "}
              <a
                href="mailto:info@wipa.org"
                className="text-gold hover:text-gold-dark"
              >
                info@wipa.org
              </a>{" "}
              to learn more about joining a committee.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/contact/leadership-interest">
                <Button className="bg-gold text-white hover:bg-gold-dark">
                  Express Leadership Interest
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/membership/join">
                <Button variant="outline">Join WIPA First</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
