import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Our Story",
  description: "Learn about the founding and history of WIPA.",
};

export default function OurStoryPage() {
  return (
    <>
      <section className="relative border-b border-border bg-dark py-20">
        <img
          src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1920&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-4xl font-light text-white sm:text-5xl">
            Our WIPA Story
          </h1>
          <div className="mx-auto mt-4 h-px w-24 bg-gold" />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="prose prose-lg mx-auto max-w-none">
            <p className="text-lg leading-relaxed text-muted-foreground">
              The WIPA magic began in <strong className="text-foreground">2008</strong>, when two
              event professionals, <strong className="text-foreground">Joyce Scardina Becker</strong> and{" "}
              <strong className="text-foreground">Sharon Jensen</strong>, felt the wedding industry
              needed a not-for-profit member-run association that truly represents
              the industry, and protects the consumer.
            </p>

            <Separator className="my-8" />

            <p className="text-base leading-relaxed text-muted-foreground">
              The drawback of the existing associations were that they were
              planner-centric, and did not address the needs of a diverse set of
              creative and production partners. Additionally, these associations
              were all run as a business, for profit, by non-wedding
              professionals, and lacked true quality education and networking
              opportunities.
            </p>

            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              With this, the idea for WIPA was born. Twenty top wedding industry
              professionals contributed $20,000 to create the first chapter in
              Southern California. These founding members volunteered their time,
              money and energy to make a difference in the wedding industry by
              establishing a strong code of ethics and providing industry-leading
              education.
            </p>

            <Separator className="my-8" />

            <h2 className="text-2xl font-light text-foreground">The First Meeting</h2>

            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Thirty people attended the first exploratory meeting at Wildflower
              Linen to introduce WIPA to the industry. The response was
              overwhelming and weeks later they held the first official meeting at
              Rrivre Works. The event was held at 10 AM on a weekday — over 150
              attended.
            </p>

            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Good Gracious! served delectable food and plenty of champagne. The
              attendees were dazzled as 10 florists took over different areas of
              the Rrivre Works showroom. The design showcase that would become a
              WIPA event trademark was born. As Steve Kemble entertained and
              educated our guests on styles, trends, and the hidden secrets of
              events, he also invited the day&apos;s designers to participate on
              the panel. With this spectacular meeting the standards of WIPA
              design and education began.
            </p>

            <Separator className="my-8" />

            <h2 className="text-2xl font-light text-foreground">Growing Coast to Coast</h2>

            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Within a matter of years, WIPA has grown from coast to coast and
              internationally. WIPA is setting new standards of ethics, education,
              association conduct, and dazzling meetings. The WIPA board welcomes
              you to join the family of exceptional wedding professionals.
            </p>

            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Today, WIPA has <strong className="text-foreground">25 chapters</strong> across North
              America with more in formation, representing a vibrant community of
              wedding professionals across every discipline.
            </p>

            <Separator className="my-8" />

            <h2 className="text-2xl font-light text-foreground">Founding WIPA Members</h2>

            <p className="mt-4 text-sm text-muted-foreground">
              WIPA thanks these incredible founding members for their leadership,
              dedication and vision:
            </p>

            <div className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
              {[
                "Joyce Scardina Becker, Events of Distinction",
                "Pauline Parry, Good Gracious! Events",
                "Elaine Bell, Elaine Bell Catering",
                "Penton Media",
                "La Tavola Linen",
                "Wild Flower Linen",
                "Paula LeDuc",
                "Carneros Inn",
                "Therese Cole-Hubbs, ACS Event Services",
                "Cachet Wedding Design",
                "Paula Laskelle, Champagne Tastes Weddings",
                "Patrick McMichael, Denon & Doyle Entertainment",
                "Sharon Dexmier, Napa Valley Linens",
              ].map((member) => (
                <p key={member} className="rounded-md bg-secondary p-2">
                  {member}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
