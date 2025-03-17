import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await axios.get(
      "https://competeapi.vercel.app/contests/upcoming/"
    );
    const contests = response.data.map((contest) => ({
      site: contest.site,
      title: contest.title,
      time: contest.startTime,
      link: contest.url,
    }));

    return NextResponse.json(contests, { status: 200 }); 
  } catch (error) {
    console.error("Error in contest fetching", error);
    return NextResponse.json(
      { error: "Failed to fetch contests" },
      { status: 500 }
    );
  }
}
