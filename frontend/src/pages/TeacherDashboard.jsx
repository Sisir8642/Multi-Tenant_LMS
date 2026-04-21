import { useEffect, useState } from "react";
import API from "../api/axios";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function TeacherDashboard({ showStudents = false }) {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [showForm, setShowForm] = useState(false); 

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses/");
      setCourses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const createCourse = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Title and description are required");
      return;
    }

    try {
      await API.post("/courses/", {
        title,
        description,
      });

      setTitle("");
      setDescription("");
      setShowForm(false); 
      fetchCourses();
    } catch (err) {
      console.log("CREATE ERROR:", err.response?.data);
      alert(JSON.stringify(err.response?.data));
    }
  };

  if (showStudents) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">
          👥 Enrolled Students
        </h1>

        <div className="space-y-6">
          {courses.map((c) => (
            <div key={c.id} className="bg-[#212128] p-4 rounded">
              <h2 className="font-bold mb-2">{c.title}</h2>

              {c.enrolled_students?.length > 0 ? (
                <ul className="text-sm text-gray-300">
                  {c.enrolled_students.map((s) => (
                    <li key={s.id}>• {s.username}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">
                  No students enrolled
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">
        👨‍🏫 Welcome to Teacher Portal
      </h1>

      <p className="text-gray-400 mb-6">
        Create and manage your courses
      </p>

      <Button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Create Course"}
      </Button>

      {showForm && (
        <form onSubmit={createCourse} className="mt-4 mb-6 space-y-2">
          <input
  className="p-2 w-full bg-[#2a2a35] text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Course title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
  className="p-2 w-full bg-[#2a2a35] text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button type="submit" className="border-2 bg-green-800 cursor-pointer">Submit</Button>
        </form>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((c) => (
          <Card key={c.id} className="bg-[#212128]">
            <CardHeader>
              <CardTitle>{c.title}</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-gray-400 mb-3">
                {c.description}
              </p>

              <div>
                <p className="text-sm font-semibold mb-2">
                  👥 Enrolled Students:
                </p>

                {c.enrolled_students?.length > 0 ? (
                  <ul className="text-sm text-gray-300">
                    {c.enrolled_students.map((s) => (
                      <li key={s.id}>• {s.username}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-sm">
                    No students enrolled yet
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default TeacherDashboard;
