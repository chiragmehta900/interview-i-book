import React from "react";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "../pages/PageNotFound";
import SplashScreen from "../pages/SplashScreen";
import KitLoader from "../kit/components/KitLoader";
import Login from "../pages/Login";
import ProtectedRoutes from "./ProtectedRoutes";
import Home from "../pages/Home";

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path={'*'} element={
                    <React.Suspense fallback={<KitLoader isLoading />}>
                        <PageNotFound />
                    </React.Suspense>
                }
                />
                <Route
                    path="/"
                    element={
                        <React.Suspense fallback={<KitLoader isLoading />}>
                            <SplashScreen />
                        </React.Suspense>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <React.Suspense fallback={<KitLoader isLoading />}>
                            <Login />
                        </React.Suspense>
                    }
                />
                <Route path="home" element={<ProtectedRoutes />}>
                    <Route
                        path="/home"
                        element={
                            <React.Suspense fallback={<KitLoader isLoading />}>
                                <Home />
                            </React.Suspense>
                        }
                    />
                </Route>
            </Routes>
        </>
    );
};

export default AppRoutes;