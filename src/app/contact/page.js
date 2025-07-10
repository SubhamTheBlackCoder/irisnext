
"use client";
import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiFileText,
  FiAlertCircle,
  FiMessageSquare,
  FiX,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import './authx.css'


const ContactPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    reason: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // Validation
      if (
        !formData.email ||
        !formData.subject ||
        !formData.reason ||
        !formData.description
      ) {
        setError("All fields are required");
        return;
      }

      if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        setError("Please enter a valid email address");
        return;
      }

      setIsLoading(true);
      setError(null);
      setSuccess(null);

      try {
        const response = await fetch(
          "https://yecne7mqdl.execute-api.ap-south-1.amazonaws.com/contact",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: "Contact Form User",
              email: formData.email,
              subject: formData.subject,
              reason: formData.reason,
              description: formData.description,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to send message");
        }

        setSuccess("Your message has been sent successfully!");
        setFormData({
          email: "",
          subject: "",
          reason: "",
          description: "",
        });
      } catch (err) {
        setError(err.message || "An error occurred while sending your message");
      } finally {
        setIsLoading(false);
      }
    },
    [formData]
  );

  const messageVariants = {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <>
     
      <div className="auth-container">
        {isLoading && (
          <div className="auth-loading-overlay">
            <div className="auth-loading-spinner"></div>
            <p>Sending your message...</p>
          </div>
        )}

        <motion.div
          className="auth-card"
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            damping: 12,
            stiffness: 200,
            duration: 0.3,
          }}
          style={{ willChange: "transform, opacity" }}
        >
          <AnimatePresence>
            {error && (
              <motion.div
                className="auth-message auth-error"
                variants={messageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeInOut" }}
                style={{ willChange: "opacity, height" }}
              >
                {error}
                <button
                  onClick={() => setError(null)}
                  className="auth-close-message"
                >
                  <FiX />
                </button>
              </motion.div>
            )}

            {success && (
              <motion.div
                className="auth-message auth-success"
                variants={messageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.25, ease: "easeInOut" }}
                style={{ willChange: "opacity, height" }}
              >
                {success}
                <button
                  onClick={() => setSuccess(null)}
                  className="auth-close-message"
                >
                  <FiX />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="auth-form-container">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="contact-header"
            >
              <h2 className="auth-form-title">Contact Us</h2>
              <p className="auth-form-subtitle">
                We'd love to hear from you. Fill out the form below and we'll
                get back to you soon.
              </p>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              className="auth-form"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              style={{ willChange: "opacity" }}
            >
              <motion.div
                className="auth-input-group"
                variants={itemVariants}
                style={{ willChange: "transform, opacity" }}
              >
                <label htmlFor="email" className="auth-label">
                  <FiMail className="auth-icon" /> Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="auth-input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                />
              </motion.div>

              <motion.div
                className="auth-input-group"
                variants={itemVariants}
                style={{ willChange: "transform, opacity" }}
              >
                <label htmlFor="subject" className="auth-label">
                  <FiFileText className="auth-icon" /> Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="auth-input"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What is this regarding?"
                />
              </motion.div>

              <motion.div
                className="auth-input-group"
                variants={itemVariants}
                style={{ willChange: "transform, opacity" }}
              >
                <label htmlFor="reason" className="auth-label">
                  <FiAlertCircle className="auth-icon" /> Reason
                </label>
                <select
                  id="reason"
                  name="reason"
                  className="auth-input"
                  value={formData.reason}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a reason</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Billing Inquiry">Billing Inquiry</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Other">Other</option>
                </select>
              </motion.div>

              <motion.div
                className="auth-input-group"
                variants={itemVariants}
                style={{ willChange: "transform, opacity" }}
              >
                <label htmlFor="description" className="auth-label">
                  <FiMessageSquare className="auth-icon" /> Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="auth-input auth-textarea"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  placeholder="Please describe your issue or question"
                  rows={5}
                />
              </motion.div>

              <motion.button
                type="submit"
                className="auth-primary-button"
                disabled={isLoading}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ willChange: "transform" }}
              >
                {isLoading ? "Sending..." : "Send Message"}
              </motion.button>
            </motion.form>
          </div>
        </motion.div>

        <motion.div
          className="auth-footer-global"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          © {new Date().getFullYear()} IrisneX. All rights reserved.
          <div className="auth-footer-links">
            <a href="/terms">Terms</a>
            <a href="/privacy">Privacy</a>
            <a href="/contact">Contact</a>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ContactPage;
