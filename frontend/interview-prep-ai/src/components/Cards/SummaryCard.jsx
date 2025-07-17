import React from 'react';
import { getInitials } from '../../utils/helper'; // adjust the path if needed


const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      className='bg-white border border-gray-300/40 rounded-xl overflow-hidden group cursor-pointer'
      onClick={onSelect}
    >
      <div
        className='rounded p-5 relative'
          style={{
    background: colors?.background || '#fff5e1', // fallback to champagne if no color passed
  }}

      >
        <div className='flex items-start capitalize'>
          <div className='flex-shrink-0 w-16 h-16 bg-white rounded-md flex items-center justify-center mr-40'>
            <span className='text-lg font-semibold text-black '>
             {getInitials(role) || 'GU'}
             </span>
          </div>

          {/* Content Container */}
          <div className='flex-grow'>
            <div className='flex justify-between items-start'>
              <div>
                <h2 className='text-[20px] font-medium'>{role}</h2>
                <p className='text-[17px] text-medium text-gray-900'>
                  {topicsToFocus}
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          className='hidden group-hover:flex items-center gap-2 text-xs text-rose-500 font-medium bg-rose-50 px-3 py-1 rounded text-nowrap border border-rose-100 hover:border-rose-200 cursor-pointer absolute top-0 right-0'
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          delete
        </button>
      </div>

      <div className='px-3 pb-3'>
        <div className='flex items-center gap-3 mt-4'>
          <div className='text-[12px] font-medium text-black px-3 py-1 border-[0.25px] border-gray-900 rounded-full'>
            Experience: {experience} {experience == 1 ? 'Year' : 'Years'}
          </div>
          <div className='text-[12px] font-medium text-black px-3 py-1 border-[0.25px] border-gray-900 rounded-full'>
            {questions} Q&A
          </div>
          <div className='text-[12px] font-medium text-black px-3 py-1 border-[0.25px] border-gray-900 rounded-full'>
            Last Updated: {lastUpdated}
          </div>
        </div>

        {/* Description */}
        <p className='text-[14px] text-gray-500 font-medium line-clamp-2 mt-4'>
          {description}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
