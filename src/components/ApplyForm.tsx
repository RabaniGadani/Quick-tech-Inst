"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Snackbar, Alert } from "@mui/material";
import Link from "next/link";
import { z } from "zod";

const applyFormSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  fatherName: z.string().min(1, "Father's Name is required"),
  email: z.string().email("Enter a valid email address"),
  cnic: z
    .string()
    .min(13, "CNIC or B-Form must be at least 13 characters")
    .max(20, "CNIC or B-Form must be at most 20 characters"),
  phoneNumber: z
    .string()
    .min(10, "Phone Number must be at least 10 digits")
    .max(15, "Phone Number must be at most 15 digits"),
  city: z.string().min(1, "City is required"),
  address: z.string().min(1, "Address is required"),
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
  gender: z.enum(["Male", "Female", "Other"], {
    message: "Please select a gender",
  }),
  qualification: z.enum(["Middle", "Matric", "Intermediate", "Bachelors", "Masters"], {
    message: "Please select the highest qualification",
  }),
  course: z.enum(["DIT", "CIT", "OAT", "Graphic Designing"], {
    message: "Please select a course",
  }),
});

type ApplyFormData = z.infer<typeof applyFormSchema>;
type ApplyFormState = {
  fullName: string;
  fatherName: string;
  email: string;
  cnic: string;
  phoneNumber: string;
  city: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  qualification: string;
  course: string;
};
type ApplyFormErrors = Partial<Record<keyof ApplyFormState, string>>;

const mapToDbPayload = (payload: ApplyFormData) => ({
  fullname: payload.fullName,
  fathername: payload.fatherName,
  email: payload.email,
  cnic: payload.cnic,
  phonenumber: payload.phoneNumber,
  city: payload.city,
  address: payload.address,
  dateofbirth: payload.dateOfBirth,
  gender: payload.gender.toLowerCase(),
  qualification: payload.qualification,
  course: payload.course,
});

const generateRegistrationNumber = () => {
  const now = new Date();
  const datePart = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const randomPart = Math.floor(Math.random() * 90000 + 10000); // 5 digit random number
  return `QTI-${datePart}-${randomPart}`;
};

