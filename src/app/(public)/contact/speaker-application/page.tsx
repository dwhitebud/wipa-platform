"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Send } from "lucide-react";

export default function SpeakerApplicationPage() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <>
        <section className="border-b border-border bg-dark py-20">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h1 className="text-4xl font-light text-white sm:text-5xl">Speaker Application</h1>
            <div className="mx-auto mt-4 h-px w-24 bg-gold" />
          </div>
        </section>
        <section className="py-24">
          <div className="mx-auto max-w-lg px-4 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="mt-8 text-2xl font-light">Application Submitted!</h2>
            <p className="mt-4 text-muted-foreground">
              Thank you for your interest in speaking at WIPA events. Our education committee will review your application.
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
          <h1 className="text-4xl font-light text-white sm:text-5xl">Speaker Application</h1>
          <div className="mx-auto mt-4 h-px w-24 bg-gold" />
          <p className="mt-6 text-lg text-white/60">
            Apply to speak at WIPA chapter events and conferences
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
                <Label>Company</Label>
                <Input placeholder="Your company" />
              </div>
              <div className="space-y-2">
                <Label>Website</Label>
                <Input placeholder="www.example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Topic(s) You Can Speak On *</Label>
              <Textarea placeholder="List the topics you are an expert in and would like to present on..." rows={3} required />
            </div>
            <div className="space-y-2">
              <Label>Bio &amp; Speaking Experience *</Label>
              <Textarea placeholder="Tell us about your background, previous speaking engagements, and why you'd be a great fit for WIPA events..." rows={5} required />
            </div>
            <Button type="submit" className="bg-gold text-white hover:bg-gold-dark">
              <Send className="mr-2 h-4 w-4" />
              Submit Application
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
