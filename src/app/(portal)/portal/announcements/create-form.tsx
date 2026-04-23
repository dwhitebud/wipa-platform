"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function CreateAnnouncementForm({
  chapterId,
}: {
  chapterId: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    setSaving(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setSaving(false);
      return;
    }

    await supabase.from("announcements").insert({
      title: title.trim(),
      body: body.trim() || null,
      chapter_id: chapterId,
      author_id: user.id,
      scope: "chapter",
    });

    setTitle("");
    setBody("");
    setOpen(false);
    setSaving(false);
    router.refresh();
  }

  if (!open) {
    return (
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="gap-2"
      >
        <Plus className="h-4 w-4" />
        New Announcement
      </Button>
    );
  }

  return (
    <Card className="border-gold/30">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base">New Announcement</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setOpen(false)}
        >
          <ChevronUp className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ann-title">Title *</Label>
            <Input
              id="ann-title"
              placeholder="Announcement title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ann-body">Message</Label>
            <Textarea
              id="ann-body"
              placeholder="Write your announcement..."
              rows={3}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={saving || !title.trim()}
              className="bg-gold text-white hover:bg-gold-dark"
            >
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Post Announcement
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
