import { notFound } from "next/navigation";
import { EditDialog } from "./edit-dialog";
import { userDAL } from "@/lib/dal/user";

interface PageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { username } = await params;
  const user = await userDAL.getByUsername(username);

  if (!user) {
    notFound();
  }

  return <EditDialog user={user} />;
}
