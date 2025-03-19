import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';



const QuestionManagementApp = () => {
  
    const navigate = useNavigate(); // React Router Hook

  // Define proper types
  interface Question {
    id: string;
    question: string;
    type: 'Multiple Choice' | 'Short Answer' | 'Essay' | 'True/False';
    difficulty: 'Easy' | 'Medium' | 'Hard';
    created: string;
    used: string;
    answers?: Array<{text: string, correct: boolean}>; // For Multiple Choice
    answer?: string | boolean; // For Short Answer and True/False
    rubric?: string; // For Essay
  }
  // Sample data for questions
  const [questions, setQuestions] = useState([
    { 
      id: 'Q-1000', 
      type: 'Multiple Choice', 
      question: 'What is the capital of France?', 
      difficulty: 'Easy',
      created: 'Mar 1, 2025',
      used: '2 times'
    },
    { 
      id: 'Q-1001', 
      type: 'Short Answer', 
      question: 'Explain the water cycle', 
      difficulty: 'Medium',
      created: 'Mar 2, 2025',
      used: '5 times'
    },
    { 
      id: 'Q-1002', 
      type: 'Essay', 
      question: 'Discuss the impact of climate change', 
      difficulty: 'Hard',
      created: 'Mar 3, 2025',
      used: '8 times'
    },
    { 
      id: 'Q-1003', 
      type: 'Multiple Choice', 
      question: 'What is the capital of France?', 
      difficulty: 'Easy',
      created: 'Mar 4, 2025',
      used: '11 times'
    },
    { 
      id: 'Q-1004', 
      type: 'Short Answer', 
      question: 'Explain the water cycle', 
      difficulty: 'Medium',
      created: 'Mar 5, 2025',
      used: '14 times'
    },
    { 
      id: 'Q-1005', 
      type: 'Essay', 
      question: 'Discuss the impact of climate change', 
      difficulty: 'Hard',
      created: 'Mar 6, 2025',
      used: '17 times'
    },
    { 
      id: 'Q-1006', 
      type: 'Multiple Choice', 
      question: 'What is the capital of France?', 
      difficulty: 'Easy',
      created: 'Mar 7, 2025',
      used: '20 times'
    },
    { 
      id: 'Q-1007', 
      type: 'Short Answer', 
      question: 'Explain the water cycle', 
      difficulty: 'Medium',
      created: 'Mar 8, 2025',
      used: '23 times'
    },
    { 
      id: 'Q-1008', 
      type: 'True/False', 
      question: 'Discuss the impact of climate change', 
      difficulty: 'Hard',
      created: 'Mar 9, 2025',
      used: '26 times'
    },
    { 
      id: 'Q-1009', 
      type: 'True/False', 
      question: 'Discuss the impact of climate change', 
      difficulty: 'Hard',
      created: 'Mar 9, 2025',
      used: '26 times'
    }
  ]);

  // State for filters
  // const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [difficultyFilter, setDifficultyFilter] = useState('All Difficulty');
  const [typeFilter, setTypeFilter] = useState('Essay');
  
  // State for pagination
  const ITEMS_PER_PAGE = 9; // Since you're showing a 3x3 grid

// Filter questions based on selected filters
const filteredQuestions = questions.filter(q => {
  let matches = true;
  
  if (difficultyFilter !== 'All Difficulty') {
    matches = matches && q.difficulty === difficultyFilter;
  }
  
  if (typeFilter !== 'All Types') {
    matches = matches && q.type === typeFilter;
  }
  
  return matches;
});

// Paginate the filtered questions
const [currentPage, setCurrentPage] = useState<number>(1);
const indexOfLastQuestion = currentPage * ITEMS_PER_PAGE;
const indexOfFirstQuestion = indexOfLastQuestion - ITEMS_PER_PAGE;
const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);
const totalPages = Math.ceil(filteredQuestions.length / ITEMS_PER_PAGE);
 
 

  // Show create question modal
  const [showModal, setShowModal] = useState(false);
  
  // File upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  
  // Properly typed state variables
// const [questions, setQuestions] = useState<Question[]>([]);
const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);
const [selectAll, setSelectAll] = useState<boolean>(false);
  
 
 // Delete a question
const handleDelete = (id: number | string) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this question?");
  
  // Only proceed if the user confirms
  if (confirmDelete) {
    // Remove the question from the questions array
    setQuestions(questions.filter(q => q.id !== id));
    
    // Remove from selected questions if present
    setSelectedQuestions(selectedQuestions.filter(qId => qId !== id));
    
    // Remove from expanded questions if present
    setExpandedQuestions(expandedQuestions.filter(qId => qId !== id));
  }
};
  
  // Edit a question
