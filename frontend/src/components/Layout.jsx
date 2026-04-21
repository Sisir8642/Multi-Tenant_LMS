import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Dashboard from "../pages/Dashboard";


function Layout() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-[#151519] text-white">

      <Sidebar setActiveTab={setActiveTab} />

      <div className="flex flex-col flex-1">
        <Header />

        <main className="p-6">
          <Dashboard activeTab={activeTab} />
        </main>

      </div>
    </div>
  );
}


export default Layout;
