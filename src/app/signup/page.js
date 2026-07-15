"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    
    const router = useRouter();
    async function handleSignup() {

      if (!fullName || !email || !password || !confirmPassword) {
        alert("Please fill all fields.");
        return;
      }

      if (password !== confirmPassword) {
         alert("Passwords do not match.");
        return;
      }

       setLoading(true);

       const { data, error } = await supabase.auth.signUp({

        email,

        password,

        options: {
 
          data: {

            full_name: fullName,

          },

        },

      });

      setLoading(false);

      if (error) {

       alert(error.message);

       return;

      }

      alert("Account created successfully!");

      router.push("/login");

    }

  return (

    <main className="min-h-screen bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-900 flex justify-center items-center">

      <div className="bg-white rounded-3xl shadow-2xl p-10 w-[450px]">

        <h1 className="text-4xl font-bold text-center text-blue-700">
          TimeTable Hub
        </h1>

        <p className="text-center text-gray-500 mt-3">
          Create your account
        </p>

        <div className="mt-8">

          <label>Full Name</label>

          <input
            type="text"
            placeholder="Enter Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border rounded-xl p-4 mt-2 mb-5"
          />

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-xl p-4 mt-2 mb-5"
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-xl p-4 mt-2 mb-5"
          />

          <label>Confirm Password</label>

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border rounded-xl p-4 mt-2"
          />

          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-xl mt-8 hover:bg-blue-700 disabled:bg-gray-400"
          >
           {loading ? "Creating Account..." : "Create Account"}
          </button>

          <p className="text-center mt-8">

            Already have an account?

            <Link
              href="/login"
              className="text-blue-600 font-bold ml-2"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </main>

  );

}