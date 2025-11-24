import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E6F1FA] to-[#f4fbff]">
      <div className="flex flex-col items-center p-10 rounded-xl shadow-xl bg-white">
        <div className="relative flex items-center justify-center mb-8 h-20 w-20">
          {/* Spinning Gradient Circle */}
          <span className="absolute inline-flex h-full w-full rounded-full bg-gradient-to-tr from-[#044e83] to-[#39bdf8] opacity-20 animate-pulse"></span>
          <svg
            className="animate-spin h-16 w-16 text-[#044e83]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 48 48"
          >
            <circle
              className="opacity-20"
              cx="24"
              cy="24"
              r="20"
              stroke="#044e83"
              strokeWidth="6"
            />
            <path
              d="M44 24c0-11.046-8.954-20-20-20"
              stroke="#39bdf8"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>
          {/* Company Logo at center (optional, comment if unwanted) */}
          <div className="absolute h-10 w-10 rounded-full overflow-hidden shadow border-2 border-[#044e83] bg-white flex items-center justify-center">
            <Image src="/Logo.jpg" alt="Logo" width={40} height={40} />
          </div>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide text-[#044e83] mb-2">
          Loading
          <span className="ml-1 inline-flex">
            <span className="animate-bounce">.</span>
            <span className="animate-bounce delay-150">.</span>
            <span className="animate-bounce delay-300">.</span>
          </span>
        </h1>
        <p className="text-gray-600 text-base md:text-lg text-center mb-0">
          Our system is preparing your experience.<br />Thank you for your patience.
        </p>
      </div>
    </div>
  );
}
