
import { getAuthSession } from "@/util/serverUtils";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getAuthSession();
  if (!session) {
    redirect("/login");
  }
  return <div></div>;
}
