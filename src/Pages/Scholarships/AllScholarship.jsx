import React, { useState } from 'react';
import useAllScholarships from '../../Hooks/useAllScholarships';
import LoadingSpinner from '../../Utilities/LoadingSpinner';
import Container from '../../Utilities/Container';
import PageTitle from '../../Utilities/PageTitle';
import SectionTitle from '../../Utilities/SectionTitle';
import { motion } from "framer-motion";
import PrimaryButton from '../../Utilities/PrimaryButton';
import { Link } from 'react-router';

const AllScholarship = () => {
  const { data, isLoading, error } = useAllScholarships();
  const [searchedText, setSearchedText] = useState("");

  const filteredScholarships = data?.filter(scholarship => {
    return (
      scholarship.universityName.toLowerCase().includes(searchedText.toLowerCase()) ||
      scholarship.scholarshipCategory.toLowerCase().includes(searchedText.toLowerCase()) ||
      scholarship.universityCity?.toLowerCase().includes(searchedText.toLowerCase()) ||
      scholarship.universityCountry?.toLowerCase().includes(searchedText.toLowerCase())
    );
  });


  if (isLoading) return <LoadingSpinner />;
  if (error) return <p>Failed to load data</p>;

  return (
    <section className='sectionPadding'>
      <Container>
        <PageTitle title={"All Scholarships"} />

        <div className='flex justify-between'>
          <SectionTitle sectionName={`Total Scholarships: ${filteredScholarships.length}`} customStyle={"text-start"}></SectionTitle>

          <div className='flex gap-4'>
            {/* Search */}
            <input onChange={(e) => setSearchedText(e.target.value)} type="text" placeholder="Search..." className="input input-bordered" />

            {/* Filter */}
            <select defaultValue="Filter By:" className="select p-0! pl-3!">
              <option disabled={true}>Filter By:</option>
              <option>Scholarship Category</option>
              <option>Subject Category</option>
              <option>Location</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {
            filteredScholarships.length > 0
              ?
              (
                filteredScholarships.map(({ _id, universityName, universityImage, universityCity, universityCountry, scholarshipCategory, applicationFees }, index) => (
                  <motion.div
                    key={_id}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}      // triggers animation when in viewport
                    viewport={{ once: true, amount: 0.3 }} // animate once, when 30% visible
                    transition={{ duration: 0.45, delay: index * 0.15 }}
                    className="overflow-hidden relative rounded-2xl bg-white shadow-xl hover:shadow-none transition-all duration-300 ease-linear"
                  >

                    {/* Decorative Top Wave */}
                    <div className="absolute bottom-0 left-0 w-full h-2 bg-linear-to-r from-primary to-accent-content"></div>

                    {/* Floating Chip Badge */}
                    <div className="absolute right-4 top-3">
                      <span className="px-3 py-1 rounded-full text-xs bg-primary text-white shadow">
                        #{index + 1}
                      </span>
                    </div>

                    {/* Content */}
                    <div>

                      {/* University Image */}
                      <div className="w-full h-48 overflow-hidden rounded-t-2xl">
                        <Link to={`/all-scholarships/${_id}`}>
                          <img
                            src={universityImage}
                            alt={universityName}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </Link>
                      </div>

                      {/* Content */}
                      <div className="p-4 md:px-6 md:pb-5">
                        {/* University Name */}
                        <h3 className="text-xl font-bold text-primary md:text-2xl">
                          {universityName}
                        </h3>

                        {/* Scholarship Category */}
                        <p className="text-md text-primary font-bold pb-4">
                          Category: <span className='text-accent-content'>{scholarshipCategory}</span>
                        </p>

                        {/* Application Fees */}
                        <div className="border-t border-dashed border-slate-300 pt-4 text-sm">
                          <p className="text-base font-semibold text-primary">
                            Application Fees:
                            <span className='pl-1 text-secondary'>
                              {applicationFees ? `$${applicationFees}` : "Free"}
                            </span>
                          </p>
                        </div>

                        {/* Location */}
                        <p className="text-base font-semibold text-primary">
                          Location:
                          <span className='pl-1 text-secondary'>
                            {universityCity}, {universityCountry}
                          </span>
                        </p>

                        {/* View Details Button */}
                        <div className="pt-3">
                          <PrimaryButton
                            path={`/all-scholarships/${_id}`}
                            buttonName="View Details"
                            customStyling="bg-primary text-white hover:bg-accent-content rounded-lg px-4 py-2"
                          />
                        </div>
                      </div>
                    </div>

                  </motion.div>
                )
                )
              )
              :
              (
                <SectionTitle sectionName={"No scholarships found"} customStyle="text-center col-span-12 text-lg! text-gray-500 mt-12" />
              )
          }
        </div>
      </Container>
    </section>
  );
};

export default AllScholarship;