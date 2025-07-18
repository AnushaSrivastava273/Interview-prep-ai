import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LuSparkles } from "react-icons/lu";
import HERO_IMG from "../assets/hero-img.png";
import ProfileInfoCard from '../components/Cards/ProfileInfoCard'; // Add this line if you're using this component
import Modal from "../components/Modal";
import { UserContext } from '../context/userContext';
import { APP_FEATURES } from "../utils/data";
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';

const Landingpage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      <div className="w-full min-h-screen bg-[#FFFCEF] relative overflow-hidden">
        {/* Decorative Blur Background */}
        <div className="w-[500px] h-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left-0 z-0" />

        {/* Main Container */}
        <div className="container mx-auto px-4 md:px-12 lg:px-20 pt-6 pb-0 relative z-10">
         <header className="flex justify-between items-center mb-16">
         <div className="text-[26px] font-bold text-transparent bg-clip-text bg-[radial-gradient(circle,#FF9324_0%,#FCD760_100%)] bg-[length:200%_200%] animate-text-shine">
  Interview Prep AI
</div>
          {/* Header */}
          {user ? (
            <ProfileInfoCard />
          ) : (
              <button
                className="bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white border transition-colors cursor-pointer"
                onClick={() => setOpenAuthModal(true)}
              >
                Login/Sign Up
              </button>
          )}
           </header>
          {/* Hero Section */}
          <div className="flex flex-col md:flex-row items-center">
            {/* Left Side - Text Content */}
            <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
              {/* AI Badge */}
              <div className="flex items-center justify-start mb-4">
                <div className="flex items-center gap-2 text-[13px] text-amber-700 font-semibold bg-amber-100 px-4 py-1 rounded-full border border-amber-300 shadow-sm">
                  <LuSparkles className="text-[16px]" /> AI Powered
                </div>
              </div>

              {/* Heading */}
              <h1 className="text-4xl md:text-5xl text-black font-semibold mb-6 leading-tight">
                Ace Interviews with <br />
                <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,#FF9324_0%,#FCD760_100%)] bg-[length:200%_200%] animate-text-shine">
                  AI-Powered
                </span>{" "}
                Learning
              </h1>

              {/* CTA for smaller screens */}
              <div className="md:hidden mt-6">
                <button
                  className="bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 cursor-pointer"
                  onClick={handleCTA}
                >
                  Get Started
                </button>
              </div>
            </div>

            {/* Right Side - Description and Button */}
            <div className="w-full md:w-1/2">
              <p className="text-[17px] text-gray-900 md:mr-20 mb-6">
                Get role-specific questions, expand answers when you need them,
                dive deeper into concepts, and organize everything your way.
                From preparation to mastery – your ultimate interview toolkit is here.
              </p>

              {/* CTA for medium and larger screens */}
              <div className="hidden md:block">
                <button
                  className="bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 cursor-pointer"
                  onClick={handleCTA}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        {/* Hero Image - moved inside main container, below hero section */}
        <div className="flex items-center justify-center w-full mt-8 md:mt-20 mb-0">
          <img
            src={HERO_IMG}
            alt="Hero"
            className="w-full md:w-[80vw] h-auto rounded-e-lg block mb-0 max-w-[600px] md:max-w-[1000px]"
            style={{ marginBottom: 0, display: 'block' }}
          />
        </div>
      </div>

        {/* Features Section */}
        <div className="w-full min-h-full bg-[#FFFCEF] mt-10">
          <div className="container mx-auto px-4 pt-10 pb-20">
            <section className="mt-5">
              <h2 className="text-2xl font-medium text-center mb-12">
                Features That Make You Shine
              </h2>

              <div className="flex flex-col items-center gap-0">
                {/* First 3 cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                  {APP_FEATURES.slice(0, 3).map((feature) => (
                    <div
                      key={feature.id}
                      className="bg-[#FFFEF8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber"
                    >
                      <h3 className="text-base font-semibold mb-3">
                        {feature.title}
                      </h3>
                      <p>{feature.description}</p>
                    </div>
                  ))}
                </div>

                {/* Remaining 2 cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                  {APP_FEATURES.slice(3).map((feature) => (
                    <div
                      key={feature.id}
                      className="bg-[#FFFEF8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber"
                    >
                      <h3 className="text-base font-semibold mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="text-sm bg-gray-50 text-secondary text-center p-5 mt-5">
          Happy Coding
        </div>
      </div>

      {/* Modal Component */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && (
            <Login setCurrentPage={setCurrentPage} />
          )}
          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </>
  );
};

export default Landingpage;
