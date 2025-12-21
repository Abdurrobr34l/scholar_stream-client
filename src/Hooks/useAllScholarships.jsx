import React from 'react';
import useAxios from './useAxios';
import { useQuery } from '@tanstack/react-query';

const useAllScholarships = ({ search = "", category = "", country = "", sortBy = "", order = "", page = 1, limit = 10 } = {}) => {
  const axiosSecure = useAxios();

  return useQuery({
    queryKey: ["scholarships", { search, category, country, sortBy, order, page, limit }],
    queryFn: async () => {
      const params = new URLSearchParams({ search, category, country, sortBy, order, page, limit });
      const result = await axiosSecure.get(`/scholarships?${params.toString()}`);
      return result.data;
    },
    keepPreviousData: true,
  });
};

export default useAllScholarships;