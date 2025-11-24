import React from 'react';
import Image from 'next/image';
import { FaFacebookF, FaYoutube, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import Link from 'next/link';

export interface AdmitCardProps {
  formData: {
    fullName: string;
    fatherName: string;
    cnic: string;
    course: string;
    phoneNumber: string;
    studentRegNumber?: string;
    dateOfRegistration?: string;
    venue?: string;
  };
  examYear?: string;
  contactEmail?: string;
}

const AdmitCard: React.FC<AdmitCardProps> = ({
  formData,
  contactEmail = "education@quicktech.com"
}) => {
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            .social-icons-container {
              display: flex !important;
              justify-content: center !important;
              margin-bottom: 1rem !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
            .social-icon {
              display: inline-block !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
            .social-icon svg {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
            .social-icon * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
          }
        `
      }} />
      <div className="max-w-2xl mx-auto my-8 p-8 bg-white border-2 border-black">
      <div className="relative mb-8">
        <div className="absolute left-0 top-0">
          <Image src="/Logo.jpg" alt="logo" width={100} height={100} />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-blue-600">
            Quick Tech Institute of<br />Information Technology
          </h1>
          <p className="text-lg font-semibold mt-2">Entry Test Admit Card</p>
        </div>
      </div>
      <div className="flex justify-between items-start">
        <div className="text-lg space-y-2 flex-1">
          <p><strong>Student Name:</strong> {formData.fullName}</p>
          <p><strong>Father&apos;s Name:</strong> {formData.fatherName}</p>
          <p><strong>Student CNIC:</strong> {formData.cnic}</p>
          <p><strong>Student Reg Number:</strong> {formData.studentRegNumber || 'N/A'}</p>
          <p><strong>Date of Registration:</strong> {formData.dateOfRegistration || 'N/A'}</p>
          <p><strong>Venue:</strong> {formData.venue || 'Quick Tech Institute of IT MPM'}</p>
        </div>
        <div className="w-32 h-40 border-2 border-dashed border-gray-400 flex items-center justify-center ml-4">
          <p className="text-gray-400">Paste Photo Here</p>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="font-bold mb-2">Instructions:</h3>
        <ul className="list-disc list-inside">
          
          <li>Please bring this admit card to the examination hall.</li>
          <li>You must carry your original CNIC or B-Form.</li>
          <li>Mobile phones and electronic devices are not allowed.</li>
        </ul>
      </div>
      <div className="mt-8 pt-8 border-t-2 border-black text-center print:block">
        <div className='social-icons-container flex justify-center space-x-4 mb-4'>
          <Link href="https://www.facebook.com/profile.php?id=100085183854087" className='social-icon print:inline-block'><FaFacebookF className='text-white bg-blue-800 w-8 h-8 rounded-full p-2' /></Link>
          <Link href="https://youtube.com/@sanaullahshaikh6449?si=gqQg2mup8KiA1mDl" className='social-icon print:inline-block'><FaYoutube className='text-white bg-red-600 w-8 h-8 rounded-full p-2' /></Link>
          <Link href="https://www.tiktok.com/@quicktech.institu?_r=1&_t=ZS-91RvvUe8AqI" className='social-icon print:inline-block'><FaTiktok className='text-white bg-black w-8 h-8 rounded-full p-2' /></Link>
          <Link href="https://wa.me/923003657852" className='social-icon print:inline-block'><FaWhatsapp className='text-white bg-green-500 w-8 h-8 rounded-full p-2' /></Link>
        </div>
        <div className='print:block'>
          <a href={`mailto:${contactEmail}`} target='_blank' className='text-blue-800 underline flex items-center justify-center gap-2 print:inline-flex' rel="noopener noreferrer">
            <AiOutlineMail className='text-xl' />
            {contactEmail}
          </a>
        </div>
      </div>
    </div>
    </>
  );
};

export default AdmitCard;
