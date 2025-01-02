import React from 'react';
import { useNavigate } from 'react-router-dom';

const ExamCreationOptions = () => {
        const navigate = useNavigate();

        const handleOptionClick = (path) => {
                navigate(path);
        };

        return (
                <div className="min-h-screen bg-white p-8">
                        <div className="max-w-2xl mx-auto space-y-4">
                                {/* AI Generation Option */}
                                <div
                                        onClick={() => handleOptionClick('/maker/create-exam/ai')}
                                        className="bg-emerald-50 p-6 rounded-xl flex justify-between items-center cursor-pointer hover:shadow-md transition-all"
                                >
                                        <div>
                                                <h2 className="text-lg font-semibold text-gray-800">AI Generation</h2>
                                                <p className="text-sm text-emerald-500">Create Exam Using AI</p>
                                        </div>
                                        <div className="text-emerald-500">
                                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                        <text x="8" y="16" fontSize="8" fill="currentColor">AI</text>
                                                </svg>
                                        </div>
                                </div>

                                {/* Question Bank Option */}
                                <div
                                        onClick={() => handleOptionClick('/create-exam/question-bank')}
                                        className="bg-blue-50 p-6 rounded-xl flex justify-between items-center cursor-pointer hover:shadow-md transition-all"
                                >
                                        <div>
                                                <h2 className="text-lg font-semibold text-gray-800">Question Bank</h2>
                                                <p className="text-sm text-blue-500">Create Exam Using Question Bank</p>
                                        </div>
                                        <div className="text-blue-500">
                                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                        <path d="M6 12h12" />
                                                        <path d="M6 16h12" />
                                                        <path d="M6 8h12" />
                                                </svg>
                                        </div>
                                </div>

                                {/* Hybrid Option */}
                                <div
                                        onClick={() => handleOptionClick('/create-exam/hybrid')}
                                        className="bg-red-50 p-6 rounded-xl flex justify-between items-center cursor-pointer hover:shadow-md transition-all"
                                >
                                        <div>
                                                <h2 className="text-lg font-semibold text-gray-800">Hybrid</h2>
                                                <p className="text-sm text-red-400">Create Exam Using AI and Question Bank</p>
                                        </div>
                                        <div className="text-red-400">
                                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                        <path d="M6 12h12" />
                                                </svg>
                                        </div>
                                </div>

                                {/* Next Button */}
                                <div className="flex justify-end mt-8">
                                        <button
                                                onClick={() => handleOptionClick('/next-step')}
                                                className="bg-blue-100 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-200 transition-colors flex items-center gap-2"
                                        >
                                                Next
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M9 18l6-6-6-6" />
                                                </svg>
                                        </button>
                                </div>
                        </div>
                </div>
        );
};

export default ExamCreationOptions;