import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Accepted MIME types
const ACCEPTED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { fileUrl, fileName, fileSize, fileType, documentType } =
    await request.json();

  const issues: string[] = [];
  let status = "pending";

  // --- Layer 1: Basic file validation ---

  // Check file type
  if (!ACCEPTED_TYPES.includes(fileType)) {
    issues.push("Invalid file type. Must be PDF, JPG, PNG, or WebP.");
    status = "rejected";
  }

  // Check file size
  if (fileSize > MAX_FILE_SIZE) {
    issues.push("File exceeds 10MB size limit.");
    status = "rejected";
  }

  // Check file name for document type hints
  const nameLower = (fileName || "").toLowerCase();
  const isInsurance = documentType === "insurance_certificate";
  const isLicense = documentType === "business_license";

  // Basic name-based heuristic (very rough)
  if (isInsurance) {
    const insuranceKeywords = [
      "insurance",
      "certificate",
      "liability",
      "coi",
      "acord",
      "policy",
      "coverage",
    ];
    const hasKeyword = insuranceKeywords.some((kw) => nameLower.includes(kw));
    if (hasKeyword) {
      issues.push("File name suggests insurance document — good match.");
    }
  }

  if (isLicense) {
    const licenseKeywords = [
      "license",
      "business",
      "registration",
      "permit",
      "llc",
      "corp",
      "ein",
    ];
    const hasKeyword = licenseKeywords.some((kw) => nameLower.includes(kw));
    if (hasKeyword) {
      issues.push("File name suggests business license — good match.");
    }
  }

  // --- Layer 2: AI-powered validation (placeholder) ---
  // TODO: When an AI vision API key is available, uncomment this section
  // to extract text from the document and validate:
  // - Document type matches what was declared
  // - Expiration date (reject if expired)
  // - Coverage amount >= $1,000,000 for insurance
  // - Business name matches profile
  // - Issuing authority is legitimate
  //
  // Example integration:
  // const ocrResult = await callAIVision(fileUrl);
  // const extracted = parseOCRResult(ocrResult);
  // if (extracted.expirationDate < today) status = 'expired';
  // if (extracted.coverageAmount < 100000000) status = 'needs_review';

  const result = {
    status: status === "rejected" ? "rejected" : "pending",
    issues,
    fileType,
    fileSize,
    documentType,
    // Placeholder fields — will be populated by AI OCR when available
    expirationDate: null as string | null,
    coverageAmount: null as number | null,
    businessName: null as string | null,
    issuingAuthority: null as string | null,
    aiVerified: false,
    message:
      status === "rejected"
        ? "Document was rejected due to validation errors."
        : "Document uploaded successfully. It will be reviewed by your chapter admin.",
  };

  return NextResponse.json(result);
}
