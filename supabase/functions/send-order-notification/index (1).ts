import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const TWILIO_ACCOUNT_SID = Deno.env.get("TWILIO_ACCOUNT_SID");
    const TWILIO_AUTH_TOKEN = Deno.env.get("TWILIO_AUTH_TOKEN");
    const TWILIO_PHONE_NUMBER = Deno.env.get("TWILIO_PHONE_NUMBER");
    const TWILIO_WHATSAPP_NUMBER = Deno.env.get("TWILIO_WHATSAPP_NUMBER");

    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
      console.error("Twilio credentials not configured");
      return new Response(
        JSON.stringify({ error: "Twilio credentials not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Not authenticated" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { orderId, phone, trackingId, status, total } = await req.json();

    if (!orderId || !phone) {
      return new Response(
        JSON.stringify({ error: "Order ID and phone are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const credentials = btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`);
    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;

    // Compose message based on status
    let message = "";
    switch (status) {
      case "paid":
        message = `🎉 SAMA Order Confirmed!\n\nOrder ID: ${orderId.slice(0, 8).toUpperCase()}\nTracking ID: ${trackingId}\nTotal: ₹${total}\n\nThank you for shopping with SAMA! Track your order at our website.`;
        break;
      case "shipped":
        message = `📦 Your SAMA order is on the way!\n\nTracking ID: ${trackingId}\n\nYour order has been shipped and will arrive soon.`;
        break;
      case "delivered":
        message = `✅ SAMA Order Delivered!\n\nTracking ID: ${trackingId}\n\nYour order has been delivered. Thank you for shopping with SAMA!`;
        break;
      default:
        message = `SAMA Order Update\n\nOrder ID: ${orderId.slice(0, 8).toUpperCase()}\nStatus: ${status}\n\nTracking ID: ${trackingId}`;
    }

    const sendPromises = [];

    // Send SMS
    if (TWILIO_PHONE_NUMBER) {
      const smsPromise = fetch(twilioUrl, {
        method: "POST",
        headers: {
          "Authorization": `Basic ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          To: phone,
          From: TWILIO_PHONE_NUMBER,
          Body: message,
        }),
      });
      sendPromises.push(smsPromise);
    }

    // Send WhatsApp
    if (TWILIO_WHATSAPP_NUMBER) {
      const whatsappPromise = fetch(twilioUrl, {
        method: "POST",
        headers: {
          "Authorization": `Basic ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          To: `whatsapp:${phone}`,
          From: `whatsapp:${TWILIO_WHATSAPP_NUMBER}`,
          Body: message,
        }),
      });
      sendPromises.push(whatsappPromise);
    }

    const results = await Promise.allSettled(sendPromises);
    
    const errors = results.filter(r => r.status === "rejected");
    if (errors.length === results.length) {
      console.error("All notifications failed:", errors);
      return new Response(
        JSON.stringify({ error: "Failed to send notifications" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Notifications sent" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
