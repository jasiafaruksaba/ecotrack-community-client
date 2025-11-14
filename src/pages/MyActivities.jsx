// client/src/pages/MyActivities.jsx
import React from 'react';
import { FaRunning, FaCheckCircle, FaHourglassHalf } from 'react-icons/fa';
import useFetch from '../hooks/useFetch';
import { useAuth } from '../context/AuthContext';
import SkeletonLoader from '../components/SkeletonLoader';
import moment from 'moment';

const MyActivities = () => {
  const { user } = useAuth();
  
  // Fetch user's joined challenges from the protected API
  const { data: userActivities, loading } = useFetch(`/user-challenges/my-activities`, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Ongoing':
        return <FaRunning className="text-blue-500" />;
      case 'Finished':
        return <FaCheckCircle className="text-green-500" />;
      case 'Not Started':
      default:
        return <FaHourglassHalf className="text-yellow-500" />;
    }
  };

  if (loading) {
    return (
      <div className="p-4 md:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Activities</h1>
        <div className="space-y-6">
          <SkeletonLoader count={3} type="list" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 w-full">
      <h1 className="text-3xl font-extrabold text-green-700 mb-8">
        Welcome Back, {user?.displayName?.split(' ')[0] || 'Eco-User'}!
      </h1>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">My Joined Challenges</h2>
      
      {userActivities.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow text-center text-gray-500">
          <p>You haven't joined any challenges yet. Find one to start your impact!</p>
          <p className="mt-4"><a href="/challenges" className="text-green-600 font-semibold hover:underline">Explore Challenges</a></p>
        </div>
      ) : (
        <div className="space-y-6">
          {userActivities.map(activity => (
            <div 
              key={activity._id} 
              className="bg-white p-5 rounded-xl shadow-lg border-l-4 border-green-500 flex flex-col sm:flex-row justify-between items-start sm:items-center transition hover:shadow-xl"
            >
              
              <div className="mb-4 sm:mb-0 sm:flex-grow">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(activity.status)}
                  <span className={`font-bold ${activity.status === 'Finished' ? 'text-green-600' : 'text-gray-800'}`}>
                    {activity.challengeTitle || `Challenge ID: ${activity.challengeId}`}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Joined: {moment(activity.joinDate).format('MMM DD, YYYY')}
                </p>
              </div>

              {/* Progress Bar and Percentage (Responsive) */}
              <div className="w-full sm:w-64">
                <div className="flex justify-between mb-1 text-sm font-medium">
                  <span>Progress</span>
                  <span className="font-bold text-green-600">{activity.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-green-600 h-2.5 rounded-full" 
                    style={{ width: `${activity.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Action Button */}
              <button 
                // Link to detailed progress update page (optional: activity/:id)
                className="mt-4 sm:mt-0 sm:ml-6 px-4 py-2 bg-green-100 text-green-700 text-sm font-semibold rounded-lg hover:bg-green-200 transition shrink-0"
              >
                Update Progress
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyActivities;