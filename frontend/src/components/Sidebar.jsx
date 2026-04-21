function Sidebar({ setActiveTab }) {
  return (
    <div className="w-64 bg-[#212128] p-5 hidden md:block">
      <h2 className="text-xl font-bold mb-6">LMS</h2>

      <nav className="flex flex-col space-y-3"> 
        
        <button
          onClick={() => setActiveTab("dashboard")}
          className="text-left hover:text-blue-400"
        >
          Dashboard
        </button>

        <button
          onClick={() => setActiveTab("courses")}
          className="text-left hover:text-blue-400"
        >
          Courses
        </button>

        <button
          onClick={() => setActiveTab("enrollments")}
          className="text-left hover:text-blue-400"
        >
          Enrollments
        </button>

      </nav>
    </div>
  );
}

export default Sidebar;
