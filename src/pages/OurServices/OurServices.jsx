// src/components/OurServices/OurServices.tsx
import React, { useState, useEffect } from "react";

const OurServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Fetch services from the server or an API endpoint
    // For now, let's assume a mock API response
    const mockApiResponse = [
      {
        id: 1,
        name: "Web Development",
        description: "Creating awesome websites.",
      },
      {
        id: 2,
        name: "Mobile App Development",
        description: "Building cross-platform mobile apps.",
      },
      {
        id: 3,
        name: "Digital Marketing",
        description: "Promoting products through online channels.",
      },
      // Add more services as needed
    ];

    setServices(mockApiResponse);
  }, []);

  return (
    <div>
      <h2>Our Services</h2>
      <ul>
        {services.map((service) => (
          <li key={service.id}>
            <h3>{service.name}</h3>
            <p>{service.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OurServices;
