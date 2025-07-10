"use client";
import React, { useEffect } from "react";
import  Link  from "next/link";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import { FaCookieBite } from "react-icons/fa";


const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
`;

const Header = styled(motion.div)`
  width: 100%;
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 4rem 0;
  color: white;

  @media (max-width: 768px) {
    padding: 3rem 0;
  }
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.1rem;
  opacity: 0.9;
  color: #ddd6fe;
`;

const ContentContainer = styled(motion.div)`
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 20px;
`;

const Section = styled(motion.div)`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 2rem;
  margin-bottom: 2rem;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #111827;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

const Text = styled.p`
  color: #4b5563;
  margin-bottom: 1rem;
  line-height: 1.7;
`;

const List = styled.ul`
  margin: 1rem 0 1rem 1.5rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
  color: #4b5563;
  display: flex;
  align-items: flex-start;
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  padding: 0.25rem;
  margin-right: 0.75rem;
  margin-top: 0.25rem;
`;

const Footer = styled(motion.div)`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 2rem;
  margin-top: 3rem;
  text-align: center;
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
  margin-top: 1.5rem;

  &:hover {
    background-color: #7c3aed;
  }
`;

const ContactBox = styled.div`
  background-color: #f5f3ff;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
`;

const ContactText = styled.p`
  color: #5b21b6;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const StrongText = styled.strong`
  color: #111827;
`;

const HighlightText = styled.span`
  background-color: #fef3c7;
  padding: 0.1rem 0.3rem;
  border-radius: 0.25rem;
