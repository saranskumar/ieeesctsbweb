import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/auto-verify
 * Called immediately after a free-event registration is inserted (status: "verified").
 * Proxies the request to the Supabase Edge Function `send-ticket-mail` using the
 * service role key (server-side only — never exposed to the client).
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

    const edgeRes = await fetch(`${supabaseUrl}/functions/v1/send-ticket-mail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${serviceKey}`,
      },
      body: JSON.stringify({ regId }),
    });

    const result = await edgeRes.json().catch(() => ({}));

    if (!edgeRes.ok) {
      console.error("Edge function error:", edgeRes.status, result);
      return NextResponse.json(
        { success: false, error: "Email dispatch failed", details: result },
        { status: 200 } // still 200 — registration itself succeeded
      );
    }

    return NextResponse.json({ success: true, emailSent: result.emailSent ?? true });
  } catch (err: any) {
    console.error("auto-verify route error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
