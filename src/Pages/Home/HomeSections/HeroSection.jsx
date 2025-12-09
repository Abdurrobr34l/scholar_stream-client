import React from "react";
import { motion } from "framer-motion";
import Container from "../../../Utilities/Container";
import PrimaryButton from "../../../Utilities/PrimaryButton";
import heroImage from "../../../assets/banner-image.avif";

const HeroSection = () => {
  
  return (
    <section className="relative bg-[#0f172a] text-white">
      <Container>
        {/* Overlay / Background */}
        <div className="absolute inset-0 bg-linear-to-r from-[#0f172a]/80 to-[#2563eb]/50"></div>

        <div className="relative flex flex-col items-center gap-10 mx-auto px-4 py-32 lg:flex-row">
          {/* Left Content */}
          <motion.div
            className="flex-1"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="mb-6 text-4xl font-bold text-white! leading-tight md:text-5xl lg:text-6xl">
              Find Your Dream Scholarship
            </h1>
            <p className="text-lg md:text-xl mb-8">
              ScholarStream connects students with scholarship opportunities worldwide.
              Discover, apply, and make your higher education dreams a reality.
            </p>

            <PrimaryButton
              path="/all-scholarships"
              buttonName="Search Scholarships"
              customStyling="bg-accent! hover:bg-primary! hover:text-white!"
            />
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="flex-1"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={heroImage}
              alt="Scholarship Banner"
              className="w-full rounded-xl shadow-lg object-cover"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
