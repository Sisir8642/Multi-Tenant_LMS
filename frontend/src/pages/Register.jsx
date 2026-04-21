import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CgSpinner } from "react-icons/cg";

function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "student",
    tenant_name: "",
  });

  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await API.post("/auth/register/", form);
      navigate("/");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-400 dark:bg-gray-900 p-4">

      <Card className="w-full max-w-md rounded-lg shadow-lg bg-[#212128] text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Register Account
          </CardTitle>
          <CardDescription className="text-gray-400">
            Create a new account to get started.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <Label>Username</Label>
              <Input
                name="username"
                type="text"
                placeholder="baburam"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Password</Label>
              <Input
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Role</Label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>

            <div>
              <Label>Tenant Name</Label>
              <Input
                name="tenant_name"
                type="text"
                placeholder="My Organization"
                value={form.tenant_name}
                onChange={handleChange}
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-gray-600 hover:bg-gray-700 cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <CgSpinner className="animate-spin h-5 w-5 mr-2" />
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-blue-500 hover:underline"
            >
              Login
            </Link>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}

export default Register;