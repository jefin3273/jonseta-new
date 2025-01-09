"use client";

import { motion } from "framer-motion";
import { Users, Shield, Truck, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const features = [
  {
    icon: Users,
    title: "Expert Team",
    description:
      "Our experienced team provides comprehensive fleet management solutions.",
  },
  {
    icon: Shield,
    title: "Reliable Service",
    description: "24/7 support and maintenance for your fleet operations.",
  },
  {
    icon: Truck,
    title: "Modern Fleet",
    description: "Access to a wide range of well-maintained vehicles.",
  },
  {
    icon: Award,
    title: "Quality Assured",
    description: "Certified processes and quality management systems.",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[60vh] flex items-center justify-center"
      >
        <div className="absolute inset-0">
          <Image
            src="/about.jpg" //add your image
            alt="Fleet Management"
            layout="fill"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6"
            {...fadeInUp}
          >
            Leading Fleet Management Solutions
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-8"
            {...fadeInUp}
            transition={{ delay: 0.2 }}
          >
            Providing comprehensive vehicle management solutions for companies
            and their employees
          </motion.p>
          <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Learn More
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Jonseta
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We provide end-to-end fleet management solutions that help
              businesses optimize their operations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm"
              >
                <feature.icon className="w-12 h-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-20 bg-blue-600"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Vehicles Managed" },
              { number: "1000+", label: "Happy Clients" },
              { number: "24/7", label: "Customer Support" },
              { number: "50+", label: "Cities Covered" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      {/* <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Leadership
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Meet the team behind Jonseta&apos;s success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800/50 rounded-xl overflow-hidden backdrop-blur-sm"
              >
                <div className="aspect-w-3 aspect-h-4">
                  <Image
                    src={`/team-member-${index + 1}.jpg`} //add your image
                    alt={`Team Member ${index + 1}`}
                    layout="fill"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">
                    Leadership Name
                  </h3>
                  <p className="text-gray-400 mb-4">Position</p>
                  <p className="text-sm text-gray-400">
                    Brief description about the team member and their role in
                    the company.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}
    </div>
  );
}
