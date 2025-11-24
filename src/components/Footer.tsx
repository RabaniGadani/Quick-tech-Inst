import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaYoutube, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { compulsoryData } from './data/main/compulsory';

function Footer() {
  return (
    <div>
      <footer className='bg-gray-100 py-8 px-6 md:px-20 text-gray-600 mt-5 print:hidden'>
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div>
            <h3 className='text-xl font-bold mb-4 text-black'>Core Courses</h3>
            <ul className='space-y-2 md:space-y-5 text-lg'>
              {compulsoryData.map((course) => (
                <Link href={`/compulsory/${course.id}`} key={course.id}>
                  <li className='py-1'>{course.text}</li>
                </Link>
              ))}
            </ul>
          </div>
          <div>
            <h3 className='text-xl font-bold mb-4 text-gray-800'>Advanced Courses</h3>
            <ul className='space-y-2 md:space-y-6 text-lg'>
            </ul>
          </div>
          <div>
            <h3 className='text-xl font-bold mb-6 text-gray-800'>Social Links</h3>
            <div className='flex space-x-4 mb-4'>
              <Link href="https://www.facebook.com/profile.php?id=100085183854087"><FaFacebookF className='text-white bg-blue-800 w-8 h-8 rounded-full p-2' /></Link>
            
              <Link href="https://youtube.com/@sanaullahshaikh6449?si=gqQg2mup8KiA1mDl"><FaYoutube className='text-white bg-red-600 w-8 h-8 rounded-full p-2' /></Link>

              <Link href="https://www.tiktok.com/@quicktech.institu?_r=1&_t=ZS-91RvvUe8AqI"><FaTiktok className='text-white bg-black w-8 h-8 rounded-full p-2' /></Link>
              <Link href="https://wa.me/923003657852"><FaWhatsapp className='text-white bg-green-500 w-8 h-8 rounded-full p-2' /></Link>
            </div>
            <div>
              <a href="mailto:education@governorsindh.com" target='_blank' className='text-blue-800 underline flex items-center gap-2'>
                <AiOutlineMail className='text-xl' />
                education@quicktech.com
              </a>
            </div>
          </div>
        </div>
        <div className='text-center mt-8 text-sm text-gray-500'>
          Powered by MUHAMMAD ESSA GADANI
        </div>
      </footer>
    </div>
  );
}

export default Footer;
