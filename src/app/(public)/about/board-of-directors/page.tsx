import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Board of Directors",
  description: "Meet the WIPA National Board of Directors.",
};

// TODO: Replace with real 2026 board member data
const boardMembers = [
  { name: "To Be Updated", title: "President", company: "" },
  { name: "To Be Updated", title: "Vice President", company: "" },
  { name: "To Be Updated", title: "Secretary", company: "" },
  { name: "To Be Updated", title: "Treasurer", company: "" },
  { name: "To Be Updated", title: "Director of Programs/Education", company: "" },
  { name: "To Be Updated", title: "Director of Membership & Retention", company: "" },
  { name: "To Be Updated", title: "Director of Marketing & Communications", company: "" },
  { name: "To Be Updated", title: "Director of Formation & Development", company: "" },
  { name: "To Be Updated", title: "Director of Community Engagement", company: "" },
  { name: "To Be Updated", title: "Director of DEI", company: "" },
];

const founders = [
  { name: "Joyce Scardina Becker", title: "Co-Founder", company: "Events of Distinction" },
  { name: "Sharon Jensen", title: "Co-Founder", company: "Sharon Jensen Events" },
];

export default function BoardOfDirectorsPage() {
  return (
    <>
      <section className="border-b border-border bg-dark py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-4xl font-light text-white sm:text-5xl">
            Board of Directors
          </h1>
          <div className="mx-auto mt-4 h-px w-24 bg-gold" />
          <p className="mt-6 text-lg text-white/60">
            2026 National Board of Directors &amp; Advisors
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="mx-auto max-w-3xl text-center text-muted-foreground">
            Launched in 2008, WIPA currently has 25 chapters and more in
            formation. Our National Board of Directors is composed of dedicated
            wedding industry professionals who volunteer their time and
            expertise to guide the organization&apos;s strategic direction,
            uphold our mission, and serve our membership.
          </p>

          <h2 className="mt-12 text-center text-2xl font-light">
            2026 National Board
          </h2>
          <div className="mx-auto mt-2 h-px w-16 bg-gold" />

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {boardMembers.map((member, i) => (
              <Card key={i} className="text-center">
                <CardContent className="p-6">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold/10 text-2xl font-light text-gold">
                    {member.name === "To Be Updated"
                      ? "?"
                      : member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                  </div>
                  <h3 className="mt-4 font-semibold">
                    {member.name === "To Be Updated" ? (
                      <span className="text-muted-foreground italic">
                        Coming Soon
                      </span>
                    ) : (
                      member.name
                    )}
                  </h3>
                  <p className="mt-1 text-sm text-gold">{member.title}</p>
                  {member.company && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {member.company}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <Separator className="my-12" />

          <h2 className="text-center text-2xl font-light">WIPA Founders</h2>
          <div className="mx-auto mt-2 h-px w-16 bg-gold" />

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:max-w-2xl lg:mx-auto">
            {founders.map((member) => (
              <Card key={member.name} className="text-center">
                <CardContent className="p-6">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold/10 text-2xl font-light text-gold">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <h3 className="mt-4 font-semibold">{member.name}</h3>
                  <p className="mt-1 text-sm text-gold">{member.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {member.company}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 rounded-lg bg-secondary p-8 text-center">
            <h2 className="text-xl font-light">Interested in Serving?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              WIPA board positions are filled through a nomination and election
              process. Contact{" "}
              <a
                href="mailto:info@wipa.org"
                className="text-gold hover:text-gold-dark"
              >
                info@wipa.org
              </a>{" "}
              to learn more about leadership opportunities.
            </p>
            <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/contact/leadership-interest">
                <Button className="bg-gold text-white hover:bg-gold-dark">
                  Express Leadership Interest
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/membership/leadership-roles">
                <Button variant="outline">View Leadership Roles</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
