import { NextResponse } from "next/server";

export function GET(request) {
  try {
    const cookie = request.headers.get("cookie") || "";
    const match = cookie.match(/bookmarks=([^;]+)/);
    const bookmarks = match ? decodeURIComponent(match[1]) : null;

    if (!bookmarks || bookmarks.length === 0) {
      return NextResponse.json("No bookmark found", { status: 400 });
    } else {
      return NextResponse.json(bookmarks, { status: 200 });
    }
  } catch (e) {
    console.error("Error in bookmark API", e);
    return NextResponse.json({ error: "Some error occurred" }, { status: 401 });
  }
}
