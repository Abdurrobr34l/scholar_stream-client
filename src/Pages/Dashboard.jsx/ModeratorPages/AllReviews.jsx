import React from 'react';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import PageTitle from "../../../Utilities/PageTitle";
import Swal from "sweetalert2";
import SectionTitle from '../../../Utilities/SectionTitle';

const AllReviews = () => {
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();

  const { data: reviews = [] } = useQuery({
    queryKey: ["allReviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews");
      return res.data;
    },
  });

  const deleteReview = async (id) => {
    const result = await Swal.fire({
      title: "Delete review?",
      icon: "warning",
      confirmButtonColor: "#06b6d4",
      cancelButtonColor: "#d33",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      await axiosSecure.delete(`/reviews/${id}`);
      queryClient.invalidateQueries(["allReviews"]);
    }
  };

  return (
    <div>
      <PageTitle title="All Reviews" />
      <SectionTitle sectionName={`Reviews: ${reviews.length}`} customStyle="text-start"/>

      <table className="table w-full bg-white shadow">
        <thead>
          <tr>
            <th>User</th>
            <th>University</th>
            <th>Comment</th>
            <th>Rating</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {reviews.map(review => (
            <tr key={review._id}>
              <td>{review.userName}</td>
              <td>{review.universityName}</td>
              <td>{review.reviewComment}</td>
              <td>{review.ratingPoint}/5</td>
              <td>
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => deleteReview(review._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllReviews;
