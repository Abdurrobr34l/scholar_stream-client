import React, { useContext } from "react";
import PageTitle from "../../Utilities/PageTitle";
import SectionTitle from "../../Utilities/SectionTitle";
import Container from "../../Utilities/Container";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../Context/AuthContext";
import { useForm } from "react-hook-form";
import useAxios from "../../Hooks/useAxios";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Register = () => {
  const { registerUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const axiosSecure = useAxios();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { name, email, password, photo } = data;

    try {
      //* Register user with Firebase Auth
      const userCredential = await registerUser(email, password);
      const user = userCredential.user;

      let photoURL = "";

      //* Upload image if user selected one
      if (photo && photo[0]) {
        const file = photo[0];
        const formData = new FormData();
        formData.append("image", file);

        const imgbbURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`;
        const imgRes = await axios.post(imgbbURL, formData);
        photoURL = imgRes.data.data.url; // get uploaded image URL
      }

      //* Update Firebase profile
      await updateUserProfile({ displayName: name, photoURL });

      //* Save user to MongoDB via server
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


  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      toast.success('Google login successful!');
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className="sectionPadding">
      {/* Pagetitle */}
      <PageTitle title="Register" />

      <Container>
        {/* Title & Subtitle */}
        <div className="text-center">
          <SectionTitle customStyle="mb-3!" sectionName="Register Now" />
          <h3 className="mb-3 text-2xl font-semibold">
            Create your <span className="text-accent-content">ScholarStream</span> account
          </h3>
          <p className="mx-auto mb-6 max-w-xl">
            Unlock personalized scholarship matches and take the next step toward your education goals.
          </p>
        </div>

        {/* Form */}
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">

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
              className="input input-bordered w-full py-2!"
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

            <button
              type="submit"
              className='inline-flex justify-center items-center gap-2 mt-2 px-5 py-2.5 rounded-lg font-semibold shadow-soft bg-primary text-white transition-colors duration-300 ease-linear hover:bg-accent hover:text-primary'>Login</button>

            <p className="-my-2 text-sm text-center">OR</p>

            <button
              onClick={handleGoogleLogin}
              className='inline-flex items-center justify-center gap-2 px-5 py-2.5 w-full rounded-lg font-semibold border border-primary text-primary bg-white transition-colors duration-300 ease-linear 
                    hover:bg-accent-content hover:text-white hover:border-accent-content'>
              <FcGoogle /> Login with Google
            </button>

          </form>

          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-accent font-semibold hover:underline">
              Login
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
};

export default Register;
