// import React, { useState } from 'react';
import useAllScholarships from '../../Hooks/useAllScholarships';
import LoadingSpinner from '../../Utilities/LoadingSpinner';
import PageTitle from '../../Utilities/PageTitle';
import Container from '../../Utilities/Container';
import SectionTitle from '../../Utilities/SectionTitle';
import { useState } from 'react';
import { motion } from "framer-motion";
import PrimaryButton from '../../Utilities/PrimaryButton';
import { Link } from 'react-router';

const AllScholarship = () => {
  const { data, isLoading, error } = useAllScholarships();

  const [searchedText, setSearchedText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState("");

  let filterOptions = {
    "All Scholarships": [],
    "Scholarship Category": [],
    "Subject Category": [],
    "Location": [],
  };

  if (data) {
    data.forEach(item => {
      // Scholarship Category
      if (
        item.scholarshipCategory &&
        !filterOptions["Scholarship Category"].includes(item.scholarshipCategory)
      ) {
        filterOptions["Scholarship Category"].push(item.scholarshipCategory);
      }

      // Subject Category
      if (
        item.subjectCategory &&
        !filterOptions["Subject Category"].includes(item.subjectCategory)
      ) {
        filterOptions["Subject Category"].push(item.subjectCategory);
      }

      // Location
      const location = `${item.universityCity}, ${item.universityCountry}`;
      if (!filterOptions["Location"].includes(location)) {
        filterOptions["Location"].push(location);
      }
    });
  }

  const filteredScholarships = data?.filter(item => {
    const searchMatch =
      item.scholarshipName.toLowerCase().includes(searchedText.toLowerCase()) ||
      item.universityName.toLowerCase().includes(searchedText.toLowerCase()) ||
      item.scholarshipCategory.toLowerCase().includes(searchedText.toLowerCase()) ||
      item.universityCountry?.toLowerCase().includes(searchedText.toLowerCase()) ||
      item.universityCity?.toLowerCase().includes(searchedText.toLowerCase()) ||
      item.degree.toLowerCase().includes(searchedText.toLowerCase());

    const filterMatch =
      selectedFilter === "" ||
      item.scholarshipCategory === selectedFilter ||
      item.subjectCategory === selectedFilter ||
      `${item.universityCity}, ${item.universityCountry}` === selectedFilter;

    return searchMatch && filterMatch;
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p>Failed to load data</p>;

  return (
    <section className="sectionPadding">
      <Container>
        <PageTitle title="All Scholarships" />

        <div className="flex flex-col pb-6 md:flex-row md:justify-between">
          <SectionTitle
            sectionName={`Total Scholarships: ${filteredScholarships.length}`}
            customStyle="text-start md:text-3xl!"
          />

          <div className="flex flex-col gap-4 md:flex-row">
            {/* Search */}
            <input
              type="text"
              placeholder="Search..."
              className="input input-bordered lg:w-[260px]"
              onChange={(e) => setSearchedText(e.target.value)}
            />

            {/* Custom Select Filter */}
            <div className="relative lg:w-[260px]">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center border border-gray-300 px-4 py-2 rounded-md bg-white"
              >
                <span>{selectedFilter || "Filter By"}</span>
                <span>▾</span>
              </button>

              {isOpen && (
                <div className="absolute top-12 left-0 w-full bg-white border shadow-lg z-50">
                  {Object.keys(filterOptions).map(group => (
                    <div
                      key={group}
                      className="relative border-b"
                      onMouseEnter={() => setActiveGroup(group)}
                    >
                      {/* Filter Name */}
                      <div onClick={() => {
                        if (group === "All Scholarships") {
                          setSelectedFilter("");
                          setIsOpen(false);
                          setActiveGroup("")
                        }
                      }} className="px-4 py-2 font-semibold cursor-pointer hover:bg-primary hover:text-white flex justify-between">
                        {group}
                        <span>›</span>
                      </div>

                      {/* Filter Options */}
                      {activeGroup === group && (
                        <div className="absolute top-0 right-full w-56 bg-white border shadow-lg">
                          {filterOptions[group].map(option => (
                            <div
                              key={option}
                              className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-white"
                              onClick={() => {
                                setSelectedFilter(option);
                                setIsOpen(false);
                                setActiveGroup("");
                              }}
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scholarship Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredScholarships.length > 0 ? (
            filteredScholarships.map(
              (
                {
                  _id,
                  universityName,
                  universityImage,
                  universityCity,
                  universityCountry,
                  scholarshipCategory,
                  applicationFees,
                },
                index
              ) => (
                <motion.div
                  key={_id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: index * 0.15 }}
                  className="overflow-hidden relative rounded-2xl bg-white shadow-xl"
                >
                  <div className="absolute bottom-0 left-0 w-full h-2 bg-linear-to-r from-primary to-accent-content"></div>

                  <div className="absolute right-4 top-3">
                    <span className="px-3 py-1 rounded-full text-xs bg-primary text-white">
                      #{index + 1}
                    </span>
                  </div>

                  <div>
                    <div className="w-full h-48 overflow-hidden rounded-t-2xl">
                      <Link to={`/all-scholarships/${_id}`}>
                        <img
                          src={universityImage}
                          alt={universityName}
                          className="w-full h-full object-cover hover:scale-105 transition"
                        />
                      </Link>
                    </div>

                    <div className="p-4 md:px-6 md:pb-5">
                      <h3 className="text-xl font-bold text-primary md:text-2xl">
                        {universityName}
                      </h3>

                      <p className="font-bold">
                        Category:
                        <span className="text-accent-content"> {scholarshipCategory}</span>
                      </p>

                      <p className="font-semibold pt-2">
                        Application Fees:
                        <span className="text-secondary pl-1">
                          {applicationFees ? `$${applicationFees}` : "Free"}
                        </span>
                      </p>

                      <p className="font-semibold">
                        Location:
                        <span className="text-secondary pl-1">
                          {universityCity}, {universityCountry}
                        </span>
                      </p>

                      <div className="pt-3">
                        <PrimaryButton
                          path={`/all-scholarships/${_id}`}
                          buttonName="View Details"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            )
          ) : (
            <SectionTitle
              sectionName="No scholarships found"
              customStyle="text-center col-span-12 text-gray-500"
            />
          )}
        </div>
      </Container>
    </section>
  );
};

export default AllScholarship;
