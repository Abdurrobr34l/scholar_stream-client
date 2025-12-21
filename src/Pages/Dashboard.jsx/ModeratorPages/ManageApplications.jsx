import React from 'react';
import { useState, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import LoadingSpinner from "../../../Utilities/LoadingSpinner";
import PageTitle from "../../../Utilities/PageTitle";
import { FaEye, FaCommentDots, FaTimes } from "react-icons/fa";
import SectionTitle from '../../../Utilities/SectionTitle';

const ManageApplications = () => {
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();

  const [selectedApp, setSelectedApp] = useState(null);
  const [feedback, setFeedback] = useState("");

  const detailsModalRef = useRef();
  const feedbackModalRef = useRef();

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["allApplications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications");
      return res.data;
    },
  });

  const updateStatus = async (id, status) => {
    await axiosSecure.patch(`/applications/status/${id}`, {
      applicationStatus: status,
    });
    queryClient.invalidateQueries(["allApplications"]);
  };

  const submitFeedback = async () => {
    await axiosSecure.put(
      `/applications/feedback/${selectedApp._id}`,
      { feedback }
    );
    setFeedback("");
    feedbackModalRef.current.close();
    queryClient.invalidateQueries(["allApplications"]);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <PageTitle title="Manage Applications" />
      <SectionTitle sectionName={`Applications: ${applications.length}`} customStyle="text-start"/>

      <div className="overflow-x-auto">
        <table className="table w-full bg-white shadow">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>University</th>
              <th>Feedback</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map(application => (
              <tr key={application._id}>
                <td>{application.userName}</td>
                <td>{application.userEmail}</td>
                <td>{application.universityName}</td>
                <td>{application.feedback || "—"}</td>

                <td>
                  <select
                    value={application.applicationStatus}
                    className="select select-sm p-0! pl-4! h-10!"
                    onChange={(e) =>
                      updateStatus(application._id, e.target.value)
                    }
                  >
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>

                <td>
                  <span
                    className={`badge ${
                      application.paymentStatus === "paid"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {application.paymentStatus}
                  </span>
                </td>

                <td className="flex gap-2">
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => {
                      setSelectedApp(application);
                      detailsModalRef.current.showModal();
                    }}
                  >
                    <FaEye />
                  </button>

                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => {
                      setSelectedApp(application);
                      setFeedback(application.feedback || "");
                      feedbackModalRef.current.showModal();
                    }}
                  >
                    <FaCommentDots />
                  </button>

                  <button
                    className="btn btn-error btn-sm"
                    onClick={() =>
                      updateStatus(application._id, "rejected")
                    }
                  >
                    <FaTimes />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DETAILS MODAL */}
      <dialog ref={detailsModalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-3">Application Details</h3>
          {selectedApp && (
            <div className="space-y-1">
              <p><b>Name:</b> {selectedApp.userName}</p>
              <p><b>Email:</b> {selectedApp.userEmail}</p>
              <p><b>University:</b> {selectedApp.universityName}</p>
              <p><b>Status:</b> {selectedApp.applicationStatus}</p>
              <p><b>Payment:</b> {selectedApp.paymentStatus}</p>
            </div>
          )}
          <div className="modal-action">
            <button className="btn" onClick={() => detailsModalRef.current.close()}>
              Close
            </button>
          </div>
        </div>
      </dialog>

      {/* FEEDBACK MODAL */}
      <dialog ref={feedbackModalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-3">Write Feedback</h3>
          <textarea
            className="textarea textarea-bordered w-full"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <div className="modal-action">
            <button className="btn btn-accent" onClick={submitFeedback}>
              Submit
            </button>
            <button
              className="btn"
              onClick={() => feedbackModalRef.current.close()}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageApplications;
