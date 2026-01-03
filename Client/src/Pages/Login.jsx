import { Link } from "react-router-dom";
import { setCredentials } from "../redux/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authimg from "../assets/authimg.png";
import axios from "axios";
import { BASE_URL } from "../Utils/urlconfig";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, facebookProvider } from "../Utils/firebase";
import { Facebook, FacebookIcon } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(formData);
      const response = await axios.post(`${BASE_URL}/auth/login`, formData);
      const { token, user } = response.data;
      console.log(response.data);
      dispatch(setCredentials({ user, token }));

      alert("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      const response = await axios.post(`${BASE_URL}/auth/google`, {
        idToken,
      });

      const { token, user } = response.data;
      console.log("Google Auth Response:", response.data);
      dispatch(setCredentials({ user, token }));
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("✅ Google sign-in successful!");
      navigate("/");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("❌ Google sign-in failed. Please try again.");
    }
  };

  // const handleFacebookSignIn = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, facebookProvider);
  //     const idToken = await result.user.getIdToken();

  //     const response = await axios.post(`${BASE_URL}/auth/facebook`, {
  //       idToken,
  //     });

  //     const { token, user } = response.data;
  //     dispatch(setCredentials({ user, token }));
  //     localStorage.setItem("token", token);
  //     localStorage.setItem("user", JSON.stringify(user));

  //     alert("✅ Facebook sign-in successful!");
  //     navigate("/");
  //   } catch (error) {
  //     console.error("Facebook Sign-In Error:", error);
  //     alert("❌ Facebook sign-in failed. Please try again.");
  //   }
  // };

  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      console.log("Facebook User:", result.user);
    } catch (error) {
      console.error("Facebook login error:", error);
    }
  };
  const handleForgotPasswordClick = () => {
    navigate("/resetpassword");
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 my-10 md:w-[60%] mx-auto w-[90%]">
        {/* Left Side - Login Form */}
        <div className="flex flex-col justify-center items-center bg-orange-200 p-8 md:p-16 md:rounded-[0px] rounded-xl md:rounded-l-3xl">
          <h1 className="text-3xl font-semibold">Hi there !</h1>
          <p className="text-center text-sm mt-2">
            Welcome to Mumvets. Community Dashboard
          </p>

          <button
            onClick={handleGoogleLogin}
            className="mt-6 flex items-center justify-center bg-white text-black px-6 py-2 gap-3 rounded shadow"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.74 1.22 9.27 3.6l6.9-6.9C35.9 2.36 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l8.05 6.26C12.56 13.72 17.82 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.5 24.5c0-1.64-.15-3.22-.43-4.75H24v9h12.7c-.55 2.97-2.21 5.49-4.7 7.19l7.26 5.63c4.24-3.9 6.24-9.65 6.24-16.07z"
              />
              <path
                fill="#FBBC05"
                d="M10.61 28.48c-.48-1.45-.76-2.99-.76-4.48s.27-3.03.76-4.48l-8.05-6.26C.92 16.36 0 20.04 0 24c0 3.96.92 7.64 2.56 10.74l8.05-6.26z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.9-2.13 15.87-5.81l-7.26-5.63c-2.02 1.35-4.6 2.14-8.61 2.14-6.18 0-11.44-4.22-13.39-9.98l-8.05 6.26C6.51 42.62 14.62 48 24 48z"
              />
            </svg>
            Log in with Google
          </button>

          <button
            onClick={handleFacebookLogin}
            className="mt-6 gap-2 flex items-center justify-center bg-white text-black px-4 py-2 rounded shadow"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="22"
              height="22"
            >
              <path
                fill="#1877F2"
                d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.23 2.68.23v2.96h-1.51c-1.49 0-1.95.93-1.95 1.88v2.26h3.32l-.53 3.49h-2.79V24C19.61 23.09 24 18.1 24 12.07z"
              />
            </svg>
            Log in with facebook
          </button>

          <div className="flex items-center w-full my-4">
            <hr className="flex-grow border-gray-400" />
            <span className="mx-2 text-sm">or</span>
            <hr className="flex-grow border-gray-400" />
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full px-4 py-2 border rounded mb-2"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded mb-2"
              required
            />
            <span
              onClick={handleForgotPasswordClick}
              className="text-sm text-blue-600 cursor-pointer"
            >
              Forgot password?
            </span>

            <button
              type="submit"
              className="mt-4 w-full bg-black text-white py-2 rounded"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <p className="mt-4 text-sm">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600">
              Sign up
            </Link>
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:block w-full h-full md:rounded-r-3xl">
          {
            <img
              src={authimg}
              alt="Dog"
              className="w-full h-full object-cover object-center md:rounded-r-3xl"
            />
          }
        </div>
      </div>
    </div>
  );
};

export default Login;
