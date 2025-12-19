import { useRef, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxios from "../../../Hooks/useAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaEye, FaEdit, FaTrash, FaMoneyBillWave, FaStar } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../../../Utilities/LoadingSpinner";

const MyApplications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();

  const [selectedApp, setSelectedApp] = useState(null);
  const [reviewData, setReviewData] = useState({ rating: 0, comment: "" });
  const [editData, setEditData] = useState({ subjectCategory: "", applicationFees: "" });

  const detailsModalRef = useRef();
  const editModalRef = useRef();
  const reviewModalRef = useRef();

  // Fetch applications using React Query
  const { data: applications = [], isLoading, isError } = useQuery({
  queryKey: ["applications", user?.email],
  queryFn: async () => {
    if (!user?.email) return [];
    const res = await axiosSecure.get(`/applications/user/${user.email}`);
    return res.data;
  },
  enabled: !!user?.email,
});


  if (isLoading) return <LoadingSpinner/>;
  if (isError) return <p className="text-center mt-10 text-red-500">Failed to load applications</p>;

  // DELETE
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This application will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/applications/${id}`);
        queryClient.invalidateQueries(["applications", user?.email]);
        toast.success("Application deleted!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete application");
      }
    }
  };

  // PAYMENT
  const handlePayment = async (app) => {
    const result = await Swal.fire({
      title: "Confirm Payment",
      text: `Pay $${app.applicationFees}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, pay now!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.post(`/applications/pay/${app._id}`);
        queryClient.invalidateQueries(["applications", user?.email]);
        toast.success("Payment successful!");
      } catch (err) {
        console.error(err);
        toast.error("Payment failed!");
      }
    }
  };

  // OPEN MODALS
  const openDetailsModal = (app) => {
    setSelectedApp(app);
    detailsModalRef.current.showModal();
  };

  const openEditModal = (app) => {
    setSelectedApp(app);
    setEditData({
      subjectCategory: app.subjectCategory || "",
      applicationFees: app.applicationFees || "",
    });
    editModalRef.current.showModal();
  };

  const openReviewModal = (app) => {
    setSelectedApp(app);
    setReviewData({ rating: 0, comment: "" });
    reviewModalRef.current.showModal();
  };

  // SUBMIT EDIT
  const submitEdit = async () => {
    try {
      await axiosSecure.put(`/applications/${selectedApp._id}`, editData);
      queryClient.invalidateQueries(["applications", user?.email]);
      editModalRef.current.close();
      toast.success("Application updated!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update");
    }
  };

  // SUBMIT REVIEW
  const submitReview = async () => {
    if (!reviewData.rating || !reviewData.comment) {
      toast.error("Please provide rating and comment");
      return;
    }

    try {
      await axiosSecure.post(`/reviews`, {
        scholarshipId: selectedApp?.scholarshipId,
        scholarshipName: selectedApp?.scholarshipName,
        universityName: selectedApp?.universityName,
        userName: user.displayName,
        userEmail: user.email,
        ratingPoint: reviewData.rating,
        reviewComment: reviewData.comment,
      });
      reviewModalRef.current.close();
      toast.success("Review submitted!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit review");
    }
  };

  const modalBaseClass = "modal modal-bottom sm:modal-middle";
  const modalBoxClass = "modal-box bg-white rounded-2xl shadow-xl p-6 sm:p-8 font-inter text-primary";

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      className="sectionMargin px-4 lg:px-10"
    >
      <h2 className="text-3xl font-bold mb-6">My Applications</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full bg-white shadow rounded-lg">
          <thead>
            <tr>
              <th>Scholarship</th>
              <th>University</th>
              <th>Address</th>
              <th>Feedback</th>
              <th>Category</th>
              <th>Fees</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td>{app.scholarshipName}</td>
                <td>{app.universityName}</td>
                <td>
                  {app.universityCity}, {app.universityCountry}
                </td>
                <td>{app.feedback || "N/A"}</td>
                <td>{app.subjectCategory}</td>
                <td>${app.applicationFees}</td>
                <td>
                  <span
                    className={`badge ${
                      app.applicationStatus === "pending"
                        ? "badge-warning"
                        : app.applicationStatus === "submitted"
                        ? "badge-info"
                        : "badge-success"
                    }`}
                  >
                    {app.applicationStatus}
                  </span>
                  {app.paymentStatus === "unpaid" && (
                    <span className="badge badge-error ml-1">Unpaid</span>
                  )}
                </td>
                <td className="flex flex-wrap gap-2">
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => openDetailsModal(app)}
                  >
                    <FaEye />
                  </button>
                  {app.applicationStatus === "pending" && (
                    <>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => openEditModal(app)}
                      >
                        <FaEdit />
                      </button>
                      {app.paymentStatus === "unpaid" && (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handlePayment(app)}
                        >
                          <FaMoneyBillWave />
                        </button>
                      )}
                      <button
                        className="btn btn-error btn-sm"
                        onClick={() => handleDelete(app._id)}
                      >
                        <FaTrash />
                      </button>
                    </>
                  )}
                  {app.applicationStatus === "completed" && (
                    <button
                      className="btn btn-accent btn-sm"
                      onClick={() => openReviewModal(app)}
                    >
                      <FaStar />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DETAILS MODAL */}
      <dialog ref={detailsModalRef} className={modalBaseClass}>
        <div className={modalBoxClass}>
          <h3 className="font-poppins text-xl font-semibold mb-4 text-primary">
            Application Details
          </h3>
          {selectedApp && (
            <div className="space-y-2 text-secondary">
              <p>
                <strong>Scholarship:</strong> {selectedApp.scholarshipName}
              </p>
              <p>
                <strong>University:</strong> {selectedApp.universityName}
              </p>
              <p>
                <strong>Address:</strong> {selectedApp.universityCity},{" "}
                {selectedApp.universityCountry}
              </p>
              <p>
                <strong>Category:</strong> {selectedApp.subjectCategory}
              </p>
              <p>
                <strong>Fees:</strong> ${selectedApp.applicationFees}
              </p>
              <p>
                <strong>Status:</strong> {selectedApp.applicationStatus}
              </p>
              <p>
                <strong>Payment:</strong> {selectedApp.paymentStatus}
              </p>
              <p>
                <strong>Feedback:</strong> {selectedApp.feedback || "N/A"}
              </p>
            </div>
          )}
          <div className="modal-action">
            <button
              className="btn btn-outline btn-sm text-primary hover:bg-primary/10"
              onClick={() => detailsModalRef.current.close()}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>

      {/* EDIT MODAL */}
      <dialog ref={editModalRef} className={modalBaseClass}>
        <div className={modalBoxClass}>
          <h3 className="font-poppins text-xl font-semibold mb-4 text-primary">
            Edit Application
          </h3>
          <input
            className="input input-bordered w-full mb-2 focus:border-accent focus:ring-accent"
            placeholder="Category"
            value={editData.subjectCategory}
            onChange={(e) =>
              setEditData((prev) => ({ ...prev, subjectCategory: e.target.value }))
            }
          />
          <input
            className="input input-bordered w-full mb-2 focus:border-accent focus:ring-accent"
            placeholder="Fees"
            type="number"
            value={editData.applicationFees}
            onChange={(e) =>
              setEditData((prev) => ({ ...prev, applicationFees: e.target.value }))
            }
          />
          <div className="modal-action">
            <button
              className="btn btn-accent btn-sm text-white hover:bg-accent/90"
              onClick={submitEdit}
            >
              Save
            </button>
            <button
              className="btn btn-outline btn-sm text-primary hover:bg-primary/10"
              onClick={() => editModalRef.current.close()}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>

      {/* REVIEW MODAL */}
      <dialog ref={reviewModalRef} className={modalBaseClass}>
        <div className={modalBoxClass}>
          <h3 className="font-poppins text-xl font-semibold mb-4 text-primary">
            Add Review for <span className="text-accent">{selectedApp?.scholarshipName}</span>
          </h3>

          <div className="flex space-x-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`cursor-pointer text-3xl ${
                  reviewData.rating >= star ? "text-accent" : "text-gray-300"
                } hover:scale-125 transition-transform`}
                onClick={() =>
                  setReviewData((prev) => ({ ...prev, rating: star }))
                }
              />
            ))}
          </div>

          <textarea
            className="textarea textarea-bordered w-full h-32 mb-4 focus:border-accent focus:ring-accent rounded-lg"
            placeholder="Write your review..."
            value={reviewData.comment}
            onChange={(e) =>
              setReviewData((prev) => ({ ...prev, comment: e.target.value }))
            }
          />

          <div className="flex justify-end gap-3">
            <button
              className="btn btn-accent btn-sm text-white hover:bg-accent/90"
              onClick={submitReview}
            >
              Submit
            </button>
            <button
              className="btn btn-outline btn-sm text-primary hover:bg-primary/10"
              onClick={() => reviewModalRef.current.close()}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </motion.div>
  );
};

export default MyApplications;
