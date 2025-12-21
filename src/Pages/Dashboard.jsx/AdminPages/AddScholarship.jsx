import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import PageTitle from "../../../Utilities/PageTitle";
import SectionTitle from "../../../Utilities/SectionTitle";
import { motion } from "framer-motion";

const AddScholarship = () => {
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const addScholarshipMutation = useMutation({
    mutationFn: async (scholarshipData) => {
      const res = await axiosSecure.post("/scholarships", scholarshipData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success!", "Scholarship added successfully", "success");
      queryClient.invalidateQueries(["scholarships"]);
      reset();
    },
    onError: () => {
      Swal.fire("Error!", "Failed to add scholarship", "error");
    },
  });

  const onSubmit = (data) => {
    const scholarshipData = {
      scholarshipName: data.scholarshipName,
      universityName: data.universityName,
      universityImage: data.universityImage,
      universityCountry: data.universityCountry,
      universityCity: data.universityCity,
      universityWorldRank: data.universityWorldRank
        ? Number(data.universityWorldRank)
        : null,
      subjectCategory: data.subjectCategory,
      scholarshipCategory: data.scholarshipCategory,
      degree: data.degree,
      tuitionFees: data.tuitionFees ? Number(data.tuitionFees) : 0,
      applicationFees: Number(data.applicationFees),
      serviceCharge: Number(data.serviceCharge),
      applicationDeadline: data.applicationDeadline,
      scholarshipPostDate: new Date(),
      postedUserEmail: user.email,
      description: data.description,
      stipend: data.stipend ? Number(data.stipend) : 0,
    };

    addScholarshipMutation.mutate(scholarshipData);
  };

  const errorText = (msg) => (
    <p className="text-error text-sm mt-1">{msg}</p>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="sectionMargin lg:px-10"
    >
      <PageTitle title="Add Scholarship" />
      <SectionTitle sectionName="Add New Scholarship" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-xl shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Scholarship Name */}
        <div>
          <input
            {...register("scholarshipName", { required: "Scholarship name is required" })}
            placeholder="Scholarship Name"
            className="input input-bordered w-full"
          />
          {errors.scholarshipName && errorText(errors.scholarshipName.message)}
        </div>

        {/* University Name */}
        <div>
          <input
            {...register("universityName", { required: "University name is required" })}
            placeholder="University Name"
            className="input input-bordered w-full"
          />
          {errors.universityName && errorText(errors.universityName.message)}
        </div>

        {/* University Image */}
        <input
          {...register("universityImage")}
          placeholder="University Image URL"
          className="input input-bordered w-full"
        />

        {/* Country */}
        <div>
          <input
            {...register("universityCountry", { required: "Country is required" })}
            placeholder="Country"
            className="input input-bordered w-full"
          />
          {errors.universityCountry && errorText(errors.universityCountry.message)}
        </div>

        {/* City */}
        <div>
          <input
            {...register("universityCity", { required: "City is required" })}
            placeholder="City"
            className="input input-bordered w-full"
          />
          {errors.universityCity && errorText(errors.universityCity.message)}
        </div>

        {/* World Rank */}
        <input
          type="number"
          {...register("universityWorldRank")}
          placeholder="University World Rank (optional)"
          className="input input-bordered w-full"
        />

        {/* Subject Category */}
        <div>
          <input
            {...register("subjectCategory", { required: "Subject category is required" })}
            placeholder="Subject Category"
            className="input input-bordered w-full"
          />
          {errors.subjectCategory && errorText(errors.subjectCategory.message)}
        </div>

        {/* Scholarship Category */}
        <div>
          <input
            {...register("scholarshipCategory", { required: "Scholarship category is required" })}
            placeholder="Scholarship Category"
            className="input input-bordered w-full"
          />
          {errors.scholarshipCategory && errorText(errors.scholarshipCategory.message)}
        </div>

        {/* Degree */}
        <div>
          <select
            {...register("degree", { required: "Degree is required" })}
            className="select select-bordered w-full p-0! pl-4! h-10"
          >
            <option value="">Select Degree</option>
            <option value="Diploma">Diploma</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Masters">Masters</option>
            <option value="PhD">PhD</option>
          </select>
          {errors.degree && errorText(errors.degree.message)}
        </div>

        {/* Tuition Fees */}
        <input
          type="number"
          {...register("tuitionFees")}
          placeholder="Tuition Fees (optional)"
          className="input input-bordered w-full"
        />

        {/* Application Fees */}
        <div>
          <input
            type="number"
            {...register("applicationFees", { required: "Application fees is required" })}
            placeholder="Application Fees"
            className="input input-bordered w-full"
          />
          {errors.applicationFees && errorText(errors.applicationFees.message)}
        </div>

        {/* Service Charge */}
        <div>
          <input
            type="number"
            {...register("serviceCharge", { required: "Service charge is required" })}
            placeholder="Service Charge"
            className="input input-bordered w-full"
          />
          {errors.serviceCharge && errorText(errors.serviceCharge.message)}
        </div>

        {/* Deadline */}
        <div>
          <input
            type="date"
            {...register("applicationDeadline", { required: "Deadline is required" })}
            className="input input-bordered w-full"
          />
          {errors.applicationDeadline && errorText(errors.applicationDeadline.message)}
        </div>

        {/* Stipend */}
        <input
          type="number"
          {...register("stipend")}
          placeholder="Monthly Stipend (optional)"
          className="input input-bordered w-full"
        />

        {/* Description */}
        <div className="md:col-span-2">
          <textarea
            {...register("description", { required: "Description is required" })}
            placeholder="Scholarship Description"
            className="textarea textarea-bordered w-full h-28"
          />
          {errors.description && errorText(errors.description.message)}
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={addScholarshipMutation.isPending}
            className="inline-flex justify-center items-center gap-2 px-5 py-2.5 w-full rounded-lg font-semibold shadow-soft bg-primary text-white transition-colors duration-300 ease-linear hover:bg-accent hover:text-primary"
          >
            {addScholarshipMutation.isPending ? "Adding..." : "Add Scholarship"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddScholarship;
