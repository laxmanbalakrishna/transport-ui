import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen">
      {/* Hero Section */}
      {/* Update with your image name at background image */}
      <section
        className="relative bg-cover bg-center h-screen"
        style={{
          backgroundImage: "url('/Logo.jpg')",
          backgroundSize: "cover", // Ensures the image covers the entire section
          backgroundPosition: "center", // Center the image in the section
          backgroundRepeat: "no-repeat", // Prevents the image from repeating
          backgroundColor: "#f0f4f8", // Light background color
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.6)", // Light semi-transparent overlay
          }}
        ></div>
        <div className="container mx-auto flex flex-col justify-center items-center h-full text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4 drop-shadow-lg">
            Welcome to B Transport Company
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 drop-shadow-md">
            Delivering excellence, one mile at a time.
          </p>
          <Link
            href="/services"
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 shadow-lg"
          >
            Our Services
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto py-12 px-6">
        <div className="flex flex-col md:flex-row items-center md:space-x-8">
          <div className="md:w-1/2">
            <Image
              src="/Logo.jpg"
              alt="About Us"
              width={500}
              height={300}
              className="rounded-md shadow-lg"
            />
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <h2 className="text-3xl font-semibold mb-4">About Us</h2>
            <p className="text-lg mb-4">
              B Transport Company has been a leader in the transport industry
              for over two decades. Our mission is to provide reliable and
              efficient transportation solutions for businesses of all sizes.
              Whether you need to move goods across the country or just across
              town, we&apos;re here to help.
            </p>
            <Link
              href="/about"
              className="text-blue-600 font-semibold hover:underline"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-100 rounded-md shadow-lg">
              <h3 className="text-xl font-bold mb-4">Freight Transportation</h3>
              <p className="mb-4">
                We provide fast and reliable freight transportation services to
                ensure your goods are delivered on time, every time.
              </p>
              <Link
                href="/services"
                className="text-blue-600 font-semibold hover:underline"
              >
                Read More
              </Link>
            </div>
            <div className="p-6 bg-gray-100 rounded-md shadow-lg">
              <h3 className="text-xl font-bold mb-4">Vehicle Installation</h3>
              <p className="mb-4">
                Our expert team can install tracking systems, communication
                devices, and more in your fleet vehicles.
              </p>
              <Link
                href="/services"
                className="text-blue-600 font-semibold hover:underline"
              >
                Read More
              </Link>
            </div>
            <div className="p-6 bg-gray-100 rounded-md shadow-lg">
              <h3 className="text-xl font-bold mb-4">Logistics Management</h3>
              <p className="mb-4">
                We offer comprehensive logistics management services to optimize
                your supply chain operations.
              </p>
              <Link
                href="/services"
                className="text-blue-600 font-semibold hover:underline"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8">What Our Clients Say</h2>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6">
            <div className="bg-white p-6 rounded-md shadow-lg">
              <p className="italic mb-4">
                &ldquo; B Transport Company has been an invaluable partner for
                our business. Their services are top-notch!&rdquo;
              </p>
              <p className="font-bold">- John Doe, CEO of ABC Corp.</p>
            </div>
            <div className="bg-white p-6 rounded-md shadow-lg">
              <p className="italic mb-4">
                &ldquo;We rely on B Transport Company for all our logistics
                needs. They never disappoint.&rdquo;
              </p>
              <p className="font-bold">
                - Jane Smith, Logistics Manager at XYZ Inc.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="bg-blue-600 text-white py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Stay Updated</h2>
          <p className="mb-8">
            Subscribe to our newsletter to receive the latest news, updates, and
            special offers directly in your inbox.
          </p>
          <form className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-md text-gray-900 w-full md:w-auto"
              required
            />
            <button
              type="submit"
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-md hover:bg-gray-100"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
