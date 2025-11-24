
import { compulsoryDetailedData, CourseWithSemesters, CourseWithoutSemesters } from "@/components/data/main/compulsoryDetailed";
import { notFound } from "next/navigation";

type CourseID = keyof typeof compulsoryDetailedData;

export default function CompulsoryCoursePage({ params }: { params: { id: string } }) {
  const courseId = params.id as CourseID;
  const course = compulsoryDetailedData[courseId];

  if (!course) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
      <p className="text-lg mb-4"><strong>Duration:</strong> {course.duration}</p>
      <p className="text-lg mb-4">{course.description}</p>
      
      <h2 className="text-2xl font-bold mb-2">Courses</h2>
      {'semesters' in course ? (
        (course as CourseWithSemesters).semesters.map((semester, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-bold mb-2">{semester.title}</h3>
            <ul className="list-disc list-inside">
              {semester.courses.map((courseName, i) => (
                <li key={i} className="text-lg">{courseName}</li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <ul className="list-disc list-inside">
          {(course as CourseWithoutSemesters).courses.map((courseName, i) => (
            <li key={i} className="text-lg">{courseName}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
