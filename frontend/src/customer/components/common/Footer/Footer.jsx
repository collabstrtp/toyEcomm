import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faLinkedin,
  faWhatsapp,
  faYoutube, // Add this to the import
} from "@fortawesome/free-brands-svg-icons";
import api from "../../../../api/api";
import { Link } from "react-router-dom";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  /*  */

  return (
    <div className="bg-[#F94C10] text-white pt-12">
      <div className="px-12 lg:px-24 flex justify-between flex-col md:flex-row">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex flex-col sm:flex-row items-center mb-4">
              <img
                src="/src/assets/2.png"
                alt="Company Logo"
                className="h-20 sm:h-20 md:h-24 lg:h-28 mr-0 sm:mr-2"
              />
              <h1 className="text-3xl font-bold mt-2 sm:mt-0">@company</h1>
            </div>
            <p className="text-white mb-4 px-5 text-base">
              Your new handmade and artisan site has already been created!
            </p>
            <div className="text-white space-y-2 text-base mb-4 px-5">
              <p className="text-white">Email: info@company.com</p>
              <p className="text-white">Phone: +91 9456564735</p>
            </div>
            <div className="flex gap-4 mt-2 px-5 justify-center md:justify-start">
              {/* Social icons */}
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-pink-600 transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faInstagram} size="xl" />
              </a>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-500 transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faFacebook} size="xl" />
              </a>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-700 transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faLinkedin} size="xl" />
              </a>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-green-600 transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faWhatsapp} size="xl" />
              </a>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-red-600 transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faYoutube} size="xl" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col items-center text-center sm:grid sm:grid-cols-3 md:items-start md:text-left gap-8 md:gap-16 lg:mt-10">
          {/* About Us Section */}
          <div>
            <h1 className="text-xl font-bold mb-4 text-orange-50">About</h1>
            {/*   <div className="w-5 h-1 items-center bg-white"></div> */}
            <ul className="space-y-2">
              <li className="text-white hover:text-black transition-colors duration-300 text-base">
                <Link to="/about">About Us</Link>
              </li>
              {/* <li className="text-white hover:text-black transition-colors duration-300 text-sm">
                <Link to="/services">Our Services</Link>
              </li> */}
              <li className="text-white hover:text-black transition-colors duration-300 text-base">
                <Link to="/team">Our Team</Link>
              </li>
              <li className="text-white hover:text-black transition-colors duration-300 text-base">
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h1 className="text-xl font-bold mb-4 text-orange-50">Legal</h1>
            <ul className="space-y-2">
              <li className="text-white hover:text-black transition-colors duration-300 text-base">
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li className="text-white hover:text-black transition-colors duration-300 text-base">
                <Link to="/terms">Terms & Conditions</Link>
              </li>
              {/* <li className="text-white hover:text-black transition-colors duration-300 text-sm">
                <Link to="/discounts">Discounts</Link>
              </li> */}
              {/* <li className="text-white hover:text-black transition-colors duration-300 text-sm">
                <Link to="/returns">Returns</Link>
              </li> */}
            </ul>
          </div>

          {/* Location Section */}
          <div>
            <h1 className="text-xl font-bold mb-4 text-orange-50">Locations</h1>
          </div>
        </div>

        {/* Location Section for mobile is now unified above */}
      </div>
      {/* Footer Bottom */}
      <div className="bg-[#F94C10] mt-4  text-sm px-6 md:px-16 lg:px-28">
        <div className="flex flex-col lg:flex-row items-center md:items-start justify-center sm:justify-start pb-6 ">
          <p className="text-white font-bold text-center lg:text-left">
            Powered By{" "}
            <a href="https://company.com" target="_blank">
              Company
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
