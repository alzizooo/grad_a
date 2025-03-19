import React, { useRef, useState } from 'react';
import { FileText, ChevronDown, Layout, Settings, MonitorIcon, Check, ChevronRight, AlertOctagonIcon, CalendarIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SmartexAssessmentSettings = () => {
  // Add navigate function from React Router
  const navigate = useNavigate();
  
  // Existing state variables
  const [questionOrder, setQuestionOrder] = useState('Shuffled randomly');
  const [newPage, setNewPage] = useState('Every Question');
  const [navigationMethod, setNavigationMethod] = useState('Free');
  
  const [showOrderDropdown, setShowOrderDropdown] = useState(false);
  const [showPageDropdown, setShowPageDropdown] = useState(false);
  const [showNavigationDropdown, setShowNavigationDropdown] = useState(false);
  
  // New state variables for navigation
  const [currentStep, setCurrentStep] = useState(2); // Layout is selected by default (index 2)
  
  // Steps configuration matching the new design
  const steps = [
    { name: 'Question Bank', icon: <FileText size={16} />, id: 0 },
    { name: 'Grading', icon: <Check size={16} />, id: 1 },
    { name: 'Layout', icon: <Layout size={16} />, id: 2 },
    { name: 'Question Behavior', icon: <Settings size={16} />, id: 3 },
    { name: 'Review Options', icon: <MonitorIcon size={16} />, id: 4 },
    { name: 'Exam Restriction', icon: <AlertOctagonIcon size={16} />, id: 5 },
    { name: 'Date and Time', icon: <CalendarIcon size={16} />, id: 6 }
  ];
  
  // Calculate progress percentage
  const progressPercentage = Math.min(100, (currentStep / (steps.length - 1)) * 100);
  const roundedPercentage = Math.round(progressPercentage);
  
  // New function to handle next button click
  const handleNextClick = () => {
    // First update the current step in the UI
    const nextStep = Math.min(steps.length - 1, currentStep + 1);
    setCurrentStep(nextStep);
    
    // Then navigate to the appropriate page based on the next step
    const nextPagePaths = [
      '/question-generation',
      '/grading',
      '/layout',
      '/Behavior',
      '/review-options',
      '/Grade'
    ];
    
    // Navigate to the page corresponding to the next step
    navigate(nextPagePaths[nextStep]);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="py-4 px-6 bg-white border-b flex items-center">
        <div className="flex items-center">
          {/* <svg viewBox="0 0 24 24" className="w-6 h-6 text-green-500 mr-2">
            <path fill="currentColor" d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2Z" />
          </svg> */}
          {/* <span className="text-xl font-bold text-gray-800">SMARTEX</span> */}
        </div>
      </header>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Progress Nav with Clear Percentage */}
        <div className="mb-10 relative">
          {/* Percentage label directly inside the progress bar */}
          <div className="flex items-center mb-1">
            <div className="text-sm font-medium text-gray-700 mr-2">Progress:</div>
            <div className="text-sm font-medium text-indigo-600">{roundedPercentage}%</div>
          </div>
          
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-2 bg-indigo-600 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${progressPercentage}%` }}
              role="progressbar"
              aria-valuenow={progressPercentage}
              aria-valuemin={0}
              aria-valuemax={100}
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
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-200
                      ${isActive ? 'bg-indigo-100 text-indigo-600 ring-2 ring-indigo-600' :
                        isCompleted ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                  >
                    {isCompleted ? <Check size={20} /> : step.icon}
                  </div>
                  <span
                    className={`text-sm font-medium text-center transition-colors duration-200
                      ${isActive ? 'text-indigo-600' :
                        isCompleted ? 'text-indigo-600' : 'text-gray-500 group-hover:text-gray-700'}`}
                  >
                    {step.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="mb-8 relative">
            <div className="flex items-center mb-2">
              <label className="text-gray-800 font-medium">Question Order</label>
            </div>
            <div className="relative">
              <button 
                className="w-full text-left bg-gray-100 p-3 rounded text-gray-600 flex justify-between items-center"
                onClick={() => setShowOrderDropdown(!showOrderDropdown)}
              >
                {questionOrder}
                <ChevronDown className="w-5 h-5" />
              </button>
              
              {/* Dropdown */}
              {showOrderDropdown && (
                <div className="absolute top-full left-0 w-full bg-white rounded shadow-lg z-10 mt-1">
                  <div className="p-2 hover:bg-gray-100 cursor-pointer" 
                    onClick={() => {
                      setQuestionOrder('Shuffled randomly');
                      setShowOrderDropdown(false);
                    }}>
                    Shuffled randomly
                  </div>
                  <div className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setQuestionOrder('As shown on the edit screen');
                      setShowOrderDropdown(false);
                    }}>
                    As shown on the edit screen
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="mb-8 relative">
            <div className="flex items-center mb-2">
              <label className="text-gray-800 font-medium">New Page</label>
            </div>
            <div className="relative">
              <button 
                className="w-full text-left bg-gray-100 p-3 rounded text-gray-600 flex justify-between items-center"
                onClick={() => setShowPageDropdown(!showPageDropdown)}
              >
                {newPage}
                <ChevronDown className="w-5 h-5" />
              </button>
              
              {/* Dropdown */}
              {showPageDropdown && (
                <div className="absolute top-full left-0 w-full bg-white rounded shadow-lg z-10 mt-1">
                  <div className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setNewPage('Every Question');
                      setShowPageDropdown(false);
                    }}>
                    Every Question
                  </div>
                  <div className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setNewPage('Every 2 Questions');
                      setShowPageDropdown(false);
                    }}>
                    Every 2 Questions
                  </div>
                  <div className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setNewPage('Every 3 Questions');
                      setShowPageDropdown(false);
                    }}>
                    Every 3 Questions
                  </div>
                  <div className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setNewPage('Every 4 Questions');
                      setShowPageDropdown(false);
                    }}>
                    Every 4 Questions
                  </div>
                  <div className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setNewPage('All Questions');
                      setShowPageDropdown(false);
                    }}>
                    All Questions
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="mb-8 relative">
            <div className="flex items-center mb-2">
              <label className="text-gray-800 font-medium">Navigation Method</label>
            </div>
            <div className="relative">
              <button 
                className="w-full text-left bg-gray-100 p-3 rounded text-gray-600 flex justify-between items-center"
                onClick={() => setShowNavigationDropdown(!showNavigationDropdown)}
              >
                {navigationMethod}
                <ChevronDown className="w-5 h-5" />
              </button>
              
              {/* Dropdown */}
              {showNavigationDropdown && (
                <div className="absolute top-full left-0 w-full bg-white rounded shadow-lg z-10 mt-1">
                  <div className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setNavigationMethod('Free');
                      setShowNavigationDropdown(false);
                    }}>
                    Free
                  </div>
                  <div className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setNavigationMethod('Sequential');
                      setShowNavigationDropdown(false);
                    }}>
                    Sequential
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="flex justify-end p-6 mt-auto">
        <button 
           className="px-6 py-2 bg-blue-200 text-blue-800 rounded-full flex items-center hover:bg-blue-300 transition-colors"
          onClick={handleNextClick}
        >
          Next
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default SmartexAssessmentSettings;