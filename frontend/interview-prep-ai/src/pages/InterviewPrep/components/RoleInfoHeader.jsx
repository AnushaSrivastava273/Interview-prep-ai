import React from 'react';

const RoleInfoHeader = ({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
}) => {
  return (
    <div className="bg-white relative ">
      <div className="pl-6 sm:pl-10 md:pl-16 lg:pl-10">
        <div className="h-[200px] flex flex-col justify-center relative z-10">    
          <div className="flex items-start">
             <div className="flex grow">
              <div className="flex justify-between items-start"> 
            <div>
              <h2 className="text-3xl font-medium capitalize">{role}</h2>
              <p className="text-14 font-semibold text-medium text-gray-900 mt-1 capitalize">{topicsToFocus}</p>
               </div>
            </div>
         </div>
     </div>

          <div className="flex items-center flex-wrap gap-3 mt-4">
            <span className="text-[12px] font-semibold text-white bg-black px-3 py-1 rounded-full">
              Experience: {experience} {experience == 1 ? 'Year' : 'Years'}
            </span>
            <span className="text-[12px] font-semibold text-white bg-black px-3 py-1 rounded-full">
              {questions} Q&A
            </span>
            <span className="text-[12px] font-semibold text-white bg-black px-3 py-1 rounded-full">
              Last Updated: {lastUpdated}
            </span>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl bg-[#FFFCF5]">

  {/* Top Right Blob (Must Have) */}
  <div className="absolute top-[-120px] right-[-120px] w-[400px] h-[400px] bg-[#FFF5D1] opacity-50 rounded-full blur-[140px] animate-blob1" />

  {/* Bottom Right Blob (Must Have) */}
  <div className="absolute bottom-[-120px] right-[-100px] w-[400px] h-[400px] bg-[#FFD8B0] opacity-50 rounded-full blur-[140px] animate-blob2" />

  {/* Extra Top Left Blob (for balance) */}
  <div className="absolute top-[-80px] left-[-100px] w-[300px] h-[300px] bg-[#FFE5A8] opacity-40 rounded-full blur-[120px] animate-blob3" />

  {/* Optional Middle Left Blob */}
  <div className="absolute top-[50%] left-[-120px] w-[320px] h-[320px] bg-[#FFC670] opacity-30 rounded-full blur-[100px] animate-blob4" />

</div>

    </div>
  );
};

export default RoleInfoHeader;
