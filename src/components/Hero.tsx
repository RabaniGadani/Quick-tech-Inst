"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const Hero = () => {
  const [applicationCount, setApplicationCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchApplicationCount = async () => {
      setLoading(true);
      try {
        // Count the number of rows based on the 'id' of 'admissions' table
        const { count, error } = await supabase
          .from("admissions")
          .select("id", { count: "exact", head: true });

        if (error) throw error;
        setApplicationCount(count ?? 0);
      } catch (_err) { // eslint-disable-line @typescript-eslint/no-unused-vars
        setApplicationCount(null);
      } finally {
        setLoading(false);
      }
    };
    fetchApplicationCount();
  }, []);

  return (
    <section className="relative h-auto md:h-[97vh] py-16 md:py-28 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('/back.jpg')] bg-cover bg-top opacity-20"></div>
      <div className="max-w-[90%] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Text Section */}
          <div className="md:w-[50%] relative z-50 text-center md:text-left px-4">
            <h1 className="md:text-5xl text-3xl text-[#044E83] mb-6">
              <span className="font-bold md:text-[68px] text-4xl">
                Quick Tech 
              </span>{" "}
            </h1>
            <h2 className="text-[#2EB6E8] text-2xl md:text-4xl font-extrabold mb-6">
              Institute of Information Technology
            </h2>
            <h3 className="text-[#044E83] text-lg md:text-3xl font-extrabold">
              Now admissions are closed
            </h3>
            <div className="mt-6 flex flex-col gap-4 items-center">
              <a href="/Apply">
                <button className="bg-[#044E83] text-white font-bold px-8 py-3 rounded-lg">
                  Apply Now
                </button>
              </a>
              <div className="flex flex-col gap-1 items-center">
                <span className="text-[#044E83] text-2xl md:text-3xl font-extrabold">
                  {loading
                    ? "..."
                    : applicationCount !== null
                    ? applicationCount
                    : "N/A"}
                </span>
                <span className="text-sm md:text-base">Total Applications</span>
              </div>
            </div>
          </div>
          {/* Image Section */}
          <div className="md:w-[50%] mt-8 md:mt-0 flex justify-center">
            <Image
              src="/Sana.jpg"
              alt="Sana"
              width={500}
              height={500}
              className="w-full h-auto rounded-lg max-w-xs md:max-w-[500px] mx-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
