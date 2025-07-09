"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  DocumentTextIcon,
  ArrowUpTrayIcon,
  ArrowRightIcon,
  SparklesIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { saveResumeHistory, getCurrentUser, checkAuth } from "@/components/auth";
import styled from "styled-components";
import { FiInfo } from "react-icons/fi";
import ProtectedRoute from "@/components/ProtectedRoute";

// Loading Component Styles
const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const LoadingContent = styled(motion.div)`
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 500px;
  width: 90%;
`;

const LoadingSpinner = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 2rem;
`;

const SpinnerOrbit = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px dashed rgba(59, 130, 246, 0.2);
  border-radius: 50%;
`;

const SpinnerSatellite = styled(motion.div)`
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 20px;
  background: #3b82f6;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
`;

const SpinnerCore = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background: #eff6ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #3b82f6;
`;

const LoadingTextContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const LoadingText = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
`;

const LoadingDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

const LoadingDot = styled(motion.div)`
  width: 8px;
  height: 8px;
  background-color: #3b82f6;
  border-radius: 50%;
`;

const LoadingProgress = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
`;

const LoadingBar = styled.div`
  height: 6px;
  background-color: #e5e7eb;
  border-radius: 3px;
  margin-bottom: 1.5rem;
  position: relative;
  overflow: hidden;
`;

const LoadingProgressBar = styled(motion.div)`
  height: 100%;
  background-color: #3b82f6;
  border-radius: 3px;
  position: absolute;
  top: 0;
  left: 0;
`;

const LoadingPulse = styled(motion.div)`
  position: absolute;
  top: 0;
  width: 20px;
  height: 100%;
  background-color: white;
  opacity: 0;
  transform: translateX(-50%);
`;

const LoadingHint = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 1rem;
`;

