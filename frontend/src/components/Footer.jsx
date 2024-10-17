import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* Left-Section */}
        <div>
          <img className="mb-5 w-32" src={assets.logo_radiance} alt="" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Radiance Clinic is a leading U.S.-based healthcare facility
            dedicated to providing exceptional patient care through cutting-edge
            techniques and state-of-the-art medical technology.
          </p>
        </div>
        {/* Center-Section */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        {/* Right-Section */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+1-212-456-7890</li>
            <li>radiance@gmail.com</li>
          </ul>
        </div>
      </div>
      {/* Copyright Text */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center ">
          Copyright © 2024 Radiance - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
