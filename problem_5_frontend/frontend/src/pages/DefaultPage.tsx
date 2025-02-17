import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const DefaultPage = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    console.log("accessToken 123",accessToken)
    if (!accessToken) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <Header/>
      <main>{children}</main>
      {/* <div>Footer</div> */}
    </div>
  );
};

export default DefaultPage;