const ApplyForm = () => {
  const initialFormState: ApplyFormState = {
    fullName: "",
    fatherName: "",
    email: "",
    cnic: "",
    phoneNumber: "",
    city: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    qualification: "",
    course: "",
  };

  const [formData, setFormData] = useState<ApplyFormState>(initialFormState);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "info" | "warning">("success");
  const [formErrors, setFormErrors] = useState<ApplyFormErrors>({});

  const getAriaDescribedBy = (field: keyof ApplyFormState) => (formErrors[field] ? `${field}-error` : undefined);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFormErrors((prevErrors) => {
      if (!prevErrors[name as keyof ApplyFormState]) return prevErrors;
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[name as keyof ApplyFormState];
      return updatedErrors;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const validationResult = applyFormSchema.safeParse(formData);

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      const formattedErrors = Object.entries(fieldErrors).reduce<ApplyFormErrors>((acc, [key, value]) => {
        if (value && value.length > 0) {
          acc[key as keyof ApplyFormData] = value[0];
        }
        return acc;
      }, {});
      setFormErrors(formattedErrors);
      setSnackbarMessage("Please fix the highlighted errors and try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      setLoading(false);
      return;
    }

    const payload = validationResult.data;
    
    // Check if user already exists by CNIC or email
    try {
      const { data: existingUserByCnic, error: cnicError } = await supabase
        .from("admissions")
        .select("cnic, email, registrationnumber")
        .eq("cnic", payload.cnic)
        .maybeSingle();

      const { data: existingUserByEmail, error: emailError } = await supabase
        .from("admissions")
        .select("cnic, email, registrationnumber")
        .eq("email", payload.email)
        .maybeSingle();

      const existingUser = existingUserByCnic || existingUserByEmail;
      const checkError = cnicError || emailError;

      if (checkError && checkError.code !== 'PGRST116') {
        // PGRST116 is "not found" which is fine, but other errors are not
        console.error("Error checking existing user:", checkError);
        setSnackbarMessage("Error checking existing application. Please try again.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
        setLoading(false);
        return;
      }

      if (existingUser) {
        // User already exists, redirect to admit card
        console.log("User already exists:", existingUser);
        setSnackbarMessage("You have already submitted an application. Redirecting to your admit card...");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        // Redirect to admit card with CNIC
        setTimeout(() => {
          router.push(`/AdmitCard?cnic=${encodeURIComponent(payload.cnic)}`);
        }, 2000);
        setLoading(false);
        return;
      }

      // User doesn't exist, proceed with registration
      const registrationNumber = generateRegistrationNumber();
      const registrationDate = new Date().toISOString().split("T")[0];
      const dbPayload = {
        ...mapToDbPayload(payload),
        registrationnumber: registrationNumber,
        dateofregistration: registrationDate,
      };
      console.log("Payload being sent to Supabase:", JSON.stringify(dbPayload, null, 2));
      
      const { data, error } = await supabase.from("admissions").insert([dbPayload]);

      if (error) {
        console.error("Error inserting data:", error);
        setSnackbarMessage(error.message || "Error submitting application. Please try again.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      } else {
        console.log("Data inserted successfully:", data);
        setFormErrors({});
        setFormData({ ...initialFormState });
        setSnackbarMessage("Application submitted successfully!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        const queryString = new URLSearchParams(payload).toString();
        router.push(`/AdmitCard?${queryString}`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "An unexpected error occurred. Please try again.";
      console.error("Unexpected error:", error);
      setSnackbarMessage(message);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8 p-10 bg-white shadow-lg rounded-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#044e83]">
            Admission Form
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please fill out the form below to apply for admission.
          </p>
          <p className="mt-2 text-center text-sm text-gray-600">
            If you have already submitted an application, <Link href="/AdmitCard" className="text-indigo-600 hover:text-indigo-500">Download Admit Card</Link>.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="fullName" className="sr-only">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Full Name *"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={loading}
                  aria-invalid={Boolean(formErrors.fullName)}
                  aria-describedby={getAriaDescribedBy("fullName")}
                />
                {formErrors.fullName && (
                  <p className="mt-1 text-xs text-red-600" id="fullName-error">
                    {formErrors.fullName}
                  </p>
                )}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="fatherName" className="sr-only">
                  Father&apos;s Name
                </label>
                <input
                  id="fatherName"
                  name="fatherName"
                  type="text"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Father's Name *"
                  value={formData.fatherName}
                  onChange={handleChange}
                  disabled={loading}
                  aria-invalid={Boolean(formErrors.fatherName)}
                  aria-describedby={getAriaDescribedBy("fatherName")}
                />
                {formErrors.fatherName && (
                  <p className="mt-1 text-xs text-red-600" id="fatherName-error">
                    {formErrors.fatherName}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address *"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  aria-invalid={Boolean(formErrors.email)}
                  aria-describedby={getAriaDescribedBy("email")}
                />
                {formErrors.email && (
                  <p className="mt-1 text-xs text-red-600" id="email-error">
                    {formErrors.email}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="cnic" className="sr-only">
                  CNIC Or B-Form Number
                </label>
                <input
                  id="cnic"
                  name="cnic"
                  type="text"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="CNIC or B-Form Number *"
                  value={formData.cnic}
                  onChange={handleChange}
                  disabled={loading}
                  aria-invalid={Boolean(formErrors.cnic)}
                  aria-describedby={getAriaDescribedBy("cnic")}
                />
                {formErrors.cnic && (
                  <p className="mt-1 text-xs text-red-600" id="cnic-error">
                    {formErrors.cnic}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="phoneNumber" className="sr-only">
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Phone Number *"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  disabled={loading}
                  aria-invalid={Boolean(formErrors.phoneNumber)}
                  aria-describedby={getAriaDescribedBy("phoneNumber")}
                />
                {formErrors.phoneNumber && (
                  <p className="mt-1 text-xs text-red-600" id="phoneNumber-error">
                    {formErrors.phoneNumber}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="city" className="sr-only">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="City *"
                  value={formData.city}
                  onChange={handleChange}
                  disabled={loading}
                  aria-invalid={Boolean(formErrors.city)}
                  aria-describedby={getAriaDescribedBy("city")}
                />
                {formErrors.city && (
                  <p className="mt-1 text-xs text-red-600" id="city-error">
                    {formErrors.city}
                  </p>
                )}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="address" className="sr-only">
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Address *"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={loading}
                  aria-invalid={Boolean(formErrors.address)}
                  aria-describedby={getAriaDescribedBy("address")}
                />
                {formErrors.address && (
                  <p className="mt-1 text-xs text-red-600" id="address-error">
                    {formErrors.address}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="dateOfBirth" className="sr-only">
                  Date of Birth
                </label>
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Date of Birth *"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  disabled={loading}
                  aria-invalid={Boolean(formErrors.dateOfBirth)}
                  aria-describedby={getAriaDescribedBy("dateOfBirth")}
                />
                {formErrors.dateOfBirth && (
                  <p className="mt-1 text-xs text-red-600" id="dateOfBirth-error">
                    {formErrors.dateOfBirth}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="gender" className="sr-only">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={formData.gender}
                  onChange={handleChange}
                  disabled={loading}
                  aria-invalid={Boolean(formErrors.gender)}
                  aria-describedby={getAriaDescribedBy("gender")}
                >
                  <option value="">Select Gender *</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {formErrors.gender && (
                  <p className="mt-1 text-xs text-red-600" id="gender-error">
                    {formErrors.gender}
                  </p>
                )}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="qualification" className="sr-only">
                  Highest Qualification
                </label>
                <select
                  id="qualification"
                  name="qualification"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={formData.qualification}
                  onChange={handleChange}
                  disabled={loading}
                  aria-invalid={Boolean(formErrors.qualification)}
                  aria-describedby={getAriaDescribedBy("qualification")}
                >
                  <option value="">Select Highest Qualification *</option>
                  <option value="Middle">Middle</option>
                  <option value="Matric">Matric</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Bachelors">Bachelors</option>
                  <option value="Masters">Masters</option>
                </select>
                {formErrors.qualification && (
                  <p className="mt-1 text-xs text-red-600" id="qualification-error">
                    {formErrors.qualification}
                  </p>
                )}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="course" className="sr-only">
                  Course
                </label>
                <select
                  id="course"
                  name="course"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={formData.course}
                  onChange={handleChange}
                  disabled={loading}
                  aria-invalid={Boolean(formErrors.course)}
                  aria-describedby={getAriaDescribedBy("course")}
                >
                  <option value="">Select Course *</option>
                  <option value="DIT">DIT</option>
                  <option value="CIT">CIT</option>
                  <option value="OAT">OAT</option>
                  <option value="Graphic Designing">Graphic Designing</option>
                </select>
                {formErrors.course && (
                  <p className="mt-1 text-xs text-red-600" id="course-error">
                    {formErrors.course}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#044e83] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ApplyForm;
