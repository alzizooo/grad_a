import React from 'react';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course, borderColor }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate('/maker/QB')} 
      className="block mb-6 cursor-pointer"
    >
      <div className="flex border border-gray-200 rounded-lg overflow-hidden hover:bg-gray-50 hover:border-gray-300 transition-all">
        {/* Colored border */}
        <div 
          className="w-2" 
          style={{ backgroundColor: borderColor }}
        ></div>
        
        {/* Card content */}
        <div className="p-4 flex-grow">
          <h2 className="text-lg font-medium mb-2">{course.title}</h2>
          
          <div className="flex items-center text-sm text-gray-500 pt-2">
            <div>Created: {course.created}</div>
          </div>
        </div>
        
        {/* Navigation indicator */}
        <div className="flex items-center pr-4">
          <span className="text-gray-400 text-xl">→</span>
        </div>
      </div>
    </div>
  );
};

const CourseList = () => {
  const courses = [
    {
      path: '/courses/data-analysis',
      title: 'CSCI322: Data Analysis',
      created: 'Mar 1, 2025',
      borderColor: '#FF69B4'
    },
    {
      path: '/courses/compiler-design',
      title: 'CSCI415: Compiler Design',
      created: 'Mar 2, 2025',
      borderColor: '#4BC0C0'
    },
    {
      path: '/courses/computer-network',
      title: 'CSCI463: Introduction To Computer Network',
      created: 'Mar 3, 2025',
      borderColor: '#5DA5DA'
    },
    {
      path: '/courses/data-analysis',
      title: 'CSCI322: Data Analysis',
      created: 'Mar 4, 2025',
      borderColor: '#FF69B4'
    },
    {
      path: '/courses/compiler-design',
      title: 'CSCI415: Compiler Design',
      created: 'Mar 5, 2025',
      borderColor: '#4BC0C0'
    },
    {
      path: '/courses/computer-network',
      title: 'CSCI463: Introduction To Computer Network',
      created: 'Mar 6, 2025',
      borderColor: '#5DA5DA'
    },
  ];

  return (
    <div className="w-full bg-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Courses</h1>
      
      {/* Course list */}
      <div>
        {courses.map(course => (
          <CourseCard 
            key={course.path}
            course={course}
            borderColor={course.borderColor}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseList;
