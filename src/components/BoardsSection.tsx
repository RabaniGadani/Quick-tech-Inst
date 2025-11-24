"use client"

import React, { useState } from 'react';
import Image from 'next/image';

const boardsData = [
    {
        name: "Trade Testing Board, Sindh",
        logo: "/Trade Testing Board, Sindh 1.jpg"
    },
    {
        name: "Sindh Board of Technical Education",
        logo: "/Sindh Board of Technical Education.png"
    },
];

const IMAGE_SIZE_MOBILE = 96; // 24 * 4 = 96px
const IMAGE_SIZE_DESKTOP = 160; // 40 * 4 = 160px

const BoardsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? boardsData.length - 1 : prev - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prev) =>
            prev === boardsData.length - 1 ? 0 : prev + 1
        );
    };

    return (
        <section className="relative my-20">
            <div className="max-w-[90%] mx-auto">
                <h1 className="text-left text-[#044e83] font-extrabold text-3xl md:text-4xl mb-10">
                    Affiliated Boards <span className="text-base font-normal text-gray-600 ml-2"></span>
                </h1>

                {/* Slider for mobile, grid for md+ */}
                <div className="md:hidden relative flex items-center justify-center">
                    <button
                        className="absolute left-0 z-10 bg-white rounded-full shadow p-1 px-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
                        aria-label="Previous"
                        onClick={handlePrev}
                    >
                        &#8592;
                    </button>
                    <div className="flex flex-col items-center w-full">
                        <div className="mb-4">
                            <div
                                className={`
                                    rounded-full
                                    bg-white
                                    flex
                                    items-center
                                    justify-center
                                    mx-auto
                                    w-24 h-24
                                    shadow
                                `}
                                style={{
                                    overflow: "hidden",
                                }}
                            >
                                <Image
                                    src={boardsData[currentIndex].logo}
                                    alt={`${boardsData[currentIndex].name} logo`}
                                    width={IMAGE_SIZE_MOBILE}
                                    height={IMAGE_SIZE_MOBILE}
                                    className="object-contain w-full h-full"
                                    style={{
                                        objectFit: "contain",
                                        width: "100%",
                                        height: "100%",
                                    }}
                                />
                            </div>
                        </div>
                        <h2 className="text-lg font-bold text-gray-800">{boardsData[currentIndex].name} <span className="text-xs font-normal text-gray-500 block md:hidden"></span></h2>
                        <div className="flex justify-center gap-2 mt-4">
                            {boardsData.map((_, idx) => (
                                <span
                                    key={idx}
                                    className={`block w-2 h-2 rounded-full ${currentIndex === idx ? "bg-[#044e83]" : "bg-gray-300"}`}
                                />
                            ))}
                        </div>
                    </div>
                    <button
                        className="absolute right-0 z-10 bg-white rounded-full shadow p-1 px-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
                        aria-label="Next"
                        onClick={handleNext}
                    >
                        &#8594;
                    </button>
                </div>

                {/* Desktop/Tablet grid display */}
                <div className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
                    {boardsData.map((board, index) => (
                        <div key={index} className="flex flex-col items-center text-center">
                            <div className="mb-4">
                                <div
                                    className={`
                                        rounded-full
                                        bg-white
                                        flex
                                        items-center
                                        justify-center
                                        mx-auto
                                        md:w-32 md:h-32
                                        lg:w-40 lg:h-40
                                        shadow
                                    `}
                                    style={{
                                        overflow: "hidden",
                                    }}
                                >
                                    <Image
                                        src={board.logo}
                                        alt={`${board.name} logo`}
                                        width={IMAGE_SIZE_DESKTOP}
                                        height={IMAGE_SIZE_DESKTOP}
                                        className="object-contain w-full h-full"
                                        style={{
                                            objectFit: "contain",
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    />
                                </div>
                            </div>
                            <h2 className="text-lg font-bold text-gray-800">{board.name} <span className="text-xs font-normal text-gray-500 block md:hidden">(Available on all devices)</span></h2>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default BoardsSection;
