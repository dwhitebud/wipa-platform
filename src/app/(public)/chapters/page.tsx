import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { getChapterImage } from "@/lib/chapter-images";

export const metadata = {
  title: "Chapters",
  description: "Explore WIPA chapters across North America",
};

export default async function ChaptersPage() {
  const supabase = await createClient();
  const { data: chapters } = await supabase
    .from("chapters")
    .select("*")
    .order("name");

  const activeChapters = chapters?.filter((c) => c.status === "active") ?? [];
  const formingChapters =
    chapters?.filter((c) => c.status === "in_formation") ?? [];

  return (
    <>
      <section className="relative border-b border-border bg-dark py-20">
        <img
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-4xl font-light text-white sm:text-5xl">
            Our Chapters
          </h1>
          <div className="mx-auto mt-4 h-px w-24 bg-gold" />
          <p className="mt-6 text-lg text-white/60">
            {activeChapters.length} active chapters across North America
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {activeChapters.map((chapter) => (
              <Link
                key={chapter.id}
                href={`/chapters/${chapter.slug}`}
                className="group overflow-hidden rounded-lg border border-border transition-all hover:border-gold hover:shadow-md"
              >
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={getChapterImage(chapter.slug)}
                    alt={`${chapter.name}`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <h3 className="absolute bottom-3 left-4 text-lg font-semibold text-white">
                    {chapter.name}
                  </h3>
                </div>
                {chapter.city && chapter.state && (
                  <div className="px-4 py-3">
                    <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      {chapter.city}, {chapter.state}
                    </p>
                  </div>
                )}
              </Link>
            ))}
          </div>

          {formingChapters.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-light">Chapters in Formation</h2>
              <div className="mx-auto mt-2 h-px w-16 bg-gold" />
              <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {formingChapters.map((chapter) => (
                  <div
                    key={chapter.id}
                    className="rounded-lg border border-dashed border-border p-6"
                  >
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-muted-foreground">
                        {chapter.name}
                      </h3>
                      <Badge
                        variant="secondary"
                        className="text-xs text-gold"
                      >
                        Forming
                      </Badge>
                    </div>
                    {chapter.city && chapter.state && (
                      <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        {chapter.city}, {chapter.state}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 text-center">
            <p className="text-muted-foreground">
              Interested in starting a WIPA chapter in your area?
            </p>
            <Link
              href="/chapters/start-a-chapter"
              className="mt-2 inline-block text-gold hover:text-gold-dark"
            >
              Learn how to start a chapter →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
