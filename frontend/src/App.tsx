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
import CustomLayoutPage from "pages/CustomLayoutPage";
import PageRouterPage from "pages/PageRouterPage";
import LoginOAuthHandler from "features/landing/LoginOAuthHandler";
import NotFound from "pages/NotFound";
import AuthRoute from "./AuthRouteTest";
import { useSelector } from "react-redux";
import { rootState } from "app/store";

function App() {
  const location = useLocation();

  const { login } = useSelector((state: rootState) => state.auth);

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
          <Route path="/create" element={<Create />} />
          <Route path="/create/reset" element={<BlogReset />} />
          <Route path="/create/custom" element={<CustomLayoutPage />} />
          <Route path="/create/gatsby" element={<GatsbyLayout />} />

          <Route path="/dashboard" element={<AuthRoute authenticated={login} component={<Dashboard />} />} />
          <Route path="/setting" element={<AuthRoute authenticated={login} component={<SettingPage />} />} />
          <Route path="/post/*" element={<AuthRoute authenticated={login} component={<PostRouterPage />} />} />
          <Route path="/page/*" element={<AuthRoute authenticated={login} component={<PageRouterPage />} />} />

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
