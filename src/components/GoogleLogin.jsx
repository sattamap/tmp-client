import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";

const GoogleLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      console.log(result.user);
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
        status: 'active',
      };
      axiosPublic.post('/users', userInfo).then((res) => {
        console.log(res.data);
        navigate('/');
      });
    });
  };

  return (
    <div className="p-2">

      <div className="mt-4">
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center gap-4 w-full bg-blue-500 text-white rounded-md p-3 hover:bg-blue-600 focus:outline-none"
        >
          <FaGoogle />
          <span>Google</span>
        </button>
      </div>
    </div>
  );
};

export default GoogleLogin;
