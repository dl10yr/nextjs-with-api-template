import { type NextRequestWithUser, authPlugin } from '@/lib/server/authPlugin'
import { deleteTodo } from '@/lib/server/todo'

export default async function DELETE(req: NextRequestWithUser, { params }) {
  await authPlugin(req)

  const id = params.slug
  await deleteTodo(id as string)

  return new Response(null, {
    status: 204,
  })
}
