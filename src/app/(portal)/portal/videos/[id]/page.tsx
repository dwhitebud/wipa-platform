import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, User, Calendar } from "lucide-react";
import { format } from "date-fns";

type Props = { params: Promise<{ id: string }> };

export default async function VideoDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: video } = await supabase
    .from("videos")
    .select("*")
    .eq("id", id)
    .single();

  if (!video) notFound();

  const durationMin = video.duration
    ? `${Math.round(video.duration / 60)} min`
    : null;

  return (
    <div className="space-y-6">
      <Link
        href="/portal/videos"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-gold"
      >
        <ArrowLeft className="h-3 w-3" />
        Back to Video Library
      </Link>

      {/* Video Player */}
      <div className="overflow-hidden rounded-lg bg-black">
        {video.mux_playback_id ? (
          <div className="relative aspect-video">
            <iframe
              src={`https://stream.mux.com/${video.mux_playback_id}.m3u8`}
              className="h-full w-full"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
            {/* Mux Player embed — falls back to thumbnail if no playback */}
            <video
              controls
              className="h-full w-full"
              poster={`https://image.mux.com/${video.mux_playback_id}/thumbnail.webp?width=1280&height=720`}
            >
              <source
                src={`https://stream.mux.com/${video.mux_playback_id}.m3u8`}
                type="application/x-mpegURL"
              />
            </video>
          </div>
        ) : (
          <div className="flex aspect-video items-center justify-center">
            <div className="text-center text-white/60">
              <p className="text-lg">Video processing...</p>
              <p className="mt-1 text-sm">
                This video is being prepared and will be available shortly.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Video Info */}
      <div>
        <div className="flex flex-wrap items-center gap-2">
          {video.category && (
            <Badge variant="secondary" className="capitalize">
              {video.category}
            </Badge>
          )}
          {video.access_level && video.access_level !== "all_members" && (
            <Badge variant="secondary">{video.access_level}</Badge>
          )}
        </div>
        <h1 className="mt-2 text-2xl font-light sm:text-3xl">{video.title}</h1>
        {video.description && (
          <p className="mt-3 text-muted-foreground leading-relaxed">
            {video.description}
          </p>
        )}
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          {video.instructor && (
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {video.instructor}
            </span>
          )}
          {durationMin && (
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {durationMin}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {format(new Date(video.created_at), "MMM d, yyyy")}
          </span>
        </div>
      </div>
    </div>
  );
}
