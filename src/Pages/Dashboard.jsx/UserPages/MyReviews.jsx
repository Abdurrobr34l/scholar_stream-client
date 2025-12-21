import { useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxios from "../../../Hooks/useAxios";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaStar } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import PageTitle from "../../../Utilities/PageTitle";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();

  const [selectedReview, setSelectedReview] = useState(null);
  const [editData, setEditData] = useState({ ratingPoint: 0, reviewComment: "" });
  const editModalRef = useRef();

  //* Fetch Reviews
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/reviews/user/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  //* Delete Review
  const deleteMutation = useMutation({
    mutationFn: async (id) => await axiosSecure.delete(`/reviews/${id}`),
    onSuccess: (_, id) => {
      queryClient.setQueryData(["reviews", user.email], old =>
        old.filter(r => r._id !== id)
      );
      toast.success("Review deleted!");
    },
    onError: () => toast.error("Failed to delete review"),
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This review will be deleted permanently!",
      icon: "warning",
      confirmButtonColor: "#06b6d4",
      cancelButtonColor: "#d33",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) deleteMutation.mutate(id);
    });
  };

  //* Edit Review
  const editMutation = useMutation({
    mutationFn: async (data) => await axiosSecure.put(`/reviews/${selectedReview._id}`, data),
    onSuccess: () => {
      queryClient.setQueryData(["reviews", user.email], old =>
        old.map(r => r._id === selectedReview._id ? { ...r, ...editData } : r)
      );
      toast.success("Review updated!");
      editModalRef.current.close();
    },
    onError: () => toast.error("Failed to update review"),
  });

  const handleEditSubmit = () => {
    if (!editData.ratingPoint || !editData.reviewComment) {
      toast.error("Please provide rating and comment");
      return;
    }
    editMutation.mutate(editData);
  };

  const openEditModal = (review) => {
    setSelectedReview(review);
    setEditData({ ratingPoint: review.ratingPoint, reviewComment: review.reviewComment });
    editModalRef.current.showModal();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      className="sectionMargin px-4 lg:px-10"
    >
      <PageTitle title="My Reviews" />

      <h2 className="text-3xl font-bold mb-6">My Reviews</h2>

      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200 bg-white">
        <table className="table w-full text-primary">
          <thead className="bg-gray-100 font-semibold text-sm">
            <tr>
              <th>Scholarship</th>
              <th>University</th>
              <th>Comment</th>
              <th>Date</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {reviews.map(review => (
              <tr key={review._id} className="hover:bg-gray-50 transition-colors">
                <td>{review.scholarshipName}</td>
                <td>{review.universityName}</td>
                <td>{review.reviewComment}</td>
                <td>{new Date(review.reviewDate).toLocaleDateString()}</td>
                <td>{review.ratingPoint} / 5</td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-sm btn-warning"
                    title="Edit"
                    onClick={() => openEditModal(review)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    title="Delete"
                    onClick={() => handleDelete(review._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Review Modal */}
      <dialog ref={editModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Edit Review</h3>
          <div className="flex space-x-2 mb-4">
            {[1, 2, 3, 4, 5].map(star => (
              <FaStar
                key={star}
                className={`cursor-pointer text-3xl ${editData.ratingPoint >= star ? "text-accent" : "text-gray-300"}`}
                onClick={() => setEditData(prev => ({ ...prev, ratingPoint: star }))}
              />
            ))}
          </div>
          <textarea
            className="textarea textarea-bordered w-full h-32 mb-4 border-primary focus:border-accent focus:outline-accent"
            placeholder="Write your review..."
            value={editData.reviewComment}
            onChange={(e) => setEditData(prev => ({ ...prev, reviewComment: e.target.value }))}
          />
          <div className="flex justify-end gap-3">
            <button className="btn btn-accent btn-sm text-white!" onClick={handleEditSubmit}>Save</button>
            <button className="btn btn-outline btn-sm" onClick={() => editModalRef.current.close()}>Cancel</button>
          </div>
        </div>
      </dialog>
    </motion.div>
  );
};

export default MyReviews;
