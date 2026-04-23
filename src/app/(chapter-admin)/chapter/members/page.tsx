import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/lib/supabase/server";
import { getUserData } from "@/lib/supabase/get-user-data";
import { VENDOR_CATEGORY_LABELS } from "@/types";
import { format } from "date-fns";
import { ApplicationActions } from "./application-actions";

export const metadata = {
  title: "Manage Members",
};

export default async function ManageMembersPage() {
  const userData = await getUserData();
  const supabase = await createClient();

  const chapter = userData?.chapterMembership?.chapters as
    | { id: string; name: string }
    | undefined;
  const chapterId = chapter?.id;

  // Fetch members and pending applications in parallel
  const [membersRes, applicationsRes] = await Promise.all([
    chapterId
      ? supabase
          .from("chapter_memberships")
          .select("role, created_at, profiles(id, first_name, last_name, avatar_url, vendor_category, website)")
          .eq("chapter_id", chapterId)
          .order("role", { ascending: true })
          .limit(100)
      : Promise.resolve({ data: [] }),
    chapterId
      ? supabase
          .from("applications")
          .select("*")
          .eq("chapter_preference", chapterId)
          .eq("status", "pending")
          .order("created_at", { ascending: false })
      : Promise.resolve({ data: [] }),
  ]);

  const members = membersRes.data || [];
  const applications = applicationsRes.data || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-light tracking-tight sm:text-3xl">
          Manage Members
        </h1>
        <p className="mt-1 text-muted-foreground">
          {chapter?.name || "Your Chapter"} — {members.length} members
        </p>
      </div>

      {/* Pending Applications */}
      {applications.length > 0 && (
        <Card className="border-amber-200 bg-amber-50/50">
          <CardHeader>
            <CardTitle className="text-lg">
              Pending Applications ({applications.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {applications.map((app: any) => {
              const category = app.vendor_category
                ? VENDOR_CATEGORY_LABELS[app.vendor_category as keyof typeof VENDOR_CATEGORY_LABELS] || app.vendor_category
                : null;
              return (
                <div
                  key={app.id}
                  className="flex flex-col gap-3 rounded-lg border border-border bg-background p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium">{app.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {app.email}
                      {app.company_name && ` — ${app.company_name}`}
                    </p>
                    <div className="mt-1 flex flex-wrap gap-2 text-xs text-muted-foreground">
                      {category && <Badge variant="secondary">{category}</Badge>}
                      <Badge variant="secondary" className="capitalize">
                        {app.tier_requested}
                      </Badge>
                      <span>
                        Applied {format(new Date(app.created_at), "MMM d, yyyy")}
                      </span>
                    </div>
                  </div>
                  <ApplicationActions applicationId={app.id} />
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Member Roster */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Member Roster</CardTitle>
        </CardHeader>
        <CardContent>
          {members.length > 0 ? (
            <div className="space-y-2">
              {members.map((m: any) => {
                const p = m.profiles;
                if (!p) return null;
                const name = [p.first_name, p.last_name].filter(Boolean).join(" ") || "Member";
                const initials = (p.first_name?.[0] || "") + (p.last_name?.[0] || "") || "?";
                const category = p.vendor_category
                  ? VENDOR_CATEGORY_LABELS[p.vendor_category as keyof typeof VENDOR_CATEGORY_LABELS] || p.vendor_category
                  : null;

                return (
                  <div
                    key={p.id}
                    className="flex items-center gap-3 rounded-lg border border-border p-3"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={p.avatar_url || ""} />
                      <AvatarFallback className="bg-gold/10 text-sm text-gold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{name}</p>
                      <p className="text-xs text-muted-foreground">
                        {category || "—"}
                      </p>
                    </div>
                    {m.role !== "member" && (
                      <Badge variant="secondary" className="capitalize text-xs">
                        {m.role.replace(/_/g, " ")}
                      </Badge>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No members in this chapter yet
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
