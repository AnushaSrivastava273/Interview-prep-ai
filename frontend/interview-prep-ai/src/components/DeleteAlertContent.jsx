import React from 'react';

const DeleteAlertContent = ({ content, onDelete }) => {
  return (
    <div className="p-5">
      <p className="text-[14px] text-gray-800 leading-relaxed mb-6">
        {content}
      </p>

      {/* Delete button now directly below the question */}
      <button
        type="button"
        className="btn-small"
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default DeleteAlertContent;
