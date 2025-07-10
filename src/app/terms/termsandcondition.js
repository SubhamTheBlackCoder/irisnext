"use client";

import React, { useEffect } from "react";
import  Link  from "next/link";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styled, { createGlobalStyle } from "styled-components";


// Global Styles with mobile fixes
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background-color: #f9fafb;
    color: #333;
    line-height: 1.6;
    overflow-x: hidden;
  }

  html {
    -webkit-text-size-adjust: 100%;
  }

  * {
    box-sizing: border-box;
  }
`;

// Styled Components with mobile optimizations
const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
  display: flex;
  flex-direction: column;
`;

const Header = styled(motion.div)`
  width: 100%;
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 3rem 0;
  color: white;
  position: relative;
  z-index: 10;

  @media (max-width: 768px) {
    padding: 2rem 0;
  }
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
`;

const Title = styled(motion.h1)`
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.1rem;
  opacity: 0.9;
  color: #bfdbfe;
  
  @media (max-width: 768px) {
    text-align: center;
    padding: 0 10px;
  }
`;

const ContentContainer = styled(motion.div)`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 20px;
  width: 100%;
  flex: 1;

  @media (max-width: 768px) {
    padding: 1.5rem 15px;
  }
`;

const Section = styled(motion.div)`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 1.75rem;
  margin-bottom: 1.75rem;
  transition: all 0.3s ease;
  overflow: hidden;

  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  @media (max-width: 768px) {
    padding: 1.25rem;
    margin-bottom: 1.5rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #111827;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const Text = styled.p`
  color: #4b5563;
  margin-bottom: 1rem;
  line-height: 1.7;
  font-size: 1rem;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const List = styled.ul`
  margin: 1rem 0 1rem 1rem;
  padding-left: 0.5rem;
  
  @media (max-width: 768px) {
    margin-left: 0.5rem;
  }
`;

const ListItem = styled.li`
  margin-bottom: 0.75rem;
  color: #4b5563;
  display: flex;
  align-items: flex-start;
  font-size: 1rem;
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
    margin-bottom: 0.5rem;
  }
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  padding: 0.25rem;
  margin-right: 0.75rem;
  margin-top: 0.25rem;
  flex-shrink: 0;
`;

const Footer = styled(motion.div)`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 1.75rem;
  margin-top: 2rem;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background-color: #8b5cf6;
  color: white;
  border-radius: 0.375rem;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s;
  margin-top: 1.25rem;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  &:hover {
    background-color: #7c3aed;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0,0,0,0.15);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 0.85rem;
  }
`;

const ContactBox = styled.div`
  background-color: #eff6ff;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
  font-size: 0.95rem;
  
  @media (max-width: 768px) {
    padding: 0.85rem;
  }
`;

const ContactText = styled.p`
  color: #1e40af;
  font-weight: 500;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const StrongText = styled.strong`
  color: #111827;
