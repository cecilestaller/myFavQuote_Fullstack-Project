import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Register from "./pages/register/Register";
import VerifyEmail from "./pages/verifyEmail/VerifyEmail";
import Login from "./pages/login/Login";
import LoadingWrapper from "./components/LoadingWrapper";
import QuoteOverview from "./pages/quoteOverview/QuoteOverview";

function App() {
    // states for login and silentRefresh
    const [authorization, setAuthorization] = useState(null);
    const [userProfileInfo, setUserProfileInfo] = useState(null);
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/dashboard"
                        element={
                            <LoadingWrapper
                                authorization={authorization}
                                saveAuthorization={(auth) =>
                                    setAuthorization(auth)
                                }
                                userProfileInfo={userProfileInfo}
                            >
                                <Dashboard
                                    authorization={authorization}
                                    userProfileInfo={userProfileInfo}
                                    onLogout={() => setAuthorization(null)}
                                />
                            </LoadingWrapper>
                        }
                    />
                    <Route
                        path="/overview"
                        element={
                            <LoadingWrapper
                                authorization={authorization}
                                saveAuthorization={(auth) =>
                                    setAuthorization(auth)
                                }
                                userProfileInfo={userProfileInfo}
                            >
                                <QuoteOverview
                                    authorization={authorization}
                                    userProfileInfo={userProfileInfo}
                                    onLogout={() => setAuthorization(null)}
                                />
                            </LoadingWrapper>
                        }
                    />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/verify-email/:userId"
                        element={<VerifyEmail />}
                    />
                    <Route
                        path="/login"
                        element={
                            <Login
                                onLoginSuccess={(
                                    authorization,
                                    userProfileInfo
                                ) => {
                                    setAuthorization(authorization);
                                    setUserProfileInfo(userProfileInfo);
                                }}
                            />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
