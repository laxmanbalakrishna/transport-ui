import React from "react";

const page = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About Us</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
        <p className="text-lg">
          At <strong>B Transport Company</strong>, we are dedicated to providing
          top-notch transportation solutions tailored to meet your unique needs.
          With a legacy of excellence and a commitment to quality, we have been
          serving our clients with unparalleled service for over [number] years.
          Our team of skilled professionals and state-of-the-art fleet ensure
          that your goods and services are delivered safely and efficiently.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg">
          Our mission is to revolutionize the transportation industry through
          innovation, reliability, and exceptional customer service. We strive
          to be the preferred choice for businesses and individuals seeking
          dependable and efficient transportation solutions. Our goal is to
          exceed your expectations by delivering excellence in every mile we
          cover.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
        <p className="text-lg">
          We envision a future where <strong>B Transport Company</strong> is
          recognized as the leading provider of transportation services, setting
          new standards for quality, safety, and sustainability. Our vision is
          to drive the industry forward with cutting-edge technology and a
          customer-centric approach that delivers results.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
        <ul className="list-disc list-inside text-lg space-y-2">
          <li>
            <strong>Customer Satisfaction:</strong> Your satisfaction is our top
            priority. We are committed to providing personalized services that
            meet and exceed your expectations.
          </li>
          <li>
            <strong>Integrity:</strong> We operate with transparency and
            honesty, ensuring that our clients receive the highest level of
            trust and respect.
          </li>
          <li>
            <strong>Innovation:</strong> We embrace technological advancements
            and innovative practices to improve our services and stay ahead in
            the industry.
          </li>
          <li>
            <strong>Safety:</strong> The safety of your cargo and our team is
            paramount. We adhere to the highest safety standards to ensure
            secure and reliable transportation.
          </li>
          <li>
            <strong>Sustainability:</strong> We are committed to environmentally
            responsible practices and strive to reduce our carbon footprint
            through sustainable initiatives.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Services</h2>
        <p className="text-lg">
          At <strong>B Transport Company</strong>, we offer a comprehensive
          range of transportation services, including:
        </p>
        <ul className="list-disc list-inside text-lg space-y-2">
          <li>
            <strong>Freight Transport:</strong> Reliable and timely freight
            solutions for businesses of all sizes.
          </li>
          <li>
            <strong>Logistics Management:</strong> Efficient logistics planning
            and execution to streamline your supply chain.
          </li>
          <li>
            <strong>Specialized Transport:</strong> Customized solutions for
            transporting delicate or high-value items.
          </li>
          <li>
            <strong>Warehousing:</strong> Secure and accessible warehousing
            options to meet your storage needs.
          </li>
          <li>
            <strong>Courier Services:</strong> Fast and dependable courier
            services for urgent deliveries.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
        <p className="text-lg">
          Our dedicated team of professionals is the backbone of our company.
          With years of experience and a passion for excellence, our team is
          equipped to handle all your transportation needs with care and
          precision. Here’s an overview of the key roles within our
          organization:
        </p>
        <ul className="list-disc list-inside text-lg space-y-2">
          <li>
            <strong>Admin:</strong> Admins can create and manage users,
            including Managers. They are responsible for vehicle installations
            and oversee the entire system.
          </li>
          <li>
            <strong>Manager:</strong> Managers handle branch operations, update
            vehicle installation statuses, and can contact Admins as needed.
            They also view recent installations within their branch or across
            branches.
          </li>
          <li>
            <strong>Normal User:</strong> Normal Users are vehicle owners. They
            can install various types of vehicles (trucks, vans, buses) and
            receive monthly compensation based on agreements with the company.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="text-lg">
          We would love to hear from you! Whether you have questions about our
          services, need a quote, or want to discuss how we can assist with your
          transportation needs, please reach out to us:
        </p>
        <p className="text-lg">
          <strong>Phone:</strong> +1 (555) 123-4567
          <br />
          <strong>Email:</strong> info@btransport.com
          <br />
          <strong>Address:</strong> 1234 Transport Lane, City, State, 12345
        </p>
      </section>
    </div>
  );
};

export default page;
