import React from "react";

export const Textarea = React.forwardRef(({ className = "", rows = 3, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={`w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-none ${className}`}
      {...props}
    />
  );
});