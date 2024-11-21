// components/SearchUser/SearchUser.tsx
import React, { useState, useEffect, ChangeEvent } from 'react';
import { getUsersByRole, User } from '../../services/userService';

const SearchUser = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Assuming 'user' is the role you want to search for
        const users = await getUsersByRole('jobprovider');
        setSearchResults(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures the effect runs once on component mount

  const filterUsers = () => {
    const filteredUsers = searchResults.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredUsers);
  };

  useEffect(() => {
    filterUsers();
  }, [searchTerm]); // Re-run filterUsers whenever searchTerm changes

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by username..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ul>
        {searchResults.map((user) => (
          <li key={user._id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchUser;
