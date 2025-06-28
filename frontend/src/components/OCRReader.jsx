import React, { useState } from 'react';
import { createWorker } from 'tesseract.js';
import ReactMarkdown from 'react-markdown';
function OCRReader() {
  const [ocrText, setOcrText] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
 const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  setLoading(true);

  const worker = await createWorker('eng');
  const {
    data: { text },
  } = await worker.recognize(file);
  setOcrText(text);

  try {
    const response = await fetch('http://localhost:5000/api/prescription/analyze-prescription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();
    if (response.ok) {
      setAnalysis(data.analysis);
    } else {
      setAnalysis('❌ Failed to analyze prescription.');
    }
  } catch (err) {
    console.error(err);
    setAnalysis('❌ Failed to analyze prescription.');
  }

  await worker.terminate();
  setLoading(false);
};
  return (
    <div className="p-6 max-w-2xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4">📋 Prescription OCR & AI Analyzer</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4 border rounded px-4 py-2"
      />
      {loading ? (
        <p>⏳ Processing...</p>
      ) : (
        <>
          {ocrText && (
            <div className="mb-6 text-left">
              <h3 className="font-semibold text-lg mb-2">📝 Extracted Text:</h3>
              <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">{ocrText}</pre>
            </div>
          )}
          {analysis && (
            <div className="prose prose-sm text-left bg-green-50 p-4 rounded">
              <h3 className="font-semibold text-lg">🧠 AI Analysis:</h3>
              <ReactMarkdown>{analysis}</ReactMarkdown>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default OCRReader;
