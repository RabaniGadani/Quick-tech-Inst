"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';

// Define the type for the result object (now includes status)
interface TestResult {
  registration_number: string;
  cnic: string;
  total_marks: number;
  obtained_marks: number;
  test_type?: string;
  status?: string; // status field added
}

function ResultPage() {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [cnic, setCnic] = useState('');
  const [result, setResult] = useState<TestResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetResult = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);

    if (!registrationNumber || !cnic) {
      setError('Please enter both Registration Number and CNIC.');
      setLoading(false);
      return;
    }

    try {
      const { data, error: dbError } = await supabase
        .from('Entery_Test_Result')
        .select('registration_number,cnic,total_marks,obtained_marks,test_type,status') // add status in select
        .eq('registration_number', registrationNumber)
        .eq('cnic', cnic)
        .single();

      if (dbError) {
        if (dbError.code === 'PGRST116') {
          setError('No result found with the provided details. Please check your Registration Number and CNIC.');
        } else {
          throw dbError;
        }
      }

      if (data) {
        setResult(data as TestResult);
      }
    } catch (err: unknown) {
      console.error('Error fetching result:', err);
      let message = 'An unexpected error occurred. Please try again later.';
      if (err instanceof Error) {
        message = err.message;
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Determine status color
  function getStatusColor(status?: string) {
    if (!status) return "text-gray-800";
    // Check if it is *case-insensitive* "fail"
    if (status.trim().toLowerCase() === "fail") return "text-red-600 font-bold";
    return "text-green-600 font-bold";
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-center text-4xl text-[#044e83] font-extrabold mb-10">Grand Entrance Exam Result</h1>
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleGetResult} className="space-y-6">
            <div>
              <label htmlFor="registrationNumber" className="text-lg font-semibold text-gray-700">Registration Number*</label>
              <input
                id="registrationNumber"
                type="text"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your registration number"
                required
              />
            </div>
            <div>
              <label htmlFor="cnic" className="text-lg font-semibold text-gray-700">CNIC or B-Form Number*</label>
              <input
                id="cnic"
                type="text"
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your CNIC or B-Form number"
                required
              />
            </div>
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="bg-blue-600 text-white font-bold py-3 px-10 rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
                disabled={loading}
              >
                {loading ? 'Searching...' : 'GET RESULT'}
              </button>
            </div>
          </form>
        </div>

        {error && (
          <div className="max-w-md mx-auto mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {result && (
          <div className="max-w-md mx-auto mt-10 bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">Your Result</h2>
            <div className="space-y-4 text-lg">
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-600">Registration Number:</span>
                <span className="font-medium text-gray-800">{result.registration_number}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-600">CNIC:</span>
                <span className="font-medium text-gray-800">{result.cnic}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-600">Test Type:</span>
                <span className="font-medium text-gray-800">{result.test_type || 'N/A'}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-600">Total Marks:</span>
                <span className="font-medium text-gray-800">{result.total_marks}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-600">Obtained Marks:</span>
                <span className="font-bold text-2xl text-blue-600">{result.obtained_marks}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-600">Status:</span>
                <span className={`font-medium ${getStatusColor(result.status)}`}>{result.status || 'N/A'}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultPage;