import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * POST /api/auto-verify
 * Called immediately after a genuinely free-event registration is inserted (all tiers = ₹0).
 * 1. Upgrades registration status from "pending" → "verified" using the service role key.
 * 2. Calls the Supabase Edge Function `send-ticket-mail` to dispatch the confirmation email.
 *
 * NOTE: Paid events where only one tier is ₹0 should NOT call this route —
 *       those still require admin manual verification.
 */
export async function POST(req: NextRequest) {
  try {
    const { regId } = await req.json();
    if (!regId) {
      return NextResponse.json({ error: "regId is required" }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
      return NextResponse.json(
        { error: "Server configuration missing. Email not sent." },
        { status: 500 }
      );
    }

    // Step 1: Upgrade status to "verified" using service role (bypasses RLS)
    const adminClient = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false },
    });

    const { error: updateErr } = await adminClient
      .from("registrations")
      .update({
        status: "verified",
        verified_at: new Date().toISOString(),
      })
      .eq("id", regId)
      .eq("status", "pending"); // safety: only upgrade if still pending

    if (updateErr) {
      console.error("Failed to upgrade registration status:", updateErr.message);
      return NextResponse.json(
        { success: false, error: "Status upgrade failed: " + updateErr.message },
        { status: 500 }
      );
    }

    // Step 2: Call the edge function to generate the ticket and send the email
    let emailSent = false;
    try {
      const edgeRes = await fetch(`${supabaseUrl}/functions/v1/send-ticket-mail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${serviceKey}`,
        },
        body: JSON.stringify({ regId }),
      });

      const result = await edgeRes.json().catch(() => ({}));

      if (edgeRes.ok) {
        emailSent = result.emailSent ?? true;
      } else {
        console.error("Edge function error:", edgeRes.status, result);
      }
    } catch (edgeErr: any) {
      console.error("Edge function invocation failed (non-fatal):", edgeErr.message);
    }

    return NextResponse.json({ success: true, emailSent });
  } catch (err: any) {
    console.error("auto-verify route error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
