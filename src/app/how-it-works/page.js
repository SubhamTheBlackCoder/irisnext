"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  DocumentArrowUpIcon,
  SparklesIcon,
  BriefcaseIcon,
  PlayIcon,
  UserGroupIcon,
  XMarkIcon,
  DocumentTextIcon,
  DocumentIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import "./HowitWork.css";

const HowItWorks = () => {
  const [showVideo, setShowVideo] = useState(false);
  const steps = [
    {
      step: "1",
      title: "Upload Your Resume",
      description: "Simply upload your current resume in PDF, Word format.",
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
  ];

  const handleVideoOpen = () => {
    setShowVideo(true);
    document.body.classList.add("modal-open");
  };

  const handleVideoClose = () => {
    setShowVideo(false);
    document.body.classList.remove("modal-open");
  };

  return (
    <>
     
      <div className="how-it-works-page">
        {/* Video Modal */}
        {showVideo && (
          <motion.div
            className="video-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="modal-content">
              <button className="close-button" onClick={handleVideoClose}>
                <XMarkIcon className="close-icon" />
              </button>
              <div className="video-container">
                {/* Replace with your actual video embed code */}
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Irisnex Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </motion.div>
        )}

        {/* Hero Section */}
        <section className="process-hero">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="hero-content"
            >
              <span className="section-label">Process</span>
              <h1 className="hero-title">How Irisne᙭ Works</h1>
              <p className="hero-subtitle">
                Get job-ready in just three simple steps with our AI-powered
                platform.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="steps-section">
          <div className="section-container">
            <div className="steps-container">
              <div className="steps-line"></div>
              {steps.map((step, index) => (
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
          </div>
        </section>

        {/* Resume Guidelines Section */}
        <section className="guidelines-section">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="guidelines-content"
            >
              <h2 className="section-title">Resume Guidelines</h2>
              <p className="section-subtitle">
                For optimal results with our AI analysis, please follow these
                guidelines:
              </p>

              <div className="guidelines-grid">
                <div className="guideline-card">
                  <div className="guideline-icon">
                    <DocumentTextIcon />
                  </div>
                  <h3>Format Requirements</h3>
                  <ul>
                    <li>Use clean, well-structured layouts</li>
                    <li>Standard sections (Experience, Education, Skills)</li>
                    <li>Clear headings and bullet points</li>
                  </ul>
                </div>

                <div className="guideline-card">
                  <div className="guideline-icon">
                    <DocumentIcon />
                  </div>
                  <h3>File Formats</h3>
                  <ul>
                    <li>
                      <strong>.docx (Word):</strong> Full feature access
                      including
                      <span className="highlight"> One-Click Optimizer</span>
                    </li>
                    <li>
                      <strong>.pdf:</strong> All features except
                      <span className="highlight"> One-Click Optimizer</span>
                    </li>
                    <li>Max file size: 5MB</li>
                  </ul>
                </div>

                <div className="guideline-card">
                  <div className="guideline-icon">
                    <LightBulbIcon />
                  </div>
                  <h3>Best Practices</h3>
                  <ul>
                    <li>Include measurable achievements</li>
                    <li>Use industry-standard keywords</li>
                    <li>Keep to 1-2 pages maximum</li>
                    <li>Proofread for spelling/grammar errors</li>
                  </ul>
                </div>
              </div>

              <div className="format-warning">
                <span className="warning-icon">!</span>
                <p>
                  Avoid scanned documents, image-based PDFs, and resumes with
                  complex graphics/tables for best results
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Video Demo */}
        <section className="demo-section">
          <div className="section-container">
            <div className="demo-content">
              <div className="demo-text">
                <h2>See It In Action</h2>
                <p>
                  Watch our 2-minute demo to see how Irisne᙭ transforms your
                  resume and accelerates your job search.
                </p>
                <ul className="demo-features">
                  <li>
                    <UserGroupIcon className="feature-icon" /> Real resume
                    transformation
                  </li>
                  <li>
                    <SparklesIcon className="feature-icon" /> Live ATS scoring
                  </li>
                  <li>
                    <BriefcaseIcon className="feature-icon" /> Job matching
                    simulation
                  </li>
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="demo-button"
                  onClick={handleVideoOpen}
                >
                  Watch Full Demo
                </motion.button>
              </div>

              <div className="demo-video">
                <div className="video-placeholder" onClick={handleVideoOpen}>
                  <PlayIcon className="play-icon" />
                  <div className="play-label">Click to Play</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
     
      </div>
    </>
  );
};

export default HowItWorks;
