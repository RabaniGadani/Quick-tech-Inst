import React from 'react';
import Image from 'next/image';

function About() {
  return (
    <section className='relative mt-20'>
      <div className='max-w-[90%] mx-auto'>
        <div>
          <h1 className='text-center text-[#044e83] font-extrabold text-xl sm:text-2xl md:text-3xl xl:text-4xl leading-tight md:leading-snug md:w-[95%] mx-auto'>
          The Future is Here: Information Technology
          </h1>
          <p className='mt-6 mb-8 text-justify text-zinc-800 text-sm sm:text-base md:text-lg sm:tracking-wider tracking-normal'>
          Information Technology (IT) is the backbone of the modern world. From the smartphones in our pockets to the complex systems that power global finance, IT is everywhere. At our institute, we are dedicated to preparing the next generation of IT professionals with the skills and knowledge to thrive in this dynamic field. Our programs are designed to provide hands-on experience with the latest technologies, ensuring that our graduates are ready to tackle the challenges of tomorrow.
          </p>
        </div>
        <div className='flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 items-center mt-8 mb-10'>
          <Image src='/course1.jpg' alt='IT Course' width={480} height={300} className="rounded-lg shadow-2xl shadow-black object-cover w-full md:w-1/3 h-[300px]" />
          <Image src="/image1.jpg"  alt='IT Course' width={450} height={300} className="rounded-lg shadow-2xl shadow-black object-cover w-full md:w-1/3 h-[300px]" />
          <Image src='/course3.jpg' alt='IT Course' width={450} height={300} className="rounded-lg shadow-2xl shadow-black object-cover w-full md:w-1/3 h-[300px]" />
        </div>
      </div>
    </section>
  );
}

export default About;
