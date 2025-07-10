"use client";
import React, { useState, useEffect } from "react";
import  Link  from "next/link";
import styled from "styled-components";

const SettingsContainer = styled.div`
  max-width: 900px;
  margin: 6.5rem auto;
  padding: 1.5rem;
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    margin: 5.5rem auto;
    padding: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 1.75rem;
  color: #7c3aed;
  margin-bottom: 1.25rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Section = styled.div`
  margin-bottom: 1.75rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid #e5e7eb;
`;

const SectionTitle = styled.h2`
  font-size: 1.1rem;
  color: #111827;
  margin-bottom: 0.8rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 0.85rem;
  }
`;

const ToggleContent = styled.div`
  flex: 1;
  padding-right: 1rem;

  @media (max-width: 768px) {
    padding-right: 0;
    width: 100%;
  }
`;

const ToggleLabel = styled.label`
  display: block;
  font-weight: 500;
  color: #4b5563;
  margin-bottom: 0.25rem;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const ToggleDescription = styled.p`
  color: #6b7280;
  font-size: 0.9rem;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    align-self: flex-end;
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #d1d5db;
  transition: 0.4s;
  border-radius: 24px;

  &:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${ToggleSlider} {
    background-color: #7c3aed;
  }

  &:checked + ${ToggleSlider}:before {
    transform: translateX(26px);
  }
`;

const SaveButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #7c3aed;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
  max-width: 200px;

  &:hover {
    background-color: #6d28d9;
  }

  @media (max-width: 768px) {
    max-width: none;
    padding: 0.85rem;
  }
`;

function CookieSettings() {
  const [settings, setSettings] = useState({
    essential: true,
    functional: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    
    const savedSettings = localStorage.getItem("cookieSettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleToggle = (type) => {
    setSettings((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleSave = () => {
    localStorage.setItem("cookieSettings", JSON.stringify(settings));
    alert("Your preferences have been saved!");
    window.history.back();
  };

  return (<>
    <SettingsContainer>
      <Title>Cookie Preferences</Title>

      <Section>
        <SectionTitle>Manage Consent Preferences</SectionTitle>
        <ToggleDescription>
          You can set your preferences for how we use cookies on our site.
        </ToggleDescription>
      </Section>

      <Section>
        <ToggleContainer>
          <ToggleContent>
            <ToggleLabel>Essential Cookies</ToggleLabel>
            <ToggleDescription>
              Required for basic site functionality. Cannot be disabled.
            </ToggleDescription>
          </ToggleContent>
          <ToggleSwitch>
            <ToggleInput
              type="checkbox"
              checked={settings.essential}
              disabled
              readOnly
            />
            <ToggleSlider />
          </ToggleSwitch>
        </ToggleContainer>

        <ToggleContainer>
          <ToggleContent>
            <ToggleLabel>Functional Cookies</ToggleLabel>
            <ToggleDescription>
              Remember your preferences and settings
            </ToggleDescription>
          </ToggleContent>
          <ToggleSwitch>
            <ToggleInput
              type="checkbox"
              checked={settings.functional}
              onChange={() => handleToggle("functional")}
            />
            <ToggleSlider />
          </ToggleSwitch>
        </ToggleContainer>

        <ToggleContainer>
          <ToggleContent>
            <ToggleLabel>Analytics Cookies</ToggleLabel>
            <ToggleDescription>
              Help us improve our services by collecting usage data
            </ToggleDescription>
          </ToggleContent>
          <ToggleSwitch>
            <ToggleInput
              type="checkbox"
              checked={settings.analytics}
              onChange={() => handleToggle("analytics")}
            />
            <ToggleSlider />
          </ToggleSwitch>
        </ToggleContainer>

        <ToggleContainer>
          <ToggleContent>
            <ToggleLabel>Marketing Cookies</ToggleLabel>
            <ToggleDescription>
              Used to deliver personalized content and ads
            </ToggleDescription>
          </ToggleContent>
          <ToggleSwitch>
            <ToggleInput
              type="checkbox"
              checked={settings.marketing}
              onChange={() => handleToggle("marketing")}
            />
            <ToggleSlider />
          </ToggleSwitch>
        </ToggleContainer>
      </Section>

      <Section>
        <ToggleDescription>
          Learn more about how we use cookies in our{" "}
          <Link href="/cookies" style={{ color: "#7c3aed" }}>
            Cookie Policy
          </Link>
          .
        </ToggleDescription>
      </Section>

      <SaveButton onClick={handleSave}>Save Preferences</SaveButton>
    </SettingsContainer>
  </>);
}

export default CookieSettings;