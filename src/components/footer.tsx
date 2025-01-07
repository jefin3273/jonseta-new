// import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Main Grid for Footer Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Image
              src="/Jonseta.png"
              alt="Jonseta"
              width={150}
              height={40}
              className="h-auto w-auto"
            />
            <p className="text-sm">
              We are Jonseta Corp, a fleet management business providing
              comprehensive vehicle management solutions for companies and their
              employees.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/locations"
                  className="hover:text-white transition-colors"
                >
                  Locations
                </Link>
              </li>
              <li>
                <Link
                  href="/vehicles"
                  className="hover:text-white transition-colors"
                >
                  Vehicle Fleet
                </Link>
              </li>
              <li>
                <Link
                  href="/offers"
                  className="hover:text-white transition-colors"
                >
                  Special Offers
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/faq"
                  className="hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>201/A, Kailas Esplanade, LBS Marg</li>
              <li>Opp. Shreyas, Ghatkopar (W) </li>
              <li>Mumbai, Maharashtra, India 400086 </li>
              <li>
                <a
                  href="tel:7897898943"
                  className="hover:text-white transition-colors"
                >
                  +91 7897898943
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@Jonseta.com"
                  className="hover:text-white transition-colors"
                >
                  contact@Jonseta.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Jonseta. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
