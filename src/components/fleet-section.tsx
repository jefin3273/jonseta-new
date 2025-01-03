"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

const fleetData = [
  {
    title: "Luxury",
    description:
      "You can choose from a wide range of luxury vehicles made by legendary manufacturers",
    image: "/fleet/luxury-car.jpg",
    link: "/fleet/luxury",
  },
  {
    title: "Van & Truck",
    description:
      "You're looking for a van or 4x4 for your business or leisure trip, or a van or truck for a job ?",
    image: "/fleet/van-truck.jpg",
    link: "/fleet/van-truck",
  },
  {
    title: "City car",
    description:
      "These range from compact and fuel-efficient city to eco-friendly model",
    image: "/fleet/city-car.jpg",
    link: "/fleet/city-car",
  },
];

export default function FleetSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-24 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            A fleet that meets your needs
          </h2>
          <p className="text-xl text-gray-600">
            Take the opportunity to test the new models
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {fleetData.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <Link
                  href={item.link}
                  className="inline-block text-green-600 hover:text-green-700 font-medium transition-colors"
                >
                  See more
                </Link>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative h-48 md:h-64 overflow-hidden rounded-lg shadow-lg"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
