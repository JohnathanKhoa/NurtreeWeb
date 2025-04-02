import CardItem from "@/components/spotify/CardItem";
import CardItemGrid from "@/components/spotify/CardItemGrid";
import { getCategories } from "@/lib/actions";
import { getAuthSession } from "@/util/serverUtils";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Nurtree - Search",
};

export default async function BrowseCategoriesPage() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  // const categories = await getCategories(session);

  return (
    <>
      {/* <h1>Browse Categories</h1>

      <CardItemGrid>
        {categories.map((category) => (
          <CardItem
            key={category.id}
            altTitle={category.name}
            heading={category.name}
            id={category.id}
            images={category.icons}
            type="categories"
          />
        ))}
      </CardItemGrid> */}
    </>
  );
}
