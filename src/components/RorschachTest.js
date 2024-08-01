// src/components/RorschachTest.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RorschachTest = () => {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    // Fetch initial data if needed
    axios.get('/api/rorschach-responses')
      .then((response) => {
        setResponses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h2>Rorschach Test</h2>
      {/* Render responses */}
    </div>
  );
};

export default RorschachTest;
