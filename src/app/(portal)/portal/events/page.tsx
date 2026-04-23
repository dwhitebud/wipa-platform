import { createClient } from "@/lib/supabase/server";
import { getUserData } from "@/lib/supabase/get-user-data";
import { EventList } from "./event-list";

export const metadata = {
  title: "Events",
};

export default async function EventsPage() {
  const userData = await getUserData();
  const supabase = await createClient();

  const chapterId = (
    userData?.chapterMembership?.chapters as { id: string } | undefined
  )?.id;

  const { data: events } = chapterId
    ? await supabase
        .from("events")
        .select("id, title, date_start, location, type, capacity, ticket_price_member, is_national, chapters(name)")
        .or(`chapter_id.eq.${chapterId},is_national.eq.true`)
        .gte("date_start", new Date().toISOString())
        .order("date_start", { ascending: true })
        .limit(30)
    : await supabase
        .from("events")
        .select("id, title, date_start, location, type, capacity, ticket_price_member, is_national, chapters(name)")
        .gte("date_start", new Date().toISOString())
        .order("date_start", { ascending: true })
        .limit(30);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-light tracking-tight sm:text-3xl">Events</h1>
        <p className="mt-1 text-muted-foreground">
          Browse and register for WIPA events
        </p>
      </div>

      <EventList events={(events as any) || []} />
    </div>
  );
}
