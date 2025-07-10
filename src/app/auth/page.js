"use client";

import React, { useState, useEffect } from "react";
import "./auth.css";
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession,
  CognitoIdToken,
  CognitoAccessToken,
  CognitoRefreshToken,
} from "amazon-cognito-identity-js";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiLock,
  FiUser,
  FiArrowLeft,
  FiKey,
  FiCheck,
  FiX,
  FiLogIn,
} from "react-icons/fi";
import styled from "styled-components";
import { useAuth } from "@/components/AuthContext";

// Cognito configuration
const COGNITO_DOMAIN = "ap-south-1x8dtvzk9h.auth.ap-south-1.amazoncognito.com";
const CLIENT_ID = "70sk2pmn2orrjtck89thg6ogqu";
const TOKEN_ENDPOINT = `https://${COGNITO_DOMAIN}/oauth2/token`;

// Current terms version
const CURRENT_TERMS_VERSION = "1.0";

const poolData = {
  UserPoolId: "ap-south-1_X8dTvZK9H",
  ClientId: CLIENT_ID,
};

const userPool = new CognitoUserPool(poolData);

export const getCurrentUser = () => {
  return userPool.getCurrentUser();
};

export const checkAuth = async () => {
  const user = getCurrentUser();
  if (!user) return null;

  return new Promise((resolve, reject) => {
    user.getSession((err, session) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(session);
    });
  });
};

export const logout = () => {
  const user = getCurrentUser();
  if (user) {
    user.signOut();
  }
  window.location.href = "/auth";
};

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
  
  @media (max-width: 768px) {
    backdrop-filter: none;
  }
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 12px;
  width: 90%;
  max-width: 800px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  will-change: transform, opacity;
`;

const ModalHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  color: #2b2d42;
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const ModalCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6c757d;
  padding: 0.5rem;

  &:hover {
    color: #495057;
  }
`;

const ModalBody = styled.div`
  padding: 1.5rem;
  overflow-y: auto;
  flex-grow: 1;
  line-height: 1.6;
  font-size: 0.95rem;
  color: #495057;
  
  @media (max-width: 480px) {
    padding: 1rem;
    font-size: 0.85rem;
  }

  h3 {
    margin-top: 1.5rem;
    font-size: 1.2rem;
    color: #2b2d42;
    
    @media (max-width: 480px) {
      font-size: 1.1rem;
    }
  }

  p {
    margin-bottom: 1rem;
  }

  ul {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
  }

  li {
    margin-bottom: 0.5rem;
  }
`;

const ModalFooter = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const TermsButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  will-change: transform, opacity;

  &.accept {
    background-color: #4361ee;
    color: white;
    border: none;

    &:hover {
      background-color: #3a56d4;
    }
  }

  &.decline {
    background-color: transparent;
    color: #6c757d;
    border: 1px solid #dee2e6;

    &:hover {
      background-color: #f8f9fa;
      color: #495057;
    }
  }
  
  @media (max-width: 480px) {
    width: 100%;
    padding: 0.75rem;
  }
`;

const TermsCheckboxContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin: 1.5rem 0;
  padding: 0.75rem;
  border-radius: 8px;
  background: ${({ $accepted }) =>
    $accepted ? "rgba(67, 97, 238, 0.1)" : "#f8f9fa"};
  border: 1px solid ${({ $accepted }) => ($accepted ? "#4361ee" : "#e9ecef")};
  transition: all 0.2s;

  input {
    margin-top: 0.25rem;
    accent-color: #4361ee;
  }

  label {
    font-size: 0.9rem;
    line-height: 1.5;
    cursor: pointer;
    
    @media (max-width: 480px) {
      font-size: 0.85rem;
    }

    a {
      color: #4361ee;
      text-decoration: underline;
      font-weight: 500;
    }
  }
`;

