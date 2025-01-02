import React, { useState } from 'react';
import { Bot, Upload } from 'lucide-react';
 
const ProgressStep = ({ number, label, isActive }) => (
  <div className="flex flex-col items-center">
    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 
      ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
      {number}
    </div>
    <span className="text-xs text-gray-600">{label}</span>
  </div>
);
 
const Divider = () => (
  <div className="flex-1 h-0.5 bg-gray-200 mt-4" />
);
 
const FileUploadSection = ({ onClose }) => (
  <div className="mb-8">
    <div className="flex items-start gap-3 mb-6">
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
        <Bot className="w-8 h-8 text-blue-500" />
      </div>
      <div className="flex-1">
        <p className="text-lg text-gray-700">
        Welcome! Please upload your file so that we can analyze its content and generate a set of relevant and insightful questions for you.
        </p>
      </div>
    </div>
 
    <div className="border-2 border-dashed border-gray-300 rounded-lg min-h-[300px] p-12 flex flex-col items-center justify-center gap-6">
      <Upload className="w-16 h-16 text-gray-400" />
      <div className="text-center">
        <p className="text-blue-500 text-lg font-medium mb-2 cursor-pointer hover:text-blue-600">
          Click to Upload
        </p>
        <p className="text-gray-500 text-base">or drag and drop</p>
        <p className="text-gray-400 text-sm mt-3">(Max File Size 25 MB)</p>
      </div>
    </div>
  </div>
);
 
const AIExamGeneration = () => {
  const [questionType, setQuestionType] = useState('MCQ');
  const [numQuestions, setNumQuestions] = useState(60);
  const [content, setContent] = useState('');
  const [showUpload, setShowUpload] = useState(false);
 
  const steps = [
    'Question Generation',
    'Grading',
    'Question Behavior',
    'Restrictions',
    'Date and Time'
  ];
 
  const questionTypes = ['MCQ', 'Written', 'True/False', 'All Types'];
 
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Steps */}
      <div className="flex justify-between items-center mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <ProgressStep 
              number={index + 1} 
              label={step} 
              isActive={index === 0}
            />
            {index < steps.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </div>
 
      <div className="bg-white rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Generation Using AI</h2>
        {/* Input Options */}
        <div className="flex gap-4 mb-4">
          <button 
            onClick={() => setShowUpload(false)}
            className={`px-4 py-2 rounded-lg text-gray-700 transition-colors ${!showUpload ? 'bg-gray-200' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            Insert Paragraph
          </button>
          <button 
            onClick={() => setShowUpload(true)}
            className={`px-4 py-2 rounded-lg text-gray-700 transition-colors ${showUpload ? 'bg-gray-200' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            Upload File
          </button>
        </div>
 
        {/* Content Area */}
        {showUpload ? (
          <FileUploadSection onClose={() => setShowUpload(false)} />
        ) : (
          <div className="mb-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="text-gray-700">
                  Welcome! Based on the information you've provided, I'm here to help generate tailored responses.
                </p>
              </div>
            </div>
 
            <textarea
              placeholder="Write Your Text Here......"
              className="w-full min-h-[200px] p-3 mb-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        )}
 
        {/* Question Settings */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
              className="pl-4 pr-8 py-2 border rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {questionTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
 
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">No of Questions:</span>
            <input
              type="number"
              value={numQuestions}
              onChange={(e) => setNumQuestions(e.target.value)}
              className="w-16 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
 
        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button className="px-6 py-2 bg-green-400 text-white rounded-lg hover:bg-green-500 transition-colors">
            Create
          </button>
          <button className="px-6 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
 
export default AIExamGeneration;