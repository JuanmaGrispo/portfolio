import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "juanmanuelgrispo@gmail.com",
      replyTo: email,
      subject: `Nuevo mensaje de ${name}`,
      html: `
        <h2>Nuevo contacto</h2>
        <p><b>Nombre:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Mensaje:</b> ${message}</p>
      `,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error("[contact]", error);
    return Response.json({ error: "Error sending email" }, { status: 500 });
  }
}
