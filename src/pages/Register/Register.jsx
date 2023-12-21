import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';




const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const validatePasswordMatch = (value) => {
    const password = watch('password');
    return password === value || 'Passwords do not match';
  };

  const onSubmit = async (data) => {
    try {
      const imageFile = { image: data.image[0] };
      const imgbbResponse = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      });

      if (!imgbbResponse.data || imgbbResponse.data.status !== 200) {
        throw new Error('Failed to upload image to imgbb');
      }

      const imgbbImageLink = imgbbResponse.data.data.url;


      const authResult = await createUser(data.email, data.password); // Store the hashed password
      const loggedUser = authResult.user;
      console.log(loggedUser);
      await updateUserProfile(data.name, imgbbImageLink);

      if (data.password !== data.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const userInfo = {
        name: data.name,
        email: data.email,
        photoURL: imgbbImageLink,
      };

      const mongoDbResponse = await axiosPublic.post('/users', userInfo);

      if (!mongoDbResponse.data || !mongoDbResponse.data.insertedId) {
        throw new Error('Failed to create user in MongoDB');
      }

      reset();

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'User created successfully',
        showConfirmButton: false,
        timer: 1500,
      });

      navigate('/');
    } catch (error) {
      console.error(error.message);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to create user. Please try again.',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:text-4xl text-2xl text-center mb-3">
            <h1>Sign Up now!</h1>
            <p className="text-base mb-3">
              Embark on your journey to a healthier future by creating an account! Sign up today to unlock personalized diagnostic services, expert healthcare updates, and a seamless experience tailored just for you.
            </p>
          </div>
          <div className="md:w-96 w-full">
            <div className="card bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name', { required: true })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs italic mt-1">This field is required</p>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    {...register('email', { required: true })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs italic mt-1">This field is required</p>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
                    Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    {...register('image', { required: true })}
                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {errors.image && (
                    <p className="text-red-500 text-xs italic mt-1">This field is required</p>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    {...register('password', {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                      pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]/,
                    })}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs italic mt-1">
                      {errors.password?.type === 'required' && 'Password is required'}
                      {errors.password?.type === 'minLength' && 'Password must be 6 characters'}
                      {errors.password?.type === 'maxLength' && 'Password must be less than 20 characters'}
                      {errors.password?.type === 'pattern' && 'Password must have an uppercase, a lowercase, and a special character'}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    {...register('confirmPassword', {
                      required: true,
                      validate: validatePasswordMatch,
                    })}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs italic mt-1">
                      {errors.confirmPassword?.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
                >
                  Sign Up
                </button>
              </form>
              <p className="text-center mt-3">
                Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
