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
      audit_log: {
        Row: {
          action: string
          created_at: string
          id: string
          ip_address: string | null
          new_values: Json | null
          old_values: Json | null
          record_id: string | null
          table_name: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          ip_address?: string | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          ip_address?: string | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      blocked_time_slots: {
        Row: {
          blocked_date: string
          blocked_time: string
          business_id: string
          created_at: string | null
          id: string
          reason: string | null
          updated_at: string | null
        }
        Insert: {
          blocked_date: string
          blocked_time: string
          business_id: string
          created_at?: string | null
          id?: string
          reason?: string | null
          updated_at?: string | null
        }
        Update: {
          blocked_date?: string
          blocked_time?: string
          business_id?: string
          created_at?: string | null
          id?: string
          reason?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blocked_time_slots_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          auto_payment_required: boolean | null
          booking_date: string
          booking_time: string
          business_id: string
          client_id: string
          created_at: string | null
          customer_email: string | null
          customer_name: string | null
          customer_phone: string | null
          duration_minutes: number
          id: string
          invoice_generated: boolean | null
          notes: string | null
          original_booking_date: string | null
          original_booking_time: string | null
          payment_method: string | null
          payment_reference: string | null
          payment_status: string | null
          reminder_sent_at: string | null
          reschedule_count: number | null
          reschedule_deadline: string | null
          service_id: string
          staff_id: string | null
          status: string
          ticket_code: string | null
          ticket_number: string | null
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          auto_payment_required?: boolean | null
          booking_date: string
          booking_time: string
          business_id: string
          client_id: string
          created_at?: string | null
          customer_email?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          duration_minutes: number
          id?: string
          invoice_generated?: boolean | null
          notes?: string | null
          original_booking_date?: string | null
          original_booking_time?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          payment_status?: string | null
          reminder_sent_at?: string | null
          reschedule_count?: number | null
          reschedule_deadline?: string | null
          service_id: string
          staff_id?: string | null
          status?: string
          ticket_code?: string | null
          ticket_number?: string | null
          total_amount: number
          updated_at?: string | null
        }
        Update: {
          auto_payment_required?: boolean | null
          booking_date?: string
          booking_time?: string
          business_id?: string
          client_id?: string
          created_at?: string | null
          customer_email?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          duration_minutes?: number
          id?: string
          invoice_generated?: boolean | null
          notes?: string | null
          original_booking_date?: string | null
          original_booking_time?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          payment_status?: string | null
          reminder_sent_at?: string | null
          reschedule_count?: number | null
          reschedule_deadline?: string | null
          service_id?: string
          staff_id?: string | null
          status?: string
          ticket_code?: string | null
          ticket_number?: string | null
          total_amount?: number
          updated_at?: string | null
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
      business_payment_settings: {
        Row: {
          business_id: string
          created_at: string
          id: string
          payment_methods: Json | null
          paystack_public_key: string | null
          require_payment: boolean
          updated_at: string
        }
        Insert: {
          business_id: string
          created_at?: string
          id?: string
          payment_methods?: Json | null
          paystack_public_key?: string | null
          require_payment?: boolean
          updated_at?: string
        }
        Update: {
          business_id?: string
          created_at?: string
          id?: string
          payment_methods?: Json | null
          paystack_public_key?: string | null
          require_payment?: boolean
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_payment_settings_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: true
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      business_reviews: {
        Row: {
          booking_id: string
          business_id: string
          comment: string | null
          created_at: string | null
          id: string
          rating: number
        }
        Insert: {
          booking_id: string
          business_id: string
          comment?: string | null
          created_at?: string | null
          id?: string
          rating: number
        }
        Update: {
          booking_id?: string
          business_id?: string
          comment?: string | null
          created_at?: string | null
          id?: string
          rating?: number
        }
        Relationships: [
          {
            foreignKeyName: "business_reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: true
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_reviews_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      business_settings: {
        Row: {
          auto_confirm_bookings: boolean | null
          booking_advance_days: number | null
          booking_buffer_minutes: number | null
          booking_slot_duration_minutes: number | null
          business_id: string
          contact_preferences: Json | null
          created_at: string | null
          currency: string | null
          custom_domain: string | null
          default_tax_rate: number | null
          enable_bank_transfer: boolean | null
          enable_card_payments: boolean | null
          enable_mpesa: boolean | null
          id: string
          map_description: string | null
          max_bookings_per_slot: number | null
          notification_preferences: Json | null
          payment_instructions: string | null
          reminder_hours_before: number | null
          require_payment: boolean | null
          send_reminders: boolean | null
          show_on_map: boolean | null
          subdomain_enabled: boolean | null
          timezone: string | null
          updated_at: string | null
        }
        Insert: {
          auto_confirm_bookings?: boolean | null
          booking_advance_days?: number | null
          booking_buffer_minutes?: number | null
          booking_slot_duration_minutes?: number | null
          business_id: string
          contact_preferences?: Json | null
          created_at?: string | null
          currency?: string | null
          custom_domain?: string | null
          default_tax_rate?: number | null
          enable_bank_transfer?: boolean | null
          enable_card_payments?: boolean | null
          enable_mpesa?: boolean | null
          id?: string
          map_description?: string | null
          max_bookings_per_slot?: number | null
          notification_preferences?: Json | null
          payment_instructions?: string | null
          reminder_hours_before?: number | null
          require_payment?: boolean | null
          send_reminders?: boolean | null
          show_on_map?: boolean | null
          subdomain_enabled?: boolean | null
          timezone?: string | null
          updated_at?: string | null
        }
        Update: {
          auto_confirm_bookings?: boolean | null
          booking_advance_days?: number | null
          booking_buffer_minutes?: number | null
          booking_slot_duration_minutes?: number | null
          business_id?: string
          contact_preferences?: Json | null
          created_at?: string | null
          currency?: string | null
          custom_domain?: string | null
          default_tax_rate?: number | null
          enable_bank_transfer?: boolean | null
          enable_card_payments?: boolean | null
          enable_mpesa?: boolean | null
          id?: string
          map_description?: string | null
          max_bookings_per_slot?: number | null
          notification_preferences?: Json | null
          payment_instructions?: string | null
          reminder_hours_before?: number | null
          require_payment?: boolean | null
          send_reminders?: boolean | null
          show_on_map?: boolean | null
          subdomain_enabled?: boolean | null
          timezone?: string | null
          updated_at?: string | null
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
          average_rating: number | null
          bank_account: string | null
          bank_name: string | null
          business_hours: Json | null
          city: string | null
          country: string | null
          created_at: string | null
          currency: string | null
          description: string | null
          email: string | null
          featured_image_url: string | null
          id: string
          is_active: boolean | null
          is_verified: boolean | null
          latitude: number | null
          logo_url: string | null
          longitude: number | null
          mpesa_number: string | null
          name: string
          payment_instructions: string | null
          phone: string | null
          preferred_payment_methods: string[] | null
          search_vector: unknown | null
          service_radius_km: number | null
          subdomain: string | null
          total_reviews: number | null
          updated_at: string | null
          user_id: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          average_rating?: number | null
          bank_account?: string | null
          bank_name?: string | null
          business_hours?: Json | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          email?: string | null
          featured_image_url?: string | null
          id?: string
          is_active?: boolean | null
          is_verified?: boolean | null
          latitude?: number | null
          logo_url?: string | null
          longitude?: number | null
          mpesa_number?: string | null
          name: string
          payment_instructions?: string | null
          phone?: string | null
          preferred_payment_methods?: string[] | null
          search_vector?: unknown | null
          service_radius_km?: number | null
          subdomain?: string | null
          total_reviews?: number | null
          updated_at?: string | null
          user_id?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          average_rating?: number | null
          bank_account?: string | null
          bank_name?: string | null
          business_hours?: Json | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          email?: string | null
          featured_image_url?: string | null
          id?: string
          is_active?: boolean | null
          is_verified?: boolean | null
          latitude?: number | null
          logo_url?: string | null
          longitude?: number | null
          mpesa_number?: string | null
          name?: string
          payment_instructions?: string | null
          phone?: string | null
          preferred_payment_methods?: string[] | null
          search_vector?: unknown | null
          service_radius_km?: number | null
          subdomain?: string | null
          total_reviews?: number | null
          updated_at?: string | null
          user_id?: string | null
          website?: string | null
        }
        Relationships: []
      }
      clients: {
        Row: {
          address: string | null
          business_id: string
          created_at: string | null
          email: string
          id: string
          last_service_date: string | null
          name: string
          notes: string | null
          phone: string | null
          retain_data: boolean | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          business_id: string
          created_at?: string | null
          email: string
          id?: string
          last_service_date?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          retain_data?: boolean | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          business_id?: string
          created_at?: string | null
          email?: string
          id?: string
          last_service_date?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          retain_data?: boolean | null
          updated_at?: string | null
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
          created_at: string | null
          description: string
          id: string
          invoice_id: string
          quantity: number
          service_id: string | null
          total_price: number
          unit_price: number
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          invoice_id: string
          quantity?: number
          service_id?: string | null
          total_price: number
          unit_price: number
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          invoice_id?: string
          quantity?: number
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
          created_at: string | null
          currency: string | null
          due_date: string | null
          id: string
          invoice_number: string
          notes: string | null
          paid_at: string | null
          status: string
          subtotal: number
          tax_amount: number | null
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          booking_id?: string | null
          business_id: string
          client_id: string
          created_at?: string | null
          currency?: string | null
          due_date?: string | null
          id?: string
          invoice_number: string
          notes?: string | null
          paid_at?: string | null
          status?: string
          subtotal: number
          tax_amount?: number | null
          total_amount: number
          updated_at?: string | null
        }
        Update: {
          booking_id?: string | null
          business_id?: string
          client_id?: string
          created_at?: string | null
          currency?: string | null
          due_date?: string | null
          id?: string
          invoice_number?: string
          notes?: string | null
          paid_at?: string | null
          status?: string
          subtotal?: number
          tax_amount?: number | null
          total_amount?: number
          updated_at?: string | null
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
      notification_log: {
        Row: {
          booking_id: string | null
          business_id: string | null
          created_at: string
          delivered_at: string | null
          error_message: string | null
          id: string
          message: string
          notification_type: string
          recipient: string
          sent_at: string | null
          status: string
          subject: string | null
        }
        Insert: {
          booking_id?: string | null
          business_id?: string | null
          created_at?: string
          delivered_at?: string | null
          error_message?: string | null
          id?: string
          message: string
          notification_type: string
          recipient: string
          sent_at?: string | null
          status?: string
          subject?: string | null
        }
        Update: {
          booking_id?: string | null
          business_id?: string | null
          created_at?: string
          delivered_at?: string | null
          error_message?: string | null
          id?: string
          message?: string
          notification_type?: string
          recipient?: string
          sent_at?: string | null
          status?: string
          subject?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notification_log_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_log_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_methods: {
        Row: {
          business_id: string
          created_at: string
          details: string
          display_name: string | null
          id: string
          instructions: string | null
          is_active: boolean
          name: string
          type: string
          updated_at: string
        }
        Insert: {
          business_id: string
          created_at?: string
          details: string
          display_name?: string | null
          id?: string
          instructions?: string | null
          is_active?: boolean
          name: string
          type: string
          updated_at?: string
        }
        Update: {
          business_id?: string
          created_at?: string
          details?: string
          display_name?: string | null
          id?: string
          instructions?: string | null
          is_active?: boolean
          name?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_methods_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_transactions: {
        Row: {
          amount: number
          booking_id: string | null
          business_amount: number | null
          business_id: string | null
          created_at: string | null
          currency: string | null
          id: string
          metadata: Json | null
          payment_method: string | null
          paystack_reference: string | null
          platform_amount: number | null
          split_amount: number | null
          status: string | null
          subscription_id: string | null
          transaction_type: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          booking_id?: string | null
          business_amount?: number | null
          business_id?: string | null
          created_at?: string | null
          currency?: string | null
          id?: string
          metadata?: Json | null
          payment_method?: string | null
          paystack_reference?: string | null
          platform_amount?: number | null
          split_amount?: number | null
          status?: string | null
          subscription_id?: string | null
          transaction_type: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          booking_id?: string | null
          business_amount?: number | null
          business_id?: string | null
          created_at?: string | null
          currency?: string | null
          id?: string
          metadata?: Json | null
          payment_method?: string | null
          paystack_reference?: string | null
          platform_amount?: number | null
          split_amount?: number | null
          status?: string | null
          subscription_id?: string | null
          transaction_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_transactions_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_transactions_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_transactions_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          business_id: string
          category: string | null
          created_at: string | null
          currency: string | null
          description: string | null
          duration_minutes: number
          id: string
          is_active: boolean | null
          is_transport_service: boolean | null
          name: string
          price: number
          transport_details: Json | null
          updated_at: string | null
        }
        Insert: {
          business_id: string
          category?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          duration_minutes: number
          id?: string
          is_active?: boolean | null
          is_transport_service?: boolean | null
          name: string
          price: number
          transport_details?: Json | null
          updated_at?: string | null
        }
        Update: {
          business_id?: string
          category?: string | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          duration_minutes?: number
          id?: string
          is_active?: boolean | null
          is_transport_service?: boolean | null
          name?: string
          price?: number
          transport_details?: Json | null
          updated_at?: string | null
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
          created_at: string | null
          email: string
          gender: string | null
          id: string
          is_active: boolean | null
          name: string
          phone: string | null
          shift: string | null
          specialties: string[] | null
          updated_at: string | null
          workload: string | null
        }
        Insert: {
          business_id: string
          created_at?: string | null
          email: string
          gender?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          phone?: string | null
          shift?: string | null
          specialties?: string[] | null
          updated_at?: string | null
          workload?: string | null
        }
        Update: {
          business_id?: string
          created_at?: string | null
          email?: string
          gender?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          phone?: string | null
          shift?: string | null
          specialties?: string[] | null
          updated_at?: string | null
          workload?: string | null
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
      staff_attendance: {
        Row: {
          attendance_date: string
          business_id: string
          created_at: string
          id: string
          location_info: Json | null
          notes: string | null
          sign_in_time: string
          sign_out_time: string | null
          staff_id: string
          status: string
          updated_at: string
        }
        Insert: {
          attendance_date?: string
          business_id: string
          created_at?: string
          id?: string
          location_info?: Json | null
          notes?: string | null
          sign_in_time?: string
          sign_out_time?: string | null
          staff_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          attendance_date?: string
          business_id?: string
          created_at?: string
          id?: string
          location_info?: Json | null
          notes?: string | null
          sign_in_time?: string
          sign_out_time?: string | null
          staff_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "staff_attendance_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "staff_attendance_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "staff"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_discounts: {
        Row: {
          created_at: string | null
          discount_percentage: number
          id: string
          payment_interval: string
        }
        Insert: {
          created_at?: string | null
          discount_percentage?: number
          id?: string
          payment_interval: string
        }
        Update: {
          created_at?: string | null
          discount_percentage?: number
          id?: string
          payment_interval?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          auto_split_enabled: boolean | null
          bookings_limit: number | null
          business_id: string | null
          created_at: string
          current_period_end: string
          feature_flags: Json | null
          id: string
          notification_channels: Json | null
          payment_interval: string | null
          paystack_subaccount_id: string | null
          plan_type: string
          split_percentage: number | null
          staff_limit: number | null
          status: string
          stripe_subscription_id: string | null
          trial_ends_at: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          auto_split_enabled?: boolean | null
          bookings_limit?: number | null
          business_id?: string | null
          created_at?: string
          current_period_end: string
          feature_flags?: Json | null
          id?: string
          notification_channels?: Json | null
          payment_interval?: string | null
          paystack_subaccount_id?: string | null
          plan_type: string
          split_percentage?: number | null
          staff_limit?: number | null
          status?: string
          stripe_subscription_id?: string | null
          trial_ends_at?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          auto_split_enabled?: boolean | null
          bookings_limit?: number | null
          business_id?: string | null
          created_at?: string
          current_period_end?: string
          feature_flags?: Json | null
          id?: string
          notification_channels?: Json | null
          payment_interval?: string | null
          paystack_subaccount_id?: string | null
          plan_type?: string
          split_percentage?: number | null
          staff_limit?: number | null
          status?: string
          stripe_subscription_id?: string | null
          trial_ends_at?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: true
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      assign_admin_role: {
        Args: { _user_email: string }
        Returns: undefined
      }
      calculate_distance: {
        Args: { lat1: number; lon1: number; lat2: number; lon2: number }
        Returns: number
      }
      calculate_reschedule_deadline: {
        Args: { booking_date: string; booking_time: string }
        Returns: string
      }
      create_paid_subscription: {
        Args: {
          business_id: string
          plan_type: string
          paystack_reference?: string
        }
        Returns: string
      }
      generate_ticket_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_user_roles: {
        Args: { _user_id: string }
        Returns: {
          role: Database["public"]["Enums"]["app_role"]
        }[]
      }
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
      search_businesses_by_location: {
        Args: {
          search_lat: number
          search_lng: number
          search_radius_km?: number
          search_query?: string
        }
        Returns: {
          id: string
          name: string
          description: string
          address: string
          city: string
          country: string
          phone: string
          email: string
          website: string
          logo_url: string
          featured_image_url: string
          latitude: number
          longitude: number
          average_rating: number
          total_reviews: number
          business_hours: Json
          is_verified: boolean
          service_radius_km: number
          currency: string
          show_on_map: boolean
          map_description: string
          service_categories: string[]
          service_names: string[]
          total_services: number
          distance_km: number
        }[]
      }
      validate_business_ownership: {
        Args: { business_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      subscription_plan_type:
        | "trial"
        | "starter"
        | "medium"
        | "premium"
        | "payasyougo"
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
      app_role: ["admin", "moderator", "user"],
      subscription_plan_type: [
        "trial",
        "starter",
        "medium",
        "premium",
        "payasyougo",
      ],
    },
  },
} as const
