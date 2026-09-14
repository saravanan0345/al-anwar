import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const DEFAULT_NOTIFY_TO = "alanwarbuilddesign@gmail.com";
const FROM = "AL-ANWAR Build & Design <onboarding@resend.dev>";

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const notifyEnquiry = createServerFn({ method: "POST" })
  .validator((input) =>
    z
      .object({
        name: z.string().trim().min(1).max(100),
        phone: z.string().trim().min(6).max(24),
        service: z.string().trim().min(1).max(60),
        message: z.string().trim().min(5).max(1500),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const apiKey = process.env["RESEND_API_KEY"];
    const notifyTo = process.env["RESEND_NOTIFY_TO"] || DEFAULT_NOTIFY_TO;
    if (!apiKey) {
      console.error("notifyEnquiry: RESEND_API_KEY is not configured");
      return { sent: false } as const;
    }

    const submittedAt = new Intl.DateTimeFormat("en-IN", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    }).format(new Date());

    const row = (label: string, value: string) =>
      `<tr><td style="padding:8px 0;color:#6b6257;font-size:13px;width:120px;vertical-align:top">${label}</td><td style="padding:8px 0;color:#1d1b18;font-size:15px;font-weight:600">${escapeHtml(value)}</td></tr>`;

    const html = `<div style="font-family:Arial,Helvetica,sans-serif;background:#faf8f5;padding:28px">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #ece6dd;border-radius:8px;padding:28px">
    <h1 style="margin:0 0 4px;font-size:20px;color:#1d1b18">New Consultation Request</h1>
    <p style="margin:0 0 20px;font-size:13px;color:#6b6257">A new customer has submitted a consultation / enquiry request.</p>
    <h2 style="margin:0 0 6px;font-size:14px;text-transform:uppercase;letter-spacing:1px;color:#8a6a3b">Customer Details</h2>
    <table style="width:100%;border-collapse:collapse">
      ${row("Name", data.name)}
      ${row("Phone", data.phone)}
      ${row("Service", data.service)}
      <tr><td style="padding:8px 0;color:#6b6257;font-size:13px;vertical-align:top">Message</td><td style="padding:8px 0;color:#1d1b18;font-size:15px;line-height:1.6">${escapeHtml(data.message).replace(/\n/g, "<br/>")}</td></tr>
      ${row("Submitted", submittedAt)}
    </table>
    <p style="margin:24px 0 0;padding-top:16px;border-top:1px solid #ece6dd;font-size:12px;color:#6b6257">Submitted from:<br/><strong style="color:#1d1b18">AL-ANWAR Build &amp; Design Website</strong></p>
  </div>
</div>`;

    const text = `New Consultation Request

Customer Details:
Name: ${data.name}
Phone: ${data.phone}
Service: ${data.service}
Message: ${data.message}
Submitted: ${submittedAt}

Submitted from:
AL-ANWAR Build & Design Website`;

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          from: FROM,
          to: [notifyTo],
          subject: "New Consultation Request - AL-ANWAR Build & Design",
          html,
          text,
        }),
      });
      if (!response.ok) {
        console.error(`notifyEnquiry: Resend request failed [${response.status}]: ${await response.text()}`);
        return { sent: false } as const;
      }
      return { sent: true } as const;
    } catch (error) {
      console.error("notifyEnquiry: Resend request threw", error);
      return { sent: false } as const;
    }
  });
