// src/components/HealthTracker.jsx

import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#60a5fa", "#f87171", "#34d399", "#fbbf24", "#a78bfa", "#38bdf8"];

const healthData = [
  {
    userId: "user123",
    date: "2025-06-20",
    heartRate: 72,
    bloodSugar: 90,
    oxygen: 94,
    temperature: 98.2,
    sleepHours: 7,
    waterIntake: 1800,
    mood: "calm",
  },
  {
    userId: "user123",
    date: "2025-06-21",
    heartRate: 75,
    bloodSugar: 95,
    oxygen: 97,
    temperature: 98.6,
    sleepHours: 7.5,
    waterIntake: 2000,
    mood: "relaxed",
  },
  {
    userId: "user123",
    date: "2025-06-22",
    heartRate: 78,
    bloodSugar: 100,
    oxygen: 98,
    temperature: 99,
    sleepHours: 6,
    waterIntake: 1700,
    mood: "tired",
  },
];

const moodData = healthData.reduce((acc, entry) => {
  const found = acc.find((m) => m.name === entry.mood);
  if (found) {
    found.value += 1;
  } else {
    acc.push({ name: entry.mood, value: 1 });
  }
  return acc;
}, []);

const HealthTracker = () => {
  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 to-white min-h-screen">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
        🧬 Health Tracker Dashboard
      </h1>

      {/* VITALS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <ChartCard title="Heart Rate (bpm)" type="line" dataKey="heartRate" color="#f87171" />
        <ChartCard title="Blood Sugar (mg/dL)" type="area" dataKey="bloodSugar" color="#34d399" />
        <ChartCard title="Oxygen (%)" type="bar" dataKey="oxygen" color="#60a5fa" />
        <ChartCard title="Temperature (°F)" type="line" dataKey="temperature" color="#fbbf24" />
      </div>

      {/* LIFESTYLE */}
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">💤 Lifestyle</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <ChartCard title="Sleep Hours" type="area" dataKey="sleepHours" color="#a78bfa" />
        <ChartCard title="Water Intake (ml)" type="bar" dataKey="waterIntake" color="#38bdf8" />
      </div>

      {/* MOOD DISTRIBUTION */}
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">😊 Mood Distribution</h2>
      <div className="bg-white p-6 rounded-xl shadow w-full max-w-md mx-auto">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={moodData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {moodData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const ChartCard = ({ title, type, dataKey, color }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">{title}</h3>
      <ResponsiveContainer width="100%" height={250}>
        {type === "line" && (
          <LineChart data={healthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={3} />
          </LineChart>
        )}
        {type === "area" && (
          <AreaChart data={healthData}>
            <defs>
              <linearGradient id={`color-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={color} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              fillOpacity={1}
              fill={`url(#color-${dataKey})`}
            />
          </AreaChart>
        )}
        {type === "bar" && (
          <BarChart data={healthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey={dataKey} fill={color} radius={[5, 5, 0, 0]} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default HealthTracker;
