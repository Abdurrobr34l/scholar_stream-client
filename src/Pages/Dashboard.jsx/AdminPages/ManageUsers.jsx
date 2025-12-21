import React from 'react';
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import Swal from "sweetalert2";
import PageTitle from "../../../Utilities/PageTitle";
import SectionTitle from '../../../Utilities/SectionTitle';
import { motion } from "framer-motion";

const ManageUsers = () => {
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();
  const [filterRole, setFilterRole] = useState("");

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const filteredUsers = filterRole
    ? users.filter(user => user.role === filterRole)
    : users;

  const handleRoleChange = async (id, role) => {
    await axiosSecure.patch(`/users/role/${id}`, { role });
    queryClient.invalidateQueries(["users"]);
    Swal.fire("Updated!", "User role updated", "success");
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be deleted",
      icon: "warning",
      confirmButtonColor: "#06b6d4",
      cancelButtonColor: "#d33",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/users/${id}`);
      queryClient.invalidateQueries(["users"]);
      Swal.fire("Deleted!", "User deleted", "success");
    }
  };

  if (isLoading) return <span className="loading loading-spinner loading-lg"></span>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      className="sectionMargin lg:px-10"
    >
      <PageTitle title="Manage Users" />

      {/* Filter */}
      <div className="flex flex-col items-center justify-between md:flex-row">
        <SectionTitle sectionName={`Users: ${filteredUsers.length}`} customStyle="text-start" />

        <select
          className="select select-bordered mb-5 p-0! pl-4! h-10"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="Student">Student</option>
          <option value="Moderator">Moderator</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map(user => (
              <tr key={user._id}>
                <td>{user.name || "N/A"}</td>
                <td>{user.email}</td>
                <td>{user.role || "Student"}</td>
                <td className="flex gap-2">
                  <select
                    className="select select-sm p-0! pl-4! h-10 w-[120px] md:[150px] lg:w-full"
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  >
                    <option value="Student">Student</option>
                    <option value="Moderator">Moderator</option>
                    <option value="Admin">Admin</option>
                  </select>

                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </motion.div>
  );
};

export default ManageUsers;
