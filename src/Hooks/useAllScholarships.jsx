import React from 'react';
import useAxios from './useAxios';
import { useQuery } from '@tanstack/react-query';

const useAllScholarships = () => {
const axiosSecure = useAxios();

  return useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      const result = await axiosSecure.get("/scholarships");
      return result.data;
    },
  });
};

export default useAllScholarships;