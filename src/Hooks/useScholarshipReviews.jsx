import React from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useScholarshipReviews = (scholarshipId) => {
  const axiosSecure = useAxios();

  return useQuery({
    queryKey: ["reviews", scholarshipId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${scholarshipId}`);
      return res.data;
    },
    enabled: !!scholarshipId,
  });
};

export default useScholarshipReviews;