const LoadingComponent = ({ progress = 0, text = "Optimizing your resume" }) => {
  return (
    <LoadingContainer>
      <LoadingContent
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 200 }}
      >
        <LoadingSpinner>
          <SpinnerOrbit
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <SpinnerSatellite
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </SpinnerOrbit>
          <SpinnerCore />
        </LoadingSpinner>
        <LoadingTextContainer>
          <LoadingText>{text}</LoadingText>
          <LoadingDots>
            {[...Array(3)].map((_, i) => (
              <LoadingDot
                key={i}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </LoadingDots>
        </LoadingTextContainer>
        <LoadingProgress>{progress}%</LoadingProgress>
        <LoadingBar>
          <LoadingProgressBar
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
          <LoadingPulse
            animate={{
              left: `${progress}%`,
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
        </LoadingBar>
        <LoadingHint>
          <FiInfo />
          This usually takes 15-30 seconds depending on resume complexity
        </LoadingHint>
      </LoadingContent>
    </LoadingContainer>
  );
};

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [jobId, setJobId] = useState("");
  const [jdDescription, setJdDescription] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [userPlan, setUserPlan] = useState(null);
  const [scansLeft, setScansLeft] = useState(0);
  const [isCheckingPlan, setIsCheckingPlan] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Optimizing your resume");
  const [isJDSaved, setIsJDSaved] = useState(false);

  const router = useRouter();

  useEffect(() => {
    checkUserPlan();
  }, []);

  const checkUserPlan = async () => {
    try {
      const currentUser = getCurrentUser();
      if (!currentUser) {
        setMessage({
          text: "Please sign in to use this feature",
          type: "error",
        });
        return;
      }

      const session = await checkAuth();
      const idToken = session.getIdToken().getJwtToken();
      const payload = JSON.parse(atob(idToken.split(".")[1]));
      const email = payload.email;

      const response = await axios.get(
        `https://23k44nvasj.execute-api.ap-south-1.amazonaws.com/plan-check?email=${encodeURIComponent(
          email
        )}`
      );

      setUserPlan(response.data.plan || "free");
      setScansLeft(response.data.scansLeft || 0);
    } catch (error) {
      console.error("Error checking user plan:", error);
      setMessage({
        text: "Failed to verify your subscription. Please try again.",
        type: "error",
      });
      setUserPlan("free");
      setScansLeft(0);
    } finally {
      setIsCheckingPlan(false);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileType = selectedFile.type;
      const validTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ];
      
      if (!validTypes.includes(fileType)) {
        setMessage({ 
          text: "Please select a PDF or DOCX file only.", 
          type: "error" 
        });
        return;
      }
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setMessage({ text: "", type: "" });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length === 0) return;
    
    const droppedFile = droppedFiles[0];
    if (droppedFile) {
      const fileType = droppedFile.type;
      const validTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ];
      
      if (!validTypes.includes(fileType)) {
        setMessage({ 
          text: "Please drop a PDF or DOCX file only.", 
          type: "error" 
        });
        return;
      }
      setFile(droppedFile);
      setFileName(droppedFile.name);
      setMessage({ text: "", type: "" });
    }
  };

  const simulateProgress = () => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 5) + 1;
      if (currentProgress >= 95) {
        currentProgress = 95;
        clearInterval(interval);
      }
      setProgress(currentProgress);
    }, 500);
    return interval;
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage({ text: "Please select a file first.", type: "error" });
      return;
    }

    if (userPlan === "free" && scansLeft <= 0) {
      setMessage({
        text: "You've used all your free scans. Upgrade to premium for unlimited scans.",
        type: "error",
      });
      return;
    }

    setIsLoading(true);
    setMessage({ text: "", type: "" });
    setLoadingText("Uploading your resume");
    setProgress(0);
    const progressInterval = simulateProgress();

    try {
      const currentUser = getCurrentUser();
      if (!currentUser) {
        throw new Error("No authenticated user found");
      }

      const username = currentUser.getUsername();
      const session = await checkAuth();
      const idToken = session.getIdToken().getJwtToken();
      const payload = JSON.parse(atob(idToken.split(".")[1]));
      const email = payload.email;

      // Read file as base64
      const base64String = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = error => reject(error);
      });

      const response = await axios.post(
        "https://yswqqahzigeantiacwh5wqji5q0awats.lambda-url.ap-south-1.on.aws/",
        {
          action: "upload",
          fileName: file.name,
          fileContent: base64String,
          username: username,
          email: email,
        }
      );

      clearInterval(progressInterval);
      setProgress(100);
      
      setJobId(response.data.JobId);
      setJdDescription("");
      setIsJDSaved(false);
      setMessage({
        text: `File uploaded successfully!`,
        type: "success",
      });

      if (userPlan === "free") {
        setScansLeft((prev) => prev - 1);
      }

      // Save to resume history
      saveResumeHistory({
        jobId: response.data.JobId,
        fileName: file.name,
        date: new Date().toISOString(),
        fileType: file.name.split('.').pop().toUpperCase(),
      });
    } catch (error) {
      console.error("Upload error:", error);
      clearInterval(progressInterval);
      setMessage({
        text: `Upload failed: ${error.message}`,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveJD = async () => {
    if (!jobId || !jdDescription) {
      setMessage({
        text: "Please upload resume and enter job description first.",
        type: "error",
      });
      return;
    }

    setIsLoading(true);
    setMessage({ text: "", type: "" });
    setLoadingText("Saving job description");
    setProgress(0);
    const progressInterval = simulateProgress();

    try {
      await axios.post(
        "https://yswqqahzigeantiacwh5wqji5q0awats.lambda-url.ap-south-1.on.aws/",
        {
          action: "saveJD",
          JobId: jobId,
          JDDescription: jdDescription,
        }
      );

      clearInterval(progressInterval);
      setProgress(100);
      
      setMessage({
        text: `Job description saved successfully!`,
        type: "success",
      });
      
      setIsJDSaved(true);
    } catch (error) {
      clearInterval(progressInterval);
      setMessage({
        text: `Failed to save job description: ${
          error.response?.data?.message || error.message
        }`,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleProceed = async () => {
    if (!jdDescription) {
      setMessage({
        text: "Please enter job description first.",
        type: "error",
      });
      return;
    }

    if (!isJDSaved) {
      setMessage({
        text: "Please save the job description before proceeding.",
        type: "error",
      });
      return;
    }

    setIsLoading(true);
    setMessage({ text: "", type: "" });
    setLoadingText("Analyzing your resume");
    setProgress(0);
    const progressInterval = simulateProgress();

    try {
      const response = await axios.post(
        "https://ym3gsl33vi.execute-api.ap-south-1.amazonaws.com/analyze",
        { jobId }
      );

      clearInterval(progressInterval);
      setProgress(100);
      
      localStorage.setItem("atsResult", JSON.stringify(response.data));

      const resumeEntry = {
        jobId: response.data.JobId || jobId,
        atsScore: response.data.ats_score ?? 0,
        verdict: response.data.verdict || "N/A",
        date: new Date().toISOString(),
      };

      saveResumeHistory(resumeEntry);
      
      // Redirect immediately without delay
      router.push("/results");
    } catch (error) {
      clearInterval(progressInterval);
      setMessage({
        text: `Analysis failed: ${
          error.response?.data?.message || error.message
        }`,
        type: "error",
      });
      setIsLoading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setFileName("");
  };

  const dismissMessage = () => {
    setMessage({ text: "", type: "" });
  };

  const handleUpgrade = () => {
    setMessage({
      text: "Redirecting to upgrade page...",
      type: "success",
    });
    router.push('/pricing');
  };

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
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const uploadBoxVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
    drag: { scale: 1.03, backgroundColor: "#f3f4f6" },
  };

  if (isCheckingPlan) {
    return <LoadingComponent text="Checking your subscription..." />;
  }

  return (<><ProtectedRoute>
    <div className="resume-analyzer-container">
      {isLoading && <LoadingComponent progress={progress} text={loadingText} />}
      
      <motion.div
        className="main-card"
        variants={itemVariants}
        whileHover={{ y: -2 }}
      >
        <div className="header-section">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <DocumentTextIcon className="header-icon" />
          </motion.div>
          <motion.h2
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Resume & Job Description Analyzer
          </motion.h2>
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Get detailed ATS compatibility analysis for your resume with
            personalized recommendations
          </motion.p>

          {userPlan === "free" && (
            <motion.div
              className="plan-indicator free"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span>Free Plan ({scansLeft} scans left this month)</span>
              <button onClick={handleUpgrade}>Upgrade</button>
            </motion.div>
          )}
          {userPlan === "premium" && (
            <motion.div
              className="plan-indicator premium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span>Premium Plan (Unlimited scans)</span>
            </motion.div>
          )}
        </div>

        <motion.div variants={itemVariants}>
          <motion.label
            variants={uploadBoxVariants}
            whileHover={!isDragging ? "hover" : ""}
            whileTap="tap"
            animate={isDragging ? "drag" : "rest"}
            className="file-upload-label"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept="application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileChange}
              className="file-input"
              disabled={userPlan === "free" && scansLeft <= 0}
            />
            <div
              className={`upload-box ${isDragging ? "dragging" : ""} ${
                userPlan === "free" && scansLeft <= 0 ? "disabled" : ""
              }`}
            >
              {userPlan === "free" && scansLeft <= 0 ? (
                <>
                  <LockClosedIcon className="upload-icon" />
                  <p className="upload-text">
                    You've reached your scan limit. Upgrade to premium to
                    continue.
                  </p>
                </>
              ) : (
                <>
                  <ArrowUpTrayIcon className="upload-icon" />
                  <p className="upload-text">
                    {fileName ||
                      (isDragging
                        ? "Drop your resume here"
                        : "Drag & drop your resume or click to browse")}
                  </p>
                  <p className="file-type-hint">PDF or DOCX files</p>

                  {fileName && (
                    <motion.div
                      className="clear-file-button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        clearFile();
                      }}
                    >
                      <XMarkIcon className="clear-icon" />
                    </motion.div>
                  )}
                </>
              )}
            </div>
          </motion.label>

          <motion.button
            onClick={handleUpload}
            className={`upload-button ${
              isLoading || !file || (userPlan === "free" && scansLeft <= 0)
                ? "disabled"
                : ""
            }`}
            whileHover={
              isLoading || !file || (userPlan === "free" && scansLeft <= 0)
                ? {}
                : {
                    scale: 1.05,
                    boxShadow:
                      "0 10px 15px -3px rgba(139, 92, 246, 0.2), 0 4px 6px -2px rgba(139, 92, 246, 0.1)",
                  }
            }
            whileTap={
              isLoading || !file || (userPlan === "free" && scansLeft <= 0)
                ? {}
                : { scale: 0.98 }
            }
            disabled={
              isLoading || !file || (userPlan === "free" && scansLeft <= 0)
            }
            variants={itemVariants}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner" />
                Uploading...
              </>
            ) : userPlan === "free" && scansLeft <= 0 ? (
              <>
                <LockClosedIcon className="button-icon" />
                Upgrade Required
              </>
            ) : (
              <>
                <ArrowUpTrayIcon className="button-icon" />
                Upload Resume
              </>
            )}
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {jobId && (
            <motion.div
              className="jd-section"
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: "auto",
                opacity: 1,
                transition: {
                  height: { duration: 0.4 },
                  opacity: { duration: 0.2, delay: 0.2 },
                },
              }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="jd-heading">Job Description</h3>
                <p className="jd-subheading">
                  Paste the job description you're applying for to get
                  personalized analysis
                </p>
                <motion.textarea
                  value={jdDescription}
                  onChange={(e) => {
                    setJdDescription(e.target.value);
                    setIsJDSaved(false);
                  }}
                  placeholder="Paste job description here..."
                  className="jd-textarea"
                  whileFocus={{
                    borderColor: "#8b5cf6",
                    boxShadow: "0 0 0 3px rgba(139, 92, 246, 0.2)",
                  }}
                />

                <AnimatePresence>
                  {jdDescription && !isJDSaved && (
                    <motion.div
                      className="jd-save-hint"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ExclamationTriangleIcon className="hint-icon" />
                      Please save the job description before proceeding
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="action-buttons">
                  <motion.button
                    onClick={handleSaveJD}
                    className={`save-jd-button ${isLoading ? "disabled" : ""}`}
                    whileHover={
                      isLoading
                        ? {}
                        : {
                            scale: 1.05,
                            backgroundColor: "#ddd6fe",
                          }
                    }
                    whileTap={isLoading ? {} : { scale: 0.98 }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="loading-spinner purple" />
                        Saving...
                      </>
                    ) : (
                      "Save Job Description"
                    )}
                  </motion.button>

                  <motion.button
                    onClick={handleProceed}
                    className={`proceed-button ${
                      isLoading || !jdDescription || !isJDSaved ? "disabled" : ""
                    }`}
                    whileHover={
                      isLoading || !jdDescription || !isJDSaved
                        ? {}
                        : {
                            scale: 1.05,
                            backgroundColor: "#7c3aed",
                          }
                    }
                    whileTap={
                      isLoading || !jdDescription || !isJDSaved ? {} : { scale: 0.98 }
                    }
                    disabled={isLoading || !jdDescription || !isJDSaved}
                  >
                    {isLoading ? (
                      <>
                        <span className="loading-spinner" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <span>Proceed to Analysis</span>
                        <ArrowRightIcon className="button-icon" />
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {message.text && (
            <motion.div
              className={`message ${message.type}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {message.type === "success" ? (
                <SparklesIcon className="message-icon" />
              ) : (
                <ExclamationTriangleIcon className="message-icon" />
              )}
              <p className="message-text">{message.text}</p>
              <motion.button
                onClick={dismissMessage}
                className="dismiss-button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <XMarkIcon className="dismiss-icon" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .resume-analyzer-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 115vh;
          padding: 1rem;
          background-color: #f9fafb;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        @media (max-width: 768px) {
          .resume-analyzer-container {
            flex-direction: column;
            min-height: auto;
            padding: 6.5rem 1rem;
            align-items: stretch;
          }
        }

        .main-card {
          width: 100%;
          max-width: 800px;
          background-color: white;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          padding: 2rem;
          overflow: hidden;
        }

        .header-section {
          text-align: center;
          margin-bottom: 2rem;
          position: relative;
        }

        .header-icon {
          width: 3rem;
          height: 3rem;
          margin: 0 auto 1rem;
          color: #8b5cf6;
          filter: drop-shadow(0 4px 3px rgba(139, 92, 246, 0.15));
        }

        .header-section h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 0.5rem;
          line-height: 1.2;
        }

        .header-section p {
          color: #6b7280;
          font-size: 1rem;
          max-width: 500px;
          margin: 0 auto;
          line-height: 1.5;
        }

        .plan-indicator {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 600;
          margin-top: 1rem;
        }

        .plan-indicator.free {
          background-color: #f0fdf4;
          color: #166534;
          border: 1px solid #bbf7d0;
        }

        .plan-indicator.premium {
          background-color: #f5f3ff;
          color: #5b21b6;
          border: 1px solid #c4b5fd;
        }

        .plan-indicator.free button {
          background: none;
          border: none;
          color: #166534;
          text-decoration: underline;
          cursor: pointer;
          font-weight: 600;
          padding: 0;
          margin-left: 0.5rem;
        }

        .file-upload-label {
          display: block;
          width: 100%;
        }

        .file-input {
          display: none;
        }

        .upload-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          border: 2px dashed #d1d5db;
          border-radius: 12px;
          background-color: #f9fafb;
          transition: all 0.3s ease;
          width: 100%;
          cursor: pointer;
          margin-bottom: 1.5rem;
          position: relative;
          overflow: hidden;
        }

        .upload-box.dragging {
          border-color: #8b5cf6;
          background-color: #f5f3ff;
        }

        .upload-box.disabled {
          background-color: #f3f4f6;
          border-color: #e5e7eb;
          cursor: not-allowed;
        }

        .upload-icon {
          width: 2.5rem;
          height: 2.5rem;
          color: #8b5cf6;
          margin-bottom: 1rem;
        }

        .upload-text {
          color: #6b7280;
          font-weight: 500;
          margin-bottom: 0.5rem;
          text-align: center;
          word-break: break-word;
          width: 100%;
          padding: 0 1rem;
        }

        .file-type-hint {
          font-size: 0.75rem;
          color: #9ca3af;
          margin-top: 0.25rem;
        }

        .clear-file-button {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          background-color: #f3f4f6;
          border-radius: 50%;
          width: 1.5rem;
          height: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .clear-icon {
          width: 1rem;
          height: 1rem;
          color: #6b7280;
        }

        .upload-button {
          background-color: #8b5cf6;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin: 0 auto;
          box-shadow: 0 4px 6px -1px rgba(139, 92, 246, 0.1), 0 2px 4px -1px rgba(139, 92, 246, 0.06);
          width: 100%;
          max-width: 200px;
        }

        .upload-button.disabled {
          background-color: #c4b5fd;
          cursor: not-allowed;
          box-shadow: none;
        }

        .button-icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        .loading-spinner {
          display: inline-block;
          width: 1rem;
          height: 1rem;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
          margin-right: 0.5rem;
        }

        .loading-spinner.purple {
          border-top-color: #6b21a8;
        }

        .jd-section {
          margin-top: 2rem;
        }

        .jd-heading {
          font-size: 1.25rem;
          font-weight: 600;
          color: #111827;
          margin-bottom: 0.5rem;
        }

        .jd-subheading {
          color: #6b7280;
          font-size: 0.875rem;
          margin-bottom: 1rem;
        }

        .jd-textarea {
          width: 100%;
          min-height: 150px;
          padding: 1rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          resize: vertical;
          font-family: inherit;
          font-size: 0.875rem;
          margin-bottom: 1.5rem;
          transition: all 0.3s ease;
          outline: none;
        }

        .jd-textarea:focus {
          border-color: #8b5cf6;
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
        }

        .jd-save-hint {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background-color: #fffbeb;
          color: #b45309;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .jd-save-hint .hint-icon {
          width: 1rem;
          height: 1rem;
          flex-shrink: 0;
        }

        .action-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: space-between;
        }

        .save-jd-button {
          background-color: #ede9fe;
          color: #6b21a8;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          flex: 1;
          min-width: 150px;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .save-jd-button.disabled {
          background-color: #e9d5ff;
          cursor: not-allowed;
        }

        .proceed-button {
          background-color: #8b5cf6;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          flex: 1;
          min-width: 150px;
          box-shadow: 0 4px 6px -1px rgba(139, 92, 246, 0.1), 0 2px 4px -1px rgba(139, 92, 246, 0.06);
        }

        .proceed-button.disabled {
          background-color: #c4b5fd;
          cursor: not-allowed;
        }

        .message {
          display: flex;
          align-items: center;
          padding: 1rem;
          border-radius: 8px;
          margin-top: 1.5rem;
          font-size: 0.875rem;
          gap: 0.75rem;
          position: relative;
          padding-right: 2.5rem;
        }

        .message.success {
          background-color: #ecfdf5;
          color: #065f46;
        }

        .message.error {
          background-color: #fee2e2;
          color: #b91c1c;
        }

        .message-icon {
          width: 1.25rem;
          height: 1.25rem;
          flex-shrink: 0;
        }

        .message-text {
          margin: 0;
          word-break: break-word;
        }

        .dismiss-button {
          position: absolute;
          right: 0.75rem;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.25rem;
        }

        .dismiss-icon {
          width: 1rem;
          height: 1rem;
        }

        .message.success .dismiss-icon {
          color: #065f46;
        }

        .message.error .dismiss-icon {
          color: #b91c1c;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 640px) {
          .main-card {
            padding: 1.5rem;
            border-radius: 12px;
          }

          .header-section h2 {
            font-size: 1.5rem;
          }

          .header-section p {
            font-size: 0.9375rem;
          }

          .upload-box {
            padding: 1.5rem;
          }

          .action-buttons {
            flex-direction: column;
          }

          .save-jd-button,
          .proceed-button {
            width: 100%;
          }
        }

        @media (max-width: 400px) {
          .main-card {
            padding: 1.25rem;
          }

          .header-icon {
            width: 2.5rem;
            height: 2.5rem;
          }

          .header-section h2 {
            font-size: 1.25rem;
          }

          .upload-button {
            padding: 0.75rem;
            font-size: 0.875rem;
          }
        }
      `}</style>
    </div>
    </ProtectedRoute>
  </>);
};

export default ResumeAnalyzer;