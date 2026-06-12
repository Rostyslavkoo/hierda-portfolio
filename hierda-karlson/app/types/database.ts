export interface Database {
  public: {
    Tables: {
      stats: {
        Row: {
          id: string
          height: string | null
          bust: string | null
          waist: string | null
          hips: string | null
          shoes: string | null
          eyes: string | null
          hair: string | null
          location: string | null
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['stats']['Row'], 'id' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['stats']['Insert']>
      }
      photos: {
        Row: {
          id: string
          url: string
          category: 'editorial' | 'commercial' | 'portrait' | 'cover' | 'about' | null
          sort_order: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['photos']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['photos']['Insert']>
      }
      digitals: {
        Row: {
          id: string
          url: string
          label: string | null
          sort_order: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['digitals']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['digitals']['Insert']>
      }
      paintings: {
        Row: {
          id: string
          title: string
          price: number | null
          description: string | null
          url: string
          available: boolean
          sort_order: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['paintings']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['paintings']['Insert']>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
  }
}

export type Stats    = Database['public']['Tables']['stats']['Row']
export type Photo    = Database['public']['Tables']['photos']['Row']
export type Digital  = Database['public']['Tables']['digitals']['Row']
export type Painting = Database['public']['Tables']['paintings']['Row']
