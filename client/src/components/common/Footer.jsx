import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 rounded-tr-2xl rounded-tl-2xl">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: About Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">About Us</h2>
          <p className="text-sm text-gray-400">
            Welcome to [Your Store Name], your number one source for
            [products/services]. We're dedicated to giving you the very best,
            with a focus on quality, customer service, and uniqueness.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="/shop/listing"
                className="hover:text-gray-400 transition"
              >
                Shop
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-gray-400 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-gray-400 transition">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:text-gray-400 transition">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Information */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          <p className="text-sm text-gray-400">
            Address: 1234 Street Name, City, State, Country
          </p>
          <p className="text-sm text-gray-400">Phone: +1 234 567 890</p>
          <p className="text-sm text-gray-400">Email: support@yourstore.com</p>
          <div className="mt-4 flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.988h-2.54v-2.89h2.54V9.844c0-2.507 1.493-3.89 3.778-3.89 1.094 0 2.238.196 2.238.196v2.464h-1.26c-1.243 0-1.63.772-1.63 1.562v1.875h2.773l-.444 2.89h-2.329v6.989C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M23.953 4.569c-.885.39-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.949.555-2.003.959-3.127 1.184-.896-.959-2.173-1.555-3.591-1.555-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124-4.092-.205-7.725-2.165-10.164-5.144-.423.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.062c0 2.385 1.693 4.374 3.946 4.827-.413.11-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.6 3.415-1.68 1.319-3.809 2.105-6.102 2.105-.394 0-.779-.023-1.17-.067 2.188 1.394 4.768 2.211 7.557 2.211 9.056 0 14-7.496 14-13.986 0-.21 0-.423-.016-.637.962-.695 1.797-1.562 2.457-2.548l-.047-.02z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.37 3.608 1.344.975.975 1.282 2.242 1.344 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.062 1.366-.37 2.633-1.344 3.608-.975.975-2.242 1.282-3.608 1.344-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.37-3.608-1.344-.975-.975-1.282-2.242-1.344-3.608-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.062-1.366.37-2.633 1.344-3.608.975-.975 2.242-1.282 3.608-1.344 1.265-.058 1.645-.07 4.849-.07M12 0C8.741 0 8.332.014 7.053.072 5.771.129 4.549.488 3.514 1.523 2.48 2.558 2.121 3.78 2.064 5.062.999 6.342 0 8.741 0 12s.999 5.658 2.064 6.938c.057 1.282.416 2.504 1.45 3.538 1.035 1.035 2.257 1.394 3.539 1.451C8.332 23.986 8.741 24 12 24s3.658-.014 4.938-.072c1.282-.057 2.504-.416 3.539-1.451 1.035-1.034 1.394-2.256 1.451-3.538C23.986 15.658 24 15.26 24 12s-.014-3.658-.072-4.938c-.057-1.282-.416-2.504-1.451-3.539-1.035-1.035-2.257-1.394-3.539-1.451C15.658.014 15.26 0 12 0zM12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162S15.403 5.838 12 5.838zm0 10.162c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm6.406-11.845c-.796 0-1.44.645-1.44 1.441 0 .795.645 1.44 1.44 1.44s1.441-.645 1.441-1.44-.645-1.441-1.441-1.441z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-10 text-gray-500 text-sm">
        © {new Date().getFullYear()} [Your Store Name]. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
