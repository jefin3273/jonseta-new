"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import Image from "next/image";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  service: z.enum([
    "Fleet Management",
    "Vehicle Maintenance",
    "Driver Services",
    "Business Solutions",
  ]),
  additionalDetails: z
    .string()
    .max(1000, "Additional details must be 1000 characters or less")
    .optional(),
});

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    service: "Fleet Management",
    additionalDetails: "",
  });
  const [errors, setErrors] = useState<z.ZodIssue[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors([]);

    try {
      const validatedData = contactSchema.parse(formData);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Success!",
          description: "Your message has been sent successfully.",
        });
        setFormData({
          name: "",
          email: "",
          mobile: "",
          service: "Fleet Management",
          additionalDetails: "",
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.errors);
      } else {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-10">
          {/* Left Column - Image and Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="/contact.avif" //add your image
                alt="Fleet Management"
                layout="fill"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
            </div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center space-x-4"
              >
                <Phone className="h-6 w-6 text-blue-500" />
                <p>+91 7897898943</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center space-x-4"
              >
                <Mail className="h-6 w-6 text-blue-500" />
                <p>contact@jonseta.com</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center space-x-4"
              >
                <MapPin className="h-6 w-6 text-blue-500" />
                <p>
                  201/A, Kailas Esplanade, LBS Marg
                  <br />
                  Mumbai, Maharashtra, India 400086
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm"
          >
            <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Input
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="bg-gray-700/50 border-gray-600"
                  />
                  {errors.find((e) => e.path[0] === "name") && (
                    <p className="text-red-500 text-sm">
                      {errors.find((e) => e.path[0] === "name")?.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="bg-gray-700/50 border-gray-600"
                  />
                  {errors.find((e) => e.path[0] === "email") && (
                    <p className="text-red-500 text-sm">
                      {errors.find((e) => e.path[0] === "email")?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData({ ...formData, mobile: e.target.value })
                  }
                  className="bg-gray-700/50 border-gray-600"
                />
                {errors.find((e) => e.path[0] === "mobile") && (
                  <p className="text-red-500 text-sm">
                    {errors.find((e) => e.path[0] === "mobile")?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Select
                  value={formData.service}
                  onValueChange={(value) =>
                    setFormData({ ...formData, service: value })
                  }
                >
                  <SelectTrigger className="bg-gray-700/50 border-gray-600">
                    <SelectValue placeholder="Select Service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fleet Management">
                      Fleet Management
                    </SelectItem>
                    <SelectItem value="Vehicle Maintenance">
                      Vehicle Maintenance
                    </SelectItem>
                    <SelectItem value="Driver Services">
                      Driver Services
                    </SelectItem>
                    <SelectItem value="Business Solutions">
                      Business Solutions
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.find((e) => e.path[0] === "service") && (
                  <p className="text-red-500 text-sm">
                    {errors.find((e) => e.path[0] === "service")?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Textarea
                  placeholder="Additional Details"
                  value={formData.additionalDetails}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      additionalDetails: e.target.value,
                    })
                  }
                  className="bg-gray-700/50 border-gray-600 min-h-[120px]"
                />
                {errors.find((e) => e.path[0] === "additionalDetails") && (
                  <p className="text-red-500 text-sm">
                    {
                      errors.find((e) => e.path[0] === "additionalDetails")
                        ?.message
                    }
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
