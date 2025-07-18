import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from "../../components/Inputs/Input";
import SpinnerLoader from '../../components/Loader/SpinnerLoader';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';

const CreateSessionForm = () => {
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (key, value) => {
    if (key === "experience") {
      const num = Number(value);
      if (num < 0) value = 0;
    }
  
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };
  

  const handleCreateSession = async (e) => {
    e.preventDefault();

    const { role, experience, topicsToFocus } = formData;
    if (!role || !experience || !topicsToFocus) {
      setError("Please fill all the required fields.");
      return;
    }
    
    const topicsArray = topicsToFocus
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    setError("");
    setIsLoading(true);

    try {
      // Debug: Log the payload being sent
      const aiPayload = {
        role: role.trim(),
        experience: Number(experience),
        topics: topicsArray,
        numberOfQuestions: 10,
      };
      
      console.log("Sending AI payload:", aiPayload);

      // Alternative: Match backend field names
      const backendPayload = {
        role: role.trim(),
        experience: Number(experience),
        topicsToFocus: topicsArray, // Backend expects 'topicsToFocus'
        numberOfquestions: 10, // Backend expects lowercase 'q'
      };
      
      console.log("Sending AI payload:", backendPayload);

      // Call AI API to generate questions
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        backendPayload
      );
      
      console.log("AI Response:", aiResponse.data);
      
      // Validate AI response
      if (!aiResponse.data || !Array.isArray(aiResponse.data)) {
        throw new Error("Invalid response from AI service");
      }
      
      const generatedQuestions = aiResponse.data;

      // Create session with generated questions
      const sessionPayload = {
        ...formData,
        experience: Number(experience), // Ensure experience is a number
        topicsToFocus: topicsToFocus, // Keep original string format for session
        questions: generatedQuestions,
      };
      
      console.log("Sending session payload:", sessionPayload);

      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, sessionPayload);

      if (response.data?.session?._id) {
        navigate(`/interview-prep/${response.data.session._id}`);
      }
    } catch (error) {
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: error.config
      });
      
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.message) {
        setError(error.message);
      } else {
        setError("Hmm... looks like the system blinked 😅. Try again — it usually works in a click or two.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full max-w-[700px] mx-auto bg-white rounded-2xl shadow-md p-7 flex flex-col justify-center overflow-x-hidden'>
      <h3 className='text-lg font-bold text-black'>
        Start a New Interview Journey
      </h3>

      <p className='text-s text-slate-700 mt-[5px] mb-3'>
        Fill out a few quick details and unlock your personalized set of interview questions!
      </p>

      <form onSubmit={handleCreateSession} className='flex flex-col gap-1'>
        <Input
          value={formData.role}
          onChange={({ target }) => handleChange("role", target.value)}
          label="Target Role"
          placeholder="e.g., Frontend Developer, UI/UX Designer"
          type="text"
          required
        />

<Input
  value={formData.experience}
  onChange={({ target }) => handleChange("experience", target.value)}
  onInput={(e) => {
    if (e.target.value < 0) e.target.value = 0;
  }}
  label="Years of Experience"
  placeholder="e.g., 1, 3, 5"
  type="number"
  min="0"
  max="50"
  required
/>


        <Input
          value={formData.topicsToFocus}
          onChange={({ target }) => handleChange("topicsToFocus", target.value)}
          label="Topics to Focus On"
          placeholder="Comma-separated, e.g., React, Node.js, MongoDB"
          type="text"
          required
        />

        <Input
          value={formData.description}
          onChange={({ target }) => handleChange("description", target.value)}
          label="Description (Optional)"
          placeholder="Any specific goals or notes for this session"
          type="text"
        />

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button
          type="submit"
          className='btn-primary w-full mt-1 mb-0 flex justify-center items-center gap-2'
          disabled={isLoading}
        >
          {isLoading && <SpinnerLoader />} Create Session
        </button>
      </form>
    </div>
  );
};

export default CreateSessionForm;