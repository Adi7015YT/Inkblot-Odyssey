// src/components/TAT.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TAT = () => {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    // Fetch initial data if needed
    axios.get('/api/tat-responses')
      .then((response) => {
        setResponses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h2>Thematic Apperception Test (TAT)</h2>
      {/* Render responses */}
    </div>
  );
};

export default TAT;
