"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { Doughnut, Radar, Bar } from "react-chartjs-2";
import { motion, AnimatePresence } from "framer-motion";
import styled from "@emotion/styled";
import {
  FiDownload,
  FiMail,
  FiZap,
  FiCheck,
  FiAlertTriangle,
  FiX,
  FiAward,
  FiInfo,
} from "react-icons/fi";
import { FaRegLightbulb } from "react-icons/fa";

// Register ChartJS components
ChartJS.register(
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
);

// Animation configurations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
};

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
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
      damping: 15,
      stiffness: 120,
      mass: 0.5,
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const scaleUp = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "backOut",
    },
  },
};

// Chart configurations
const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "80%",
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
  },
  animation: {
    animateScale: true,
    animateRotate: true,
  },
};

const radarOptions = {
  responsive: true,
  scales: {
    r: {
      beginAtZero: true,
      max: 100,
      ticks: { display: false },
      grid: { color: "rgba(0,0,0,0.08)" },
      pointLabels: {
        font: {
          size: 12,
          family: "'Inter', sans-serif",
        },
      },
    },
  },
  plugins: {
    legend: { display: false },
  },
  elements: {
    line: {
      tension: 0.2,
    },
  },
};

const barOptions = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      grid: { display: false },
      ticks: {
        precision: 0,
        font: { family: "'Inter', sans-serif" },
        color: "#4B5563",
      },
    },
    x: {
      grid: { display: false },
      ticks: {
        font: { family: "'Inter', sans-serif" },
        color: "#4B5563",
      },
    },
  },
  plugins: {
    legend: { display: false },
  },
  animation: {
    duration: 1500,
    easing: "easeInOutQuad",
  },
};

// Color scheme functions
const getScoreColor = (score) => {
  if (score >= 80) return "#10B981"; // Emerald
  if (score >= 65) return "#3B82F6"; // Blue
  if (score >= 50) return "#F59E0B"; // Amber
  if (score >= 30) return "#F97316"; // Orange
  return "#EF4444"; // Red
};

const getVerdict = (score) => {
  if (score >= 80) return "Excellent Match";
  if (score >= 65) return "Strong Match";
  if (score >= 50) return "Moderate Match";
  if (score >= 30) return "Weak Match";
  return "Poor Match";
};

const getVerdictColor = (score) => {
  if (score >= 80) return "#10B981";
  if (score >= 65) return "#3B82F6";
  if (score >= 50) return "#F59E0B";
  if (score >= 30) return "#F97316";
  return "#EF4444";
};

