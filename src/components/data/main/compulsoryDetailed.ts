
interface Semester {
    title: string;
    courses: string[];
}

export interface CourseWithSemesters {
    title: string;
    duration: string;
    semesters: Semester[];
    description: string;
}

export interface CourseWithoutSemesters {
    title: string;
    duration: string;
    courses: string[];
    description: string;
}

type CompulsoryCourse = CourseWithSemesters | CourseWithoutSemesters;

interface CompulsoryDetailedData {
    [key: string]: CompulsoryCourse;
}

export const compulsoryDetailedData: CompulsoryDetailedData = {
    dit: {
        title: "Diploma in Information Technology (DIT)",
        duration: "1 Year",
        semesters: [
            {
                title: "Semester 1",
                courses: [
                    "Introduction to Information Technology",
                    "Office Automation",
                    "Computer Hardware",
                    "Operating System",
                    "Web Designing & Publishing",
                ],
            },
            {
                title: "Semester 2",
                courses: [
                    "Programming in C",
                    "Object Oriented Programming with C++",
                    "Relational Database Management System",
                    "Graphic Designing",
                    "E-Commerce",
                ],
            },
        ],
        description:
            "The Diploma in Information Technology (DIT) is a one-year program accredited by the Sindh Board of Technical Education (SBTE). It is designed to provide students with a solid foundation in the field of Information Technology. The program is divided into two semesters and covers a wide range of subjects, from the basics of computer hardware and software to programming and web development.",
    },
    cit: {
        title: "Certificate in Information Technology (CIT)",
        duration: "6 Months",
        courses: [
            "Computer Fundamentals & Operating System",
            "MS Office (Word, Excel, PowerPoint)",
            "Urdu Composing",
            "Internet & E-mailing",
        ],
        description:
            "The Certificate in Information Technology (CIT) is a short-term program designed to equip students with the essential skills required to work in an office environment. The program covers the basics of computer hardware and software, as well as popular office automation tools.",
    },
    aot: {
        title: "Automation in Information Technology (AOT)",
        duration: "3 Months",
        courses: [
            "Introduction to IT Automation",
            "Programming and Scripting Languages (Python)",
            "Version Control (Git and GitHub)",
            "Configuration Management (Ansible)",
            "Cloud Management",
            "Troubleshooting and Debugging",
        ],
        description:
            "The Automation in Information Technology (AOT) course focuses on equipping individuals with the skills and knowledge to use software and tools to automate repetitive and manual IT tasks. This field aims to enhance efficiency, reduce human error, and allow IT professionals to concentrate on more strategic initiatives.",
    },
    gd: {
        title: "Graphic Designing",
        duration: "6 Months",
        courses: [
            "Adobe Photoshop",
            "Adobe Illustrator",
            "CorelDRAW",
            "InPage",
            "FreeHand",
        ],
        description:
            "The Graphic Designing course provides students with the skills and knowledge to create visual content to communicate messages. The course covers the use of industry-standard software such as Adobe Photoshop, Adobe Illustrator, and CorelDRAW.",
    },
};

