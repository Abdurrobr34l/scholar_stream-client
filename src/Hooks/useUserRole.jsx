import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useUserRole = (email) => {
  const axiosSecure = useAxios();

  const { data, isLoading } = useQuery({
    queryKey: ["userRole", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${email}`);
      return res.data.role;
    },
  });

  return {
    role: data,
    loading: isLoading,
  };
};

export default useUserRole;
