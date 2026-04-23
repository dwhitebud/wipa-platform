import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, FileText, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getUserData } from "@/lib/supabase/get-user-data";
import { format } from "date-fns";
import { DocumentReviewActions } from "./review-actions";

export const metadata = {
  title: "Review Documents",
};

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  auto_verified: "bg-blue-100 text-blue-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  needs_review: "bg-orange-100 text-orange-700",
  expired: "bg-gray-100 text-gray-700",
};

export default async function DocumentReviewPage() {
  const userData = await getUserData();
  const supabase = await createClient();

  const chapter = userData?.chapterMembership?.chapters as
    | { id: string; name: string }
    | undefined;
  const chapterId = chapter?.id;

  // Fetch all documents for chapter members that need review
  let documents: any[] = [];
  if (chapterId) {
    const { data } = await supabase
      .from("member_documents")
      .select(
        "*, profiles:profile_id(first_name, last_name, vendor_category)"
      )
      .in("status", ["pending", "needs_review", "auto_verified"])
      .order("created_at", { ascending: false });

    // Filter to only members in this chapter
    if (data) {
      const { data: chapterMembers } = await supabase
        .from("chapter_memberships")
        .select("profile_id")
        .eq("chapter_id", chapterId);

      const memberIds = new Set(
        (chapterMembers || []).map((m: any) => m.profile_id)
      );
      documents = data.filter((d: any) => memberIds.has(d.profile_id));
    }
  }

  // Also get recently reviewed docs
  let reviewedDocs: any[] = [];
  if (chapterId) {
    const { data } = await supabase
      .from("member_documents")
      .select(
        "*, profiles:profile_id(first_name, last_name, vendor_category)"
      )
      .in("status", ["approved", "rejected"])
      .order("reviewed_at", { ascending: false })
      .limit(10);

    if (data) {
      const { data: chapterMembers } = await supabase
        .from("chapter_memberships")
        .select("profile_id")
        .eq("chapter_id", chapterId);

      const memberIds = new Set(
        (chapterMembers || []).map((m: any) => m.profile_id)
      );
      reviewedDocs = data.filter((d: any) => memberIds.has(d.profile_id));
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-light tracking-tight sm:text-3xl">
          Review Documents
        </h1>
        <p className="mt-1 text-muted-foreground">
          {chapter?.name || "Your Chapter"} — Review member insurance
          certificates and business licenses
        </p>
      </div>

      {/* Pending Review */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Needs Review ({documents.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {documents.length > 0 ? (
            <div className="space-y-4">
              {documents.map((doc: any) => {
                const p = doc.profiles;
                const name = p
                  ? [p.first_name, p.last_name].filter(Boolean).join(" ")
                  : "Member";
                const isInsurance =
                  doc.document_type === "insurance_certificate";

                return (
                  <div
                    key={doc.id}
                    className="rounded-lg border border-border p-4"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gold/10">
                          {isInsurance ? (
                            <Shield className="h-5 w-5 text-gold" />
                          ) : (
                            <FileText className="h-5 w-5 text-gold" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{name}</p>
                          <p className="text-sm text-muted-foreground">
                            {isInsurance
                              ? "Certificate of Insurance"
                              : "Business License"}
                          </p>
                          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                            <span>{doc.file_name}</span>
                            <span>&middot;</span>
                            <span>
                              Uploaded{" "}
                              {format(
                                new Date(doc.created_at),
                                "MMM d, yyyy"
                              )}
                            </span>
                          </div>
                          <a
                            href={doc.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center gap-1 text-xs text-gold hover:text-gold-dark"
                          >
                            <ExternalLink className="h-3 w-3" />
                            View Document
                          </a>
                          <Badge
                            className={`ml-2 ${statusColors[doc.status] || ""}`}
                            variant="secondary"
                          >
                            {doc.status.replace(/_/g, " ")}
                          </Badge>
                        </div>
                      </div>
                      <DocumentReviewActions documentId={doc.id} />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No documents pending review
            </p>
          )}
        </CardContent>
      </Card>

      {/* Recently Reviewed */}
      {reviewedDocs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-muted-foreground">
              Recently Reviewed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reviewedDocs.map((doc: any) => {
                const p = doc.profiles;
                const name = p
                  ? [p.first_name, p.last_name].filter(Boolean).join(" ")
                  : "Member";
                const isInsurance =
                  doc.document_type === "insurance_certificate";

                return (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <div className="flex items-center gap-3">
                      {isInsurance ? (
                        <Shield className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      )}
                      <div>
                        <p className="text-sm font-medium">{name}</p>
                        <p className="text-xs text-muted-foreground">
                          {isInsurance ? "Insurance" : "License"} —{" "}
                          {doc.reviewed_at &&
                            format(
                              new Date(doc.reviewed_at),
                              "MMM d, yyyy"
                            )}
                        </p>
                      </div>
                    </div>
                    <Badge
                      className={statusColors[doc.status] || ""}
                      variant="secondary"
                    >
                      {doc.status}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
