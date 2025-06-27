
import React, { useState } from "react";
import { FiPaperclip } from "react-icons/fi";
import { BsSendFill } from "react-icons/bs";

const CommunityForum = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const handlePost = () => {
    console.log({ title, category, content });
  };

  return (
    <section className="min-h-screen py-20 px-4 bg-[#e8f1fb]">
      <div className="max-w-2xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-blue-100 hover:shadow-blue-200 transition duration-300">
        <h2 className="text-3xl font-extrabold text-center text-blue-900 mb-6">
          ✍️ Start a Discussion
        </h2>

        {/* Title Input */}
        <div className="mb-6 relative">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder=" "
            className="peer w-full border-b-2 border-gray-300 focus:border-blue-500 bg-transparent py-3 outline-none"
          />
          <label className="absolute left-0 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm">
            Title
          </label>
        </div>

        {/* Category Dropdown */}
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-2 focus:ring-blue-300"
          >
            <option value="">Choose a category…</option>
            <option value="mental">🧠 Mental Health</option>
            <option value="yoga">🧘 Yoga & Meditation</option>
            <option value="spiritual">🙏 Spirituality</option>
            <option value="medical">💊 Medical Advice</option>
          </select>
        </div>

        {/* Content */}
        <div className="mb-6 relative">
          <textarea
            rows="4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder=" "
            className="peer w-full border-b-2 border-gray-300 focus:border-blue-500 bg-transparent py-3 resize-none outline-none"
          ></textarea>
          <label className="absolute left-0 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm">
            What would you like to share?
          </label>
        </div>

        {/* File + Send */}
        <div className="flex justify-between items-center">
          {/* Attachment */}
          <label className="flex items-center text-blue-600 hover:text-blue-800 cursor-pointer text-sm">
            <FiPaperclip className="mr-2 text-xl" />
            Attach File
            <input type="file" className="hidden" />
          </label>

          {/* Send Button */}
          <button
            onClick={handlePost}
            className="bg-blue-600 text-white p-3 rounded-full shadow-md hover:bg-blue-700 hover:shadow-blue-300 transition-all"
            title="Send Post"
          >
            <BsSendFill className="text-xl" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CommunityForum;
