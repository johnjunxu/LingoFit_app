export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          user_persona: string
          theme: string
          streak_count: number
          last_practice_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_persona?: string
          theme?: string
          streak_count?: number
          last_practice_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_persona?: string
          theme?: string
          streak_count?: number
          last_practice_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      practice_sessions: {
        Row: {
          id: string
          user_id: string
          question: string
          user_answer: string
          corrected_answer: string
          alternative_answers: Json
          completed_at: string
          review_due_date: string
          review_count: number
        }
        Insert: {
          id?: string
          user_id: string
          question: string
          user_answer: string
          corrected_answer?: string
          alternative_answers?: Json
          completed_at?: string
          review_due_date?: string
          review_count?: number
        }
        Update: {
          id?: string
          user_id?: string
          question?: string
          user_answer?: string
          corrected_answer?: string
          alternative_answers?: Json
          completed_at?: string
          review_due_date?: string
          review_count?: number
        }
      }
      daily_progress: {
        Row: {
          id: string
          user_id: string
          practice_date: string
          sessions_completed: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          practice_date?: string
          sessions_completed?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          practice_date?: string
          sessions_completed?: number
          created_at?: string
        }
      }
    }
  }
}
