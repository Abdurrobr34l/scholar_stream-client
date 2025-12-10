import React from "react";
import Container from "../../../Utilities/Container";
import SectionTitle from "../../../Utilities/SectionTitle";
import { motion } from "framer-motion";
import PrimaryButton from "../../../Utilities/PrimaryButton";

const fakeScholarships = [
  {
    _id: 1,
    title: "Global Excellence Scholarship",
    university: "Harvard University",
    fee: "$50",
    deadline: "Dec 31, 2025",
    description: "Persons Wishing to Apply Must: Be an African American Citizen of the United States or Canada; Be enrolled or accepted by ALA-accredited..."
  },
  {
    _id: 2,
    title: "STEM Innovators Grant",
    university: "MIT",
    fee: "$0",
    deadline: "Jan 15, 2026",
    description: "Persons Wishing to Apply Must: Be an African American Citizen of the United States or Canada; Be enrolled or accepted by ALA-accredited..."
  },
  {
    _id: 3,
    title: "Arts & Culture Scholarship",
    university: "Oxford University",
    fee: "$20",
    deadline: "Feb 28, 2026",
    description: "Persons Wishing to Apply Must: Be an African American Citizen of the United States or Canada; Be enrolled or accepted by ALA-accredited..."
  },
  {
    _id: 4,
    title: "Leadership Scholarship",
    university: "Stanford University",
    fee: "$30",
    deadline: "Mar 10, 2026",
    description: "Persons Wishing to Apply Must: Be an African American Citizen of the United States or Canada; Be enrolled or accepted by ALA-accredited..."
  },
  {
    _id: 5,
    title: "Women in Science Grant",
    university: "Cambridge University",
    fee: "$0",
    deadline: "Apr 5, 2026",
    description: "Persons Wishing to Apply Must: Be an African American Citizen of the United States or Canada; Be enrolled or accepted by ALA-accredited..."
  },
  {
    _id: 6,
    title: "Global Peace Scholarship",
    university: "Yale University",
    fee: "$25",
    deadline: "May 1, 2026",
    description: "Persons Wishing to Apply Must: Be an African American Citizen of the United States or Canada; Be enrolled or accepted by ALA-accredited..."
  },
];

const TopScholarships = () => {
  return (
    <section className="sectionPadding">
      <Container>
        <SectionTitle sectionName={<>Top <span className="text-accent-content">Scholarships</span></>} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {fakeScholarships.map(({ _id, title, university, fee, deadline, description }, index) => (
            <motion.div
              key={_id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}      // triggers animation when in viewport
              viewport={{ once: true, amount: 0.3 }} // animate once, when 30% visible
              transition={{ duration: 0.45, delay: index * 0.15 }}
              className="relative px-2 py-3 rounded-2xl bg-white overflow-hidden hover:shadow-xl transition-all"
            >

              {/* Decorative Top Wave */}
              <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-accent-content to-primary"></div>

              {/* Floating Chip Badge */}
              <div className="absolute right-4 top-3">
                <span className="px-3 py-1 rounded-full text-xs bg-primary text-white shadow">
                  #{index + 1}
                </span>
              </div>

              {/* Content */}
              <div className="p-4 space-y-4 md:p-6">

                {/* Title */}
                <h3 className="text-xl font-bold text-primary leading-snug md:text-2xl xl:text-3xl">
                  {title}
                </h3>

                {/* University */}
                <p className="text-md text-accent-content font-bold">
                  {university}
                </p>

                {/* Fee*/}
                <div className="border-t border-dashed border-slate-300 pt-4 grid grid-cols-2 gap-y-2 text-sm">
                  <h4 className="text-xl font-semibold">Fee: <span>{fee}</span></h4>
                </div>

                {/* Description */}
                <div>
                  <p>{description}</p>
                </div>

                {/* Deadline */}
                <div className="text-start">
                  <h5 className="font-semibold text-error!">Deadline: <span>{deadline}</span></h5>
                </div>

                {/* CTA */}
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