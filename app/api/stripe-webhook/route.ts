import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { resend, ADMIN_EMAIL, DEFAULT_FROM_EMAIL } from "@/src/lib/resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2023-10-16" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role for server-side inserts
);

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    // Extract metadata and customer info
    const bookingData = {
      type: session.metadata?.type,
      item_name: session.metadata?.itemName,
      customer_name: session.metadata?.customerName,
      customer_email: session.customer_email,
      customer_phone: session.metadata?.customerPhone,
      people: session.metadata?.people ? parseInt(session.metadata.people) : null,
      arrival_date: session.metadata?.arrivalDate || null,
      message: session.metadata?.message,
      amount_paid: session.amount_total,
      payment_status: session.payment_status,
      stripe_session_id: session.id,
      stripe_payment_intent: session.payment_intent,
      metadata: session.metadata,
    };
    // Save to bookings table
    const { error } = await supabase.from("bookings").insert([bookingData]);
    if (error) {
      console.error("Failed to save booking:", error);
    }
    // Send admin email
    await resend.emails.send({
      from: DEFAULT_FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `New Booking: ${bookingData.type} - ${bookingData.item_name}`,
      html: `<h2>New Booking Received</h2>
        <p><b>Type:</b> ${bookingData.type}</p>
        <p><b>Item:</b> ${bookingData.item_name}</p>
        <p><b>Name:</b> ${bookingData.customer_name}</p>
        <p><b>Email:</b> ${bookingData.customer_email}</p>
        <p><b>Phone:</b> ${bookingData.customer_phone || "-"}</p>
        ${bookingData.type === "car" ? `
          <p><b>Number of Days:</b> ${session.metadata?.days || "-"}</p>
          <p><b>Start Date:</b> ${session.metadata?.startDate || "-"}</p>
        ` : ""}
        ${bookingData.type === "tour" ? `
          <p><b>People:</b> ${bookingData.people || "-"}</p>
          <p><b>Arrival Date:</b> ${bookingData.arrival_date || "-"}</p>
        ` : ""}
        <p><b>Message:</b> ${bookingData.message || "-"}</p>
        <p><b>Amount Paid:</b> $${(bookingData.amount_paid / 100).toFixed(2)}</p>
        <p><b>Payment Status:</b> ${bookingData.payment_status}</p>`
    });
    // Send user confirmation email
    await resend.emails.send({
      from: DEFAULT_FROM_EMAIL,
      to: bookingData.customer_email,
      subject: `Your Booking is Confirmed: ${bookingData.item_name}`,
      html: `<h2>Thank you for your booking!</h2>
        <p>Your booking for <b>${bookingData.item_name}</b> is confirmed.</p>
        <p><b>Deposit Paid:</b> $${(bookingData.amount_paid / 100).toFixed(2)}</p>
        <p>We look forward to serving you!</p>`
    });
  }

  return NextResponse.json({ received: true });
} 