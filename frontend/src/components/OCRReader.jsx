// import React, { useState } from 'react';
// import { createWorker } from 'tesseract.js';
// import ReactMarkdown from 'react-markdown';
// function OCRReader() {
//   const [ocrText, setOcrText] = useState('');
//   const [analysis, setAnalysis] = useState('');
//   const [loading, setLoading] = useState(false);
//  const handleImageUpload = async (e) => {
//   const file = e.target.files[0];
//   if (!file) return;
//   setLoading(true);

//   const worker = await createWorker('eng');
//   const {
//     data: { text },
//   } = await worker.recognize(file);
//   setOcrText(text);

//   try {
//     const response = await fetch('http://localhost:5000/api/prescription/analyze-prescription', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ text }),
//     });

//     const data = await response.json();
//     if (response.ok) {
//       setAnalysis(data.analysis);
//     } else {
//       setAnalysis('❌ Failed to analyze prescription.');
//     }
//   } catch (err) {
//     console.error(err);
//     setAnalysis('❌ Failed to analyze prescription.');
//   }

//   await worker.terminate();
//   setLoading(false);
// };
//   return (
//     <div className="p-6 max-w-2xl mx-auto text-center">
//       <h2 className="text-2xl font-bold mb-4">📋 Prescription OCR & AI Analyzer</h2>
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleImageUpload}
//         className="mb-4 border rounded px-4 py-2"
//       />
//       {loading ? (
//         <p>⏳ Processing...</p>
//       ) : (
//         <>
//           {ocrText && (
//             <div className="mb-6 text-left">
//               <h3 className="font-semibold text-lg mb-2">📝 Extracted Text:</h3>
//               <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">{ocrText}</pre>
//             </div>
//           )}
//           {analysis && (
//             <div className="prose prose-sm text-left bg-green-50 p-4 rounded">
//               <h3 className="font-semibold text-lg">🧠 AI Analysis:</h3>
//               <ReactMarkdown>{analysis}</ReactMarkdown>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// export default OCRReader;
import React, { useState } from 'react';
import { createWorker } from 'tesseract.js';
import ReactMarkdown from 'react-markdown';
import { FiUploadCloud, FiRefreshCcw, FiCheckCircle } from 'react-icons/fi';

const OCRReader = () => {
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
        headers: { 'Content-Type': 'application/json' },
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
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-indigo-200 to-blue-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-white/60 backdrop-blur-xl rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.15)] p-10 space-y-8 border border-white/30">
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-blue-900 tracking-tight">
          🧠 AI-Powered Prescription Analyzer
        </h1>

        {/* Upload Box */}
        <label className="group border-2 border-dashed border-blue-400 hover:border-blue-500 transition-all duration-300 rounded-2xl p-8 text-center cursor-pointer flex flex-col items-center justify-center gap-3 bg-white/40 hover:bg-white/60 shadow-md">
          <FiUploadCloud className="text-4xl text-blue-700 group-hover:scale-110 transition-transform" />
          <span className="text-blue-800 font-medium">Click or Drag Prescription Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center gap-2 text-blue-700 font-medium text-lg animate-pulse">
            <FiRefreshCcw className="animate-spin" />
            Processing your prescription...
          </div>
        )}

        {/* OCR Output */}
        {!loading && ocrText && (
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-blue-800 flex items-center gap-2">
              <FiCheckCircle className="text-green-600" />
              Extracted Text
            </h2>
            <pre className="bg-white/90 p-4 rounded-xl border border-blue-100 shadow-inner text-gray-800 whitespace-pre-wrap overflow-x-auto">
              {ocrText}
            </pre>
          </div>
        )}

        {/* Analysis Result */}
        {!loading && analysis && (
          <div className="space-y-2 bg-gradient-to-br from-green-100 to-green-50 border border-green-300 p-5 rounded-2xl shadow-md">
            <h2 className="text-lg font-bold text-green-800 flex items-center gap-2">
              <FiCheckCircle />
              AI Diagnosis Summary
            </h2>
            <div className="prose prose-sm prose-blue max-w-none text-gray-800">
              <ReactMarkdown>{analysis}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OCRReader;

