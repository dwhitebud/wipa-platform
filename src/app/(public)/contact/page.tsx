"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Send,
  Megaphone,
  Mic,
  Users,
  CheckCircle,
} from "lucide-react";

const contactOptions = [
  {
    title: "Sponsor Inquiry",
    description: "Partner with WIPA and reach our diverse membership.",
    href: "/contact/sponsor-inquiry",
    icon: Megaphone,
  },
  {
    title: "Speaker Application",
    description: "Apply to speak at WIPA chapter events and conferences.",
    href: "/contact/speaker-application",
    icon: Mic,
  },
  {
    title: "Leadership Interest",
    description: "Interested in a leadership role within your chapter?",
    href: "/contact/leadership-interest",
    icon: Users,
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <>
        <section className="border-b border-border bg-dark py-20">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h1 className="text-4xl font-light text-white sm:text-5xl">
              Contact Us
            </h1>
            <div className="mx-auto mt-4 h-px w-24 bg-gold" />
          </div>
        </section>
        <section className="py-24">
          <div className="mx-auto max-w-lg px-4 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="mt-8 text-2xl font-light">Message Sent!</h2>
            <p className="mt-4 text-muted-foreground">
              Thank you for reaching out. A member of our team will get back to
              you shortly.
            </p>
            <Link href="/">
              <Button variant="outline" className="mt-8">
                Back to Home
              </Button>
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="relative border-b border-border bg-dark py-20">
        <img
          src="https://images.unsplash.com/photo-1529543544282-ea3407407e65?w=1920&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-4xl font-light text-white sm:text-5xl">
            Contact Us
          </h1>
          <div className="mx-auto mt-4 h-px w-24 bg-gold" />
          <p className="mt-6 text-lg text-white/60">
            Get in touch with WIPA
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-light">Contact a WIPA Chapter</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Have a question about WIPA? Fill out the form below and
                we&apos;ll connect you with the right person.
              </p>

              <form
                className="mt-8 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Name *</Label>
                    <Input placeholder="Your name" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Email *</Label>
                    <Input type="email" placeholder="you@example.com" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="What is this regarding?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="membership">Membership Question</SelectItem>
                      <SelectItem value="events">Events</SelectItem>
                      <SelectItem value="chapters">Chapters</SelectItem>
                      <SelectItem value="sponsorship">Sponsorship</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Message *</Label>
                  <Textarea
                    placeholder="How can we help?"
                    rows={5}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-gold text-white hover:bg-gold-dark"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-6 lg:col-span-2">
              <div className="rounded-lg bg-secondary p-6">
                <Mail className="h-6 w-6 text-gold" />
                <h3 className="mt-3 font-semibold">Email Us</h3>
                <a
                  href="mailto:info@wipa.org"
                  className="mt-1 block text-sm text-gold hover:text-gold-dark"
                >
                  info@wipa.org
                </a>
                <a
                  href="mailto:operations@wipa.org"
                  className="mt-1 block text-sm text-gold hover:text-gold-dark"
                >
                  operations@wipa.org
                </a>
              </div>

              <div className="space-y-3">
                {contactOptions.map((option) => (
                  <Link key={option.href} href={option.href}>
                    <Card className="transition-all hover:border-gold hover:shadow-sm">
                      <CardContent className="flex items-start gap-3 p-4">
                        <option.icon className="mt-0.5 h-5 w-5 text-gold" />
                        <div>
                          <h4 className="text-sm font-semibold">
                            {option.title}
                          </h4>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {option.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
