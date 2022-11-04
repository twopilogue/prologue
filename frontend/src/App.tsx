import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import SamplePage from "./pages/SamplePage";
import Header from "./components/Header";
import Landing from "./pages/LandingPage";
import Create from "./pages/CreatePage";
import Dashboard from "./pages/DashboardPage";
import SettingPage from "pages/SettingPage";
import SettingLayout from "features/setting/SettingLayout";
import LayoutSample from "features/setting/layout/LayoutSample";
import PostPage from "pages/PostPage";
import BlogReset from "pages/BlogResetPage";
import GatsbyLayout from "pages/GatsbyLayoutPage";

function App() {
  return (
    <div>
      <Header />
      <div
        style={{
          width: "83vw",
          margin: "0 auto",
          paddingTop: "47px"
        }}
      >
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/create" element={<Create />} />
          <Route path="/create/reset" element={<BlogReset />} />
          <Route path="/create/gatsby" element={<GatsbyLayout />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/setting" element={<SettingPage />} />
          <Route path="/layout" element={<SettingLayout />} />
          <Route path="/laysample" element={<LayoutSample />} />
          <Route path="/post" element={<PostPage />} />

          <Route path="/sample" element={<SamplePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
