import React from "react";
import bg from "../assets/bg.png";
import Navbar from "../Components/Navbar";
import Gallery from "../Components/Gallery";
import Footer from "../Components/Footer";
const About = () => {
  return (
    <>
      <Navbar />
      <div
        className="min-h-screen flex flex-col items-center justify-centerp-8"
        style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-800">About Us</h1>

        <p className="text-lg text-gray-600 max-w-3xl text-center">
          Welcome to ToyEcom, your number one source for all things toys. We're
          dedicated to providing you the very best of toys, with an emphasis on
          quality, customer service, and uniqueness.
        </p>
        <div className="relative">
          {" "}
          <Gallery />
          <Footer />
        </div>
      </div>
    </>
  );
};
export default About;
