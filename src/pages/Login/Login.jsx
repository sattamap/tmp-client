import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthProvider';
import { useForm } from 'react-hook-form';
import GoogleLogin from '../../components/GoogleLogin';

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard/';

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          title: 'Login Successfully',
          showClass: 'animate__animated animate__fadeInUp',
          hideClass: 'animate__animated animate__fadeOutDown',
        });

        navigate(from, { replace: true });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center md:text-left mb-8">
            <h4 className="text-4xl font-bold mb-4">Welcome Back!</h4>
            <p className="text-base">
              Log in to access your personalized dashboard and manage your tasks with ease. Your journey with our application continues here.
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    {...register('email', { required: true })}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    {...register('password', { required: true })}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700"
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
            <p className="text-center mt-3 text-sm">
              New Here? <Link to="/register" className="text-blue-500">Create an account</Link>
            </p>
            {/* Include your GoogleLogin component here */}
            <div className="divider">OR</div>
            <GoogleLogin></GoogleLogin>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
