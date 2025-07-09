"use client";
import React, { useState, useEffect, useCallback } from "react";
import styled, { keyframes, css } from "styled-components";
import { getCurrentUser, checkAuth } from "@/components/auth";
import axios from "axios";
import {
  FiCheckCircle,
  FiChevronDown,
  FiZap,
  FiAward,
  FiLoader,
  FiShield,
  FiLock,
  FiRepeat,
  FiX,
} from "react-icons/fi";

const plans = [
  {
    name: "Monthly",
    price: 1,
    amount: 100,
    planType: "monthly",
    description: "Perfect for short-term needs",
    features: ["All premium features", "Cancel anytime", "Priority support"],
    icon: <FiZap />,
    cta: "Get Started",
    color: "#4f46e5",
  },
  {
    name: "Quarterly",
    price: 499,
    amount: 49900,
    planType: "quarterly",
    description: "Great for growing needs",
    features: ["Everything in Monthly", "17% savings", "Quarterly billing"],
    icon: <FiAward />,
    cta: "Popular Choice",
    $popular: true,
    color: "#6366f1",
  },
  {
    name: "Annual",
    price: 1299,
    amount: 129900,
    planType: "yearly",
    description: "Best for long-term commitment",
    features: [
      "Everything in Quarterly",
      "45% savings",
      "Free annual consultation",
    ],
    icon: <FiAward />,
    cta: "Best Value",
    $bestValue: true,
    color: "#d4af37",
  },
];

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulseGold = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(212, 175, 55, 0); }
  100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0); }
