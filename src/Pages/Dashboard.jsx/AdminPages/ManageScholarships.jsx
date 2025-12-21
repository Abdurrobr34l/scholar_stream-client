import React from 'react';
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import Swal from "sweetalert2";
import PageTitle from "../../../Utilities/PageTitle";
import SectionTitle from "../../../Utilities/SectionTitle";
import { motion } from "framer-motion";
import LoadingSpinner from '../../../Utilities/LoadingSpinner';

const ManageScholarships = () => {
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();
  const [selectedScholarship, setSelectedScholarship] = useState(null);

  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get("/scholarships");
      return res.data.scholarships;
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete scholarship?",
      text: "This cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      confirmButtonColor: "#ef4444",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/scholarships/${id}`);
      queryClient.invalidateQueries(["scholarships"]);
      Swal.fire("Deleted!", "Scholarship removed", "success");
    }
  };

  const handleUpdate = async () => {
    await axiosSecure.patch(`/scholarships/${selectedScholarship._id}`, {
      scholarshipName: selectedScholarship.scholarshipName,
      applicationFees: selectedScholarship.applicationFees,
      deadline: selectedScholarship.applicationDeadline,
    });

    queryClient.invalidateQueries(["scholarships"]);
    setSelectedScholarship(null);
    Swal.fire("Updated!", "Scholarship updated successfully", "success");
  };

  if (isLoading) return <LoadingSpinner />

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="sectionMargin lg:px-10"
    >
      <PageTitle title="Manage Scholarships" />
      <SectionTitle sectionName={`Total Scholarships: ${scholarships.length}`} />

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table min-w-[900px]">
          <thead>
            <tr>
              <th>Name</th>
              <th>University</th>
              <th>Degree</th>
              <th>Category</th>
              <th>Deadline</th>
              <th>Fees</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {scholarships?.map(item => (
              <tr key={item._id}>
                <td>{item.scholarshipName}</td>
                <td>{item.universityName}</td>
                <td>{item.degree}</td>
                <td>{item.scholarshipCategory}</td>
                <td className='font-semibold text-error'>{item.applicationDeadline}</td>
                <td>${item.applicationFees}</td>
                <td>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => setSelectedScholarship(item)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {selectedScholarship && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Update Scholarship</h3>

            <input
              type="text"
              className="input input-bordered w-full mb-3"
              value={selectedScholarship.scholarshipName}
              onChange={(e) =>
                setSelectedScholarship({
                  ...selectedScholarship,
                  scholarshipName: e.target.value,
                })
              }
            />

            <input
              type="number"
              className="input input-bordered w-full mb-3"
              value={selectedScholarship.applicationFees}
              onChange={(e) =>
                setSelectedScholarship({
                  ...selectedScholarship,
                  applicationFees: e.target.value,
                })
              }
            />

            <input
              type="date"
              className="input input-bordered w-full mb-3"
              value={selectedScholarship.applicationDeadline}
              onChange={(e) =>
                setSelectedScholarship({
                  ...selectedScholarship,
                  deadline: e.target.value,
                })
              }
            />

            <div className="modal-action">
              <button className="btn" onClick={() => setSelectedScholarship(null)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleUpdate}>
                Save
              </button>
            </div>
          </div>
        </dialog>
      )}
    </motion.div>
  );
};

export default ManageScholarships;
