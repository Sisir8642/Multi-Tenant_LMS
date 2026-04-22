import { useEffect, useState } from "react";
import API from "../api/axios";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

function SuperAdminDashboard({ activeTab = "dashboard" }) {
  const [users, setUsers] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [courses, setCourses] = useState([]);


  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [userRes, tenantRes, courseRes] = await Promise.all([
        API.get("/auth/users/"),
        API.get("/tenants/"),
        API.get("/courses/")
      ]);

      setUsers(userRes.data);
      setTenants(tenantRes.data);
      setCourses(courseRes.data);

    } catch (err) {
      console.log(err.response?.data);
    }
  };

  const deleteUser = async (id) => {
    try {
      await API.delete(`/auth/users/${id}/`);
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  if (activeTab === "dashboard") {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">
          Welcome, Super Admin
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-[#212128]">
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent>{users.length}</CardContent>
          </Card>

          <Card className="bg-[#212128]">
            <CardHeader>
              <CardTitle>Total Tenants</CardTitle>
            </CardHeader>
            <CardContent>{tenants.length}</CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (activeTab === "users") {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">
          👥 Manage Users
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((u) => (
            <Card key={u.id} className="bg-[#212128]">
              <CardHeader>
                <CardTitle>{u.username}</CardTitle>
              </CardHeader>

              <CardContent>
                <p>Role: {u.role}</p>
                <p>Tenant: {u.tenant_name || "None"}</p>

                <Button
                  className="mt-3 bg-red-600"
                  onClick={() => deleteUser(u.id)}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }
  if (activeTab === "courses") {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
         All Courses
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((c) => (
          <Card key={c.id} className="bg-[#212128]">
            <CardHeader>
              <CardTitle>{c.title}</CardTitle>
            </CardHeader>

            <CardContent>
              <p>{c.description}</p>
              <p className="text-sm">{c.teacher_name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}


  if (activeTab === "tenants") {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">
           Manage Tenants
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tenants.map((t) => (
            <Card key={t.id} className="bg-[#212128]">
              <CardHeader>
                <CardTitle>{t.name}</CardTitle>
              </CardHeader>

              <CardContent>
                <p>{t.domain}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

export default SuperAdminDashboard;
