import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-16">
        {/* Main Grid for Footer Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
              {[
                "About Us",
                "Locations",
                "Vehicle Fleet",
                "Special Offers",
                "Blog",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {[
                "FAQ",
                "Contact",
                "Terms & Conditions",
                "Privacy Policy",
                "Careers",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item
                      .toLowerCase()
                      .replace(" & ", "-")
                      .replace(" ", "-")}`}
                    className="hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
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
        <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Jonseta. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
