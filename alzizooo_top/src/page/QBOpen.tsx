import React, { useState } from 'react';
import { FileText, Check, Layout, Settings, Monitor, Bell, Search, User, Calendar, AlertOctagon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuestionBank = () => {
  // Get the navigate function from React Router
  const navigate = useNavigate();
  
  // State for current step
  const [currentStep, setCurrentStep] = useState(0);
  
  // Steps array with paths
  const steps = [
    { name: 'Question Bank', icon: <FileText size={20} />, id: 0, path: '/maker/QBOpen' },
    { name: 'Grading', icon: <Check size={20} />, id: 1, path: '/maker/grading' },
    { name: 'Layout', icon: <Layout size={20} />, id: 2, path: '/maker/layout' },
    { name: 'Question Behavior', icon: <Settings size={20} />, id: 3, path: '/maker/question-behavior' },
    { name: 'Review Options', icon: <Monitor size={20} />, id: 4, path: '/maker/review-options' },
    { name: 'Exam Restriction', icon: <AlertOctagon size={16} />, id: 5, path: '/maker/exam-restriction' },
    { name: 'Date and Time', icon: <Calendar size={16} />, id: 6, path: '/maker/date-time' }
  ];
   
  // Calculate progress percentage based on current step
  const progressPercentage = Math.min(100, (currentStep / (steps.length - 1)) * 100);
  const roundedPercentage = Math.round(progressPercentage);
  
  // Handler for Explore Questions button
  const handleExploreQuestions = () => {
    // Navigate to the questions page
    navigate('/maker/Courses');
  };
  
  // Handler for step navigation - only navigate to the path
  const handleStepNavigation = (stepId) => {
    setCurrentStep(stepId);
    navigate(steps[stepId].path);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Main content without fixed navbar */}
      <div className="flex-grow">
        {/* Moved Create Your Question Set to the top */}
        <div className="bg-white py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Create Your Question Set</h3>
            
            {/* Steps progress */}
            <div className="max-w-2xl mx-auto">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm font-medium text-gray-700">{roundedPercentage}%</span>
              </div>
              
              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              
              {/* Steps display with path navigation */}
              <div className="flex justify-between mt-8">
                {steps.map((step) => (
                  <div 
                    key={step.id} 
                    className={`flex flex-col items-center cursor-pointer ${currentStep >= step.id ? 'text-indigo-600' : 'text-gray-400'}`}
                    onClick={() => handleStepNavigation(step.id)}
                    role="button"
                    aria-label={`Go to ${step.name}`}
                  >
                    <div className={`p-3 rounded-full mb-2 ${currentStep >= step.id ? ' text-indigo-600' : 'bg-gray-100'}`}>
                      {step.icon}
                    </div>
                    <span className="text-xs font-medium hidden sm:block">{step.name}</span>
                  </div>
                ))}
              </div>
            </div>
        
            {/* Question Bank Hero Section - moved below the progress section */}
            <div className="bg-indigo-600 text-white py-12 px-4 text-center mt-8 rounded-lg">
              <div className="max-w-4xl mx-auto">          
                {/* Main title */}
                <h2 className="text-4xl font-bold mb-6">Question Bank</h2>
                
                {/* Quote */}
                <p className="text-xl mb-8 italic">"Knowledge is not just power—it's possibility."</p>
                
                {/* Button with onClick handler and navigation */}
                <button 
                  className="bg-white text-indigo-600 rounded-full px-6 py-3 font-medium shadow-lg hover:bg-gray-100 transition-colors"
                  onClick={handleExploreQuestions}
                >
                  Explore Questions
                </button>
              </div>
            </div>
            
            {/* Current Step Content Container - Empty since we're navigating to paths */}
            <div className="mt-12 p-6">
              {/* Content is handled by the routes the user navigates to */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionBank;