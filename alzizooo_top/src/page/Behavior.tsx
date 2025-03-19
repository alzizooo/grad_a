import React, { useState, useRef, useEffect } from 'react';
import { FileText, Check, Layout, Settings, MonitorIcon, ChevronRight, AlertOctagonIcon, CalendarIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuizConfigInterface = () => {
  const navigate = useNavigate();
  
  // State management
  const [feedbackType, setFeedbackType] = useState('Deferred Feedback');
  const [buildOnLastAttempt, setBuildOnLastAttempt] = useState('Yes');
  const [feedbackDropdownOpen, setFeedbackDropdownOpen] = useState(false);
  const [attemptDropdownOpen, setAttemptDropdownOpen] = useState(false);
  const [options, setOptions] = useState({
    shuffleQuestions: true,
    freeNavigation: false
  });
  
  // Current step state
  const [currentStep, setCurrentStep] = useState(3); // Question Behavior step
  
  // References for dropdowns - explicitly type as HTMLDivElement
  const feedbackDropdownRef = useRef<HTMLDivElement>(null);
  const attemptDropdownRef = useRef<HTMLDivElement>(null);
  
  // Navigation steps
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
  
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Type assertion for event.target
      const target = event.target as Node;
      
      if (feedbackDropdownRef.current && !feedbackDropdownRef.current.contains(target)) {
        setFeedbackDropdownOpen(false);
      }
      if (attemptDropdownRef.current && !attemptDropdownRef.current.contains(target)) {
        setAttemptDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Dropdown toggling functions
  const toggleFeedbackDropdown = () => {
    setFeedbackDropdownOpen(!feedbackDropdownOpen);
    setAttemptDropdownOpen(false);
  };
  
  const toggleAttemptDropdown = () => {
    setAttemptDropdownOpen(!attemptDropdownOpen);
    setFeedbackDropdownOpen(false);
  };
  
  // Selection handling
  const selectFeedbackOption = (option: string) => {
    setFeedbackType(option);
    setFeedbackDropdownOpen(false);
  };
  
  const selectAttemptOption = (option: string) => {
    setBuildOnLastAttempt(option);
    setAttemptDropdownOpen(false);
  };
  
  const handleCheckboxChange = (option: string) => {
    setOptions(prev => ({
      ...prev,
      [option]: !prev[option as keyof typeof prev]
    }));
  };

  const handleNextClick = () => {
    // First update the current step in the UI
    const nextStep = Math.min(steps.length - 1, currentStep + 1);
    setCurrentStep(nextStep);
   
    // Navigate specifically to the ReviewOption page
    navigate('/maker/ReviewOption');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="py-4 px-6 bg-white border-b flex items-center">
        {/* <div className="flex items-center">
          <span className="text-green-500 font-bold text-xl">$</span>
          <span className="font-bold text-xl">MARTEX</span>
        </div> */}
      </header>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Progress Nav with Clear Percentage */}
        <div className="mb-10 relative">
          {/* Percentage label */}
          <div className="flex items-center mb-1">
            <div className="text-sm font-medium text-gray-700 mr-2">Progress:</div>
            <div className="text-sm font-medium text-indigo-600">{roundedPercentage}%</div>
          </div>
          
          {/* Progress bar */}
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
        
        {/* Question Options */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="mb-6">
            <label className="inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="form-checkbox h-4 w-4 text-green-500 rounded" 
                checked={options.shuffleQuestions}
                onChange={() => handleCheckboxChange('shuffleQuestions')}
              />
              <span className="ml-2">Shuffle Questions</span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="form-checkbox h-4 w-4 text-green-500 rounded" 
                checked={options.freeNavigation}
                onChange={() => handleCheckboxChange('freeNavigation')}
              />
              <span className="ml-2">Free Navigation</span>
            </label>
          </div>
        </div>
        
        {/* Question Behavior */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="mb-6">
            <div className="text-lg font-medium mb-4">How Question Behave</div>
            <div className="relative" ref={feedbackDropdownRef}>
              <button 
                onClick={toggleFeedbackDropdown} 
                className={`w-full px-4 py-2 text-left rounded flex justify-between items-center ${feedbackDropdownOpen ? 'bg-blue-100 text-blue-700 border border-blue-300' : 'bg-gray-100'}`}
              >
                <span>{feedbackType}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {feedbackDropdownOpen && (
                <div className="absolute mt-1 w-full bg-white border border-blue-200 rounded-md shadow-lg z-10">
                  <ul className="py-1">
                    <li onClick={() => selectFeedbackOption('Adaptive mode')} className="px-4 py-3 hover:bg-blue-50 text-sm cursor-pointer">Adaptive mode</li>
                    <li onClick={() => selectFeedbackOption('Adaptive mode (no penalties)')} className="px-4 py-3 hover:bg-blue-50 text-sm cursor-pointer">Adaptive mode (no penalties)</li>
                    <li onClick={() => selectFeedbackOption('Deferred feedback')} className="px-4 py-3 hover:bg-blue-50 text-sm cursor-pointer">Deferred feedback</li>
                    <li onClick={() => selectFeedbackOption('Deferred feedback with CBM')} className="px-4 py-3 hover:bg-blue-50 text-sm cursor-pointer">Deferred feedback with CBM</li>
                    <li onClick={() => selectFeedbackOption('Immediate feedback')} className="px-4 py-3 hover:bg-blue-50 text-sm cursor-pointer">Immediate feedback</li>
                    <li onClick={() => selectFeedbackOption('Immediate feedback with CBM')} className="px-4 py-3 hover:bg-blue-50 text-sm cursor-pointer">Immediate feedback with CBM</li>
                    <li onClick={() => selectFeedbackOption('Interactive with multiple tries')} className="px-4 py-3 hover:bg-blue-50 text-sm cursor-pointer">Interactive with multiple tries</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <div className="mb-2">Each attempt builds on the last</div>
            <div className="relative" ref={attemptDropdownRef}>
              <button 
                onClick={toggleAttemptDropdown}
                className={`px-4 py-2 rounded flex justify-between items-center w-32 ${attemptDropdownOpen ? 'bg-blue-100 text-blue-700 border border-blue-300' : 'bg-gray-100'}`}
              >
                <span>{buildOnLastAttempt}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {attemptDropdownOpen && (
                <div className="absolute mt-1 w-32 bg-white border border-blue-200 rounded-md shadow-lg z-10">
                  <ul className="py-1">
                    <li onClick={() => selectAttemptOption('Yes')} className="px-4 py-2 hover:bg-blue-50 text-sm text-center cursor-pointer">Yes</li>
                    <li onClick={() => selectAttemptOption('No')} className="px-4 py-2 hover:bg-blue-50 text-sm text-center cursor-pointer">No</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Next button */}
        <div className="flex justify-end">
          <button 
            onClick={handleNextClick}
            className="px-6 py-2 bg-blue-200 text-blue-800 rounded-full flex items-center hover:bg-blue-300 transition-colors"
          >
            Next
            <ChevronRight className="ml-1" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizConfigInterface;