export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activity_log: {
        Row: {
          action: string
          created_at: string | null
          id: string
          metadata: Json | null
          profile_id: string | null
          project_id: string | null
          reference_id: string | null
          reference_type: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          profile_id?: string | null
          project_id?: string | null
          reference_id?: string | null
          reference_type?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          profile_id?: string | null
          project_id?: string | null
          reference_id?: string | null
          reference_type?: string | null
        }
        Relationships: []
      }
      announcements: {
        Row: {
          author_id: string
          body: string
          created_at: string | null
          id: string
          pinned: boolean | null
          published_at: string | null
          scope_id: string | null
          scope_type: Database["public"]["Enums"]["announcement_scope_type"]
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id: string
          body: string
          created_at?: string | null
          id?: string
          pinned?: boolean | null
          published_at?: string | null
          scope_id?: string | null
          scope_type: Database["public"]["Enums"]["announcement_scope_type"]
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string
          body?: string
          created_at?: string | null
          id?: string
          pinned?: boolean | null
          published_at?: string | null
          scope_id?: string | null
          scope_type?: Database["public"]["Enums"]["announcement_scope_type"]
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      applications: {
        Row: {
          business_license_url: string | null
          chapter_preference: string | null
          company_name: string | null
          created_at: string | null
          email: string
          id: string
          insurance_doc_url: string | null
          name: string
          notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["application_status"]
          tier_requested: Database["public"]["Enums"]["membership_tier"]
          updated_at: string | null
          vendor_category: Database["public"]["Enums"]["vendor_category"] | null
          years_experience: number | null
        }
        Insert: {
          business_license_url?: string | null
          chapter_preference?: string | null
          company_name?: string | null
          created_at?: string | null
          email: string
          id?: string
          insurance_doc_url?: string | null
          name: string
          notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["application_status"]
          tier_requested: Database["public"]["Enums"]["membership_tier"]
          updated_at?: string | null
          vendor_category?: Database["public"]["Enums"]["vendor_category"] | null
          years_experience?: number | null
        }
        Update: {
          business_license_url?: string | null
          chapter_preference?: string | null
          company_name?: string | null
          created_at?: string | null
          email?: string
          id?: string
          insurance_doc_url?: string | null
          name?: string
          notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["application_status"]
          tier_requested?: Database["public"]["Enums"]["membership_tier"]
          updated_at?: string | null
          vendor_category?: Database["public"]["Enums"]["vendor_category"] | null
          years_experience?: number | null
        }
        Relationships: []
      }
      chapters: {
        Row: {
          city: string | null
          cover_image: string | null
          created_at: string | null
          description: string | null
          founded_date: string | null
          id: string
          name: string
          region: string | null
          slug: string
          state: string | null
          status: Database["public"]["Enums"]["chapter_status"] | null
          updated_at: string | null
        }
        Insert: {
          city?: string | null
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          founded_date?: string | null
          id?: string
          name: string
          region?: string | null
          slug: string
          state?: string | null
          status?: Database["public"]["Enums"]["chapter_status"] | null
          updated_at?: string | null
        }
        Update: {
          city?: string | null
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          founded_date?: string | null
          id?: string
          name?: string
          region?: string | null
          slug?: string
          state?: string | null
          status?: Database["public"]["Enums"]["chapter_status"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      chapter_memberships: {
        Row: {
          chapter_id: string
          id: string
          joined_at: string | null
          profile_id: string
          role: Database["public"]["Enums"]["chapter_role"]
        }
        Insert: {
          chapter_id: string
          id?: string
          joined_at?: string | null
          profile_id: string
          role?: Database["public"]["Enums"]["chapter_role"]
        }
        Update: {
          chapter_id?: string
          id?: string
          joined_at?: string | null
          profile_id?: string
          role?: Database["public"]["Enums"]["chapter_role"]
        }
        Relationships: []
      }
      events: {
        Row: {
          address: string | null
          capacity: number | null
          chapter_id: string | null
          cover_image: string | null
          created_at: string | null
          created_by: string | null
          date_end: string | null
          date_start: string
          description: string | null
          id: string
          is_national: boolean | null
          location: string | null
          rsvp_deadline: string | null
          stripe_price_id: string | null
          ticket_price_member: number | null
          ticket_price_nonmember: number | null
          title: string
          type: Database["public"]["Enums"]["event_type"]
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          capacity?: number | null
          chapter_id?: string | null
          cover_image?: string | null
          created_at?: string | null
          created_by?: string | null
          date_end?: string | null
          date_start: string
          description?: string | null
          id?: string
          is_national?: boolean | null
          location?: string | null
          rsvp_deadline?: string | null
          stripe_price_id?: string | null
          ticket_price_member?: number | null
          ticket_price_nonmember?: number | null
          title: string
          type?: Database["public"]["Enums"]["event_type"]
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          capacity?: number | null
          chapter_id?: string | null
          cover_image?: string | null
          created_at?: string | null
          created_by?: string | null
          date_end?: string | null
          date_start?: string
          description?: string | null
          id?: string
          is_national?: boolean | null
          location?: string | null
          rsvp_deadline?: string | null
          stripe_price_id?: string | null
          ticket_price_member?: number | null
          ticket_price_nonmember?: number | null
          title?: string
          type?: Database["public"]["Enums"]["event_type"]
          updated_at?: string | null
        }
        Relationships: []
      }
      membership_plans: {
        Row: {
          active: boolean | null
          application_fee: number
          created_at: string | null
          description: string | null
          id: string
          interval: string
          max_members: number | null
          name: string
          price: number
          stripe_price_id: string | null
          tier: Database["public"]["Enums"]["membership_tier"]
        }
        Insert: {
          active?: boolean | null
          application_fee?: number
          created_at?: string | null
          description?: string | null
          id?: string
          interval?: string
          max_members?: number | null
          name: string
          price: number
          stripe_price_id?: string | null
          tier: Database["public"]["Enums"]["membership_tier"]
        }
        Update: {
          active?: boolean | null
          application_fee?: number
          created_at?: string | null
          description?: string | null
          id?: string
          interval?: string
          max_members?: number | null
          name?: string
          price?: number
          stripe_price_id?: string | null
          tier?: Database["public"]["Enums"]["membership_tier"]
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          business_license_url: string | null
          created_at: string | null
          first_name: string | null
          id: string
          insurance_verified: boolean | null
          instagram: string | null
          last_name: string | null
          linkedin: string | null
          national_role: Database["public"]["Enums"]["national_role"] | null
          phone: string | null
          updated_at: string | null
          vendor_category: Database["public"]["Enums"]["vendor_category"] | null
          website: string | null
          years_experience: number | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          business_license_url?: string | null
          created_at?: string | null
          first_name?: string | null
          id: string
          insurance_verified?: boolean | null
          instagram?: string | null
          last_name?: string | null
          linkedin?: string | null
          national_role?: Database["public"]["Enums"]["national_role"] | null
          phone?: string | null
          updated_at?: string | null
          vendor_category?: Database["public"]["Enums"]["vendor_category"] | null
          website?: string | null
          years_experience?: number | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          business_license_url?: string | null
          created_at?: string | null
          first_name?: string | null
          id?: string
          insurance_verified?: boolean | null
          instagram?: string | null
          last_name?: string | null
          linkedin?: string | null
          national_role?: Database["public"]["Enums"]["national_role"] | null
          phone?: string | null
          updated_at?: string | null
          vendor_category?: Database["public"]["Enums"]["vendor_category"] | null
          website?: string | null
          years_experience?: number | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          scope_id: string | null
          scope_type: Database["public"]["Enums"]["project_scope_type"]
          status: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          scope_id?: string | null
          scope_type: Database["public"]["Enums"]["project_scope_type"]
          status?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          scope_id?: string | null
          scope_type?: Database["public"]["Enums"]["project_scope_type"]
          status?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          company_id: string | null
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan_id: string
          profile_id: string
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_id: string
          profile_id: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_id?: string
          profile_id?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      videos: {
        Row: {
          access_level: Database["public"]["Enums"]["video_access_level"]
          category: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          duration: number | null
          id: string
          mux_asset_id: string | null
          mux_playback_id: string | null
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          access_level?: Database["public"]["Enums"]["video_access_level"]
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          duration?: number | null
          id?: string
          mux_asset_id?: string | null
          mux_playback_id?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          access_level?: Database["public"]["Enums"]["video_access_level"]
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          duration?: number | null
          id?: string
          mux_asset_id?: string | null
          mux_playback_id?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_chapter_board_member: {
        Args: { p_chapter_id: string; p_user_id: string }
        Returns: boolean
      }
      is_national_member: { Args: { p_user_id: string }; Returns: boolean }
      is_staff: { Args: { p_user_id: string }; Returns: boolean }
    }
    Enums: {
      announcement_scope_type: "chapter" | "national"
      application_status: "pending" | "under_review" | "approved" | "rejected"
      chapter_role:
        | "member"
        | "committee_member"
        | "committee_chair"
        | "director_marketing"
        | "director_programs"
        | "director_membership"
        | "treasurer"
        | "secretary"
        | "vice_president"
        | "president"
      chapter_status: "active" | "in_formation"
      committee_type:
        | "education"
        | "communications"
        | "membership"
        | "chapter_formation"
        | "awards"
        | "community_development"
      event_type:
        | "general_meeting"
        | "seminar"
        | "webinar"
        | "networking"
        | "social"
        | "design_showcase"
        | "national"
      membership_tier: "individual" | "corporate" | "emerging"
      national_role:
        | "national_board_member"
        | "national_treasurer"
        | "national_secretary"
        | "national_vice_president"
        | "national_president"
        | "national_advisor"
        | "staff"
      project_scope_type: "chapter" | "national"
      registration_status:
        | "registered"
        | "attended"
        | "cancelled"
        | "waitlisted"
      vendor_category:
        | "event_planner"
        | "decor"
        | "cake_designer"
        | "caterer"
        | "dj"
        | "florist"
        | "entertainment"
        | "hotelier"
        | "invitation"
        | "musician"
        | "officiant"
        | "photographer"
        | "rental"
        | "venue"
        | "videographer"
        | "other"
      video_access_level: "member" | "board" | "national"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof Database
}
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof Database
}
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never
