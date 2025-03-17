import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await axios.get(`${process.env.BACKEND_URL}/contests`);
    const contestData = response.data.data; 

    const contests = contestData.map((contest) => ({
      site: contest.platform,
      title: contest.name,
      time: contest.startTimeUnix,
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
