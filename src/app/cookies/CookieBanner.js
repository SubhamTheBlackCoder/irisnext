"use client";
import React, { useState, useEffect } from "react";
import  Link  from "next/link";
import styled from "styled-components";

const BannerContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  transition: transform 0.3s ease-in-out;
  transform: ${({ $visible }) =>
    $visible ? "translateY(0)" : "translateY(100%)"};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const BannerText = styled.p`
  flex: 1;
  color: #4b5563;
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;

  a {
    color: #7c3aed;
    text-decoration: underline;
    font-weight: 500;

    &:hover {
      text-decoration: none;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
  }
`;

const BannerButton = styled.button`
  padding: 0.5rem 1.25rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
  border: ${({ $variant }) =>
    $variant === "outline" ? "1px solid #d1d5db" : "none"};
  background-color: ${({ $variant }) =>
    $variant === "primary" ? "#7c3aed" : "transparent"};
  color: ${({ $variant }) => ($variant === "primary" ? "white" : "#4b5563")};

  &:hover {
    background-color: ${({ $variant }) =>
      $variant === "primary"
        ? "#6d28d9"
        : $variant === "outline"
        ? "#f3f4f6"
        : "transparent"};
  }
`;

const SettingsLink = styled.button`
  background: none;
  border: none;
  color: #7c3aed;
  font-weight: 500;
  text-decoration: underline;
  cursor: pointer;
  padding: 0;
  font-size: 0.9rem;

  &:hover {
    text-decoration: none;
  }
`;

function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookieConsent");
    if (consent === null) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setVisible(false);
    // Here you would typically trigger your cookie initialization
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setVisible(false);
    // Here you would remove non-essential cookies
  };

  const handleSettings = () => {
    // Redirect to cookie settings page
    window.location.href = "/cookie-settings";
  };

  if (!visible) return null;

  return (
    <BannerContainer $visible={visible}>
      <BannerText>
        We use cookies to enhance your experience, analyze traffic, and
        personalize content. By continuing to use our site, you consent to our
        use of cookies. Learn more in our{" "}
        <Link href="/cookies">Cookie Policy</Link>.
      </BannerText>

      <ButtonGroup>
        <SettingsLink onClick={handleSettings}>Settings</SettingsLink>
        <BannerButton $variant="outline" onClick={handleReject}>
          Reject All
        </BannerButton>
        <BannerButton $variant="primary" onClick={handleAccept}>
          Accept All
        </BannerButton>
      </ButtonGroup>
    </BannerContainer>
  );
}

export default CookieBanner;
