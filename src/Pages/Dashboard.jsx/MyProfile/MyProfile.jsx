import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxios from "../../../Hooks/useAxios";
import useUserRole from "../../../Hooks/useUserRole";
import { motion } from "framer-motion";
import { ImProfile } from "react-icons/im";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const { role, loading } = useUserRole(user?.email);

  const [stats, setStats] = useState({
    totalApplications: 0,
    totalReviews: 0,
    totalManaged: 0,
    totalScholarships: 0,
  });

  useEffect(() => {
    if (!user?.email || !role) return;

    const fetchStats = async () => {
      try {
        if (role === "Student") {
          // Fetch student's applications and reviews count
          const resApps = await axiosSecure.get(`/applications/user/${user.email}`);
          const resReviews = await axiosSecure.get(`/reviews/user/${user.email}`);
          setStats({
            totalApplications: resApps.data.length,
            totalReviews: resReviews.data.length,
            totalManaged: 0,
            totalScholarships: 0,
          });
        } else if (role === "Moderator") {
          // Fetch applications managed by moderator (for simplicity, all applications)
          const resApps = await axiosSecure.get(`/applications`);
          setStats({
            totalApplications: 0,
            totalReviews: 0,
            totalManaged: resApps.data.length,
            totalScholarships: 0,
          });
        } else if (role === "Admin") {
          // Fetch total scholarships added
          const resScholarships = await axiosSecure.get(`/scholarships`);
          setStats({
            totalApplications: 0,
            totalReviews: 0,
            totalManaged: 0,
            totalScholarships: resScholarships.data.length,
          });
        }
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };

    fetchStats();
  }, [user, role, axiosSecure]);

  if (loading) return <span className="loading loading-spinner loading-lg"></span>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45 }}
      className="sectionMargin flex flex-col items-center justify-center px-4 lg:px-10"
    >
      <div className="bg-[#f8fafc] rounded-xl shadow-md p-8 w-full max-w-3xl flex flex-col items-center text-center">
        {/* Profile Image */}
        <div className="avatar mb-4">
          <div className="w-24 h-24 rounded-full ring ring-accent-content ring-offset-accent-content ring-offset-2 overflow-hidden">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="User" />
            ) : (
              <div className="flex items-center justify-center bg-primary text-white w-full h-full">
                <ImProfile className="text-4xl" />
              </div>
            )}
          </div>
        </div>

        {/* Name, Email, Role */}
        <h2 className="text-2xl font-bold">{user?.displayName || "Anonymous User"}</h2>
        <p className="text-md font-semibold text-accent mb-1">{role}</p>
        <p className="text-sm text-gray-600 mb-6">{user?.email}</p>

        {/* Role-specific Stats */}
        {role === "Student" && (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold">Total Applications</h3>
              <p className="text-xl font-bold">{stats.totalApplications}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold">Total Reviews</h3>
              <p className="text-xl font-bold">{stats.totalReviews}</p>
            </div>
          </div>
        )}

        {role === "Moderator" && (
          <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold">Applications Managed</h3>
              <p className="text-xl font-bold">{stats.totalManaged}</p>
            </div>
          </div>
        )}

        {role === "Admin" && (
          <div className="w-full grid grid-cols-1 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold">Scholarships Added</h3>
              <p className="text-xl font-bold">{stats.totalScholarships}</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MyProfile;
