import React from 'react';
import Link from 'next/link';
import { compulsoryDetailedData, CourseWithSemesters, CourseWithoutSemesters } from '@/components/data/main/compulsoryDetailed';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Assuming these exist

const CompulsoryCoursesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-[#044e83]">Our Compulsory Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(compulsoryDetailedData).map(([id, course]) => (
          <Link href={`/compulsory/${id}`} key={id}>
            <Card className="h-full flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-800">{course.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Duration: {course.duration}</span>
                  <span>
                    {'semesters' in course
                      ? `Semesters: ${(course as CourseWithSemesters).semesters.length}`
                      : `Courses: ${(course as CourseWithoutSemesters).courses.length}`
                    }
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CompulsoryCoursesPage;
