import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { eventId } = await request.json();

  if (!eventId) {
    return NextResponse.json(
      { error: "Event ID is required" },
      { status: 400 }
    );
  }

  // Check if already registered
  const { data: existing } = await supabase
    .from("event_registrations")
    .select("id")
    .eq("event_id", eventId)
    .eq("profile_id", user.id)
    .single();

  if (existing) {
    return NextResponse.json(
      { error: "Already registered", registered: true },
      { status: 409 }
    );
  }

  // Register
  const { error } = await supabase.from("event_registrations").insert({
    event_id: eventId,
    profile_id: user.id,
    status: "registered",
  });

  if (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to register" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
