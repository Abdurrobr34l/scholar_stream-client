import React from "react";
import Container from "../../../Utilities/Container";
import SectionTitle from "../../../Utilities/SectionTitle";
import { motion } from "framer-motion";
import PrimaryButton from "../../../Utilities/PrimaryButton";

const ContactUs = () => {
  return (
    <section className="sectionPadding mt-8 bg-primary/5 md:mt-12 lg:mt-16 xl:mt-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}      // triggers animation when in viewport
          viewport={{ once: true, amount: 0.3 }} // animate once, when 30% visible
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >

          <SectionTitle sectionName={<>Get in <span className="text-accent-content">Touch</span></>} />

          <p className="text-secondary mt-4 mb-8">
            Have questions about scholarships, eligibility, or the application process?
            Our team is here to guide you every step of the way.
          </p>

          <PrimaryButton path="mailto:scholarstream.support@gmail.com" buttonName="Contact Us" customStyling="bg-accent! hover:bg-primary! hover:text-white!"/>

        </motion.div>
      </Container>
    </section>
  );
};

export default ContactUs;
