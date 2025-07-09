"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  BriefcaseIcon,
  UserGroupIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CloudIcon,
  ServerIcon,
  LockClosedIcon,
  GlobeAltIcon,
  CurrencyRupeeIcon,
  CodeBracketIcon,
  StarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";


const AboutUs = () => {
  // Animation variants
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

  return (
    <>
      <div className="about-page">
        {/* Hero Section - Without Image */}
        <section className="about-hero">
          <div className="section-container">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="hero-content"
            >
              <motion.div className="hero-text">
                <motion.span
                  className="section-label"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  About Irisne᙭
                </motion.span>
                <motion.h1 variants={fadeInUp} className="hero-title">
                  Empowering Careers Through{" "}
                  <span className="highlight">AI Innovation</span>
                </motion.h1>
                <motion.p variants={fadeInUp} className="hero-subtitle">
                  Irisne᙭ is an AI-powered platform designed to enhance job
                  seekers' chances of success by providing intelligent resume
                  analysis, ATS compatibility scoring, and personalized
                  recommendations.
                </motion.p>
                
                {/* Added Key Points Section */}
                <motion.div 
                  variants={fadeInUp}
                  className="key-points-container"
                >
                  <div className="key-point">
                    <ShieldCheckIcon className="point-icon" />
                    <span>ATS Compatible</span>
                  </div>
                  <div className="key-point">
                    <ChartBarIcon className="point-icon" />
                    <span>Keyword Optimized</span>
                  </div>
                  <div className="key-point">
                    <SparklesIcon className="point-icon" />
                    <span>AI Enhanced</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="founder-section">
          <div className="section-container">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="founder-content"
            >
              <motion.div variants={fadeInUp} className="founder-image">
                <div className="founder-avatar">
                
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="founder-text">
                <span className="section-label">Our Founder</span>
                <h2 className="section-title">Subham Dalabehera</h2>
                <p className="section-description">
                  A passionate technologist with expertise in AI and career-tech
                  innovation, Subham founded Irisne᙭ to bridge the gap between
                  talented professionals and recruiter systems.
                </p>
                <div className="founder-quote">
                  <LightBulbIcon className="quote-icon" />
                  <p>
                    "Our mission is to empower job seekers with cutting-edge tools
                    that level the playing field in today's competitive job
                    market."
                  </p>
                </div>
                <div className="founder-points">
                  <div className="founder-point">
                    <UserIcon className="point-icon" />
                    <span>
                      Fullstack developer with expertise in AWS, Next.js, Java
                      Spring, and React
                    </span>
                  </div>
                  <div className="founder-point">
                    <LightBulbIcon className="point-icon" />
                    <span>
                      Driven by a passion for AI and career-tech innovation
                    </span>
                  </div>
                  <div className="founder-point">
                    <CodeBracketIcon className="point-icon" />
                    <span>
                      Built and managed independently with a focus on product
                      excellence
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="offer-section">
          <div className="section-container">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="section-header"
            >
              <motion.span variants={fadeInUp} className="section-label">
                Our Services
              </motion.span>
              <motion.h2 variants={fadeInUp} className="section-title">
                Intelligent Career Tools
              </motion.h2>
              <motion.p variants={fadeInUp} className="section-description">
                Irisne᙭ provides comprehensive solutions to enhance your job
                search success
              </motion.p>
            </motion.div>

            <div className="offer-grid">
              {[
                {
                  icon: <DocumentTextIcon className="offer-icon" />,
                  title: "Resume Analysis",
                  description:
                    "Detailed feedback on formatting, keywords, and content structure",
                  color: "#3B82F6",
                },
                {
                  icon: <ChartBarIcon className="offer-icon" />,
                  title: "ATS Compatibility",
                  description:
                    "Real-time scoring against tracking systems used by top companies",
                  color: "#8B5CF6",
                },
                {
                  icon: <SparklesIcon className="offer-icon" />,
                  title: "Personalized Recommendations",
                  description:
                    "Actionable insights to improve your resume's effectiveness",
                  color: "#EC4899",
                },
                {
                  icon: <BriefcaseIcon className="offer-icon" />,
                  title: "Job Matching",
                  description:
                    "AI-powered recommendations based on your skills and experience",
                  color: "#10B981",
                },
                {
                  icon: <DocumentTextIcon className="offer-icon" />,
                  title: "Cover Letter Generator",
                  description:
                    "Create tailored cover letters for each application",
                  color: "#F59E0B",
                },
                {
                  icon: <UserGroupIcon className="offer-icon" />,
                  title: "Interview Preparation",
                  description:
                    "Practice with common questions based on your resume",
                  color: "#6366F1",
                },
              ].map((offer, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.15 }}
                  className="offer-card"
                  whileHover={{ y: -10 }}
                >
                  <div
                    className="icon-container"
                    style={{ backgroundColor: offer.color }}
                  >
                    {offer.icon}
                  </div>
                  <h3>{offer.title}</h3>
                  <p>{offer.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="tech-section">
          <div className="section-container">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="section-header"
            >
              <motion.span variants={fadeInUp} className="section-label">
                Our Technology
              </motion.span>
              <motion.h2 variants={fadeInUp} className="section-title">
                Powered by Cutting-Edge AI
              </motion.h2>
              <motion.p variants={fadeInUp} className="section-description">
                Irisne᙭ leverages advanced technologies to deliver unparalleled
                results
              </motion.p>
            </motion.div>

            <div className="tech-grid">
              {[
                {
                  icon: <CloudIcon className="tech-icon" />,
                  title: "AWS Infrastructure",
                  description:
                    "Lambda, Textract, and Comprehend for scalable processing",
                  color: "#FF9900",
                },
                {
                  icon: <SparklesIcon className="tech-icon" />,
                  title: "Claude AI via Bedrock",
                  description:
                    "State-of-the-art NLP for resume analysis and optimization",
                  color: "#2563EB",
                },
                {
                  icon: <ServerIcon className="tech-icon" />,
                  title: "React Frontend",
                  description:
                    "Modern, responsive user interface for seamless experience",
                  color: "#61DAFB",
                },
                {
                  icon: <LockClosedIcon className="tech-icon" />,
                  title: "Secure Architecture",
                  description: "Enterprise-grade security to protect your data",
                  color: "#10B981",
                },
                {
                  icon: <CodeBracketIcon className="tech-icon" />,
                  title: "Real-time Analysis",
                  description: "Instant keyword matching and score breakdown",
                  color: "#8B5CF6",
                },
                {
                  icon: <DocumentTextIcon className="tech-icon" />,
                  title: "Document Optimization",
                  description: "Generates optimized resumes and cover letters",
                  color: "#EC4899",
                },
              ].map((tech, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.15 }}
                  className="tech-card"
                >
                  <div
                    className="icon-container"
                    style={{ backgroundColor: tech.color }}
                  >
                    {tech.icon}
                  </div>
                  <h3>{tech.title}</h3>
                  <p>{tech.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="values-section">
          <div className="section-container">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="section-header"
            >
              <motion.span variants={fadeInUp} className="section-label">
                Our Commitment
              </motion.span>
              <motion.h2 variants={fadeInUp} className="section-title">
                Core Values & Principles
              </motion.h2>
            </motion.div>

            <div className="values-container">
              <motion.div variants={fadeInUp} className="value-card">
                <ShieldCheckIcon className="value-icon" />
                <h3>Data Privacy</h3>
                <p>
                  Your information is protected with enterprise-grade security
                  measures and never shared without consent.
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                transition={{ delay: 0.1 }}
                className="value-card"
              >
                <LightBulbIcon className="value-icon" />
                <h3>Transparency</h3>
                <p>
                  Clear explanations of how our AI works and how your resume is
                  evaluated.
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
                className="value-card"
              >
                <GlobeAltIcon className="value-icon" />
                <h3>Accessibility</h3>
                <p>
                  Free tier available for everyone, with premium features for
                  advanced tools.
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                transition={{ delay: 0.3 }}
                className="value-card"
              >
                <SparklesIcon className="value-icon" />
                <h3>Continuous Innovation</h3>
                <p>
                  Constantly evolving based on user feedback and technological
                  advancements.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="features-section">
          <div className="section-container">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="section-header"
            >
              <motion.span variants={fadeInUp} className="section-label">
                Why Choose Us
              </motion.span>
              <motion.h2 variants={fadeInUp} className="section-title">
                Key Advantages
              </motion.h2>
            </motion.div>

            <div className="features-grid">
              {[
                {
                  icon: <ShieldCheckIcon className="feature-icon" />,
                  title: "Ethical AI",
                  description:
                    "Committed to ethical use of AI with responsible algorithms",
                },
                {
                  icon: <CurrencyRupeeIcon className="feature-icon" />,
                  title: "Affordable Pricing",
                  description:
                    "Free tier available with premium options for advanced features",
                },
                {
                  icon: <StarIcon className="feature-icon" />,
                  title: "Trusted Solution",
                  description:
                    "Used by job seekers across industries to improve shortlisting rates",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  transition={{ delay: index * 0.15 }}
                  className="feature-card"
                >
                  <div className="feature-icon-container">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="vision-section">
          <div className="section-container">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="vision-content"
            >
              <motion.div variants={fadeInUp} className="vision-text">
                <span className="section-label">Our Vision</span>
                <h2 className="section-title">
                  To become the go-to AI assistant for career advancement
                </h2>
                <p className="section-description">
                  We're building a future where job searching is transformed from
                  a stressful, uncertain process into an empowered, strategic
                  career move powered by artificial intelligence.
                </p>

                <div className="vision-points">
                  <div className="vision-point">
                    <div className="point-icon">✓</div>
                    <span>
                      Available worldwide to job seekers at all career stages
                    </span>
                  </div>
                  <div className="vision-point">
                    <div className="point-icon">✓</div>
                    <span>Continuously evolving based on user feedback</span>
                  </div>
                  <div className="vision-point">
                    <div className="point-icon">✓</div>
                    <span>Trusted by professionals across industries</span>
                  </div>
                  <div className="vision-point">
                    <div className="point-icon">✓</div>
                    <span>Empowering individuals to win more interviews</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* Styles */}
        <style >{`
          :root {
            --primary: #2563eb;
            --primary-hover: #1d4ed8;
            --text: #111827;
            --text-light: #6b7280;
            --bg: #f9fafb;
            --card: #ffffff;
            --border: rgba(0, 0, 0, 0.1);
            --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            --shadow-md: 0 10px 15px rgba(0, 0, 0, 0.1);
            --feature-1: #3b82f6;
            --feature-2: #8b5cf6;
            --feature-3: #ec4899;
            --feature-4: #10b981;
            --feature-5: #f59e0b;
            --feature-6: #6366f1;
          }

          .about-page {
            font-family: "Inter", sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            overflow-x: hidden;
            color: var(--text);
            background-color: var(--bg);
            line-height: 1.5;
          }

          .section-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 7%;
          }

          .section-label {
            display: block;
            font-size: 0.875rem;
            font-weight: 500;
            color: var(--primary);
            margin-bottom: 1rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          .section-title {
            font-size: 2.25rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            color: var(--text);
          }

          .highlight {
            background: linear-gradient(
              90deg,
              var(--feature-1),
              var(--feature-2)
            );
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }

          .section-description {
            font-size: 1.125rem;
            color: var(--text-light);
            line-height: 1.6;
            max-width: 700px;
          }

          /* Hero Section - Updated without image */
          .about-hero {
            padding: 6rem 0;
            background: linear-gradient(135deg, #f0f4ff 0%, #fdf2ff 100%);
            position: relative;
            overflow: hidden;
          }

          .hero-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .hero-text {
            width: 100%;
            max-width: 800px;
          }

          .hero-title {
            font-size: clamp(2rem, 5vw, 3rem);
            font-weight: 800;
            line-height: 1.2;
            margin-bottom: 1rem;
            color: var(--text);
          }

          .hero-subtitle {
            font-size: clamp(1rem, 2.5vw, 1.25rem);
            line-height: 1.6;
            color: var(--text-light);
            max-width: 700px;
            margin: 0 auto 1.5rem;
          }

          /* Key Points Container */
          .key-points-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 1.5rem;
            margin-top: 2rem;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
          }

          .key-point {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            background: rgba(255, 255, 255, 0.7);
            padding: 0.75rem 1.5rem;
            border-radius: 2rem;
            box-shadow: var(--shadow);
            font-weight: 500;
            backdrop-filter: blur(4px);
          }

          .point-icon {
            width: 1.25rem;
            height: 1.25rem;
            min-width: 1.25rem;
            color: var(--primary);
          }

          /* Founder Section */
          .founder-section {
            padding: 6rem 0;
            background-color: var(--card);
          }

          .founder-content {
            display: flex;
            align-items: center;
            gap: 4rem;
          }

          .founder-image {
            flex: 1;
            display: flex;
            justify-content: center;
          }

          .founder-avatar {
            width: 250px;
            height: 250px;
            border-radius: 50%;
            overflow: hidden;
            box-shadow: var(--shadow-md);
            background: #e0e7ff;
          }

          .founder-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }

          .founder-text {
            flex: 1;
          }

          .founder-quote {
            background: var(--bg);
            border-left: 4px solid var(--primary);
            padding: 1.5rem;
            margin-top: 2rem;
            border-radius: 0 0.5rem 0.5rem 0;
            position: relative;
          }

          .founder-quote p {
            font-style: italic;
            color: var(--text);
          }

          .quote-icon {
            position: absolute;
            top: -15px;
            left: -15px;
            width: 40px;
            height: 40px;
            background: white;
            border-radius: 50%;
            padding: 8px;
            color: var(--primary);
            border: 2px solid var(--bg);
          }

          .founder-points {
            margin-top: 2rem;
          }

          .founder-point {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1rem;
          }

          .founder-point .point-icon {
            width: 1.5rem;
            height: 1.5rem;
            color: var(--primary);
            flex-shrink: 0;
          }

          /* Offer Section */
          .offer-section {
            padding: 6rem 0;
            background-color: var(--bg);
          }

          .section-header {
            text-align: center;
            margin-bottom: 4rem;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
          }

          .offer-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
          }

          .offer-card {
            position: relative;
            padding: 2rem;
            background-color: var(--card);
            border-radius: 1rem;
            box-shadow: var(--shadow);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            overflow: hidden;
            border: 1px solid var(--border);
            z-index: 1;
            text-align: center;
          }

          .offer-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          }

          .icon-container {
            width: 4rem;
            height: 4rem;
            border-radius: 0.75rem;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
          }

          .offer-icon {
            width: 2rem;
            height: 2rem;
            color: white;
          }

          .offer-card h3 {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: var(--text);
          }

          .offer-card p {
            font-size: 1rem;
            line-height: 1.6;
            color: var(--text-light);
          }

          /* Tech Section */
          .tech-section {
            padding: 6rem 0;
            background-color: var(--card);
          }

          .tech-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-bottom: 3rem;
          }

          .tech-card {
            padding: 2rem;
            background: var(--bg);
            border-radius: 1rem;
            text-align: center;
            box-shadow: var(--shadow);
            border: 1px solid var(--border);
          }

          .tech-icon {
            width: 2.5rem;
            height: 2.5rem;
            color: white;
          }

          /* Values Section */
          .values-section {
            padding: 6rem 0;
            background-color: var(--bg);
          }

          .values-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            max-width: 1200px;
            margin: 0 auto;
          }

          .value-card {
            padding: 2rem;
            background: var(--card);
            border-radius: 1rem;
            box-shadow: var(--shadow);
            border: 1px solid var(--border);
            text-align: center;
            transition: all 0.3s;
          }

          .value-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          }

          .value-icon {
            width: 3rem;
            height: 3rem;
            margin: 0 auto 1.5rem;
            color: var(--primary);
          }

          .value-card h3 {
            font-size: 1.25rem;
            margin-bottom: 1rem;
          }

          /* Features Section */
          .features-section {
            padding: 6rem 0;
            background-color: var(--card);
          }

          .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            max-width: 1200px;
            margin: 0 auto;
          }

          .feature-card {
            padding: 2rem;
            background: var(--bg);
            border-radius: 1rem;
            box-shadow: var(--shadow);
            border: 1px solid var(--border);
            text-align: center;
            transition: all 0.3s;
          }

          .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          }

          .feature-icon-container {
            width: 4rem;
            height: 4rem;
            border-radius: 50%;
            background: rgba(37, 99, 235, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
          }

          .feature-icon {
            width: 2rem;
            height: 2rem;
            color: var(--primary);
          }

          .feature-card h3 {
            font-size: 1.25rem;
            margin-bottom: 1rem;
          }

          /* Vision Section */
          .vision-section {
            padding: 6rem 0;
            background-color: var(--bg);
          }

          .vision-content {
            display: flex;
            align-items: center;
            gap: 4rem;
          }

          .vision-text {
            flex: 1;
          }

          .vision-points {
            margin-top: 2rem;
          }

          .vision-point {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1rem;
          }

          .point-icon {
            width: 2rem;
            height: 2rem;
            background: var(--primary);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }

          /* Responsive Styles */
          @media (max-width: 1024px) {
            .hero-content,
            .founder-content,
            .vision-content {
              flex-direction: column;
              text-align: center;
            }

            .hero-text,
            .founder-text,
            .vision-text {
              margin-bottom: 3rem;
            }

            .section-description {
              margin-left: auto;
              margin-right: auto;
            }

            .founder-quote,
            .founder-points,
            .vision-points {
              text-align: left;
            }
          }

          @media (max-width: 768px) {
            .about-hero,
            .founder-section,
            .offer-section,
            .tech-section,
            .values-section,
            .vision-section,
            .features-section {
              padding: 4rem 0;
            }

            .hero-title {
              font-size: 2.25rem;
            }

            .hero-subtitle {
              font-size: 1.125rem;
            }

            .founder-avatar {
              width: 200px;
              height: 200px;
            }

            .key-points-container {
              flex-direction: column;
              align-items: center;
            }
          }

          @media (max-width: 480px) {
            .section-title {
              font-size: 1.75rem;
            }

            .hero-title {
              font-size: 2rem;
            }

            .hero-subtitle {
              font-size: 1rem;
            }

            .key-point {
              width: 100%;
              max-width: 300px;
            }
          }
        `}</style>
      </div>
      
    </>
  );
};

export default AboutUs;