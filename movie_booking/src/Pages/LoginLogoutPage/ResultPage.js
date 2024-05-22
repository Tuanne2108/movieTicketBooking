import React from 'react';
import { useLocation } from 'react-router-dom';

const ResultPage = () => {
  const location = useLocation();
  const { email, firstName, lastName, password } = location.state || {};

  return (
    <div className="resultPage">
      <h1>Signup Successful</h1>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>First Name:</strong> {firstName}</p>
      <p><strong>Last Name:</strong> {lastName}</p>
      <p><strong>Password:</strong> {password}</p> {/* Not recommended to show password in a real application */}
    </div>
  );
};

export default ResultPage;
