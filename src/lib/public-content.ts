import type { ProjectItem, ReviewItem } from "@/components/content-carousel";
import { supabase } from "@/integrations/supabase/client";

/**
 * Loads content that is deliberately public under the database and storage RLS
 * policies. Keeping this in the browser means the published site does not
 * depend on a server-function deployment to display the portfolio or reviews.
 */
export async function getPublicContent(): Promise<{
  projects: ProjectItem[];
  reviews: ReviewItem[];
}> {
  const [{ data: projects, error: projectError }, { data: reviews, error: reviewError }] =
    await Promise.all([
      supabase
        .from("projects")
        .select("id,title,image_path,alt_text,sort_order,created_at")
        .order("sort_order")
        .order("created_at"),
      supabase
        .from("reviews")
        .select("id,customer_name,rating,review_text,photo_path,created_at")
        .eq("status", "approved")
        .order("created_at", { ascending: false }),
    ]);

  if (projectError || reviewError) {
    throw projectError ?? reviewError;
  }

  const projectRows = await Promise.all(
    (projects ?? []).map(async (item) => {
      const { data } = await supabase.storage
        .from("project-photos")
        .createSignedUrl(item.image_path, 3600);
      return { ...item, image_url: data?.signedUrl ?? "" };
    }),
  );
  const reviewRows = await Promise.all(
    (reviews ?? []).map(async (item) => {
      const { data } = item.photo_path
        ? await supabase.storage.from("review-photos").createSignedUrl(item.photo_path, 3600)
        : { data: null };
      return { ...item, photo_url: data?.signedUrl ?? null };
    }),
  );

  return { projects: projectRows, reviews: reviewRows };
}
