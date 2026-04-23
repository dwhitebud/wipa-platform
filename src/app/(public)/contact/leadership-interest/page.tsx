"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Send } from "lucide-react";

export default function LeadershipInterestPage() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <>
        <section className="border-b border-border bg-dark py-20">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h1 className="text-4xl font-light text-white sm:text-5xl">Leadership Interest</h1>
            <div className="mx-auto mt-4 h-px w-24 bg-gold" />
          </div>
        </section>
        <section className="py-24">
          <div className="mx-auto max-w-lg px-4 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="mt-8 text-2xl font-light">Thank You!</h2>
            <p className="mt-4 text-muted-foreground">
              Your interest in WIPA leadership has been noted. Your chapter president will be in touch about available opportunities.
            </p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="border-b border-border bg-dark py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-4xl font-light text-white sm:text-5xl">Leadership Interest</h1>
          <div className="mx-auto mt-4 h-px w-24 bg-gold" />
          <p className="mt-6 text-lg text-white/60">
            Interested in a leadership role within your chapter?
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Full Name *</Label>
                <Input placeholder="Your name" required />
              </div>
              <div className="space-y-2">
                <Label>Email *</Label>
                <Input type="email" placeholder="you@example.com" required />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Current Chapter *</Label>
                <Input placeholder="e.g. Southern California" required />
              </div>
              <div className="space-y-2">
                <Label>Years as WIPA Member</Label>
                <Input type="number" placeholder="e.g. 3" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Areas of Interest *</Label>
              <Textarea placeholder="Which leadership roles or committees interest you? (e.g. Education Committee, Chapter President, Communications, etc.)" rows={3} required />
            </div>
            <div className="space-y-2">
              <Label>Why are you interested in leadership? *</Label>
              <Textarea placeholder="Tell us about your motivation and what you'd bring to a leadership role..." rows={4} required />
            </div>
            <Button type="submit" className="bg-gold text-white hover:bg-gold-dark">
              <Send className="mr-2 h-4 w-4" />
              Submit Interest
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
