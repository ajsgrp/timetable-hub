"use client";

import SplashScreen from "./components/SplashScreen";
import Link from "next/link";
import { useState } from "react";
import Navbar from "./components/Navbar";

export default function Home() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  return (
     <>
       {showSplash && (
          <SplashScreen
            onFinish={() => setShowSplash(false)}
          />
        )}
    <Navbar />
      {/* Hero Section */}
      <main className="min-h-screen pt-20 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-900 flex items-center">

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center px-6 md:px-8 lg:px-8 py-10">

          {/* Left Side */}
          <div>

            <span className="bg-white text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
              🚀 Smart Productivity Platform
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white mt-6 lg:mt-8 leading-tight">
              Manage Your Time
              <br />
              Like Never Before
            </h1>

            <p className="text-white text-base sm:text-lg lg:text-xl mt-6 leading-8">
              Organize your calendar, goals, reminders, daily schedule,
              and productivity in one beautiful platform.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">

              <button className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:scale-105 transition duration-300">
                Get Started
              </button>

              <button className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-700 transition duration-300">
                Learn More
              </button>

            </div>

          </div>
        </div>
      </main>
      {/* Features Section */}

     <section className="py-24 bg-gray-100">

       <div className="max-w-7xl mx-auto px-8">

         <h2 className="text-5xl font-bold text-center">
           Powerful Features
         </h2>

         <p className="text-center text-gray-600 mt-4 text-xl">
           Everything you need to manage your time efficiently.
         </p>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

           <div className="bg-white rounded-2xl shadow-lg p-8">
             <h3 className="text-2xl font-bold">📅 Smart Calendar</h3>
             <p className="mt-4 text-gray-600">
               Organize your daily, weekly and monthly schedule.
             </p>
           </div>

           <div className="bg-white rounded-2xl shadow-lg p-8">
             <h3 className="text-2xl font-bold">✅ Task Manager</h3>
             <p className="mt-4 text-gray-600">
               Create, edit and complete tasks with reminders.
             </p>
           </div>

           <div className="bg-white rounded-2xl shadow-lg p-8">
             <h3 className="text-2xl font-bold">🎯 Goal Tracking</h3>
             <p className="mt-4 text-gray-600">
               Track your goals and stay focused every day.
             </p>
           </div>

           <div className="bg-white rounded-2xl shadow-lg p-8">
             <h3 className="text-2xl font-bold">📊 Analytics</h3>
             <p className="mt-4 text-gray-600">
               Visual reports of your productivity and progress.
             </p>
           </div>

           <div className="bg-white rounded-2xl shadow-lg p-8">
             <h3 className="text-2xl font-bold">🔔 Smart Reminders</h3>
             <p className="mt-4 text-gray-600">
               Never miss an important task or meeting.
             </p>
            </div>

           <div className="bg-white rounded-2xl shadow-lg p-8">
             <h3 className="text-2xl font-bold">☁ Cloud Sync</h3>
             <p className="mt-4 text-gray-600">
               Access your data anytime from phone or laptop.
             </p>
           </div>

          </div>

       </div>

      </section>
      {/* How It Works Section */}

      <section className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-8">

          <h2 className="text-5xl font-bold text-center">
            How TimeTable Hub Works
          </h2>

          <p className="text-center text-gray-600 mt-4 text-xl">
            Start organizing your life in just 4 simple steps.
           </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold mx-auto">
                1
              </div>
              <h3 className="text-2xl font-bold mt-6">Create Account</h3>
              <p className="mt-3 text-gray-600">
                Sign up and create your personal workspace.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-green-600 text-white flex items-center justify-center text-3xl font-bold mx-auto">
                2
              </div>
              <h3 className="text-2xl font-bold mt-6">Choose Date</h3>
              <p className="mt-3 text-gray-600">
                Select any date from your calendar.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-yellow-500 text-white flex items-center justify-center text-3xl font-bold mx-auto">
                3
              </div>
              <h3 className="text-2xl font-bold mt-6">Create Time Blocks</h3>
              <p className="mt-3 text-gray-600">
                Add tasks with custom start and end time.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-red-500 text-white flex items-center justify-center text-3xl font-bold mx-auto">
                4
              </div>
              <h3 className="text-2xl font-bold mt-6">Achieve Your Goals</h3>
              <p className="mt-3 text-gray-600">
                Complete tasks and improve your productivity.
              </p>
            </div>

          </div>

        </div>

      </section>
    </>
  );
}