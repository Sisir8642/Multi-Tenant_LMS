import { Link } from "react-router-dom";

export default function PublicHome() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-white bg-[#151519]">
      <h1 className="text-4xl font-bold">Welcome to LMS</h1>

      <p className="text-gray-400 mt-2">
        Please login to access courses
      </p>

      <Link
        to="/login"
        className="mt-6 px-6 py-2 bg-blue-600 rounded"
      >
        Login
      </Link>
    </div>
  );
}