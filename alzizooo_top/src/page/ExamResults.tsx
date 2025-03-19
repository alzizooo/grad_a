
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';


const ExamResultsDashboard = () => {
  const navigate = useNavigate();
  
  // Sample data based on the image - Part field removed
  const initialData = [
    { id: '211006655', name: 'Mohamed Ahmed', exam: 'Compiler Design', grade: '55/60', endTime: '09:27 AM', status: 'Pass', date: '11/12/2024' },
    { id: '211006656', name: 'Hazem Mohamed', exam: 'Compiler Design', grade: '29/60', endTime: '10:15 AM', status: 'Fail', date: '11/12/2024' },
    { id: '211006657', name: 'Mostafa Mahmoud', exam: 'Compiler Design', grade: '15/60', endTime: '10:24 AM', status: 'Fail', date: '11/12/2024' },
    { id: '211006658', name: 'Mahmoud Ali', exam: 'Compiler Design', grade: '45/60', endTime: '09:10 AM', status: 'Pass', date: '11/12/2024' },
    { id: '211006659', name: 'Omar Mohamed', exam: 'Compiler Design', grade: '50/60', endTime: '09:15 AM', status: 'Pass', date: '11/12/2024' },
    { id: '211006660', name: 'Adam Ibrahim', exam: 'Compiler Design', grade: '40/60', endTime: '09:29 AM', status: 'Pass', date: '11/12/2024' },
    { id: '211006664', name: 'zzz', exam: 'Compiler Design', grade: '25/60', endTime: '09:29 AM', status: 'Fail', date: '11/12/2024' }
  ];

  const [examData, setExamData] = useState(initialData);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  
  // Handle navigation on student name click
  const handleNameClick = (id) => {
    navigate(`./ExamResultDetails/${id}`);
    
  };
  
  // Removed handlePartClick function since Part column is removed
  
  // Mock export functions
  const exportToPDF = () => {
    console.log("Exporting to PDF...");
    alert("Exporting to PDF format");
    setShowExportDropdown(false);
  };
  
  const exportToXLSX = () => {
    console.log("Exporting to XLSX...");
    alert("Exporting to Excel format");
    setShowExportDropdown(false);
  };

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
        {/* Search and filter section */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex justify-between items-center">
            <div className="font-medium text-lg">Results (60)</div>
            <div className="flex">
              <div className="mr-2">
                <select className="border border-gray-300 rounded px-4 py-2 bg-white">
                  <option>Grouping</option>
                </select>
              </div>
              <button className="bg-white p-2 rounded-full border border-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Grades Overview Section */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 flex justify-between items-center border-b">
            <h2 className="text-lg font-medium">Grades Overview</h2>
            <button className="text-green-600 hover:text-green-800">View All</button>
          </div>
          
          {/* Table - Part column removed */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Exam Taker Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Exam Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Grade
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    End Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Exam Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Id
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {examData.map((student) => (
                  <tr key={student.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 cursor-pointer hover:underline" onClick={() => handleNameClick(student.id)}>
                      {student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.exam}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.grade}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.endTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        student.status === 'Pass' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.id}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Export Button with Dropdown */}
        <div className="mt-6 relative">
          <button 
            className="bg-blue-100 text-blue-700 px-6 py-2 rounded-full flex items-center hover:bg-blue-200 transition-colors"
            onClick={() => setShowExportDropdown(!showExportDropdown)}
          >
            Export
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ml-2 transition-transform ${showExportDropdown ? 'rotate-90' : ''}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          {showExportDropdown && (
            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1" role="menu" aria-orientation="vertical">
                <button
                  onClick={exportToPDF}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  role="menuitem"
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Export as PDF
                  </div>
                </button>
                <button
                  onClick={exportToXLSX}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  role="menuitem"
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Export as Excel
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ExamResultsDashboard;