import Image from "next/image";
import { teachersData } from "./data/main/teachers";

const Teachers = () => {
    return (
        <section className='mt-24 relative mb-20'>
            <div className='max-w-[90%] mx-auto'>
                <h2 className='text-[#044E83] text-4xl font-bold mb-10 text-center'>Our Instructors</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                    {teachersData.map((teacher, index) => (
                        <div key={index} className="group bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                            <div className="relative w-full h-64">
                                <Image
                                    src={teacher.picture}
                                    alt={teacher.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-4 text-center">
                                <h3 className="text-xl font-bold text-gray-800">{teacher.name}</h3>
                                <p className="text-md text-gray-600 mt-1">{teacher.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Teachers;
