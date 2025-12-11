import React, { useContext } from 'react';
import PageTitle from '../../Utilities/PageTitle';
import { AuthContext } from '../../Context/AuthContext';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import Container from '../../Utilities/Container';
import SectionTitle from '../../Utilities/SectionTitle';
import PrimaryButton from '../../Utilities/PrimaryButton';
import SecondaryButton from '../../Utilities/SecondaryButton';
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await signInUser(data.email, data.password);
      toast.success('Login successful!');
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

            <PrimaryButton
              type="submit"
              buttonName="Login"
              customStyling="w-full justify-center mt-4"
            />
          </form>

          {/* OR Divider */}
          <div className="text-center mb-4">
            <p className="text-sm">OR</p>

            <SecondaryButton
              type="button"
              icon={FcGoogle}
              buttonName="Continue with Google"
              customStyling="w-full justify-center mt-3"
              onClick={handleGoogleLogin}
            />
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
