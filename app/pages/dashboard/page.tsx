"use client";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";

export default function DashboardClient({ user }: { user: any }) {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [logs, setLogs] = useState<{ date: string; checkIn: string; checkOut: string; hours: string }[]>([]);

  useEffect(() => {
    let interval: any;
    if (isCheckedIn) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCheckedIn]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleClockIn = () => {
    setIsCheckedIn(true);
    setStartTime(new Date());
  };

  const handleClockOut = () => {
    if (!startTime) return;
    const endTime = new Date();
    const hoursWorked = ((endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60)).toFixed(2);
    
    setLogs([
      {
        date: new Date().toLocaleDateString(),
        checkIn: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        checkOut: endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        hours: `${hoursWorked} hrs`,
      },
      ...logs,
    ]);

    setIsCheckedIn(false);
    setElapsedTime(0);
    setStartTime(null);
  };

  return (
    <div className="min-h-screen p-6 md:p-12 bg-white bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-size-[2rem_2rem]">
        <div className="p-6 rounded-2xl flex justify-between items-center">
            <div>
                <img
                    src="/logo.png"
                    alt="Logo"
                    className="w-35 h-5 mb-5"
                />
                <h1 className="text-3xl font-extrabold text-gray-900">Internship Time Tracker</h1>
                <p className="text-[#0077B3] font-bold text-lg">Welcome back, {user?.name || user?.email}</p>
            </div>
            <button 
                onClick={() => signOut({ callbackUrl: "/pages/login" })}
                className="text-sm bg-[#0077B3] text-white px-4 py-2 rounded-xl hover:bg-white/50 hover:text-black hover:border-black/50 border transition-all cursor-pointer"
            >
                Sign Out
            </button>
        </div>
      
      <div className="max-w-8xl mx-auto space-y-6 flex flex-row gap-10 mt-10">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center flex flex-col items-center justify-center space-y-6 w-150 h-175 shrink-0">
          <div>
            <span className={`px-4 py-2 text-xl font-semibold rounded-full ${isCheckedIn ? "bg-[#0077B3] text-white" : "bg-gray-100 text-gray-600"}`}>
              {isCheckedIn ? "Currently Working" : "Checked Out"}
            </span>
            <div className="text-7xl font-ext500 font-mono tracking-wider text-[#0077B3] my-4">
              {formatTime(elapsedTime)}
            </div>
            <p className="text-xl text-gray-400">Track your daily internship hours</p>
          </div>

          <div className="flex gap-4 w-full max-w-xs">
            {!isCheckedIn ? (
              <button 
                onClick={handleClockIn}
                className="w-full bg-[#0077B3] text-white py-3 rounded-full font-bold hover:bg-black transition-all cursor-pointer shadow-md"
              >
                Clock In
              </button>
            ) : (
              <button 
                onClick={handleClockOut}
                className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-[#2d5671] transition-all cursor-pointer shadow-md"
              >
                Clock Out
              </button>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-175 h-175 flex flex-col shrink-0 overflow-y-auto">
          <h3 className="font-bold text-[#2d5671] mb-4">Recent Attendance Logs</h3>
          {logs.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">No attendance records yet today.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {logs.map((log, index) => (
                <div key={index} className="py-3 flex justify-between items-center text-sm border border-[#0077B3] p-2 rounded-xl">
                  <span className="font-medium text-gray-700 italic">{log.date}</span>
                  <span className="text-gray-500">{log.checkIn} - {log.checkOut}</span>
                  <span className="font-semibold text-[#2d5671] border border-[#2d5671] p-1 rounded-md">{log.hours}</span>
                  <button className="font-semibold text-[#2d5671] border border-[#2d5671] p-1 rounded-md cursor-pointer">Upload Documentation</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}