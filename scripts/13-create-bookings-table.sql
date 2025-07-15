CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  type TEXT NOT NULL, -- 'tour' or 'car'
  item_name TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  people INTEGER, -- for tours
  arrival_date DATE, -- for tours
  message TEXT,
  amount_paid INTEGER, -- in cents
  payment_status TEXT,
  stripe_session_id TEXT,
  stripe_payment_intent TEXT,
  metadata JSONB
); 