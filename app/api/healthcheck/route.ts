import { NextResponse } from 'next/server'

export function GET(req: Request, { params }) {
  return NextResponse.json({
    helthcheck: 'ok',
  })
}
