import { useState } from "react";

export default function ReframeThought({ onBack }) {
  const [thought, setThought] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleReframe = async () => {
    if (!thought.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:5000/api/reframe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ thought })
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("Failed to connect to the AI service.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
      <button
        onClick={onBack}
        className="mb-4 text-indigo-600 hover:underline"
      >
        ← Back to Dashboard
      </button>
      <h1 className="text-2xl font-bold text-indigo-700 mb-4">
        Reframe a Negative Thought
      </h1>
      <p className="text-gray-700 mb-4">
        Write a negative thought below, and receive a gentle reframe from the AI.
      </p>
      <textarea
        className="w-full min-h-[120px] p-3 border-2 border-indigo-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
        placeholder="E.g., I always mess things up..."
        value={thought}
        onChange={(e) => setThought(e.target.value)}
      />
      <button
        onClick={handleReframe}
        className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
        disabled={loading || !thought.trim()}
      >
        {loading ? "Thinking..." : "Reframe Thought"}
      </button>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-indigo-700 mb-2">AI Response</h2>
          <p><strong>Reframe:</strong> {result.reframe}</p>
          <p className="mt-2"><strong>Distortion:</strong> {result.distortion}</p>
          <p className="mt-2"><strong>CBT Tip:</strong> {result.tip}</p>
        </div>
      )}
    </div>
  );
}
