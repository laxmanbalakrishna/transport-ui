import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-2">
      {" "}
      {/* Reduced padding */}
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start">
        {/* Company Info */}
        <div className="flex-1 text-center md:text-left mb-2 md:mb-0">
          {" "}
          {/* Reduced margin-bottom */}
          <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 text-xl font-bold tracking-wide">
            B Transport Company
          </h3>
          <p className="text-gray-400 text-xs mt-1">
            Delivering excellence, one mile at a time.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex-1 text-center md:text-center mb-2 md:mb-0">
          {" "}
          {/* Reduced margin-bottom */}
          <h4 className="font-bold mb-1 text-sm text-green-400">Quick Links</h4>
          <ul className="space-y-1">
            <li>
              <Link href="/about" className="hover:text-gray-300 text-xs">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-gray-300 text-xs">
                Services
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-300 text-xs">
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                href="/privacy-policy"
                className="hover:text-gray-300 text-xs"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="flex-1 text-center md:text-right">
          <h4 className="font-bold mb-1 text-sm text-green-400">
            Get in Touch
          </h4>
          <p className="text-gray-200 text-xs">
            1234 Transport Lane
            <br />
            City, State, 12345
          </p>
          <p className="text-gray-100 mt-1 text-xs">
            Email: info@btransport.com
            <br />
            Phone: +1 (555) 123-4567
          </p>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-4 pt-2 text-center text-gray-400 text-xs">
        &copy; {new Date().getFullYear()} B Transport Company. All rights
        reserved.
      </div>
    </footer>
  );
}
