import { Camera, Star } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { validateImage } from "@/lib/site";

export function ReviewForm() {
  const [open, setOpen] = useState(false); const [rating, setRating] = useState(5); const [status, setStatus] = useState(""); const [busy, setBusy] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setStatus("");
    const form = event.currentTarget; const values = new FormData(form); const file = values.get("photo") as File;
    let photoPath: string | null = null;
    if (file?.size) {
      const issue = validateImage(file, 5); if (issue) { setStatus(issue); setBusy(false); return; }
      photoPath = `submissions/${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
      const { error } = await supabase.storage.from("review-photos").upload(photoPath, file, { contentType: file.type });
      if (error) { setStatus("Photo upload failed. Please try again."); setBusy(false); return; }
    }
    const { error } = await supabase.from("reviews").insert({ customer_name: String(values.get("name") ?? "").trim(), rating, review_text: String(values.get("review") ?? "").trim(), photo_path: photoPath, status: "pending" });
    if (error) { setStatus("Your review could not be sent. Please check the details."); setBusy(false); return; }
    form.reset(); setRating(5); setStatus("Thank you. Your review was submitted for approval."); setBusy(false);
  }
  return <Dialog open={open} onOpenChange={setOpen}><DialogTrigger asChild><Button variant="outline" size="luxury">Write a Review</Button></DialogTrigger><DialogContent className="max-w-xl">
    <DialogHeader><DialogTitle className="font-display text-2xl">Share your experience</DialogTitle><DialogDescription>Your review will be checked before it appears publicly.</DialogDescription></DialogHeader>
    <form onSubmit={submit} className="space-y-5">
      <div><Label htmlFor="review-name">Name</Label><Input id="review-name" name="name" required minLength={1} maxLength={100} className="mt-2" /></div>
      <fieldset><legend className="text-sm font-medium">Star rating</legend><div className="mt-2 flex gap-1">{[1,2,3,4,5].map((star) => <Button type="button" variant="ghost" size="icon" key={star} onClick={() => setRating(star)} aria-label={`${star} stars`}><Star className={star <= rating ? "fill-primary text-primary" : "text-muted-foreground"}/></Button>)}</div></fieldset>
      <div><Label htmlFor="review-text">Review</Label><Textarea id="review-text" name="review" required minLength={5} maxLength={1200} rows={5} className="mt-2" /></div>
      <div><Label htmlFor="review-photo" className="flex items-center gap-2"><Camera className="h-4 w-4"/>Photo (optional)</Label><Input id="review-photo" name="photo" type="file" accept="image/*" className="mt-2" /></div>
      {status && <p role="status" className="text-sm text-muted-foreground">{status}</p>}
      <Button type="submit" variant="luxury" size="luxury" disabled={busy}>{busy ? "Submitting…" : "Submit Review"}</Button>
    </form>
  </DialogContent></Dialog>;
}