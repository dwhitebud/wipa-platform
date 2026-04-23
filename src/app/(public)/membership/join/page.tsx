"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Upload,
  Loader2,
  User,
  Building2,
  Sparkles,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { VENDOR_CATEGORY_LABELS } from "@/types";

const tiers = [
  {
    id: "individual",
    name: "Individual Membership",
    price: "$350",
    fee: "$50 application fee",
    icon: User,
    description: "For wedding professionals with 3+ years of industry experience.",
    features: [
      "Tied to the individual (moves with you)",
      "Full member benefits",
      "Access to all chapter events",
      "24/7 video library access",
    ],
  },
  {
    id: "corporate",
    name: "Corporate Membership",
    price: "$550",
    fee: "$50 application fee",
    icon: Building2,
    description: "For businesses — includes 2 employee memberships.",
    features: [
      "Tied to the business",
      "Includes 2 employee memberships",
      "$250 per additional employee",
      "All individual benefits included",
    ],
  },
  {
    id: "emerging",
    name: "Emerging Membership",
    price: "$275",
    fee: "$50 application fee",
    icon: Sparkles,
    description: "For wedding professionals with less than 3 years of experience.",
    features: [
      "For professionals with < 3 years experience",
      "Full member benefits",
      "Upgrade path to Individual or Corporate",
      "24/7 video library access",
    ],
  },
];

type Chapter = { id: string; name: string; slug: string };

