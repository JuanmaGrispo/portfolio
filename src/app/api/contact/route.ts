import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Campos requeridos" },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("[contact] RESEND_API_KEY no configurada");
      return NextResponse.json({ error: "Not configured" }, { status: 500 });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio <onboarding@resend.dev>",
        to: ["juanmanuelgrispo@gmail.com"],
        reply_to: email,
        subject: `Nuevo mensaje de ${name}`,
        text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("[contact] Resend error:", body);
      throw new Error("Resend error");
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
