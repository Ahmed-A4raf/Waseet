import React, { useEffect, useRef, useState } from "react";
import HeaderSp from "../../serviceProvider/commenSp/HeaderSp";
import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";

const roleColors = {
  admin: "bg-red-100 text-red-700",
  customer: "bg-blue-100 text-blue-700",
  serviceProvider: "bg-green-100 text-green-700",
};

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingUserId, setEditingUserId] = useState(null);
  const usersPerPage = 6;

  const dropdownRef = useRef(null); 

  const fetchUsers = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = storedUser?.token;

    fetch("http://waseet.runasp.net/api/auth/GetAllUsers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized or failed to fetch users");
        return res.json();
      })
      .then((data) => setUsers(data))
      .catch((err) => console.error("Failed to fetch users:", err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✨ إغلاق الدروب داون لما اضغط بره
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setEditingUserId(null);
      }
    };

    if (editingUserId !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editingUserId]);

  const handleDelete = (userId) => {
  if (!window.confirm("Are you sure you want to delete this user?")) return;

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const token = storedUser?.token;

  fetch(`http://waseet.runasp.net/api/auth/DeleteUser/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        // بعد حذف اليوزر نحذف منتجاته
        fetch(`http://waseet.runasp.net/api/Product/DeleteProductsByUser/${userId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((productRes) => {
          if (!productRes.ok) throw new Error("Failed to delete user's products");
        })
        .catch((err) => console.error("Error deleting user's products:", err));

        // حذف اليوزر من الواجهة
        setUsers((prev) => prev.filter((u) => u.id !== userId));
      } else {
        throw new Error("Failed to delete user");
      }
    })
    .catch((err) => console.error("Error deleting user:", err));
};


  const handleRoleChange = (userId, newRole) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = storedUser?.token;

    fetch(
      `http://waseet.runasp.net/api/auth/UpdateUserRole?newRoleName=${newRole}&id=${userId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update role");
        return res.json();
      })
      .then(() => {
        fetchUsers();
        setEditingUserId(null);
      })
      .catch((err) => console.error("Role update failed:", err));
  };

  const filteredUsers = users.filter((user) => {
    const matchSearch =
      user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole =
      roleFilter === "all"
        ? true
        : user.role.toLowerCase() === roleFilter.toLowerCase();
    return matchSearch && matchRole;
  });

  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <HeaderSp title="Total Users" />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* Filters */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 mt-6 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full md:w-1/2 focus:outline-primary bg-primary-light hover:border px-5 py-3 rounded-md dark:bg-zinc-800 dark:text-zinc-50 dark:border-zinc-800 dark:focus:outline-zinc-900"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full md:w-1/4 ml-auto focus:outline-primary bg-primary-light hover:border px-5 py-3 rounded-md dark:bg-zinc-800 dark:text-zinc-50 dark:border-zinc-800 dark:focus:outline-zinc-900"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="serviceProvider">Service Provider</option>
            <option value="customer">Customer</option>
          </select>
        </motion.div>

        {/* Table */}
        <motion.div
          className="overflow-x-auto rounded-lg shadow-md min-h-[400px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-50">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-semibold">
                  Image
                </th>
                <th className="py-3 px-6 text-left text-sm font-semibold">
                  Name
                </th>
                <th className="py-3 px-6 text-left text-sm font-semibold">
                  Email
                </th>
                <th className="py-3 px-6 text-left text-sm font-semibold">
                  Role
                </th>
                <th className="py-3 px-6 text-left text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-zinc-900 dark:border-zinc-600 dark:text-zinc-50">
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td className="py-3 px-6">
                    {user.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.displayName}
                        className="h-12 w-12 rounded-full object-cover border"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center text-sm text-white font-bold uppercase">
                        {user.displayName
                          .split(" ")
                          .map((p) => p[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-6">{user.displayName}</td>
                  <td className="py-3 px-6">{user.email}</td>
                  <td className="py-3 px-6 capitalize relative">
                    {editingUserId === user.id ? (
                      <div className="relative inline-block text-left" ref={dropdownRef}>
                        <div className="absolute z-10 mt-2 w-40 rounded-md shadow-lg ring-1 bg-white ring-black ring-opacity-5 dark:bg-zinc-800">
                          <div className="rounded-md">
                            {["admin", "customer", "serviceProvider"].map(
                              (roleOption) => (
                                <div
                                  key={roleOption}
                                  className={`cursor-pointer rounded-md px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-700 ${
                                    roleOption === user.role
                                      ? "font-bold text-primary"
                                      : ""
                                  }`}
                                  onClick={() => {
                                    if (roleOption !== user.role) {
                                      const confirmChange = window.confirm(
                                        `Are you sure you want to change the role to "${roleOption}"?`
                                      );
                                      if (confirmChange) {
                                        handleRoleChange(user.id, roleOption);
                                      } else {
                                        setEditingUserId(null);
                                      }
                                    } else {
                                      setEditingUserId(null);
                                    }
                                  }}
                                >
                                  {roleOption}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium cursor-pointer ${
                          roleColors[user.role]
                        }`}
                        onClick={() => setEditingUserId(user.id)}
                      >
                        {user.role}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-6">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <div className="text-center font-semibold text-lg py-6 dark:text-zinc-50">
              <span className="text-primary">No </span>users found.
            </div>
          )}
        </motion.div>

        {/* Pagination */}
        <div className="mt-4 flex justify-center items-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 text-sm rounded-md ${
                currentPage === i + 1
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default UsersAdmin;