export default function JoinPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [form, setForm] = useState({
    tier: "",
    name: "",
    email: "",
    phone: "",
    companyName: "",
    vendorCategory: "",
    yearsExperience: "",
    chapterPreference: "",
    about: "",
  });

  useEffect(() => {
    async function loadChapters() {
      const supabase = createClient();
      const { data } = await supabase
        .from("chapters")
        .select("id, name, slug")
        .eq("status", "active")
        .order("name");
      if (data) setChapters(data);
    }
    loadChapters();
  }, []);

  function updateForm(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    setLoading(true);
    const supabase = createClient();

    const { error } = await supabase.from("applications").insert({
      name: form.name,
      email: form.email,
      company_name: form.companyName || null,
      vendor_category: form.vendorCategory as any || null,
      years_experience: form.yearsExperience ? parseInt(form.yearsExperience) : null,
      chapter_preference: form.chapterPreference || null,
      tier_requested: form.tier as any,
    });

    setLoading(false);

    if (!error) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <section className="py-24">
        <div className="mx-auto max-w-lg px-4 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="mt-8 text-3xl font-light">Application Submitted!</h1>
          <p className="mt-4 text-muted-foreground">
            Thank you for your interest in WIPA. Your membership application has
            been received and will be reviewed within 2-3 business days. You&apos;ll
            receive an email at <strong>{form.email}</strong> once your
            application has been processed.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            You must have a valid business license and current certificate of
            insurance ($1M+ per occurrence) ready for verification.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative border-b border-border bg-dark py-16">
        <img
          src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1920&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-4xl font-light text-white sm:text-5xl">
            Become a WIPA Member
          </h1>
          <div className="mx-auto mt-4 h-px w-24 bg-gold" />
          <p className="mt-6 text-white/60">
            The decision to join WIPA is an investment in your future success.
          </p>
        </div>
      </section>

      {/* Step Indicator */}
      <div className="border-b border-border bg-secondary/50">
        <div className="mx-auto flex max-w-3xl items-center justify-center gap-8 px-4 py-4">
          {[
            { num: 1, label: "Choose Plan" },
            { num: 2, label: "Your Info" },
            { num: 3, label: "Review" },
          ].map((s) => (
            <div
              key={s.num}
              className={`flex items-center gap-2 text-sm ${
                step >= s.num ? "text-gold" : "text-muted-foreground"
              }`}
            >
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                  step >= s.num
                    ? "bg-gold text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step > s.num ? "✓" : s.num}
              </span>
              <span className="hidden sm:inline">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4">
          {/* Step 1: Choose Plan */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-light">Choose Your Membership</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {tiers.map((tier) => (
                  <Card
                    key={tier.id}
                    className={`cursor-pointer transition-all ${
                      form.tier === tier.id
                        ? "border-gold ring-2 ring-gold/20"
                        : "hover:border-gold/50"
                    }`}
                    onClick={() => updateForm("tier", tier.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2">
                        <tier.icon className="h-5 w-5 text-gold" />
                        <Badge
                          variant="secondary"
                          className={
                            form.tier === tier.id
                              ? "bg-gold/10 text-gold"
                              : ""
                          }
                        >
                          {tier.id === "individual"
                            ? "Most Popular"
                            : tier.id === "corporate"
                            ? "Best Value"
                            : "New Pros"}
                        </Badge>
                      </div>
                      <h3 className="mt-3 text-lg font-semibold">{tier.name}</h3>
                      <p className="mt-1 text-2xl font-bold text-gold">
                        {tier.price}
                        <span className="text-sm font-normal text-muted-foreground">
                          /year
                        </span>
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        + {tier.fee}
                      </p>
                      <Separator className="my-4" />
                      <p className="text-sm text-muted-foreground">
                        {tier.description}
                      </p>
                      <ul className="mt-4 space-y-2">
                        {tier.features.map((f) => (
                          <li
                            key={f}
                            className="flex items-start gap-2 text-xs text-muted-foreground"
                          >
                            <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-gold" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={() => setStep(2)}
                  disabled={!form.tier}
                  className="bg-gold text-white hover:bg-gold-dark"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Personal Info */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-light">Your Information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Full Name *</Label>
                  <Input
                    placeholder="First and last name"
                    value={form.name}
                    onChange={(e) => updateForm("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email *</Label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => updateForm("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={form.phone}
                    onChange={(e) => updateForm("phone", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input
                    placeholder="Your business name"
                    value={form.companyName}
                    onChange={(e) => updateForm("companyName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Vendor Category *</Label>
                  <Select
                    value={form.vendorCategory}
                    onValueChange={(v) => updateForm("vendorCategory", v ?? "")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your category" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(VENDOR_CATEGORY_LABELS).map(
                        ([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Years of Experience *</Label>
                  <Input
                    type="number"
                    placeholder="e.g. 5"
                    value={form.yearsExperience}
                    onChange={(e) =>
                      updateForm("yearsExperience", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>Preferred Chapter *</Label>
                  <Select
                    value={form.chapterPreference}
                    onValueChange={(v) => updateForm("chapterPreference", v ?? "")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your chapter" />
                    </SelectTrigger>
                    <SelectContent>
                      {chapters.map((ch) => (
                        <SelectItem key={ch.id} value={ch.id}>
                          {ch.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-lg bg-secondary p-4 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">
                  Requirements for membership:
                </p>
                <ul className="mt-2 list-inside list-disc space-y-1">
                  <li>Legal Business Status</li>
                  <li>
                    Business Insurance of at least $1,000,000 per occurrence
                  </li>
                  <li>
                    {form.tier === "emerging"
                      ? "Less than 3 years experience in Weddings/Events"
                      : "3+ years experience in Weddings/Events"}
                  </li>
                </ul>
                <p className="mt-2 text-xs">
                  You will need to upload your business license and insurance
                  certificate during the verification process.
                </p>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={
                    !form.name ||
                    !form.email ||
                    !form.vendorCategory ||
                    !form.chapterPreference
                  }
                  className="bg-gold text-white hover:bg-gold-dark"
                >
                  Review Application
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-light">Review Your Application</h2>
              <Card>
                <CardContent className="space-y-4 p-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Membership Tier
                      </p>
                      <p className="mt-0.5 font-medium capitalize">
                        {form.tier} Membership
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Full Name</p>
                      <p className="mt-0.5 font-medium">{form.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="mt-0.5 font-medium">{form.email}</p>
                    </div>
                    {form.companyName && (
                      <div>
                        <p className="text-xs text-muted-foreground">Company</p>
                        <p className="mt-0.5 font-medium">{form.companyName}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-muted-foreground">Category</p>
                      <p className="mt-0.5 font-medium capitalize">
                        {VENDOR_CATEGORY_LABELS[
                          form.vendorCategory as keyof typeof VENDOR_CATEGORY_LABELS
                        ] || form.vendorCategory}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Years Experience
                      </p>
                      <p className="mt-0.5 font-medium">
                        {form.yearsExperience || "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Chapter</p>
                      <p className="mt-0.5 font-medium">
                        {chapters.find((c) => c.id === form.chapterPreference)
                          ?.name || "—"}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="rounded-lg bg-gold/5 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Annual Dues</p>
                        <p className="text-xs text-muted-foreground">
                          + $50 one-time application fee
                        </p>
                      </div>
                      <p className="text-2xl font-bold text-gold">
                        {tiers.find((t) => t.id === form.tier)?.price}
                        <span className="text-sm font-normal text-muted-foreground">
                          /yr
                        </span>
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Please allow 2-3 business days for your membership
                    application to be processed. There are no refunds, and
                    payment will be collected via credit or debit card after
                    approval.
                  </p>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-gold text-white hover:bg-gold-dark"
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <CheckCircle className="mr-2 h-4 w-4" />
                  )}
                  Submit Application
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
