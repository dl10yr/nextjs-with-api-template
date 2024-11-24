import { authPlugin } from "@/lib/server/authPlugin";
import { deleteTodo } from "@/lib/server/todo";
import { NextRequest } from "next/server";

export default async function DELETE(req: NextRequest, { params }) {
  await authPlugin(req)
  
  const id = params.slug
  await deleteTodo(id as string)

  return new Response(null, {
    status: 204,
  });
}