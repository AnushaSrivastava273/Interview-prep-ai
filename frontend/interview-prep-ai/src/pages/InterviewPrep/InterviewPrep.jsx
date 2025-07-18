import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import { toast } from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import RoleInfoHeader from './components/RoleInfoHeader';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import QuestionCard from '../../components/Cards/QuestionCard';
import AIResponsePreview from './components/AIResponsePreview';
import SkeletonLoader from '../../components/Loader/SkeletonLoader';
import Drawer from "../../components/Loader/Drawer";

const InterviewPrep = () => {
  const { sessionId } = useParams();
  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  // Fetch session data by session id
  const fetchSessionDetailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(sessionId)
      );
      if (response.data && response.data.session) {
        setSessionData(response.data.session);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Generate concept explanation
  const generateConceptExplanation = async (question) => {
    try {
      setErrorMsg("");
      setExplanation(null);
      setIsLoading(true);
      setOpenLearnMoreDrawer(true);

      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATION,
        { question }
      );
      if (response.data) {
        setExplanation(response.data);
      } else {
        setErrorMsg("System blinked 😅 Happens sometimes — try clicking again once or twice, it usually works!");
      }
    } catch (error) {
      setErrorMsg("System blinked 😅 Happens sometimes — try clicking again once or twice, it usually works!");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle question pin status
  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.PIN(questionId)
      );
      if (response.data && response.data.question) {
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  // Add more questions to a session
const uploadMoreQuestions = async () => {
  try {
    setIsUpdateLoader(true);
    setErrorMsg(""); // Clear any previous errors
    
    console.log("Starting to generate questions...");
    
    // Generate questions from AI
    const aiResponse = await axiosInstance.post(
      API_PATHS.AI.GENERATE_QUESTIONS,
      {
        role: sessionData?.role,
        experience: sessionData?.experience,
        topicsToFocus: sessionData?.topicsToFocus,
        numberOfquestions: 3,
      }
    );
    
    console.log("AI Response:", aiResponse.data);
    const generatedQuestions = aiResponse.data;

    // Validate that we got questions
    if (!generatedQuestions || !Array.isArray(generatedQuestions) || generatedQuestions.length === 0) {
      setErrorMsg("No questions were generated. Please try again.");
      return;
    }

    console.log("Adding questions to session...");
    
    // Add questions to session
    const addQuestionsResponse = await axiosInstance.post(
      API_PATHS.QUESTION.ADD_TO_SESSION,
      {
        sessionId,
        questions: generatedQuestions, // Changed from 'question' to 'questions'
      }
    );
    
    console.log("Add Questions Response:", addQuestionsResponse.data);
    
    // Check if questions were added successfully
    if (addQuestionsResponse.data.success) {
      const questionsCount = addQuestionsResponse.data.createdQuestions?.length || 0;
      toast.success(`Added ${questionsCount} More Q&A!`);
      console.log("Refreshing session data...");
      // Refresh session data to show new questions
      await fetchSessionDetailsById();
    } else {
      setErrorMsg("Failed to add questions to session.");
    }
  } catch (error) {
    console.error("Error adding questions:", error);
    
    // More detailed error handling
    if (error.response) {
      console.error("Error response:", error.response.data);
      console.error("Full error details:", error.response);
      console.error("Error message:", error.response.data.message);
      const errorMessage = error.response.data?.message || error.response.data?.error || "Server error occurred";
      setErrorMsg(errorMessage);
    } else if (error.request) {
      console.error("Network error:", error.request);
      setErrorMsg("Network error. Please check your connection.");
    } else {
      console.error("Error:", error.message);
      setErrorMsg("Something went wrong. Please try again.");
    }
  } finally {
    setIsUpdateLoader(false);
  }
};

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }
    return () => {}
  }, []);

  return (
  <DashboardLayout>
  <div className="pl-6 sm:pl-10 md:pl-16 lg:px-0">
    <RoleInfoHeader
      role={sessionData?.role || ""}
      topicsToFocus={sessionData?.topicsToFocus || ""}
      experience={sessionData?.experience || "-"}
      questions={sessionData?.questions?.length || "-"}
      description={sessionData?.description || ""}
      lastUpdated={
        sessionData?.updatedAt
          ? moment(sessionData.updatedAt).format("Do MMM YYYY")
          : ""
      }
    />
  </div>

<div className="max-w-6xl mx-auto pt-4 pb-4 pl-0 sm:pl-0 md:pl-0 lg:pl-[55px] -ml-[4px]">

      <h2 className='text-lg font-semibold color-black'>Interview Q&A</h2>

      <div className='grid grid-cols-12 gap-4 mt-5 mb-10'>
        <div
          className={`col-span-12 ${
            openLearnMoreDrawer ? "md:col-span-7" : "md:col-span-8"
          }`}
        >
          <AnimatePresence>
            {sessionData?.questions?.map((data, index) => (
              <motion.div
                key={data._id || index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.4,
                  type: "spring",
                  stiffness: 100,
                  delay: index * 0.1,
                  damping: 15,
                }}
                layout
                layoutId={`question-${data._id || index}`}
              >
                <>
                <QuestionCard
                  question={data?.question}
                  answer={data?.answer}
                  onLearnMore={() =>
                    generateConceptExplanation(data.question)
                  }
                  isPinned={data?.isPinned}
                  onToggle={() => toggleQuestionPinStatus(data._id)}
                />

                {!isLoading &&
                  sessionData?.questions?.length === index + 1 && (
                    <div className='flex items-center justify-center mt-5'>
                      <button
                        className='flex items-center gap-3 text-sm text-white font-medium bg-black px-5 py-2 mr-2 rounded text-nowrap cursor-pointer'
                        disabled={isLoading || isUpdateLoader}
                        onClick={uploadMoreQuestions}
                      >
                        {isUpdateLoader ? (
                          <SpinnerLoader />
                        ) : (
                          <LuListCollapse className='text-lg' />
                        )}{" "}
                        Load More
                      </button>
                    </div>
                  )}
                  </>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div>
        <Drawer
          isOpen={openLearnMoreDrawer}
          onClose={() => setOpenLearnMoreDrawer(false)}
          title={!isLoading && explanation?.title}
        >
          {errorMsg && (
            <p className='flex gap-2 text-sm text-amber-600 font-medium'>
              <LuCircleAlert className='mt-1' />
              {errorMsg}
            </p>
          )}
          {isLoading && <SkeletonLoader />}
          {!isLoading && explanation && (
            <AIResponsePreview content={explanation?.explanation} />
          )}
        </Drawer>
      </div>
    </div>
  </DashboardLayout>
);
};

export default InterviewPrep;