const LoadingOverlay = ({ progress }) => {
  // Round progress to integer to remove decimal
  const roundedProgress = Math.round(progress);

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

        {/* Fixed dot positioning */}
        <LoadingTextContainer>
          <LoadingText>Optimizing your resume</LoadingText>
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

        {/* Use rounded progress without decimal */}
        <LoadingProgress>{roundedProgress}%</LoadingProgress>

        <LoadingBar>
          <LoadingProgressBar
            initial={{ width: "0%" }}
            animate={{ width: `${roundedProgress}%` }}
            transition={{ duration: 0.5 }}
          />
          <LoadingPulse
            animate={{
              left: `${roundedProgress}%`,
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

const CoverLetterLoadingOverlay = ({ progress }) => {
  // Round progress to integer to remove decimal
  const roundedProgress = Math.round(progress);

  return (
    <LoadingContainer>
      <LoadingContent
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 200 }}
      >
        <LoadingSpinner>
          <LetterEnvelope>
            <LetterPaper
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </LetterEnvelope>
        </LoadingSpinner>

        {/* Fixed dot positioning */}
        <LoadingTextContainer>
          <LoadingText>Generating cover letter</LoadingText>
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

        {/* Use rounded progress without decimal */}
        <LoadingProgress>{roundedProgress}%</LoadingProgress>

        <LoadingBar>
          <LoadingProgressBar
            initial={{ width: "0%" }}
            animate={{ width: `${roundedProgress}%` }}
            transition={{ duration: 0.5 }}
          />
          <LoadingPulse
            animate={{
              left: `${roundedProgress}%`,
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
          Our AI is crafting a personalized cover letter for you
        </LoadingHint>
      </LoadingContent>
    </LoadingContainer>
  );
};

const Results = () => {
  const [atsData, setAtsData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [coverLetter, setCoverLetter] = useState(null);
  const [optimizedResumeUrl, setOptimizedResumeUrl] = useState(null);
  const [notification, setNotification] = useState(null);
  const [activeTab, setActiveTab] = useState("keywords");
  const [scoreColor, setScoreColor] = useState("#3B82F6");
  const [displayScore, setDisplayScore] = useState(0);
  const [showActionButtons, setShowActionButtons] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [coverLetterProgress, setCoverLetterProgress] = useState(0);
  const animationRef = useRef(null);

  useEffect(() => {
    // Fetch data from localStorage
    const data = localStorage.getItem("atsResult");
    if (data) {
      setAtsData(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Start score counting animation
    if (atsData?.ats_score) {
      const targetScore = atsData.ats_score;
      const duration = 2000; // 2 seconds
      const startTime = performance.now();

      const animateScore = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentScore = Math.floor(progress * targetScore);

        setDisplayScore(currentScore);
        setScoreColor(getScoreColor(currentScore));

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animateScore);
        } else {
          setDisplayScore(targetScore);
          setScoreColor(getScoreColor(targetScore));
        }
      };

      animationRef.current = requestAnimationFrame(animateScore);

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [atsData?.ats_score]);

  const simulateProgress = (setProgress) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      setProgress(Math.min(progress, 100));
    }, 300);
    return interval;
  };

  const generateCoverLetter = async () => {
    setIsGenerating(true);
    const progressInterval = simulateProgress(setCoverLetterProgress);

    try {
      const response = await fetch(
        "https://ym3gsl33vi.execute-api.ap-south-1.amazonaws.com/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jobId: atsData.JobId,
            action: "cover-letter",
          }),
        }
      );

      const data = await response.json();
      if (data.GeneratedCoverLetter) {
        setCoverLetter(data.GeneratedCoverLetter);
        downloadCoverLetter(data.GeneratedCoverLetter);
        showNotification("success", "Cover letter generated and downloaded!");
      }
    } catch (error) {
      console.error("Error generating cover letter:", error);
      showNotification(
        "error",
        "Failed to generate cover letter. Please try again."
      );
    } finally {
      clearInterval(progressInterval);
      setCoverLetterProgress(0);
      setIsGenerating(false);
    }
  };

  const optimizeResume = async () => {
    setIsOptimizing(true);
    const progressInterval = simulateProgress(setLoadingProgress);

    try {
      const response = await fetch(
        "https://gpjqmp7spedhoxtlebrqmoxxlq0rmfmi.lambda-url.ap-south-1.on.aws/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jobId: atsData.JobId,
            userId: atsData.Username || "current_user",
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        if (data.downloadUrl) {
          setOptimizedResumeUrl(data.downloadUrl);
          window.open(data.downloadUrl, "_blank");
          showNotification("success", "Resume optimized and download started!");
        } else {
          showNotification(
            "error",
            data.error || "Optimization completed but download URL not found"
          );
        }
      } else {
        showNotification("error", data.error || "Failed to optimize resume");
      }
    } catch (error) {
      console.error("Error optimizing resume:", error);
      showNotification("error", "Failed to optimize resume. Please try again.");
    } finally {
      clearInterval(progressInterval);
      setLoadingProgress(0);
      setIsOptimizing(false);
    }
  };

  const downloadCoverLetter = (content) => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `CoverLetter_${atsData.JobId}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const downloadExistingCoverLetter = () => {
    if (atsData.GeneratedCoverLetter) {
      downloadCoverLetter(atsData.GeneratedCoverLetter);
      showNotification("success", "Cover letter downloaded!");
    }
  };

  const downloadOptimizedResume = () => {
    if (optimizedResumeUrl) {
      window.open(optimizedResumeUrl, "_blank");
    }
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  if (!atsData) {
    return (
      <NoData>
        <EmptyStateIcon>
          <FiAward />
        </EmptyStateIcon>
        <EmptyStateTitle>No Analysis Data Found</EmptyStateTitle>
        <EmptyStateText>
          Please upload your resume and job description to get started.
        </EmptyStateText>
      </NoData>
    );
  }

  const {
    JobId,
    ats_score,
    matched_keywords,
    missing_keywords,
    skills,
    summary,
    weighted_score_breakdown,
    recommendations,
    GeneratedCoverLetter,
    Username,
  } = atsData;

  // Chart data configurations
  const doughnutData = {
    labels: ["Score", "Remaining"],
    datasets: [
      {
        data: [displayScore, 100 - displayScore],
        backgroundColor: [scoreColor, "#F3F4F6"],
        borderWidth: 0,
      },
    ],
  };

  const radarData = {
    labels: Object.keys(weighted_score_breakdown || {}),
    datasets: [
      {
        label: "Score Weight",
        data: Object.values(weighted_score_breakdown || {}),
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "#3B82F6",
        borderWidth: 2,
        pointBackgroundColor: "#3B82F6",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#3B82F6",
        fill: true,
      },
    ],
  };

  const skillCategories = Object.keys(skills || {});
  const skillCounts = skillCategories.map((cat) => skills[cat]?.length || 0);
  const barData = {
    labels: skillCategories,
    datasets: [
      {
        label: "Skills",
        data: skillCounts,
        backgroundColor: "#3B82F6",
        borderRadius: 6,
        hoverBackgroundColor: "#2563EB",
      },
    ],
  };

  // Summary data
  const summaryData = [
    {
      title: "Keyword Match",
      value: `${matched_keywords?.length || 0}/${
        (matched_keywords?.length || 0) + (missing_keywords?.length || 0)
      }`,
      description:
        matched_keywords?.length === 0
          ? "No keywords matched"
          : matched_keywords?.length >= 15
          ? "Excellent keyword coverage"
          : matched_keywords?.length >= 8
          ? "Good keyword coverage"
          : "Low keyword coverage",
      icon: <FiCheck />,
      color:
        matched_keywords?.length === 0
          ? "#EF4444"
          : matched_keywords?.length >= 15
          ? "#10B981"
          : matched_keywords?.length >= 8
          ? "#3B82F6"
          : "#F59E0B",
    },
    {
      title: "Skill Diversity",
      value: `${skillCategories.length} categories`,
      description:
        skillCategories.length >= 5
          ? "Wide range of skills"
          : skillCategories.length >= 3
          ? "Moderate skill diversity"
          : "Limited skill diversity",
      icon: <FiZap />,
      color:
        skillCategories.length >= 5
          ? "#10B981"
          : skillCategories.length >= 3
          ? "#3B82F6"
          : "#F59E0B",
    },
    {
      title: "Content Balance",
      value: weighted_score_breakdown
        ? Object.keys(weighted_score_breakdown).reduce((a, b) =>
            weighted_score_breakdown[a] > weighted_score_breakdown[b] ? a : b
          )
        : "N/A",
      description: "Identifies your strongest resume section",
      icon: <FiInfo />,
      color: "#8B5CF6",
    },
  ];

  return (
    <Container initial="hidden" animate="visible" variants={containerVariants}>
      <AnimatePresence>
        {isOptimizing && <LoadingOverlay progress={loadingProgress} />}
        {isGenerating && (
          <CoverLetterLoadingOverlay progress={coverLetterProgress} />
        )}

        {notification && (
          <Notification
            key="notification"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            type={notification.type}
          >
            <NotificationIcon>
              {notification.type === "success" ? (
                <FiCheck />
              ) : (
                <FiAlertTriangle />
              )}
            </NotificationIcon>
            <NotificationText>{notification.message}</NotificationText>
            <CloseButton onClick={() => setNotification(null)}>
              <FiX />
            </CloseButton>
          </Notification>
        )}
      </AnimatePresence>

      <HeaderContainer>
        <Title>ATS Resume Analysis</Title>
        <Subtitle>
          Detailed breakdown of your resume's compatibility with the job
          description
        </Subtitle>

        <ScoreSummary>
          <ScoreCircle
            color={scoreColor}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              damping: 15,
              stiffness: 100,
              delay: 0.2,
            }}
          >
            <ScoreValue>{displayScore}</ScoreValue>
            <ScoreLabel>ATS Score</ScoreLabel>
          </ScoreCircle>
          <VerdictContainer>
            <Verdict color={getVerdictColor(ats_score)}>
              {getVerdict(ats_score)}
            </Verdict>
            <VerdictDescription>
              {ats_score >= 80
                ? "Your resume is highly optimized for this position"
                : ats_score >= 65
                ? "Your resume is well suited for this position"
                : ats_score >= 50
                ? "Your resume needs some improvements"
                : ats_score >= 30
                ? "Your resume needs significant improvements"
                : "Your resume is not well suited for this position"}
            </VerdictDescription>
          </VerdictContainer>
        </ScoreSummary>
      </HeaderContainer>

      {/* Summary Section */}
      <SectionTitle variants={itemVariants}>Summary</SectionTitle>
      <SummaryContainer variants={itemVariants}>
        <SummaryText>
          {summary ||
            "No summary available. The analysis will provide insights about how well your resume matches the job description, highlighting strengths and areas for improvement."}
        </SummaryText>
      </SummaryContainer>

      {/* Key Insights Section */}
      <SectionTitle variants={itemVariants}>Key Insights</SectionTitle>
      <SummaryGrid variants={staggerVariants}>
        {summaryData.map((item, index) => (
          <SummaryCard
            key={item.title}
            variants={itemVariants}
            custom={index}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <SummaryCardHeader>
              <SummaryIcon color={item.color}>{item.icon}</SummaryIcon>
              <SummaryTitle>{item.title}</SummaryTitle>
            </SummaryCardHeader>
            <SummaryValue color={item.color}>{item.value}</SummaryValue>
            <SummaryDescription>{item.description}</SummaryDescription>
          </SummaryCard>
        ))}
      </SummaryGrid>

      <DashboardGrid variants={staggerVariants}>
        <ChartContainer variants={itemVariants}>
          <ChartCard
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ChartHeader>
              <ChartTitle>Score Breakdown</ChartTitle>
              <ChartSubtitle>How your resume performed overall</ChartSubtitle>
            </ChartHeader>
            <ChartWrapper>
              <Doughnut data={doughnutData} options={doughnutOptions} />
              <ScoreBadgeContainer>
                <ScoreBadgeCircle color={scoreColor}>
                  <span>{displayScore}</span>
                </ScoreBadgeCircle>
              </ScoreBadgeContainer>
            </ChartWrapper>
            <ChartFooter>
              <ScoreAnalysis>
                <ScoreAnalysisItem>
                  <ScoreDot color="#10B981" />
                  <span>80+ Excellent</span>
                </ScoreAnalysisItem>
                <ScoreAnalysisItem>
                  <ScoreDot color="#3B82F6" />
                  <span>65-79 Strong</span>
                </ScoreAnalysisItem>
                <ScoreAnalysisItem>
                  <ScoreDot color="#F59E0B" />
                  <span>50-64 Moderate</span>
                </ScoreAnalysisItem>
                <ScoreAnalysisItem>
                  <ScoreDot color="#EF4444" />
                  <span>Below 50 Needs Work</span>
                </ScoreAnalysisItem>
              </ScoreAnalysis>
            </ChartFooter>
          </ChartCard>
        </ChartContainer>

        <ChartContainer variants={itemVariants}>
          <ChartCard
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ChartHeader>
              <ChartTitle>Competency Radar</ChartTitle>
              <ChartSubtitle>Detailed category analysis</ChartSubtitle>
            </ChartHeader>
            <ChartWrapper style={{ height: "320px" }}>
              <Radar data={radarData} options={radarOptions} />
            </ChartWrapper>
          </ChartCard>
        </ChartContainer>

        <ChartContainer variants={itemVariants}>
          <ChartCard
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ChartHeader>
              <ChartTitle>Skill Distribution</ChartTitle>
              <ChartSubtitle>Skills identified in your resume</ChartSubtitle>
            </ChartHeader>
            <ChartWrapper>
              <Bar data={barData} options={barOptions} />
            </ChartWrapper>
          </ChartCard>
        </ChartContainer>
      </DashboardGrid>

      <FloatingActionContainer>
        <AnimatePresence>
          {showActionButtons && (
            <ActionButtons
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.3, staggerChildren: 0.1 }}
            >
              {optimizedResumeUrl ? (
                <DownloadResumeButton
                  onClick={downloadOptimizedResume}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiDownload />
                  Download Optimized Resume
                </DownloadResumeButton>
              ) : (
                <OptimizeButton
                  onClick={optimizeResume}
                  disabled={isOptimizing}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isOptimizing ? (
                    <>
                      <Spinner />
                      Optimizing...
                    </>
                  ) : (
                    <>
                      <FiZap />
                      Optimize Resume
                    </>
                  )}
                </OptimizeButton>
              )}

              {GeneratedCoverLetter ? (
                <GenerateButton
                  onClick={downloadExistingCoverLetter}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiDownload />
                  Download Cover Letter
                </GenerateButton>
              ) : (
                <GenerateButton
                  onClick={generateCoverLetter}
                  disabled={isGenerating}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isGenerating ? (
                    <>
                      <Spinner />
                      Generating...
                    </>
                  ) : (
                    <>
                      <FiMail />
                      Generate Cover Letter
                    </>
                  )}
                </GenerateButton>
              )}
            </ActionButtons>
          )}
        </AnimatePresence>

        <FloatingActionButton
          onClick={() => setShowActionButtons(!showActionButtons)}
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiZap />
        </FloatingActionButton>
      </FloatingActionContainer>
      <SectionTitle variants={itemVariants}>Keyword Analysis</SectionTitle>
      <TabsContainer variants={itemVariants}>
        <Tab
          active={activeTab === "keywords"}
          onClick={() => setActiveTab("keywords")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Keywords
        </Tab>
        <Tab
          active={activeTab === "skills"}
          onClick={() => setActiveTab("skills")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Skills Breakdown
        </Tab>
      </TabsContainer>

      {activeTab === "keywords" && (
        <KeywordSection variants={staggerVariants}>
          <KeywordColumn variants={itemVariants}>
            <KeywordCard
              whileHover={{
                y: -3,
                boxShadow: "0 8px 20px -5px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <KeywordHeader>
                <SuccessIcon>
                  <FiCheck />
                </SuccessIcon>
                <KeywordTitle>Matched Keywords</KeywordTitle>
                <KeywordCount>{matched_keywords?.length || 0}</KeywordCount>
              </KeywordHeader>
              <KeywordList>
                {matched_keywords?.map((kw, i) => (
                  <KeywordItem
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: i * 0.05,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    {kw}
                  </KeywordItem>
                ))}
              </KeywordList>
            </KeywordCard>
          </KeywordColumn>

          <KeywordColumn variants={itemVariants}>
            <KeywordCard
              whileHover={{
                y: -3,
                boxShadow: "0 8px 20px -5px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <KeywordHeader>
                <WarningIcon>
                  <FiAlertTriangle />
                </WarningIcon>
                <KeywordTitle>Missing Keywords</KeywordTitle>
                <KeywordCount>{missing_keywords?.length || 0}</KeywordCount>
              </KeywordHeader>
              <KeywordList>
                {missing_keywords?.map((kw, i) => (
                  <KeywordItem
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: i * 0.05,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    {kw}
                  </KeywordItem>
                ))}
              </KeywordList>
            </KeywordCard>
          </KeywordColumn>
        </KeywordSection>
      )}

      {activeTab === "skills" && (
        <SkillsSection variants={staggerVariants}>
          {skillCategories.map((category, index) => (
            <SkillCategoryCard
              key={category}
              variants={itemVariants}
              custom={index}
              whileHover={{
                y: -3,
                boxShadow: "0 8px 20px -5px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <SkillCategoryHeader>
                <SkillCategoryTitle>{category}</SkillCategoryTitle>
                <SkillCount>{skills[category]?.length || 0} skills</SkillCount>
              </SkillCategoryHeader>
              <SkillList>
                {skills[category]?.map((skill, i) => (
                  <SkillItem
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: i * 0.03,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    {skill}
                  </SkillItem>
                ))}
              </SkillList>
            </SkillCategoryCard>
          ))}
        </SkillsSection>
      )}

      <SectionTitle variants={itemVariants}>
        Optimization Recommendations
      </SectionTitle>
      <RecommendationSection variants={itemVariants}>
        <RecommendationCard
          whileHover={{
            y: -3,
            boxShadow: "0 8px 25px -5px rgba(0, 0, 0, 0.1)",
          }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <RecommendationHeader>
            <RecommendationIcon>
              <FaRegLightbulb />
            </RecommendationIcon>
            <div>
              <RecommendationTitle>
                How to Improve Your Resume
              </RecommendationTitle>
              <RecommendationSubtitle>
                Actionable suggestions to increase your ATS score
              </RecommendationSubtitle>
            </div>
          </RecommendationHeader>
          <RecommendationList>
            {recommendations?.map((rec, idx) => (
              <RecommendationItem
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: idx * 0.1,
                  type: "spring",
                  stiffness: 150,
                }}
              >
                <BulletPoint />
                <RecommendationText>{rec}</RecommendationText>
              </RecommendationItem>
            ))}
          </RecommendationList>
        </RecommendationCard>
      </RecommendationSection>

      {(coverLetter || GeneratedCoverLetter) && (
        <>
          <SectionTitle variants={itemVariants}>Cover Letter</SectionTitle>
          <CoverLetterPreview variants={itemVariants}>
            <CoverLetterCard
              whileHover={{
                y: -3,
                boxShadow: "0 8px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <CoverLetterHeader>
                <CoverLetterIcon>
                  <FiMail />
                </CoverLetterIcon>
                <div>
                  <CoverLetterTitle>Generated Cover Letter</CoverLetterTitle>
                  <CoverLetterSubtitle>
                    Tailored to the job description
                  </CoverLetterSubtitle>
                </div>
              </CoverLetterHeader>
              <CoverLetterContent>
                {(coverLetter || GeneratedCoverLetter)
                  .split("\n")
                  .map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
              </CoverLetterContent>
              <CoverLetterActions>
                <DownloadButton
                  onClick={() =>
                    downloadCoverLetter(coverLetter || GeneratedCoverLetter)
                  }
                  fullWidth
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <FiDownload />
                  Download Cover Letter
                </DownloadButton>
              </CoverLetterActions>
            </CoverLetterCard>
          </CoverLetterPreview>
        </>
      )}
    </Container>
  );
};

// Styled Components
const Container = styled(motion.div)`
  padding: 2rem 1rem;
  max-width: 1440px;
  margin: 0 auto;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  min-height: 100vh;
  position: relative;
  background: #f9fafb;

  @media (min-width: 768px) {
    padding: 3rem 2rem;
  }
