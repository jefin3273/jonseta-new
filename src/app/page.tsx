"use client";

import { motion } from "framer-motion";
import Header from "@/components/header";
import SearchForm from "@/components/search-form";
import FleetSection from "@/components/fleet-section";
import ServicesSection from "@/components/services-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative min-h-screen"
      >
        {/* Background image with parallax effect */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center top-16 sm:top-20"
          style={{
            backgroundImage: "url('/background.jpeg')",
          }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        />

        {/* Content */}
        <div className="relative pt-32 px-4 pb-32">
          {" "}
          {/* Added pb-32 for extra space at the bottom */}
          <div className="max-w-7xl mx-auto space-y-12">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            ></motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="my-10"
            ></motion.div>
          </div>
        </div>
        {/* Footer links */}
      </motion.div>

      <div className="flex-grow">
        <SearchForm />
        <FleetSection />
        <ServicesSection />
      </div>
      <Footer />
    </div>
  );
}
