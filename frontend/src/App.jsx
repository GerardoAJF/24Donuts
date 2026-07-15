import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginRouter from "./router/LoginRouter.jsx";
import AdminRouter from "./router/AdminRouter.jsx";
import PublicRouter from "./router/PublicRouter.jsx";
import PrivateRoute from "./router/PrivateRouter.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import "./App.css";

const App = () => {
    return (
        <BrowserRouter>
            <ToastProvider>
                <AuthProvider>
                    <Routes>
                        <Route path="/auth/*" element={<LoginRouter />} />

                        <Route element={<PrivateRoute />}>
                            <Route path="/admin/*" element={<AdminRouter />} />
                        </Route>

                        <Route path="/*" element={<PublicRouter />} />
                    </Routes>
                </AuthProvider>
            </ToastProvider>
        </BrowserRouter>
    );
};

export default App;
