import { useEffect, useState } from "react";
import API from "../api/axios";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function StudentDashboard({ activeTab = "dashboard" }) {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [courseRes, enrollRes] = await Promise.all([
        API.get("/courses/"),
        API.get("/enrollments/"),
      ]);

      setCourses(courseRes.data);
      setEnrollments(enrollRes.data);
    } catch (err) {
      console.log("LOAD ERROR:", err.response?.data || err.message);
    }
  };

  const enroll = async (courseId) => {
    try {
      const res = await API.post("/enrollments/", {
        course: courseId,
      });

      setEnrollments((prev) => [...prev, res.data]);

      alert("Enrolled successfully");
    } catch (err) {
      console.log("ENROLL ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.detail || "Enrollment failed");
    }
  };

  const unenroll = async (courseId) => {
    try {
      const enrollment = enrollments.find(
        (e) => e.course === courseId
      );

      if (!enrollment) return;

      await API.delete(`/enrollments/${enrollment.id}/`);

      setEnrollments((prev) =>
        prev.filter((e) => e.id !== enrollment.id)
      );

      alert("Unenrolled successfully");
    } catch (err) {
      console.log("UNENROLL ERROR:", err.response?.data);
      alert("Failed to unenroll");
    }
  };

  const isEnrolled = (courseId) => {
    return enrollments.some((e) => e.course === courseId);
  };

  if (activeTab === "dashboard") {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-2">
          🎓 Welcome to Student Portal
        </h1>
        <p className="text-gray-400">
          Browse courses or manage your enrollments
        </p>
      </div>
    );
  }

  if (activeTab === "courses") {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">
          📘 Available Courses
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((c) => (
            <Card key={c.id} className="bg-[#212128] text-white">
              <CardHeader>
                <CardTitle>{c.title}</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-gray-400 mb-2">
                  {c.description}
                </p>

                <p className="text-sm mb-4">
                  👨‍🏫 {c.teacher_name}
                </p>

                {isEnrolled(c.id) ? (
                  <Button
                    onClick={() => unenroll(c.id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Unenroll
                  </Button>
                ) : (
                  <Button
                    onClick={() => enroll(c.id)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Enroll
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === "enrollments") {
    const enrolledCourses = courses.filter((c) =>
      isEnrolled(c.id)
    );

    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">
          📚 My Enrollments
        </h1>

        {enrolledCourses.length === 0 ? (
          <p className="text-gray-400">No enrollments yet</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((c) => (
              <Card key={c.id} className="bg-[#212128] text-white">
                <CardHeader>
                  <CardTitle>{c.title}</CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-gray-400 mb-3">
                    {c.description}
                  </p>

                  <Button
                    onClick={() => unenroll(c.id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Remove Enrollment
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }

  return null;
}

export default StudentDashboard;
