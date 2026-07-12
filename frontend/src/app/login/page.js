"use client";

import Link from "next/link";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    async function handleGoogleLogin() {

    const { error } = await supabase.auth.signInWithOAuth({

      provider: "google",

      options: {

        redirectTo: `${window.location.origin}/dashboard`

      }

    });

    if (error) {

      alert(error.message);

    }

  }
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
          <div className="flex items-center my-6">

            <hr className="flex-1 border-gray-300" />

            <span className="mx-3 text-gray-500 text-sm">

              OR

            </span>

            <hr className="flex-1 border-gray-300" />

          </div>

          <button

            onClick={handleGoogleLogin}

           className="w-full border border-gray-300 py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-100 transition"

         >

           <img

             src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"

              alt="Google"

              className="w-6 h-6"

           />

            Continue with Google

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