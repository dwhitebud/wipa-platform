import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Membership FAQs",
  description: "Frequently asked questions about WIPA membership.",
};

const faqs = [
  {
    question: "What is WIPA?",
    answer:
      "WIPA (Wedding Industry Professionals Association) is a not-for-profit association for leading wedding professionals in North America. Founded in 2008, our mission is to foster excellence through comprehensive education, dynamic networking opportunities, and valuable resource offerings.",
  },
  {
    question: "Who can join WIPA?",
    answer:
      "WIPA welcomes all wedding industry professionals including event planners, florists, photographers, videographers, caterers, venues, DJs, cake designers, entertainers, rental companies, officiants, invitation designers, hoteliers, decor specialists, and musicians. You must have a legal business status and business insurance of at least $1,000,000 per occurrence.",
  },
  {
    question: "What membership tiers are available?",
    answer:
      "WIPA offers three membership tiers: Individual ($350/year) for professionals with 3+ years experience, Corporate ($550/year) for businesses including 2 employee memberships, and Emerging ($275/year) for professionals with less than 3 years experience. All tiers have a one-time $50 application fee.",
  },
  {
    question: "Can I attend events at other chapters?",
    answer:
      "Yes! One of the great benefits of WIPA membership is that you can attend events at any WIPA chapter nationwide. Your membership is not restricted to your home chapter.",
  },
  {
    question: "How long does the application process take?",
    answer:
      "Please allow 2-3 business days for your membership application to be processed. You must upload your business license and current certificate of insurance during the submission process.",
  },
  {
    question: "What is the difference between Individual and Corporate membership?",
    answer:
      "Individual Membership is tied to the person and moves with them if they change businesses. Corporate Membership is tied to a business and includes 2 employee memberships, with additional employees available at $250 each. Corporate memberships cannot be transferred to another business.",
  },
  {
    question: "Can I upgrade my membership?",
    answer:
      "Yes. Emerging members can upgrade to Individual or Corporate membership once they reach 3 years of experience. Individual members can upgrade to Corporate membership, but note that once upgraded, the membership becomes tied to the business.",
  },
  {
    question: "Are there refunds?",
    answer:
      "There are no refunds on membership dues. Payment must be made via credit or debit card.",
  },
  {
    question: "What is the video education library?",
    answer:
      "WIPA members have 24/7 access to a comprehensive video education library featuring industry experts covering topics from floral design to marketing, business development, and emerging trends.",
  },
  {
    question: "How can I get involved in leadership?",
    answer:
      "WIPA offers many leadership opportunities including committee positions (Education, Communications, Membership, Awards, Community Development) and board roles. Contact your local chapter president to learn more about available positions.",
  },
];

export default function FAQPage() {
  return (
    <>
      <section className="relative border-b border-border bg-dark py-20">
        <img
          src="https://images.unsplash.com/photo-1478146059778-26028b07395a?w=1920&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-4xl font-light text-white sm:text-5xl">
            Membership FAQs
          </h1>
          <div className="mx-auto mt-4 h-px w-24 bg-gold" />
          <p className="mt-6 text-lg text-white/60">
            Answers to frequently asked questions about WIPA membership
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Accordion className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="rounded-lg border border-border px-6"
              >
                <AccordionTrigger className="text-left text-base font-medium hover:text-gold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 rounded-lg bg-secondary p-8 text-center">
            <h2 className="text-xl font-light">Still have questions?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Please email{" "}
              <a
                href="mailto:operations@wipa.org"
                className="text-gold hover:text-gold-dark"
              >
                operations@wipa.org
              </a>{" "}
              with your question, or contact us directly.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/membership/join">
                <Button className="bg-gold text-white hover:bg-gold-dark">
                  Apply for Membership
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline">Contact Us</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
