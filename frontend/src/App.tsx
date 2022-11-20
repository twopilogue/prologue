import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Header from "components/Header";
import Landing from "pages/LandingPage";
import Create from "pages/CreatePage";
import Dashboard from "pages/DashboardPage";
import SettingPage from "pages/SettingPage";
import PostRouterPage from "pages/PostRouterPage";
import BlogReset from "pages/BlogResetPage";
import GatsbyLayout from "pages/GatsbyLayoutPage";
import PageRouterPage from "pages/PageRouterPage";
import LoginOAuthHandler from "features/landing/LoginOAuthHandler";
import AuthRoute from "./AuthRoute";

function App() {
  const location = useLocation();

  const dashboardStyle = {
    backgroundColor: "#F1F8FF",
    height: "100vh",
  };

  const landingStyle = {
    height: "100vh",
  };

  return (
    <div
      style={
        location.pathname === "/dashboard"
          ? dashboardStyle
          : ["/login", "/"].includes(location.pathname)
          ? landingStyle
          : {}
      }
    >
      <Header />
      <div
        style={{
          width: !["/login", "/"].includes(location.pathname) && "83vw",
          margin: "0 auto",
          paddingTop: !["/login", "/"].includes(location.pathname) && "47px",
        }}
      >
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginOAuthHandler />} />

          <Route path="/create" element={<AuthRoute component={<Create />} />} />
          <Route path="/create/reset" element={<AuthRoute component={<BlogReset />} />} />
          <Route path="/create/gatsby" element={<AuthRoute component={<GatsbyLayout />} />} />
          <Route path="/dashboard" element={<AuthRoute component={<Dashboard />} />} />
          <Route path="/setting" element={<AuthRoute component={<SettingPage />} />} />
          <Route path="/post/*" element={<AuthRoute component={<PostRouterPage />} />} />
          <Route path="/page/*" element={<AuthRoute component={<PageRouterPage />} />} />

          <Route path="*" element={<Landing />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
