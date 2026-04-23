import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getUserData } from "@/lib/supabase/get-user-data";
import { format } from "date-fns";
import { CreateEventForm } from "./create-event-form";

export const metadata = {
  title: "Manage Events",
};

export default async function ManageEventsPage() {
  const userData = await getUserData();
  const supabase = await createClient();

  const chapter = userData?.chapterMembership?.chapters as
    | { id: string; name: string }
    | undefined;
  const chapterId = chapter?.id;

  const { data: events } = chapterId
    ? await supabase
        .from("events")
        .select("*")
        .eq("chapter_id", chapterId)
        .order("date_start", { ascending: false })
        .limit(20)
    : { data: [] };

  const upcoming = (events || []).filter(
    (e: any) => new Date(e.date_start) >= new Date()
  );
  const past = (events || []).filter(
    (e: any) => new Date(e.date_start) < new Date()
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-light tracking-tight sm:text-3xl">
          Manage Events
        </h1>
        <p className="mt-1 text-muted-foreground">
          {chapter?.name || "Your Chapter"} — Create and manage chapter events
        </p>
      </div>

      {chapterId && <CreateEventForm chapterId={chapterId} />}

      {upcoming.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Upcoming Events ({upcoming.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcoming.map((event: any) => (
              <div
                key={event.id}
                className="flex items-center justify-between rounded-lg border border-border p-4"
              >
                <div className="space-y-1">
                  <p className="font-medium">{event.title}</p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(event.date_start), "MMM d, yyyy")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {format(new Date(event.date_start), "h:mm a")}
                    </span>
                    {event.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </span>
                    )}
                  </div>
                </div>
                <Badge variant="secondary" className="capitalize text-xs">
                  {event.type?.replace(/_/g, " ") || "Event"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {past.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-muted-foreground">
              Past Events ({past.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 opacity-60">
            {past.map((event: any) => (
              <div
                key={event.id}
                className="flex items-center justify-between rounded-lg border border-border p-4"
              >
                <div>
                  <p className="font-medium">{event.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(event.date_start), "MMM d, yyyy")}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {(!events || events.length === 0) && (
        <div className="py-16 text-center">
          <Calendar className="mx-auto h-12 w-12 text-muted-foreground/30" />
          <h2 className="mt-4 text-lg font-light">No Events Yet</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Create your first chapter event above.
          </p>
        </div>
      )}
    </div>
  );
}