`;

// Component with optimized animations
function TermsAndConditions() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.05,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <>
    <PageContainer>
      <GlobalStyle />

      <Header initial="hidden" animate="visible" variants={headerVariants}>
        <Container>
          <Title
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ShieldCheckIcon style={{ width: "2rem", height: "2rem" }} />
            Terms and Conditions
          </Title>
          <Subtitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Last Updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Subtitle>
        </Container>
      </Header>

      <ContentContainer
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        <Section variants={itemVariants}>
          <SectionTitle>1. Introduction</SectionTitle>
          <Text>
            Welcome to Irisne᙭ ("we," "our," or "us"). These Terms and Conditions
            ("Terms") govern your use of our website, services, and applications
            (collectively, the "Service"). By accessing or using our Service,
            you agree to be bound by these Terms and our Privacy Policy.
          </Text>
        </Section>

        <Section variants={itemVariants}>
          <SectionTitle>2. Definitions</SectionTitle>
          <List>
            <ListItem>
              <IconWrapper
                style={{ backgroundColor: "#dbeafe", color: "#1e40af" }}
              >
                <svg
                  width="12"
                  height="12"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                </svg>
              </IconWrapper>
              <span>
                <StrongText>Service:</StrongText> The Irisne᙭ platform including
                all features, functionality, content, and documentation.
              </span>
            </ListItem>
            <ListItem>
              <IconWrapper
                style={{ backgroundColor: "#dbeafe", color: "#1e40af" }}
              >
                <svg
                  width="12"
                  height="12"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                </svg>
              </IconWrapper>
              <span>
                <StrongText>User:</StrongText> Any individual or entity that
                accesses or uses the Service.
              </span>
            </ListItem>
            <ListItem>
              <IconWrapper
                style={{ backgroundColor: "#dbeafe", color: "#1e40af" }}
              >
                <svg
                  width="12"
                  height="12"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                </svg>
              </IconWrapper>
              <span>
                <StrongText>Content:</StrongText> All text, documents, resumes,
                cover letters, data, and materials uploaded or created through
                the Service.
              </span>
            </ListItem>
            <ListItem>
              <IconWrapper
                style={{ backgroundColor: "#dbeafe", color: "#1e40af" }}
              >
                <svg
                  width="12"
                  height="12"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                </svg>
              </IconWrapper>
              <span>
                <StrongText>Subscription:</StrongText> Paid access to premium
                features of the Service.
              </span>
            </ListItem>
          </List>
        </Section>

        <Section variants={itemVariants}>
          <SectionTitle>3. Account Registration</SectionTitle>
          <Text>
            To access certain features, you must register an account. You agree
            to:
          </Text>
          <List>
            {[
              "Provide accurate, current, and complete information",
              "Maintain the security of your credentials",
              "Accept responsibility for all activities under your account",
              "Be at least 16 years of age or the age of majority in your jurisdiction",
            ].map((item, index) => (
              <ListItem key={index}>
                <IconWrapper
                  style={{ backgroundColor: "#dbeafe", color: "#1e40af" }}
                >
                  <svg
                    width="12"
                    height="12"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </IconWrapper>
                <span>{item}</span>
              </ListItem>
            ))}
          </List>
        </Section>

        <Section variants={itemVariants}>
          <SectionTitle>4. User Responsibilities</SectionTitle>
          <Text>You agree not to:</Text>
          <List>
            {[
              "Use the Service for any unlawful purpose",
              "Upload content that infringes on intellectual property rights",
              "Transmit viruses, malware, or harmful code",
              "Attempt to reverse engineer or access unauthorized areas",
              "Use automated systems to extract data without permission",
              "Misrepresent your identity or qualifications",
            ].map((item, index) => (
              <ListItem key={index}>
                <IconWrapper
                  style={{ backgroundColor: "#fee2e2", color: "#dc2626" }}
                >
                  <svg
                    width="12"
                    height="12"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </IconWrapper>
                <span>{item}</span>
              </ListItem>
            ))}
          </List>
        </Section>

        <Section variants={itemVariants}>
          <SectionTitle>5. Intellectual Property</SectionTitle>
          <Text>
            The Service and its original content, features, and functionality
            are owned by Irisne᙭ and are protected by international copyright,
            trademark, and other intellectual property laws. You retain
            ownership of content you upload, but grant us a worldwide,
            non-exclusive license to process it for Service provision.
          </Text>
        </Section>

        <Section variants={itemVariants}>
          <SectionTitle>6. Resume Analysis Service</SectionTitle>
          <Text>
            Our AI-powered resume analysis provides suggestions based on
            generally accepted hiring practices, but we cannot guarantee:
          </Text>
          <List>
            {[
              "Accuracy or completeness of analysis",
              "Compatibility with all Applicant Tracking Systems (ATS)",
              "Employment or interview outcomes",
            ].map((item, index) => (
              <ListItem key={index}>
                <IconWrapper
                  style={{ backgroundColor: "#fef3c7", color: "#d97706" }}
                >
                  <svg
                    width="12"
                    height="12"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </IconWrapper>
                <span>{item}</span>
              </ListItem>
            ))}
          </List>
          <Text>
            You are solely responsible for reviewing and approving all resume
            content before submission to employers.
          </Text>
        </Section>

        <Section variants={itemVariants}>
          <SectionTitle>7. Payments and Subscriptions</SectionTitle>
          <Text>For paid subscriptions:</Text>
          <List>
            {[
              "All payments are processed in Indian Rupees (INR) through RBI-compliant gateways like Razorpay. By subscribing, you authorize Irisne᙭ to charge your chosen payment method based on your selected plan.",

              "Fees are non-refundable except as required by law",
              "Automatic renewals will continue until canceled",
              "We may change pricing with 30 days notice",
              "You must provide accurate billing information",
            ].map((item, index) => (
              <ListItem key={index}>
                <IconWrapper
                  style={{ backgroundColor: "#dcfce7", color: "#16a34a" }}
                >
                  <svg
                    width="12"
                    height="12"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                </IconWrapper>
                <span>{item}</span>
              </ListItem>
            ))}
          </List>
        </Section>

        <Section variants={itemVariants}>
          <SectionTitle>8. Termination</SectionTitle>
          <Text>
            We may suspend or terminate your access to the Service for violation
            of these Terms. You may terminate your account at any time. Certain
            provisions will survive termination.
          </Text>
        </Section>

        <Section variants={itemVariants}>
          <SectionTitle>9. Limitation of Liability</SectionTitle>
          <Text>
            To the maximum extent permitted by law, Irisne᙭ shall not be liable
            for any indirect, incidental, special, consequential, or punitive
            damages, including without limitation, loss of profits, data, use,
            goodwill, or other intangible losses, resulting from:
          </Text>
          <List>
            {[
              "Your use or inability to use the Service",
              "Any unauthorized access to or use of our servers",
              "Any interruption or cessation of transmission to or from the Service",
              "Any bugs, viruses, or similar that may be transmitted through the Service",
              "Any errors or omissions in any content or for any loss incurred as a result of content posted via the Service",
            ].map((item, index) => (
              <ListItem key={index}>
                <IconWrapper
                  style={{ backgroundColor: "#f3e8ff", color: "#9333ea" }}
                >
                  <svg
                    width="12"
                    height="12"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </IconWrapper>
                <span>{item}</span>
              </ListItem>
            ))}
          </List>
        </Section>

        <Section variants={itemVariants}>
          <SectionTitle>10. Disclaimer of Warranties</SectionTitle>
          <Text>
            The Service is provided "AS IS" and "AS AVAILABLE" without
            warranties of any kind, either express or implied. Irisne᙭ does not
            warrant that:
          </Text>
          <List>
            {[
              "The Service will meet your requirements",
              "The Service will be uninterrupted, secure, or error-free",
              "The results from using the Service will be accurate or reliable",
              "The quality of any products, services, information obtained will meet expectations",
            ].map((item, index) => (
              <ListItem key={index}>
                <IconWrapper
                  style={{ backgroundColor: "#f1f5f9", color: "#64748b" }}
                >
                  <svg
                    width="12"
                    height="12"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </IconWrapper>
                <span>{item}</span>
              </ListItem>
            ))}
          </List>
        </Section>

        <Section variants={itemVariants}>
          <SectionTitle>11. Indemnification</SectionTitle>
          <Text>
            You agree to defend, indemnify, and hold harmless Irisne᙭ from any
            claims, liabilities, damages, losses, and expenses arising from:
          </Text>
          <List>
            {[
              "Your use of the Service",
              "Your violation of these Terms",
              "Your violation of any third-party right",
              "Any content you submit to the Service",
            ].map((item, index) => (
              <ListItem key={index}>
                <IconWrapper
                  style={{ backgroundColor: "#fee2e2", color: "#dc2626" }}
                >
                  <svg
                    width="12"
                    height="12"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </IconWrapper>
                <span>{item}</span>
              </ListItem>
            ))}
          </List>
        </Section>

        <Section variants={itemVariants}>
          <SectionTitle>12. Governing Law</SectionTitle>
          <Text>
            These Terms shall be governed by the laws of India, and disputes will be subject to the courts of Rourkela, Odisha.

          </Text>
        </Section>

        <Section variants={itemVariants}>
          <SectionTitle>13. Changes to Terms</SectionTitle>
          <Text>
            We reserve the right to modify these Terms at any time. We will
            provide notice of material changes through our Service or via email.
            Your continued use constitutes acceptance of the revised Terms.
          </Text>
        </Section>

        <Section variants={itemVariants}>
          <SectionTitle>14. Contact Information</SectionTitle>
          <Text>For questions about these Terms, please contact us at:</Text>
          <ContactBox>
            <ContactText>Rourkela</ContactText>
            <ContactText>Sundargarh</ContactText>
            <ContactText>KMD 770039</ContactText>
            <ContactText>
              Email:{" "}
              <a
                href="mailto:sbhmdalabehera@gmail.com"
                style={{ color: "#1e40af", textDecoration: "underline" }}
              >
                sbhmdalabehera@gmail.com
              </a>
            </ContactText>
          </ContactBox>
        </Section>

        <Footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Text>
            By using our Service, you acknowledge that you have read,
            understood, and agree to be bound by these Terms and Conditions.
          </Text>
          <BackButton href="/">Back to Home</BackButton>
        </Footer>
      </ContentContainer>
    </PageContainer>
  </>);
}

export default TermsAndConditions; 