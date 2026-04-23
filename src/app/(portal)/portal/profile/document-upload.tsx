"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  FileText,
  Shield,
  CheckCircle,
  AlertCircle,
  Clock,
  Loader2,
  X,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { format } from "date-fns";

type Document = {
  id: string;
  document_type: string;
  file_name: string;
  file_url: string;
  status: string;
  expiration_date: string | null;
  coverage_amount: number | null;
  rejection_reason: string | null;
  review_notes: string | null;
  created_at: string;
  validation_result: any;
};

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  pending: { label: "Pending Review", color: "bg-amber-100 text-amber-700", icon: Clock },
  auto_verified: { label: "Auto-Verified", color: "bg-blue-100 text-blue-700", icon: CheckCircle },
  approved: { label: "Approved", color: "bg-green-100 text-green-700", icon: CheckCircle },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-700", icon: AlertCircle },
  needs_review: { label: "Needs Review", color: "bg-orange-100 text-orange-700", icon: AlertCircle },
  expired: { label: "Expired", color: "bg-gray-100 text-gray-700", icon: AlertCircle },
};

const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function DocumentUpload({
  documents,
}: {
  documents: Document[];
}) {
  const router = useRouter();
  const [uploading, setUploading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const insuranceRef = useRef<HTMLInputElement>(null);
  const licenseRef = useRef<HTMLInputElement>(null);

  const insuranceDoc = documents.find((d) => d.document_type === "insurance_certificate");
  const licenseDoc = documents.find((d) => d.document_type === "business_license");

  async function handleUpload(
    file: File,
    docType: "insurance_certificate" | "business_license"
  ) {
    setError(null);

    // Validate file type
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Please upload a PDF, JPG, or PNG file.");
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setError("File must be under 10MB.");
      return;
    }

    setUploading(docType);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setUploading(null);
      return;
    }

    const ext = file.name.split(".").pop();
    const path = `${user.id}/${docType}-${Date.now()}.${ext}`;

    // Upload file to storage
    const { error: uploadError } = await supabase.storage
      .from("documents")
      .upload(path, file, { upsert: true });

    if (uploadError) {
      setError("Upload failed. Please try again.");
      setUploading(null);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("documents").getPublicUrl(path);

    // Call validation API
    const validationRes = await fetch("/api/documents/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileUrl: publicUrl,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        documentType: docType,
      }),
    });

    const validation = await validationRes.json();

    // Insert document record
    await supabase.from("member_documents").insert({
      profile_id: user.id,
      document_type: docType,
      file_url: publicUrl,
      file_name: file.name,
      file_size: file.size,
      status: validation.status || "pending",
      expiration_date: validation.expirationDate || null,
      coverage_amount: validation.coverageAmount || null,
      business_name: validation.businessName || null,
      validation_result: validation,
      validated_at: new Date().toISOString(),
    });

    setUploading(null);
    router.refresh();
  }

  function renderDocCard(
    title: string,
    icon: any,
    docType: "insurance_certificate" | "business_license",
    doc: Document | undefined,
    inputRef: React.RefObject<HTMLInputElement | null>,
    description: string
  ) {
    const Icon = icon;
    const status = doc ? statusConfig[doc.status] || statusConfig.pending : null;
    const StatusIcon = status?.icon;

    return (
      <div className="rounded-lg border border-border p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gold/10">
            <Icon className="h-5 w-5 text-gold" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold">{title}</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>

            {doc ? (
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge
                    className={status?.color}
                    variant="secondary"
                  >
                    {StatusIcon && <StatusIcon className="mr-1 h-3 w-3" />}
                    {status?.label}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {doc.file_name}
                  </span>
                </div>

                {doc.expiration_date && (
                  <p className="text-xs text-muted-foreground">
                    Expires: {format(new Date(doc.expiration_date), "MMM d, yyyy")}
                  </p>
                )}

                {doc.coverage_amount && (
                  <p className="text-xs text-muted-foreground">
                    Coverage: ${(doc.coverage_amount / 100).toLocaleString()}
                  </p>
                )}

                {doc.rejection_reason && (
                  <p className="mt-1 text-xs text-red-600">
                    Reason: {doc.rejection_reason}
                  </p>
                )}

                {doc.review_notes && (
                  <p className="mt-1 text-xs text-muted-foreground italic">
                    Note: {doc.review_notes}
                  </p>
                )}

                {(doc.status === "rejected" || doc.status === "expired" || doc.status === "needs_review") && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => inputRef.current?.click()}
                    disabled={uploading !== null}
                    className="mt-2"
                  >
                    <Upload className="mr-1 h-3 w-3" />
                    Re-upload
                  </Button>
                )}
              </div>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => inputRef.current?.click()}
                disabled={uploading !== null}
                className="mt-3"
              >
                {uploading === docType ? (
                  <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                ) : (
                  <Upload className="mr-1 h-3 w-3" />
                )}
                Upload Document
              </Button>
            )}
          </div>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.webp"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file, docType);
            e.target.value = "";
          }}
        />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Required Documents</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-xs text-muted-foreground">
          WIPA membership requires proof of business insurance ($1M+ per
          occurrence) and a valid business license. Upload both documents below.
        </p>

        {error && (
          <div className="flex items-center gap-2 rounded-md bg-red-50 p-3 text-sm text-red-600">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            {error}
            <button onClick={() => setError(null)} className="ml-auto">
              <X className="h-3 w-3" />
            </button>
          </div>
        )}

        {renderDocCard(
          "Certificate of Insurance",
          Shield,
          "insurance_certificate",
          insuranceDoc,
          insuranceRef,
          "Liability insurance of at least $1,000,000 per occurrence"
        )}

        {renderDocCard(
          "Business License",
          FileText,
          "business_license",
          licenseDoc,
          licenseRef,
          "Current and valid business license or registration"
        )}
      </CardContent>
    </Card>
  );
}
