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
      categories: {
        Row: {
          created_at: string
          id: number
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          slug?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string | null
          email: string | null
          id: number
          message: string | null
          name: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: never
          message?: string | null
          name?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: never
          message?: string | null
          name?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string | null
          date: string | null
          description: string | null
          id: number
          location: string | null
          time: string | null
          title: string | null
        }
        Insert: {
          created_at?: string | null
          date?: string | null
          description?: string | null
          id?: never
          location?: string | null
          time?: string | null
          title?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string | null
          description?: string | null
          id?: never
          location?: string | null
          time?: string | null
          title?: string | null
        }
        Relationships: []
      }
      members: {
        Row: {
          age: number | null
          born: string | null
          born_number: string | null
          city: string | null
          evidencni: string | null
          ID_cus: number
          mail: string | null
          name: string | null
          obcan: number | null
          oddil: string | null
          phone: string | null
          popisne: string | null
          pozice: string | null
          role: number | null
          sex: string | null
          sport_id: number | null
          street: string | null
          surname: string | null
          tags: string | null
          trener: string | null
          trener_od: string | null
          zip: string | null
        }
        Insert: {
          age?: number | null
          born?: string | null
          born_number?: string | null
          city?: string | null
          evidencni?: string | null
          ID_cus: number
          mail?: string | null
          name?: string | null
          obcan?: number | null
          oddil?: string | null
          phone?: string | null
          popisne?: string | null
          pozice?: string | null
          role?: number | null
          sex?: string | null
          sport_id?: number | null
          street?: string | null
          surname?: string | null
          tags?: string | null
          trener?: string | null
          trener_od?: string | null
          zip?: string | null
        }
        Update: {
          age?: number | null
          born?: string | null
          born_number?: string | null
          city?: string | null
          evidencni?: string | null
          ID_cus?: number
          mail?: string | null
          name?: string | null
          obcan?: number | null
          oddil?: string | null
          phone?: string | null
          popisne?: string | null
          pozice?: string | null
          role?: number | null
          sex?: string | null
          sport_id?: number | null
          street?: string | null
          surname?: string | null
          tags?: string | null
          trener?: string | null
          trener_od?: string | null
          zip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_sport"
            columns: ["sport_id"]
            isOneToOne: false
            referencedRelation: "sports"
            referencedColumns: ["id"]
          },
        ]
      }
      members_duplicate: {
        Row: {
          age: number | null
          born: string | null
          born_number: string | null
          city: string | null
          evidencni: string | null
          ID_cus: number
          mail: string | null
          name: string | null
          obcan: number | null
          oddil: string | null
          phone: string | null
          popisne: string | null
          pozice: string | null
          role: number | null
          sex: string | null
          sport_id: number | null
          street: string | null
          surname: string | null
          tags: string | null
          trener: string | null
          trener_od: string | null
          zip: string | null
        }
        Insert: {
          age?: number | null
          born?: string | null
          born_number?: string | null
          city?: string | null
          evidencni?: string | null
          ID_cus: number
          mail?: string | null
          name?: string | null
          obcan?: number | null
          oddil?: string | null
          phone?: string | null
          popisne?: string | null
          pozice?: string | null
          role?: number | null
          sex?: string | null
          sport_id?: number | null
          street?: string | null
          surname?: string | null
          tags?: string | null
          trener?: string | null
          trener_od?: string | null
          zip?: string | null
        }
        Update: {
          age?: number | null
          born?: string | null
          born_number?: string | null
          city?: string | null
          evidencni?: string | null
          ID_cus?: number
          mail?: string | null
          name?: string | null
          obcan?: number | null
          oddil?: string | null
          phone?: string | null
          popisne?: string | null
          pozice?: string | null
          role?: number | null
          sex?: string | null
          sport_id?: number | null
          street?: string | null
          surname?: string | null
          tags?: string | null
          trener?: string | null
          trener_od?: string | null
          zip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "members_duplicate_sport_id_fkey"
            columns: ["sport_id"]
            isOneToOne: false
            referencedRelation: "sports"
            referencedColumns: ["id"]
          },
        ]
      }
      news: {
        Row: {
          content: string | null
          created_at: string | null
          id: number
          title: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: never
          title?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: never
          title?: string | null
        }
        Relationships: []
      }
      NOOOOOTIO: {
        Row: {
          archived: boolean | null
          attrs: Json | null
          created_time: string | null
          id: string | null
          last_edited_time: string | null
          url: string | null
        }
        Insert: {
          archived?: boolean | null
          attrs?: Json | null
          created_time?: string | null
          id?: string | null
          last_edited_time?: string | null
          url?: string | null
        }
        Update: {
          archived?: boolean | null
          attrs?: Json | null
          created_time?: string | null
          id?: string | null
          last_edited_time?: string | null
          url?: string | null
        }
        Relationships: []
      }
      obtížnost: {
        Row: {
          colour: string
          created_at: string
          difficulty: number
          id: number
        }
        Insert: {
          colour: string
          created_at?: string
          difficulty: number
          id: number
        }
        Update: {
          colour?: string
          created_at?: string
          difficulty?: number
          id?: number
        }
        Relationships: []
      }
      pages: {
        Row: {
          content: string | null
          created_at: string
          id: number
          tags: string | null
          title: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: number
          tags?: string | null
          title: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: number
          tags?: string | null
          title?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          description: string | null
          id: number
          image_url: string | null
          name: string | null
          order: number | null
          schedule: string | null
          schedule_label: string | null
        }
        Insert: {
          description?: string | null
          id?: never
          image_url?: string | null
          name?: string | null
          order?: number | null
          schedule?: string | null
          schedule_label?: string | null
        }
        Update: {
          description?: string | null
          id?: never
          image_url?: string | null
          name?: string | null
          order?: number | null
          schedule?: string | null
          schedule_label?: string | null
        }
        Relationships: []
      }
      sport_benefits: {
        Row: {
          created_at: string
          description: string
          id: number
          order_index: number | null
          sport_id: number
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
          order_index?: number | null
          sport_id: number
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          order_index?: number | null
          sport_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "sport_benefits_sport_id_fkey"
            columns: ["sport_id"]
            isOneToOne: false
            referencedRelation: "sports"
            referencedColumns: ["id"]
          },
        ]
      }
      sport_contacts: {
        Row: {
          created_at: string
          email: string | null
          id: number
          name: string
          phone: string | null
          sport_id: number
          times: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: number
          name: string
          phone?: string | null
          sport_id: number
          times?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: number
          name?: string
          phone?: string | null
          sport_id?: number
          times?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sport_contacts_sport_id_fkey"
            columns: ["sport_id"]
            isOneToOne: false
            referencedRelation: "sports"
            referencedColumns: ["id"]
          },
        ]
      }
      sport_images: {
        Row: {
          alt_text: string | null
          created_at: string
          id: number
          is_featured: boolean | null
          order_index: number | null
          sport_id: number
          url: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          id?: number
          is_featured?: boolean | null
          order_index?: number | null
          sport_id: number
          url: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          id?: number
          is_featured?: boolean | null
          order_index?: number | null
          sport_id?: number
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "sport_images_sport_id_fkey"
            columns: ["sport_id"]
            isOneToOne: false
            referencedRelation: "sports"
            referencedColumns: ["id"]
          },
        ]
      }
      sports: {
        Row: {
          audience: string | null
          background: string | null
          category_id: number | null
          color: string | null
          created_at: string
          description: string | null
          difficulty: number | null
          equipment: string | null
          id: number
          location: string | null
          name: string
          price: string | null
          slug: string
          updated_at: string
        }
        Insert: {
          audience?: string | null
          background?: string | null
          category_id?: number | null
          color?: string | null
          created_at?: string
          description?: string | null
          difficulty?: number | null
          equipment?: string | null
          id?: number
          location?: string | null
          name: string
          price?: string | null
          slug: string
          updated_at?: string
        }
        Update: {
          audience?: string | null
          background?: string | null
          category_id?: number | null
          color?: string | null
          created_at?: string
          description?: string | null
          difficulty?: number | null
          equipment?: string | null
          id?: number
          location?: string | null
          name?: string
          price?: string | null
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          bio: string | null
          id: number
          image_url: string | null
          name: string | null
          order: number | null
          position: string | null
        }
        Insert: {
          bio?: string | null
          id?: never
          image_url?: string | null
          name?: string | null
          order?: number | null
          position?: string | null
        }
        Update: {
          bio?: string | null
          id?: never
          image_url?: string | null
          name?: string | null
          order?: number | null
          position?: string | null
        }
        Relationships: []
      }
      todos: {
        Row: {
          id: number
          inserted_at: string
          is_complete: boolean | null
          task: string | null
          user_id: string
        }
        Insert: {
          id?: number
          inserted_at?: string
          is_complete?: boolean | null
          task?: string | null
          user_id: string
        }
        Update: {
          id?: number
          inserted_at?: string
          is_complete?: boolean | null
          task?: string | null
          user_id?: string
        }
        Relationships: []
      }
      traily: {
        Row: {
          builder: string | null
          difficulty: number | null
          elevation_gain_m: number | null
          end: string | null
          gps_end: string | null
          gps_start: string | null
          id: number
          legal: boolean | null
          length_km: number | null
          name: string | null
          sport: string | null
          sports: string | null
          start: string | null
          style: string | null
        }
        Insert: {
          builder?: string | null
          difficulty?: number | null
          elevation_gain_m?: number | null
          end?: string | null
          gps_end?: string | null
          gps_start?: string | null
          id: number
          legal?: boolean | null
          length_km?: number | null
          name?: string | null
          sport?: string | null
          sports?: string | null
          start?: string | null
          style?: string | null
        }
        Update: {
          builder?: string | null
          difficulty?: number | null
          elevation_gain_m?: number | null
          end?: string | null
          gps_end?: string | null
          gps_start?: string | null
          id?: number
          legal?: boolean | null
          length_km?: number | null
          name?: string | null
          sport?: string | null
          sports?: string | null
          start?: string | null
          style?: string | null
        }
        Relationships: []
      }
      vleky: {
        Row: {
          created_at: string
          elevation: number | null
          "gps end": string | null
          "gps start": string | null
          id: number
          long: number | null
          "max.rychlost": string | null
          name: string | null
          unasecu: number | null
          unasedel: number | null
          vykon_motoru: string | null
        }
        Insert: {
          created_at?: string
          elevation?: number | null
          "gps end"?: string | null
          "gps start"?: string | null
          id?: number
          long?: number | null
          "max.rychlost"?: string | null
          name?: string | null
          unasecu?: number | null
          unasedel?: number | null
          vykon_motoru?: string | null
        }
        Update: {
          created_at?: string
          elevation?: number | null
          "gps end"?: string | null
          "gps start"?: string | null
          id?: number
          long?: number | null
          "max.rychlost"?: string | null
          name?: string | null
          unasecu?: number | null
          unasedel?: number | null
          vykon_motoru?: string | null
        }
        Relationships: []
      }
      web_newsletters: {
        Row: {
          created_at: string
          "e-mail": string
          id: number
        }
        Insert: {
          created_at?: string
          "e-mail": string
          id?: number
        }
        Update: {
          created_at?: string
          "e-mail"?: string
          id?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      "3": "trener"
      role: "1" | "2" | "3"
      Střední: "5" | "3"
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
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
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

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
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
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      "3": ["trener"],
      role: ["1", "2", "3"],
      Střední: ["5", "3"],
    },
  },
} as const