// Professional Google Sign-In Button
const GoogleButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px 16px;
  background-color: white;
  color: rgba(0, 0, 0, 0.87);
  border: 1px solid #dadce0;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  font-family: 'Roboto', sans-serif;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
  margin-top: 15px;
  will-change: transform;
  
  &:hover {
    background-color: #f8f9fa;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  
  &:active {
    background-color: #f1f3f4;
  }
  
  .google-icon {
    width: 18px;
    height: 18px;
    margin-right: 12px;
  }
`;

const GoogleIcon = () => (
  <svg className="google-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const AuthPage = () => {
  const [currentPage, setCurrentPage] = useState("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isPasswordResetSent, setIsPasswordResetSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [forceTermsAcceptance, setForceTermsAcceptance] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [isProcessingSSO, setIsProcessingSSO] = useState(false);
  const [initialCheckComplete, setInitialCheckComplete] = useState(false);
  const [isClient, setIsClient] = useState(false); // New state for client detection

  const router = useRouter();
  const { loginSuccess, isAuthenticated } = useAuth();

  useEffect(() => {
    setIsClient(true); // Set to true when component mounts on client
  }, []);

  // Terms content
  const termsContent = [
    {
      title: "1. Acceptance of Terms",
      text: "By accessing or using Irisne᙭, you agree to be bound by these Terms. If you do not agree, you may not use our services.",
    },
    {
      title: "2. Service Description",
      text: "Irisne᙭ provides AI-powered resume analysis and job search tools. We do not guarantee employment or specific results.",
    },
    {
      title: "3. User Responsibilities",
      text: "You agree to provide accurate information and are responsible for maintaining the confidentiality of your account credentials.",
    },
    {
      title: "4. Privacy Policy",
      text: "Your data will be handled according to our Privacy Policy. We collect necessary information to provide and improve our services.",
    },
    {
      title: "5. Account Security",
      text: "You are responsible for maintaining the confidentiality of your password and for all activities that occur under your account.",
    },
    {
      title: "6. Prohibited Activities",
      text: "You may not use our service for any illegal purpose, to violate any laws, or to infringe upon the rights of others.",
    },
    {
      title: "7. Intellectual Property",
      text: "All content and trademarks on this site are property of Irisne᙭ or its licensors and may not be used without permission.",
    },
    {
      title: "8. Limitation of Liability",
      text: "Irisne᙭ shall not be liable for any indirect, incidental, special or consequential damages resulting from use of the service.",
    },
    {
      title: "9. Changes to Terms",
      text: "We may modify these terms at any time. Your continued use constitutes acceptance of the revised terms.",
    },
    {
      title: "10. Governing Law",
      text: "These terms shall be governed by the laws of the State of California without regard to its conflict of law provisions.",
    },
  ];

  useEffect(() => {
    const checkAuthStatus = async () => {
      const user = getCurrentUser();
      if (user) {
        try {
          setIsLoading(true);
          await new Promise((resolve, reject) => {
            user.getSession((err, session) => {
              if (err) {
                reject(err);
                return;
              }
              resolve(session);
            });
          });
          await checkTermsAcceptance(user);
        } catch (error) {
          console.log("Session check failed:", error);
          setIsLoading(false);
        }
      }
    };

    const checkForSSO = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const state = urlParams.get("state");

      if (code && state) {
        // Check if we have stored state and code_verifier
        const storedState = sessionStorage.getItem('oauth_state');
        const codeVerifier = sessionStorage.getItem('pkce_code_verifier');

        if (!storedState || !codeVerifier) {
          // Not an active flow, clean URL and ignore
          window.history.replaceState({}, document.title, window.location.pathname);
          setInitialCheckComplete(true);
          return;
        }

        setIsProcessingSSO(true);
        setIsLoading(true);
        try {
          await exchangeCodeForTokens(code, state);
          // Clear code from URL
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch (err) {
          console.error("SSO error:", err);
          if (err.message === "Invalid state parameter") {
            setError("Your login session has expired. Please try signing in again.");
          } else {
            setError(err.message || "SSO login failed. Please try again.");
          }
        } finally {
          setIsProcessingSSO(false);
          setIsLoading(false);
          setInitialCheckComplete(true);
        }
      } else {
        checkAuthStatus()
          .then(() => setInitialCheckComplete(true))
          .catch(() => setInitialCheckComplete(true));
      }
    };

    if (isClient) { // Only run on client
      checkForSSO();
    }

    return () => {
      setIsLoading(false);
      setIsProcessingSSO(false);
    };
  }, [router, isClient]); // Added isClient dependency

  // Redirect to main page if authenticated and not forcing terms acceptance
  useEffect(() => {
    if (initialCheckComplete && isAuthenticated && !forceTermsAcceptance) {
      router.push("/upload");
    }
  }, [initialCheckComplete, isAuthenticated, forceTermsAcceptance, router]);

  // Prevent rendering while redirecting
  if (initialCheckComplete && isAuthenticated && !forceTermsAcceptance) {
    return null;
  }

  const loginWithGoogle = () => {
    if (!isClient) return; // Guard against server execution
    
    // Generate random state and code verifier for PKCE
    const state = Math.random().toString(36).substring(2, 15);
    const codeVerifier = Math.random().toString(36).substring(2, 15) + 
                         Math.random().toString(36).substring(2, 15) + 
                         Math.random().toString(36).substring(2, 15);
    
    // Store code verifier in session storage
    sessionStorage.setItem('pkce_code_verifier', codeVerifier);
    sessionStorage.setItem('oauth_state', state);
    
    const requiredScopes = [
      'openid',
      'email',
      'profile',
      'aws.cognito.signin.user.admin'
    ].join('+');
    
    const redirectUri = window.location.origin + "/auth";
    
    const googleLoginUrl = `https://${COGNITO_DOMAIN}/oauth2/authorize?identity_provider=Google&response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${requiredScopes}&state=${state}`;
    
    window.location.href = googleLoginUrl;
  };

  const exchangeCodeForTokens = async (code, stateParam) => {
    try {
      const storedState = sessionStorage.getItem('oauth_state');
      const codeVerifier = sessionStorage.getItem('pkce_code_verifier');
      
      // Validate state to prevent CSRF attacks
      if (stateParam !== storedState) {
        throw new Error("Invalid state parameter");
      }
      
      const formData = new URLSearchParams();
      formData.append("grant_type", "authorization_code");
      formData.append("client_id", CLIENT_ID);
      formData.append("code", code);
      formData.append("redirect_uri", window.location.origin + "/auth");
      formData.append("code_verifier", codeVerifier); // Add PKCE code verifier

      const response = await fetch(TOKEN_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Token exchange failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();

      if (data.id_token) {
        // Decode ID token to get username
        const base64Url = data.id_token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const payload = JSON.parse(atob(base64));
        const username = payload["cognito:username"] || payload.sub;

        // Create Cognito session
        const session = new CognitoUserSession({
          IdToken: new CognitoIdToken({ IdToken: data.id_token }),
          AccessToken: new CognitoAccessToken({ AccessToken: data.access_token }),
          RefreshToken: new CognitoRefreshToken({ RefreshToken: data.refresh_token }),
        });

        // Set user session
        const user = new CognitoUser({
          Username: username,
          Pool: userPool,
        });
        user.setSignInUserSession(session);

        // Check terms acceptance
        loginSuccess();
        await checkTermsAcceptance(user);
      } else {
        throw new Error("Failed to get tokens from Cognito");
      }
    } catch (err) {
      throw err;
    } finally {
      // Clean up session storage
      sessionStorage.removeItem('pkce_code_verifier');
      sessionStorage.removeItem('oauth_state');
    }
  };

  const checkTermsAcceptance = async (user) => {
    try {
      // Use the ID token for user attributes
      const idToken = user.getSignInUserSession().getIdToken().getJwtToken();
      
      // Decode ID token to get attributes
      const base64Url = idToken.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(atob(base64));
      
      const termsAccepted = payload["custom:terms_accepted"] === "true";
      const termsVersion = payload["custom:terms_version"];
      
      if (!termsAccepted || termsVersion !== CURRENT_TERMS_VERSION) {
        setCurrentPage("termsUpdate");
        setForceTermsAcceptance(true);
      } else {
        router.push("/upload");
      }
    } catch (err) {
      console.error("Error checking terms acceptance:", err);
      router.push("/upload");
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    if (!acceptedTerms) {
      setError("You must accept the Terms & Conditions");
      return;
    }

    setIsLoading(true);
    clearMessages();

    const attributeList = [
      { Name: "email", Value: signupEmail },
      { Name: "custom:terms_accepted", Value: "true" },
      { Name: "custom:terms_version", Value: CURRENT_TERMS_VERSION },
    ];

    userPool.signUp(
      signupEmail,
      signupPassword,
      attributeList,
      null,
      (err, result) => {
        setIsLoading(false);
        if (err) {
          setError(err.message || "Signup failed. Please try again.");
        } else {
          setSuccess(
            "Account created! Please check your email for verification."
          );
          setCurrentPage("verifyEmail");
        }
      }
    );
  };

  const handleVerifyEmailSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    clearMessages();

    const cognitoUser = new CognitoUser({
      Username: signupEmail,
      Pool: userPool,
    });

    cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
      setIsLoading(false);
      if (err) {
        setError(err.message || "Verification failed.");
      } else {
        setSuccess("Email verified successfully! You can now login.");
        setTimeout(() => {
          setCurrentPage("login");
        }, 2000);
      }
    });
  };

 const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    clearMessages();

    const authenticationData = {
      Username: loginEmail,
      Password: password,
    };

    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const cognitoUser = new CognitoUser({
      Username: loginEmail,
      Pool: userPool,
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session) => {
        loginSuccess();
        checkTermsAcceptance(cognitoUser);
      },
      onFailure: (err) => {
        setIsLoading(false);
        setError(err.message || "Login failed. Please check your credentials.");
      },
    });
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    clearMessages();

    const cognitoUser = new CognitoUser({
      Username: resetEmail,
      Pool: userPool,
    });

    cognitoUser.forgotPassword({
      onSuccess: (data) => {
        setIsLoading(false);
        setSuccess("Password reset code sent to your email!");
        setIsPasswordResetSent(true);
        setCurrentPage("enterOtp");
      },
      onFailure: (err) => {
        setIsLoading(false);
        setError(err.message || "Failed to send reset code.");
      },
    });
  };

  const handleResetPasswordSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    clearMessages();

    const cognitoUser = new CognitoUser({
      Username: resetEmail,
      Pool: userPool,
    });

    cognitoUser.confirmPassword(confirmationCode, newPassword, {
      onSuccess: () => {
        setIsLoading(false);
        setSuccess("Password reset successfully! You can now login.");
        setTimeout(() => {
          setCurrentPage("login");
        }, 1500);
      },
      onFailure: (err) => {
        setIsLoading(false);
        setError(err.message || "Password reset failed.");
      },
    });
  };

  const handleTermsUpdate = async () => {
    const user = userPool.getCurrentUser();
    if (!user) {
      setError("User session not found. Please log out and back in.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Refresh session before updating attributes
      await new Promise((resolve, reject) => {
        user.getSession((err, session) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(session);
        });
      });

      // Update user attributes in Cognito
      await new Promise((resolve, reject) => {
        const attributeList = [
          { Name: "custom:terms_accepted", Value: "true" },
          { Name: "custom:terms_version", Value: CURRENT_TERMS_VERSION },
        ];

        user.updateAttributes(attributeList, (err, result) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(result);
        });
      });

      // Refresh the session to ensure attributes are updated
      await new Promise((resolve, reject) => {
        user.getSession((err, session) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(session);
        });
      });

      // Finally navigate to upload page
      router.push("/upload");
    } catch (err) {
      console.error("Terms update error:", err);

      // Specific error handling
      if (err.code === "NotAuthorizedException") {
        setError("Session expired. Please log out and sign in again.");
        // Force logout after 3 seconds
        setTimeout(() => {
          logout();
        }, 3000);
      } else {
        setError(
          "Failed to update terms acceptance. Please try again or contact support."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerificationCode = () => {
    setIsLoading(true);
    clearMessages();

    const cognitoUser = new CognitoUser({
      Username: signupEmail,
      Pool: userPool,
    });

    cognitoUser.resendConfirmationCode((err) => {
      setIsLoading(false);
      if (err) {
        setError(err.message || "Failed to resend code.");
      } else {
        setSuccess("New verification code sent!");
      }
    });
  };

  const handleOpenTermsModal = (e) => {
    e.preventDefault();
    setShowTermsModal(true);
  };

  const handleAcceptTerms = () => {
    setAcceptedTerms(true);
    setShowTermsModal(false);
  };

  const handleDeclineTerms = () => {
    setAcceptedTerms(false);
    setShowTermsModal(false);
  };

  const pageVariants = {
    initial: { opacity: 0, scale: 0.98 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 0.98 },
  };

  const pageTransition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.3,
  };

  const messageVariants = {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 }
  };

  return (<>
    <div className="auth-container">
      {isLoading && (
        <div className="auth-loading-overlay">
          <div className="auth-loading-spinner"></div>
          <p>Processing...</p>
        </div>
      )}

      <AnimatePresence>
        {showTermsModal && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ModalContent
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <ModalHeader>
                <ModalTitle>Terms & Conditions</ModalTitle>
                <ModalCloseButton onClick={() => setShowTermsModal(false)}>
                  <FiX />
                </ModalCloseButton>
              </ModalHeader>
              <ModalBody>
                <p>
                  <strong>Last Updated:</strong>{" "}
                  {new Date().toLocaleDateString()}
                </p>

                {termsContent.map((section, index) => (
                  <React.Fragment key={index}>
                    <h3>{section.title}</h3>
                    <p>{section.text}</p>
                  </React.Fragment>
                ))}

                <p>
                  By using our Service, you acknowledge that you have read,
                  understood, and agree to be bound by these Terms and
                  Conditions.
                </p>
              </ModalBody>
              <ModalFooter>
                <TermsButton className="decline" onClick={handleDeclineTerms}>
                  Decline
                </TermsButton>
                <TermsButton className="accept" onClick={handleAcceptTerms}>
                  Accept
                </TermsButton>
              </ModalFooter>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>

      <motion.div
        className="auth-card"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence>
          {error && (
            <motion.div
              className="auth-message auth-error"
              variants={messageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
            >
              {error}
              <button
                onClick={() => setError(null)}
                className="auth-close-message"
              >
                &times;
              </button>
            </motion.div>
          )}

          {success && (
            <motion.div
              className="auth-message auth-success"
              variants={messageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
            >
              {success}
              <button
                onClick={() => setSuccess(null)}
                className="auth-close-message"
              >
                &times;
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            style={{ willChange: 'transform, opacity' }}
          >
            {currentPage === "termsUpdate" && (
              <div className="auth-form-container">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="auth-form-title">
                    Updated Terms & Conditions
                  </h2>
                  <p className="auth-form-subtitle">
                    Please review and accept to continue using Irisne᙭
                  </p>
                </motion.div>

                <div className="auth-terms-content">
                  {termsContent.slice(0, 3).map((section, index) => (
                    <div key={index}>
                      <h3>{section.title}</h3>
                      <p>{section.text}</p>
                    </div>
                  ))}
                  <p>
                    <button
                      className="auth-link-button"
                      onClick={() => setShowTermsModal(true)}
                    >
                      View full Terms & Conditions
                    </button>
                  </p>
                </div>

                <TermsCheckboxContainer $accepted={acceptedTerms}>
                  <input
                    type="checkbox"
                    id="termsAccept"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    required
                  />
                  <label htmlFor="termsAccept">
                    I accept the updated Terms & Conditions
                  </label>
                </TermsCheckboxContainer>

                <motion.button
                  className="auth-primary-button"
                  onClick={handleTermsUpdate}
                  disabled={!acceptedTerms || isLoading}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? "Processing..." : "Continue"}
                </motion.button>

                {forceTermsAcceptance && (
                  <div className="auth-fallback-option">
                    <p>If you continue to experience issues, please:</p>
                    <button
                      className="auth-link-button"
                      onClick={() => {
                        logout();
                        setCurrentPage("login");
                      }}
                    >
                      Log out and sign in again
                    </button>
                  </div>
                )}
              </div>
            )}

            {currentPage === "login" && (
              <div className="auth-form-container">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="auth-form-title">Welcome back</h2>
                  <p className="auth-form-subtitle">Sign in to your account</p>
                </motion.div>

                <form onSubmit={handleLoginSubmit} className="auth-form">
                  <motion.div
                    className="auth-input-group"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label htmlFor="loginEmail" className="auth-label">
                      <FiMail className="auth-icon" /> Email address
                    </label>
                    <input
                      type="email"
                      id="loginEmail"
                      className="auth-input"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                      placeholder="Enter your email"
                    />
                  </motion.div>

                  <motion.div
                    className="auth-input-group"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label htmlFor="password" className="auth-label">
                      <FiLock className="auth-icon" /> Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="auth-input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter your password"
                    />
                  </motion.div>

                  <motion.div
                    className="auth-options"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <button
                      type="button"
                      className="auth-link-button"
                      onClick={() => setCurrentPage("forgotPassword")}
                    >
                      Forgot password?
                    </button>
                  </motion.div>

                  <motion.button
                    type="submit"
                    className="auth-primary-button"
                    disabled={isLoading}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Sign In
                  </motion.button>

                  <motion.div
                    className="auth-divider"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <span>OR</span>
                  </motion.div>

                  {/* Only render GoogleButton on client */}
                  {isClient && (
                    <GoogleButton
                      type="button"
                      onClick={loginWithGoogle}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <GoogleIcon />
                      Sign in with Google
                    </GoogleButton>
                  )}

                  <motion.button
                    type="button"
                    className="auth-secondary-button"
                    onClick={() => setCurrentPage("signup")}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Create an account
                  </motion.button>
                </form>
              </div>
            )}

            {currentPage === "signup" && (
              <div className="auth-form-container">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="auth-form-title">Create Account</h2>
                  <p className="auth-form-subtitle">
                    Get started with your free account
                  </p>
                </motion.div>

                <form onSubmit={handleSignupSubmit} className="auth-form">
                  <motion.div
                    className="auth-input-group"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label htmlFor="signupEmail" className="auth-label">
                      <FiMail className="auth-icon" /> Email address
                    </label>
                    <input
                      type="email"
                      id="signupEmail"
                      className="auth-input"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                      placeholder="Enter your email"
                    />
                  </motion.div>

                  <motion.div
                    className="auth-input-group"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label htmlFor="signupPassword" className="auth-label">
                      <FiLock className="auth-icon" /> Password
                    </label>
                    <input
                      type="password"
                      id="signupPassword"
                      className="auth-input"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                      placeholder="Create a password"
                    />
                    <div className="auth-hint">
                      Use 8 or more characters with a mix of letters, numbers &
                      symbols
                    </div>
                  </motion.div>

                  <TermsCheckboxContainer $accepted={acceptedTerms}>
                    <input
                      type="checkbox"
                      id="signupTerms"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      required
                    />
                    <label htmlFor="signupTerms">
                      I agree to the{" "}
                      <a href="#" onClick={handleOpenTermsModal}>
                        Terms & Conditions
                      </a>{" "}
                      and{" "}
                      <a
                        href="/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Privacy Policy
                      </a>
                    </label>
                  </TermsCheckboxContainer>

                  <motion.button
                    type="submit"
                    className="auth-primary-button"
                    disabled={isLoading || !acceptedTerms}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Sign Up
                  </motion.button>

                  <motion.div
                    className="auth-divider"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <span>OR</span>
                  </motion.div>

                  {/* Only render GoogleButton on client */}
                  {isClient && (
                    <GoogleButton
                      type="button"
                      onClick={loginWithGoogle}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <GoogleIcon />
                      Sign up with Google
                    </GoogleButton>
                  )}

                  <motion.div
                    className="auth-footer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    Already have an account?{" "}
                    <button
                      type="button"
                      className="auth-link-button"
                      onClick={() => setCurrentPage("login")}
                    >
                      Sign in
                    </button>
                  </motion.div>
                </form>
              </div>
            )}

            {currentPage === "verifyEmail" && (
              <div className="auth-form-container">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="auth-form-title">Verify Your Email</h2>
                  <p className="auth-form-subtitle">
                    We sent a verification code to {signupEmail}
                  </p>
                </motion.div>

                <form onSubmit={handleVerifyEmailSubmit} className="auth-form">
                  <motion.div
                    className="auth-input-group"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label htmlFor="confirmationCode" className="auth-label">
                      <FiKey className="auth-icon" /> Verification Code
                    </label>
                    <input
                      type="text"
                      id="confirmationCode"
                      className="auth-input"
                      value={confirmationCode}
                      onChange={(e) => setConfirmationCode(e.target.value)}
                      required
                      placeholder="Enter 6-digit code"
                    />
                  </motion.div>

                  <motion.button
                    type="submit"
                    className="auth-primary-button"
                    disabled={isLoading}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Verify Email
                  </motion.button>

                  <motion.div
                    className="auth-footer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Didn't receive a code?{" "}
                    <button
                      type="button"
                      className="auth-link-button"
                      onClick={resendVerificationCode}
                      disabled={isLoading}
                    >
                      Resend code
                    </button>
                  </motion.div>
                </form>
              </div>
            )}

            {currentPage === "forgotPassword" && (
              <div className="auth-form-container">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="auth-form-title">Reset Password</h2>
                  <p className="auth-form-subtitle">
                    Enter your email to receive a reset link
                  </p>
                </motion.div>

                <form
                  onSubmit={handleForgotPasswordSubmit}
                  className="auth-form"
                >
                  <motion.div
                    className="auth-input-group"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label htmlFor="resetEmail" className="auth-label">
                      <FiMail className="auth-icon" /> Email address
                    </label>
                    <input
                      type="email"
                      id="resetEmail"
                      className="auth-input"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      required
                      placeholder="Enter your email"
                    />
                  </motion.div>

                  <motion.button
                    type="submit"
                    className="auth-primary-button"
                    disabled={isLoading}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Reset Link
                  </motion.button>
                </form>
              </div>
            )}

            {currentPage === "enterOtp" && isPasswordResetSent && (
              <div className="auth-form-container">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="auth-form-title">Reset Password</h2>
                  <p className="auth-form-subtitle">
                    Enter the code sent to {resetEmail} and your new password
                  </p>
                </motion.div>

                <form
                  onSubmit={handleResetPasswordSubmit}
                  className="auth-form"
                >
                  <motion.div
                    className="auth-input-group"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label htmlFor="confirmationCode" className="auth-label">
                      <FiKey className="auth-icon" /> Verification Code
                    </label>
                    <input
                      type="text"
                      id="confirmationCode"
                      className="auth-input"
                      value={confirmationCode}
                      onChange={(e) => setConfirmationCode(e.target.value)}
                      required
                      placeholder="Enter 6-digit code"
                    />
                  </motion.div>

                  <motion.div
                    className="auth-input-group"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label htmlFor="newPassword" className="auth-label">
                      <FiLock className="auth-icon" /> New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      className="auth-input"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      placeholder="Create a new password"
                    />
                  </motion.div>

                  <motion.button
                    type="submit"
                    className="auth-primary-button"
                    disabled={isLoading}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Reset Password
                  </motion.button>
                </form>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="auth-footer-global"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        © {new Date().getFullYear()} Irisne᙭. All rights reserved.
        <div className="auth-footer-links">
          <a href="#" onClick={handleOpenTermsModal}>
            Terms
          </a>
          <a href="/privacy" target="_blank" rel="noopener noreferrer">
            Privacy
          </a>
          <a href="/contact" target="_blank" rel="noopener noreferrer">
            Contact
          </a>
        </div>
      </motion.div>
    </div>
  </>);
};

export default AuthPage;