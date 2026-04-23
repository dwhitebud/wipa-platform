"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, Search } from "lucide-react";
import { format } from "date-fns";

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

type Event = {
  id: string;
  title: string;
  date_start: string;
  location: string | null;
  type: string;
  capacity: number | null;
  ticket_price_member: number | null;
  is_national: boolean;
  chapters?: { name: string } | null;
};

export function EventList({
  events,
  onRegister,
}: {
  events: Event[];
  onRegister?: (eventId: string) => void;
}) {
  const [query, setQuery] = useState("");

  const filtered = events.filter((e) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      e.title.toLowerCase().includes(q) ||
      (e.location || "").toLowerCase().includes(q) ||
      (typeLabels[e.type] || e.type).toLowerCase().includes(q) ||
      (e.chapters?.name || "").toLowerCase().includes(q)
    );
  });

  return (
    <>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search events by title, location, or type..."
          className="pl-10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {filtered.length > 0 ? (
        <div className="space-y-4">
          {filtered.map((event) => (
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
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    {event.capacity && (
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {event.capacity} capacity
                      </span>
                    )}
                    {event.ticket_price_member === 0 ? (
                      <span className="font-medium text-green-600">Free for Members</span>
                    ) : event.ticket_price_member ? (
                      <span>${(event.ticket_price_member / 100).toFixed(2)}</span>
                    ) : null}
                    {event.chapters?.name && <span>{event.chapters.name}</span>}
                  </div>
                </div>
                <Button className="bg-gold text-white hover:bg-gold-dark">
                  Register
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <Calendar className="mx-auto h-12 w-12 text-muted-foreground/30" />
          <h2 className="mt-4 text-lg font-light">
            {query ? "No events match your search" : "No Upcoming Events"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Check back soon for new WIPA events.
          </p>
        </div>
      )}
    </>
  );
}
