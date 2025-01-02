import React, { useState } from 'react';
import { Search, Edit2, Trash2, FileText, Clock, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TestCard = ({ title, description, status, created, avgScore }) => {
  const statusStyles = {
    'Setup In Progress': 'bg-pink-100 text-pink-600 border-pink-200',
    'Active': 'bg-green-100 text-green-600 border-green-200',
    'Ended': 'bg-blue-100 text-blue-600 border-blue-200'
  };
  const statusColor = statusStyles[status] || 'bg-gray-100 text-gray-600';
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-4 relative">
      <div className={`absolute left-0 top-6 w-1.5 h-16 ${status === 'Setup In Progress' ? 'bg-pink-400' :
          status === 'Active' ? 'bg-green-400' :
            status === 'Ended' ? 'bg-blue-400' : 'bg-gray-400'
        }`} />
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className={`inline-block px-4 py-1 rounded-full text-sm ${statusColor} mb-3`}>
            {status}
          </span>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">{description || '(Description)'}</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <Edit2 className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <Trash2 className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <FileText className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-6 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{avgScore}% avg. Score</span>
        </div>
        <button className="text-gray-500 hover:text-gray-700">Results</button>
        <span className="text-gray-400">Created {created}</span>
      </div>
    </div>
  );
};
const TestListing = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const tests = [
    {
      id: 1,
      title: 'CSCI463: Introduction To Computer Network',
      description: '(Description)',
      status: 'Setup In Progress',
      created: '12/10/2024',
      avgScore: 85
    },
    {
      id: 2,
      title: 'CSCI415: Compiler Design',
      description: '(Description)',
      status: 'Active',
      created: '11/10/2024',
      avgScore: 89
    },
    {
      id: 3,
      title: 'CSCI322: Data Analysis',
      description: '(Description)',
      status: 'Ended',
      created: '10/10/2024',
      avgScore: 67
    },
    {
      id: 4,
      title: 'Introduction To Computer Network',
      description: '(Description)',
      status: 'Setup In Progress',
      created: '10/10/2024',
      avgScore: 91
    }
  ];
  const filteredTests = tests.filter(test => {
    const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || test.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleNewTest = () => {
    navigate('/maker/create-exam');
  };
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-xl font-semibold mb-4">My Tests ({tests.length})</h1>
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="search"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-white rounded-lg border hover:bg-gray-100 hover:shadow-md transition-all flex items-center gap-2">
              Categories
            </button>
            <div className="relative w-40">
              <button
                className="w-full px-4 py-2 text-left bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-between"
                onClick={() => document.getElementById('statusDropdown').click()}
              >
                <span>{selectedStatus}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              <select
                id="statusDropdown"
                className="absolute inset-0 w-full opacity-0 cursor-pointer"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Active">Active</option>
                <option value="Setup In Progress">Setup In Progress</option>
                <option value="Ended">Closed</option>
              </select>
            </div>
            <button
              onClick={handleNewTest}
              className="px-4 py-2 bg-green-400 text-white rounded-lg hover:bg-green-500 transition-colors"
            >
              New Test
            </button>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {filteredTests.map(test => (
          <TestCard key={test.id} {...test} />
        ))}
      </div>
    </div>
  );
};
export default TestListing;