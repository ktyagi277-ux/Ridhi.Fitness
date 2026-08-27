import { redirect } from "next/navigation";

// The link-in-bio profile now lives at the root — keep old /links URLs working.
export default function LinksPage() {
  redirect("/");
}
