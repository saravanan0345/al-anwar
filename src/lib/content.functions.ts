import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const uuidSchema = z.string().uuid();

async function requireAdmin(context: { supabase: any; userId: string }) {
  const { data, error } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
  if (error || !data) throw new Error("Forbidden");
}

export const getPublicContent = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const [{ data: projects, error: projectError }, { data: reviews, error: reviewError }] = await Promise.all([
    supabaseAdmin.from("projects").select("id,title,image_path,alt_text,sort_order,created_at").order("sort_order").order("created_at"),
    supabaseAdmin.from("reviews").select("id,customer_name,rating,review_text,photo_path,created_at").eq("status", "approved").order("created_at", { ascending: false }),
  ]);
  if (projectError || reviewError) throw new Error("Content could not be loaded");
  const projectRows = await Promise.all((projects ?? []).map(async (item) => ({
    ...item,
    image_url: (await supabaseAdmin.storage.from("project-photos").createSignedUrl(item.image_path, 3600)).data?.signedUrl ?? "",
  })));
  const reviewRows = await Promise.all((reviews ?? []).map(async (item) => ({
    ...item,
    photo_url: item.photo_path ? (await supabaseAdmin.storage.from("review-photos").createSignedUrl(item.photo_path, 3600)).data?.signedUrl ?? null : null,
  })));
  return { projects: projectRows, reviews: reviewRows };
});

export const getAdminContent = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireAdmin(context);
    const [{ data: projects }, { data: reviews }, { data: enquiries }] = await Promise.all([
      context.supabase.from("projects").select("*").order("sort_order").order("created_at"),
      context.supabase.from("reviews").select("*").order("created_at", { ascending: false }),
      context.supabase.from("enquiries").select("*").order("created_at", { ascending: false }),
    ]);
    const projectRows = await Promise.all((projects ?? []).map(async (item: any) => ({ ...item, image_url: (await context.supabase.storage.from("project-photos").createSignedUrl(item.image_path, 3600)).data?.signedUrl ?? "" })));
    const reviewRows = await Promise.all((reviews ?? []).map(async (item: any) => ({ ...item, photo_url: item.photo_path ? (await context.supabase.storage.from("review-photos").createSignedUrl(item.photo_path, 3600)).data?.signedUrl ?? null : null })));
    return { projects: projectRows, reviews: reviewRows, enquiries: enquiries ?? [] };
  });

export const saveProject = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: z.string().uuid().optional(), title: z.string().trim().min(1).max(120), altText: z.string().trim().min(1).max(180), imagePath: z.string().min(1).max(500), sortOrder: z.number().int().min(0).max(100000) }).parse(input))
  .handler(async ({ data, context }) => {
    await requireAdmin(context);
    const values = { title: data.title, alt_text: data.altText, image_path: data.imagePath, sort_order: data.sortOrder };
    const result = data.id ? await context.supabase.from("projects").update(values).eq("id", data.id) : await context.supabase.from("projects").insert(values);
    if (result.error) throw result.error;
    return { ok: true };
  });

export const deleteProject = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: uuidSchema, imagePath: z.string().min(1).max(500) }).parse(input))
  .handler(async ({ data, context }) => {
    await requireAdmin(context);
    const { error } = await context.supabase.from("projects").delete().eq("id", data.id);
    if (error) throw error;
    await context.supabase.storage.from("project-photos").remove([data.imagePath]);
    return { ok: true };
  });

export const updateReview = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: uuidSchema, status: z.enum(["pending", "approved", "rejected"]), customerName: z.string().trim().min(1).max(100), rating: z.number().int().min(1).max(5), reviewText: z.string().trim().min(5).max(1200) }).parse(input))
  .handler(async ({ data, context }) => {
    await requireAdmin(context);
    const { error } = await context.supabase.from("reviews").update({ status: data.status, customer_name: data.customerName, rating: data.rating, review_text: data.reviewText, updated_at: new Date().toISOString() }).eq("id", data.id);
    if (error) throw error;
    return { ok: true };
  });

export const deleteReview = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: uuidSchema, photoPath: z.string().nullable() }).parse(input))
  .handler(async ({ data, context }) => {
    await requireAdmin(context);
    const { error } = await context.supabase.from("reviews").delete().eq("id", data.id);
    if (error) throw error;
    if (data.photoPath) await context.supabase.storage.from("review-photos").remove([data.photoPath]);
    return { ok: true };
  });

export const deleteEnquiry = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: uuidSchema }).parse(input))
  .handler(async ({ data, context }) => {
    await requireAdmin(context);
    const { error } = await context.supabase.from("enquiries").delete().eq("id", data.id);
    if (error) throw error;
    return { ok: true };
  });