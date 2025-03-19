import React, { useState, useRef, useEffect } from 'react';
import { FileText, Check, Layout, Settings, Monitor, AlertOctagon, Calendar, ChevronDown, Clock, ChevronRight} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExamSettings = () => {
  const [currentStep, setCurrentStep] = useState(6); // Date and Time is active
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Open Attempts are Submitted Automatically');
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Keep existing steps array
  const steps = [
    { name: 'Question Bank', icon: <FileText size={20} />, id: 0 },
    { name: 'Grading', icon: <Check size={20} />, id: 1 },
    { name: 'Layout', icon: <Layout size={20} />, id: 2 },
    { name: 'Question Behavior', icon: <Settings size={20} />, id: 3 },
    { name: 'Review Options', icon: <Monitor size={20} />, id: 4 },
    { name: 'Exam Restriction', icon: <AlertOctagon size={16} />, id: 5 },
    { name: 'Date and Time', icon: <Calendar size={16} />, id: 6 }
  ];
  const navigate = useNavigate();
  
  // Calculate progress percentage based on current step
  const progressPercentage = Math.min(100, (currentStep / (steps.length - 1)) * 100);
  const roundedPercentage = Math.round(progressPercentage);
  
  // Options for dropdown
  const dropdownOptions = [
    'Open attempts are submitted automatically',
    'There is a grace period when open attempts can be submitted, but no more questions answered',
    'Attempts must be submitted before time expires, or they are not counted'
  ];
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      {/* Header */}
      <div className="flex items-center mb-6">
        <div className="text-green-500 font-bold text-xl flex items-center">
          {/* <div className="w-2 h-2 mr-1 rounded-full bg-green-500"></div>
          SMARTEX */}
        </div>
      </div>
      
      {/* Main content */}
      <div className="max-w-4xl mx-auto">
        {/* Steps progress */}
        <div className="max-w-4xl mx-auto">
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
        
        {/* Date section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h2 className="text-lg font-medium mb-4">Date</h2>
          
          <div className="mb-2">
            <div className="flex items-center mb-4">
              <label className="block w-32">Open the Quiz</label>
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  placeholder="Day" 
                  className="bg-gray-100 rounded-md px-4 py-2 w-20"
                />
                <input 
                  type="text" 
                  placeholder="Month" 
                  className="bg-gray-100 rounded-md px-4 py-2 w-24"
                />
                <input 
                  type="text" 
                  placeholder="Year" 
                  className="bg-gray-100 rounded-md px-4 py-2 w-20"
                />
                <button className="bg-white p-2 border border-gray-200 rounded-md">
                  <Calendar size={16} />
                </button>
              </div>
            </div>
            
            <div className="flex items-center">
              <label className="block w-32">Close the Quiz</label>
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  placeholder="Day" 
                  className="bg-gray-100 rounded-md px-4 py-2 w-20"
                />
                <input 
                  type="text" 
                  placeholder="Month" 
                  className="bg-gray-100 rounded-md px-4 py-2 w-24"
                />
                <input 
                  type="text" 
                  placeholder="Year" 
                  className="bg-gray-100 rounded-md px-4 py-2 w-20"
                />
                <button className="bg-white p-2 border border-gray-200 rounded-md">
                  <Calendar size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Timing section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h2 className="text-lg font-medium mb-4">Timing</h2>
          
          <div className="flex items-center">
            <label className="block w-32">Set Time</label>
            <div className="flex space-x-2">
              <input 
                type="text" 
                placeholder="hrs" 
                className="bg-gray-100 rounded-md px-4 py-2 w-20"
              />
              <input 
                type="text" 
                placeholder="Min" 
                className="bg-gray-100 rounded-md px-4 py-2 w-20"
              />
              <input 
                type="text" 
                placeholder="Sec" 
                className="bg-gray-100 rounded-md px-4 py-2 w-20"
              />
              <button className="bg-white p-2 border border-gray-200 rounded-md">
                <Clock size={16} />
              </button>
            </div>
          </div>
        </div>
        
        {/* When Time Expires section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h2 className="text-lg font-medium mb-4">When Times Expires</h2>
          
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-gray-100 rounded-md px-4 py-3 text-left text-sm flex justify-between items-center"
            >
              <span>{selectedOption}</span>
              <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 z-10">
                {dropdownOptions.map((option, index) => (
                  <div 
                    key={index}
                    className={`p-3 border-b border-gray-100 text-sm cursor-pointer hover:bg-gray-50 ${
                      option === selectedOption ? 'bg-blue-50' : ''
                    } ${index === dropdownOptions.length - 1 ? 'border-b-0' : ''}`}
                    onClick={() => handleOptionSelect(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <div className="flex justify-end mt-6">
        <button 
          onClick={() => navigate('/showexam')}
          className="px-6 py-2 bg-blue-200 text-blue-800 rounded-full flex items-center hover:bg-blue-300 transition-colors">
          Finish
          <ChevronRight className="ml-1" size={18} />
        </button>
        </div>
      </div>
    </div>
  );
};

export default ExamSettings;