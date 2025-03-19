import React, { useState, useRef } from 'react';
import { ChevronRight, Plus, FileText, Check, Layout, Settings, MonitorIcon, CalendarIcon, AlertOctagonIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExamConfigPage = () => {
  const navigate = useNavigate();
  
  // Existing state from ExamConfigPage
  const [numberOfQuestions, setNumberOfQuestions] = useState('');
  const [questionsGrade, setQuestionsGrade] = useState('');
  const [individualGrades, setIndividualGrades] = useState({
    Q1: '1.5',
    Q2: ''
  });
  const [totalGrade, setTotalGrade] = useState('');
  const [passingGrade, setPassingGrade] = useState('');
  const [attemptsAllowed, setAttemptsAllowed] = useState('2');
  const [showAttemptsDropdown, setShowAttemptsDropdown] = useState(false);
  const [gradingMethod, setGradingMethod] = useState('Highest Grade');
  const [showGradingDropdown, setShowGradingDropdown] = useState(false);
  
  // New state for navigation from SmartexAssessmentTool
  const [currentStep, setCurrentStep] = useState(1); // Starting at Grading (1)

  const handleIndividualGradeChange = (question, value) => {
    setIndividualGrades({
      ...individualGrades,
      [question]: value
    });
  };

  const handleAddQuestion = () => {
    const nextQuestion = `Q${Object.keys(individualGrades).length + 1}`;
    setIndividualGrades({
      ...individualGrades,
      [nextQuestion]: ''
    });
  };

  // Define steps array for navigation
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

  // Updated handleNextClick function
  const handleNextClick = () => {
    // First update the current step in the UI
    const nextStep = Math.min(steps.length - 1, currentStep + 1);
    setCurrentStep(nextStep);
    
    // Navigate specifically to the layout page
    navigate('/maker/Batats');
  };

  const gradingMethods = [
    'Highest Grade',
    'Average Grade',
    'First Attempt',
    'Last Attempt',
    'Lowest Grade',
    'Sum of All Attempts'
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-4">
          
        </div>

        {/* Enhanced Progress Navigation */}
        <div className="mb-6">
          <div className="flex items-center mb-1">
            <div className="text-sm font-medium text-gray-700 mr-2">Progress:</div>
            <div className="text-sm font-medium text-indigo-600">{roundedPercentage}%</div>
          </div>
          
          <div className="relative w-full bg-gray-200 h-2 rounded-full mb-4">
            <div 
              className="absolute top-0 left-0 bg-indigo-600 h-2 rounded-full transition-all duration-300 ease-in-out" 
              style={{ width: `${progressPercentage}%` }}
              role="progressbar" 
              aria-valuenow={progressPercentage} 
              aria-valuemin={0} 
              aria-valuemax={100}
            ></div>
          </div>
          
          <div className="flex justify-between">
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
                  isCompleted ? 'bg-indigo-100 text-indigo-600' : 
                  'bg-white text-gray-500 border border-gray-300 hover:bg-gray-100'}
                  `}
                  >
  {step.icon}
</div>
<span 
  className={`text-sm font-medium text-center transition-colors duration-200
    ${isActive ? 'text-indigo-600' : 
      isCompleted ? 'text-indigo-600' : 
      'text-gray-500 group-hover:text-gray-700'}
  `}
>
  {step.name}
</span>

                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm mb-4">
          <div className="flex items-center mb-4">
            <div className="w-48 font-medium">Number Of Exam Questions</div>
            <input
              type="text"
              className="bg-gray-100 rounded-md px-4 py-2 w-40"
              placeholder="Enter Number"
              value={numberOfQuestions}
              onChange={(e) => setNumberOfQuestions(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm mb-4">
          <div className="flex items-center mb-4">
            <div className="w-48 font-medium">Questions Grade</div>
            <input
              type="text"
              className="bg-gray-100 rounded-md px-4 py-2 w-40 mr-4"
              placeholder="Enter Grade"
              value={questionsGrade}
              onChange={(e) => setQuestionsGrade(e.target.value)}
            />
            <button className="bg-green-400 text-white rounded-full px-4 py-2 text-sm">
              Apply to All Questions
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm mb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="font-medium">Grade For Each Question</div>
            <button
              className="w-6 h-6 rounded-full bg-green-100 text-green-500 flex items-center justify-center"
              onClick={handleAddQuestion}
            >
              <Plus size={16} />
            </button>
          </div>
          {Object.entries(individualGrades).map(([question, grade]) => (
            <div className="flex items-center mb-3" key={question}>
              <div className="w-48 font-medium">{question} Grade</div>
              <input
                type="text"
                className="bg-gray-100 rounded-md px-4 py-2 w-40"
                placeholder="Enter Grade"
                value={grade}
                onChange={(e) => handleIndividualGradeChange(question, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm mb-4">
          <div className="flex items-center mb-4">
            <div className="w-48 font-medium">Total Grades Of Exam</div>
            <input
              type="text"
              className="bg-gray-100 rounded-md px-4 py-2 w-40"
              placeholder="Enter Grade"
              value={totalGrade}
              onChange={(e) => setTotalGrade(e.target.value)}
            />
          </div>
          <div className="flex items-center mb-4">
            <div className="w-48 font-medium">Grade To Pass</div>
            <input
              type="text"
              className="bg-gray-100 rounded-md px-4 py-2 w-40"
              placeholder="Enter Grade"
              value={passingGrade}
              onChange={(e) => setPassingGrade(e.target.value)}
            />
          </div>
          <div className="flex items-center mb-4">
            <div className="w-48 font-medium">Attempts allowed</div>
            <div className="relative">
              <button
                className="bg-gray-100 rounded-md px-4 py-2 w-40 text-left flex justify-between items-center"
                onClick={() => setShowAttemptsDropdown(!showAttemptsDropdown)}
              >
                {attemptsAllowed}
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {showAttemptsDropdown && (
                <div className="absolute top-full left-0 mt-1 w-40 bg-white shadow-lg rounded-md z-10 py-1 max-h-40 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                    <button
                      key={num}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => {
                        setAttemptsAllowed(num.toString());
                        setShowAttemptsDropdown(false);
                      }}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-48 font-medium">Grading Method</div>
            <div className="relative">
              <button
                className="bg-gray-100 rounded-md px-4 py-2 w-40 text-left flex justify-between items-center"
                onClick={() => setShowGradingDropdown(!showGradingDropdown)}
              >
                {gradingMethod}
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {showGradingDropdown && (
                <div className="absolute top-full left-0 mt-1 w-40 bg-white shadow-lg rounded-md z-10 py-1">
                  {gradingMethods.map((method) => (
                    <button
                      key={method}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => {
                        setGradingMethod(method);
                        setShowGradingDropdown(false);
                      }}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button 
             className="px-6 py-2 bg-blue-200 text-blue-800 rounded-full flex items-center hover:bg-blue-300 transition-colors"
            onClick={handleNextClick}
          >
            Next
            <ChevronRight size={18} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamConfigPage;