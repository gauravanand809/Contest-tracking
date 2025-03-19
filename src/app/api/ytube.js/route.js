import fs from "fs";
import path from "path";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.YOUTUBE_API;
const PLAYLIST_ID = process.env.LEETCODE_PL; 

async function fetchAllVideos() {
  let nextPageToken = "";
  let videos = [];

  try {
    do {
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/playlistItems",
        {
          params: {
            part: "snippet",
            maxResults: 50,
            playlistId: PLAYLIST_ID,
            key: API_KEY,
            pageToken: nextPageToken,
          },
        }
      );

      const videoItems = response.data.items.map((item) => ({
        title: item.snippet.title,
        link: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
      }));

      videos = [...videos, ...videoItems];
      nextPageToken = response.data.nextPageToken;
    } while (nextPageToken);

    return videos;
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
}

export async function GET() {
  const videos = await fetchAllVideos();
  const filePath = path.join(process.cwd(), "public", "videos.json");

  try {
    fs.writeFileSync(filePath, JSON.stringify(videos, null, 2));
    return NextResponse.json({ message: "Videos saved successfully", videos });
  } catch (error) {
    console.error("Error saving videos:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
