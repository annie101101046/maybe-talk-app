-- ============================================================
-- Migration 001: Initial schema for 也許妳想找人聊一聊
-- Pregnancy Wellness Platform
-- ============================================================

-- ============================================================
-- TABLES
-- ============================================================

-- profiles: extends auth.users with app-specific fields
CREATE TABLE IF NOT EXISTS public.profiles (
  id                 uuid        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name          text,
  phone              text,
  due_date           date,
  credits            int         NOT NULL DEFAULT 0,
  is_paid            boolean     NOT NULL DEFAULT false,
  first_free_used    boolean     NOT NULL DEFAULT false,
  stripe_customer_id text,
  created_at         timestamptz NOT NULL DEFAULT now(),
  updated_at         timestamptz NOT NULL DEFAULT now()
);

-- bookings: cal.com booking records linked to a user
CREATE TABLE IF NOT EXISTS public.bookings (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  cal_booking_id  text,
  booking_type    text        NOT NULL CHECK (booking_type IN ('free', 'paid')),
  status          text        NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- payments: Stripe payment records linked to a user
CREATE TABLE IF NOT EXISTS public.payments (
  id                    uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id               uuid        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  stripe_session_id     text        UNIQUE NOT NULL,
  stripe_payment_intent text,
  amount_cents          int         NOT NULL,
  currency              text        NOT NULL DEFAULT 'usd',
  status                text        NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  email                 text,
  created_at            timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX IF NOT EXISTS bookings_user_id_idx  ON public.bookings(user_id);
CREATE INDEX IF NOT EXISTS payments_user_id_idx  ON public.payments(user_id);
CREATE INDEX IF NOT EXISTS payments_session_idx  ON public.payments(stripe_session_id);

-- ============================================================
-- TRIGGERS
-- ============================================================

-- Trigger function: auto-create a profile row when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger function: keep updated_at current on profiles
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_profiles_updated ON public.profiles;
CREATE TRIGGER on_profiles_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments  ENABLE ROW LEVEL SECURITY;

-- ---- profiles policies ----

-- Users can read their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Service role has full access (bypasses RLS by default, but explicit for clarity)
CREATE POLICY "Service role full access on profiles"
  ON public.profiles
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- ---- bookings policies ----

-- Users can read their own bookings
CREATE POLICY "Users can view own bookings"
  ON public.bookings
  FOR SELECT
  USING (auth.uid() = user_id);

-- Service role has full access
CREATE POLICY "Service role full access on bookings"
  ON public.bookings
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- ---- payments policies ----

-- Users can read their own payments
CREATE POLICY "Users can view own payments"
  ON public.payments
  FOR SELECT
  USING (auth.uid() = user_id);

-- Service role has full access
CREATE POLICY "Service role full access on payments"
  ON public.payments
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');
