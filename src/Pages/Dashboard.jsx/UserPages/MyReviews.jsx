import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxios from "../../../Hooks/useAxios";
import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!user?.email) return;
    const fetchReviews = async () => {
      try {
        const res = await axiosSecure.get(`/reviews/user/${user.email}`);
        setReviews(res.data);
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      }
    };
    fetchReviews();
  }, [user, axiosSecure]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      await axiosSecure.delete(`/reviews/${id}`);
      setReviews(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      className="sectionMargin px-4 lg:px-10"
    >
      <h2 className="text-2xl font-bold mb-4">My Reviews</h2>

      <div className="overflow-x-auto">
        <table className="table w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th>Scholarship Name</th>
              <th>University Name</th>
              <th>Review Comment</th>
              <th>Review Date</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map(review => (
              <tr key={review._id}>
                <td>{review.scholarshipName}</td>
                <td>{review.universityName}</td>
                <td>{review.reviewComment}</td>
                <td>{new Date(review.reviewDate).toLocaleDateString()}</td>
                <td>{review.ratingPoint} / 5</td>
                <td className="flex gap-2">
                  <button className="btn btn-sm btn-warning" title="Edit"><FaEdit /></button>
                  <button className="btn btn-sm btn-error" title="Delete" onClick={() => handleDelete(review._id)}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default MyReviews;
