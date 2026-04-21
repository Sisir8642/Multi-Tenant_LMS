import { useEffect, useState } from "react";
import API from "../api/axios";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    API.get("/courses/")
      .then((res) => setCourses(res.data))
      .catch(() => setError("Unauthorized or failed to load courses"));
  }, []);

  return (
    <div className="min-h-screen bg-[#151519] text-white p-6">

      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Error */}
      {error && (
        <p className="text-red-500 text-center mb-4">{error}</p>
      )}

      {/* Courses Section */}
      <div>
        <h2 className="text-xl mb-4">Your Courses</h2>

        {courses.length === 0 ? (
          <p className="text-gray-400">No courses available</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {courses.map((c) => (
              <Card key={c.id} className="bg-[#212128] hover:shadow-lg transition">

                <CardHeader>
                  <CardTitle className="text-lg">{c.title}</CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-gray-400 text-sm">
                    {c.description}
                  </p>
                </CardContent>

              </Card>
            ))}

          </div>
        )}
      </div>

    </div>
  );
}

export default Dashboard;