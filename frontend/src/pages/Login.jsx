import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CgSpinner } from "react-icons/cg";
import { Card, CardHeader, CardFooter, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useContext(AuthContext);
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
      const res = await API.post("/auth/login/", form);
      login(res.data.access);

      const params = new URLSearchParams(window.location.search);
      const nextUrl = params.get("next");

      if (nextUrl) {
        navigate(nextUrl);
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6 dark:bg-[#151519] bg-gray-500">

      {/* Login Card */}
      <Card className="w-full max-w-md p-6 shadow-md bg-[#212128] text-white">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
          <CardDescription className="text-center text-gray-400">
            Enter your credentials to access the dashboard.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Username */}
            <div>
              <Label>Username</Label>
              <Input
                name="username"
                type="text"
                placeholder="Enter username"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
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

            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {/* Button */}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <CgSpinner className="animate-spin h-5 w-5 mr-2" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="text-center">
          <p className="text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>

      {/* Tester Credentials */}
      {/* <Card className="w-full max-w-md p-4 shadow-md bg-[#212128] text-white">
        <CardHeader>
          <CardTitle className="text-lg text-center">
            Tester Credentials
          </CardTitle>
        </CardHeader>

        <CardContent>
          <table className="w-full border text-sm text-gray-300">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-2 border">Username</th>
                <th className="p-2 border">Password</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border text-center">
                  baburam@gmail.com
                </td>
                <td className="p-2 border text-center">baburam</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card> */}

    </div>
  );
}

export default Login;