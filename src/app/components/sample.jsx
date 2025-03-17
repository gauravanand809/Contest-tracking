"use client";
import { useState, useEffect } from "react";
import { CardExample } from "./components/contestCard";
import Navbar from "./components/Navbar";
import axios from "axios";
import DarkModeToggle from "./components/darkmode";

export default function Home() {
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
        const response = await axios.get("/api/contest");
        if (response.data && Array.isArray(response.data)) {
          const updatedData = response.data.map((value) => ({
            image: platformImages[value.site] || "default.jpg",
            title: value.title,
            time: value.time,
            link: value.link,
          }));
          setData(updatedData);
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Navbar & Dark Mode Toggle */}
      <Navbar />
      <div className="flex justify-end p-4">
        <DarkModeToggle />
      </div>

      {/* Heading */}
      <div className="text-center mt-6">
        <h1 className="text-3xl font-bold">Upcoming Contests 📅</h1>
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
              No upcoming contests 😔
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
