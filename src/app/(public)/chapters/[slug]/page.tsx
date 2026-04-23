import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Calendar, ArrowRight, ArrowLeft } from "lucide-react";
import { getChapterImage } from "@/lib/chapter-images";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: chapter } = await supabase
    .from("chapters")
    .select("name")
    .eq("slug", slug)
    .single();

  return {
    title: chapter?.name ? `${chapter.name} Chapter` : "Chapter",
  };
}

export default async function ChapterPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: chapter } = await supabase
    .from("chapters")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!chapter) {
    notFound();
  }

  // Get member count for this chapter
  const { count: memberCount } = await supabase
    .from("chapter_memberships")
    .select("*", { count: "exact", head: true })
    .eq("chapter_id", chapter.id);

  // Get upcoming events for this chapter
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .eq("chapter_id", chapter.id)
    .gte("date_start", new Date().toISOString())
    .order("date_start", { ascending: true })
    .limit(3);

  return (
    <>
      <section className="relative border-b border-border bg-dark py-20">
        <img
          src={getChapterImage(slug)}
          alt={`${chapter.name} skyline`}
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <Link
            href="/chapters"
            className="mb-6 inline-flex items-center gap-1 text-sm text-white/50 hover:text-gold"
          >
            <ArrowLeft className="h-3 w-3" />
            All Chapters
          </Link>
          <h1 className="text-4xl font-light text-white sm:text-5xl">
            WIPA {chapter.name}
          </h1>
          <div className="mx-auto mt-4 h-px w-24 bg-gold" />
          {chapter.city && chapter.state && (
            <p className="mt-4 flex items-center justify-center gap-1.5 text-white/60">
              <MapPin className="h-4 w-4" />
              {chapter.city}, {chapter.state}
            </p>
          )}
          {chapter.status === "in_formation" && (
            <Badge className="mt-4 bg-gold/20 text-gold" variant="secondary">
              Chapter in Formation
            </Badge>
          )}
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="space-y-8 lg:col-span-2">
              {chapter.description ? (
                <div>
                  <h2 className="text-2xl font-light">About This Chapter</h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    {chapter.description}
                  </p>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-light">About WIPA {chapter.name}</h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    The WIPA {chapter.name} chapter brings together leading
                    wedding professionals in the {chapter.city} area for
                    education, networking, and community. Join us for monthly
                    events including design showcases, educational seminars, and
                    social gatherings.
                  </p>
                </div>
              )}

              {/* Upcoming Events */}
              <div>
                <h2 className="text-2xl font-light">Upcoming Events</h2>
                {events && events.length > 0 ? (
                  <div className="mt-4 space-y-3">
                    {events.map((event) => (
                      <Card key={event.id}>
                        <CardContent className="flex items-center gap-4 p-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold/10">
                            <Calendar className="h-6 w-6 text-gold" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{event.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {new Date(event.date_start).toLocaleDateString(
                                "en-US",
                                {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                              {event.location && ` — ${event.location}`}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-muted-foreground">
                    No upcoming events scheduled. Check back soon or{" "}
                    <Link href="/login" className="text-gold hover:text-gold-dark">
                      sign in
                    </Link>{" "}
                    to see the full calendar.
                  </p>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-gold/10">
                    <Users className="h-8 w-8 text-gold" />
                  </div>
                  <p className="mt-4 text-3xl font-semibold">
                    {memberCount || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Members</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="space-y-4 p-6">
                  <h3 className="font-semibold">Join WIPA {chapter.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Become part of our thriving community of wedding
                    professionals.
                  </p>
                  <Link href="/membership/join" className="block">
                    <Button className="w-full bg-gold text-white hover:bg-gold-dark">
                      Apply for Membership
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="space-y-4 p-6">
                  <h3 className="font-semibold">Contact This Chapter</h3>
                  <p className="text-sm text-muted-foreground">
                    Have questions about WIPA {chapter.name}?
                  </p>
                  <Link href="/contact" className="block">
                    <Button variant="outline" className="w-full">
                      Get in Touch
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
