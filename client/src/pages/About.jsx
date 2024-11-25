import React from "react";

const About = () => {
  return (
    <section className="bg-gray-100 py-12 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            About Us
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Your one-stop destination for all your shopping needs. We bring
            together the best products, amazing deals, and excellent customer
            service.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* About Image */}
          <div className="flex justify-center">
            <img
              src="https://via.placeholder.com/500x400"
              alt="About Our Store"
              className="rounded-lg shadow-md"
            />
          </div>

          {/* About Content */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">
              Why Shop With Us?
            </h3>
            <p className="text-gray-600">
              At <span className="font-semibold">[Your Store Name]</span>, we
              are committed to delivering quality products with unmatched
              customer service. Our team carefully curates each item to ensure
              it meets your expectations.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-xl font-bold">✓</span>
                <span className="text-gray-600">
                  Wide range of high-quality products.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-xl font-bold">✓</span>
                <span className="text-gray-600">
                  Affordable prices and regular discounts.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-xl font-bold">✓</span>
                <span className="text-gray-600">
                  Hassle-free returns and fast shipping.
                </span>
              </li>
            </ul>
            <p className="text-gray-600">
              Join thousands of happy customers and experience the joy of
              stress-free shopping with us.
            </p>
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
