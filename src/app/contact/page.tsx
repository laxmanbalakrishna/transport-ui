import React from "react";

export default function page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
        <p className="text-lg mb-4">
          We’re here to assist you with any questions or concerns you may have.
          Whether you need information about our services, have a specific
          inquiry, or wish to provide feedback, please don’t hesitate to reach
          out. Our team is dedicated to providing prompt and helpful responses.
        </p>

        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Contact Information */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
            <p className="text-lg mb-4">
              <strong>Phone:</strong> +1 (555) 123-4567
              <br />
              <strong>Email:</strong> info@btransport.com
              <br />
              <strong>Address:</strong> 1234 Transport Lane, City, State, 12345
            </p>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Send Us a Message</h3>
            <form
              action="/api/contact" // Adjust this to your actual API endpoint or form handling route
              method="POST"
              className="space-y-4"
            >
              <label className="block">
                <span className="text-gray-700">Name</span>
                <input
                  type="text"
                  name="name"
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </label>

              <label className="block">
                <span className="text-gray-700">Email</span>
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </label>

              <label className="block">
                <span className="text-gray-700">Message</span>
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                ></textarea>
              </label>

              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Business Hours</h2>
        <p className="text-lg">
          Our team is available during the following hours to assist you:
        </p>
        <ul className="list-disc list-inside text-lg">
          <li>
            <strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM
          </li>
          <li>
            <strong>Saturday:</strong> 10:00 AM - 4:00 PM
          </li>
          <li>
            <strong>Sunday:</strong> Closed
          </li>
        </ul>
      </section>
    </div>
  );
}
