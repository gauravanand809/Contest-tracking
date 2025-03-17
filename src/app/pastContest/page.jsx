"use client";
import { useState, useEffect } from "react";
import { CardExample } from "../components/pastContestData";
import Navbar from "../components/Navbar";
import axios from "axios";
import DarkModeToggle from "../components/darkmode";
import Cookies from "js-cookie";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function Home() {
  const platformImages = {
    codeforces: "codeforces.jpeg",
    leetcode: "leetcode.png",
    codechef: "codechef.jpeg",
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = Cookies.get("pastContestData");
        const storedTimestamp = Cookies.get("pastContestTimestamp");
        const now = Date.now();

        if (
          storedData &&
          storedTimestamp &&
          now - Number(storedTimestamp) < 5 * 60 * 60 * 1000 &&
          !reload
        ) {
          const parsedData = JSON.parse(storedData);
          // Sort in descending order (newest first)
          parsedData.sort((a, b) => b.startTimeUnix - a.startTimeUnix);
          setData(parsedData);
          setLoading(false);
          return;
        }

        const response = await axios.get("/api/pastContest");
        if (response.data && Array.isArray(response.data)) {
          const updatedData = response.data.map((value) => ({
            image: platformImages[value.site.toLowerCase()] || "default.jpg",
            title: value.title,
            time: value.time,
            link: value.link,
            site: value.site,
            startTimeUnix: value.startTimeUnix, // used for sorting
          }));
          // Sort in descending order (newest first)
          updatedData.sort((a, b) => b.startTimeUnix - a.startTimeUnix);
          setData(updatedData);
          Cookies.set("pastContestData", JSON.stringify(updatedData), {
            expires: 5 / 24,
          });
          Cookies.set("pastContestTimestamp", now.toString(), {
            expires: 5 / 24,
          });
        }
      } catch (error) {
        console.error("Error fetching contest data", error);
      } finally {
        setLoading(false);
        setReload(false);
      }
    };

    fetchData();
  }, [reload]);

  // Calculate pagination variables
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  // Handler for page change using MUI Pagination
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      {/* Navbar & Top Right Dark Mode Toggle */}
      <Navbar />
      <div className="flex justify-end p-4">
        <DarkModeToggle />
      </div>

      {/* Heading */}
      <div className="text-center mt-6">
        <h1 className="text-3xl font-bold">Past Contests 📅</h1>
      </div>

      {/* Pagination on Top */}
      {data.length > itemsPerPage && (
        <div className="flex justify-center my-4">
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </div>
      )}

      {/* Contests Grid */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="w-64 h-56 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
              ></div>
            ))
          ) : paginatedData.length > 0 ? (
            paginatedData.map((val, index) => (
              <CardExample
                key={index}
                image={val.image}
                time={val.time}
                title={val.title}
                link={val.link}
                site={val.site}
              />
            ))
          ) : (
            <p className="text-center text-lg font-semibold text-gray-500">
              No contests found 😔
            </p>
          )}
        </div>
      </div>

      {/* Hard Reload Button */}
      <div className="text-center mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700"
          onClick={() => {
            setReload(true);
            setLoading(true);
            setCurrentPage(1);
          }}
        >
          Hard Reload 🔄
        </button>
      </div>
    </div>
  );
}
