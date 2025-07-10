"use client";
import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link"; 
import {
  ArrowUpIcon,
  DocumentArrowUpIcon,
  ChartBarIcon,
  BriefcaseIcon,
  UserGroupIcon, 
  StarIcon,
  CheckBadgeIcon,
  LightBulbIcon,
  SparklesIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { LinkedinIcon, TwitterIcon, FacebookIcon } from "react-share";
import { FaGithub } from "react-icons/fa";
import Seo from "@/components/seo";


const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const slideIn = {
  hidden: { x: "100%" },
  visible: { x: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const Counter = ({ from = 0, to, duration = 2 }) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let start = from;
    const end = to;
    const increment = end > start ? 1 : -1;
    const range = end - start;
    const stepTime = Math.abs(Math.floor(duration * 1000) / range);

    const timer = setInterval(() => {
      start += increment;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [from, to, duration]);

  return <span>{count}</span>;
};

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="app">
     <Seo
        title="Irisnex – AI Resume Optimizer & ATS Checker"
        description="Build ATS-friendly resumes instantly. Irisnex helps improve and match your resume to job descriptions using AI."
        canonical="https://www.irisnex.com/"
      />
      {/* Scroll progress bar with smooth animation */}
      <motion.div className="scroll-progress" style={{ scaleX }} />

      {/* Hero Section with Enhanced Animations */}
      <section className="hero">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="hero-container"
        >
          <motion.h1 variants={fadeInUp} className="hero-title">
            <motion.span className="title-line" variants={fadeInUp}>
              AI-Powered Resume Analysis
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0, duration: 0.5 }}
              className="title-highlight"
            >
              Land Your Dream Job Faster
            </motion.span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            transition={{ delay: 0 }}
            className="hero-subtitle"
          >
            Get instant feedback on your resume's ATS compatibility,
            personalized improvements, and AI-curated job matches tailored to
            your skills.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
            className="hero-actions"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link href="/upload" className="primary-btn">
                <DocumentArrowUpIcon className="btn-icon" />
                Analyze My Resume
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link href="/auth" className="secondary-btn">
                Existing User? Login
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Animated Background Elements */}
        <motion.div
          className="hero-bg-circle-1"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        />
        <motion.div
          className="hero-bg-circle-2"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
        />
      </section>

      {/* Features Section with Card Hover Effects */}
      <section className="features">
        <div className="section-container">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="section-header"
          >
            <span className="section-label">Features</span>
            <motion.h2 className="section-title">
              Powerful Tools to Boost Your Job Search
            </motion.h2>
            <motion.p className="section-description">
              Our platform combines cutting-edge AI technology with hiring
              industry expertise to give you the best chance at landing your
              dream job.
            </motion.p>
          </motion.div>

          <div className="features-grid">
            {[
              {
                title: "ATS Optimization",
                icon: <ChartBarIcon className="feature-icon" />,
                desc: "Get ATS-Ready in Seconds — Make Your Resume Pass Where It Matters Most.",
                color: "#3B82F6",
              },
              {
                title: "One Click Optimizer",
                icon: <BriefcaseIcon className="feature-icon" />,
                desc: "Optimize your resume and profile in one click to get better job matches instantly.",
                color: "#8B5CF6",
              },
              {
                title: "Resume Analysis",
                icon: <DocumentArrowUpIcon className="feature-icon" />,
                desc: "Instant ATS score, skill insights, and expert tips—visually simplified for faster improvements.",
                color: "#EC4899",
              },
              {
                title: "Cover Letter Generator",
                icon: <EnvelopeIcon className="feature-icon" />,
                desc: "Create personalized cover letters tailored to each job application",
                color: "#10B981",
              },
              {
                title: "Interview Prep",
                icon: <UserGroupIcon className="feature-icon" />,
                desc: "Practice with common interview questions based on your resume",
                color: "#F59E0B",
              },
              {
                title: "Career Insights",
                icon: <LightBulbIcon className="feature-icon" />,
                desc: "Get data-driven advice to improve your career trajectory",
                color: "#6366F1",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.15 }}
                className="feature-card"
                whileHover={{ y: -10 }}
              >
                <motion.div
                  className="icon-container"
                  style={{ backgroundColor: feature.color }}
                  whileHover={{ rotate: 15, scale: 1.1 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>

                <motion.div
                  className="feature-hover-bg"
                  style={{ backgroundColor: feature.color }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.1 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="section-container">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="section-header"
          >
            <span className="section-label">Process</span>
            <motion.h2 className="section-title">How It Works</motion.h2>
            <motion.p className="section-description">
              Get job-ready in just three simple steps with our AI-powered
              platform.
            </motion.p>
          </motion.div>

          <div className="steps-container">
            <div className="steps-line"></div>
            {[
              {
                step: "1",
                title: "Upload Your Resume",
                description:
                  "Simply upload your current resume in PDF, Word format.",
                icon: <DocumentArrowUpIcon className="step-icon" />,
              },
              {
                step: "2",
                title: "AI Analysis",
                description:
                  "Our system scans your resume against top ATS systems and provides a detailed compatibility report.",
                icon: <SparklesIcon className="step-icon" />,
              },
              {
                step: "3",
                title: "Get Job-Ready",
                description:
                  "Receive actionable insights and personalized suggestions to enhance your resume and stand out to recruiters.",
                icon: <BriefcaseIcon className="step-icon" />,
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="step-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="step-number">{step.step}</div>
                <div className="step-icon-container">{step.icon}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="how-it-works-cta"
          >
            <Link href="/auth" className="primary-btn">
              Start Your Free Analysis
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section with Counter Animation */}
      <section className="stats">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="section-header"
        >
          <span className="section-label">Impact</span>
          <motion.h2 className="section-title">Proven Results</motion.h2>
          <motion.p className="section-description">
            Our AI technology has helped thousands of job seekers land their
            dream roles
          </motion.p>
        </motion.div>
        <div className="section-container">
          <div className="stats-grid">
            {[
              {
                value: 1000,
                label: "Resumes Analyzed",
                icon: <UserGroupIcon className="stat-icon" />,
              },
              {
                value: 9,
                label: "User Satisfaction",
                icon: <StarIcon className="stat-icon" />,
              },
              {
                value: 90,
                label: "ATS Compatibility",
                icon: <CheckBadgeIcon className="stat-icon" />,
              },
              {
                value: 78,
                label: "Interview Rate Increase",
                icon: <ChartBarIcon className="stat-icon" />,
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.2 }}
                className="stat-card"
              >
                {stat.icon}
                <motion.h3 className="stat-value">
                  {typeof stat.value === "number" && stat.value % 1 !== 0 ? (
                    <>
                      <Counter from={0} to={stat.value} duration={2} />
                    </>
                  ) : (
                    <>
                      <Counter from={0} to={stat.value} duration={2} />
                      {typeof stat.value === "number" &&
                        stat.value === 95 &&
                        "%"}
                      {typeof stat.value === "number" &&
                        stat.value === 78 &&
                        "%"}
                    </>
                  )}
                </motion.h3>
                <p className="stat-label">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="section-container">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="section-header"
          >
            <span className="section-label">Testimonials</span>
            <motion.h2 className="section-title">What Our Users Say</motion.h2>
            <motion.p className="section-description">
              Don't just take our word for it - hear from professionals who've
              landed their dream jobs using IrisneX.
            </motion.p>
          </motion.div>

          <div className="testimonials-grid">
            {[
              {
                name: "Riya M",
                role: "B.Tech Student, Pune",
                quote:
                  "After optimizing my resume, I started getting callbacks from companies I couldn’t even crack earlier. The suggestions were really smart and specific.",
                rating: 5,
              },
              {
                name: "Arjun V",
                role: "Final Year B.Tech Student, NIT Rourkela",
                quote:
                  "I used the One Click Optimizer and it literally rewrote my resume based on the job I was applying for. It added skills I didn’t even think to include!",
                rating: 5,
              },
              {
                name: "Pooja Mohapatra",
                role: "Marketing Director at Microsoft",
                quote:
                  "I was struggling with resumes for different job roles. This tool made it so easy — just paste the job description, click once, and done!",
                rating: 4,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="testimonial-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`star-icon ${
                        i < testimonial.rating ? "filled" : ""
                      }`}
                    />
                  ))}
                </div>
                <p className="testimonial-quote">"{testimonial.quote}"</p>
                <div className="testimonial-author">
                  <h3 className="author-name">{testimonial.name}</h3>
                  <p className="author-role">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section with Gradient Animation */}
      <motion.section
        variants={scaleUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="cta"
      >
        <div className="cta-container">
          <motion.h2 variants={fadeInUp} className="cta-title">
            Ready to Transform Your Job Search?
          </motion.h2>
          <motion.p variants={fadeInUp} className="cta-subtitle">
            Join <Counter from={0} to={1000} duration={2} />+ professionals
            who've improved their resumes with our AI technology.
          </motion.p>
          <motion.div
            className="cta-actions"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/auth" className="cta-primary-btn">
                Get Started Free
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/pricing" className="cta-secondary-btn">
                See Premium Features
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          className="cta-gradient"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.section>

      {/* Footer with Enhanced Design */}
      <footer className="footer">
        <div className="footer-wave">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className="footer-wave-path"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className="footer-wave-path"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className="footer-wave-path"
            ></path>
          </svg>
        </div>
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-col">
              <div className="footer-logo">
                Irisne
                <span className="logo-highlight">᙭</span>
              </div>
              <p className="footer-about">
                AI-powered resume optimization platform helping professionals
                land their dream jobs faster.
              </p>
              <div className="footer-social">
                <a
                  href="https://x.com/SubhamDala87169?t=oXNh_dO98U06YGFRE3gYEQ&s=09"
                  aria-label="Visit our Twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <TwitterIcon size={32} round aria-hidden="true" />
                </a>
                <a
                  href="https://www.linkedin.com/in/subham-dalabehera-51077b27b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile of Subham Dalabehera"
                  className="social-link"
                >
                  <LinkedinIcon size={32} round aria-hidden="true" />
                </a>
                <a
                  href="https://www.facebook.com/share/161eFP4rwe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="facebook profile of Subham Dalabehera"
                  className="social-link"
                >
                  <FacebookIcon size={32} round aria-hidden="true" />
                </a>
                <a
                  href="https://github.com/SubhamTheBlackCoder"
                  target="_blank"
                  aria-label="github profile of Subham Dalabehera"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <FaGithub size={32} round aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="footer-col">
              <h2 className="footer-title">Product</h2>
              <ul className="footer-links">
                <li>
                  <Link href="/features" className="footer-link">
                    Features
                  </Link>
                </li>

                <li>
                  <Link href="/how-it-works" className="footer-link">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/testimonials" className="footer-link">
                    Testimonials
                  </Link>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <h2 className="footer-title">Company</h2>
              <ul className="footer-links">
                <li>
                  <Link href="/about" className="footer-link">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="footer-link">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="footer-link">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <h2 className="footer-title">Support</h2>
              <ul className="footer-links">
                <li>
                  <Link href="/contact" className="footer-link">
                    Contact Us
                  </Link>
                </li>

                <li>
                  <Link href="/privacy" className="footer-link">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="footer-link">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <h2 className="footer-title">Contact</h2>
              <ul className="footer-contact">
                <li>
                  <MapPinIcon className="contact-icon" />
                  <span>Rourkela, Sundargarh, KMD </span>
                </li>
                <li>
                  <PhoneIcon className="contact-icon" />
                  <span>(+91) **********</span>
                </li>
                <li>
                  <EnvelopeIcon className="contact-icon" />
                  <span>sbhmdalabehera@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copyright">
              &copy; {new Date().getFullYear()} Irisne᙭. All rights reserved.
            </p>
            <div className="footer-legal">
              <Link href="/privacy" className="footer-link">
                Privacy Policy
              </Link>
              <Link href="/terms" className="footer-link">
                Terms of Service
              </Link>
              <Link href="/cookies" className="footer-link">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Scroll-to-Top Button */}
      <div className="floating-buttons">
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="scroll-top-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to Top"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <ArrowUpIcon className="scroll-top-icon" />
        </motion.button>
      </div>

      {/* CSS Styles */}
      <style>{`
        /* Base Styles */
        :root {
          --primary: #2563eb;
          --primary-hover: #1d4ed8;
          --primary-light: rgba(37, 99, 235, 0.1);
          --text: #111827;
          --text-light: #6b7280;
          --text-lighter: #9ca3af;
          --bg: #f9fafb;
          --card: #ffffff;
          --border: rgba(0, 0, 0, 0.1);
          --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          --shadow-md: 0 10px 15px rgba(0, 0, 0, 0.1);
          --shadow-lg: 0 20px 25px rgba(0, 0, 0, 0.1);
          --feature-1: #3B82F6;
          --feature-2: #8B5CF6;
          --feature-3: #EC4899;
          --feature-4: #10B981;
          --feature-5: #F59E0B;
          --feature-6: #6366F1;
          --gradient: linear-gradient(135deg, var(--feature-1) 0%, var(--feature-2) 100%);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          overflow-x: hidden;
          color: var(--text);
          background-color: var(--bg);
          line-height: 1.5;
        }

        a {
          text-decoration: none;
          color: inherit;
        }

        ul {
          list-style: none;
        }

        /* Base App Styles */
        .app {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: var(--bg);
        }

        /* Scroll Progress */
        .scroll-progress {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background-color: var(--primary);
          transform-origin: left;
          z-index: 1000;
        }

        /* Hero Section */
        .hero {
          position: relative;
          padding: 8rem 5% 6rem;
          overflow: hidden;
          background-color: var(--bg);
        }

        .hero-container {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .hero-title {
          font-size: clamp(2.4rem, 5vw, 3.5rem);
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 1.5rem;
          color: var(--text);
        }

        .title-line {
          display: block;
          margin-bottom: 0.5rem;
        }

        .title-highlight {
          display: inline-block;
          background: linear-gradient(
            90deg,
            var(--feature-1),
            var(--feature-2)
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          padding: 0 0.25rem;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          line-height: 1.6;
          color: var(--text-light);
          max-width: 700px;
          margin: 0 auto 2.5rem;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
        }

        .primary-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background-color: var(--primary);
          color: white;
          font-size: 1rem;
          font-weight: 500;
          padding: 0.875rem 2rem;
          border-radius: 0.5rem;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 6px rgba(37, 99, 235, 0.2);
        }

        .primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px rgba(37, 99, 235, 0.3);
          background-color: var(--primary-hover);
        }

        .secondary-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background-color: transparent;
          border: 2px solid var(--primary);
          color: var(--primary);
          font-size: 1rem;
          font-weight: 500;
          padding: 0.875rem 2rem;
          border-radius: 0.5rem;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .secondary-btn:hover {
          background-color: rgba(37, 99, 235, 0.05);
          transform: translateY(-2px);
        }

        .btn-icon {
          width: 1.25rem;
          height: 1.25rem;
          color: white;
        }

         .hero-bg-circle-1 {
          position: absolute;
          top: -200px;
          right: -200px;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(37, 99, 235, 0.1) 0%,
            rgba(37, 99, 235, 0) 70%
          );
          z-index: 1;
        }

        .hero-bg-circle-2 {
          position: absolute;
          bottom: -300px;
          left: -300px;
          width: 800px;
          height: 800px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(236, 72, 153, 0.1) 0%,
            rgba(236, 72, 153, 0) 70%
          );
          z-index: 1;
        }


        /* Clients Section */
        .clients {
          padding: 3rem 5%;
          background-color: var(--card);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .section-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-light);
          text-align: center;
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .clients-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2rem;
          align-items: center;
        }

        .client-logo {
          font-size: 1rem;
          font-weight: 500;
          color: var(--text-light);
          opacity: 0.7;
          transition: opacity 0.3s;
        }

        .client-logo:hover {
          opacity: 1;
        }

        /* Features Section */
        .features {
          padding: 6rem 5%;
          background-color: var(--card);
          position: relative;
          overflow: hidden;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .section-title {
          font-size: 2.25rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: var(--text);
        }

        .section-description {
          font-size: 1.125rem;
          color: var(--text-light);
          margin: 0 auto;
          line-height: 1.6;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .feature-card {
          position: relative;
          padding: 2rem;
          background-color: var(--card);
          border-radius: 1rem;
          box-shadow: var(--shadow);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
          border: 1px solid var(--border);
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }

        .icon-container {
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .feature-icon {
          width: 1.75rem;
          height: 1.75rem;
          color: white;
        }

        .feature-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--text);
        }

        .feature-description {
          font-size: 1.125rem;
          color: var(--text-light);
          margin: 0 auto;
          line-height: 1.6;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .feature-card {
          position: relative;
          padding: 2rem;
          background-color: var(--card);
          border-radius: 1rem;
          box-shadow: var(--shadow);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
          border: 1px solid var(--border);
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }

        .icon-container {
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .feature-icon {
          width: 1.75rem;
          height: 1.75rem;
          color: white;
        }

        .feature-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--text);
        }

        .feature-desc {
          font-size: 1rem;
          line-height: 1.6;
          color: var(--text-light);
          margin-bottom: 1.5rem;
        }

        .feature-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--primary);
          transition: all 0.3s;
        }

        .feature-link:hover {
          gap: 0.75rem;
        }

        .link-icon {
          width: 1rem;
          height: 1rem;
        }

        .feature-hover-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s;
        }

        /* How It Works Section */
        .how-it-works {
          padding: 6rem 5%;
          background-color: var(--bg);
          position: relative;
        }

        .steps-container {
          position: relative;
          max-width: 900px;
          margin: 0 auto;
          padding: 3rem 0;
        }

        .steps-line {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          height: 100%;
          background-color: var(--primary-light);
        }

        .step-card {
          position: relative;
          background-color: var(--card);
          border-radius: 1rem;
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: var(--shadow);
          border: 1px solid var(--border);
          max-width: 400px;
        }

        .step-card:nth-child(odd) {
          margin-right: auto;
        }

        .step-card:nth-child(even) {
          margin-left: auto;
        }

        .step-number {
          position: absolute;
          top: -1rem;
          left: 2rem;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          background-color: var(--primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1rem;
        }

        .step-icon-container {
          width: 3rem;
          height: 3rem;
          border-radius: 0.75rem;
          background-color: var(--primary-light);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .step-icon {
          width: 1.5rem;
          height: 1.5rem;
          color: var(--primary);
        }

        .step-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--text);
        }

        .step-description {
          font-size: 1rem;
          color: var(--text-light);
          line-height: 1.6;
        }

        .how-it-works-cta {
          text-align: center;
          margin-top: 3rem;
        }

        /* Stats Section */
        .stats {
          padding: 6rem 5%;
          background-color: var(--card);
          position: relative;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .stat-card {
          padding: 2.5rem 2rem;
          background-color: var(--bg);
          border-radius: 1rem;
          text-align: center;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: var(--shadow);
          border: 1px solid var(--border);
        }

        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }

        .stat-icon {
          width: 3rem;
          height: 3rem;
          margin: 0 auto;
          color: var(--primary);
          transition: all 0.3s;
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 700;
          margin: 1.5rem 0 0.5rem;
          background: var(--gradient);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .stat-label {
          font-size: 1rem;
          color: var(--text-light);
        }

        /* Testimonials Section */
        .testimonials {
          padding: 6rem 5%;
          background-color: var(--bg);
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .testimonial-card {
          background-color: var(--card);
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: var(--shadow);
          border: 1px solid var(--border);
        }

        .testimonial-rating {
          display: flex;
          gap: 0.25rem;
          margin-bottom: 1.5rem;
        }

        .star-icon {
          width: 1.25rem;
          height: 1.25rem;
          color: var(--text-lighter);
        }

        .star-icon.filled {
          color: #F59E0B;
        }

        .testimonial-quote {
          font-size: 1rem;
          line-height: 1.6;
          color: var(--text);
          font-style: italic;
          margin-bottom: 1.5rem;
        }

        .testimonial-author {
          display: flex;
          flex-direction: column;
        }

        .author-name {
          font-weight: 600;
          color: var(--text);
        }

        .author-role {
          font-size: 0.875rem;
          color: var(--text-light);
        }

        /* Enhanced CTA Section */
        .cta {
          padding: 6rem 5%;
          position: relative;
          overflow: hidden;
        }

        .cta-container {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .cta-title {
          font-size: 2.25rem;
         
          font-weight: 700;
          color: white;
          margin-bottom: 1rem;
        }

        .cta-subtitle {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 2.5rem;
        }

        .cta-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
        }

        .cta-primary-btn {
          display: inline-block;
          background-color: white;
          color: var(--primary);
          font-size: 1rem;
          font-weight: 500;
          padding: 0.875rem 2rem;
          border-radius: 0.5rem;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cta-primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(255, 255, 255, 0.2);
        }

        .cta-secondary-btn {
          display: inline-block;
          background-color: transparent;
          border: 2px solid white;
          color: white;
          font-size: 1rem;
          font-weight: 500;
          padding: 0.875rem 2rem;
          border-radius: 0.5rem;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cta-secondary-btn:hover {
          background-color: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        .cta-gradient {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            270deg,
            var(--feature-1),
            var(--feature-2),
            var(--feature-3),
            var(--feature-2),
            var(--feature-1)
          );
          background-size: 300% 300%;
          z-index: 1;
        }

        /* Footer */
        .footer {
          position: relative;
          padding-top: 8rem;
          padding-bottom: 3rem;
          background-color: var(--bg);
          color: var(--text-light);
        }

        .footer-wave {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          overflow: hidden;
          line-height: 0;
        }

        .footer-wave svg {
          position: relative;
          display: block;
          width: calc(100% + 1.3px);
          height: 100px;
        }

        .footer-wave-path {
          fill: var(--card);
        }

        .footer-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 5%;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 3rem;
          margin-bottom: 3rem;
        }

        .footer-col {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .footer-logo {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .footer-about {
          font-size: 0.875rem;
          line-height: 1.6;
          color: var(--text-light);
        }

        .footer-social {
          display: flex;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .social-link {
          transition: transform 0.3s;
        }

        .social-link:hover {
          transform: translateY(-3px);
        }

        .footer-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text);
          margin-bottom: 1rem;
        }

        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-link {
          font-size: 0.875rem;
          color: var(--text-light);
          transition: color 0.3s;
        }

        .footer-link:hover {
          color: var(--primary);
        }

        .footer-contact {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-contact li {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.875rem;
        }

        .contact-icon {
          width: 1rem;
          height: 1rem;
          color: var(--primary);
          flex-shrink: 0;
          margin-top: 0.125rem;
        }

        .footer-bottom {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding-top: 2rem;
          margin-top: 2rem;
          border-top: 1px solid var(--border);
        }

        .footer-copyright {
          font-size: 0.875rem;
          text-align: center;
        }

        .footer-legal {
          display: flex;
          gap: 1.5rem;
        }

        /* Floating Buttons */
        .floating-buttons {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          z-index: 50;
        }

        .scroll-top-btn {
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          background-color: var(--primary);
          border: none;
          box-shadow: var(--shadow);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .scroll-top-btn:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
        }

        .scroll-top-icon {
          width: 1.25rem;
          height: 1.25rem;
          color: white;
        }

        /* Responsive Styles */
        @media (max-width: 1024px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 3rem;
            text-align: center;
          }

          .hero-subtitle {
            margin: 0 auto 2.5rem;
          }

          .hero-trust {
            justify-content: center;
          }

          .hero-image {
            min-height: 300px;
          }
        }

        @media (max-width: 768px) {
          .header {
            padding: 1rem;
          }

          .nav-desktop, .header-actions {
            display: none;
          }

          .mobile-menu-button {
            display: block;
          }

          .hero {
            padding: 7rem 1.5rem 4rem;
          }

          .hero-title {
            font-size: 2.25rem;
          }

          .hero-subtitle {
            font-size: 1.125rem;
          }

          .features,
          .stats,
          .how-it-works,
          .testimonials,
          .cta {
            padding: 4rem 1.5rem;
          }

          .section-title {
            font-size: 1.75rem;
          }

          .section-description {
            font-size: 1rem;
          }

          .steps-line {
            display: none;
          }

          .step-card {
            max-width: 100%;
            margin: 0 auto 2rem !important;
          }

          .floating-buttons {
            bottom: 1.5rem;
            right: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 2rem;
          }
          .hero-subtitle {
          font-size: 1.20rem;
          line-height: 1.6;
          color: var(--text-light);
          max-width: 700px;
          margin: 0 auto 2.5rem;
        }

          .hero-actions,
          .cta-actions {
            flex-direction: column;
            width: 100%;
          }

          .primary-btn,
          .secondary-btn,
          .cta-primary-btn,
          .cta-secondary-btn {
            width: 100%;
            justify-content: center;
          }

          .features-grid,
          .stats-grid,
          .testimonials-grid {
            grid-template-columns: 1fr;
          }

          .footer-grid {
            grid-template-columns: 1fr;
          }

          .footer-legal {
            flex-direction: column;
            gap: 0.4rem;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;
 