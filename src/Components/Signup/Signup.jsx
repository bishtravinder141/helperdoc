// src/components/Signup/Signup.tsx
import React, { ChangeEvent } from 'react';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import { useDispatch, useSelector } from 'react-redux';
// import { setRole, updateFormData } from '../../redux/actions/userActions';
// import { RootState } from '../../redux/reducers/userReducers';
// import './Signup.css'; // Import the CSS file

const Signup = () => {
  const navigate = useNavigate();
//   const dispatch = useDispatch();
  const { t } = useTranslation();
//   const { role, formData } = useSelector((state) => state);

  const handleSignup = async () => {
    // try {
    //   const response = await fetch('http://192.168.1.155:5000/api/users/signup', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ username: formData.username, password: formData.password, roles: [role] }),
    //   });

    //   const result = await response.json();
    //   if (result.success) {
    //     navigate('/login');
    //   } else {
    //     navigate('/signup');
    //   }
    // } catch (error) {
    //   // Handle signup error
    // }
  };

  const handleRoleChange = (e) => {
    // dispatch(setRole(e.target.value));
  };

  const handleInputChange = (e) => {
    // dispatch(updateFormData({ ...formData, [e.target.name]: e.target.value }));
  };

  return (
    <Container className="homeContainer pageContainer">
      <div className="signupContainer">
        <h2>{t('signup')}</h2>
        <input
          type="text"
          name="username"
          placeholder={t('username_placeholder')}
        //   value={formData.username}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder={t('password_placeholder')}
        //   value={formData.password}
          onChange={handleInputChange}
        />
        <label>
          {t('role')}:
          <select
            // value={role}
            onChange={handleRoleChange}
          >
            <option value="user">User</option>
            <option value="jobseeker">Job Seeker</option>
            <option value="jobprovider">Job Provider</option>
          </select>
        </label>
        <button onClick={handleSignup}>{t('signup')}</button>
      </div>
    </Container>
  );
};

export default Signup;