import PageTitle from "../../Utilities/PageTitle";
import SectionTitle from "../../Utilities/SectionTitle";
import Container from "../../Utilities/Container";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxios from "../../Hooks/useAxios";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Register = () => {
  const {
    registerUser,
    updateUserProfile,
    signInWithGoogle,
    logOut,
    setUser,
    setPreventAutoLogin,
  } = useAuth();

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const axiosSecure = useAxios();
  const navigate = useNavigate();

  // ============================================
  // REGISTER WITH EMAIL & PASSWORD
  // ============================================
  const onSubmit = async (data) => {
    const { name, email, password, photo } = data;

    try {
      // BLOCK auto-login from Firebase
      setPreventAutoLogin(true);

      const userCredential = await registerUser(email, password);
      const user = userCredential.user;

      let photoURL = "";

      // Upload profile photo (if any)
      if (photo && photo[0]) {
        const file = photo[0];
        const formData = new FormData();
        formData.append("image", file);

        const imgbbURL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`;

        const imgRes = await axios.post(imgbbURL, formData);
        photoURL = imgRes.data.data.url;
      }

      // Update Firebase profile
      await updateUserProfile({ displayName: name, photoURL });

      // Save user to database
      const userInfo = {
        uid: user.uid,
        name,
        email,
        photoURL,
        role: "Student",
        createdAt: new Date(),
      };
      await axiosSecure.post("/users", userInfo);

      // LOG OUT — force user to be logged out after register
      await logOut();
      setUser(null);
      setPreventAutoLogin(false);

      toast.success("Registration successful! Please log in.");
      reset();
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      setPreventAutoLogin(false);
    }
  };

  // ============================================
  // REGISTER WITH GOOGLE
  // ============================================
  const handleGoogleLogin = async () => {
    try {
      // BLOCK auto-login
      setPreventAutoLogin(true);

      const userCredential = await signInWithGoogle();
      const user = userCredential.user;

      const userInfo = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: "Student",
        createdAt: new Date(),
      };

      await axiosSecure.post("/users", userInfo);

      await logOut();
      setUser(null);
      setPreventAutoLogin(false);

      toast.success("Google registration successful! Please log in.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      setPreventAutoLogin(false);
    }
  };

  return (
    <section className="sectionPadding">
      <PageTitle title="Register" />

      <Container>
        <div className="text-center">
          <SectionTitle customStyle="mb-3!" sectionName="Register Now" />
          <h3 className="mb-3 text-2xl font-semibold">
            Create your <span className="text-accent-content">ScholarStream</span> account
          </h3>
          <p className="mx-auto mb-6 max-w-xl">
            Unlock personalized scholarship matches and take the next step toward your education goals.
          </p>
        </div>

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

            {/* Photo */}
            <input
              type="file"
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
              className="inline-flex justify-center items-center gap-2 mt-2 px-5 py-2.5 rounded-lg font-semibold shadow-soft bg-primary text-white transition-colors hover:bg-accent hover:text-primary"
            >
              Register
            </button>

            <p className="-my-2 text-sm text-center">OR</p>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 w-full rounded-lg font-semibold border border-primary text-primary bg-white transition-colors hover:bg-accent-content hover:text-white"
            >
              <FcGoogle /> Register with Google
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
