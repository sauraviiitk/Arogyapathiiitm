import React from "react";

const Header = ({ language, onLanguageChange }) => {
  return (
    <header className="p-4 bg-blue-800 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">Aarogyapath</h1>
      <select
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="text-black rounded p-1"
      >
        <option value="en">English</option>
        <option value="hi">हिंदी</option>
        <option value="mr">मराठी</option>
        <option value="te">తెలుగు</option>
      </select>
    </header>
  );
};

export default Header;
