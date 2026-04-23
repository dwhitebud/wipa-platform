import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export const metadata = {
  title: "Events Calendar",
  description: "Browse upcoming WIPA events across all chapters.",
};

const typeColors: Record<string, string> = {
  general_meeting: "bg-blue-100 text-blue-700",
  seminar: "bg-teal-100 text-teal-700",
  webinar: "bg-green-100 text-green-700",
  networking: "bg-purple-100 text-purple-700",
  social: "bg-amber-100 text-amber-700",
  design_showcase: "bg-pink-100 text-pink-700",
  national: "bg-gold/20 text-gold-dark",
};

const typeLabels: Record<string, string> = {
  general_meeting: "General Meeting",
  seminar: "Seminar",
  webinar: "Webinar",
  networking: "Networking",
  social: "Social",
  design_showcase: "Design Showcase",
  national: "National",
};

export default async function EventsPage() {
  const supabase = await createClient();

  const { data: events } = await supabase
    .from("events")
    .select("*, chapters(name, slug)")
    .gte("date_start", new Date().toISOString())
    .order("date_start", { ascending: true });

  return (
    <>
      <section className="relative border-b border-border bg-dark py-20">
        <img
          src="https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=1920&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-4xl font-light text-white sm:text-5xl">
            Events Calendar
          </h1>
          <div className="mx-auto mt-4 h-px w-24 bg-gold" />
          <p className="mt-6 text-lg text-white/60">
            Browse upcoming WIPA events across all chapters
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {events && events.length > 0 ? (
            <div className="space-y-4">
              {events.map((event) => (
                <Card key={event.id} className="transition-shadow hover:shadow-md">
                  <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-semibold">{event.title}</h3>
                        <Badge
                          className={typeColors[event.type] || "bg-gray-100 text-gray-700"}
                          variant="secondary"
                        >
                          {typeLabels[event.type] || event.type}
                        </Badge>
                        {event.is_national && (
                          <Badge className="bg-gold/20 text-gold-dark" variant="secondary">
                            National
                          </Badge>
                        )}
                      </div>
                      {event.description && (
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          {event.description}
                        </p>
                      )}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          {format(new Date(event.date_start), "MMM d, yyyy")}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          {format(new Date(event.date_start), "h:mm a")}
                        </span>
                        {event.location && (
                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4" />
                            {event.location}
                          </span>
                        )}
                        {event.capacity && (
                          <span className="flex items-center gap-1.5">
                            <Users className="h-4 w-4" />
                            {event.capacity} capacity
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {event.ticket_price_member === 0 ? (
                        <span className="text-sm font-medium text-green-600">
                          Free for Members
                        </span>
                      ) : (
                        <span className="text-sm font-medium">
                          ${((event.ticket_price_member || 0) / 100).toFixed(2)}
                        </span>
                      )}
                      <Link href="/login">
                        <Button size="sm" className="bg-gold text-white hover:bg-gold-dark">
                          Register
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <Calendar className="mx-auto h-12 w-12 text-muted-foreground/30" />
              <h2 className="mt-6 text-xl font-light">No Upcoming Events</h2>
              <p className="mt-2 text-muted-foreground">
                Check back soon for upcoming WIPA events across all chapters.
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                WIPA members can access the full events calendar and register
                for events through the{" "}
                <Link href="/login" className="text-gold hover:text-gold-dark">
                  Member Center
                </Link>
                .
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
