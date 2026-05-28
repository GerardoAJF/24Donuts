import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginRouter from "./router/LoginRouter.jsx";
import AdminRouter from "./router/AdminRouter.jsx";
import PublicRouter from "./router/PublicRouter.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./App.css";

const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/auth/*" element={<LoginRouter />} />
                    <Route path="/admin/*" element={<AdminRouter />} />
                    <Route path="/*" element={<PublicRouter />} />
                    <Route path="/" element={<Navigate to="/auth/registro-inicial" />} />
                    <Route path="*" element={<Navigate to="/auth/registro-inicial" />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
