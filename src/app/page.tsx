"use client";

import { motion } from "framer-motion";
import SearchForm from "@/components/search-form";
import FleetSection from "@/components/fleet-section";
import ServicesSection from "@/components/services-section";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col">
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex-grow"
      >
        {/* Hero Section */}
        <section className="relative h-[32vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">
          <motion.div
            className="absolute inset-0"
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
              className="object-center mt-16"
            />
          </motion.div>
        </section>

        {/* Search Form Section */}
        <motion.section
          className=" px-4 bg-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="max-w-7xl mx-auto">
            <SearchForm />
          </div>
        </motion.section>

        {/* Fleet Section */}
        <motion.section
          className="py-12 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div className="max-w-7xl mx-auto">
            <FleetSection />
          </div>
        </motion.section>

        {/* Services Section */}
        <motion.section
          className="py-12 px-4 bg-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <div className="max-w-7xl mx-auto">
            <ServicesSection />
          </div>
        </motion.section>
      </motion.main>
    </div>
  );
}
