import { createClient } from "@/lib/supabase/server";
import { getUserData } from "@/lib/supabase/get-user-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Flame } from "lucide-react";
import { CampfireChat } from "./campfire-chat";

type Props = { params: Promise<{ id: string }> };

export default async function CampfirePage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const userData = await getUserData();

  const { data: project } = await supabase
    .from("board_projects")
    .select("id, name")
    .eq("id", id)
    .single();

  if (!project) notFound();

  // Load recent messages (last 50)
  const { data: messages } = await supabase
    .from("campfire_messages")
    .select("id, body, created_at, author_id, profiles:author_id(first_name, last_name, avatar_url)")
    .eq("project_id", id)
    .order("created_at", { ascending: true })
    .limit(50);

  const userId = userData?.user?.id || "";
  const userName = [
    userData?.profile?.first_name,
    userData?.profile?.last_name,
  ]
    .filter(Boolean)
    .join(" ") || "Member";

  return (
    <div className="flex h-[calc(100vh-80px)] flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <Link
          href={`/board/projects/${id}`}
          className="text-muted-foreground hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <Flame className="h-5 w-5 text-orange-500" />
        <div>
          <h1 className="text-sm font-semibold">Campfire</h1>
          <p className="text-xs text-muted-foreground">{project.name}</p>
        </div>
      </div>

      {/* Chat — Client Component */}
      <CampfireChat
        projectId={id}
        userId={userId}
        userName={userName}
        initialMessages={(messages as any) || []}
      />
    </div>
  );
}
