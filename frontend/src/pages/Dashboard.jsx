import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import StudentDashboard from "./StudentDashboard";
import TeacherDashboard from "./TeacherDashboard";

function Dashboard({ activeTab }) {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) return <p>Loading...</p>;
  if (!user) return <p>Please login</p>;

  if (user.role === "student") {
    return (
      <StudentDashboard activeTab={activeTab} />
    );
  }

  if (user.role === "teacher") {
    return (
      <TeacherDashboard activeTab={activeTab} />
    );
  }

  return <p>Unknown role</p>;
}

export default Dashboard;
