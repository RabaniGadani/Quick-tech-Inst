"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import AdmitCard from '@/components/AdmitCard';
import { supabase } from '@/lib/supabase';
import LoadingPage from '@/components/LoadingPage';

interface AdmitCardData {
  fullname?: string;
  fullName?: string;
  fathername?: string;
  fatherName?: string;
  cnic?: string;
  course?: string;
  phonenumber?: string;
  phoneNumber?: string;
  registrationnumber?: string;
  studentregnumber?: string;
  studentRegNumber?: string;
  dateofregistration?: string;
  dateOfRegistration?: string;
  venue?: string;
}

const AdmitCardPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [admitCardData, setAdmitCardData] = useState<AdmitCardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cnicInput, setCnicInput] = useState('');

  const fetchAdmitCardByCnic = useCallback(async (cnic: string) => {
    setLoading(true);
    setError(null);

    if (!cnic || cnic.trim() === '') {
      setError('Please enter a CNIC number.');
      setLoading(false);
      return;
    }

    const { data, error: fetchError } = await supabase
      .from('admissions')
      .select('*')
      .eq('cnic', cnic.trim())
      .single();

    if (fetchError) {
      console.error('Error fetching admit card:', fetchError);
      setError('Not found. Please check your CNIC and try again.');
      setAdmitCardData(null);
    } else if (data) {
      setAdmitCardData(data);
      setError(null);
      // Update URL with CNIC parameter
      router.replace(`/AdmitCard?cnic=${encodeURIComponent(cnic.trim())}`);
    } else {
      setError('No admit card found for the provided CNIC.');
      setAdmitCardData(null);
    }
    setLoading(false);
  }, [router]);

  useEffect(() => {
    const cnic = searchParams.get('cnic');

    if (cnic) {
      fetchAdmitCardByCnic(cnic);
    } else {
      setLoading(false);
      setError(null);
    }
  }, [searchParams, fetchAdmitCardByCnic]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAdmitCardByCnic(cnicInput);
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return <LoadingPage />;
  }

  // Show search form if no CNIC in URL or no data found
  if (!admitCardData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-6 text-[#044e83]">
            Search Admit Card
          </h2>
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label htmlFor="cnic" className="block text-sm font-medium text-gray-700 mb-2">
                Enter CNIC or B-Form Number
              </label>
              <input
                id="cnic"
                type="text"
                value={cnicInput}
                onChange={(e) => setCnicInput(e.target.value)}
                placeholder="Enter your CNIC or B-Form number"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#044e83] focus:border-transparent"
                required
              />
            </div>
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-[#044e83] text-white font-bold py-3 px-4 rounded-md hover:bg-[#033a5e] transition duration-300"
            >
              Search Admit Card
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Map fetched data to formData structure expected by AdmitCard component
  // Database uses snake_case, so we need to map correctly
  const formData = {
    fullName: admitCardData.fullname || admitCardData.fullName || '',
    fatherName: admitCardData.fathername || admitCardData.fatherName || '',
    cnic: admitCardData.cnic || '',
    course: admitCardData.course || '',
    phoneNumber: admitCardData.phonenumber || admitCardData.phoneNumber || '',
    studentRegNumber: admitCardData.registrationnumber || admitCardData.studentregnumber || admitCardData.studentRegNumber,
    dateOfRegistration: admitCardData.dateofregistration || admitCardData.dateOfRegistration,
    venue: admitCardData.venue,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <AdmitCard formData={formData} />
      <div className="text-center mt-8 print:hidden">
        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white font-bold py-3 px-10 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Print Admit Card
        </button>
      </div>
    </div>
  );
};

export default AdmitCardPage;
