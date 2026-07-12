"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (

    <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-md z-50">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 h-20">

        {/* Logo */}

        <Link href="/">

          <h1 className="text-3xl font-extrabold text-blue-600 cursor-pointer">

            TimeTable Hub

          </h1>

        </Link>

        {/* Desktop Menu */}

        <div className="hidden lg:flex items-center gap-8">

          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>

          <Link href="#" className="hover:text-blue-600">
            Features
          </Link>

          <Link href="#" className="hover:text-blue-600">
            Pricing
          </Link>

          <Link href="#" className="hover:text-blue-600">
            About
          </Link>

          <Link href="#" className="hover:text-blue-600">
            Contact
          </Link>

        </div>

        {/* Desktop Buttons */}

        <div className="hidden lg:flex items-center gap-4">

          <Link href="/login">

            <button className="px-5 py-2 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 transition">

              Login

            </button>

          </Link>

          <Link href="/signup">

            <button className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition">

              Sign Up

            </button>

          </Link>

        </div>

        {/* Hamburger */}

        <button

          onClick={toggleMenu}

          className="lg:hidden text-4xl text-blue-600"

        >

          ☰

        </button>

      </div>
            {/* Mobile Menu */}

      {menuOpen && (

        <>

          {/* Background Overlay */}

          <div
            className="fixed inset-0 bg-black/50 lg:hidden"
            onClick={() => setMenuOpen(false)}
          ></div>

          {/* Sidebar */}

          <div className="fixed top-0 right-0 h-screen w-80 bg-white shadow-2xl lg:hidden z-50 transition-all duration-300">

            {/* Header */}

            <div className="flex items-center justify-between p-6 border-b">

              <h2 className="text-2xl font-bold text-blue-600">

                TimeTable Hub

              </h2>

              <button
                onClick={() => setMenuOpen(false)}
                className="text-3xl"
              >
                ✕
              </button>

            </div>

            {/* Navigation */}

            <div className="flex flex-col p-6 space-y-6 text-lg">

              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
              >
                🏠 Home
              </Link>

              <Link
                href="#"
                onClick={() => setMenuOpen(false)}
              >
                ✨ Features
              </Link>

              <Link
                href="#"
                onClick={() => setMenuOpen(false)}
              >
                💰 Pricing
              </Link>

              <Link
                href="#"
                onClick={() => setMenuOpen(false)}
              >
                ℹ About
              </Link>

              <Link
                href="#"
                onClick={() => setMenuOpen(false)}
              >
                📞 Contact
              </Link>

              <hr />

              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
              >

                <button className="w-full border border-blue-600 text-blue-600 py-3 rounded-xl">

                  Login

                </button>

              </Link>

              <Link
                href="/signup"
                onClick={() => setMenuOpen(false)}
              >

                <button className="w-full bg-blue-600 text-white py-3 rounded-xl">

                  Sign Up

                </button>

              </Link>

            </div>

          </div>

        </>

      )}
    </nav>

  );

}