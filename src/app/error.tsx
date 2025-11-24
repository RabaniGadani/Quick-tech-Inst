"use client";
import React from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const ErrorPage = ({ error, reset }: ErrorProps) => {
  let message = "Something went wrong.";
  let code: number | null = null;

  if (typeof window !== "undefined") {
    // Get current URL to check for 404 pattern
    if (window.location.pathname === "/404") {
      code = 404;
      message = "Page Not Found";
    } else if (/not-found/i.test(error.message)) {
      code = 404;
      message = "Page Not Found";
    } else if (/unauthorized/i.test(error.message)) {
      code = 401;
      message = "Unauthorized";
    } else if (/forbidden/i.test(error.message)) {
      code = 403;
      message = "Forbidden";
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md flex flex-col items-center">
        <h1 className="text-6xl font-bold text-[#044e83] mb-4">
          {code ?? "Error"}
        </h1>
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">{message}</h2>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          {error?.message || "An unknown error has occurred. Please try again later."}
        </p>
        <button
          className="px-4 py-2 bg-[#044e83] text-white rounded hover:bg-[#065397] transition"
          onClick={() => reset()}
        >
          Try again
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
