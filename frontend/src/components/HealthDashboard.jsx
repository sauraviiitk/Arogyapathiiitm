import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart, Line,
  AreaChart, Area,
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ComposedChart, ScatterChart, Scatter
} from "recharts";
import { saveAs } from 'file-saver';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

// Sample data generator
const generateHealthData = () => {
  const moods = ["happy", "calm", "energetic", "tired", "stressed", "relaxed"];
  const data = [];
  
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      heartRate: Math.floor(60 + Math.random() * 30),
      bloodSugar: Math.floor(70 + Math.random() * 50),
      oxygen: Math.floor(95 + Math.random() * 4),
      temperature: (97 + Math.random() * 3).toFixed(1),
      sleepHours: (4 + Math.random() * 5).toFixed(1),
      waterIntake: Math.floor(1500 + Math.random() * 1000),
      steps: Math.floor(3000 + Math.random() * 10000),
      calories: Math.floor(1800 + Math.random() * 800),
      mood: moods[Math.floor(Math.random() * moods.length)],
      weight: (60 + Math.random() * 20).toFixed(1),
      bmi: (20 + Math.random() * 10).toFixed(1)
    });
  }
  
  return data.reverse();
};

// Health indicators
const healthIndicators = [
  { name: "Heart Rate", key: "heartRate", unit: "bpm", goodRange: "60-100", icon: "❤️" },
  { name: "Blood Sugar", key: "bloodSugar", unit: "mg/dL", goodRange: "70-140", icon: "🩸" },
  { name: "Oxygen", key: "oxygen", unit: "%", goodRange: "95-100", icon: "🌬️" },
  { name: "Temperature", key: "temperature", unit: "°F", goodRange: "97-99", icon: "🌡️" },
  { name: "Sleep", key: "sleepHours", unit: "hrs", goodRange: "7-9", icon: "😴" },
  { name: "Water", key: "waterIntake", unit: "ml", goodRange: "2000-3000", icon: "💧" },
  { name: "Steps", key: "steps", unit: "", goodRange: "8000+", icon: "👟" },
  { name: "Weight", key: "weight", unit: "kg", goodRange: "", icon: "⚖️" },
  { name: "BMI", key: "bmi", unit: "", goodRange: "18.5-24.9", icon: "📊" }
];

// Color scheme
const COLORS = {
  heartRate: "#ef4444",
  bloodSugar: "#10b981",
  oxygen: "#3b82f6",
  temperature: "#f59e0b",
  sleepHours: "#8b5cf6",
  waterIntake: "#0ea5e9",
  steps: "#ec4899",
  mood: ["#60a5fa", "#f87171", "#34d399", "#fbbf24", "#a78bfa", "#38bdf8"]
};