`;

// Component
function CookiePolicy() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
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
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <>

    <PageContainer>
      <Header initial="hidden" animate="visible" variants={headerVariants}>
        <Container>
          <Title
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <FaCookieBite style={{ width: "2.5rem", height: "2.5rem" }} />
            Cookie Policy
          </Title>
          <Subtitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
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
            Irisne᙭ ("we," "us," or "our") uses cookies and similar technologies
            on our resume optimization platform. This Cookie Policy explains
            what cookies are, how we use them, and your choices regarding
            cookies.
          </Text>
          <Text>
            By using our Service, you consent to the use of cookies in
            accordance with this policy. You can manage your preferences at any
            time through our{" "}
            <Link
              href="/cookie-settings"
              style={{ color: "#7c3aed", fontWeight: 500 }}
            >
              Cookie Settings
            </Link>
            .
          </Text>
        </Section>

        <Section variants={itemVariants}>
          <SectionTitle>2. What Are Cookies?</SectionTitle>
          <Text>
            Cookies are small text files stored on your device when you visit
            websites. They help:
          </Text>
          <List>
            {[
              "Remember your preferences",
              "Provide personalized content",
              "Analyze site traffic",
              "Enable certain functionalities",
            ].map((item, index) => (
              <ListItem key={index}>
                <IconWrapper
                  style={{ backgroundColor: "#ede9fe", color: "#7c3aed" }}
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
            We use both session cookies (expire when you close your browser) and
            persistent cookies (remain until deleted).
          </Text>
        </Section>

        <Section variants={itemVariants}>
          <SectionTitle>3. Types of Cookies We Use</SectionTitle>
          <Text>
            <StrongText>Essential Cookies:</StrongText> Necessary for core
            functionality:
          </Text>
          <List>
            {[
              "User authentication and security",
              "Maintaining user sessions",
              "Load balancing and site stability",
            ].map((item, index) => (
              <ListItem key={index}>
                <IconWrapper
                  style={{ backgroundColor: "#f0f9ff", color: "#0ea5e9" }}
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

          <Text>
            <StrongText>Functional Cookies:</StrongText> Enhance your
            experience:
          </Text>
          <List>
            {[
              "Remembering language preferences",
              "Saving resume customization settings",
              "Maintaining dark/light mode preference",
            ].map((item, index) => (
              <ListItem key={index}>
                <IconWrapper
                  style={{ backgroundColor: "#f0fdf4", color: "#10b981" }}
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

          <Text>
            <StrongText>Analytics Cookies:</StrongText> Help us improve:
          </Text>
          <List>
            {[
              "Tracking page visits and navigation paths",
              "Measuring feature adoption rates",
              "Understanding user demographics (anonymized)",
            ].map((item, index) => (
              <ListItem key={index}>
                <IconWrapper
                  style={{ backgroundColor: "#fffbeb", color: "#f59e0b" }}
                >
                  <svg
                    width="12"
                    height="12"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </IconWrapper>
                <span>{item}</span>
              </ListItem>
            ))}
          </List>

          <Text>
            <StrongText>Marketing Cookies:</StrongText> For personalization:
          </Text>
          <List>
            {[
              "Tracking campaign effectiveness",
              "Delivering relevant job recommendations",
              "Personalized content suggestions",
            ].map((item, index) => (
              <ListItem key={index}>
                <IconWrapper
                  style={{ backgroundColor: "#fdf2f8", color: "#ec4899" }}
                >
                  <svg
                    width="12"
                    height="12"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 13.047 14.01c-.04.3-.25.549-.54.619l-4.626 1.256a1 1 0 01-1.309-.626l-1.256-4.626c-.07-.29-.319-.5-.619-.54L2.8 5.854 1.256 9.327a1 1 0 01-1.48.266l-1.5-1.5a1 1 0 01.266-1.48l8-4a1 1 0 01.932 0l8 4a1 1 0 01.266 1.48l-1.5 1.5a1 1 0 01-1.48-.266L17.2 5.854l1.179-4.11a1 1 0 011.242-.7l.5.14a1 1 0 01.7 1.242l-1.5 5.5a1 1 0 01-1.242.7l-.5-.14a1 1 0 01-.7-1.242l.14-.5-1.5-5.5a1 1 0 01.7-1.242l.5-.14a1 1 0 011.242.7l1.5 5.5a1 1 0 01-.7 1.242l-.5.14a1 1 0 01-1.242-.7L16.8 5.854 15.033 2.744A1 1 0 0116 2h-4z"
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
          <SectionTitle>4. Third-Party Cookies</SectionTitle>
          <Text>We partner with trusted services that may set cookies:</Text>
          <List>
            {[
              "Google Analytics: Website analytics",
              "Hotjar: User behavior analysis",
              "LinkedIn: Job recommendation engine",
              "Stripe: Payment processing",
            ].map((item, index) => (
              <ListItem key={index}>
                <IconWrapper
                  style={{ backgroundColor: "#f3e8ff", color: "#a855f7" }}
                >
                  <svg
                    width="12"
                    height="12"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </IconWrapper>
                <span>{item}</span>
              </ListItem>
            ))}
          </List>
          <Text>
            These services have their own privacy policies. We recommend
            reviewing them:
          </Text>
          <List>
            {[
              <span>
                Google:{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#7c3aed" }}
                >
                  Privacy Policy
                </a>
              </span>,
              <span>
                Hotjar:{" "}
                <a
                  href="https://www.hotjar.com/legal/policies/privacy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#7c3aed" }}
                >
                  Privacy Policy
                </a>
              </span>,
            ].map((item, index) => (
              <ListItem key={index}>
                <IconWrapper
                  style={{ backgroundColor: "#f0fdfa", color: "#14b8a6" }}
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
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
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
          <SectionTitle>5. Managing Cookies</SectionTitle>
          <Text>You have several options to control cookies:</Text>
          <List>
            {[
              "Browser Settings: Most browsers allow you to block or delete cookies",
              "Our Cookie Banner: Manage preferences when you first visit",
              "Cookie Settings Page: Adjust at any time",
              "Opt-Out Tools: Industry-wide tools like YourAdChoices",
            ].map((item, index) => (
              <ListItem key={index}>
                <IconWrapper
                  style={{ backgroundColor: "#ecfdf5", color: "#10b981" }}
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
            <HighlightText>Note:</HighlightText> Blocking essential cookies may
            impact core functionality of our Service.
          </Text>
          <Text>
            Visit our{" "}
            <Link
              href="/cookie-settings"
              style={{ color: "#7c3aed", fontWeight: 500 }}
            >
              Cookie Settings
            </Link>{" "}
            page to customize your preferences.
          </Text>
        </Section>

        <Footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Text>
            This Cookie Policy is part of our broader{" "}
            <Link href="/privacy" style={{ color: "#7c3aed", fontWeight: 500 }}>
              Privacy Policy
            </Link>
            .
          </Text>
          <BackButton href="/">Back to Home</BackButton>
        </Footer>
      </ContentContainer>
    </PageContainer>
   </> 
  );
}

export default CookiePolicy;
