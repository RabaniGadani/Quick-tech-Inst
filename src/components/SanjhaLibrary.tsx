import React from 'react';
import Image from 'next/image';

const galleryImages = [
    { src: '/Sanjh Public Library 1.jpg', alt: 'Library gallery image 1' },
    { src: '/Sanjh Public Library 2.jpg', alt: 'Library gallery image 2' },
    { src: '/Sanjh Public Library 3.jpg', alt: 'Library gallery image 3' },
    { src: '/Sanjh Public Library 4.jpg', alt: 'Library gallery image 4' },
    { src: '/Sanjh Public Library 5.jpg', alt: 'Library gallery image 5' },
    { src: '/Sanjh Public Library 6.jpg', alt: 'Library gallery image 6' },
    { src: '/Sanjh Public Library 7.jpg', alt: 'Library gallery image 7' },
    { src: '/Sanjh Public Library 8.jpg', alt: 'Library gallery image 8' },
    { src: '/Sanjh Public Library 9.jpg', alt: 'Library gallery image 9' },
];

const IMAGE_WIDTH = 640;  // set a fixed width for all devices
const IMAGE_HEIGHT = 256; // set a fixed height for all devices (16:6)

const SanjhaLibrary = () => {
    return (
        <section className='relative my-20'>
            <div className='max-w-[90%] mx-auto'>
                <div className='flex flex-col md:flex-row items-center gap-8'>
                    <div className='md:w-1/2'>
                        <h1 className='text-[#044e83] font-extrabold text-3xl md:text-4xl mb-6'>
                            Sanjh Public Library 
                        </h1>
                        <p className='text-gray-600 text-lg mb-6'>
                            An initiative by Quick Tech Institute Mirpur Mathelo, Gill Colony, the Sanjha Library is a community-focused project to promote reading and learning. We believe in the power of knowledge and aim to provide a welcoming space for everyone to explore the world of books.
                        </p>
                        <div className='flex flex-col sm:flex-row gap-4 w-full'>
                            <a href="https://www.facebook.com/p/Quick-Tech-Institute-Mirpur-Mathelo-100083100156257/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                                <button className='w-full sm:w-auto bg-[#044E83] text-white font-bold px-8 py-3 rounded-lg'>
                                    Learn More on Facebook (Quick Tech)
                                </button>
                            </a>
                            <a href="https://www.facebook.com/profile.php?id=61583183700228" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                                <button className='w-full sm:w-auto bg-[#1877F2] text-white font-bold px-8 py-3 rounded-lg'>
                                    Library Facebook Page
                                </button>
                            </a>
                        </div>
                    </div>
                    <div className='md:w-1/2'>
                        <div className='w-full flex justify-center'>
                            <Image
                                src="/Sanjh Public Library.jpg"
                                alt="Sanjha Library main"
                                width={IMAGE_WIDTH}
                                height={IMAGE_HEIGHT}
                                className="rounded-lg object-cover w-full h-64 md:h-auto"
                                style={{ objectFit: 'cover', width: '100%', height: '256px' }}
                            />
                        </div>
                    </div>
                </div>
                <div className='mt-20'>
                    <h2 className='text-left text-[#044e83] font-extrabold text-3xl md:text-4xl mb-10'>
                        Library Books Gallery
                    </h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                        {galleryImages.map((image, index) => (
                            <div key={index} className='w-full overflow-hidden rounded-lg'>
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    width={IMAGE_WIDTH}
                                    height={IMAGE_HEIGHT}
                                    className="object-cover w-full h-64 md:h-auto"
                                    style={{ objectFit: 'cover', width: '100%', height: '256px' }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SanjhaLibrary;
