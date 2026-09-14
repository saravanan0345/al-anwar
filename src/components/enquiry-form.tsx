import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { notifyEnquiry } from "@/lib/enquiry.functions";

export function EnquiryForm() {
  const [status, setStatus] = useState(""); const [busy, setBusy] = useState(false); const [done, setDone] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (busy || done) return; setBusy(true); setStatus(""); const form = event.currentTarget; const values = new FormData(form);
    const name = String(values.get("name") ?? "").trim(); const phone = String(values.get("phone") ?? "").trim(); const service = String(values.get("service") ?? ""); const message = String(values.get("message") ?? "").trim();
    if (!/^[+\d][\d\s()-]{6,23}$/.test(phone)) { setStatus("Please enter a valid phone number."); setBusy(false); return; }
    const { error } = await supabase.from("enquiries").insert({ customer_name: name, phone, service, message });
    if (error) { setStatus("Your enquiry could not be sent. Please try again."); setBusy(false); return; }
    let sent = false;
    try { sent = (await notifyEnquiry({ data: { name, phone, service, message } })).sent; } catch { sent = false; }
    form.reset(); setBusy(false); setDone(true);
    setStatus(sent
      ? "Thank you! Your consultation request has been submitted successfully. We will contact you shortly."
      : "Your request has been saved, but our email notification could not be sent. Please also call or WhatsApp us so we can respond right away.");
  }
  return <form onSubmit={submit} className="grid gap-5 rounded-md bg-background p-6 text-foreground shadow-luxury sm:p-8">
    <div className="grid gap-5 sm:grid-cols-2"><div><Label htmlFor="name">Name</Label><Input id="name" name="name" required maxLength={100} className="mt-2" /></div><div><Label htmlFor="phone">Phone Number</Label><Input id="phone" name="phone" type="tel" required maxLength={24} className="mt-2" /></div></div>
    <div><Label htmlFor="service">Service Interested In</Label><select id="service" name="service" required className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"><option>Interior Design</option><option>Construction & Building</option><option>RO Water Purification</option></select></div>
    <div><Label htmlFor="message">Message</Label><Textarea id="message" name="message" required minLength={5} maxLength={1500} rows={5} className="mt-2" /></div>
    {status && <p role="status" className="text-sm text-muted-foreground">{status}</p>}
    <Button type="submit" variant="luxury" size="luxury" className="sm:justify-self-start" disabled={busy || done}>{busy ? "Sending…" : done ? "Enquiry Sent" : "Send Enquiry"}</Button>
  </form>;
}