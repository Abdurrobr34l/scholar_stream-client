import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import { Link } from "react-router";

import useAllScholarships from "../../Hooks/useAllScholarships";
import LoadingSpinner from "../../Utilities/LoadingSpinner";
import PageTitle from "../../Utilities/PageTitle";
import Container from "../../Utilities/Container";
import SectionTitle from "../../Utilities/SectionTitle";
import PrimaryButton from "../../Utilities/PrimaryButton";

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

const AllScholarship = () => {
  const [searchedText, setSearchedText] = useState("");
  const [sortBy, setSortBy] = useState(""); // "applicationFees" or "createdAt"
  const [order, setOrder] = useState(""); // "asc" or "desc"
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const searchDebounced = useDebounce(searchedText, 500);
  const inputRef = useRef();

  const { data, isLoading, error } = useAllScholarships({
    search: searchDebounced,
    sortBy,
    order,
    page,
    limit,
  });

  const scholarships = data?.scholarships || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <section className="sectionPadding">
      <Container>
        <PageTitle title="All Scholarships" />

        <div className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-0 pb-6">
          <SectionTitle sectionName={`Total Scholarships: ${scholarships.length}`} customStyle="text-start md:text-3xl!" />

          <div className="flex flex-col md:flex-row gap-4 relative">
            {/* Search Input */}
            <input
              ref={inputRef}
              type="text"
              placeholder="Search scholarships..."
              className="input input-bordered lg:w-[260px]"
              value={searchedText}
              onChange={(e) => {
                setSearchedText(e.target.value);
                setPage(1);
              }}
            />
            {isLoading && <span className="absolute right-2 top-2"><LoadingSpinner size="sm" /></span>}

            {/* Sort Dropdown */}
            <div className="relative lg:w-[200px]">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="w-full flex justify-between items-center border border-gray-300 px-4 py-2 rounded-md bg-white"
              >
                <span>Sort</span>
                <span>▾</span>
              </button>

              {isSortOpen && (
                <div className="absolute top-12 left-0 w-full bg-white border shadow-lg z-50">
                  <div
                    className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-white"
                    onClick={() => {
                      setSortBy("applicationFees");
                      setOrder("asc");
                      setIsSortOpen(false);
                      setPage(1);
                    }}
                  >
                    Fees: Low → High
                  </div>
                  <div
                    className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-white"
                    onClick={() => {
                      setSortBy("applicationFees");
                      setOrder("desc");
                      setIsSortOpen(false);
                      setPage(1);
                    }}
                  >
                    Fees: High → Low
                  </div>
                  <div
                    className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-white"
                    onClick={() => {
                      setSortBy("createdAt");
                      setOrder("desc");
                      setIsSortOpen(false);
                      setPage(1);
                    }}
                  >
                    Newest First
                  </div>
                  <div
                    className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-white"
                    onClick={() => {
                      setSortBy("createdAt");
                      setOrder("asc");
                      setIsSortOpen(false);
                      setPage(1);
                    }}
                  >
                    Oldest First
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scholarship Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {isLoading ? (
            <div className="col-span-12 flex justify-center py-10"><LoadingSpinner size="lg" /></div>
          ) : scholarships.length > 0 ? (
            scholarships.map(
              (
                { _id, universityName, universityImage, universityCity, universityCountry, scholarshipCategory, applicationFees },
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
                    <span className="px-3 py-1 rounded-full text-xs bg-primary text-white">#{index + 1}</span>
                  </div>
                  <div>
                    <div className="w-full h-48 overflow-hidden rounded-t-2xl">
                      <Link to={`/all-scholarships/${_id}`}>
                        <img src={universityImage} alt={universityName} className="w-full h-full object-cover hover:scale-105 transition" />
                      </Link>
                    </div>
                    <div className="p-4 md:px-6 md:pb-5">
                      <h3 className="text-xl font-bold text-primary md:text-2xl">{universityName}</h3>
                      <p className="font-bold">
                        Category: <span className="text-accent-content"> {scholarshipCategory}</span>
                      </p>
                      <p className="font-semibold pt-2">
                        Application Fees: <span className="text-secondary pl-1">{applicationFees ? `$${applicationFees}` : "Free"}</span>
                      </p>
                      <p className="font-semibold">
                        Location: <span className="text-secondary pl-1">{universityCity}, {universityCountry}</span>
                      </p>
                      <div className="pt-3">
                        <PrimaryButton path={`/all-scholarships/${_id}`} buttonName="View Details" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            )
          ) : (
            <SectionTitle sectionName="No scholarships found" customStyle="text-center col-span-12 text-gray-500" />
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`px-3 py-1 rounded ${page === i + 1 ? "bg-primary text-white" : "bg-gray-200"}`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default AllScholarship;