`;

const HeaderContainer = styled.header`
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;
  text-align: center; /* Center the text */
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content horizontally */
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #111827;
  font-weight: 800;
  letter-spacing: -0.025em;
  margin-top: 4rem;
  margin-bottom: 0.9rem;
  line-height: 1.2;
  background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #6b7280;
  margin-bottom: 2rem;
  max-width: 700px;
  line-height: 1.5;

  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
`;
const SummaryContainer = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 32px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

const SummaryText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #4b5563;
  margin: 0;
`;
const ScoreSummary = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: flex-end;
  }
`;
// Styled Components for the floating action button
const FloatingActionContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
  z-index: 50;
`;

const FloatingActionButton = styled(motion.button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #3b82f6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10;
  font-size: 1.5rem;

  &:hover {
    background: #2563eb;
    box-shadow: 0 6px 16px rgba(59, 130, 246, 0.3);
  }
`;

const ActionButtons = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: white;
  padding: 1rem;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  z-index: 9;
`;

const ScoreCircle = styled(motion.div)`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: ${({ color }) => color}20;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
  overflow: visible;

  > * {
    z-index: 2;
  }

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    background: ${({ color }) => `
      conic-gradient(
        from 0deg,
        ${color},
        ${color}cc,
        ${color}99,
        ${color}66,
        ${color}
      )
    `};
    animation: flameSpin 3s linear infinite;
    -webkit-mask: radial-gradient(
      farthest-side,
      transparent calc(100% - 15px),
      black 100%
    );
    mask: radial-gradient(
      farthest-side,
      transparent calc(100% - 15px),
      black 100%
    );
    z-index: 1;
  }

  @keyframes flameSpin {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;

const ScoreValue = styled.div`
  font-size: 2.8rem;
  font-weight: 800;
  font-family: "Inter", -apple-system, sans-serif;
  color: ${({ color }) => color};
  line-height: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05),
    0 0 8px ${({ color }) => `${color}20`};
  position: relative;
  margin-bottom: 4px;

  &::after {
    content: attr(data-decimal);
    position: absolute;
    font-size: 1rem;
    top: 0.35em;
    right: -0.6em;
    opacity: 0.8;
    font-weight: 500;
  }
