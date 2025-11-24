"use client"

import React from 'react';
import Image from 'next/image';

// Type for a gallery image
type GalleryImage = {
    src: string;
    alt: string;
    category: string;
};

const galleryImages: GalleryImage[] = [
    // Monthly Programs
    { src: '/Month Programs1.jpg', alt: 'Monthly Program event', category: 'Monthly Programs' },
    { src: '/Month Programs2.jpg', alt: 'Monthly Program event', category: 'Monthly Programs' },
    { src: '/Month Programs3.jpg', alt: 'Monthly Program event', category: 'Monthly Programs' },
    { src: '/Month Programs4.jpg', alt: 'Monthly Program event', category: 'Monthly Programs' },
    { src: '/Month Programs5.jpg', alt: 'Monthly Program event', category: 'Monthly Programs' },
    { src: '/Month Programs6.jpg', alt: 'Monthly Program event', category: 'Monthly Programs' },

    // Farewell Programs
    { src: '/Fare Well1.jpg', alt: 'Farewell Program', category: 'Farewell Programs' },
    { src: '/Fare Well2.jpg', alt: 'Farewell Program', category: 'Farewell Programs' },
    { src: '/Fare Well3.jpg', alt: 'Farewell Program', category: 'Farewell Programs' },
    { src: '/Fare Well4.jpg', alt: 'Farewell Program', category: 'Farewell Programs' },
    { src: '/Fare Well6.jpg', alt: 'Farewell Program', category: 'Farewell Programs' },
    { src: '/Fare Well7.jpg', alt: 'Farewell Program', category: 'Farewell Programs' },
    { src: '/Fare Well9.jpg', alt: 'Farewell Program', category: 'Farewell Programs' },
    { src: '/Fare Well10.jpg', alt: 'Farewell Program', category: 'Farewell Programs' },
    { src: '/Fare Well11.jpg', alt: 'Farewell Program', category: 'Farewell Programs' },

    // Scholarships Events
    { src: '/Scholorships 1.jpg', alt: 'Scholarship Event', category: 'Scholarships Events' },
    { src: '/Scholorships 2.jpg', alt: 'Scholarship Event', category: 'Scholarships Events' },
    { src: '/Scholorships 3.jpg', alt: 'Scholarship Event', category: 'Scholarships Events' },
    { src: '/Scholorships 4.jpg', alt: 'Scholarship Event', category: 'Scholarships Events' },
    { src: '/Scholorships 5.jpg', alt: 'Scholarship Event', category: 'Scholarships Events' },
    { src: '/Scholorships 6.jpg', alt: 'Scholarship Event', category: 'Scholarships Events' },
    { src: '/Scholorships 7.jpg', alt: 'Scholarship Event', category: 'Scholarships Events' },
    { src: '/Scholorships 8.jpg', alt: 'Scholarship Event', category: 'Scholarships Events' },
    { src: '/Scholorships 9.jpg', alt: 'Scholarship Event', category: 'Scholarships Events' },
    { src: '/Scholorships 10.jpg', alt: 'Scholarship Event', category: 'Scholarships Events' },
    { src: '/Scholorships 12.jpg', alt: 'Scholarship Event', category: 'Scholarships Events' },

    // Weekly Tests
    { src: '/weekly Test 1.jpg', alt: 'Weekly Test', category: 'Weekly Tests' },
    { src: '/weekly Test 2.jpg', alt: 'Weekly Test', category: 'Weekly Tests' },
    { src: '/weekly Test 3.jpg', alt: 'Weekly Test', category: 'Weekly Tests' },
    { src: '/weekly Test 4.jpg', alt: 'Weekly Test', category: 'Weekly Tests' },
    { src: '/weekly Test 5.jpg', alt: 'Weekly Test', category: 'Weekly Tests' },
    { src: '/weekly Test 6.jpg', alt: 'Weekly Test', category: 'Weekly Tests' },

    // Exhibitions
    { src: '/Exhibitions.jpg', alt: 'Exhibition', category: 'Exhibitions' },
    { src: '/Exhibitions .jpg', alt: 'Exhibition', category: 'Exhibitions' },
    { src: '/Exhibitions 1.jpg', alt: 'Exhibition', category: 'Exhibitions' },
    { src: '/Exhibitions 2.jpg', alt: 'Exhibition', category: 'Exhibitions' },
    { src: '/Exhibitions 3.jpg', alt: 'Exhibition', category: 'Exhibitions' },
    { src: '/Exhibitions 4.jpg', alt: 'Exhibition', category: 'Exhibitions' },
    { src: '/Exhibitions 5.jpg', alt: 'Exhibition', category: 'Exhibitions' },
    { src: '/Exhibitions 6.jpg', alt: 'Exhibition', category: 'Exhibitions' },
    { src: '/Exhibitions 7.jpg', alt: 'Exhibition', category: 'Exhibitions' },
    { src: '/Exhibitions 8.jpg', alt: 'Exhibition', category: 'Exhibitions' },
    { src: '/Exhibitions 9.jpg', alt: 'Exhibition', category: 'Exhibitions' },
    { src: '/Exhibitions 10.jpg', alt: 'Exhibition', category: 'Exhibitions' },
    { src: '/Exhibitions 11.jpg', alt: 'Exhibition', category: 'Exhibitions' },
    { src: '/Exhibitions 12.jpg', alt: 'Exhibition', category: 'Exhibitions' },

    // Presentations
    { src: '/Presentaions 1.jpg', alt: 'Presentation', category: 'Presentations' },
    { src: '/Presentaions 2.jpg', alt: 'Presentation', category: 'Presentations' },
    { src: '/Presentaions 3.jpg', alt: 'Presentation', category: 'Presentations' },
    { src: '/Presentaions 4.jpg', alt: 'Presentation', category: 'Presentations' },
    { src: '/Presentaions 5.jpg', alt: 'Presentation', category: 'Presentations' },
    { src: '/Presentaions 6.jpg', alt: 'Presentation', category: 'Presentations' },
    { src: '/Presentaions 7.jpg', alt: 'Presentation', category: 'Presentations' },

    // Cricket Matches
    { src: '/Cricket Matches 1.jpg', alt: 'Cricket Match', category: 'Cricket Matches' },
    { src: '/Cricket Matches 2.jpg', alt: 'Cricket Match', category: 'Cricket Matches' },
    { src: '/Cricket Matches 3.jpg', alt: 'Cricket Match', category: 'Cricket Matches' },
    { src: '/Cricket Matches 4.jpg', alt: 'Cricket Match', category: 'Cricket Matches' },
    { src: '/Cricket Matches 5.jpg', alt: 'Cricket Match', category: 'Cricket Matches' },
    { src: '/Cricket Matches 6.jpg', alt: 'Cricket Match', category: 'Cricket Matches' },

    // Picnics
    { src: '/Picnics 1.jpg', alt: 'Picnic', category: 'Picnics' },
    { src: '/Picnics 2.jpg', alt: 'Picnic', category: 'Picnics' },
    { src: '/Picnics 3.jpg', alt: 'Picnic', category: 'Picnics' },
    { src: '/Picnics 4.jpg', alt: 'Picnic', category: 'Picnics' },
    { src: '/Picnics 5.jpg', alt: 'Picnic', category: 'Picnics' },
    { src: '/Picnics 6.jpg', alt: 'Picnic', category: 'Picnics' },

    // Out Door Activities
    { src: '/Outdoor Activities 1.jpg', alt: 'Outdoor Activity', category: 'Out Door Activities' },
    { src: '/Outdoor Activities 2.jpg', alt: 'Outdoor Activity', category: 'Out Door Activities' },
    { src: '/Outdoor Activities 3.jpg', alt: 'Outdoor Activity', category: 'Out Door Activities' },
    { src: '/Outdoor Activities 4.jpg', alt: 'Outdoor Activity', category: 'Out Door Activities' },
    { src: '/Outdoor Activities 5.jpg', alt: 'Outdoor Activity', category: 'Out Door Activities' },
    { src: '/Outdoor Activities 6.jpg', alt: 'Outdoor Activity', category: 'Out Door Activities' },

    // External Activities
    { src: '/Extra Educational Activities 1.jpg', alt: 'External Activity', category: 'External Activities' },
    { src: '/Extra Educational Activities 2.jpg', alt: 'External Activity', category: 'External Activities' },
    { src: '/Extra Educational Activities 3.jpg', alt: 'External Activity', category: 'External Activities' },
    { src: '/Extra Educational Activities 4.jpg', alt: 'External Activity', category: 'External Activities' },
    { src: '/Extra Educational Activities 5.jpg', alt: 'External Activity', category: 'External Activities' },
    { src: '/Extra Educational Activities 6.jpg', alt: 'External Activity', category: 'External Activities' },

    // Successfull Students
    { src: '/Successful Candidates 1.jpg', alt: 'Successful Student', category: 'Successfull Students' },
    { src: '/Successful Candidates 2.jpg', alt: 'Successful Student', category: 'Successfull Students' },
    { src: '/Successful Candidates 3.jpg', alt: 'Successful Student', category: 'Successfull Students' },
    { src: '/Successful Candidates 4.jpg', alt: 'Successful Student', category: 'Successfull Students' },
    { src: '/Successful Candidates 5.jpg', alt: 'Successful Student', category: 'Successfull Students' },
    { src: '/Successful Candidates 6.jpg', alt: 'Successful Student', category: 'Successfull Students' },
];

