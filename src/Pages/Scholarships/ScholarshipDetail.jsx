import React from 'react';
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import Container from '../../Utilities/Container';
import PageTitle from '../../Utilities/PageTitle';
import { motion } from "framer-motion";
import ReviewCard from './ReviewCard';
import SectionTitle from '../../Utilities/SectionTitle';
import useScholarshipReviews from '../../Hooks/useScholarshipReviews';
import useAxios from '../../Hooks/useAxios';
import LoadingSpinner from '../../Utilities/LoadingSpinner';
import useAuth from '../../Hooks/useAuth';

const ScholarshipDetail = () => {
  const { id } = useParams();
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data: reviews, isLoading: reviewsLoading, error: reviewsError } = useScholarshipReviews(id);
  const axiosSecure = useAxios();
  const { user } = useAuth();

  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        const res = await axiosSecure.get(`/scholarships/${id}`);
        setScholarship(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchScholarship();
  }, [id, axiosSecure]);

  if (loading) return <LoadingSpinner />;
  if (!scholarship) return <p>Scholarship not found!</p>;

  const handleApply = async () => {
    try {
      const res = await axiosSecure.post("/create-checkout-session", {
        scholarshipId: scholarship._id,
        userId: user?.uid,
        userName: user?.displayName,
        userEmail: user?.email,
        applicationFees: scholarship.applicationFees,
      });

      // Redirect to Stripe Checkout
      window.location.href = res.data.url;
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <Container className="sectionPadding">
      <PageTitle title="Scholarship Details" />

      <motion.div
        key={scholarship._id}
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.45 }}
      >
        {/* Card Layout */}
        <SectionTitle sectionName={"Scholarship Details"} customStyle={"max-w-4xl mx-auto mb-4! text-left"} />

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative">
            <img
              src={scholarship.universityImage}
              alt={scholarship.universityName}
              className="w-full h-[200px] md:h-[350px]"
            />
          </div>

          <div className="relative p-4 py-8 md:p-6">
            <div className="absolute bottom-0 left-0 w-full h-2 bg-linear-to-r from-primary to-accent-content"></div>

            <div className="flex justify-between items-center">
              <span className="badge badge-success absolute right-0 top-0 mt-2 mr-4 py-4 font-bold text-md text-white rounded-full bg-primary border-none md:mt-4 md:mr-6">
                {scholarship.universityWorldRank} World Rank
              </span>
              <h2 className="mt-5 text-xl font-bold text-primary md:text-3xl">{scholarship.scholarshipName}</h2>
            </div>

            <p className="text-lg mt-1 mb-5 w-[300px] md:w-[600px]">{scholarship.description}</p>

            <div className="flex flex-col justify-between gap-5 mt-5 mb-8 md:flex-row md:gap-0">
              <div>
                <p className="font-medium text-primary">Location:</p>
                <p>{scholarship.universityCity}, {scholarship.universityCountry}</p>
              </div>
              <div>
                <p className="font-medium text-primary">Application Deadline:</p>
                <p>{new Date(scholarship.applicationDeadline).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="font-medium text-primary">Application Fee:</p>
                <p className="text-accent-content">{scholarship.applicationFees === 0 ? "No Application Fee" : `${scholarship.applicationFees}$`}</p>
              </div>
              <div>
                <p className="font-medium text-primary">Stipend/Coverage:</p>
                <p className="text-accent-content">{scholarship.stipend}$ per month</p>
              </div>
            </div>

            <div className="text-center mt-6">
              <button
                className="px-5 py-2.5 rounded-lg font-semibold shadow-soft bg-primary text-white transition-colors duration-300 ease-linear hover:bg-accent hover:text-primary"
                // onClick={() => window.location.href = "/checkout"} // Redirect to checkout/payment
                onClick={handleApply}
              >
                Apply for Scholarship
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Layout */}
        {reviewsLoading ? (
          <LoadingSpinner />
        ) : reviewsError ? (
          <p className="text-center mt-10 text-red-500">Failed to load reviews</p>
        ) : (
          <ReviewCard reviews={reviews} />
        )}
      </motion.div>
    </Container>
  );
};

export default ScholarshipDetail;