`;

const ScoreLabel = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
  font-family: "Inter", -apple-system, sans-serif;
  color: #6b7280;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-top: 8px;
  position: relative;
  padding-top: 8px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 24px;
    height: 1px;
    background: rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  &:hover::before {
    width: 32px;
    background: ${({ color }) => color};
  }
`;

const VerdictContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 10px;

  @media (min-width: 768px) {
    align-items: flex-start;
    text-align: left;
    padding-left: 1rem;
    margin-top: 0;
    transform: translateY(-40px);
  }
`;

const Verdict = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ color }) => color};
  margin-bottom: 0.5rem;
  line-height: 1.2;
  transition: color 0.6s ease;

  @media (min-width: 768px) {
    font-size: 1.75rem;
  }
`;

const VerdictDescription = styled.p`
  font-size: 1rem;
  color: #6b7280;
  line-height: 1.5;
  margin: 0;
`;

// Summary Section Styles
const SummaryGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const SummaryCard = styled(motion.div)`
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.03);
  border: 1px solid #f3f4f6;
  transition: all 0.3s ease;
`;

const SummaryCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const SummaryIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ color }) => `${color}10`};
  color: ${({ color }) => color};
  font-size: 1.25rem;
`;

const SummaryTitle = styled.h3`
  font-size: 1rem;
  color: #111827;
  font-weight: 600;
  margin: 0;