`;

const modalFadeIn = keyframes`
  from { opacity: 0; transform: translateY(50px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const SuccessModal = ({ message, onClose }) => {
  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>Payment Successful</ModalTitle>
          <CloseButton onClick={onClose}>
            <FiX size={24} />
          </CloseButton>
        </ModalHeader>
        <ModalBody>
          <SuccessIcon>
            <svg
              viewBox="0 0 24 24"
              width="80"
              height="80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="11" stroke="#10B981" strokeWidth="2" />
              <path
                d="M7 12L11 16L17 8"
                stroke="#10B981"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </SuccessIcon>
          <SuccessMessage>{message}</SuccessMessage>
          <SuccessDescription>
            Your premium features are now active. Thank you for your purchase!
          </SuccessDescription>
        </ModalBody>
        <ModalFooter>
          <ContinueButton onClick={onClose}>
            Continue to Dashboard
          </ContinueButton>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default function RazorpayPayment() {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const fetchUser = async () => {
      try {
        const currentUser = getCurrentUser();
        if (currentUser) {
          const session = await checkAuth();
          const idToken = session.getIdToken().getJwtToken();
          const payload = JSON.parse(atob(idToken.split(".")[1]));
          setUserEmail(payload.email);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  const loadRazorpayScript = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (window.Razorpay) {
        setRazorpayLoaded(true);
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        setRazorpayLoaded(true);
        resolve();
      };
      script.onerror = () => {
        reject(new Error('Failed to load Razorpay'));
      };
      document.body.appendChild(script);
    });
  }, []);

  const handlePayment = async (plan) => {
    setSelectedPlan(plan.name);
    setLoading(true);
    setError(null);

    try {
      const currentUser = getCurrentUser();
      if (!currentUser) {
        throw new Error("Please sign in to continue with payment");
      }

      // Load Razorpay only when needed
      if (!window.Razorpay) {
        await loadRazorpayScript();
      }

      const { data } = await axios.post(
        "https://0k5gfl94j8.execute-api.ap-south-1.amazonaws.com/create",
        {
          action: "create",
          amount: plan.amount,
          email: userEmail,
          planType: plan.planType,
        }
      );

      const options = {
        key: "rzp_live_zm15TFBSG8pXqW",
        amount: data.amount,
        currency: "INR",
        name: "ResumeAI Premium",
        description: `${plan.name} Plan`,
        order_id: data.id,
        handler: async function (response) {
          try {
            await axios.post(
              "https://0k5gfl94j8.execute-api.ap-south-1.amazonaws.com/create",
              {
                action: "verify",
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                email: userEmail,
                planType: plan.planType,
              }
            );
            setSuccessMessage(`🎉 ${plan.name} plan activated successfully!`);
            setShowSuccessModal(true);
          } catch (verifyError) {
            console.error("Verification Error:", verifyError);
            setError("Payment verification failed. Please contact support.");
          }
        },
        prefill: { email: userEmail },
        theme: { color: plan.color },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment Error:", error);
      setError(error.message || "Payment failed. Please try again.");
      setLoading(false);
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };
  
  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
    <Container>
      {showSuccessModal && (
        <SuccessModal message={successMessage} onClose={closeSuccessModal} />
      )}

      <Header>
        <Title>Choose Your Premium Plan</Title>
        <Subtitle>Unlock powerful features to enhance your experience</Subtitle>
      </Header>

      <PlanGrid>
        {plans.map((plan) => (
          <Card
            key={plan.planType}
            $popular={plan.$popular}
            $bestValue={plan.$bestValue}
            onMouseEnter={() => setHoveredCard(plan.planType)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {plan.$popular && <PopularBadge>Most Popular</PopularBadge>}
            {plan.$bestValue && <BestValueBadge>Best Value</BestValueBadge>}

            <PlanIcon color={plan.color}>{plan.icon}</PlanIcon>
            <PlanName>{plan.name}</PlanName>
            <Price>
              ₹{plan.price.toLocaleString('en-IN')}
              <Period>
                /
                {plan.planType === "monthly"
                  ? "mo"
                  : plan.planType === "quarterly"
                  ? "quarter"
                  : "yr"}
              </Period>
            </Price>
            <Description>{plan.description}</Description>

            <FeatureList>
              {plan.features.map((feature, index) => (
                <FeatureItem key={index}>
                  <FiCheckCircle
                    style={{ color: "#10b981", marginRight: "8px" }}
                  />
                  {feature}
                </FeatureItem>
              ))}
            </FeatureList>

            <Button
              onClick={() => handlePayment(plan)}
              disabled={loading && selectedPlan === plan.name}
              $popular={plan.$popular}
              $bestValue={plan.$bestValue}
              $color={plan.color}
              $isHovered={hoveredCard === plan.planType}
            >
              {loading && selectedPlan === plan.name ? (
                <>
                  <Spinner /> Processing...
                </>
              ) : (
                plan.cta
              )}
            </Button>

            {plan.$bestValue && (
              <SavingsNote>Saved 45% compared to monthly</SavingsNote>
            )}
          </Card>
        ))}
      </PlanGrid>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <TrustSection>
        <TrustTitle>Trusted by Thousands of Professionals</TrustTitle>
        <TrustBadges>
          <TrustItem>
            <FiShield size={24} />
            <TrustText>Secure Payments</TrustText>
          </TrustItem>
          <TrustItem>
            <FiLock size={24} />
            <TrustText>SSL Encrypted</TrustText>
          </TrustItem>
          <TrustItem>
            <FiRepeat size={24} />
            <TrustText>30-Day Refund</TrustText>
          </TrustItem>
        </TrustBadges>
      </TrustSection>

      <FAQSection>
        <FAQTitle>Frequently Asked Questions</FAQTitle>
        <FAQList>
          {[
            {
              question: "Can I cancel my subscription anytime?",
              answer: "Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period."
            },
            {
              question: "What payment methods do you accept?",
              answer: "We accept all major credit/debit cards, UPI, net banking, and popular digital wallets through Razorpay."
            },
            {
              question: "How will I be billed for quarterly/annual plans?",
              answer: "You'll be charged the full amount upfront, and then automatically at the start of each new billing period."
            }
          ].map((faq, index) => (
            <FAQItem key={index} onClick={() => toggleFAQ(index)}>
              <FAQQuestion>
                {faq.question}
                <FAQToggle $expanded={expandedFAQ === index}>
                  <FiChevronDown />
                </FAQToggle>
              </FAQQuestion>
              <FAQAnswer $expanded={expandedFAQ === index}>
                {faq.answer}
              </FAQAnswer>
            </FAQItem>
          ))}
        </FAQList>
      </FAQSection>
    </Container>
  </>);
}

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 60px auto;
  padding: 0 20px;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  animation: ${fadeIn} 0.6s ease-out;
  position: relative;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  overflow: hidden;
  animation: ${modalFadeIn} 0.3s ease-out;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
`;

const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  transition: color 0.2s ease;

  &:hover {
    color: #111827;
  }
`;

const ModalBody = styled.div`
  padding: 32px;
  text-align: center;
`;

const SuccessIcon = styled.div`
  margin-bottom: 24px;
`;

const SuccessMessage = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 12px;
`;

const SuccessDescription = styled.p`
  font-size: 1rem;
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 0;
`;

const ModalFooter = styled.div`
  padding: 20px 24px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
`;

const ContinueButton = styled.button`
  background-color: #4f46e5;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #4338ca;
    transform: translateY(-1px);
  }
`;

const Header = styled.div`
  text-align: center;
  margin-top: 100px;
  margin-bottom: 60px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 16px;
  letter-spacing: -0.025em;
  background: linear-gradient(90deg, #4f46e5, #d4af37);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 576px) {
    font-size: 1.7rem;
    margin-bottom: 12px;
  }
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #6b7280;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    max-width: 90%;
  }
  
  @media (max-width: 576px) {
    font-size: 0.95rem;
  }
`;

const PlanGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin: 0 auto;
  }
`;

const Card = styled.div`
  position: relative;
  background: #ffffff;
  border-radius: 16px;
  padding: 40px 32px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.05);
  border: 1px solid
    ${({ $bestValue, $popular }) =>
      $bestValue
        ? "rgba(212, 175, 55, 0.3)"
        : $popular
        ? "rgba(99, 102, 241, 0.3)"
        : "#e5e7eb"};
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 768px) {
    padding: 30px 24px;
  }
  
  @media (max-width: 576px) {
    padding: 25px 20px;
    border-radius: 14px;
  }

  ${({ $bestValue }) =>
    $bestValue &&
    css`
      border-top: 4px solid #d4af37;
      animation: ${pulseGold} 2s infinite;
    `}

  ${({ $popular }) =>
    $popular &&
    css`
      border-top: 4px solid #6366f1;
    `}
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ $bestValue, $popular }) =>
      $bestValue
        ? "linear-gradient(90deg, #d4af37, #f1e5ac)"
        : $popular
        ? "linear-gradient(90deg, #6366f1, #a5b4fc)"
        : "transparent"};
  }
`;
const PlanIcon = styled.div`
  font-size: 2rem;
  color: ${({ color }) => color};
  margin-bottom: 20px;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.1);
  }
`;

const PlanName = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 12px;
`;

const Price = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
  display: flex;
  align-items: flex-end;
  line-height: 1;
`;

const Period = styled.span`
  font-size: 1rem;
  font-weight: 400;
  color: #6b7280;
  margin-left: 4px;
  margin-bottom: 6px;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #6b7280;
  margin-bottom: 24px;
  min-height: 50px;
`;

const FeatureList = styled.ul`
  margin: 24px 0;
  padding: 0;
  list-style: none;
  flex-grow: 1;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  color: #374151;
  margin-bottom: 12px;
  line-height: 1.5;
  transition: transform 0.2s ease;

  ${Card}:hover & {
    transform: translateX(5px);
  }
`;

const Button = styled.button`
  background-color: ${({ $bestValue, $popular, $isHovered, $color }) =>
    $isHovered
      ? $bestValue
        ? "#c9a227"
        : $popular
        ? "#4f46e5"
        : $color
      : $color};
  color: white;
  border: none;
  padding: 16px 24px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  &:hover::after {
    transform: translateX(100%);
  }
`;

const SavingsNote = styled.div`
  font-size: 0.875rem;
  color: #10b981;
  font-weight: 500;
  text-align: center;
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: "✓";
    margin-right: 6px;
    font-weight: bold;
  }
`;

const PopularBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 20px;
  background-color: #6366f1;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 20px;
  z-index: 1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 576px) {
    top: 8px;
    right: 15px;
    font-size: 0.7rem;
    padding: 3px 10px;
  }
`;

const BestValueBadge = styled(PopularBadge)`
  background: linear-gradient(90deg, #d4af37, #f1e5ac);
  color: #111827;
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  background-color: #fef2f2;
  padding: 16px;
  border-radius: 8px;
  margin: 20px 0;
  text-align: center;
  font-weight: 500;
  animation: ${fadeIn} 0.3s ease;
`;

const TrustSection = styled.div`
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
  border-radius: 16px;
  padding: 40px;
  margin: 60px 0;
  text-align: center;
`;

const TrustTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 24px;
`;

const TrustBadges = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  margin: 0 auto;
  flex-wrap: wrap;
`;

const TrustItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 120px;
  color: #4f46e5;
`;

const TrustText = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
`;

const FAQSection = styled.div`
  max-width: 800px;
  margin: 60px auto 0;
  padding: 40px 0;
  border-top: 1px solid #e5e7eb;
  
  @media (max-width: 768px) {
    margin: 40px auto 0;
    padding: 30px 0;
  }
  
  @media (max-width: 480px) {
    padding: 24px 0;
    margin-top: 30px;
  }
`;

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  
  @media (max-width: 480px) {
    gap: 16px;
  }
`;

const FAQTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 24px;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-bottom: 20px;
  }
`;

const FAQItem = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }
  
  @media (max-width: 480px) {
    padding: 18px;
  }
`;

const FAQQuestion = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  font-size: 1.1rem;
  color: #111827;
`;

const FAQToggle = styled.div`
  transition: transform 0.3s ease;
  transform: rotate(${props => props.$expanded ? '180deg' : '0deg'});
`;

const FAQAnswer = styled.p`
  font-size: 1rem;
  color: #6b7280;
  line-height: 1.6;
  max-height: ${props => props.$expanded ? '500px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease, margin-top 0.3s ease;
  margin-top: ${props => props.$expanded ? '10px' : '0'};
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const Spinner = styled(FiLoader)`
  animation: spin 1s linear infinite;
  margin-right: 8px;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
