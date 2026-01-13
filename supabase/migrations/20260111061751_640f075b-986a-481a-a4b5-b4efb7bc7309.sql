-- Add tracking_id and phone to orders table
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS tracking_id TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS phone_verified BOOLEAN DEFAULT false;

-- Create order status history for tracking
CREATE TABLE public.order_status_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on order_status_history
ALTER TABLE public.order_status_history ENABLE ROW LEVEL SECURITY;

-- Users can view status history of their own orders
CREATE POLICY "Users can view their order status history" 
ON public.order_status_history 
FOR SELECT 
USING (
  order_id IN (SELECT id FROM public.orders WHERE user_id = auth.uid())
);

-- Add product_id to reviews table for product-specific reviews
ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS product_id TEXT;

-- Update RLS policies for reviews - users can only review purchased products
DROP POLICY IF EXISTS "Authenticated users can create reviews" ON public.reviews;
CREATE POLICY "Users can create reviews for purchased products" 
ON public.reviews 
FOR INSERT 
WITH CHECK (
  auth.uid() = user_id AND 
  (
    product_id IS NULL OR 
    EXISTS (
      SELECT 1 FROM public.orders 
      WHERE orders.user_id = auth.uid() 
      AND orders.status IN ('paid', 'shipped', 'delivered')
      AND orders.items::jsonb @> ('[{"id":"' || product_id || '"}]')::jsonb
    )
  )
);

-- Create function to generate tracking ID
CREATE OR REPLACE FUNCTION public.generate_tracking_id()
RETURNS TEXT AS $$
DECLARE
  tracking TEXT;
BEGIN
  SELECT 'SAMA' || TO_CHAR(NOW(), 'YYYYMMDD') || UPPER(SUBSTRING(gen_random_uuid()::TEXT, 1, 6))
  INTO tracking;
  RETURN tracking;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create OTP verification table
CREATE TABLE public.otp_verifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  phone TEXT NOT NULL,
  otp_code TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on otp_verifications
ALTER TABLE public.otp_verifications ENABLE ROW LEVEL SECURITY;

-- Users can only access their own OTP records
CREATE POLICY "Users can view their own OTP records" 
ON public.otp_verifications 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create OTP records" 
ON public.otp_verifications 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own OTP records" 
ON public.otp_verifications 
FOR UPDATE 
USING (auth.uid() = user_id);