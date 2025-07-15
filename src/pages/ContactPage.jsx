// src/pages/ContactPage.js
import React from 'react';

const ContactPage = () => {
  return (
    <>
      {/* */}
      <section className="fp__breadcrumb" style={{ backgroundImage: 'url(/images/breadcrumb_bg.jpg)' }}>
        <div className="fp__breadcrumb_overlay">
          <div className="container">
            <div className="fp__breadcrumb_text">
              <h1>Contact Us</h1>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* */}

      {/* */}
      <section className="fp__contact_page mt_100 xs_mt_70 mb_100 xs_mb_70">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 wow fadeInUp" data-wow-duration="1s">
              <div className="fp__contact_info">
                <h3>Our Location</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptas, praesentium!
                </p>
                <ul>
                  <li>
                    <i className="fas fa-map-marker-alt"></i>
                    <span>Address:</span> 123 Main Street, Anytown, USA
                  </li>
                  <li>
                    <i className="fas fa-phone-alt"></i>
                    <span>Phone:</span> +1 234 567 890
                  </li>
                  <li>
                    <i className="fas fa-envelope"></i>
                    <span>Email:</span> info@example.com
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 wow fadeInUp" data-wow-duration="1s">
              <div className="fp__contact_form">
                <h3>Get In Touch</h3>
                <form>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="fp__contact_form_input">
                        <input type="text" placeholder="Your Name" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="fp__contact_form_input">
                        <input type="email" placeholder="Your Email" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="fp__contact_form_input">
                        <input type="text" placeholder="Your Subject" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="fp__contact_form_input">
                        <textarea placeholder="Your Message"></textarea>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <button type="submit" className="common_btn">Send Message</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="fp__map mt_100 xs_mt_70">
            <iframe
              src="https://www.google.com/maps/embed?..." // Replace with your actual Google Maps embed code
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
      {/* */}
    </>
  );
};

export default ContactPage;