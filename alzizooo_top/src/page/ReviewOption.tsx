import React, { useState, useRef } from 'react';
import { ChevronRight, ChevronDown, Settings, Layout, Check, FileText, MonitorIcon, AlertOctagonIcon, CalendarIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SmartexAssessmentTool = () => {
  // Add navigate function from React Router
  const navigate = useNavigate();

  // Only keep state variables that are actually used
  const [currentStep, setCurrentStep] = useState(4); // Set to 4 for Review Options

  // Keep existing steps array
  const steps = [
    { name: 'Question Bank', icon: <FileText size={16} />, id: 0 },
    { name: 'Grading', icon: <Check size={16} />, id: 1 },
    { name: 'Layout', icon: <Layout size={16} />, id: 2 },
    { name: 'Question Behavior', icon: <Settings size={16} />, id: 3 },
    { name: 'Review Options', icon: <MonitorIcon size={16} />, id: 4 },
    { name: 'Exam Restriction', icon: <AlertOctagonIcon size={16} />, id: 5 },
    { name: 'Date and Time', icon: <CalendarIcon size={16} />, id: 6 }
  ];

  // Calculate progress percentage based on current step
  const progressPercentage = Math.min(100, (currentStep / (steps.length - 1)) * 100);
  const roundedPercentage = Math.round(progressPercentage);

  // Define feedback options for review settings
  const feedbackOptions = [
    'The attempt',
    'Whether Correct',
    'Marks',
    'Specific feedback',
    'General Feedback',
    'Right Answer',
    'Overall feedback'
  ];
  
  // Define sections for review settings
  const sections = [
    { title: 'During The attempt', id: 'during' },
    { title: 'Immediately after the attempt', id: 'immediately' },
    { title: 'Later, While the quiz is still open', id: 'later' },
    { title: 'After the quiz is closed', id: 'after' }
  ];

  // Modified function to handle next button click
  const handleNextClick = () => {
    // First update the current step in the UI
    const nextStep = Math.min(steps.length - 1, currentStep + 1);
    setCurrentStep(nextStep);

    // Navigate directly to the ExamRestriction page
    navigate('/ExamRestriction');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="py-4 px-6 bg-white border-b flex items-center">
        {/* <div className="flex items-center">
          <span className="text-green-500 font-bold text-xl">S</span>
          <span className="font-bold text-xl">MARTEX</span>
        </div> */}
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

        {/* Review Options Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {sections.map((section) => (
            <div key={section.id} className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-bold mb-4">{section.title}</h2>
              
              <div className="space-y-3">
                {feedbackOptions.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`${section.id}-${optionIndex}`}
                      name={`${section.id}-${option}`}
                      className="mr-3 h-4 w-4"
                    />
                    <label htmlFor={`${section.id}-${optionIndex}`}>{option}</label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Next button */}
        <div className="flex justify-end mt-8 max-w-4xl mx-auto">
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

export default SmartexAssessmentTool;