// Utility type for grouped images by category
type GalleryCategoryMap = {
    [category: string]: GalleryImage[];
};

const MainGallery = () => {
    // Group images by category
    const groupedImages = galleryImages.reduce<GalleryCategoryMap>((acc, image) => {
        const category = image.category;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(image);
        return acc;
    }, {});

    return (
        <section className='relative my-20'>
            <div className='max-w-[95vw] md:max-w-[90vw] mx-auto'>
                <h1 className='text-left text-[#044e83] font-extrabold text-3xl md:text-4xl mb-10'>
                    Gallery
                </h1>
                <p className='text-center text-gray-600 text-lg mb-10'>
                    A glimpse into the events and activities at Quick Tech Institute.
                </p>
                <div>
                    {Object.entries(groupedImages).map(([category, images]) => (
                        <div key={category} className='mb-20'>
                            <h2 className='text-center text-2xl md:text-3xl font-bold text-[#044e83] mb-8'>
                                {category}
                            </h2>
                            {/* On small device: single column, wider cards; on sm+: 2 columns, on xl+: 3 */}
                            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-10'>
                                {images.map((image, index) => (
                                    <div
                                        key={index}
                                        className='bg-white shadow-lg rounded-lg overflow-hidden flex flex-col items-center course-card-hover transition w-full'
                                    >
                                        <div
                                            className='relative w-full'
                                            style={{
                                                height: '60vw', // taller for cards on mobile
                                                maxHeight: 410, // slightly less than before for mobile
                                            }}
                                        >
                                            <Image
                                                src={image.src}
                                                alt={image.alt}
                                                fill
                                                sizes="(max-width: 640px) 96vw, (max-width: 1280px) 48vw, 32vw"
                                                style={{
                                                    objectFit: 'cover',
                                                    borderTopLeftRadius: 8,
                                                    borderTopRightRadius: 8,
                                                }}
                                                priority={index < 4}
                                            />
                                        </div>
                                        <div className="flex-1 p-3 md:p-4 flex items-center justify-center w-full">
                                            <p className="text-center text-[#044e83] text-base md:text-lg font-semibold">{image.alt}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MainGallery;

