import { NextResponse } from "next/server";

export default function GET(req: Request, { params }) {
  return NextResponse.json({
    helthcheck: "ok",
  });
}
