// function Sidebar({ setActiveTab }) {
//   return (
//     <div className="w-64 bg-[#212128] p-5 hidden md:block">
//       <h2 className="text-xl font-bold mb-6">LMS</h2>

//       <nav className="flex flex-col space-y-3">
//         <button
//           onClick={() => setActiveTab("dashboard")}
//           className="text-left hover:text-blue-400"
//         >
//           Dashboard
//         </button>

//         <button
//           onClick={() => setActiveTab("courses")}
//           className="text-left hover:text-blue-400"
//         >
//           Courses
//         </button>

//         <button
//           onClick={() => setActiveTab("enrollments")}
//           className="text-left hover:text-blue-400"
//         >
//           Enrollments
//         </button>
//         <button
//           onClick={() => setActiveTab("users")}
//           className="text-left hover:text-blue-400"
//         >
//           Users
//         </button>
//         <button
//           onClick={() => setActiveTab("tenants")}
//           className="text-left hover:text-blue-400"
//         >
//           Tenants
//         </button>
//       </nav>
//     </div>
//   );
// }
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Sidebar({ setActiveTab }) {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  return (
    <div className="w-64 bg-[#212128] p-5 hidden md:block">
      <h2 className="text-xl font-bold mb-6">LMS</h2>

      <nav className="flex flex-col space-y-3">

        <button onClick={() => setActiveTab("dashboard")}>
          Dashboard
        </button>

        {user.role === "student" && (
          <>
            <button onClick={() => setActiveTab("courses")}>
              Courses
            </button>
            <button onClick={() => setActiveTab("enrollments")}>
              My Enrollments
            </button>
          </>
        )}

        {user.role === "teacher" && (
          <>
            <button onClick={() => setActiveTab("courses")}>
              My Courses
            </button>
            <button onClick={() => setActiveTab("students")}>
              Enrolled Students
            </button>
          </>
        )}

        {user.role === "superadmin" && (
          <>
            <button onClick={() => setActiveTab("courses")}>
              All Courses
            </button>
            <button onClick={() => setActiveTab("users")}>
              Users
            </button>
            <button onClick={() => setActiveTab("tenants")}>
              Tenants
            </button>
          </>
        )}

      </nav>
    </div>
  );
}

export default Sidebar;

