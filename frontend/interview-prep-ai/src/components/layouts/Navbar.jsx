import React from 'react'
import ProfileInfoCard from "../Cards/ProfileInfoCard";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="h-16 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-2.5 px-6 sticky top-0 z-30">

        <div className="container mx-auto flex items-center justify-between gap-5">
        <Link to="/dashboard">
        <span className="text-[26px] font-bold text-gradient-shimmer">
  Interviewprepai
</span>
        </Link>
        
      <ProfileInfoCard/>
      </div>
    </div>
  )
}

export default Navbar
