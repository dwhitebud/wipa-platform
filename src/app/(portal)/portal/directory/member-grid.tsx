"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Globe } from "lucide-react";
import { VENDOR_CATEGORY_LABELS } from "@/types";

type Member = {
  role: string;
  profiles: {
    id: string;
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
    vendor_category: string | null;
    website: string | null;
  };
};

export function MemberGrid({ members }: { members: Member[] }) {
  const [query, setQuery] = useState("");

  const filtered = members.filter((m) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    const p = m.profiles;
    const name = [p.first_name, p.last_name].filter(Boolean).join(" ").toLowerCase();
    const cat = p.vendor_category
      ? (VENDOR_CATEGORY_LABELS[p.vendor_category as keyof typeof VENDOR_CATEGORY_LABELS] || p.vendor_category).toLowerCase()
      : "";
    return name.includes(q) || cat.includes(q) || m.role.includes(q);
  });

  return (
    <>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search members by name or category..."
          className="pl-10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((m) => {
            const p = m.profiles;
            if (!p) return null;
            const initials =
              (p.first_name?.[0] || "") + (p.last_name?.[0] || "") || "?";
            const name =
              [p.first_name, p.last_name].filter(Boolean).join(" ") || "Member";
            const category = p.vendor_category
              ? VENDOR_CATEGORY_LABELS[
                  p.vendor_category as keyof typeof VENDOR_CATEGORY_LABELS
                ] || p.vendor_category
              : null;

            return (
              <Card key={p.id} className="transition-shadow hover:shadow-md">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={p.avatar_url || ""} />
                    <AvatarFallback className="bg-gold/10 text-lg text-gold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="mt-4 text-sm font-semibold">{name}</h3>
                  {m.role !== "member" && (
                    <p className="mt-0.5 text-xs capitalize text-gold">
                      {m.role.replace(/_/g, " ")}
                    </p>
                  )}
                  {category && (
                    <Badge variant="secondary" className="mt-2 text-xs">
                      {category}
                    </Badge>
                  )}
                  {p.website && (
                    <a
                      href={
                        p.website.startsWith("http")
                          ? p.website
                          : `https://${p.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 flex items-center gap-1 text-xs text-gold hover:text-gold-dark"
                    >
                      <Globe className="h-3 w-3" />
                      Website
                    </a>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-muted-foreground">
            {query ? "No members match your search." : "No members found."}
          </p>
        </div>
      )}
    </>
  );
}
