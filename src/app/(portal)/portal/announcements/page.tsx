import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Pin, Globe, MapPin } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getUserData } from "@/lib/supabase/get-user-data";
import { format } from "date-fns";
import { CreateAnnouncementForm } from "./create-form";

export const metadata = {
  title: "Announcements",
};

export default async function AnnouncementsPage() {
  const userData = await getUserData();
  const supabase = await createClient();

  const chapter = userData?.chapterMembership?.chapters as
    | { id: string; name: string }
    | undefined;
  const chapterId = chapter?.id;
  const isBoardMember = userData?.isBoardMember || false;

  const { data: announcements } = chapterId
    ? await supabase
        .from("announcements")
        .select("*, chapters(name)")
        .or(`chapter_id.eq.${chapterId},scope.eq.national`)
        .order("pinned", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(20)
    : await supabase
        .from("announcements")
        .select("*, chapters(name)")
        .eq("scope", "national")
        .order("created_at", { ascending: false })
        .limit(20);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-light tracking-tight sm:text-3xl">
            Announcements
          </h1>
          <p className="mt-1 text-muted-foreground">
            Stay up to date with WIPA news and chapter updates
          </p>
        </div>
      </div>

      {isBoardMember && chapterId && (
        <CreateAnnouncementForm chapterId={chapterId} />
      )}

      {announcements && announcements.length > 0 ? (
        <div className="space-y-4">
          {announcements.map((a: any) => (
            <Card
              key={a.id}
              className={a.pinned ? "border-gold/30 bg-gold/5" : ""}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gold/10">
                    <Bell className="h-5 w-5 text-gold" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {a.pinned && <Pin className="h-3 w-3 text-gold" />}
                      <h3 className="text-base font-semibold">{a.title}</h3>
                    </div>
                    {a.body && (
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {a.body}
                      </p>
                    )}
                    <div className="mt-3 flex items-center gap-3">
                      <Badge variant="secondary" className="text-xs">
                        {a.scope === "national" ? (
                          <Globe className="mr-1 h-3 w-3" />
                        ) : (
                          <MapPin className="mr-1 h-3 w-3" />
                        )}
                        {a.scope === "national"
                          ? "National"
                          : a.chapters?.name || "Chapter"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(a.created_at), "MMM d, yyyy")}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <Bell className="mx-auto h-12 w-12 text-muted-foreground/30" />
          <h2 className="mt-4 text-lg font-light">No Announcements Yet</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Check back soon for news and updates.
          </p>
        </div>
      )}
    </div>
  );
}
