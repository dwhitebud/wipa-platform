import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, UserPlus, BarChart3, FileText, Clock } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getUserData } from "@/lib/supabase/get-user-data";
import { format } from "date-fns";

export const metadata = {
  title: "Chapter Dashboard",
};

export default async function ChapterDashboardPage() {
  const userData = await getUserData();
  const supabase = await createClient();

  const chapter = userData?.chapterMembership?.chapters as
    | { id: string; name: string }
    | undefined;
  const chapterId = chapter?.id;

  // Fetch real stats in parallel
  const [membersRes, eventsRes, applicationsRes, boardProjectsRes] =
    await Promise.all([
      chapterId
        ? supabase
            .from("chapter_memberships")
            .select("*", { count: "exact", head: true })
            .eq("chapter_id", chapterId)
        : Promise.resolve({ count: 0 }),
      chapterId
        ? supabase
            .from("events")
            .select("id, title, date_start, location, capacity")
            .eq("chapter_id", chapterId)
            .gte("date_start", new Date().toISOString())
            .order("date_start", { ascending: true })
            .limit(5)
        : Promise.resolve({ data: [] }),
      chapterId
        ? supabase
            .from("applications")
            .select("id, name, email, company_name, vendor_category, created_at")
            .eq("chapter_preference", chapterId)
            .eq("status", "pending")
            .order("created_at", { ascending: false })
            .limit(5)
        : Promise.resolve({ data: [] }),
      chapterId
        ? supabase
            .from("board_projects")
            .select("*", { count: "exact", head: true })
            .eq("chapter_id", chapterId)
            .eq("status", "active")
        : Promise.resolve({ count: 0 }),
    ]);

  const memberCount = membersRes.count || 0;
  const events = eventsRes.data || [];
  const applications = applicationsRes.data || [];
  const projectCount = boardProjectsRes.count || 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-light tracking-tight sm:text-3xl">
          Chapter Dashboard
        </h1>
        <p className="mt-1 text-muted-foreground">
          {chapter?.name || "Your Chapter"} — Overview and key metrics
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3 p-4 sm:gap-4 sm:p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 sm:h-12 sm:w-12">
              <Users className="h-5 w-5 text-gold sm:h-6 sm:w-6" />
            </div>
            <div>
              <p className="text-xl font-semibold sm:text-2xl">{memberCount}</p>
              <p className="text-xs text-muted-foreground sm:text-sm">Total Members</p>
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
              <p className="text-xl font-semibold sm:text-2xl">{events.length}</p>
              <p className="text-xs text-muted-foreground sm:text-sm">Upcoming Events</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4 sm:gap-4 sm:p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 sm:h-12 sm:w-12">
              <FileText className="h-5 w-5 text-amber-600 sm:h-6 sm:w-6" />
            </div>
            <div>
              <p className="text-xl font-semibold sm:text-2xl">{projectCount}</p>
              <p className="text-xs text-muted-foreground sm:text-sm">Active Projects</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pending Applications</CardTitle>
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
                        {app.company_name ? `${app.company_name} — ` : ""}
                        {app.vendor_category || ""}
                      </p>
                    </div>
                    <Badge className="bg-amber-100 text-amber-700" variant="secondary">
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

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            {events.length > 0 ? (
              <div className="space-y-3">
                {events.map((event: any) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <div>
                      <p className="text-sm font-medium">{event.title}</p>
                      <p className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {format(new Date(event.date_start), "MMM d, yyyy")}
                      </p>
                    </div>
                    {event.capacity && (
                      <span className="text-sm font-medium text-gold">
                        {event.capacity} cap
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-4 text-center text-sm text-muted-foreground">
                No upcoming events
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
