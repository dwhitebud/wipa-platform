import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, PlayCircle, Clock } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Video Library",
};

export default async function VideosPage() {
  const supabase = await createClient();

  const { data: videos } = await supabase
    .from("videos")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(40);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-light tracking-tight sm:text-3xl">Video Library</h1>
        <p className="mt-1 text-muted-foreground">
          24/7 access to WIPA&apos;s education video library
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search videos..." className="pl-10" />
      </div>

      {videos && videos.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {videos.map((video: any) => {
            const durationMin = video.duration
              ? `${Math.round(video.duration / 60)} min`
              : null;
            const thumbnail = video.thumbnail_url
              || (video.mux_playback_id
                ? `https://image.mux.com/${video.mux_playback_id}/thumbnail.webp?width=480&height=270`
                : null);

            return (
              <Card key={video.id} className="group cursor-pointer transition-shadow hover:shadow-md">
                <CardContent className="p-0">
                  <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-dark/5">
                    {thumbnail ? (
                      <img src={thumbnail} alt={video.title} className="h-full w-full object-cover" />
                    ) : (
                      <PlayCircle className="h-12 w-12 text-gold/40 transition-colors group-hover:text-gold" />
                    )}
                  </div>
                  <div className="p-4">
                    {video.category && (
                      <Badge variant="secondary" className="mb-2 text-xs capitalize">
                        {video.category}
                      </Badge>
                    )}
                    <h3 className="text-sm font-semibold leading-tight">{video.title}</h3>
                    {video.instructor && (
                      <p className="mt-1 text-xs text-muted-foreground">{video.instructor}</p>
                    )}
                    {durationMin && (
                      <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {durationMin}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="py-16 text-center">
          <PlayCircle className="mx-auto h-12 w-12 text-muted-foreground/30" />
          <h2 className="mt-4 text-lg font-light">No Videos Yet</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The video library will be populated with educational content soon.
          </p>
        </div>
      )}
    </div>
  );
}
