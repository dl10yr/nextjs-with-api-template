import { authPlugin } from "@/lib/server/authPlugin";
import { prisma } from "@/lib/server/db";
import { NextRequest, NextResponse } from "next/server";
import { ulid } from "ulid";

export async function GET(req: NextRequest, { params }) {
  try {
    await authPlugin(req)

    const userId = req.headers.get('user-id')
    if (!userId) {
      return NextResponse.json({
        error: {
          message: 'user not authenticated',
          statusCode: 401,
        },
      }, { status: 401 })
    }

    const todos = await prisma.todo.findMany({
      where: { userId },
    })

    return NextResponse.json({todos})
  } catch (error) {
    return NextResponse.json({
      error: {
        message: 'internal server error',
      },
    }, { status: 500 })
  }
}

export async function POST(req: NextRequest, { params }) {
  try {
    await authPlugin(req)

    const { name, content } = await req.json()
    const id = ulid()
    const userId = req.headers.get('user-id')

    if (!userId) {
      return NextResponse.json({
        error: {
          message: 'user not authenticated',
          statusCode: 401,
        },
      }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) {
      const [_, created] = await prisma.$transaction([
        prisma.user.create({
          data: {
            id: userId,
          },
        }),
        prisma.todo.create({
          data: {
            id,
            name,
            content,
            userId,
          },
        }),
      ])
      return NextResponse.json(created, { status: 201 })
    }

    const created = await prisma.todo.create({
      data: {
        id,
        name,
        content,
        userId,
      },
    })

    return NextResponse.json(created, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({
      error: {
        message: 'Internal Server Error',
        statusCode: 500,
      },
    }, { status: 500 })
  }
}
