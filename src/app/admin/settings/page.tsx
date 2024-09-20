"use client";

import AdminLayout from "@/app/components/AdminLayout/AdminLayout";
import React, { useEffect, useState } from "react";

const SettingsPage = () => {
  const [theme, setTheme] = useState("light"); // Default theme
  const [logo, setLogo] = useState(""); // State for logo URL
  const [primaryColor, setPrimaryColor] = useState("#3498db"); // Default primary color

  const containerStyle = {
    backgroundColor: theme === "dark" ? "#333" : "#fff",
    color: theme === "dark" ? "#fff" : "#000",
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("logo", logo);
    localStorage.setItem("primaryColor", primaryColor);
  }, [theme, logo, primaryColor]);

  return (
    <AdminLayout>
      <div style={containerStyle}>
        <h1>Settings</h1>
        {/* Theme Toggle */}
        <div>
          <h2>Appearance</h2>
          <label>
            Dark Mode:
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={() => setTheme(theme === "light" ? "dark" : "light")}
            />
          </label>
        </div>

        {/* Branding Customization */}
        <div>
          <h2>Branding</h2>
          <div>
            <label>
              Logo URL:
              <input
                type="text"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Primary Color:
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
              />
            </label>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;
