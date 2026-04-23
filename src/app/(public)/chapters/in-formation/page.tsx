import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Chapters in Formation",
  description: "WIPA chapters currently in the formation process.",
};

export default async function ChaptersInFormationPage() {
  const supabase = await createClient();
  const { data: chapters } = await supabase
    .from("chapters")
    .select("*")
    .eq("status", "in_formation")
    .order("name");

  return (
    <>
      <section className="border-b border-border bg-dark py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-4xl font-light text-white sm:text-5xl">
            Chapters in Formation
          </h1>
          <div className="mx-auto mt-4 h-px w-24 bg-gold" />
          <p className="mt-6 text-lg text-white/60">
            These chapters are in the process of being established
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {chapters && chapters.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {chapters.map((chapter) => (
                <Card key={chapter.id}>
                  <CardContent className="p-6">
                    <Badge className="bg-gold/20 text-gold" variant="secondary">
                      In Formation
                    </Badge>
                    <h3 className="mt-3 text-lg font-semibold">{chapter.name}</h3>
                    {chapter.city && chapter.state && (
                      <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {chapter.city}, {chapter.state}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="py-12 text-center text-muted-foreground">
              No chapters are currently in formation. Check back soon!
            </p>
          )}

          <div className="mt-12 rounded-lg bg-secondary p-8 text-center">
            <h2 className="text-xl font-light">Want to Start a Chapter?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              If there isn&apos;t a WIPA chapter in your area, you can help start one.
            </p>
            <Link href="/chapters/start-a-chapter" className="mt-4 inline-block">
              <Button className="bg-gold text-white hover:bg-gold-dark">
                Learn How
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
