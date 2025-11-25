/*
  # LingoFit Database Schema

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key) - Unique identifier for each user
      - `user_persona` (text) - User's learning persona/context for AI personalization
      - `theme` (text) - User's preferred theme (light/dark)
      - `streak_count` (integer) - Current consecutive days of practice
      - `last_practice_date` (date) - Last date user practiced
      - `created_at` (timestamptz) - Account creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

    - `practice_sessions`
      - `id` (uuid, primary key) - Unique session identifier
      - `user_id` (uuid, foreign key) - References user_profiles
      - `question` (text) - The practice question
      - `user_answer` (text) - User's submitted answer
      - `corrected_answer` (text) - AI-corrected version
      - `alternative_answers` (jsonb) - Array of alternative standard answers
      - `completed_at` (timestamptz) - Completion timestamp
      - `review_due_date` (timestamptz) - When this should be reviewed next
      - `review_count` (integer) - Number of times reviewed

    - `daily_progress`
      - `id` (uuid, primary key) - Unique progress record identifier
      - `user_id` (uuid, foreign key) - References user_profiles
      - `practice_date` (date) - Date of practice
      - `sessions_completed` (integer) - Number of sessions completed that day
      - `created_at` (timestamptz) - Record creation timestamp

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data only
*/

CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_persona text DEFAULT '',
  theme text DEFAULT 'light',
  streak_count integer DEFAULT 0,
  last_practice_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE TABLE IF NOT EXISTS practice_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  question text NOT NULL,
  user_answer text NOT NULL,
  corrected_answer text DEFAULT '',
  alternative_answers jsonb DEFAULT '[]'::jsonb,
  completed_at timestamptz DEFAULT now(),
  review_due_date timestamptz DEFAULT (now() + interval '1 day'),
  review_count integer DEFAULT 0
);

ALTER TABLE practice_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own practice sessions"
  ON practice_sessions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own practice sessions"
  ON practice_sessions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own practice sessions"
  ON practice_sessions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS daily_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  practice_date date NOT NULL DEFAULT CURRENT_DATE,
  sessions_completed integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, practice_date)
);

ALTER TABLE daily_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own daily progress"
  ON daily_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own daily progress"
  ON daily_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own daily progress"
  ON daily_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_practice_sessions_user_id ON practice_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_practice_sessions_review_due_date ON practice_sessions(review_due_date);
CREATE INDEX IF NOT EXISTS idx_daily_progress_user_id ON daily_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_progress_practice_date ON daily_progress(practice_date);