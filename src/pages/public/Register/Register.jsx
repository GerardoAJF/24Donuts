import React from 'react';
import Navbar from '../../../components/public/Navbar/Navbar';
import RegisterForm from '../../../components/public/RegisterForm/RegisterForm.jsx';
import Footer from '../../../components/public/Foteer/Foteer.jsx';
import './Register.css';

function Register() {
  return (
    <div className="register-page-wrapper">
      <Navbar />
      <main className="register-main-content">
        <RegisterForm />
      </main>
      <Footer />
    </div>
  );
}

export default Register;