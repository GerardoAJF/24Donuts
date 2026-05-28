import React from 'react';
import Navbar from '../../../components/public/Navbar/Navbar.jsx';
import LoginForm from '../../../components/public/LoginForm/LoginForm.jsx';
import Footer from '../../../components/public/Foteer/Foteer.jsx';
import './Login.css';

function Login() {
  return (
    <div className="login-page-wrapper">
      <Navbar />
      
      <main className="login-main-content">
        <LoginForm />
      </main>

      <Footer />
    </div>
  );
}

export default Login;