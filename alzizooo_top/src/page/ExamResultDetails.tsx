
import React from 'react';

const ExamResultDetails = ({ student = {
  id: '211006664',
  name: 'zzz ',
  grade: '25/60',
  percentage: '25%',
  result: 'Failed Test',
  totalTime: '00:00:20 / 00:45:00',
  startTime: '12:00 PM',
  endTime: '12:45 PM',
  date: '11/12/2024',
  questions: [
    { id: 'Q1', text: 'What Type Of Process Initiates Communication In Network Application', score: '1/1' },
    { id: 'Q2', text: 'What Type Of Process Initiates Communication In Network Application', score: '0/1' },
    { id: 'Q3', text: 'What Type Of Process Initiates Communication In Network Application', score: '1/1' },
    { id: 'Q4', text: 'What Type Of Process Initiates Communication In Network Application', score: '0/1' }
  ]
} }) => {
  // Parse the percentage string to a number for the comparison
  const percentageValue = parseInt(student.percentage.replace('%', ''), 10);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with logo */}
      <header className="bg-white p-4 shadow">
        <div className="max-w-7xl mx-auto">
          <img src="/api/placeholder/120/40" alt="Smartex Logo" className="h-8" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Respondent Info */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Respondent</h2>
          <div className="flex items-center">
            <div className="bg-gray-200 rounded-full p-3 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span className="text-xl font-medium">{student.name}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Results Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Result</h2>
            <div className="flex flex-col items-center">
              {student.result.includes('Failed') ? (
                <div className="text-red-500 flex items-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-xl">{student.result}</span>
                </div>
              ) : (
                <div className="text-green-500 flex items-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xl">{student.result}</span>
                </div>
              )}
              
              <div className="relative w-40 h-40 mb-4">
                {/* Background circle */}
                <div className="absolute inset-0 rounded-full bg-gray-200"></div>
                
                {/* Progress circle - we'll adjust the stroke-dasharray and stroke-dashoffset in a real app */}
                <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    fill="none" 
                    stroke={percentageValue >= 40 ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"} 
                    strokeWidth="10"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * percentageValue / 100)}
                  />
                </svg>
                
                {/* Percentage text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">{student.percentage}</span>
                  <span className="text-gray-500">{student.grade}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Timer Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Timer</h2>
            <div className="flex items-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-lg font-medium">Total Time</span>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span>{student.totalTime.split(' / ')[0]}</span>
                <span className="text-gray-500">{student.totalTime.split(' / ')[1]}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-green-400 h-2 rounded-full" style={{ width: '5%' }}></div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500">Start Time:</p>
                <p className="font-medium">{student.startTime}</p>
              </div>
              <div>
                <p className="text-gray-500">End Time:</p>
                <p className="font-medium">{student.endTime}</p>
              </div>
              <div>
                <p className="text-gray-500">Date:</p>
                <p className="font-medium">{student.date}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Questions List */}
        <div className="bg-white rounded-lg shadow mb-6">
          {student.questions.map((question, index) => (
            <div key={question.id} className="border-b last:border-b-0 p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-medium">{question.id}. {question.text}</h3>
                </div>
                <div className="flex items-center">
                  <span className={`mr-4 text-lg font-medium ${question.score.startsWith('0') ? 'text-red-500' : 'text-green-500'}`}>
                    {question.score}
                  </span>
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ExamResultDetails;