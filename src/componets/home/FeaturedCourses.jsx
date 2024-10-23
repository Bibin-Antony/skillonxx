import React from "react";
import {
  Users,
  Calendar,
  ArrowRight,
  Clock,
  BookOpen,
  Trophy,
  Tag,
} from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Full-Stack Web Development Bootcamp",
    description:
      "Master modern web development with MERN stack and cloud technologies",
    startDate: "2024-11-01",
    maxStudents: 50,
    enrolledStudents: 38,
    status: "Filling Fast",
    price: "$999",
    duration: "12 weeks",
    image: "/api/placeholder/300/200?text=Web+Dev+Bootcamp",
    highlights: ["Live Projects", "Industry Mentors", "Job Assistance"],
  },
  {
    id: 2,
    title: "Data Science and Machine Learning",
    description:
      "Dive deep into data analysis, ML algorithms, and AI applications",
    startDate: "2024-10-25",
    maxStudents: 40,
    enrolledStudents: 35,
    status: "Almost Full",
    price: "$1199",
    duration: "16 weeks",
    image: "/api/placeholder/300/200?text=Data+Science+Course",
    highlights: ["Real Datasets", "ML Projects", "Industry Tools"],
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass",
    description: "Create stunning user interfaces and seamless experiences",
    startDate: "2024-11-15",
    maxStudents: 45,
    enrolledStudents: 12,
    status: "Open for Enrollment",
    price: "$799",
    duration: "8 weeks",
    image: "/api/placeholder/300/200?text=UI/UX+Design+Course",
    highlights: ["Design Portfolio", "UX Research", "Client Projects"],
  },
];

const FeaturedCourses = () => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getEnrollmentStatus = (enrolled, max) => {
    const percentageFilled = (enrolled / max) * 100;
    return {
      width: `${percentageFilled}%`,
      color:
        percentageFilled > 80
          ? "bg-gradient-to-r from-red-500 to-red-600"
          : percentageFilled > 50
          ? "bg-gradient-to-r from-yellow-500 to-yellow-600"
          : "bg-gradient-to-r from-green-500 to-green-600",
    };
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pattern-grid opacity-5"></div>
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b "></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t "></div>

      {/* Blob elements */}
      {/* <div className="absolute top-20 left-20 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-20 right-20 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-80 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-0 left-10 w-40 h-40 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Featured Courses
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Transform your career with our industry-aligned courses. Learn from
            experts and build real-world projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => {
            const enrollmentStatus = getEnrollmentStatus(
              course.enrolledStudents,
              course.maxStudents
            );

            return (
              <div
                key={course.id}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden border border-gray-100"
              >
                {/* Course Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-semibold text-blue-600 shadow-lg">
                      {course.status}
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-white">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <Tag className="w-4 h-4" />
                      <span className="text-sm">{course.price}</span>
                    </div>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="font-bold text-xl mb-2 text-gray-800 line-clamp-2">
                    {course.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Course Highlights */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.highlights.map((highlight, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                      <span>Starts {formatDate(course.startDate)}</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-gray-600">
                        <span className="flex items-center">
                          <Users className="w-5 h-5 mr-2 text-blue-600" />
                          <span className="text-sm">
                            {course.enrolledStudents} / {course.maxStudents}{" "}
                            enrolled
                          </span>
                        </span>
                        <span className="text-sm font-medium text-blue-600">
                          {Math.round(
                            (course.enrolledStudents / course.maxStudents) * 100
                          )}
                          % filled
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${enrollmentStatus.color}`}
                          style={{
                            width: enrollmentStatus.width,
                            transition: "width 1s ease-in-out",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <button className="mt-auto w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition duration-300 flex items-center justify-center group">
                    <span>Enroll Now</span>
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <button className="group relative px-8 py-4 rounded-xl text-lg font-semibold">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur group-hover:blur-lg transition-all duration-300"></div>
            <span className="relative flex items-center justify-center gap-2 text-white">
              Explore All Courses
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
        </div>
      </div>

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-blob {
          animation: blob 8s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default FeaturedCourses;
