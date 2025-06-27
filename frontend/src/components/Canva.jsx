import React, { useRef, useState, useEffect } from "react";
import { ChromePicker } from "react-color";
import {
  FaPaintBrush,
  FaEraser,
  FaUndo,
  FaRedo,
  FaSave,
  FaTrash,
  FaMusic,
  FaMicrophone,
} from "react-icons/fa";

const Canva= () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [tool, setTool] = useState("pen");
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [bgMusic, setBgMusic] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctxRef.current = ctx;
  }, [color, brushSize]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
    const canvas = canvasRef.current;
    setHistory([...history, canvas.toDataURL()]);
    setRedoStack([]);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    if (tool === "eraser") {
      ctxRef.current.globalCompositeOperation = "destination-out";
    } else {
      ctxRef.current.globalCompositeOperation = "source-over";
      ctxRef.current.strokeStyle = color;
    }
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };

  const undo = () => {
    if (history.length === 0) return;
    const last = history.pop();
    setRedoStack([...redoStack, last]);
    const img = new Image();
    img.src = history[history.length - 1] || "";
    img.onload = () => {
      ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctxRef.current.drawImage(img, 0, 0);
    };
    setHistory([...history]);
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const imgData = redoStack.pop();
    const img = new Image();
    img.src = imgData;
    img.onload = () => {
      ctxRef.current.drawImage(img, 0, 0);
    };
    setHistory([...history, imgData]);
  };

  const saveImage = () => {
    const link = document.createElement("a");
    link.download = "arogyapath-drawing.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  const clearCanvas = () => {
    ctxRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setHistory([]);
    setRedoStack([]);
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col font-sans">
      <header className="bg-gradient-to-r from-sky-400 to-blue-600 text-white p-4 text-3xl font-bold text-center shadow-md tracking-wide">
        🧘‍♀️ Arogyapath Creative Studio
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-28 bg-white border-r border-gray-200 shadow-md p-3 flex flex-col items-center space-y-6">
          <button onClick={() => setTool("pen")} className="tooltip" data-tip="Brush">
            <FaPaintBrush className="text-2xl text-blue-600 hover:text-blue-800 transition" />
          </button>
          <button onClick={() => setTool("eraser")} className="tooltip" data-tip="Eraser">
            <FaEraser className="text-2xl text-gray-500 hover:text-gray-800 transition" />
          </button>
          <button onClick={undo} className="tooltip" data-tip="Undo">
            <FaUndo className="text-xl" />
          </button>
          <button onClick={redo} className="tooltip" data-tip="Redo">
            <FaRedo className="text-xl" />
          </button>
          <button onClick={saveImage} className="tooltip" data-tip="Save">
            <FaSave className="text-xl text-green-500" />
          </button>
          <button onClick={clearCanvas} className="tooltip" data-tip="Clear">
            <FaTrash className="text-xl text-red-500" />
          </button>

          <div className="tooltip" data-tip="Color Picker">
            <button onClick={() => setShowColorPicker(!showColorPicker)}>
              <div className="w-7 h-7 rounded-full border-2 border-gray-300 shadow-inner" style={{ backgroundColor: color }}></div>
            </button>
          </div>

          <div className="tooltip" data-tip="Brush Size">
            <input
              type="range"
              min="1"
              max="40"
              value={brushSize}
              onChange={(e) => setBrushSize(e.target.value)}
              className="rotate-[-90deg] w-24 mt-6"
            />
          </div>

          <button onClick={() => setBgMusic(!bgMusic)} className="tooltip" data-tip="Relax Music">
            <FaMusic className="text-blue-500 text-xl" />
          </button>

          <button onClick={() => alert("🎤 Voice input coming soon!")} className="tooltip" data-tip="Voice Notes">
            <FaMicrophone className="text-red-400 text-xl" />
          </button>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 relative bg-blue-100">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            className="w-full h-full cursor-crosshair"
          />

          {showColorPicker && (
            <div className="absolute top-5 left-32 z-10 bg-white rounded-xl p-2 shadow-xl">
              <ChromePicker color={color} onChange={(updated) => setColor(updated.hex)} disableAlpha={true} />
            </div>
          )}

          {bgMusic && (
            <audio autoPlay loop>
              <source src="/audio/shiva.mp3" type="audio/mpeg" />
            </audio>
          )}
        </div>
      </div>
    </div>
  );
};

export default Canva;

