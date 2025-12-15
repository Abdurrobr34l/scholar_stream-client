import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import PageTitle from "../../Utilities/PageTitle";
import Container from "../../Utilities/Container";
import { motion } from "framer-motion";

const ScholarshipDetail = () => {
  const { id } = useParams(); // Get ID from URL
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/scholarships/${id}`);
        setScholarship(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchScholarship();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!scholarship) return <p>Scholarship not found!</p>;

  return (
    <Container className="sectionPadding">
      <PageTitle title="Scholarship Details" />

      <motion.div
        key={scholarship._id}
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}      // triggers animation when in viewport
        viewport={{ once: true, amount: 0.3 }} // animate once, when 30% visible
        transition={{ duration: 0.45, delay: scholarship.index * 0.15 }}
        className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Card Layout */}
        <div>
          {/* University Image */}
          <div className="relative">
            <img
              src={scholarship.universityImage}
              alt={scholarship.universityName}
              className="w-full h-64 object-cover"
            />
          </div>

          {/* Card Content */}
          <div className="relative p-6 py-8">
            {/* Designed Border */}
            <div className="absolute bottom-0 left-0 w-full h-2 bg-linear-to-r from-primary to-accent-content"></div>

            {/* Scholarship Title & Basic Info */}
            <div className="flex justify-between items-center">
              <span className="badge badge-success absolute right-0 top-0 mt-4 mr-6 py-4 font-bold text-md text-white rounded-full bg-primary border-none">{scholarship.universityWorldRank} World Rank</span>
              <h2 className="mt-5 text-xl font-bold text-primary md:text-3xl">{scholarship.scholarshipName}</h2>
            </div>

            {/* Scholarship Description */}
            <p className="text-lg mt-1 mb-5 w-[300px] md:w-[600px]">{scholarship.description}</p>

            {/*  Location, Deadline, Application & Stipend Info */}
            <div className="flex justify-between mt-5 mb-8">
              {/* Location & Deadline */}
              <div>
                <p className="font-medium text-primary">Location:</p>
                <p>{scholarship.universityCity}, {scholarship.universityCountry}</p>
              </div>
              <div>
                <p className="font-medium text-primary">Application Deadline:</p>
                <p>{new Date(scholarship.applicationDeadline).toLocaleDateString()}</p>
              </div>

              {/* Application & Stipend Info */}
              <div>
                <p className="font-medium text-primary">Application Fee:</p>
                <p className="text-accent-content">{scholarship.applicationFees === 0 ? "No Application Fee" : `${scholarship.applicationFees}$`}</p>
              </div>
              <div>
                <p className="font-medium text-primary">Stipend/Coverage:</p>
                <p className="text-accent-content">{scholarship.stipend}$ per month</p>
              </div>
            </div>

            {/* Apply Button */}
            <div className="text-center mt-6">
              <button
                className="px-5 py-2.5 rounded-lg font-semibold shadow-soft bg-primary text-white transition-colors duration-300 ease-linear hover:bg-accent hover:text-primary"
                onClick={() => window.location.href = "/checkout"} // Redirect to checkout/payment
              >
                Apply for Scholarship
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </Container>
  );
};

export default ScholarshipDetail;
