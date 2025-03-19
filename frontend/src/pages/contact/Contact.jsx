import React, { useEffect } from "react";

const Contact = () => {
  useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <div className="pt-24">
      {/* Contact banner */}
      <section className="section__container bg-primary-light rounded-md dark:bg-zinc-800">
        <h2 className="section__header capitalize dark:text-zinc-50">Contact Us</h2>
        <div className="section__subheader space-x-2">
          <p className="dark:text-zinc-400">We're Always Eager To Hear From You</p>
        </div>
      </section>

      {/* Contact content*/}
      <section className="section__container">

        {/* Contact header */}
        <div className="md:w-1/2  w-full mx-auto mb-4">
          <h3 className="text-lg font-medium tracking-wider text-primary text-center">
            Get in touch with Contact us
          </h3>
          <h2 className="text-3xl font-semibold text-text-dark text-center dark:text-zinc-50">
            Fill The Form Below So We Can Get To Know You And Your Needs Better.
          </h2>
        </div>
        <div className="flex flex-col md:flex-row gap-12 p-4 justify-center">

          {/* Contact details */}
          <div className="md:w-1/2 lg:w-1/3 w-full rounded-md">
            <div>
              <ul className="space-y-4 rounded-md">
                <li className="flex gap-4 items-center rounded-md border border-primary-light shadow-sm p-2 dark:border-zinc-800">
                  <i className="ri-map-pin-line text-3xl text-primary"></i>
                  <span>
                    <h3 className="text-xl font-semibold">Office Address</h3>
                    <p className="text-gray-700 dark:text-zinc-400">R2vH9@example.com</p>
                  </span>
                </li>
                <li className="flex gap-4 items-center rounded-md border border-primary-light shadow-sm p-2 dark:border-zinc-800">
                  <i className="ri-phone-line text-3xl text-primary"></i>
                  <span>
                    <h3 className="text-xl font-semibold">Phone</h3>
                    <p className="text-gray-700 dark:text-zinc-400">+1 234 567 890</p>
                  </span>
                </li>
                <li className="flex gap-4 items-center rounded-md border border-primary-light shadow-sm p-2 dark:border-zinc-800">
                  <i className="ri-global-line text-3xl text-primary"></i>
                  <span>
                    <h3 className="text-xl font-semibold">Website</h3>
                    <p className="text-gray-700 dark:text-zinc-400">www.waseet.com</p>
                  </span>
                </li>
              </ul>
            </div>
            <div className="mt-4 shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3435.423750797247!2d31.01050727463904!3d30.565580993693434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f7d6eb70a91047%3A0xc353387ed2f37809!2sMenoufiya%20University!5e0!3m2!1sen!2seg!4v1740747833865!5m2!1sen!2seg"
                className="w-full rounded-md"
              ></iframe>
            </div>
          </div>

          {/* Contact form */}
          <div className="md:w-1/2 lg:w-1/3 w-full rounded-md">
            <form action="https://getform.io/f/bwnqwoja" method="post" className="space-y-4">
              <input
                className="w-full focus:outline-primary bg-primary-light hover:border px-5 py-3 rounded-md dark:bg-zinc-800 dark:text-zinc-50 dark:border-zinc-800 dark:focus:outline-zinc-900"
                type="text"
                placeholder="Name"
                name="name"
                id="name"
                autoComplete="name"
                required
              />
              <input
                className="w-full focus:outline-primary bg-primary-light hover:border px-5 py-3 rounded-md dark:bg-zinc-800 dark:text-zinc-50 dark:border-zinc-800 dark:focus:outline-zinc-900"
                type="email"
                placeholder="Email"
                name="email"
                id="email"
                autoComplete="email"
                required
              />
              <input
                className="w-full focus:outline-primary bg-primary-light hover:border px-5 py-3 rounded-md dark:bg-zinc-800 dark:text-zinc-50 dark:border-zinc-800 dark:focus:outline-zinc-900"
                type="number"
                placeholder="Phone Number"
                name="phone"
                id="phone"
                autoComplete="phone"
                required
              />
              <textarea
                className="w-full focus:outline-primary bg-primary-light hover:border px-5 py-3 resize-y min-h-36 max-h-80 rounded-md dark:bg-zinc-800 dark:text-zinc-50 dark:border-zinc-800 dark:focus:outline-zinc-900"
                placeholder="Message"
                name="message"
                id="message"
                required
              ></textarea>
              <button className="btn w-full">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
