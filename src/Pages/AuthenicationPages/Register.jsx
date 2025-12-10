import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import useAxios from "../../Hooks/useAxios";
import { AuthContext } from "../../Context/AuthContext";
import PageTitle from "../../Utilities/PageTitle";
import SectionTitle from "../../Utilities/SectionTitle";
import axios from "axios";

const Register = () => {
  const { registerUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxios();

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

const onSubmit = async (data) => {
  const { name, email, password, photo } = data;

  try {
    // 1️⃣ Register user with Firebase Auth
    const userCredential = await registerUser(email, password);
    const user = userCredential.user;

    let photoURL = "";

    // 2️⃣ Upload image if user selected one
    if (photo && photo[0]) {
      const file = photo[0];
      const formData = new FormData();
      formData.append("image", file);

      const imgbbURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`;
      const imgRes = await axios.post(imgbbURL, formData);
      photoURL = imgRes.data.data.url; // get uploaded image URL
    }

    // 3️⃣ Update Firebase profile
    await updateUserProfile({ displayName: name, photoURL });

    // 4️⃣ Save user to MongoDB via server
    const userInfo = {
      uid: user.uid,
      name,
      email,
      photoURL,
      role: "Student",
      createdAt: new Date(),
    };

    const res = await axiosSecure.post("/users", userInfo);
    if (res.data.insertedId || res.data.message === "User Exists") {
      toast.success("Registration successful!");
    }

    reset();
    navigate("/login");
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      toast.error("This email is already registered!");
    } else if (error.code === "auth/invalid-email") {
      toast.error("Please enter a valid email address.");
    } else if (error.code === "auth/weak-password") {
      toast.error("Your password is too weak.");
    } else {
      toast.error("Registration failed. Please try again.");
    }
  }
};


  return (
    <section className="sectionPadding">
      <SectionTitle sectionName={<>Register <span className="text-accent-content">Now</span></>} />

      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <PageTitle title="Register" />


        <h2 className="text-2xl font-semibold mb-6 text-primary text-center">
          Create your <span className="text-accent-content">ScholarStream</span> account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="input input-bordered w-full"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-error text-sm">{errors.name.message}</p>}

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="text-error text-sm">{errors.email.message}</p>}

          {/* Photo URL */}
          <input
            type="file"
            placeholder="Photo URL (optional)"
            className="input input-bordered w-full"
            {...register("photo")}
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password (min 6 chars, capital letter, number, special char)"
            className="input input-bordered w-full"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                message: "Include uppercase, lowercase, number & special char",
              },
            })}
          />
          {errors.password && <p className="text-error text-sm">{errors.password.message}</p>}

          <button type="submit" className="btn btn-accent mt-4">
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-accent font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </section>
  );
};

export default Register;
