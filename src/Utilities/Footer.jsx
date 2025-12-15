import React from "react";
import Container from "./Container";
import { Link } from "react-router";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="pt-10 pb-5 bg-primary text-white ">
      <Container>
        
        {/* Logo + Social Section */}
        <div className="flex flex-col items-center gap-4">
          
          {/* Logo */}
          <Logo />

          {/* Social Media Icons */}
          <div className="flex gap-4 text-xl">
            <Link to="/" className="text-2xl transition-colors duration-300 ease-linear hover:text-accent">
              <FaFacebook />
            </Link>
            <Link to="/" className="text-2xl transition-colors duration-300 ease-linear hover:text-accent">
              <BsTwitterX />
            </Link>
            <Link to="/" className="text-2xl transition-colors duration-300 ease-linear hover:text-accent">
              <FaInstagram />
            </Link>
            <Link to="/" className="text-2xl transition-colors duration-300 ease-linear hover:text-accent">
              <FaLinkedin />
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="divider mt-6 mb-3 before:bg-white after:bg-white"></div>

        {/* Copyright Section */}
        <p className="text-center text-sm text-white">
          © {new Date().getFullYear()} <span className="text-accent">ScholarStream</span> — All rights reserved.
        </p>

      </Container>
    </footer>
  );
};

export default Footer;
