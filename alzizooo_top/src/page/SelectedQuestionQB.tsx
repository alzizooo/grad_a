import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ExamSetupPage = () => {
  const navigate = useNavigate(); // React Router Hook
  // Sample question bank data
  const [questionBank, setQuestionBank] = useState([
    { id: 1, text: "What is the capital of France?", answer: "Paris", selected: false },
    { id: 2, text: "What is 2 + 2?", answer: "4", selected: false },
    { id: 3, text: "Who wrote 'Romeo and Juliet'?", answer: "William Shakespeare", selected: false },
    { id: 4, text: "What is the chemical symbol for water?", answer: "H2O", selected: false },
    { id: 5, text: "What planet is known as the Red Planet?", answer: "Mars", selected: false },
  ]);

  const [showAnswer, setShowAnswer] = useState({});
  const [selectedCount, setSelectedCount] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  // Toggle question selection
  const toggleSelect = (id) => {
    const updatedQuestions = questionBank.map(q => {
      if (q.id === id) {
        const newSelected = !q.selected;
        // Update selected count
        setSelectedCount(prevCount => newSelected ? prevCount + 1 : prevCount - 1);
        return { ...q, selected: newSelected };
      }
      return q;
    });
    setQuestionBank(updatedQuestions);
    setIsSaved(false);
  };

  // Toggle show/hide answer
  const toggleAnswer = (id) => {
    setShowAnswer(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Remove question
  const removeQuestion = (id) => {
    const updatedQuestions = questionBank.filter(q => q.id !== id);
    const removedQuestion = questionBank.find(q => q.id === id);
    
    // Update selected count if a selected question is removed
    if (removedQuestion && removedQuestion.selected) {
      setSelectedCount(prevCount => prevCount - 1);
    }
    
    setQuestionBank(updatedQuestions);
    setIsSaved(false);
  };

  // Save selected questions
  const saveSelection = () => {
    setIsSaved(true);
    // Here you would typically send the selected questions to a server
    console.log("Saved questions:", questionBank.filter(q => q.selected));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Exam Setup</h1>
        <p className="text-gray-600">Select questions for your exam from the question bank below.</p>
        <div className="mt-4 flex items-center">
          <span className="font-medium mr-2">Selected Questions: {selectedCount}</span>
          <button 
            onClick={saveSelection}
            className="ml-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            {isSaved ? "✓ Saved" : "Save Selection"}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold mb-4">Question Bank</h2>
        
        {questionBank.length === 0 ? (
          <p className="text-gray-500 italic">No questions available in the bank.</p>
        ) : (
          <ul className="space-y-4">
            {questionBank.map((question) => (
              <li key={question.id} className="border-b pb-4">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id={`question-${question.id}`}
                    checked={question.selected}
                    onChange={() => toggleSelect(question.id)}
                    className="mt-1 mr-3"
                  />
                  <div className="flex-1">
                    <label 
                      htmlFor={`question-${question.id}`}
                      className="block text-gray-800 font-medium mb-1"
                    >
                      {question.text}
                    </label>
                    
                    <div className="flex mt-2 space-x-2">
                      <button
                        onClick={() => toggleAnswer(question.id)}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        {showAnswer[question.id] ? "Hide Answer" : "View Answer"}
                      </button>
                      <button
                        onClick={() => removeQuestion(question.id)}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                    
                    {showAnswer[question.id] && (
                      <div className="mt-2 p-2 bg-gray-100 rounded">
                        <span className="font-medium">Answer:</span> {question.answer}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div className="mt-6 flex justify-between">
        
        <button 
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        onClick={() => navigate('/grading')} 
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ExamSetupPage;
