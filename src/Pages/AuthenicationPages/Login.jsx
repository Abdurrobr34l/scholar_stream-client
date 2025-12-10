import React, { useContext } from 'react';
import PageTitle from '../../Utilities/PageTitle';
import { AuthContext } from '../../Context/AuthContext';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

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
    <section className="max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow-md">
      <PageTitle title="Login" />
      <h2 className="text-2xl font-semibold mb-6 text-primary text-center">
        Sign into your ScholarStream account
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <p className="text-error text-sm">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && <p className="text-error text-sm">{errors.password.message}</p>}

        <button type="submit" className="btn btn-accent mt-4">
          Login
        </button>
      </form>

      <div className="mt-4 text-center">
        <p>Or</p>
        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline mt-2"
        >
          Sign in with Google
        </button>
      </div>

      <p className="mt-4 text-center text-sm">
        Don't have an account?{' '}
        <a href="/register" className="text-accent font-semibold hover:underline">
          Register
        </a>
      </p>
    </section>
  );
};

export default Login;