// Custom tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="font-semibold text-gray-800">
          {new Date(label).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
        {payload.map((item, index) => (
          <p key={index} className="flex items-center" style={{ color: item.color }}>
            <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
            {item.name}: <span className="font-semibold ml-1">{item.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Health indicator card
const HealthIndicatorCard = ({ indicator, currentValue }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-2xl mr-3">{indicator.icon}</span>
          <div>
            <h4 className="font-medium text-gray-700">{indicator.name}</h4>
            <p className="text-sm text-gray-500">Good: {indicator.goodRange}</p>
          </div>
        </div>
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm bg-blue-50 text-blue-600 px-2 py-1 rounded"
            >
              {currentValue} {indicator.unit}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Chart container with animations
const ChartContainer = ({ children, title, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`bg-white p-6 rounded-xl shadow-lg ${className}`}
  >
    <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
    <div className="h-64">
      {children}
    </div>
  </motion.div>
);

// Data entry form
const DataEntryForm = ({ onAddData, onClose }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    heartRate: '',
    bloodSugar: '',
    oxygen: '',
    temperature: '',
    sleepHours: '',
    waterIntake: '',
    steps: '',
    calories: '',
    mood: 'happy',
    weight: '',
    bmi: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddData(formData);
    onClose();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div 
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md"
      >
        <h3 className="text-xl font-semibold mb-4">Add Health Data</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            {healthIndicators.map(indicator => (
              <div key={indicator.key}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {indicator.name} ({indicator.unit})
                </label>
                <input
                  type="number"
                  name={indicator.key}
                  value={formData[indicator.key]}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  step={indicator.key === 'sleepHours' ? '0.1' : '1'}
                />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mood</label>
              <select
                name="mood"
                value={formData.mood}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="happy">Happy</option>
                <option value="calm">Calm</option>
                <option value="energetic">Energetic</option>
                <option value="tired">Tired</option>
                <option value="stressed">Stressed</option>
                <option value="relaxed">Relaxed</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Data
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// Main component
const HealthDashboard = () => {
  const [healthData, setHealthData] = useState(generateHealthData());
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("week");
  const [isLoading, setIsLoading] = useState(false);
  const [showDataForm, setShowDataForm] = useState(false);

  // Filter data based on time range
  const filteredData = healthData.slice(
    timeRange === "week" ? -7 : timeRange === "month" ? -30 : 0
  );

  // Process mood data
  const moodData = filteredData.reduce((acc, entry) => {
    if (!entry?.mood) return acc;
    const found = acc.find(m => m.name === entry.mood);
    if (found) found.value += 1;
    else acc.push({ name: entry.mood, value: 1 });
    return acc;
  }, []);

  // Process radar chart data
  const radarData = healthIndicators
    .filter(indicator => indicator.key !== "bloodPressure")
    .map(indicator => {
      const values = filteredData
        .filter(d => d && typeof d[indicator.key] !== 'undefined')
        .map(d => parseFloat(d[indicator.key]));
        
      if (values.length === 0) return null;
      
      const avg = values.reduce((a, b) => a + b, 0) / values.length;
      
      return {
        subject: indicator.name,
        value: avg,
        fullMark: indicator.key === 'steps' ? 15000 : 
                 indicator.key === 'waterIntake' ? 4000 : 
                 indicator.key === 'sleepHours' ? 12 : 100
      };
    }).filter(Boolean);

  // Get latest values for indicators
  const latestValues = filteredData[filteredData.length - 1] || {};

  // Refresh data
  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // Add new health data
  const addHealthData = (newData) => {
    setHealthData(prev => {
      // Check if data for this date already exists
      const existingIndex = prev.findIndex(item => item.date === newData.date);
      
      if (existingIndex >= 0) {
        // Update existing entry
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], ...newData };
        return updated;
      } else {
        // Add new entry
        return [...prev, newData].sort((a, b) => new Date(a.date) - new Date(b.date));
      }
    });
  };

  // Generate and download PDF report
  const downloadReport = async () => {
    setIsLoading(true);
    
    try {
      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([600, 800]);
      const { width, height } = page.getSize();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      
      // Add title
      page.drawText('Health Dashboard Report', {
        x: 50,
        y: height - 50,
        size: 24,
        font,
        color: rgb(0, 0, 0),
      });
      
      // Add date
      page.drawText(`Generated on: ${new Date().toLocaleDateString()}`, {
        x: 50,
        y: height - 80,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });
      
      // Add summary data
      let yPosition = height - 120;
      page.drawText('Latest Health Metrics:', {
        x: 50,
        y: yPosition,
        size: 14,
        font,
        color: rgb(0, 0, 0),
      });
      
      yPosition -= 30;
      healthIndicators.forEach(indicator => {
        page.drawText(`${indicator.name}: ${latestValues[indicator.key] || 'N/A'} ${indicator.unit}`, {
          x: 50,
          y: yPosition,
          size: 12,
          font,
          color: rgb(0, 0, 0),
        });
        yPosition -= 20;
      });
      
      // Add data table
      yPosition -= 40;
      page.drawText('Recent Data:', {
        x: 50,
        y: yPosition,
        size: 14,
        font,
        color: rgb(0, 0, 0),
      });
      
      yPosition -= 20;
      const headers = ['Date', 'Heart Rate', 'Sleep', 'Water', 'Steps'];
      let xPosition = 50;
      headers.forEach(header => {
        page.drawText(header, {
          x: xPosition,
          y: yPosition,
          size: 10,
          font,
          color: rgb(0, 0, 0),
        });
        xPosition += 100;
      });
      
      yPosition -= 20;
      filteredData.slice(-10).reverse().forEach(item => {
        xPosition = 50;
        page.drawText(item.date, {
          x: xPosition,
          y: yPosition,
          size: 10,
          font,
          color: rgb(0, 0, 0),
        });
        xPosition += 100;
        page.drawText(item.heartRate.toString(), {
          x: xPosition,
          y: yPosition,
          size: 10,
          font,
          color: rgb(0, 0, 0),
        });
        xPosition += 100;
        page.drawText(item.sleepHours.toString(), {
          x: xPosition,
          y: yPosition,
          size: 10,
          font,
          color: rgb(0, 0, 0),
        });
        xPosition += 100;
        page.drawText(item.waterIntake.toString(), {
          x: xPosition,
          y: yPosition,
          size: 10,
          font,
          color: rgb(0, 0, 0),
        });
        xPosition += 100;
        page.drawText(item.steps.toString(), {
          x: xPosition,
          y: yPosition,
          size: 10,
          font,
          color: rgb(0, 0, 0),
        });
        yPosition -= 15;
      });
      
      // Save the PDF
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      saveAs(blob, 'health-report.pdf');
      
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col md:flex-row justify-between items-center mb-8"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800">
            Advanced Health Dashboard
          </h1>
          <p className="text-blue-600">Comprehensive health metrics tracking</p>
        </div>
        
        <div className="flex space-x-3 mt-4 md:mt-0">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowDataForm(true)}
            className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Data
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={downloadReport}
            disabled={isLoading}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Report
          </motion.button>
        </div>
      </motion.header>

      {/* Data Entry Form */}
      {showDataForm && (
        <DataEntryForm 
          onAddData={addHealthData} 
          onClose={() => setShowDataForm(false)} 
        />
      )}

      {/* Time range selector */}
      <motion.div 
        className="flex justify-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="inline-flex rounded-md shadow-sm">
          {["week", "month", "all"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 text-sm font-medium ${
                timeRange === range
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600 hover:bg-blue-50"
              } ${range === "week" ? "rounded-l-lg" : ""} ${
                range === "all" ? "rounded-r-lg" : ""
              } border border-blue-200`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div 
        className="flex border-b border-gray-200 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {["overview", "vitals", "lifestyle", "trends"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === tab
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </motion.div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Health indicators grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {healthIndicators.map((indicator) => (
                  <HealthIndicatorCard
                    key={indicator.key}
                    indicator={indicator}
                    currentValue={latestValues[indicator.key] || 'N/A'}
                  />
                ))}
              </div>

              {/* Radar chart for overall health */}
              <ChartContainer title="Health Overview Radar">
                {radarData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar
                        name="Average"
                        dataKey="value"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.6}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    No data available for radar chart
                  </div>
                )}
              </ChartContainer>

              {/* Combined metrics */}
              <ChartContainer title="Key Metrics Overview" className="col-span-2">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    />
                    <YAxis yAxisId="left" orientation="left" stroke={COLORS.heartRate} />
                    <YAxis yAxisId="right" orientation="right" stroke={COLORS.steps} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="heartRate"
                      stroke={COLORS.heartRate}
                      strokeWidth={2}
                      name="Heart Rate (bpm)"
                    />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="sleepHours"
                      stroke={COLORS.sleepHours}
                      fill={COLORS.sleepHours}
                      fillOpacity={0.2}
                      name="Sleep Hours"
                    />
                    <Bar
                      yAxisId="right"
                      dataKey="steps"
                      fill={COLORS.steps}
                      name="Steps"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          )}

          {activeTab === "vitals" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ChartContainer title="Heart Rate (bpm)">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Line 
                      type="monotone" 
                      dataKey="heartRate" 
                      stroke={COLORS.heartRate} 
                      strokeWidth={2}
                      dot={{ r: 4, fill: COLORS.heartRate }}
                      activeDot={{ r: 6, stroke: COLORS.heartRate, strokeWidth: 2, fill: "#fff" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
              
              <ChartContainer title="Blood Sugar (mg/dL)">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={filteredData}>
                    <defs>
                      <linearGradient id="bloodSugarColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLORS.bloodSugar} stopOpacity={0.8} />
                        <stop offset="95%" stopColor={COLORS.bloodSugar} stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="bloodSugar"
                      stroke={COLORS.bloodSugar}
                      fill="url(#bloodSugarColor)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
              
              <ChartContainer title="Oxygen Saturation (%)">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="oxygen" 
                      fill={COLORS.oxygen} 
                      radius={[5, 5, 0, 0]}
                      animationDuration={1500}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
              
              <ChartContainer title="Body Temperature (°F)">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Line 
                      type="monotone" 
                      dataKey="temperature" 
                      stroke={COLORS.temperature} 
                      strokeWidth={2}
                      dot={{ r: 4, fill: COLORS.temperature }}
                      activeDot={{ r: 6, stroke: COLORS.temperature, strokeWidth: 2, fill: "#fff" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          )}

          {activeTab === "lifestyle" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ChartContainer title="Sleep Hours">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={filteredData}>
                    <defs>
                      <linearGradient id="sleepColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLORS.sleepHours} stopOpacity={0.8} />
                        <stop offset="95%" stopColor={COLORS.sleepHours} stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="sleepHours"
                      stroke={COLORS.sleepHours}
                      fill="url(#sleepColor)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
              
              <ChartContainer title="Water Intake (ml)">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="waterIntake" 
                      fill={COLORS.waterIntake} 
                      radius={[5, 5, 0, 0]}
                      animationDuration={1500}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
              
              <ChartContainer title="Daily Steps">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Line 
                      type="monotone" 
                      dataKey="steps" 
                      stroke={COLORS.steps} 
                      strokeWidth={2}
                      dot={{ r: 4, fill: COLORS.steps }}
                      activeDot={{ r: 6, stroke: COLORS.steps, strokeWidth: 2, fill: "#fff" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
              
              <ChartContainer title="Weight vs BMI">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="weight" 
                      name="Weight (kg)"
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      dataKey="bmi" 
                      name="BMI"
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Scatter 
                      name="Weight vs BMI" 
                      data={filteredData} 
                      fill="#8884d8" 
                      line
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          )}

          {activeTab === "trends" && (
            <div className="space-y-8">
              <ChartContainer title="Health Trends Correlation" className="col-span-2">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="heartRate"
                      stroke={COLORS.heartRate}
                      strokeWidth={2}
                      name="Heart Rate (bpm)"
                    />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="sleepHours"
                      stroke={COLORS.sleepHours}
                      fill={COLORS.sleepHours}
                      fillOpacity={0.2}
                      name="Sleep Hours"
                    />
                    <Bar
                      yAxisId="right"
                      dataKey="waterIntake"
                      fill={COLORS.waterIntake}
                      name="Water Intake (ml)"
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="steps"
                      stroke={COLORS.steps}
                      strokeWidth={2}
                      name="Steps"
                      dot={false}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </ChartContainer>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ChartContainer title="Mood Distribution">
                  {moodData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={moodData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {moodData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS.mood[index % COLORS.mood.length]} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      No mood data available
                    </div>
                  )}
                </ChartContainer>
                
                <ChartContainer title="Sleep vs Heart Rate">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart data={filteredData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="sleepHours" 
                        name="Sleep Hours"
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis 
                        dataKey="heartRate" 
                        name="Heart Rate (bpm)"
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Scatter 
                        name="Sleep vs Heart Rate" 
                        data={filteredData} 
                        fill="#8884d8" 
                        line
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HealthDashboard;