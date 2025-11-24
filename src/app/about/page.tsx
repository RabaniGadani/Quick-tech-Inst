'use client';
import React from 'react';
import Image from 'next/image';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-[#044e83] mb-8">About Quick Tech Institute of Information Technology</h1>

      <div className="flex flex-col md:flex-row items-center md:space-x-8 mb-12">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <Image
            src="/Logo.jpg" // Assuming you have a logo in your public folder
            alt="Quick Tech Logo"
            width={500}
            height={300}
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
        </div>
        <div className="md:w-1/2">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Quick Tech Institute of Information Technology, also known as Quick Tech Computer College or Quick-Tech College, is an institution focused on developing ICT skills in young people. We are dedicated to providing quality, accessible, and holistic education through innovative teaching, research, and community engagement, fostering integrity, diversity, and lifelong learning.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our programs are designed to prepare students for the tech industry, covering essential areas such as Web Development (HTML, CSS, and JavaScript), Programming Languages (like Python), and Computer Packages (including essential software tools like Microsoft Office). We emphasize personalized support and aim to equip our learners to enter the market offering valuable ICT services.
          </p>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center text-[#044e83] mb-6">Our Mission</h2>
        <p className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
          Our mission is to empower individuals with the knowledge and practical skills needed to excel in the rapidly evolving field of Information Technology. We strive to create a learning environment that fosters innovation, critical thinking, and a passion for technology, ensuring our graduates are well-prepared for the challenges and opportunities of the digital age.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-[#044e83] mb-3">Hands-on Experience</h3>
          <p className="text-gray-700">
            We provide hands-on experience with the latest technologies, ensuring our students gain practical skills that are directly applicable in the industry.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-[#044e83] mb-3">Expert Instructors</h3>
          <p className="text-gray-700">
            Learn from experienced professionals who are passionate about teaching and dedicated to your success.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-[#044e83] mb-3">Career Readiness</h3>
          <p className="text-gray-700">
            Our programs are tailored to equip you with the skills and confidence to secure rewarding careers in the IT sector.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
