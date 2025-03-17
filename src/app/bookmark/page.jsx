"use client";
import { useState, useEffect } from "react";
import { CardExample } from "../components/contestCard";
import Navbar from "../components/Navbar";
import DarkModeToggle from "../components/darkmode";

export default function Page() {
  const platformImages = {
    codeforces: "codeforces.jpeg",
    leetcode: "leetcode.png",
    codechef: "codechef.jpeg",
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the bookmarks string from localStorage
        const bookmarksStr = window.localStorage.getItem("bookmarks");
        if (bookmarksStr) {
          const bookmarks = JSON.parse(bookmarksStr);
          // Ensure that bookmarks is an array with at least one element
          if (Array.isArray(bookmarks) && bookmarks.length > 0) {
            const updatedData = bookmarks.map((value) => ({
              image: platformImages[value.site.toLowerCase()] || "default.jpg",
              title: value.title,
              time: value.time,
              link: value.link,
            }));
          const sortedData = updatedData.sort((a, b) => b.time - a.time);
          setData(sortedData);
          }
        }
      } catch (error) {
        console.error("Error fetching contest data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Navbar & Dark Mode Toggle */}
      <Navbar />
      <div className="flex justify-end p-4">
        <DarkModeToggle />
      </div>

      {/* Heading */}
      <div className="text-center mt-6">
        <h1 className="text-3xl font-bold">BookMarked Contests 📅</h1>
      </div>

      {/* Contests Grid */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {loading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="w-64 h-56 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
              ></div>
            ))
          ) : data.length > 0 ? (
            data.map((val, index) => (
              <CardExample
                key={index}
                image={val.image}
                time={val.time}
                title={val.title}
                link={val.link}
              />
            ))
          ) : (
            <p className="text-center text-lg font-semibold text-gray-500">
              No BookMark contests 😅
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
