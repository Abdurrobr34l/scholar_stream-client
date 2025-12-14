import React from 'react';
import useAllScholarships from '../../Hooks/useAllScholarships';
import LoadingSpinner from '../../Utilities/LoadingSpinner';

const AllScholarship = () => {
  const { data, isLoading, error } = useAllScholarships();
  if (isLoading) return <LoadingSpinner />;
  if (error) return <p>Failed to load data</p>;

  return (
    <div>
      <h2>Total Scholarships: {data.length}</h2>
    </div>
  );
};

export default AllScholarship;