`;

const SummaryValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ color }) => color};
  margin-bottom: 0.5rem;
`;

const SummaryDescription = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
`;

const FloatingActionButtons = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 50;

  @media (max-width: 768px) {
    bottom: 1rem;
    right: 1rem;
  }
`;

const Button = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  font-size: 0.9375rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  line-height: 1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10;
  min-width: 220px;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.8;
  }

  svg {
    font-size: 1.25rem;
  }
`;

const GenerateButton = styled(Button)`
  background: #3b82f6;
  color: white;

  &:hover:not(:disabled) {
    background: #2563eb;
    box-shadow: 0 6px 16px rgba(59, 130, 246, 0.3);
  }

  &:disabled {
    background: #93c5fd;
  }
`;

const OptimizeButton = styled(Button)`
  background: #8b5cf6;
  color: white;

  &:hover:not(:disabled) {
    background: #7c3aed;
    box-shadow: 0 6px 16px rgba(139, 92, 246, 0.3);
  }

  &:disabled {
    background: #a78bfa;
  }
`;

const DownloadButton = styled(Button)`
  background: ${({ fullWidth }) => (fullWidth ? "#10B981" : "transparent")};
  color: ${({ fullWidth }) => (fullWidth ? "white" : "#10B981")};
  border: ${({ fullWidth }) => (fullWidth ? "none" : "1px solid #10B981")};
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  justify-content: ${({ fullWidth }) => (fullWidth ? "center" : "flex-start")};

  &:hover:not(:disabled) {
    background: ${({ fullWidth }) => (fullWidth ? "#059669" : "#ECFDF5")};
    box-shadow: ${({ fullWidth }) =>
      fullWidth ? "0 4px 6px rgba(16, 185, 129, 0.2)" : "none"};
  }

  &:disabled {
    background: #d1fae5;
  }
