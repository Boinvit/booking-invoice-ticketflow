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
      bookings: {
        Row: {
          booking_date: string
          booking_time: string
          business_id: string
          client_id: string
          created_at: string
          duration_minutes: number
          id: string
          notes: string | null
          service_id: string
          staff_id: string | null
          status: Database["public"]["Enums"]["booking_status"] | null
          ticket_number: string
          total_amount: number
          updated_at: string
        }
        Insert: {
          booking_date: string
          booking_time: string
          business_id: string
          client_id: string
          created_at?: string
          duration_minutes: number
          id?: string
          notes?: string | null
          service_id: string
          staff_id?: string | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          ticket_number: string
          total_amount: number
          updated_at?: string
        }
        Update: {
          booking_date?: string
          booking_time?: string
          business_id?: string
          client_id?: string
          created_at?: string
          duration_minutes?: number
          id?: string
          notes?: string | null
          service_id?: string
          staff_id?: string | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          ticket_number?: string
          total_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
        ]
      }
      business_settings: {
        Row: {
          auto_confirm_bookings: boolean | null
          booking_advance_days: number | null
          booking_buffer_minutes: number | null
          business_id: string
          created_at: string
          currency: string | null
          default_tax_rate: number | null
          id: string
          notification_preferences: Json | null
          reminder_hours_before: number | null
          send_reminders: boolean | null
          timezone: string | null
          updated_at: string
        }
        Insert: {
          auto_confirm_bookings?: boolean | null
          booking_advance_days?: number | null
          booking_buffer_minutes?: number | null
          business_id: string
          created_at?: string
          currency?: string | null
          default_tax_rate?: number | null
          id?: string
          notification_preferences?: Json | null
          reminder_hours_before?: number | null
          send_reminders?: boolean | null
          timezone?: string | null
          updated_at?: string
        }
        Update: {
          auto_confirm_bookings?: boolean | null
          booking_advance_days?: number | null
          booking_buffer_minutes?: number | null
          business_id?: string
          created_at?: string
          currency?: string | null
          default_tax_rate?: number | null
          id?: string
          notification_preferences?: Json | null
          reminder_hours_before?: number | null
          send_reminders?: boolean | null
          timezone?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_settings_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: true
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      businesses: {
        Row: {
          address: string | null
          business_hours: Json | null
          city: string | null
          country: string | null
          created_at: string
          description: string | null
          email: string | null
          id: string
          logo_url: string | null
          name: string
          phone: string | null
          status: Database["public"]["Enums"]["business_status"] | null
          subdomain: string
          subscription_expires_at: string | null
          subscription_plan:
            | Database["public"]["Enums"]["subscription_plan"]
            | null
          updated_at: string
          user_id: string
          website: string | null
        }
        Insert: {
          address?: string | null
          business_hours?: Json | null
          city?: string | null
          country?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          id?: string
          logo_url?: string | null
          name: string
          phone?: string | null
          status?: Database["public"]["Enums"]["business_status"] | null
          subdomain: string
          subscription_expires_at?: string | null
          subscription_plan?:
            | Database["public"]["Enums"]["subscription_plan"]
            | null
          updated_at?: string
          user_id: string
          website?: string | null
        }
        Update: {
          address?: string | null
          business_hours?: Json | null
          city?: string | null
          country?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          phone?: string | null
          status?: Database["public"]["Enums"]["business_status"] | null
          subdomain?: string
          subscription_expires_at?: string | null
          subscription_plan?:
            | Database["public"]["Enums"]["subscription_plan"]
            | null
          updated_at?: string
          user_id?: string
          website?: string | null
        }
        Relationships: []
      }
      clients: {
        Row: {
          address: string | null
          business_id: string
          created_at: string
          email: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          business_id: string
          created_at?: string
          email?: string | null
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          business_id?: string
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "clients_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_items: {
        Row: {
          created_at: string
          description: string
          id: string
          invoice_id: string
          quantity: number | null
          service_id: string | null
          total_price: number
          unit_price: number
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          invoice_id: string
          quantity?: number | null
          service_id?: string | null
          total_price: number
          unit_price: number
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          invoice_id?: string
          quantity?: number | null
          service_id?: string | null
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoice_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_items_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          booking_id: string | null
          business_id: string
          client_id: string
          created_at: string
          due_date: string | null
          id: string
          invoice_number: string
          notes: string | null
          paid_at: string | null
          status: Database["public"]["Enums"]["invoice_status"] | null
          subtotal: number
          tax_amount: number | null
          total_amount: number
          updated_at: string
        }
        Insert: {
          booking_id?: string | null
          business_id: string
          client_id: string
          created_at?: string
          due_date?: string | null
          id?: string
          invoice_number: string
          notes?: string | null
          paid_at?: string | null
          status?: Database["public"]["Enums"]["invoice_status"] | null
          subtotal: number
          tax_amount?: number | null
          total_amount: number
          updated_at?: string
        }
        Update: {
          booking_id?: string | null
          business_id?: string
          client_id?: string
          created_at?: string
          due_date?: string | null
          id?: string
          invoice_number?: string
          notes?: string | null
          paid_at?: string | null
          status?: Database["public"]["Enums"]["invoice_status"] | null
          subtotal?: number
          tax_amount?: number | null
          total_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          booking_id: string | null
          business_id: string
          client_id: string | null
          created_at: string
          delivered_at: string | null
          error_message: string | null
          id: string
          invoice_id: string | null
          message: string
          recipient: string
          sent_at: string | null
          status: Database["public"]["Enums"]["notification_status"] | null
          subject: string | null
          type: Database["public"]["Enums"]["notification_type"]
        }
        Insert: {
          booking_id?: string | null
          business_id: string
          client_id?: string | null
          created_at?: string
          delivered_at?: string | null
          error_message?: string | null
          id?: string
          invoice_id?: string | null
          message: string
          recipient: string
          sent_at?: string | null
          status?: Database["public"]["Enums"]["notification_status"] | null
          subject?: string | null
          type: Database["public"]["Enums"]["notification_type"]
        }
        Update: {
          booking_id?: string | null
          business_id?: string
          client_id?: string | null
          created_at?: string
          delivered_at?: string | null
          error_message?: string | null
          id?: string
          invoice_id?: string | null
          message?: string
          recipient?: string
          sent_at?: string | null
          status?: Database["public"]["Enums"]["notification_status"] | null
          subject?: string | null
          type?: Database["public"]["Enums"]["notification_type"]
        }
        Relationships: [
          {
            foreignKeyName: "notifications_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          business_id: string
          category: string | null
          created_at: string
          description: string | null
          duration_minutes: number
          id: string
          is_active: boolean | null
          name: string
          price: number
          updated_at: string
        }
        Insert: {
          business_id: string
          category?: string | null
          created_at?: string
          description?: string | null
          duration_minutes: number
          id?: string
          is_active?: boolean | null
          name: string
          price: number
          updated_at?: string
        }
        Update: {
          business_id?: string
          category?: string | null
          created_at?: string
          description?: string | null
          duration_minutes?: number
          id?: string
          is_active?: boolean | null
          name?: string
          price?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "services_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      staff: {
        Row: {
          business_id: string
          created_at: string
          email: string | null
          id: string
          is_active: boolean | null
          name: string
          phone: string | null
          specialties: string[] | null
          updated_at: string
        }
        Insert: {
          business_id: string
          created_at?: string
          email?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          phone?: string | null
          specialties?: string[] | null
          updated_at?: string
        }
        Update: {
          business_id?: string
          created_at?: string
          email?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          phone?: string | null
          specialties?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "staff_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_invoice_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_ticket_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_user_business_ids: {
        Args: { user_uuid: string }
        Returns: string[]
      }
    }
    Enums: {
      booking_status:
        | "pending"
        | "confirmed"
        | "completed"
        | "cancelled"
        | "no_show"
      business_status: "active" | "inactive" | "suspended"
      invoice_status: "draft" | "sent" | "paid" | "overdue" | "cancelled"
      notification_status: "pending" | "sent" | "delivered" | "failed"
      notification_type: "email" | "sms" | "whatsapp"
      subscription_plan: "free" | "pro" | "enterprise"
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
      booking_status: [
        "pending",
        "confirmed",
        "completed",
        "cancelled",
        "no_show",
      ],
      business_status: ["active", "inactive", "suspended"],
      invoice_status: ["draft", "sent", "paid", "overdue", "cancelled"],
      notification_status: ["pending", "sent", "delivered", "failed"],
      notification_type: ["email", "sms", "whatsapp"],
      subscription_plan: ["free", "pro", "enterprise"],
    },
  },
} as const
