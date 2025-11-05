import { React, useState, useEffect } from "react";
import image from "../assets/image.png";
import Navbar from "../Components/Navbar";
import Gallery from "../Components/Gallery";
import abtvideo from "../assets/video.mp4";
import Footer from "../Components/Footer";
import { Star, Gift, BookOpen, Cpu, PenTool } from "lucide-react";
import {
  Icon,
  Shield,
  Award,
  Heart,
  Users,
  TrendingUp,
  CheckCircle,
} from "lucide-react";

const About = () => {
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/*  <Navbar /> */}

      {/* Hero Section */}
      <div
        className=" flex flex-col items-center justify-center bg-cover bg-center text-center"
      >
        <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center text-center">
          <h1 className="text-5xl font-extrabold m-6 text-orange-600 drop-shadow-md">
            About Return Treasure
          </h1>
          <p className="text-lg text-gray-800 max-w-3xl mb-10 leading-relaxed">
            Welcome to{" "}
            <span className="font-bold text-orange-500">Return Treasure</span>,
            your one-stop destination for the most delightful return gifts and
            toys for kids. We believe every celebration deserves a touch of joy
            — from playful soft toys to brain-boosting educational games. Our
            mission is to bring happiness to every child and a smile to every
            parent.
          </p>

          <div className="w-[80%] border-4 border-orange-200 rounded-2xl p-6 shadow-xl  backdrop-blur">
            <video
              src={abtvideo}
              className="w-full rounded-xl shadow-lg"
              autoPlay
              loop
              muted
              playsInline
              controls
            />
          </div>
        </div>

        {/* Story Section */}
        <section className="flex flex-col md:flex-row items-center justify-center my-20 px-8 md:px-20">
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-snug">
              Our Mission. <br />
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              At Return Treasure, we curate unique collections that spark
              imagination and happiness. Whether it's a birthday, a festival, or
              a classroom celebration — we make gifting simple, fun, and
              memorable with our wide range of child-safe, quality products. To
              provide high-quality, safe, and engaging toys that inspire
              creativity, support learning, and bring joy to children of all
              ages. We're committed to being a trusted partner for parents
              seeking products that truly make a difference in their child's
              development.
            </p>
            <button className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold text-lg shadow hover:bg-orange-600 transition-all">
              Explore Our Collection
            </button>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <img
              src={image}
              alt="Kids playing with toys"
              className="rounded-3xl shadow-2xl w-[90%] md:w-[80%] object-cover"
            />
          </div>
        </section>

        {/* Categories Section */}
        <section
          id="categories"
          className="animate-on-scroll py-16   text-center "
        >
          <div
            className={`transition-all duration-1000 ${
              isVisible.categories
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl font-bold md:text-5xl text-gray-900 mb-10">
              What We Offer ?
            </h2>
            <div className="grid md:grid-cols-4 gap-6 mx-8">
              {[
                {
                  icon: Shield,
                  title: "Safety First",
                  desc: "Every product rigorously tested and certified for child safety standards",
                },
                {
                  icon: Award,
                  title: "Premium Quality",
                  desc: "Handpicked items from trusted brands with proven durability",
                },
                {
                  icon: Heart,
                  title: "Curated Selection",
                  desc: "Expert-chosen toys that balance fun with developmental value",
                },

                {
                  icon: CheckCircle,
                  title: "Age-Appropriate",
                  desc: "Products matched to developmental stages for safe engagement",
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="bg-orange-50 rounded-xl p-6  transition-all"
                  >
                    <Icon className="w-12 h-12 text-orange-400 mb-4" />
                    <h3 className="text-gray-900 text-xl font-bold mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section
          id="testimonials"
          className="animate-on-scroll max-w-6xl mx-auto px-6 py-20"
        >
          <div
            className={`transition-all duration-1000 ${
              isVisible.testimonials
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                What People Say ?
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 ">
              {[
                {
                  name: "Priya Sharma",
                  text: "Return Treasure made my daughter’s birthday special! The gifts were adorable and high quality.",
                },
                {
                  name: "Rahul Verma",
                  text: "Amazing variety of educational toys. Perfect for classroom celebrations!",
                },
                {
                  name: "Sneha Patel",
                  text: "The return gifts were loved by all kids. Beautiful packaging and timely delivery!",
                },
              ].map((item, idx) => (
                <div key={idx} className="rounded-xl p-6 shadow-lg">
                  <div className="flex text-orange-500 mb-4 justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{item.text}"</p>
                  <p className="font-semibold text-gray-900">- {item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Gallery />
      </div>
    </>
  );
};

export default About;
