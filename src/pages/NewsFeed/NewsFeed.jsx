// src/components/News/News.tsx
import React, { useState, useEffect } from 'react';

const NewsFeed= () => {
  const [news, setNews] = useState([]);
  useEffect(() => {
    // Fetch news from the server or an API endpoint
    // For now, let's assume a mock API response
    const mockApiResponse = [
      { id: 1, title: 'Company Expansion', content: 'We are excited to announce our expansion into new markets.' },
      { id: 2, title: 'Product Launch', content: 'Introducing our latest product with innovative features.' },
      { id: 3, title: 'Achievements', content: 'Celebrating milestones and achievements in our journey.' },
      // Add more news articles as needed
    ];

    setNews(mockApiResponse);
  }, []);

  return (
    <div>
      <h2>Company News</h2>
      <ul>
        {news.map((article) => (
          <li key={article.id}>
            <h3>{article.title}</h3>
            <p>{article.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsFeed;
