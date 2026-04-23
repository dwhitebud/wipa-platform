"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Check, X, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function ApplicationActions({
  applicationId,
}: {
  applicationId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState<"approve" | "reject" | null>(null);

  async function handleAction(action: "approve" | "reject") {
    setLoading(action);
    const supabase = createClient();

    await supabase
      .from("applications")
      .update({
        status: action === "approve" ? "approved" : "rejected",
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", applicationId);

    setLoading(null);
    router.refresh();
  }

  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        className="bg-green-600 text-white hover:bg-green-700"
        onClick={() => handleAction("approve")}
        disabled={loading !== null}
      >
        {loading === "approve" ? (
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
        onClick={() => handleAction("reject")}
        disabled={loading !== null}
      >
        {loading === "reject" ? (
          <Loader2 className="mr-1 h-3 w-3 animate-spin" />
        ) : (
          <X className="mr-1 h-3 w-3" />
        )}
        Reject
      </Button>
    </div>
  );
}
