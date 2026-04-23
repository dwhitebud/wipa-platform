"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";
import { Save, Globe, Instagram, Linkedin, Loader2, CheckCircle } from "lucide-react";
import { VENDOR_CATEGORY_LABELS } from "@/types";
import { createClient } from "@/lib/supabase/client";

type ProfileData = {
  first_name: string | null;
  last_name: string | null;
  bio: string | null;
  vendor_category: string | null;
  phone: string | null;
  website: string | null;
  instagram: string | null;
  linkedin: string | null;
} | null;

export function ProfileForm({
  profile,
  email,
}: {
  profile: ProfileData;
  email: string;
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    firstName: profile?.first_name || "",
    lastName: profile?.last_name || "",
    phone: profile?.phone || "",
    vendorCategory: profile?.vendor_category || "",
    bio: profile?.bio || "",
    website: profile?.website || "",
    instagram: profile?.instagram || "",
    linkedin: profile?.linkedin || "",
  });

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setSaving(false);
      return;
    }

    await supabase
      .from("profiles")
      .update({
        first_name: form.firstName || null,
        last_name: form.lastName || null,
        phone: form.phone || null,
        vendor_category: (form.vendorCategory as any) || null,
        bio: form.bio || null,
        website: form.website || null,
        instagram: form.instagram || null,
        linkedin: form.linkedin || null,
      })
      .eq("id", user.id);

    setSaving(false);
    setSaved(true);
    router.refresh();
  }

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              placeholder="First name"
              value={form.firstName}
              onChange={(e) => update("firstName", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Last name"
              value={form.lastName}
              onChange={(e) => update("lastName", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            disabled
            className="bg-muted"
          />
          <p className="text-xs text-muted-foreground">
            Contact support to change your email address
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(555) 123-4567"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Vendor Category</Label>
          <Select
            value={form.vendorCategory}
            onValueChange={(v) => update("vendorCategory", v ?? "")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your category" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(VENDOR_CATEGORY_LABELS).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            placeholder="Tell us about yourself and your business..."
            rows={4}
            value={form.bio}
            onChange={(e) => update("bio", e.target.value)}
          />
        </div>

        <Separator />

        <h3 className="text-sm font-semibold">Online Presence</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="website"
                placeholder="www.example.com"
                className="pl-10"
                value={form.website}
                onChange={(e) => update("website", e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="instagram">Instagram</Label>
            <div className="relative">
              <Instagram className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="instagram"
                placeholder="@handle"
                className="pl-10"
                value={form.instagram}
                onChange={(e) => update("instagram", e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <div className="relative">
              <Linkedin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="linkedin"
                placeholder="Profile URL"
                className="pl-10"
                value={form.linkedin}
                onChange={(e) => update("linkedin", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4">
          {saved && (
            <span className="flex items-center gap-1 text-sm text-green-600">
              <CheckCircle className="h-4 w-4" />
              Saved
            </span>
          )}
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-gold text-white hover:bg-gold-dark"
          >
            {saving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
