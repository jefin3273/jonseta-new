"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useUser } from "@clerk/nextjs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Building2,
  Users,
  UserCog,
  Map,
  Zap,
  Mail,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    title: "B2B Corporate Services",
    description:
      "Tailored solutions for businesses with comprehensive fleet management and corporate rates",
    icon: Building2,
    color: "bg-blue-500",
  },
  {
    title: "B2C Rental Services",
    description:
      "Flexible rental options for individuals with a wide range of vehicles to choose from",
    icon: Users,
    color: "bg-green-500",
  },
  {
    title: "Hire your Driver",
    description:
      "Professional chauffeur services for both business and leisure travel needs",
    icon: UserCog,
    color: "bg-purple-500",
  },
  {
    title: "Travel Planner",
    description:
      "Customized travel planning services to make your journey seamless and enjoyable",
    icon: Map,
    color: "bg-orange-500",
  },
  {
    title: "E-Vehicle Services",
    description:
      "Sustainable transportation solutions with our growing fleet of electric vehicles",
    icon: Zap,
    color: "bg-teal-500",
  },
];

export default function ServicesSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [modalOpen, setModalOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    service: "",
  });
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const openModal = (service: string) => {
    setSelectedService(service);
    setFormData({
      name: user?.fullName || "",
      mobile: user?.primaryPhoneNumber?.phoneNumber || "",
      email: user?.primaryEmailAddress?.emailAddress || "",
      service,
    });
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      console.log("Submitting form data:", formData);
      const response = await fetch("/api/submit-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Response body:", result);

      if (result.success) {
        toast({
          title: "Request Sent!",
          description: `We'll contact you soon about ${formData.service}.`,
        });
        setModalOpen(false);
      } else {
        throw new Error(
          result.message || "An error occurred while submitting the request."
        );
      }
    } catch (error) {
      console.error("Error sending request:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to send request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="py-24 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-gray-600">
            Comprehensive solutions for all your transportation needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-2">
                    <div
                      className={`p-2 rounded-lg ${service.color} text-white`}
                    >
                      <service.icon className="w-6 h-6" />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                  </div>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full"
                    onClick={() => openModal(service.title)}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Request Information
                    <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <Toaster />

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Service Request</DialogTitle>
          </DialogHeader>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Mobile</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Service</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              >
                {services.map((service) => (
                  <option key={service.title} value={service.title}>
                    {service.title}
                  </option>
                ))}
              </select>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Submit Request"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
