import React, { useState } from 'react';
import { FileText, Check, Layout, Settings, Monitor, AlertOctagon, Calendar, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import navigation hook

const ExamConfigPage = () => {
  const navigate = useNavigate(); // Initialize navigation hook
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState('');
  const [requirePassword, setRequirePassword] = useState(false);
  const [useExamSafeBrowser, setUseExamSafeBrowser] = useState(false); 
  const [showSaveMessage, setShowSaveMessage] = useState(false);
  const [currentStep, setCurrentStep] = useState(5); // Exam Restrictions step

  // Keep existing steps array
  const steps = [
    { name: 'Question Bank', icon: <FileText size={20} />, id: 0, path: '/exam/question-bank' },
    { name: 'Grading', icon: <Check size={20} />, id: 1, path: '/exam/grading' },
    { name: 'Layout', icon: <Layout size={20} />, id: 2, path: '/exam/layout' },
    { name: 'Question Behavior', icon: <Settings size={20} />, id: 3, path: '/exam/behavior' },
    { name: 'Review Options', icon: <Monitor size={20} />, id: 4, path: '/exam/review' },
    { name: 'Exam Restriction', icon: <AlertOctagon size={16} />, id: 5, path: '/exam/restrictions' },
    { name: 'Date and Time', icon: <Calendar size={16} />, id: 6, path: 'DateTime' }
  ];

  // Calculate progress percentage based on current step
  const progressPercentage = Math.min(100, (currentStep / (steps.length - 1)) * 100);
  const roundedPercentage = Math.round(progressPercentage);

  // Modified function to handle next button click
  const handleNextClick = () => {
    // First update the current step in the UI
    const nextStep = Math.min(steps.length - 1, currentStep + 1);
    setCurrentStep(nextStep);

    // Navigate directly to the ExamRestriction page
    navigate('/maker/DateTime');
  };

  const handleStepClick = (stepId) => {
    // Update the current step
    setCurrentStep(stepId);
    // Navigate to the corresponding page
    navigate(steps[stepId].path);
  };

  const handleSave = () => {
    setShowSaveMessage(true);
    // Hide the message after 3 seconds
    setTimeout(() => {
      setShowSaveMessage(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center">
          {/* <div className="text-2xl font-bold text-gray-700 flex items-center">
            <span className="text-green-500 mr-1">⬤</span>SMARTEX
          </div> */}
        </div>
        
        {/* Steps progress */}
        <div className="max-w-4xl mx-auto mt-8">
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
          
          {/* Steps */}
          <div className="flex justify-between mt-3">
            {steps.map((step) => {
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;
              return (
                <button 
                  key={step.id} 
                  onClick={() => setCurrentStep(step.id)}
                  className={`flex flex-col items-center group ${isActive ? 'cursor-default' : 'cursor-pointer'}`}
                  aria-current={isActive ? 'step' : undefined}
                >
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-200 ${
                      isActive 
                        ? 'bg-indigo-100 text-indigo-600 ring-2 ring-indigo-600' 
                        : isCompleted 
                          ? 'bg-indigo-100 text-indigo-600' 
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {step.icon}
                  </div>
                  <span 
                    className={`text-sm font-medium text-center transition-colors duration-200 ${
                      isActive 
                        ? 'text-indigo-600' 
                        : isCompleted 
                          ? 'text-indigo-600' 
                          : 'text-gray-500 group-hover:text-gray-700'
                    }`}
                  >
                    {step.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Save message notification */}
      {showSaveMessage && (
        <div className="fixed top-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md transition-opacity duration-300">
          password saved successfully!
        </div>
      )}

      {/* Main content */}
      <div className="max-w-4xl mx-auto space-y-4 mt-8">
        {/* Password section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="required-password" 
                name="password-option"
                checked={requirePassword}
                onChange={() => setRequirePassword(!requirePassword)}
                className="w-4 h-4 text-indigo-600"
              />
              <label htmlFor="required-password" className="ml-2 text-gray-700">Required Password</label>
            </div>
            
            <div className="flex-grow">
              <input 
                type="password" 
                placeholder="Write The Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded"
                disabled={!requirePassword}
              />
            </div>
            
            <button 
              onClick={handleSave}
              className="bg-green-400 text-white px-6 py-2 rounded-md hover:bg-green-500 transition"
            >
              Save
            </button>
          </div>
        </div>
        
        {/* Attempts section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-4">
            <label className="text-gray-700 w-36">Attempts Allowed</label>
            <div className="flex-grow">
              <input 
                type="number" 
                placeholder="Enter Number" 
                value={attempts}
                onChange={(e) => setAttempts(e.target.value)}
                className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded"
              />
            </div>
          </div>
        </div>
        
        {/* Exam Safe Browser section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="exam-safe-browser" 
                name="browser-option"
                checked={useExamSafeBrowser}
                onChange={() => setUseExamSafeBrowser(!useExamSafeBrowser)}
                className="w-4 h-4 text-indigo-600"
              />
              <label htmlFor="exam-safe-browser" className="ml-2 text-gray-700">Exam Safe Browser</label>
            </div>
          </div>
        </div>
      </div>

      {/* Next button */}
      <div className="max-w-4xl mx-auto flex justify-end mt-8">
        <button 
          onClick={handleNextClick}
           className="px-6 py-2 bg-blue-200 text-blue-800 rounded-full flex items-center hover:bg-blue-300 transition-colors"
        >
          Next 
          <ChevronRight className="ml-1" size={18} />
          
        </button>
      </div>
    </div>
  );
};

export default ExamConfigPage;