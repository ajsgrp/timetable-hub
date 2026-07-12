"use client";

import Link from "next/link";

export default function LoginPage() {

  return (

    <main className="min-h-screen bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-900 flex justify-center items-center">

      <div className="bg-white rounded-3xl shadow-2xl p-10 w-[450px]">

        <h1 className="text-4xl font-bold text-center text-blue-700">
          TimeTable Hub
        </h1>

        <p className="text-center text-gray-500 mt-3">
          Login to your account
        </p>

        <div className="mt-8">

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter Email"
            className="w-full border rounded-xl p-4 mt-2 mb-5"
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter Password"
            className="w-full border rounded-xl p-4 mt-2"
          />

          <div className="flex justify-between mt-5">

            <label className="flex gap-2">

              <input type="checkbox"/>

              Remember Me

            </label>

            <Link
              href="/forgot-password"
              className="text-blue-600"
            >
              Forgot Password?
            </Link>

          </div>
          
          <Link href="/login"></Link>
          <button
            className="w-full bg-blue-600 text-white py-4 rounded-xl mt-8"
          >
            Login
          </button>

          <p className="text-center mt-8">

            Don't have an account?

            <Link
              href="/signup"
              className="text-blue-600 font-bold ml-2"
            >
              Sign Up
            </Link>

          </p>

          <Link
            href="/"
            className="block text-center mt-6"
          >
            ← Back To Home
          </Link>

        </div>

      </div>

    </main>

  );

}