const handleEdit = (id: number | string) => {
  console.log(`Editing question ${id}`);
  // Implementation would open an edit modal
};
  
  // File handling functions
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  const handleUploadClick = () => {
    
    {/* Hidden file input */}
<input
  type="file"
  ref={fileInputRef}
  onChange={handleFileChange}
  className="hidden"
  accept=".csv, .xlsx, .json"
/>
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    // Simulate file upload process
    setTimeout(() => {
      console.log(`Uploading file: ${selectedFile.name}`);
      // In a real app, you would process the file here
      
      setIsUploading(false);
      setSelectedFile(null);
      // After processing, you might extract questions and add them
      // For demo, we'll just add a placeholder question
      const newQuestion = {
        id: `Q-${1009 + questions.length}`,
        type: 'Multiple Choice',
        question: `Question from ${selectedFile.name}`,
        difficulty: 'Medium',
        created: 'Mar 17, 2025',
        used: '0 times'
      };
      
      setQuestions([...questions, newQuestion]);
      setShowModal(false);
    }, 1500);
  };


  // Toggle selection of a single question
const toggleQuestionSelection = (id: string) => {
  if (selectedQuestions.includes(id)) {
    setSelectedQuestions(selectedQuestions.filter(qId => qId !== id));
  } else {
    setSelectedQuestions([...selectedQuestions, id]);
  }
};

// Toggle selection of all questions
const toggleSelectAll = () => {
  if (selectAll) {
    setSelectedQuestions([]);
  } else {
    setSelectedQuestions(questions.map(q => q.id));
  }
  setSelectAll(!selectAll);
};

// Toggle expanded state of a question (show/hide answers)
const toggleExpandQuestion = (id: string) => {
  if (expandedQuestions.includes(id)) {
    setExpandedQuestions(expandedQuestions.filter(qId => qId !== id));
  } else {
    setExpandedQuestions([...expandedQuestions, id]);
  }
};

