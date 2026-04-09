import { NextResponse } from "next/server";
import { z } from "zod";
import { brand } from "@/lib/brand";

const bodySchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(9),
  product: z.string().min(2),
  location: z.string().min(2),
  message: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = bodySchema.parse(json);

    // Optional: Resend email when RESEND_API_KEY + INQUIRY_NOTIFY_EMAIL are set
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.INQUIRY_NOTIFY_EMAIL;
    if (apiKey && to) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: `${brand.siteName} <onboarding@resend.dev>`,
            to: [to],
            subject: `New inquiry from ${data.name}`,
            text: [
              `Name: ${data.name}`,
              `Phone: ${data.phone}`,
              `Product: ${data.product}`,
              `Location: ${data.location}`,
              `Message: ${data.message || "-"}`,
            ].join("\n"),
          }),
        });
      } catch {
        // Email optional — inquiry still recorded as success for UX
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
