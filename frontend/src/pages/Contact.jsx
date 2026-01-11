import { motion } from "framer-motion";
import "./Contact.css";


function Contact() {
  return (
    <motion.section
      className="page contact"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <h1>Contact MetaForge</h1>
        <p className="subtitle">
          Have questions, feedback, or partnership ideas?  
          We’d love to hear from you.
        </p>

        <div className="contact-grid">
          {/* Contact Info */}
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>
              Reach out to us for support, feature requests, or business
              inquiries.
            </p>

            <ul>
              <li>
                📧 <strong>Email:</strong>{" "}
                <a href="mailto:support@metaforge.ai">
                  support@metaforge.ai
                </a>
              </li>
              <li>
                🌐 <strong>Website:</strong> metaforge.ai
              </li>
              <li>
                🕒 <strong>Support:</strong> 24/7 for paid users
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <motion.form
            className="contact-form"
            whileHover={{ scale: 1.01 }}
          >
            <h2>Send a Message</h2>

            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea
              placeholder="Your Message"
              rows="5"
              required
            ></textarea>

            <button type="submit">Send Message</button>

            <p className="form-note">
              This form will be connected after launch.
            </p>
          </motion.form>
        </div>
      </div>
    </motion.section>
  );
}

export default Contact;
