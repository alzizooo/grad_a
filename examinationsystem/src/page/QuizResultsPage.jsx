import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';


const QuizResultsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.quizData) {
      setQuestions(location.state.quizData);
    } else {
      setQuestions([
        { id: 1, question: 'What is the capital of France?', answer: 'Paris' },
        { id: 2, question: 'What is the capital of Japan?', answer: 'Tokyo' },
        { id: 3, question: 'What is the capital of Italy?', answer: 'Rome' },
      ]);
    }
    setLoading(false);
  }, [location.state]);

  const handleCheckboxChange = (questionId) => {
    const newSelected = new Set(selectedQuestions);
    if (newSelected.has(questionId)) {
      newSelected.delete(questionId);
    } else {
      newSelected.add(questionId);
    }
    setSelectedQuestions(newSelected);
  };

  const handleOptionClick = (path) => {
    navigate(path);
  };

  const handleBack = () => {
    navigate(-1);
  };



  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white rounded-lg p-4 mb-6">
          <h2 className="text-gray-700 text-lg">Results ({questions.length})</h2>
        </div>
        <div className="bg-white rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">Questions Overview</h3>
            <button className="text-blue-600 hover:text-blue-700" onClick={() => navigate('/questions')}>
              View All
            </button>
          </div>
          <div className="hidden md:grid grid-cols-4 gap-4 mb-4 text-sm text-gray-500">
            <div>Select</div>
            <div>Question</div>
            <div>Right Answer</div>
            <div>Edit Question</div>
          </div>
          {questions.length > 0 ? (
            <div className="space-y-4">
              {questions.map((q) => (
                <div key={q.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center py-2 border-b">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedQuestions.has(q.id)}
                      onChange={() => handleCheckboxChange(q.id)}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300"
                      aria-label={`Select question ${q.id}`}
                    />
                  </div>
                  <div className="text-sm text-gray-700">
                    <span className="md:hidden font-medium">Question: </span>
                    Q{q.id}. {q.question}
                  </div>
                  <div>
                    <span className="md:hidden font-medium">Answer: </span>
                    <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                      {q.answer}
                    </span>
                  </div>
                  <div>
                    <button
                      onClick={() => navigate("/maker/QuestionEditPage")}
                      className="text-blue-600 hover:text-blue-800"
                      aria-label={`Edit question ${q.id}`}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">No questions available</div>
          )}
        </div>
        <div className="flex justify-between mt-6">
          <button onClick={handleBack} className="px-6 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
            Back
          </button>
          <button
            className="bg-blue-100 text-blue-900 px-8 py-2 rounded-lg hover:bg-blue-200 flex items-center gap-2"
            onClick={() => navigate('/next-step')}
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizResultsPage;
