"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useAuth } from "../AuthContext";
import "./navbar.css";
import Image from "next/image";

export default function Navbar() {
  const { isAuthenticated, userData, logout } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [userPlan, setUserPlan] = useState("free");
  const [isLoadingPlan, setIsLoadingPlan] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchUserPlan = async () => {
      if (isAuthenticated && userData?.email) {
        try {
          setIsLoadingPlan(true);
          const response = await fetch(
            `https://23k44nvasj.execute-api.ap-south-1.amazonaws.com/plan-check?email=${encodeURIComponent(
              userData.email
            )}`
          );

          if (!response.ok) throw new Error("Failed to check user plan");

          const data = await response.json();
          setUserPlan(data.plan || "free");
        } catch (error) {
          console.error("Error fetching user plan:", error);
          setUserPlan("free");
        } finally {
          setIsLoadingPlan(false);
        }
      } else {
        setIsLoadingPlan(false);
      }
    };

    fetchUserPlan();
  }, [isAuthenticated, userData]);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
    setIsMobileMenuOpen(false);
  };

  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false);
    logout();
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="navbar">
      {/* Logo with image */}
      <div className="navbar-logo">
        <Link href="/" className="logo-link">
          <Image
            src="/og-image.jpg"
            alt="iris"
            width={40}
            height={40}
            className="logo-image"
          />
          <span className="logo-text">
            IRISNE<span className="logo-highlight">X</span>
          </span>
        </Link>
      </div>

      {/* Navigation Links - Always visible for deskhrefp, hidden on mobile */}
      <ul className={`nav-links ${isMobile ? "hide-on-mobile" : ""}`}>
        <li className="nav-item">
          <Link href="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/contact" className="nav-link">
            Contact
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/pricing" className="nav-link">
            Pricing
          </Link>
        </li>
      </ul>

      {/* Mobile Menu Button for All Users */}
      {isMobile ? (
        <div className="mobile-menu-container" ref={dropdownRef}>
          <button
            className={`mobile-menu-btn ${isMobileMenuOpen ? "open" : ""}`}
            onClick={toggleMobileMenu}
            aria-label="Mobile menu"
          >
            <span className="ericsson-icon">
              <span className="ericsson-line top"></span>
              <span className="ericsson-line middle"></span>
              <span className="ericsson-line bottom"></span>
            </span>
          </button>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="mobile-menu-dropdown">
              {isAuthenticated ? (
                <>
                  <div className="profile-info">
                    <div className="avatar-container">
                      <div
                        className={`avatar-initial ${
                          userPlan === "premium" ? "golden-avatar" : ""
                        }`}
                      >
                        {userData?.initial || "U"}
                      </div>
                    </div>
                    <div className="mobile-user-details">
                      <h4 className="profile-title">{userData?.email}</h4>
                      <p className="profile-description">Plan: {userPlan}</p>
                    </div>
                  </div>

                  <ul className="mobile-menu-links">
                    <li className="mobile-menu-item">
                      <Link
                        href="/"
                        className="mobile-menu-link"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Home
                      </Link>
                    </li>
                    <li className="mobile-menu-item">
                      <Link
                        href="/contact"
                        className="mobile-menu-link"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Contact
                      </Link>
                    </li>
                    <li className="mobile-menu-item">
                      <Link
                        href="/pricing"
                        className="mobile-menu-link"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Pricing
                      </Link>
                    </li>

                    <li className="mobile-menu-item">
                      <a
                        className="mobile-menu-link logout-button"
                        onClick={handleLogoutClick}
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </>
              ) : (
                <>
                  <div className="profile-info">
                    <h4 className="profile-title">Profile</h4>
                    <p className="profile-description">
                      Your profile helps improve your interactions with select
                      tools experiences.
                    </p>
                  </div>

                  <ul className="mobile-menu-links">
                    <li className="mobile-menu-item">
                      <Link
                        href="/"
                        className="mobile-menu-link"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Home
                      </Link>
                    </li>
                    <li className="mobile-menu-item">
                      <Link
                        href="/contact"
                        className="mobile-menu-link"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Contact
                      </Link>
                    </li>
                    <li className="mobile-menu-item">
                      <Link
                        href="/pricing"
                        className="mobile-menu-link"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Pricing
                      </Link>
                    </li>
                  </ul>

                  <div className="mobile-auth-buttons">
                    <Link
                      href="/auth"
                      className="mobile-auth-button login-button"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login/Create
                    </Link>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      ) : (
        // Regular Profile Dropdown for Desktop
        <div className="dropdown dropdown-end">
          <button className="avatar-btn">
            <div className="avatar-container">
              {isAuthenticated && userData?.initial ? (
                <div
                  className={`avatar-initial ${
                    userPlan === "premium" ? "golden-avatar" : ""
                  }`}
                >
                  {userData.initial}
                </div>
              ) : (
                <img
                  alt="Profile"
                  src="https://grg.s3.ap-south-1.amazonaws.com/th.jpeg"
                />
              )}
            </div>
          </button>
          <ul className="dropdown-menu slide-fade">
            {isAuthenticated ? (
              <>
                {/* Navigation Links in Dropdown */}

                {/* Profile Section */}
                <div className="dropdown-divider"></div>
                <li className="dropdown-item">
                  <Link href="/" className="dropdown-link">
                    Profile
                    {userPlan === "free" && (
                      <span className="upgrade-badge">Upgrade</span>
                    )}
                  </Link>
                </li>
                <li className="dropdown-item">
                  <a 
                    className="dropdown-link logout-button"
                    onClick={handleLogoutClick}
                  >
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="dropdown-item">
                  <div className="profile-info">
                    <h4 className="profile-title">Profile</h4>
                    <p className="profile-description">
                      Your profile helps improve your interactions with select
                      tools experiences.
                    </p>
                  </div>
                  <div className="auth-buttons">
                    <Link href="/auth" className="auth-button login-button">
                      Login/Create
                    </Link>
                  </div>
                </li>
              </>
            )}
          </ul>
        </div>
      )}

      {/* Logout Confirmation Dialog */}
      {showLogoutConfirm && (
        <div className="dialog-overlay">
          <div className="dialog-container">
            <div className="dialog-content">
              <h3 className="dialog-title">Confirm Logout</h3>
              <p className="dialog-message">
                Are you sure you want to log out?
              </p>
              <div className="dialog-actions">
                <button
                  className="dialog-button secondary"
                  onClick={handleCancelLogout}
                >
                  Cancel
                </button>
                <button
                  className="dialog-button primary"
                  onClick={handleConfirmLogout}
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
