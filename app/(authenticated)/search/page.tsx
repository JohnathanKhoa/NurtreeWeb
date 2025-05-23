import { getAuthSession } from "@/util/serverUtils";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Nurtree - Search",
};

export default async function BrowseCategoriesPage() {
  const session = await getAuthSession();
  return !session ? (redirect("/login"), null) : <></>;
}