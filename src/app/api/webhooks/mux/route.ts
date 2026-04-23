import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const supabaseAdmin = getSupabaseAdmin();

  try {
    switch (body.type) {
      case "video.asset.ready": {
        const asset = body.data;
        const playbackId = asset.playback_ids?.[0]?.id;

        if (playbackId) {
          await supabaseAdmin
            .from("videos")
            .update({
              mux_playback_id: playbackId,
              duration: Math.round(asset.duration || 0),
              thumbnail_url: `https://image.mux.com/${playbackId}/thumbnail.webp`,
            })
            .eq("mux_asset_id", asset.id);
        }
        break;
      }

      case "video.asset.errored": {
        const asset = body.data;
        console.error(`Mux asset ${asset.id} errored:`, asset.errors);
        break;
      }

      case "video.asset.deleted": {
        const asset = body.data;
        await supabaseAdmin
          .from("videos")
          .update({ mux_playback_id: null })
          .eq("mux_asset_id", asset.id);
        break;
      }

      default:
        console.log(`Unhandled Mux webhook: ${body.type}`);
    }
  } catch (err) {
    console.error("Error processing Mux webhook:", err);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}
