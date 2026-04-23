"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, X, Loader2, MessageSquare } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function DocumentReviewActions({
  documentId,
}: {
  documentId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");

  async function handleAction(action: "approved" | "rejected" | "needs_review") {
    setLoading(action);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    await supabase
      .from("member_documents")
      .update({
        status: action,
        reviewed_by: user?.id,
        reviewed_at: new Date().toISOString(),
        review_notes: notes || null,
        rejection_reason: action === "rejected" ? rejectionReason || "Document did not meet requirements" : null,
      })
      .eq("id", documentId);

    setLoading(null);
    router.refresh();
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Button
          size="sm"
          className="bg-green-600 text-white hover:bg-green-700"
          onClick={() => handleAction("approved")}
          disabled={loading !== null}
        >
          {loading === "approved" ? (
            <Loader2 className="mr-1 h-3 w-3 animate-spin" />
          ) : (
            <Check className="mr-1 h-3 w-3" />
          )}
          Approve
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="border-red-200 text-red-600 hover:bg-red-50"
          onClick={() => {
            if (!showNotes) {
              setShowNotes(true);
            } else {
              handleAction("rejected");
            }
          }}
          disabled={loading !== null}
        >
          {loading === "rejected" ? (
            <Loader2 className="mr-1 h-3 w-3 animate-spin" />
          ) : (
            <X className="mr-1 h-3 w-3" />
          )}
          Reject
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleAction("needs_review")}
          disabled={loading !== null}
        >
          {loading === "needs_review" ? (
            <Loader2 className="mr-1 h-3 w-3 animate-spin" />
          ) : (
            <MessageSquare className="mr-1 h-3 w-3" />
          )}
          Request Re-upload
        </Button>
      </div>

      {showNotes && (
        <div className="space-y-2">
          <Input
            placeholder="Rejection reason (required)..."
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            className="text-sm"
          />
          <Input
            placeholder="Additional notes (optional)..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="text-sm"
          />
        </div>
      )}
    </div>
  );
}
