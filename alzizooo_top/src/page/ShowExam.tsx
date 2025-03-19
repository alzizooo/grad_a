import React, { useState } from 'react';

const CompactExamDashboard = () => {
  // Sample exam data with questions as a flat list
  const [examData] = useState({
    title: "Computer Science Fundamentals",
    subject: "CS 101",
    dateCreated: "2025-02-15",
    lastModified: "2025-03-10",
    examDate: "2025-03-25",
    examTime: "10:00 AM - 12:00 PM",
    duration: 120,
    location: "Hall B, Computer Science Building",
    status: "Published",
    author: "Prof. Jane Smith",
    totalQuestions: 15,
    totalPoints: 30,
    passingScore: 70,
    questions: [
      {
        id: 101,
        text: "Which of the following is NOT a primitive data type in Java?",
        type: "Multiple Choice",
        points: 2,
        difficulty: "Easy",
        options: [
          { id: "A", text: "int" },
          { id: "B", text: "boolean" },
          { id: "C", text: "String" },
          { id: "D", text: "char" }
        ],
        correctAnswer: "C"
      },
      {
        id: 102,
        text: "What will be the output of the following code?\n\nint x = 5;\nSystem.out.println(x++);\nSystem.out.println(x);",
        type: "Multiple Choice",
        points: 2,
        difficulty: "Medium",
        options: [
          { id: "A", text: "5, 5" },
          { id: "B", text: "5, 6" },
          { id: "C", text: "6, 6" },
          { id: "D", text: "6, 5" }
        ],
        correctAnswer: "B"
      },
      {
        id: 103,
        text: "In Python, which of the following correctly creates a dictionary?",
        type: "Multiple Choice",
        points: 2,
        difficulty: "Medium",
        options: [
          { id: "A", text: "{key1: value1, key2: value2}" },
          { id: "B", text: "[key1, value1, key2, value2]" },
          { id: "C", text: "(key1, value1, key2, value2)" },
          { id: "D", text: "{{key1, value1}, {key2, value2}}" }
        ],
        correctAnswer: "A"
      },
      {
        id: 201,
        text: "Which data structure operates on the First-In-First-Out (FIFO) principle?",
        type: "Multiple Choice",
        points: 2,
        difficulty: "Easy",
        options: [
          { id: "A", text: "Stack" },
          { id: "B", text: "Queue" },
          { id: "C", text: "Tree" },
          { id: "D", text: "Heap" }
        ],
        correctAnswer: "B"
      },
      {
        id: 202,
        text: "What is the time complexity of searching for an element in a balanced binary search tree?",
        type: "Multiple Choice",
        points: 2,
        difficulty: "Medium",
        options: [
          { id: "A", text: "O(1)" },
          { id: "B", text: "O(log n)" },
          { id: "C", text: "O(n)" },
          { id: "D", text: "O(n²)" }
        ],
        correctAnswer: "B"
      },
      {
        id: 301,
        text: "What is the worst-case time complexity of Quicksort?",
        type: "Multiple Choice",
        points: 2,
        difficulty: "Medium",
        options: [
          { id: "A", text: "O(n log n)" },
          { id: "B", text: "O(n²)" },
          { id: "C", text: "O(n)" },
          { id: "D", text: "O(log n)" }
        ],
        correctAnswer: "B"
      },
      {
        id: 302,
        text: "Which sorting algorithm is both stable and has O(n log n) worst-case time complexity?",
        type: "Multiple Choice",
        points: 2,
        difficulty: "Medium",
        options: [
          { id: "A", text: "Quicksort" },
          { id: "B", text: "Heapsort" },
          { id: "C", text: "Mergesort" },
          { id: "D", text: "Selection Sort" }
        ],
        correctAnswer: "C"
      }
    ]
  });

  // Function to handle printing
  const handlePrint = () => {
    window.print();
  };

  // Function to handle export
  const handleExport = () => {
    // Create a JSON string of the exam data
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(examData));
    
    // Create a download link and trigger the download
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${examData.title.replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-50">
      {/* Exam Header */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold">{examData.title}</h1>
            <h2 className="text-gray-600">{examData.subject}</h2>
          </div>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
            {examData.status}
          </span>
        </div>
      </div>
      
      {/* Exam Details */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <h3 className="text-md font-medium mb-3">Exam Details</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div>
            <p className="text-gray-500">Date</p>
            <p className="font-medium">{examData.examDate}</p>
          </div>
          <div>
            <p className="text-gray-500">Time</p>
            <p className="font-medium">{examData.examTime}</p>
          </div>
          <div>
            <p className="text-gray-500">Duration</p>
            <p className="font-medium">{examData.duration} minutes</p>
          </div>
          <div>
            <p className="text-gray-500">Location</p>
            <p className="font-medium">{examData.location}</p>
          </div>
          <div>
            <p className="text-gray-500">Author</p>
            <p className="font-medium">{examData.author}</p>
          </div>
          <div>
            <p className="text-gray-500">Questions</p>
            <p className="font-medium">{examData.questions.length}</p>
          </div>
          <div>
            <p className="text-gray-500">Total Points</p>
            <p className="font-medium">{examData.totalPoints}</p>
          </div>
          <div>
            <p className="text-gray-500">Passing Score</p>
            <p className="font-medium">{examData.passingScore}%</p>
          </div>
        </div>
      </div>
      
      {/* Questions List */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <h3 className="text-md font-medium mb-3">Questions</h3>
        
        <div className="border rounded-md">
          <div className="p-3">
            {examData.questions.map((question) => (
              <div key={question.id} className="mb-4 border-b pb-3 last:border-b-0 last:pb-0">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-medium">{question.id}. {question.text}</p>
                  <div className="flex space-x-2 text-xs">
                    <span className="bg-gray-100 px-2 py-1 rounded">{question.type}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">{question.difficulty}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">{question.points} pts</span>
                  </div>
                </div>
                
                {question.options && (
                  <div className="ml-4 grid grid-cols-1 md:grid-cols-2 gap-1 text-sm">
                    {question.options.map((option) => (
                      <div 
                        key={option.id}
                        className={`p-2 rounded ${option.id === question.correctAnswer ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}
                      >
                        {option.id}. {option.text}
                        {option.id === question.correctAnswer && (
                          <span className="text-green-600 ml-1">✓</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-end space-x-3">
        <button 
          onClick={handlePrint}
          className="px-4 py-2 bg-gray-100 rounded-md flex items-center text-sm hover:bg-gray-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
          </svg>
          Print Exam
        </button>
        <button 
          onClick={handleExport}
          className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center text-sm hover:bg-blue-600"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
          </svg>
          Export Exam
        </button>
      </div>
    </div>
  );
};

export default CompactExamDashboard;