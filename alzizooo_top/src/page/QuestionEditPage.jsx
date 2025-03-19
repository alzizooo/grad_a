import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

const QuestionEditPage = () => {
  const { questionId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Default question state with sample data
  const [question, setQuestion] = useState({
    id: questionId || '1',
    questionText: 'What Type Of Process Initiates Communication In Network Application',
    options: [
      { id: 'a', text: 'Server Process' },
      { id: 'b', text: 'Network Process' },
      { id: 'c', text: 'Host Process' },
      { id: 'd', text: 'Client Process' }
    ],
    correctAnswer: 'Client Process'
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // If we have state from navigation, use it
    if (location.state?.question) {
      const { question: questionData } = location.state;
      setQuestion({
        id: questionData.id || questionId,
        questionText: questionData.question || '',
        options: [
          { id: 'a', text: 'Server Process' },
          { id: 'b', text: 'Network Process' },
          { id: 'c', text: 'Host Process' },
          { id: 'd', text: 'Client Process' }
        ],
        correctAnswer: questionData.answer || ''
      });
    }
    // Simulate API call delay
    setTimeout(() => setIsLoading(false), 500);
  }, [location.state, questionId]);

  const handleSaveChanges = () => {
    // Here you would typically make an API call to save the changes
    console.log('Saving changes:', question);
    
    // Navigate back to the previous page
    if (location.state?.returnPath) {
      navigate(location.state.returnPath);
    } else {
      navigate('/maker/QuizResultsPage'); // Default to home if no return path
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading question...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h1 className="text-xl font-semibold">Question {question.id} Edit</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Edit</span>
            <div className="w-12 h-6 bg-green-500 rounded-full p-1 cursor-pointer">
              <div className="bg-white w-4 h-4 rounded-full ml-auto"></div>
            </div>
          </div>
        </div>

        {/* Question Content */}
        <div className="p-6 space-y-6">
          {/* Question Text Section */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Question Text
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-600">
                Q{question.id}.
              </span>
              <input
                type="text"
                value={question.questionText}
                onChange={(e) => setQuestion(prev => ({
                  ...prev,
                  questionText: e.target.value
                }))}
                className="w-full p-2 pl-12 border rounded-lg"
              />
            </div>
          </div>

          {/* Question Answers Section */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Question Answers
            </label>
            <div className="space-y-3">
              {question.options.map((option) => (
                <div key={option.id} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={question.correctAnswer === option.text}
                    onChange={() => setQuestion(prev => ({
                      ...prev,
                      correctAnswer: option.text
                    }))}
                    className="w-4 h-4 text-green-500"
                  />
                  <span className="font-medium">{option.id}.</span>
                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) => {
                      const newOptions = [...question.options];
                      const index = newOptions.findIndex(o => o.id === option.id);
                      newOptions[index] = { ...option, text: e.target.value };
                      setQuestion(prev => ({ ...prev, options: newOptions }));
                    }}
                    className="flex-1 p-2 border rounded-lg"
                    placeholder={`Option ${option.id.toUpperCase()}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Correct Answer Section */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Correct Answer
            </label>
            <div className="p-4 bg-gray-50 rounded-lg">
              {question.correctAnswer || 'Select the correct answer using the radio buttons'}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 rounded-b-lg">
          <div className="flex justify-end">
            <button
              onClick={handleSaveChanges}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionEditPage;