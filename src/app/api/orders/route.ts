import { NextResponse } from "next/server";
import { z } from "zod";
import { brand } from "@/lib/brand";

const itemSchema = z.object({
  productId: z.string(),
  name: z.string(),
  priceGhs: z.number().min(0),
  qty: z.number().min(1),
});

const bodySchema = z.object({
  customer: z.object({
    fullName: z.string().min(2),
    phone: z.string().min(9),
    email: z.string().optional(),
    city: z.string().min(2),
    address: z.string().min(5),
    paymentMethod: z.enum([
      "cash_on_delivery",
      "mobile_money",
      "bank_transfer",
    ]),
    notes: z.string().optional(),
  }),
  items: z.array(itemSchema).min(1),
});

function totalGhs(
  items: z.infer<typeof bodySchema>["items"],
): number {
  return items.reduce((s, i) => s + i.priceGhs * i.qty, 0);
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = bodySchema.parse(json);
    const total = totalGhs(data.items);

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.ORDER_NOTIFY_EMAIL || process.env.INQUIRY_NOTIFY_EMAIL;

    const text = [
      `NEW ORDER — ${brand.siteName}`,
      ``,
      `Customer`,
      `Name: ${data.customer.fullName}`,
      `Phone: ${data.customer.phone}`,
      data.customer.email ? `Email: ${data.customer.email}` : null,
      `City: ${data.customer.city}`,
      `Address: ${data.customer.address}`,
      `Payment: ${data.customer.paymentMethod}`,
      data.customer.notes ? `Notes: ${data.customer.notes}` : null,
      ``,
      `Items`,
      ...data.items.map(
        (i) =>
          `- ${i.name} (ID: ${i.productId}) × ${i.qty} @ GHS ${i.priceGhs} = GHS ${i.priceGhs * i.qty}`,
      ),
      ``,
      `TOTAL: GHS ${total}`,
    ]
      .filter(Boolean)
      .join("\n");

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
            subject: `New order from ${data.customer.fullName} — GHS ${total}`,
            text,
          }),
        });
      } catch {
        /* email optional */
      }
    }

    return NextResponse.json({ ok: true, orderTotalGhs: total });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
