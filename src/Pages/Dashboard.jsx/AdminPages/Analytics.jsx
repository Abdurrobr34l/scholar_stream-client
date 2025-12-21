import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import PageTitle from "../../../Utilities/PageTitle";
import SectionTitle from "../../../Utilities/SectionTitle";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import LoadingSpinner from "../../../Utilities/LoadingSpinner";

const Analytics = () => {
  const axiosSecure = useAxios();

  const { data: stats = {}, isLoading: statsLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  const { data: chartData = [], isLoading: chartLoading } = useQuery({
    queryKey: ["applications-by-category"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/analytics/applications-by-category"
      );
      return res.data;
    },
  });

  if (statsLoading || chartLoading) {
    return <LoadingSpinner/>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="sectionMargin lg:px-10"
    >
      <PageTitle title="Admin Analytics" />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-3xl font-bold text-primary">
            {stats.totalUsers}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 text-center">
          <h3 className="text-lg font-semibold">Total Scholarships</h3>
          <p className="text-3xl font-bold text-primary">
            {stats.totalScholarships}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 text-center">
          <h3 className="text-lg font-semibold">Total Fees Collected</h3>
          <p className="text-3xl font-bold text-primary">
            ${stats.totalFeesCollected}
          </p>
        </div>
      </div>

      {/* Chart */}
      <SectionTitle sectionName="Applications by Scholarship Category" />

      <div className="bg-white rounded-xl shadow p-6 h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#0f172a" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default Analytics;
