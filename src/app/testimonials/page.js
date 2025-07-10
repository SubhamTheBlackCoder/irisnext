"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  StarIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  UserGroupIcon,
  BriefcaseIcon,
  ChartBarIcon
} from "@heroicons/react/24/outline";
import './Testimonial.css'


const Testimonials = () => {
  const testimonials = [
    {
      name: "Riya M",
      role: "B.Tech Student, Pune",
      quote: "After optimizing my resume, I started getting callbacks from companies I couldn't even crack earlier. The suggestions were really smart and specific.",
      rating: 5,
      before: "0 interviews",
      after: "5 interviews in 2 weeks"
    },
    {
      name: "Arjun V",
      role: "Final Year B.Tech Student, NIT Rourkela",
      quote: "I used the One Click Optimizer and it literally rewrote my resume based on the job I was applying for. It added skills I didn't even think to include!",
      rating: 5,
      before: "1.2% response rate",
      after: "34% response rate"
    },
    {
      name: "Pooja Mohapatra",
      role: "Marketing Director at Microsoft",
      quote: "I was struggling with resumes for different job roles. This tool made it so easy — just paste the job description, click once, and done!",
      rating: 4,
      before: "3 weeks to tailor resume",
      after: "90 seconds per application"
    },
    {
      name: "Sanjay K",
      role: "Software Developer, Bangalore",
      quote: "The ATS optimization feature helped me pass screening systems that previously rejected me. Landed 3 interviews in the first week!",
      rating: 5,
      before: "Rejected by ATS",
      after: "92% ATS compatibility"
    },
    {
      name: "Priya T",
      role: "MBA Graduate, Delhi",
      quote: "The cover letter generator saved me hours per application. I went from sending 2 applications/day to 10 without sacrificing quality.",
      rating: 5,
      before: "2 applications",
      after: "10 quality applications"
    },
    {
      name: "Rajesh P",
      role: "Career Switcher, Mumbai",
      quote: "The skills gap analysis showed me exactly what certifications to pursue. I went from no callbacks to a job offer in my target industry in 2 months.",
      rating: 4,
      before: "0 relevant offers",
      after: "2 offers in target industry"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredTestimonials = activeFilter === "all" 
    ? testimonials 
    : testimonials.filter(t => t.rating === 5);

  const visibleTestimonials = filteredTestimonials.slice(currentIndex, currentIndex + 3);

  const nextTestimonials = () => {
    setCurrentIndex(prev => 
      prev + 3 >= filteredTestimonials.length ? 0 : prev + 3
    );
  };

  const prevTestimonials = () => {
    setCurrentIndex(prev => 
      prev - 3 < 0 ? filteredTestimonials.length - 3 : prev - 3
    );
  };

  const stats = [
    { value: "78%", label: "Interview Rate Increase", icon: <ChartBarIcon className="stat-icon" /> },
    { value: "9.2/10", label: "Average User Rating", icon: <StarIcon className="stat-icon" /> },
    { value: "64%", label: "Faster Job Placement", icon: <BriefcaseIcon className="stat-icon" /> },
    { value: "1000+", label: "Dream Jobs Landed", icon: <UserGroupIcon className="stat-icon" /> }
  ];

  return (
    <>
    
    <div className="testimonials-page">
      {/* Hero Section */}
      <section className="testimonials-hero">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-content"
          >
            <span className="section-label">Testimonials</span>
            <h1 className="hero-title">
              Success Stories From Our Users
            </h1>
            <p className="hero-subtitle">
              Don't just take our word for it - hear from professionals who've 
              landed their dream jobs using Irisne᙭.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="section-container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {stat.icon}
                <h3 className="stat-value">{stat.value}</h3>
                <p className="stat-label">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Real People, Real Results</h2>
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
                onClick={() => setActiveFilter("all")}
              >
                All Testimonials
              </button>
              <button 
                className={`filter-btn ${activeFilter === "5star" ? "active" : ""}`}
                onClick={() => setActiveFilter("5star")}
              >
                5-Star Reviews
              </button>
            </div>
          </div>

          <div className="testimonials-container">
            <button className="nav-button prev" onClick={prevTestimonials}>
              <ArrowLeftIcon className="nav-icon" />
            </button>
            
            <div className="testimonials-grid">
              {visibleTestimonials.map((testimonial, index) => (
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
                  
                  <div className="result-comparison">
                    <div className="result-before">
                      <span>Before</span>
                      <p>{testimonial.before}</p>
                    </div>
                    <div className="result-arrow">→</div>
                    <div className="result-after">
                      <span>After</span>
                      <p>{testimonial.after}</p>
                    </div>
                  </div>
                  
                  <div className="testimonial-author">
                    <h3 className="author-name">{testimonial.name}</h3>
                    <p className="author-role">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <button className="nav-button next" onClick={nextTestimonials}>
              <ArrowRightIcon className="nav-icon" />
            </button>
          </div>
        </div>
      </section>

      
    </div>
    </>
  );
};

export default Testimonials;