import React, { useContext } from 'react';
import PageTitle from '../../Utilities/PageTitle';
import SectionTitle from '../../Utilities/SectionTitle';
import Container from '../../Utilities/Container';
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from '../../Context/AuthContext';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await signInUser(data.email, data.password);

      toast.success('Logged successful!');
      navigate('/');
    } catch (error) {
      toast.error(error.message);
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
      <PageTitle title="Login" />

      <Container>
        {/* Title */}
        <div className="text-center">
          <SectionTitle customStyle="mb-3!" sectionName="Login Now" />

          <h3 className="mb-6 text-2xl font-semibold">
            Login to your <span className="text-accent-content">ScholarStream</span> account
          </h3>
        </div>

        {/* Form Card */}
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className="text-error text-sm">{errors.email.message}</p>}

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p className="text-error text-sm">{errors.password.message}</p>}

            <button
              type="submit"
              className='inline-flex justify-center items-center gap-2 mb-2 px-5 py-2.5 rounded-lg font-semibold shadow-soft bg-primary text-white transition-colors duration-300 ease-linear hover:bg-accent hover:text-primary'>Login</button>
          </form>

          {/* OR Divider */}
          <div className="text-center">
            <p className="text-sm">OR</p>

            <button
              onClick={handleGoogleLogin}
              className='inline-flex items-center justify-center gap-2 mt-2 px-5 py-2.5 w-full rounded-lg font-semibold border border-primary text-primary bg-white transition-colors duration-300 ease-linear 
        hover:bg-accent-content hover:text-white hover:border-accent-content'>
              <FcGoogle /> Login with Google
            </button>
          </div>

          {/* Link to Register */}
          <p className="mt-4 text-center text-sm">
            Don’t have an account?{' '}
            <a href="/register" className="text-accent font-semibold hover:underline">
              Register
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
};

export default Login;
