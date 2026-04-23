import { createClient } from "@/lib/supabase/server";
import { getUserData } from "@/lib/supabase/get-user-data";
import { MemberGrid } from "./member-grid";

export const metadata = {
  title: "Member Directory",
};

export default async function DirectoryPage() {
  const userData = await getUserData();
  const supabase = await createClient();

  const chapterId = (
    userData?.chapterMembership?.chapters as { id: string } | undefined
  )?.id;
  const chapterName = (
    userData?.chapterMembership?.chapters as { name: string } | undefined
  )?.name;

  let members: any[] = [];
  if (chapterId) {
    const { data } = await supabase
      .from("chapter_memberships")
      .select(
        "role, profiles(id, first_name, last_name, avatar_url, vendor_category, website)"
      )
      .eq("chapter_id", chapterId)
      .order("role", { ascending: true })
      .limit(100);
    members = data || [];
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-light tracking-tight sm:text-3xl">
          Member Directory
        </h1>
        <p className="mt-1 text-muted-foreground">
          {chapterName
            ? `Browse and connect with WIPA members in ${chapterName}`
            : "Browse and connect with WIPA members in your chapter"}
        </p>
      </div>

      <MemberGrid members={members} />
    </div>
  );
}
