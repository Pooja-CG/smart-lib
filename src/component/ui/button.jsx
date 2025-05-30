// src/components/ui/button.jsx
import React from "react";

export const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition-all ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
