-- Allow anyone to view orders by tracking_id (for public order tracking)
CREATE POLICY "Anyone can view orders by tracking_id"
ON public.orders
FOR SELECT
USING (tracking_id IS NOT NULL);

-- Allow anyone to view order status history for orders with tracking_id
CREATE POLICY "Anyone can view status history by tracking_id"
ON public.order_status_history
FOR SELECT
USING (order_id IN (
  SELECT id FROM public.orders WHERE tracking_id IS NOT NULL
));