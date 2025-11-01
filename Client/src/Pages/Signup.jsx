import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
/* import axios from "axios";
import { BASE_URL } from "../Utils/urlconfig"; */
import { setCredentials } from "../redux/authSlice";
/*  import google from "../assets/login/google.svg";
 */
import auth from "../assets/auth.png";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    phoneNo: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Signup with Email & Password
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(formData);
      const response = await axios.post(`${BASE_URL}/auth/register`, formData);
      const { token, user } = response.data;

      // Store in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      dispatch(setCredentials({ user, token }));

      alert("Account created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Error creating account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      // Send the Google token to the backend
      const response = await axios.post(`${BASE_URL}/auth/google`, {
        idToken: idToken,
      });

      const { token, user } = response.data;

      // Store user data and token in Redux and local storage
      dispatch(setCredentials({ user, token }));
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("Google Sign-in successful!");
      navigate("/");
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
      alert("Google sign-in failed. Please try again.");
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 my-10 md:w-[60%] mx-auto w-[90%]">
        {/* Left Side - Signup Form */}
        <div className="flex flex-col justify-center items-center bg-orange-200 p-8 md:p-16 md:rounded-[0px] rounded-xl md:rounded-l-3xl">
          <h1 className="text-3xl font-semibold">Hi there!</h1>
          <p className="text-center text-sm mt-2">
            Welcome to Mumvets. Community Dashboard
          </p>

          {/* Google Sign-In Button */}
          <button
            onClick={handleGoogleSignIn}
            className="mt-6 flex items-center justify-center bg-white text-black px-6 py-2 rounded shadow"
          >
            {/*             <img src={google} alt="Google Icon" className="w-5 h-5 mr-2" />
             */}{" "}
            Sign up with Google
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
              type="text"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              placeholder="Your Phone No"
              className="w-full px-4 py-2 border rounded mb-2"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create Password"
              className="w-full px-4 py-2 border rounded mb-2"
              required
            />
            <button
              type="submit"
              className="mt-4 w-full bg-black text-white py-2 rounded"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-4 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Log in
            </Link>
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:block w-full h-full md:rounded-r-3xl">
          {
            <img
              src={auth}
              alt="Dog"
              className="w-full h-full  object-cover md:rounded-r-3xl"
            />
          }
        </div>
      </div>
    </div>
  );
};

export default Signup;
