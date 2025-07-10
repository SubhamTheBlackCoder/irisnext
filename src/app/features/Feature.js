"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  ChartBarIcon,
  BriefcaseIcon,
  DocumentArrowUpIcon,
  EnvelopeIcon,
  UserGroupIcon,
  LightBulbIcon,
  SparklesIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import "./Feature.css";


const Features = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const features = [
    {
      title: "ATS Optimization",
      icon: <ChartBarIcon className="feature-icon" />,
      desc: "Get ATS-Ready in Seconds — Make Your Resume Pass Where It Matters Most.",
      color: "#3B82F6",
      details: [
        "Real-time compatibility scoring",
        "Keyword optimization suggestions",
        "Formatting error detection",
        "Industry-specific requirements",
      ],
    },
    {
      title: "One Click Optimizer",
      icon: <BriefcaseIcon className="feature-icon" />,
      desc: "Optimize your resume and profile in one click to get better job matches instantly.",
      color: "#8B5CF6",
      details: [
        "Automatic skill gap analysis",
        "Position-specific tailoring",
        "Competency scoring",
        "Smart formatting adjustments",
      ],
    },
    {
      title: "Resume Analysis",
      icon: <DocumentArrowUpIcon className="feature-icon" />,
      desc: "Instant ATS score, skill insights, and expert tips—visually simplified for faster improvements.",
      color: "#EC4899",
      details: [
        "Visual scoring dashboard",
        "Section-by-section feedback",
        "Impact vs. fluff analysis",
        "Actionable improvement steps",
      ],
    },
    {
      title: "Cover Letter Generator",
      icon: <EnvelopeIcon className="feature-icon" />,
      desc: "Create personalized cover letters tailored to each job application",
      color: "#10B981",
      details: [
        "Company-specific templates",
        "AI-generated content",
        "Tone customization",
        "One-click export options",
      ],
    },
    {
      title: "Interview Prep",
      icon: <UserGroupIcon className="feature-icon" />,
      desc: "Practice with common interview questions based on your resume",
      color: "#F59E0B",
      details: [
        "Behavioral question generator",
        "Technical question bank",
        "Answer evaluation",
        "Company-specific insights",
      ],
    },
    {
      title: "Career Insights",
      icon: <LightBulbIcon className="feature-icon" />,
      desc: "Get data-driven advice to improve your career trajectory",
      color: "#6366F1",
      details: [
        "Salary benchmarking",
        "Career path projections",
        "Skill development roadmap",
        "Industry trend analysis",
      ],
    },
  ];

  return (
    <>
      
      <div className="features-page">
        {/* Hero Section */}
        <section className="features-hero">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="hero-content"
            >
              <span className="section-label">Features</span>
              <h1 className="hero-title">
                Powerful Tools to Transform Your Job Search
              </h1>
              <p className="hero-subtitle">
                Our AI-powered platform combines cutting-edge technology with
                industry expertise to maximize your job search success.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="features-section">
          <div className="section-container">
            <div className="features-grid">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
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

                  <ul className="feature-details">
                    {feature.details.map((detail, i) => (
                      <li key={i}>
                        <ShieldCheckIcon className="detail-icon" />
                        {detail}
                      </li>
                    ))}
                  </ul>

                  <motion.div
                    className="feature-hover-bg"
                    style={{ backgroundColor: feature.color }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
      </div>
    
    </>
  );
};

export default Features;
