// src/components/TestList.js
import React from 'react';
import { Link } from 'react-router-dom';

const TestList = () => (
  <div>
    <h2>Select a Test</h2>
    <ul>
      <li><Link to="/test/rorschach">Rorschach Test</Link></li>
      <li><Link to="/test/tat">Thematic Apperception Test</Link></li>
    </ul>
  </div>
);

export default TestList;
