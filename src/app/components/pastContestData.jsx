"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
} from "@coreui/react";
import { Bookmark } from "lucide-react"; // Single Bookmark icon

export const CardExample = ({ image, title, time, link, site }) => {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  // Include "site" in contestDetails
  const contestDetails = { image, title, time, link, site };

  // Load bookmarks from localStorage
  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setIsBookmarked(bookmarks.some((contest) => contest.link === link));
  }, [link]);

  // Toggle bookmark
  const toggleBookmark = () => {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

    if (isBookmarked) {
      bookmarks = bookmarks.filter((contest) => contest.link !== link); // Remove
    } else {
      bookmarks.push(contestDetails); // Add with site included
    }

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    setIsBookmarked(!isBookmarked);
  };

  // Convert Unix timestamp (seconds) to a readable format
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Calculate Time Left using the Unix timestamp (seconds)
  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const contestTime = new Date(time * 1000).getTime();
      const diff = contestTime - now;

      if (diff <= 0) {
        setTimeLeft("Ended");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(
        `${days > 0 ? `${days}d ` : ""}${hours}h ${minutes}m ${seconds}s`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [time]);

  return (
    <CCard className="shadow-md rounded-lg overflow-hidden w-64 relative">
      {/* Bookmark Button (Top-Right) */}
      <button
        onClick={toggleBookmark}
        className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md"
      >
        <Bookmark
          className={`transition-all ${
            isBookmarked ? "text-blue-500 fill-blue-500" : "text-gray-400"
          }`}
          size={20}
        />
      </button>

      {/* Image */}
      <CCardImage
        orientation="top"
        src={image}
        className="w-full h-32 object-cover"
      />

      {/* Card Content */}
      <CCardBody className="p-3">
        <CCardTitle className="text-sm font-bold">{title}</CCardTitle>
        <CCardText className="text-xs text-gray-500">
          🕒 {formatTime(time)}
        </CCardText>
        <CCardText className="text-xs text-red-500 font-semibold">
          ⏳ {timeLeft}
        </CCardText>

        {/* Contest Button */}
        <CButton
          color="primary"
          className="w-full text-sm font-semibold py-1.5 mt-2 transition hover:bg-blue-600"
          onClick={() => router.push(link)}
        >
          Go to Contest
        </CButton>
      </CCardBody>
    </CCard>
  );
};
