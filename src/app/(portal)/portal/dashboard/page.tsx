import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Calendar,
  Users,
  PlayCircle,
  CreditCard,
  ArrowRight,
  Bell,
  Clock,
  MapPin,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getUserData } from "@/lib/supabase/get-user-data";
import { format } from "date-fns";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const userData = await getUserData();
  const supabase = await createClient();

  const profile = userData?.profile;
  const chapter = userData?.chapterMembership?.chapters as
    | { id: string; name: string; slug: string }
    | undefined;
  const chapterId = chapter?.id;

  // Fetch real stats in parallel
  const [eventsResult, membersResult, videosResult, announcementsResult] =
    await Promise.all([
      // Upcoming events for user's chapter (or all if no chapter)
      chapterId
        ? supabase
            .from("events")
            .select("id, title, date_start, location, type")
            .eq("chapter_id", chapterId)
            .gte("date_start", new Date().toISOString())
            .order("date_start", { ascending: true })
            .limit(3)
        : supabase
            .from("events")
            .select("id, title, date_start, location, type")
            .gte("date_start", new Date().toISOString())
            .order("date_start", { ascending: true })
            .limit(3),
      // Chapter member count
      chapterId
        ? supabase
            .from("chapter_memberships")
            .select("*", { count: "exact", head: true })
            .eq("chapter_id", chapterId)
        : Promise.resolve({ count: 0 }),
      // Video count
      supabase
        .from("videos")
        .select("*", { count: "exact", head: true }),
      // Recent announcements
      chapterId
        ? supabase
            .from("announcements")
            .select("id, title, body, scope, created_at")
            .or(`chapter_id.eq.${chapterId},scope.eq.national`)
            .order("created_at", { ascending: false })
            .limit(3)
        : supabase
            .from("announcements")
            .select("id, title, body, scope, created_at")
            .eq("scope", "national")
            .order("created_at", { ascending: false })
            .limit(3),
    ]);

  const events = eventsResult.data || [];
  const memberCount = membersResult.count || 0;
  const videoCount = videosResult.count || 0;
  const announcements = announcementsResult.data || [];
  const subscriptionStatus = userData?.subscription?.status || "none";

  const firstName = profile?.first_name || "Member";

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-light tracking-tight sm:text-3xl">
          Welcome back, {firstName}
        </h1>
        <p className="mt-1 text-muted-foreground">
          {chapter
            ? `Here\u2019s what\u2019s happening in WIPA ${chapter.name}`
            : "Here\u2019s what\u2019s happening in your WIPA community"}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3 p-4 sm:gap-4 sm:p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 sm:h-12 sm:w-12">
              <Calendar className="h-5 w-5 text-gold sm:h-6 sm:w-6" />
            </div>
            <div>
              <p className="text-xl font-semibold sm:text-2xl">{events.length}</p>
              <p className="text-xs text-muted-foreground sm:text-sm">Upcoming Events</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4 sm:gap-4 sm:p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 sm:h-12 sm:w-12">
              <Users className="h-5 w-5 text-gold sm:h-6 sm:w-6" />
            </div>
            <div>
              <p className="text-xl font-semibold sm:text-2xl">{memberCount}</p>
              <p className="text-xs text-muted-foreground sm:text-sm">Chapter Members</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4 sm:gap-4 sm:p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 sm:h-12 sm:w-12">
              <PlayCircle className="h-5 w-5 text-gold sm:h-6 sm:w-6" />
            </div>
            <div>
              <p className="text-xl font-semibold sm:text-2xl">{videoCount}</p>
              <p className="text-xs text-muted-foreground sm:text-sm">Videos Available</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4 sm:gap-4 sm:p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 sm:h-12 sm:w-12">
              <CreditCard className="h-5 w-5 text-gold sm:h-6 sm:w-6" />
            </div>
            <div>
              <p className="text-xl font-semibold capitalize sm:text-2xl">
                {subscriptionStatus === "active" ? "Active" : subscriptionStatus === "none" ? "—" : subscriptionStatus}
              </p>
              <p className="text-xs text-muted-foreground sm:text-sm">Membership</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Upcoming Events */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              Upcoming Events
            </CardTitle>
            <Link href="/portal/events">
              <Button variant="ghost" size="sm" className="text-gold">
                View All
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {events.length > 0 ? (
              events.map((event: any) => (
                <div
                  key={event.id}
                  className="flex items-start gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-secondary/50"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gold/10">
                    <Calendar className="h-5 w-5 text-gold" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold">{event.title}</h4>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {format(new Date(event.date_start), "MMM d, yyyy 'at' h:mm a")}
                      </span>
                      {event.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="py-4 text-center text-sm text-muted-foreground">
                No upcoming events scheduled
              </p>
            )}
          </CardContent>
        </Card>

        {/* Recent Announcements */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              Announcements
            </CardTitle>
            <Link href="/portal/announcements">
              <Button variant="ghost" size="sm" className="text-gold">
                View All
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {announcements.length > 0 ? (
              announcements.map((a: any) => (
                <div
                  key={a.id}
                  className="flex items-start gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-secondary/50"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gold/10">
                    <Bell className="h-5 w-5 text-gold" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold">{a.title}</h4>
                      {a.scope === "national" && (
                        <Badge variant="secondary" className="text-[10px]">National</Badge>
                      )}
                    </div>
                    {a.body && (
                      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                        {a.body}
                      </p>
                    )}
                    <p className="mt-2 text-xs text-muted-foreground/60">
                      {format(new Date(a.created_at), "MMM d, yyyy")}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="py-4 text-center text-sm text-muted-foreground">
                No announcements yet
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/portal/profile">
              <Button
                variant="outline"
                className="h-auto w-full justify-start gap-3 px-4 py-3"
              >
                <Users className="h-4 w-4 text-gold" />
                <span className="text-sm">Edit Profile</span>
              </Button>
            </Link>
            <Link href="/portal/events">
              <Button
                variant="outline"
                className="h-auto w-full justify-start gap-3 px-4 py-3"
              >
                <Calendar className="h-4 w-4 text-gold" />
                <span className="text-sm">Browse Events</span>
              </Button>
            </Link>
            <Link href="/portal/videos">
              <Button
                variant="outline"
                className="h-auto w-full justify-start gap-3 px-4 py-3"
              >
                <PlayCircle className="h-4 w-4 text-gold" />
                <span className="text-sm">Watch Videos</span>
              </Button>
            </Link>
            <Link href="/portal/payments">
              <Button
                variant="outline"
                className="h-auto w-full justify-start gap-3 px-4 py-3"
              >
                <CreditCard className="h-4 w-4 text-gold" />
                <span className="text-sm">Manage Payments</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
