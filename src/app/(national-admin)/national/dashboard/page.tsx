import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Globe, Calendar, Building2, FileText, UserPlus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";

export const metadata = {
  title: "National Dashboard",
};

export default async function NationalDashboardPage() {
  const supabase = await createClient();

  const [membersRes, chaptersRes, eventsRes, applicationsRes, videosRes] =
    await Promise.all([
      supabase.from("chapter_memberships").select("*", { count: "exact", head: true }),
      supabase.from("chapters").select("id, name, slug, status").order("name"),
      supabase.from("events").select("*", { count: "exact", head: true }),
      supabase
        .from("applications")
        .select("id, name, email, company_name, tier_requested, status, created_at, chapters:chapter_preference(name)")
        .eq("status", "pending")
        .order("created_at", { ascending: false })
        .limit(10),
      supabase.from("videos").select("*", { count: "exact", head: true }),
    ]);

  const totalMembers = membersRes.count || 0;
  const chapters = chaptersRes.data || [];
  const activeChapters = chapters.filter((c) => c.status === "active").length;
  const totalEvents = eventsRes.count || 0;
  const applications = applicationsRes.data || [];
  const totalVideos = videosRes.count || 0;

  // Get member counts per chapter for the leaderboard
  const { data: chapterCounts } = await supabase
    .from("chapter_memberships")
    .select("chapter_id, chapters(name)")
    .order("chapter_id");

  const countMap: Record<string, { name: string; count: number }> = {};
  (chapterCounts || []).forEach((row: any) => {
    const id = row.chapter_id;
    if (!countMap[id]) {
      countMap[id] = { name: row.chapters?.name || "Unknown", count: 0 };
    }
    countMap[id].count++;
  });
  const topChapters = Object.values(countMap)
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-light tracking-tight sm:text-3xl">
          National Dashboard
        </h1>
        <p className="mt-1 text-muted-foreground">
          Organization-wide overview across all WIPA chapters
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-3 p-4 sm:gap-4 sm:p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 sm:h-12 sm:w-12">
              <Users className="h-5 w-5 text-gold sm:h-6 sm:w-6" />
            </div>
            <div>
              <p className="text-xl font-semibold sm:text-2xl">{totalMembers}</p>
              <p className="text-xs text-muted-foreground sm:text-sm">Total Members</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4 sm:gap-4 sm:p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 sm:h-12 sm:w-12">
              <Building2 className="h-5 w-5 text-blue-600 sm:h-6 sm:w-6" />
            </div>
            <div>
              <p className="text-xl font-semibold sm:text-2xl">{activeChapters}</p>
              <p className="text-xs text-muted-foreground sm:text-sm">Active Chapters</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4 sm:gap-4 sm:p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 sm:h-12 sm:w-12">
              <UserPlus className="h-5 w-5 text-green-600 sm:h-6 sm:w-6" />
            </div>
            <div>
              <p className="text-xl font-semibold sm:text-2xl">{applications.length}</p>
              <p className="text-xs text-muted-foreground sm:text-sm">Pending Apps</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4 sm:gap-4 sm:p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 sm:h-12 sm:w-12">
              <Calendar className="h-5 w-5 text-purple-600 sm:h-6 sm:w-6" />
            </div>
            <div>
              <p className="text-xl font-semibold sm:text-2xl">{totalEvents}</p>
              <p className="text-xs text-muted-foreground sm:text-sm">Total Events</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4 sm:gap-4 sm:p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 sm:h-12 sm:w-12">
              <FileText className="h-5 w-5 text-pink-600 sm:h-6 sm:w-6" />
            </div>
            <div>
              <p className="text-xl font-semibold sm:text-2xl">{totalVideos}</p>
              <p className="text-xs text-muted-foreground sm:text-sm">Videos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4 sm:gap-4 sm:p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 sm:h-12 sm:w-12">
              <Globe className="h-5 w-5 text-amber-600 sm:h-6 sm:w-6" />
            </div>
            <div>
              <p className="text-xl font-semibold sm:text-2xl">{chapters.length}</p>
              <p className="text-xs text-muted-foreground sm:text-sm">Total Chapters</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Chapters by Membership</CardTitle>
          </CardHeader>
          <CardContent>
            {topChapters.length > 0 ? (
              <div className="space-y-3">
                {topChapters.map((ch) => (
                  <div
                    key={ch.name}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <span className="text-sm font-medium">{ch.name}</span>
                    <span className="text-sm font-semibold text-gold">
                      {ch.count}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-4 text-center text-sm text-muted-foreground">
                No membership data yet
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Applications</CardTitle>
          </CardHeader>
          <CardContent>
            {applications.length > 0 ? (
              <div className="space-y-3">
                {applications.map((app: any) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <div>
                      <p className="text-sm font-medium">{app.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {app.chapters?.name || "—"} —{" "}
                        <span className="capitalize">{app.tier_requested}</span>
                      </p>
                    </div>
                    <Badge
                      className="bg-amber-100 text-amber-700"
                      variant="secondary"
                    >
                      Pending
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-4 text-center text-sm text-muted-foreground">
                No pending applications
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
