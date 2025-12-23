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
      // Step 1: Firebase popup
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      // Step 2: Send token to backend for verification
      const response = await axios.post(`${BASE_URL}/auth/google`, {
        idToken,
      });

      // Step 3: Store backend token and user info
      const { token, user } = response.data;
      dispatch(setCredentials({ user, token }));
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Step 4: Navigate to home
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
            className="mt-6 flex items-center justify-center bg-white text-black px-6 py-2 rounded shadow"
          >
            {/*             <img src={google} alt="Google Icon" className="w-5 h-5 mr-2" />
             */}{" "}
            Log in with Google
          </button>

          <button
            onClick={handleFacebookLogin}
            className="mt-6 flex items-center justify-center bg-white text-black px-6 py-2 rounded shadow"
          >
            {/*             <img src={google} alt="Google Icon" className="w-5 h-5 mr-2" />
             */}{" "}
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
