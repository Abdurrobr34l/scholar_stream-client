import React from "react";
import Container from "../../../Utilities/Container";
import { motion } from "framer-motion";
import PrimaryButton from "../../../Utilities/PrimaryButton";
import heroImage from "../../../assets/hero-image.png";
import heroImageBG from "../../../assets/hero-image-bg.svg";
import { FaBook, FaGlobe, FaTrophy } from "react-icons/fa";

const HeroSection = () => {

  return (
    <section className="relative bg-[#0f172a] text-white">
      <Container>
        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-[#0f172a]/80 to-[#2563eb]/50"></div>

        <div className="relative flex flex-col-reverse items-center gap-10 mx-auto py-20 xl:py-32 lg:flex-row">
          {/* Hero Content */}
          <motion.div
            className="flex-1"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="mb-6 text-4xl font-bold text-white! leading-tight md:text-5xl lg:text-6xl">
              Find Your Dream <span className="text-accent-content">Scholarship</span>
            </h1>
            <p className="mb-8 text-lg md:text-xl">
              ScholarStream connects students with scholarship opportunities worldwide.
              Discover, apply, and make your higher education dreams a reality.
            </p>

            <PrimaryButton
              path="/all-scholarships"
              buttonName="Search Scholarships"
              customStyling="bg-accent! hover:bg-primary! hover:text-white!"
            />
          </motion.div>

          {/* Hero Image */}
          <motion.div className="relative flex-1">

            {/* Floating Icon 1 - Graduation */}
            <motion.div
              className="absolute top-12 left-2 z-20"
              animate={{ y: [0, -15, 0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0 }}
              whileHover={{ scale: 1.2, rotate: 10 }}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-12 h-12"
                aria-hidden="true"
              >
                <path d="M22 12L12 7L2 12L12 17L22 12Z" />
                <path d="M6 15V18C6 18 8 20 12 20C16 20 18 18 18 18V15" />
              </svg>
            </motion.div>

            {/* Floating Icon 2 - Book */}
            <motion.div
              className="absolute bottom-10 left-10 z-20"
              animate={{ x: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              whileHover={{ scale: 1.2, rotate: 10 }}
            >
              <FaBook className="w-8 h-8 opacity-80 text-accent-content" aria-hidden="true" />
            </motion.div>

            {/* Floating Icon 3 - Trophy */}
            <motion.div
              className="absolute top-20 right-1 z-20"
              animate={{ y: [0, -25, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              whileHover={{ scale: 1.2, rotate: 10 }}
            >
              <FaTrophy className="w-8 h-8 opacity-80 text-accent-content" aria-hidden="true" />
            </motion.div>

            {/* Floating Icon 4 - Globe */}
            <motion.div
              className="absolute bottom-0 right-10 z-20"
              animate={{ x: [0, 10, 0, -10, 0], y: [0, -10, -20, -10, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
              whileHover={{ scale: 1.2, rotate: 10 }}
            >
              <FaGlobe className="w-8 h-8 opacity-80 text-accent-content" aria-hidden="true" />
            </motion.div>

            <motion.div
              className="relative flex-1"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: [50, 0], opacity: [0, 1] }}
              transition={{ duration: 2 }}
            >
              {/* Background Circle */}
              <motion.img
                src={heroImageBG}
                alt=""
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[380px] lg:h-[480px]"
                animate={{ rotate: [0, 15, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Main Hero Image */}
              <motion.img
                src={heroImage}
                alt="Scholarship Banner"
                className="relative rounded-full w-full h-[350px] z-10 object-cover lg:h-[450px]"
              />
            </motion.div>

          </motion.div>

        </div>
      </Container>
    </section >
  );
};

export default HeroSection;
