import React from "react";
import { motion } from "framer-motion";
import Container from "../../../Utilities/Container";
import PrimaryButton from "../../../Utilities/PrimaryButton";
import heroImage from "../../../assets/hero-image.png";
import heroImageBG from "../../../assets/hero-image-bg.svg";

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
<div className="relative flex-1">

  {/* Floating Icon 1 */}
  <motion.div
    className="absolute top-10 left-5 z-20"
    animate={{ y: [0, -15, 0] }}
    transition={{ duration: 4, repeat: Infinity }}
  >
    <img src="/icons/graduation.svg" className="w-10 opacity-80" />
  </motion.div>

  {/* Floating Icon 2 */}
  <motion.div
    className="absolute bottom-10 left-20 z-20"
    animate={{ y: [0, 20, 0] }}
    transition={{ duration: 5, repeat: Infinity }}
  >
    <img src="/icons/book.svg" className="w-8 opacity-80" />
  </motion.div>

  {/* Floating Icon 3 */}
  <motion.div
    className="absolute top-24 right-10 z-20"
    animate={{ y: [0, -25, 0] }}
    transition={{ duration: 6, repeat: Infinity }}
  >
    <img src="/icons/trophy.svg" className="w-9 opacity-80" />
  </motion.div>

  {/* Floating Icon 4 */}
  <motion.div
    className="absolute bottom-14 right-24 z-20"
    animate={{ y: [0, 18, 0] }}
    transition={{ duration: 5.5, repeat: Infinity }}
  >
    <img src="/icons/globe.svg" className="w-8 opacity-80" />
  </motion.div>

  {/* Background Circle */}
  <img
    src={heroImageBG}
    alt=""
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[380px] lg:h-[480px]"
  />

  {/* Main Hero Image */}
  <motion.img
    src={heroImage}
    alt="Scholarship Banner"
    className="relative rounded-full w-full h-[350px] z-10 object-cover lg:h-[450px] xl:h-[500px]"
    initial={{ x: 50, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.6 }}
  />
</div>



        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
