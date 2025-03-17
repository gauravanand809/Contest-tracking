"use client";
import { useState } from "react";
import Calendar from "react-calendar";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Filter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md w-full max-w-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-blue-500 font-semibold"
      >
        Filter {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="flex items-center gap-4"
        >
          <div className="flex gap-2">
            <label className="flex items-center gap-1">
              <input type="checkbox" className="accent-blue-500" /> Leetcode
            </label>
            <label className="flex items-center gap-1">
              <input type="checkbox" className="accent-blue-500" /> Codeforces
            </label>
            <label className="flex items-center gap-1">
              <input type="checkbox" className="accent-blue-500" /> Codechef
            </label>
          </div>
          <Calendar className="border rounded-lg p-2" />
        </motion.div>
      )}
    </div>
  );
}
