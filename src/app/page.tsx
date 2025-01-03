"use client";

import { motion } from "framer-motion";
import Header from "@/components/header";
import SearchForm from "@/components/search-form";
import FleetSection from "@/components/fleet-section";
import ServicesSection from "@/components/services-section";
import Footer from "@/components/footer";
import Link from "next/link";

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
          className="absolute inset-0 bg-cover bg-center top-16"
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
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-4 py-6 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/bookings"
              className="hover:underline hover:scale-105 transition-transform"
            >
              My bookings →
            </Link>
            <Link
              href="/discount"
              className="hover:underline hover:scale-105 transition-transform"
            >
              Members&apos; Discount →
            </Link>
            <Link
              href="/deals"
              className="hover:underline hover:scale-105 transition-transform"
            >
              See all our deals →
            </Link>
            <Link
              href="/business"
              className="hover:underline hover:scale-105 transition-transform"
            >
              Go to Jonseta Business →
            </Link>
          </div>
        </motion.div>
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