`;

const Spinner = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
const DownloadResumeButton = styled(Button)`
  background: #10b981;
  color: white;

  &:hover:not(:disabled) {
    background: #059669;
    box-shadow: 0 6px 16px rgba(16, 185, 129, 0.3);
  }

  &:disabled {
    background: #d1fae5;
  }
`;
// Enhanced Loading Components
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

const LetterEnvelope = styled.div`
  position: relative;
  width: 100px;
  height: 80px;
  background: #eff6ff;
  border-radius: 8px;
  margin: 0 auto;
  border: 2px solid #bfdbfe;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LetterPaper = styled(motion.div)`
  width: 80px;
  height: 60px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;

  &::before {
    content: "";
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    height: 8px;
    background: #eff6ff;
    border-radius: 4px;
  }

  &::after {
    content: "";
    position: absolute;
    top: 25px;
    left: 10px;
    right: 10px;
    height: 4px;
    background: #eff6ff;
    border-radius: 2px;
  }
`;

const LoadingTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
`;

const LoadingText = styled.h3`
  font-size: 1.5rem;
  color: #111827;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
`;

const LoadingDots = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const LoadingDot = styled(motion.div)`
  width: 8px;
  height: 8px;
  background: #3b82f6;
  border-radius: 50%;
`;

const LoadingProgress = styled.div`
  font-size: 1.25rem;
  color: #3b82f6;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const LoadingBar = styled.div`
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 1rem;
  position: relative;
