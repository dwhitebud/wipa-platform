import { createClient } from "./server";

export async function getUserData() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const [{ data: profile }, { data: chapterMembership }, { data: subscription }] =
    await Promise.all([
      supabase.from("profiles").select("*").eq("id", user.id).single(),
      supabase
        .from("chapter_memberships")
        .select("*, chapters(id, name, slug)")
        .eq("profile_id", user.id)
        .limit(1)
        .single(),
      supabase
        .from("subscriptions")
        .select("*, membership_plans(*)")
        .eq("profile_id", user.id)
        .eq("status", "active")
        .limit(1)
        .single(),
    ]);

  return {
    user,
    profile,
    chapterMembership,
    subscription,
    isNationalAdmin: !!profile?.national_role,
    isBoardMember:
      !!chapterMembership &&
      [
        "director_marketing",
        "director_programs",
        "director_membership",
        "treasurer",
        "secretary",
        "vice_president",
        "president",
      ].includes(chapterMembership.role),
  };
}
