import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Diversity, Equity, Inclusion + Belonging",
  description: "WIPA's commitment to DEI and belonging in the wedding industry.",
};

export default function DEIPage() {
  return (
    <>
      <section className="relative border-b border-border bg-dark py-20">
        <img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-4xl font-light text-white sm:text-5xl">
            Diversity, Equity,
            <br />
            Inclusion + Belonging
          </h1>
          <div className="mx-auto mt-4 h-px w-24 bg-gold" />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-lg leading-relaxed text-muted-foreground">
            WIPA is committed to fostering a culture of diversity, equity,
            inclusion, and belonging within the wedding industry. We believe
            that our industry thrives when it reflects the rich diversity of
            the couples and communities we serve.
          </p>

          <Separator className="my-8" />

          <h2 className="text-2xl font-light">Our Commitment</h2>
          <div className="mt-6 space-y-6">
            <div className="rounded-lg border border-border p-6">
              <h3 className="font-semibold text-gold">Diversity</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                We celebrate and embrace the full spectrum of human differences,
                including race, ethnicity, gender, sexual orientation, age,
                ability, religion, and socioeconomic background within our
                membership and leadership.
              </p>
            </div>
            <div className="rounded-lg border border-border p-6">
              <h3 className="font-semibold text-gold">Equity</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                We are committed to creating fair and just policies, practices,
                and opportunities that ensure all members have access to the
                resources and support they need to thrive in the wedding
                industry.
              </p>
            </div>
            <div className="rounded-lg border border-border p-6">
              <h3 className="font-semibold text-gold">Inclusion</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                We actively work to create an environment where every member
                feels welcomed, respected, supported, and valued. Our events,
                education, and community initiatives are designed to be
                accessible and inclusive.
              </p>
            </div>
            <div className="rounded-lg border border-border p-6">
              <h3 className="font-semibold text-gold">Belonging</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                We strive to build a genuine sense of community where every
                member can bring their authentic self, feel connected to their
                peers, and know that they are an integral part of the WIPA
                family.
              </p>
            </div>
          </div>

          <Separator className="my-8" />

          <p className="text-sm leading-relaxed text-muted-foreground">
            If you have questions or would like to get involved in WIPA&apos;s
            DEI initiatives, please contact us at{" "}
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
