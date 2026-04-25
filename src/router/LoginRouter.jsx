import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import RegisterAdmin from '../pages/private/LoginForms/RegisterAdmin/RegisterAdmin';
import AdminConfig from '../pages/private/LoginForms/AdminConfig/AdminConfig';
import ForgotEmail from '../pages/private/LoginForms/ForgotEmail/ForgotEmail';
import ForgotOTP from '../pages/private/LoginForms/ForgotOTP/ForgotOTP';
import ResetPassword from '../pages/private/LoginForms/ResetPassword/ResetPassword';
import Login from '../pages/private/LoginForms/Login/Login';

const LoginRouter = () => {
  return (
    <Routes>
     
      <Route path="registro-inicial" element={<RegisterAdmin />} />
      

      <Route path="configuracion-inicial" element={<AdminConfig />} />
           
      <Route path="recuperar-correo" element={<ForgotEmail />} />
      <Route path="validar-pin" element={<ForgotOTP />} />
      <Route path="nueva-contrasena" element={<ResetPassword />} />

      
      <Route path="login" element={<Login />} />

      <Route path="/" element={<Navigate to="registro-inicial" />} />

      <Route path="/recuperar-email" element={<ForgotEmail />} />
    </Routes>
  );
};

export default LoginRouter;