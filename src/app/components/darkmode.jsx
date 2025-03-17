"use client"; // This is a client component

import { useState, useEffect } from "react";

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // On mount, check localStorage for the theme
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, []); // Run only once on mount

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="toggle-container">
      <label className="toggle-label" htmlFor="darkModeToggle">
        Dark Mode:
      </label>
      <label className="toggle-switch">
        <input
          type="checkbox"
          id="darkModeToggle"
          checked={darkMode}
          onChange={toggleDarkMode}
        />
        <span className="slider"></span>
      </label>
      <style jsx>{`
        /* Example Toggle Switch Styling (Customize as needed) */
        .toggle-container {
          display: flex;
          align-items: center;
          justify-content: flex-end; /* Position to the right */
          padding: 10px;
        }

        .toggle-label {
          margin-right: 10px;
          font-size: 14px;
        }

        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 40px;
          height: 20px;
        }

        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: 0.4s;
          border-radius: 34px;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 14px;
          width: 14px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: 0.4s;
          border-radius: 50%;
        }

        input:checked + .slider {
          background-color: #2196f3; /* Example: a blue color */
        }

        input:focus + .slider {
          box-shadow: 0 0 1px #2196f3;
        }

        input:checked + .slider:before {
          transform: translateX(20px);
        }
      `}</style>
    </div>
  );
}

export default DarkModeToggle;