`;

const LoadingProgressBar = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  border-radius: 4px;
`;

const LoadingPulse = styled(motion.div)`
  position: absolute;
  top: 0;
  width: 20px;
  height: 100%;
  background: white;
  transform: translateX(-50%);
  opacity: 0;
`;

const LoadingHint = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 1.5rem;
`;

const DashboardGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const ChartContainer = styled(motion.div)``;

const ChartCard = styled(motion.div)`
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.03);
  border: 1px solid #f3f4f6;
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
`;

const ChartHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const ChartTitle = styled.h3`
  font-size: 1.125rem;
  color: #111827;
  font-weight: 700;
  margin-bottom: 0.25rem;
`;

const ChartSubtitle = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
`;

const ChartWrapper = styled.div`
  height: 240px;
  position: relative;
`;

const ScoreBadgeContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ScoreBadgeCircle = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 4px solid ${({ color }) => color}40;
  transition: border-color 0.6s ease;

  span {
    font-size: 1.5rem;
    font-weight: 700;
    color: ${({ color }) => color};
    transition: color 0.6s ease;
  }
`;

const ChartFooter = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
`;

const ScoreAnalysis = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  max-width: 300px;
`;

const ScoreAnalysisItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #6b7280;
`;

const ScoreDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ color }) => color};
`;

const SectionTitle = styled(motion.h2)`
  font-size: 1.5rem;
  color: #111827;
  font-weight: 700;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.5rem;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background: #3b82f6;
    border-radius: 3px;
  }
`;

const TabsContainer = styled(motion.div)`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.5rem;
`;

const Tab = styled(motion.button)`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ active }) => (active ? "#3B82F6" : "#6b7280")};
  background: ${({ active }) => (active ? "#EFF6FF" : "transparent")};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: -6px;
    left: 0;
    width: ${({ active }) => (active ? "100%" : "0")};
    height: 2px;
    background: #3b82f6;
    transition: width 0.3s ease;
  }
