"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  vendor_category: string | null;
  phone: string | null;
  website: string | null;
  instagram: string | null;
  linkedin: string | null;
  years_experience: number | null;
  national_role: string | null;
};

type ChapterMembership = {
  chapter_id: string;
  role: string;
  chapters: {
    name: string;
    slug: string;
  };
};

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [chapterMembership, setChapterMembership] =
    useState<ChapterMembership | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      setUser(user);

      // Load profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileData) {
        setProfile(profileData as Profile);
      }

      // Load chapter membership
      const { data: membershipData } = await supabase
        .from("chapter_memberships")
        .select("chapter_id, role, chapters(name, slug)")
        .eq("profile_id", user.id)
        .limit(1)
        .single();

      if (membershipData) {
        setChapterMembership(membershipData as unknown as ChapterMembership);
      }

      setLoading(false);
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
        setProfile(null);
        setChapterMembership(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    user,
    profile,
    chapterMembership,
    loading,
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
