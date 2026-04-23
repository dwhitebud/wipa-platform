import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getUserData } from "@/lib/supabase/get-user-data";
import { createClient } from "@/lib/supabase/server";
import { VENDOR_CATEGORY_LABELS } from "@/types";
import { format } from "date-fns";
import { ProfileForm } from "./profile-form";
import { AvatarUpload } from "./avatar-upload";
import { DocumentUpload } from "./document-upload";

export const metadata = {
  title: "My Profile",
};

export default async function ProfilePage() {
  const userData = await getUserData();
  const supabase = await createClient();
  const profile = userData?.profile;
  const user = userData?.user;
  const chapter = userData?.chapterMembership?.chapters as
    | { name: string }
    | undefined;
  const role = userData?.chapterMembership?.role;
  const subscription = userData?.subscription;

  const initials =
    (profile?.first_name?.[0] || "") + (profile?.last_name?.[0] || "") || "WM";
  const fullName =
    [profile?.first_name, profile?.last_name].filter(Boolean).join(" ") ||
    "WIPA Member";
  const categoryLabel = profile?.vendor_category
    ? VENDOR_CATEGORY_LABELS[
        profile.vendor_category as keyof typeof VENDOR_CATEGORY_LABELS
      ] || profile.vendor_category
    : "—";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-light tracking-tight sm:text-3xl">
          My Profile
        </h1>
        <p className="mt-1 text-muted-foreground">
          Manage your profile information and preferences
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Avatar & Quick Info */}
        <Card className="lg:col-span-1">
          <CardContent className="flex flex-col items-center p-8">
            <AvatarUpload
              avatarUrl={profile?.avatar_url || null}
              initials={initials}
            />
            <h2 className="mt-4 text-lg font-semibold">{fullName}</h2>
            <p className="text-sm text-muted-foreground">{categoryLabel}</p>
            <div className="mt-4 flex items-center gap-2">
              {subscription?.status === "active" ? (
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  Active Member
                </span>
              ) : (
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                  No Active Subscription
                </span>
              )}
            </div>
            <Separator className="my-6" />
            <div className="w-full space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Chapter</span>
                <span className="font-medium">{chapter?.name || "—"}</span>
              </div>
              {role && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Role</span>
                  <span className="font-medium capitalize">
                    {role.replace(/_/g, " ")}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Member Since</span>
                <span className="font-medium">
                  {user?.created_at
                    ? format(new Date(user.created_at), "MMM yyyy")
                    : "—"}
                </span>
              </div>
              {subscription?.current_period_end && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Renewal</span>
                  <span className="font-medium">
                    {format(
                      new Date(subscription.current_period_end),
                      "MMM yyyy"
                    )}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Profile Form — Client Component */}
        <ProfileForm
          profile={profile}
          email={user?.email || ""}
        />
      </div>

      {/* Document Upload */}
      <DocumentUpload
        documents={await getDocuments(supabase, user?.id)}
      />
    </div>
  );
}

async function getDocuments(supabase: any, userId: string | undefined) {
  if (!userId) return [];
  const { data } = await supabase
    .from("member_documents")
    .select("*")
    .eq("profile_id", userId)
    .order("created_at", { ascending: false });
  // Return only the latest of each type
  const latest: Record<string, any> = {};
  (data || []).forEach((doc: any) => {
    if (!latest[doc.document_type]) {
      latest[doc.document_type] = doc;
    }
  });
  return Object.values(latest);
}
