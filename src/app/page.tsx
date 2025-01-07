"use client";

import { motion } from "framer-motion";
import Header from "@/components/header";
import SearchForm from "@/components/search-form";
import FleetSection from "@/components/fleet-section";
import ServicesSection from "@/components/services-section";
import Footer from "@/components/footer";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" flex flex-col">
      <Header />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        {/* Background image with parallax effect */}
        <motion.div
          className="relative inset-0 top-16 sm:top-20"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/background.jpeg"
            alt="Background"
            width={1920}
            height={1080}
            priority
            className="object-fill w-full h-full"
          />
        </motion.div>

        {/* Content */}
        <div className="relative px-2 pb-1">
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

      <div className="flex-grow mt-20">
        <SearchForm />
        <FleetSection />
        <ServicesSection />
      </div>
      <Footer />
    </div>
  );
}