`;

const KeywordSection = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const KeywordColumn = styled(motion.div)``;

const KeywordCard = styled(motion.div)`
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.03);
  border: 1px solid #f3f4f6;
  height: 100%;
`;

const KeywordHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

const KeywordTitle = styled.h4`
  font-size: 1.125rem;
  color: #111827;
  font-weight: 600;
`;

const KeywordCount = styled.span`
  margin-left: auto;
  font-size: 0.875rem;
  color: #6b7280;
  background: #f3f4f6;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
`;

const KeywordList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const KeywordItem = styled(motion.span)`
  background: #f3f4f6;
  color: #374151;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
`;

const SkillsSection = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const SkillCategoryCard = styled(motion.div)`
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.03);
  border: 1px solid #f3f4f6;
`;

const SkillCategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #f3f4f6;
`;

const SkillCategoryTitle = styled.h5`
  font-size: 1rem;
  color: #111827;
  font-weight: 600;
`;

const SkillCount = styled.span`
  font-size: 0.75rem;
  color: #6b7280;
  background: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
`;

const SkillList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SkillItem = styled(motion.span)`
  background: #eff6ff;
  color: #1e40af;
  padding: 0.375rem 0.75rem;
  border-radius: 6px;
  font-size: 0.8125rem;
  font-weight: 500;
`;

const IconBase = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const SuccessIcon = styled(IconBase)`
  background: #ecfdf5;
  color: #10b981;
`;

const WarningIcon = styled(IconBase)`
  background: #fef2f2;
  color: #ef4444;
`;

const RecommendationSection = styled(motion.div)`
  margin-bottom: 3rem;
`;

const RecommendationCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.03);
  border: 1px solid #f3f4f6;
`;

const RecommendationHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const RecommendationIcon = styled(IconBase)`
  background: #f5f3ff;
  color: #8b5cf6;
  font-size: 1.25rem;
`;

const RecommendationTitle = styled.h4`
  font-size: 1.25rem;
  color: #111827;
  font-weight: 700;
  margin-bottom: 0.25rem;
`;

const RecommendationSubtitle = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
`;

const RecommendationList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const RecommendationItem = styled(motion.li)`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const BulletPoint = styled.div`
  flex-shrink: 0;
  width: 8px;
  height: 8px;
  background: #8b5cf6;
  border-radius: 50%;
  margin-top: 0.5rem;
`;

const RecommendationText = styled.div`
  color: #374151;
  font-size: 1rem;
  line-height: 1.6;
`;

const CoverLetterPreview = styled(motion.div)`
  margin-bottom: 3rem;
`;

const CoverLetterCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.03);
  border: 1px solid #f3f4f6;
`;

const CoverLetterHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const CoverLetterIcon = styled(IconBase)`
  background: #e0f2fe;
  color: #0ea5e9;
`;

const CoverLetterTitle = styled.h4`
  font-size: 1.25rem;
  color: #111827;
  font-weight: 700;
  margin-bottom: 0.25rem;
`;

const CoverLetterSubtitle = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
`;

const CoverLetterContent = styled.div`
  white-space: pre-wrap;
  line-height: 1.7;
  color: #374151;
  margin-bottom: 1.5rem;
  font-size: 0.9375rem;
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;

  p {
    margin-bottom: 1rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const CoverLetterActions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Notification = styled(motion.div)`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  background: ${({ type }) => (type === "success" ? "#ECFDF5" : "#FEF2F2")};
  color: ${({ type }) => (type === "success" ? "#065F46" : "#B91C1C")};
  display: flex;
  align-items: center;
  gap: 1rem;
  z-index: 1000;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  max-width: 400px;
  border: 1px solid
    ${({ type }) => (type === "success" ? "#A7F3D0" : "#FECACA")};
`;

const NotificationIcon = styled.div`
  font-size: 1.25rem;
  flex-shrink: 0;
`;

const NotificationText = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0;
  margin-left: 0.5rem;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const NoData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 200px);
  text-align: center;
  padding: 2rem;
`;

const EmptyStateIcon = styled.div`
  width: 80px;
  height: 80px;
  background: #f3f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: #9ca3af;
  font-size: 2rem;
`;

const EmptyStateTitle = styled.h3`
  font-size: 1.5rem;
  color: #111827;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const EmptyStateText = styled.p`
  font-size: 1rem;
  color: #6b7280;
  max-width: 400px;
  line-height: 1.5;
`;

export default Results;