// Handle bulk actions on selected questions
const handleBulkAction = (action: 'delete' | 'archive' | 'export') => {
  if (action === 'delete' && selectedQuestions.length > 0) {
    setQuestions(questions.filter(q => !selectedQuestions.includes(q.id)));
    setSelectedQuestions([]);
    setSelectAll(false);
    // Also update expanded questions
    setExpandedQuestions(expandedQuestions.filter(id => !selectedQuestions.includes(id)));
  }
};


  // Get badge color based on question type
  const getBadgeColor = (type: string) => {
    switch(type) {
      case 'Multiple Choice':
        return 'bg-blue-100 text-blue-800';
      case 'Short Answer':
        return 'bg-green-100 text-green-800';
      case 'Essay':
        case 'True/False':
      return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get color for difficulty indicator
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Easy':
        return 'text-green-500';
      case 'Medium':
        return 'text-yellow-500';
      case 'Hard':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };
// Render answers based on question type
const renderAnswers = (question: { id: any; type: any; question?: string; difficulty?: string; created?: string; used?: string; answers?: any; answer?: any; rubric?: any; }) => {
  const isExpanded = expandedQuestions.includes(question.id);
  if (!isExpanded) return null;

  switch(question.type) {
    case 'Multiple Choice':
      return (
        <div className="mt-4 border-t pt-3">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Answer Options:</h4>
          <ul className="space-y-1">
            {question.answers.map((answer: { correct: any; text: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, index: React.Key | null | undefined) => (
              <li key={index} className="flex items-start">
                <div className={`flex-shrink-0 w-4 h-4 mt-1 rounded-full border ${answer.correct ? 'bg-green-500 border-green-600' : 'bg-white border-gray-300'}`}></div>
                <span className={`ml-2 text-sm ${answer.correct ? 'font-medium text-green-700' : 'text-gray-700'}`}>
                  {answer.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
    case 'Short Answer':
      return (
        <div className="mt-4 border-t pt-3">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Sample Answer:</h4>
          <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{question.answer}</p>
        </div>
      );
    case 'Essay':
      return (
        <div className="mt-4 border-t pt-3">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Rubric:</h4>
          <p className="text-sm text-gray-600">{question.rubric || "No rubric available."}</p>
        </div>
      );
    case 'True/False':
      return (
        <div className="mt-4 border-t pt-3">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Correct Answer:</h4>
          <div className={`inline-block px-2 py-1 rounded text-sm font-medium ${question.answer ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {question.answer ? 'True' : 'False'}
          </div>
        </div>
      );
    default:
      return null;
  }
};

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Top filter bar */}
    <div className="flex justify-between items-center mb-6">
      <div className="flex space-x-2">
        {/* <select 
          className="border rounded px-3 py-2"
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
        >
          <option>All Categories</option>
          <option>Math</option>
          <option>Science</option>
          <option>History</option>
        </select> */}
        
        <select 
          className="border rounded px-3 py-2"
          value={difficultyFilter}
          onChange={e => setDifficultyFilter(e.target.value)}
        >
          <option>All Difficulty</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
        
        <select 
          className="border rounded px-3 py-2"
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
        >
           <option>All Types</option>
          <option>Essay</option>
          <option>Multiple Choice</option>
          <option>Short Answer</option>
          <option>True/False</option>
        </select>
      </div>
      
      <div className="flex space-x-2">
        {selectedQuestions.length > 0 && (
          <button 
            className=" bg-green-600 text-white rounded hover:bg-green-700"
           
            onClick={() => navigate('/maker/SelectedQuestionQB')}>
             Next ({selectedQuestions.length})
          </button>
        )}
        <button 
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          onClick={() => setShowModal(true)}
        >
          Create New Question
        </button>
      </div>
    </div>

      {/* Select all checkbox */}
    <div className="mb-4 flex items-center">
      <input 
        type="checkbox" 
        id="select-all" 
        className="rounded border-gray-300 text-indigo-600"
        checked={selectAll}
        onChange={toggleSelectAll}
      />
      <label htmlFor="select-all" className="ml-2 text-sm text-gray-700">
        Select All Questions
      </label>
      {selectedQuestions.length > 0 && (
        <span className="ml-4 text-sm text-gray-500">
          {selectedQuestions.length} question{selectedQuestions.length !== 1 ? 's' : ''} selected
        </span>
      )}
      </div>

      {/* Question grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {currentQuestions.map(question=> (
        <div key={question.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 text-indigo-600 mr-2"
                  checked={selectedQuestions.includes(question.id)}
                  onChange={() => toggleQuestionSelection(question.id)}
                />
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${getBadgeColor(question.type)}`}>
                  {question.type}
                </span>
              </div>
              <span className="text-gray-500 text-xs">ID: {question.id}</span>
            </div>
     
            
            <h3 className="font-medium text-gray-900 mb-2">{question.question}</h3>
            
            <div className="flex items-center justify-between mb-4">
              <span className={`flex items-center ${getDifficultyColor(question.difficulty)}`}>
                <span className="w-2 h-2 rounded-full bg-current mr-1"></span>
                {question.difficulty}
              </span>
              
              <button 
                onClick={() => toggleExpandQuestion(question.id)}
                className="text-xs text-indigo-600 hover:text-indigo-800"
              >
                {expandedQuestions.includes(question.id) ? 'Hide Answer' : 'Show Answer'}
              </button>
            </div>
            
            {renderAnswers(question)}
            
            <div className="flex justify-between text-xs text-gray-500 mt-4">
              <div>Created: {question.created}</div>
              <div>Used: {question.used}</div>
            </div>
          </div>
          
          
          <div className="border-t flex">
            <button 
              onClick={() => handleEdit(question.id)}
              className="w-1/2 py-2 text-blue-600 hover:bg-blue-50 transition-colors"
            >
              Edit
            </button>
            <button 
              onClick={() => handleDelete(question.id)}
              className="w-1/2 py-2 text-red-600 hover:bg-red-50 transition-colors border-l"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  



      
      {/* Pagination */}
      {/* Pagination */}
<div className="mt-6 flex justify-center">
  <nav className="flex">
    <button 
      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      className={`px-3 py-1 bg-white border border-gray-300 rounded-l-md ${
        currentPage === 1 ? 'text-gray-300' : 'hover:bg-gray-100'
      }`}
    >
      «
    </button>
    
    {/* Generate page buttons */}
    {[...Array(totalPages)].map((_, i) => (
      <button
        key={i}
        onClick={() => setCurrentPage(i + 1)}
        className={`px-3 py-1 border ${
          currentPage === i + 1 
            ? 'bg-indigo-600 border-indigo-600 text-white' 
            : 'bg-white border-gray-300 hover:bg-gray-100'
        }`}
      >
        {i + 1}
      </button>
    ))}
    
    <button 
      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
      className={`px-3 py-1 bg-white border border-gray-300 rounded-r-md ${
        currentPage === totalPages ? 'text-gray-300' : 'hover:bg-gray-100'
      }`}
    >
      »
    </button>
  </nav>
</div>
      
      {/* Create Question Modal (hidden by default) */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-medium mb-4">Create New Question</h2>
            
            {/* Add file upload section */}
      <div className="mb-4 border-b pb-4">
        <h3 className="text-md font-medium mb-2">Import Questions</h3>
        <div className="flex items-center">
          <button 
            onClick={handleUploadClick}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 border rounded mr-2"
          >
            Select File
          </button>
          <span className="text-sm text-gray-500">
            {selectedFile ? selectedFile.name : "No file selected"}
          </span>
        </div>
        {selectedFile && (
          <div className="mt-2">
            <button 
              onClick={handleFileUpload}
              disabled={isUploading}
              className={`px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 ${
                isUploading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              >
              {isUploading ? 'Uploading...' : 'Upload File'}
            </button>
          </div>
        )}
      </div>
      
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Question Type</label>
              <select className="w-full border rounded px-3 py-2">
              <option>All Types</option>
                <option>Multiple Choice</option>
                <option>True/False</option>
                <option>Short Answer</option>
                <option>Essay</option>
              </select>
            </div>
            
           
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Question</label>
              <textarea className="w-full border rounded px-3 py-2" rows={3} placeholder="Enter your question"></textarea>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Difficulty</label>
              <select className="w-full border rounded px-3 py-2">
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button 
                className="px-4 py-2 border rounded hover:bg-gray-100"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionManagementApp;