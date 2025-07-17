import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';


const getInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate('/');
  };

 return (
  user && (
    <div className="flex items-center mr-6"> 
      {user.profileImageUrl ? (
  <img
    src={user.profileImageUrl}
    alt="profile"
    className="w-11 h-11 bg-gray-300 rounded-full mr-3 object-cover"
  />
) : (
  <div className="w-11 h-11 bg-gray-200 rounded-full mr-3 flex items-center justify-center text-gray-700 font-semibold text-sm">
    {getInitials(user.name)}
  </div>
)}
      <div>
        <div className="text-[15px] text-black font-bold leading-3">
          {user.name || ''}
        </div>
        <button
          className="text-amber-600 text-sm font-semibold cursor-pointer hover:underline"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  )
);
};

export default ProfileInfoCard;
