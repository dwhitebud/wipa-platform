import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Code of Ethics",
  description: "WIPA's Professional Code of Conduct and Ethics.",
};

const ethicsItems = [
  "We will maintain the highest standards of professional conduct in all business dealings.",
  "We will be truthful and accurate in all representations of our services, pricing, and qualifications.",
  "We will respect the confidentiality of our clients and fellow professionals.",
  "We will honor all contractual commitments and business obligations.",
  "We will carry adequate business insurance to protect our clients and partners.",
  "We will treat all clients, vendors, and industry partners with dignity, respect, and fairness.",
  "We will not engage in any deceptive, misleading, or unethical business practices.",
  "We will respect the intellectual property and creative work of our peers.",
  "We will pursue ongoing professional development to maintain industry excellence.",
  "We will support and uplift the wedding industry community through mentorship and collaboration.",
  "We will comply with all applicable local, state, and federal laws and regulations.",
  "We will promote diversity, equity, inclusion, and belonging within the wedding industry.",
];

export default function CodeOfEthicsPage() {
  return (
    <>
      <section className="border-b border-border bg-dark py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-4xl font-light text-white sm:text-5xl">
            Code of Ethics
          </h1>
          <div className="mx-auto mt-4 h-px w-24 bg-gold" />
          <p className="mt-6 text-lg text-white/60">
            WIPA&apos;s Professional Code of Conduct and Ethics
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-lg leading-relaxed text-muted-foreground">
            WIPA members are held to the highest standards of professional
            conduct. By joining WIPA, every member agrees to abide by our
            comprehensive Code of Ethics, which serves as the foundation of
            trust between our members and the couples they serve.
          </p>

          <Separator className="my-8" />

          <h2 className="text-2xl font-light">As WIPA Members, We Pledge:</h2>

          <ol className="mt-6 space-y-4">
            {ethicsItems.map((item, index) => (
              <li key={index} className="flex gap-4">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gold/10 text-sm font-semibold text-gold">
                  {index + 1}
                </span>
                <p className="pt-1 text-sm leading-relaxed text-muted-foreground">
                  {item}
                </p>
              </li>
            ))}
          </ol>

          <Separator className="my-8" />

          <p className="text-sm leading-relaxed text-muted-foreground">
            Violations of this Code of Ethics may result in review by the WIPA
            Ethics Committee and potential revocation of membership. If you have
            concerns about a WIPA member&apos;s conduct, please contact{" "}
            <a
              href="mailto:operations@wipa.org"
              className="text-gold hover:text-gold-dark"
            >
              operations@wipa.org
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
