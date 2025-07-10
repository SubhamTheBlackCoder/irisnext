"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styled, { createGlobalStyle } from "styled-components";

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

// Styled Components with mobile fixes
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #7c3aed;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
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

const HighlightText = styled.span`
  background-color: #fef3c7;
  padding: 0.1rem 0.3rem;
  border-radius: 0.25rem;
  display: inline-block;
  margin: 0.25rem 0;
`;

// Component with optimized animations
function PrivacyPolicy() {
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
              <LockClosedIcon style={{ width: "2rem", height: "2rem" }} />
              Privacy Policy
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
              Irisne᙭ ("we," "our," or "us") is committed to protecting your
              privacy. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you use our resume
              optimization platform and related services (the "Service").
            </Text>
            <Text>
              Please read this policy carefully. By accessing or using our
              Service, you agree to the collection and use of information in
              accordance with this policy.
            </Text>
          </Section>

          <Section variants={itemVariants}>
            <SectionTitle>2. Information We Collect</SectionTitle>
            <Text>
              We collect several types of information from and about users:
            </Text>

            <Text>
              <StrongText>Personal Data:</StrongText> Information that
              identifies you personally:
            </Text>
            <List>
              {[
                "Contact Information (name, email, phone number)",
                "Professional Information (work history, education, skills)",
                "Account Credentials (username, password)",
                "Payment Information (for premium services)",
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
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                    </svg>
                  </IconWrapper>
                  <span>{item}</span>
                </ListItem>
              ))}
            </List>

            <Text>
              <StrongText>Usage Data:</StrongText> Information collected
              automatically:
            </Text>
            <List>
              {[
                "IP address and device information",
                "Browser type and version",
                "Pages visited and time spent",
                "Cookies and tracking technologies",
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
                        d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
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
            <SectionTitle>3. How We Use Your Information</SectionTitle>
            <Text>We use the collected data for various purposes:</Text>
            <List>
              {[
                "Provide and maintain our Service",
                "Improve and personalize your experience",
                "Analyze usage to optimize our platform",
                "Process payments for premium features",
                "Communicate with you (updates, security alerts)",
                "Detect and prevent fraud and abuse",
                "Comply with legal obligations",
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
                        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
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
            <SectionTitle>4. Data Sharing and Disclosure</SectionTitle>
            <Text>
              We may share your information in the following situations:
            </Text>

            <Text>
              <StrongText>Service Providers:</StrongText> With third parties who
              perform services for us (hosting, analytics, payment processing).
              These providers are contractually obligated to protect your data.
            </Text>

            <Text>
              <StrongText>Legal Requirements:</StrongText> When required by law
              or to protect our rights:
            </Text>
            <List>
              {[
                "To comply with legal obligations",
                "To protect against legal liability",
                "To protect the safety of our users",
                "To prevent or investigate wrongdoing",
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

            <Text>
              <StrongText>Business Transfers:</StrongText> In connection with
              any merger, sale of company assets, or acquisition.
            </Text>
          </Section>

          <Section variants={itemVariants}>
            <SectionTitle>5. Data Security</SectionTitle>
            <Text>
              We implement appropriate technical and organizational measures to
              protect your personal data:
            </Text>
            <List>
              {[
                "SSL/TLS encryption for data transmission",
                "Regular security audits and monitoring",
                "Access controls and authentication measures",
                "Employee training on data protection",
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
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </IconWrapper>
                  <span>{item}</span>
                </ListItem>
              ))}
            </List>
            <Text>
              <HighlightText>
                Despite these measures, no method of transmission over the
                Internet or electronic storage is 100% secure.
              </HighlightText>{" "}
              We cannot guarantee absolute security of your data.
            </Text>
          </Section>

          <Section variants={itemVariants}>
            <SectionTitle>6. Your Data Rights</SectionTitle>
            <Text>
              Depending on your jurisdiction, you may have the following rights
              regarding your personal data:
            </Text>
            <List>
              {[
                "Access: Request copies of your personal data",
                "Rectification: Request correction of inaccurate data",
                "Erasure: Request deletion under certain circumstances",
                "Restriction: Request limitation of processing",
                "Portability: Request transfer of your data",
                "Objection: Object to certain processing activities",
                "Withdraw Consent: Where processing is based on consent",
              ].map((item, index) => (
                <ListItem key={index}>
                  <IconWrapper
                    style={{ backgroundColor: "#d1fae5", color: "#059669" }}
                  >
                    <svg
                      width="12"
                      height="12"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </IconWrapper>
                  <span>{item}</span>
                </ListItem>
              ))}
            </List>
            <Text>
              To exercise these rights, please contact us using the information
              in the <StrongText>Contact Us</StrongText> section.
            </Text>
          </Section>

          <Section variants={itemVariants}>
            <SectionTitle>7. Cookies and Tracking Technologies</SectionTitle>
            <Text>
              We use cookies and similar tracking technologies to track activity
              on our Service:
            </Text>
            <List>
              {[
                "Essential Cookies: Necessary for Service operation",
                "Preference Cookies: Remember your settings",
                "Analytics Cookies: Understand how you use our Service",
                "Marketing Cookies: Deliver relevant advertisements",
              ].map((item, index) => (
                <ListItem key={index}>
                  <IconWrapper
                    style={{ backgroundColor: "#e0f2fe", color: "#0369a1" }}
                  >
                    <svg
                      width="12"
                      height="12"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path
                        fillRule="evenodd"
                        d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </IconWrapper>
                  <span>{item}</span>
                </ListItem>
              ))}
            </List>
            <Text>
              You can instruct your browser to refuse all cookies or to indicate
              when a cookie is being sent. However, some Service features may
              not function properly without cookies.
            </Text>
          </Section>

          <Section variants={itemVariants}>
            <SectionTitle>8. International Data Transfers</SectionTitle>
            <Text>
              Your information may be transferred to — and maintained on —
              computers located outside of your state, province, country, or
              other governmental jurisdiction where data protection laws may
              differ.
            </Text>
            <Text>
              Since our platform is globally accessible (hosted under .com),
              your data may be processed in jurisdictions outside your country
              (e.g., United States or India). We take appropriate steps to
              protect it during cross-border transfers as per applicable laws
              (e.g., GDPR, Indian IT Act).
            </Text>
            <Text>
              We will take all steps reasonably necessary to ensure your data is
              treated securely and in accordance with this Privacy Policy.
            </Text>
          </Section>

          <Section variants={itemVariants}>
            <SectionTitle>9. Children's Privacy</SectionTitle>
            <Text>
              Our Service is not intended for children under 16. We do not
              knowingly collect personally identifiable information from
              children under 16.
            </Text>
            <Text>
              If you are a parent or guardian and you are aware that your child
              has provided us with personal data, please contact us. We will
              take steps to remove that information from our servers.
            </Text>
          </Section>

          <Section variants={itemVariants}>
            <SectionTitle>10. Changes to This Policy</SectionTitle>
            <Text>
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new policy on this page and
              updating the "Last Updated" date.
            </Text>
            <Text>
              You are advised to review this Privacy Policy periodically for any
              changes. Changes are effective when posted.
            </Text>
          </Section>

          <Section variants={itemVariants}>
            <SectionTitle>11. Contact Us</SectionTitle>
            <Text>
              If you have any questions about this Privacy Policy, please
              contact us:
            </Text>
            <ContactBox>
              <ContactText>Rourkela</ContactText>
              <ContactText>Sundargarh</ContactText>
              <ContactText>KMD </ContactText>
              <ContactText>
                Email:{" "}
                <a
                  href="mailto:sbhmdalabehera@gmail.com"
                  style={{ color: "#1e40af", textDecoration: "underline" }}
                >
                  sbhmdalabehera@gmail.com
                </a>
              </ContactText>
              <ContactText>Phone: +91 (80) *********</ContactText>
            </ContactBox>
          </Section>

          <Footer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Text>
              By using our Service, you acknowledge you have read and understood
              this Privacy Policy.
            </Text>
            <BackButton href="/">Back to Home</BackButton>
          </Footer>
        </ContentContainer>
      </PageContainer>
    </>
  );
}

export default PrivacyPolicy;
