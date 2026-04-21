import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-[#212128] px-6 py-4 flex justify-between items-center">
      
      <div>
        <h1 className="text-lg font-bold">Dashboard</h1>
        <p className="text-sm text-gray-400">
          {user?.tenant_name}
        </p>
      </div>

      <Button onClick={handleLogout}>Logout</Button>
    </header>
  );
}

export default Header;