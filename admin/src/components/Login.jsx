import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../features/authSlice";
import { toast, Zoom } from "react-toastify";
import logo from "../assets/logo.png";

const Login = () => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    number: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      const response = await dispatch(loginUser(formData));
      console.log("Login response:", response);

      if (response.payload && response.payload.success) {
        const { user, token } = response.payload;
        localStorage.setItem("token", token);
        toast.success(`Welcome ${user.name}!`, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/admin");
      } else if (response.payload && response.payload.needsEmailVerification) {
        toast.warning("Please verify your email address first.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Zoom,
        });
      } else if (response.payload && response.payload.needsPhoneVerification) {
        toast.warning("Please verify your phone number first.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Zoom,
        });
      } else {
        const errorMessage =
          response.payload?.message ||
          "Login failed. Please check your credentials.";
        toast.error(errorMessage, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Zoom,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login. Please try again.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Zoom,
      });
    }
  };

  const register = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.number
    ) {
      toast.error("Please fill in all fields", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    try {
      // Add role: admin for admin panel registration
      const registerData = {
        ...formData,
        role: "admin",
      };

      const response = await dispatch(registerUser(registerData));
      console.log("Register response:", response);

      if (response.payload && response.payload.success) {
        const { user, token } = response.payload;
        localStorage.setItem("token", token);
        toast.success(`Welcome ${user.name}! Account created successfully!`, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/admin");
      } else {
        const errorMessage =
          response.payload?.message || "Registration failed. Please try again.";
        toast.error(errorMessage, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Zoom,
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred during registration. Please try again.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Zoom,
      });
    }
  };

  return (
    <section className="pt-36 pb-24 max_padd_container h-screen flexCenter text-white flex-col bg-black">
      <div className="max-w-[555px]  bg-[#ffffff4e] m-auto px-14 py-10 rounded-md">
        <div className="flex justify-center items-center">
          <img src={logo} className="w-[60px]" />
        </div>
        <h3 className="font-anta h3 text-center">
          {isRegisterMode ? "Admin Registration" : "Admin Login"}
        </h3>
        <div className="flex flex-col gap-4 mt-7">
          {isRegisterMode && (
            <>
              <input
                name="name"
                value={formData.name}
                onChange={changeHandler}
                type="text"
                placeholder="Full Name..."
                className="h-14 w-full pl-5 bg-slate-900/30 outline-none rounded-xl placeholder-white"
              />
              <input
                name="number"
                value={formData.number}
                onChange={changeHandler}
                type="tel"
                placeholder="Phone Number..."
                className="h-14 w-full pl-5 bg-slate-900/30 outline-none rounded-xl placeholder-white"
              />
            </>
          )}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Email..."
            className="h-14 w-full pl-5 bg-slate-900/30 outline-none rounded-xl placeholder-white"
          />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="password"
            className="h-14 w-full pl-5 bg-slate-900/30 outline-none rounded-xl placeholder-white"
          />
        </div>
        <button
          onClick={() => (isRegisterMode ? register() : login())}
          disabled={status === "loading"}
          className="btn_dark_rounded my-5 w-full !rounded-md"
        >
          {status === "loading"
            ? "Please wait..."
            : isRegisterMode
              ? "Register as Admin"
              : "Login"}
        </button>

        <div className="flexCenter mb-2 gap-3">
          {isRegisterMode ? (
            <p className="text-white">
              Already have an account?{" "}
              <span
                className="text-blue-400 cursor-pointer underline"
                onClick={() => setIsRegisterMode(false)}
              >
                Login here
              </span>
            </p>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <p className="text-white text-sm">
                Don't have an admin account?{" "}
                <span
                  className="text-blue-400 cursor-pointer underline"
                  onClick={() => setIsRegisterMode(true)}
                >
                  Register here
                </span>
              </p>
              <p className="text-white">
                To continue, Login with the ADMIN credentials!{" "}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
