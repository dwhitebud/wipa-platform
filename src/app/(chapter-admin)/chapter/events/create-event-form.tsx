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
import { Plus, Loader2, ChevronUp } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function CreateEventForm({ chapterId }: { chapterId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    type: "",
    date: "",
    time: "",
    location: "",
    description: "",
    capacity: "",
    ticketPrice: "0",
  });

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.type || !form.date || !form.time) return;

    setSaving(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setSaving(false);
      return;
    }

    const dateStart = new Date(`${form.date}T${form.time}`).toISOString();
    const priceInCents = Math.round(parseFloat(form.ticketPrice || "0") * 100);

    await supabase.from("events").insert({
      title: form.title,
      type: form.type,
      date_start: dateStart,
      location: form.location || null,
      description: form.description || null,
      capacity: form.capacity ? parseInt(form.capacity) : null,
      ticket_price_member: priceInCents,
      ticket_price_guest: priceInCents,
      chapter_id: chapterId,
      created_by: user.id,
    });

    setForm({
      title: "",
      type: "",
      date: "",
      time: "",
      location: "",
      description: "",
      capacity: "",
      ticketPrice: "0",
    });
    setOpen(false);
    setSaving(false);
    router.refresh();
  }

  if (!open) {
    return (
      <Button
        onClick={() => setOpen(true)}
        className="bg-gold text-white hover:bg-gold-dark"
      >
        <Plus className="mr-2 h-4 w-4" />
        Create Event
      </Button>
    );
  }

  return (
    <Card className="border-gold/30">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base">Create New Event</CardTitle>
        <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
          <ChevronUp className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Event Title *</Label>
              <Input
                placeholder="e.g. Monthly Networking Mixer"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Event Type *</Label>
              <Select
                value={form.type}
                onValueChange={(v) => update("type", v ?? "")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general_meeting">General Meeting</SelectItem>
                  <SelectItem value="seminar">Seminar</SelectItem>
                  <SelectItem value="webinar">Webinar</SelectItem>
                  <SelectItem value="networking">Networking</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                  <SelectItem value="design_showcase">Design Showcase</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Date *</Label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) => update("date", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Time *</Label>
              <Input
                type="time"
                value={form.time}
                onChange={(e) => update("time", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                placeholder="Venue name and address"
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Capacity</Label>
                <Input
                  type="number"
                  placeholder="e.g. 50"
                  value={form.capacity}
                  onChange={(e) => update("capacity", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Price ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={form.ticketPrice}
                  onChange={(e) => update("ticketPrice", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Event details..."
              rows={3}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={saving || !form.title || !form.type || !form.date || !form.time}
              className="bg-gold text-white hover:bg-gold-dark"
            >
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Event
            </Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
