import { type NextRequestWithUser, authPlugin } from '@/lib/server/authPlugin'
import { deleteTodo } from '@/lib/server/todo'

export async function DELETE(
  req: NextRequestWithUser,
  { params }: { params: Promise<{ slug: string }> },
) {
  await authPlugin(req)

  const { slug } = await params
  await deleteTodo(slug)

  return new Response(null, {
    status: 204,
  })
}
