import React from "react";
import Container from "../../../Utilities/Container";
import SectionTitle from "../../../Utilities/SectionTitle";
import { motion } from "framer-motion";
import useAllScholarships from "../../../Hooks/useAllScholarships";
import PrimaryButton from "../../../Utilities/PrimaryButton";
import LoadingSpinner from "../../../Utilities/LoadingSpinner";

const TopScholarships = () => {
  const { data, isLoading, error } = useAllScholarships();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p>Failed to load data</p>;

  // Ensure data is an array
  const scholarships = Array.isArray(data) ? data : data?.scholarships || [];

  if (scholarships.length === 0) {
    return (
      <section className="sectionPadding">
        <Container>
          <SectionTitle sectionName={<>Top <span className="text-accent-content">Scholarships</span></>} />
          <p className="text-center mt-6">No scholarships available.</p>
        </Container>
      </section>
    );
  }

  return (
    <section className="sectionPadding">
      <Container>
        <SectionTitle sectionName={<>Top <span className="text-accent-content">Scholarships</span></>} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {scholarships.slice(0, 6).map(({ _id, scholarshipName, universityName, applicationFees, applicationDeadline }, index) => (
            <motion.div
              key={_id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.15 }}
              className="relative px-2 py-3 rounded-2xl bg-white overflow-hidden hover:shadow-xl transition-all duration-300 ease-linear"
            >

              {/* Decorative Top Wave */}
              <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-primary to-accent-content"></div>

              {/* Floating Chip Badge */}
              <div className="absolute right-4 top-3">
                <span className="px-3 py-1 rounded-full text-xs bg-primary text-white shadow">
                  #{index + 1}
                </span>
              </div>

              {/* Content */}
              <div className="p-4 space-y-4 md:p-6">

                <h3 className="text-xl font-bold text-primary leading-snug md:text-2xl xl:text-3xl">
                  {scholarshipName}
                </h3>

                <p className="text-md text-accent-content font-bold">
                  {universityName}
                </p>

                <div className="border-t border-dashed border-slate-300 pt-4 grid grid-cols-2 gap-y-2 text-sm">
                  <h4 className="text-xl font-semibold">Fee: <span className="text-accent-content">{applicationFees}</span></h4>
                </div>

                <div className="text-start">
                  <h5 className="font-semibold text-error!">Deadline: <span>{applicationDeadline}</span></h5>
                </div>

                <div className="pt-2">
                  <PrimaryButton
                    path={`all-scholarships/${_id}`}
                    buttonName="View Details"
                    customStyling="bg-primary! text-white! hover:bg-accent-content! rounded-lg"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <PrimaryButton
            path="/all-scholarships"
            buttonName="All Scholarships"
            customStyling="bg-accent! hover:bg-primary! hover:text-white!"
          />
        </div>
      </Container>
    </section>
  );
};

export default TopScholarships;
