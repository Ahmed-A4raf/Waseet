import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-primary-light rounded-t-3xl mt-12">
        <div className="mx-auto max-w-[1400px] px-4 py-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div>
              <div className="flex justify-center sm:justify-start text-4xl font-bold">
                Waseet <span className="text-primary">.</span>
              </div>

              <p className="mt-6 text-center leading-relaxed text-gray-700 sm:max-w-xs sm:text-left">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Incidunt consequuntur amet culpa cum itaque neque.
              </p>

              <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8 text-xl">
                <li>
                  <a
                    href="#"
                    rel="noreferrer"
                    target="_blank"
                    className="text-primary bg-gray-200 rounded-full size-10 flex items-center justify-center hover:bg-primary hover:text-white transtion-all duration-300"
                  >
                    <i className="ri-facebook-circle-line"></i>
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    rel="noreferrer"
                    target="_blank"
                    className="text-primary bg-gray-200 rounded-full size-10 flex items-center justify-center hover:bg-primary hover:text-white transtion-all duration-300"
                  >
                    <i className="ri-twitter-x-fill"></i>
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    rel="noreferrer"
                    target="_blank"
                    className="text-primary bg-gray-200 rounded-full size-10 flex items-center justify-center hover:bg-primary hover:text-white transtion-all duration-300"
                  >
                    <i className="ri-instagram-line"></i>
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    rel="noreferrer"
                    target="_blank"
                    className="text-primary bg-gray-200 rounded-full size-10 flex items-center justify-center hover:bg-primary hover:text-white transtion-all duration-300"
                  >
                    <i className="ri-linkedin-box-line"></i>
                  </a>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
              <div className="text-center sm:text-left">
                <p className="text-lg font-medium">Quick Links</p>

                <ul className="mt-8 space-y-4 text-sm text-gray-700">
                  <li>
                    <a className="transition hover:text-primary" href="/">
                      Home
                    </a>
                  </li>

                  <li>
                    <a className="transition hover:text-primary" href="/shop">
                      Shop
                    </a>
                  </li>

                  <li>
                    <a
                      className="transition hover:text-primary"
                      href="/contact"
                    >
                      Contact
                    </a>
                  </li>

                  <li>
                    <a className="transition hover:text-primary" href="/about">
                      About Us
                    </a>
                  </li>
                </ul>
              </div>

              <div className="text-center sm:text-left">
                <p className="text-lg font-medium">Our Services</p>

                <ul className="mt-8 space-y-4 text-sm text-gray-700">
                  <li>
                    <a className="transition hover:text-primary" href="#">
                      Web Development
                    </a>
                  </li>

                  <li>
                    <a className="transition hover:text-primary" href="#">
                      {" "}
                      Web Design{" "}
                    </a>
                  </li>

                  <li>
                    <a className="transition hover:text-primary" href="#">
                      {" "}
                      Marketing{" "}
                    </a>
                  </li>

                  <li>
                    <a className="transition hover:text-primary" href="#">
                      {" "}
                      Google Ads{" "}
                    </a>
                  </li>
                </ul>
              </div>

              <div className="text-center sm:text-left">
                <p className="text-lg font-medium">Helpful Links</p>

                <ul className="mt-8 space-y-4 text-sm text-gray-700">
                  <li>
                    <a className="transition hover:text-primary" href="#">
                      {" "}
                      FAQs{" "}
                    </a>
                  </li>

                  <li>
                    <a className="transition hover:text-primary" href="#">
                      {" "}
                      Support{" "}
                    </a>
                  </li>

                  <li>
                    <a
                      className="transition hover:text-primary flex items-center md:justify-start lg:justify-start sm:justify-start justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                      href="#"
                    >
                      <span>Live Chat</span>
                      <span className="relative flex size-2">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75 animate-ping"></span>
                        <span className="relative inline-flex size-2 rounded-full bg-teal-500"></span>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="text-center sm:text-left">
                <p className="text-lg font-medium">Contact Us</p>

                <ul className="mt-8 space-y-4 text-sm">
                  <li>
                    <a
                      className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                      href="#"
                    >
                      <i className="ri-mail-line text-lg text-primary"></i>
                      <span className="flex-1 text-gray-700">john@doe.com</span>
                    </a>
                  </li>

                  <li>
                    <a
                      className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                      href="#"
                    >
                      <i className="ri-phone-line text-lg text-primary"></i>

                      <span className="flex-1 text-gray-700">0123456789</span>
                    </a>
                  </li>

                  <li className="flex items-start justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end">
                    <i className="ri-map-pin-line text-lg text-primary"></i>

                    <address className="-mt-0.5 flex-1 text-gray-700 not-italic">
                      213 Lane, London, United Kingdom
                    </address>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-300 pt-6">
            <div className="text-center sm:flex sm:justify-between sm:text-left">
              <p className="text-sm text-gray-700">
                <span className="block sm:inline">All rights reserved.</span>

                <a
                  className="inline-block text-primary underline transition hover:text-primary/75"
                  href="#"
                >
                  Terms & Conditions
                </a>

                <span>&middot;</span>

                <a
                  className="inline-block text-primary underline transition hover:text-primary/75"
                  href="#"
                >
                  Privacy Policy
                </a>
              </p>

              <p className="mt-4 text-sm text-gray-700 sm:order-first sm:mt-0">
                &copy; 2025 Waseet Team
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
