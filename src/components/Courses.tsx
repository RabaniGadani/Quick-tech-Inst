import Image from "next/image";

// You can update these objects as needed; example with 4 courses
const courseList = [
  {
    id: 1,
    title: "DIT",
    image: "/course1.jpg",
    description: "Diploma in Information Technology - This foundational course covers computer basics, software applications, networking, programming fundamentals, and prepares students for entry-level IT roles or further specialized study."
  },
  {
    id: 2,
    title: "CIT",
    image: "/course2.jpg",
    description: "Certificate in Information Technology - Gain essential skills in computer operations, Microsoft Office, internet use, and introductory programming, ideal for beginners looking to start a career in IT or enhance digital proficiency."
  },
  {
    id: 3,
    title: "OAT",
    image: "/course3.jpg",
    description: "Office Automation Tools - Master essential office software including word processing, spreadsheets, presentations, and basic computer skills for productivity in modern workplaces."
  },
  {
    id: 4,
    title: "Graphic Design",
    image: "/course4.jpg",
    description: "Learn the fundamentals of graphic design, including branding, digital art, and visual communication using industry-standard tools."
  },
];

const Courses = () => {
    return (
        <section className='mt-24 relative mb-20'>
            <div className='max-w-7xl mx-auto'>
                <h2 className='text-[#044E83] text-4xl font-bold mb-10 text-left'>Core Courses Sequence</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                    {courseList.map((course) => (
                        <div
                            key={course.id}
                            className="flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden hover:scale-[1.025] hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="relative h-56 w-full bg-[#eaeaea] flex items-center justify-center">
                                <Image
                                    src={course.image}
                                    alt={course.title}
                                    fill
                                    style={{ objectFit: "cover" }}
                                    className="w-full h-full"
                                />
                            </div>
                            <div className="flex flex-col flex-1 justify-between p-7">
                                <div>
                                    <h3 className="text-2xl font-bold text-[#044E83] mb-3">{course.title}</h3>
                                    <p className="text-gray-600 text-base leading-relaxed">{course.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Courses;
