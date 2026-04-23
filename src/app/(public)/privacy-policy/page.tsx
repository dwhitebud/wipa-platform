import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Privacy Policy",
  description: "WIPA Privacy Policy — how we collect, use, and protect your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="border-b border-border bg-dark py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-4xl font-light text-white sm:text-5xl">
            Privacy Policy
          </h1>
          <div className="mx-auto mt-4 h-px w-24 bg-gold" />
          <p className="mt-6 text-sm text-white/60">Last updated: March 2026</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl space-y-8 px-4 text-sm leading-relaxed text-muted-foreground sm:px-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground">1. Information We Collect</h2>
            <p className="mt-2">
              We collect information you provide directly to us, such as when you create an account, apply for membership, register for events, or contact us. This may include your name, email address, phone number, company name, and payment information.
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="text-lg font-semibold text-foreground">2. How We Use Your Information</h2>
            <p className="mt-2">
              We use the information we collect to provide, maintain, and improve our services, process transactions, send communications about events and membership, and respond to your requests.
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="text-lg font-semibold text-foreground">3. Information Sharing</h2>
            <p className="mt-2">
              We do not sell your personal information. We may share information with service providers who assist us in operating the platform (such as payment processors), or when required by law. Your profile information may be visible to other WIPA members through the member directory.
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="text-lg font-semibold text-foreground">4. Data Security</h2>
            <p className="mt-2">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="text-lg font-semibold text-foreground">5. Your Rights</h2>
            <p className="mt-2">
              You may access, update, or delete your personal information through your account settings. You may also contact us at{" "}
              <a href="mailto:operations@wipa.org" className="text-gold hover:text-gold-dark">
                operations@wipa.org
              </a>{" "}
              to exercise your data rights.
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="text-lg font-semibold text-foreground">6. Contact Us</h2>
            <p className="mt-2">
              If you have questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:operations@wipa.org" className="text-gold hover:text-gold-dark">
                operations@wipa.org
              </a>{" "}
              or write to us at 1001 Wilshire Boulevard, Suite 1540, Los Angeles, CA 90017.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
