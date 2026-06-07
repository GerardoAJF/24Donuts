import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginRouter from "./router/LoginRouter.jsx";
import AdminRouter from "./router/AdminRouter.jsx";
import PublicRouter from "./router/PublicRouter.jsx";
import PrivateRoute from "./router/PrivateRouter.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./App.css";
 
const App = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/auth/*" element={<LoginRouter />} />
 
                    <Route element={<PrivateRoute />}>
                        <Route path="/admin/*" element={<AdminRouter />} />
                    </Route>
 
                    <Route path="/*" element={<PublicRouter />} />
 
                    <Route path="/" element={<Navigate to="/auth/login" replace />} />
 
                    <Route path="*" element={<Navigate to="/auth/login" replace />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
