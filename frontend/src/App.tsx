import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import SamplePage from "./pages/SamplePage";
import Header from "./components/Header";
import Landing from "./pages/LandingPage";
import Create from "./pages/CreatePage";
import Dashboard from "./pages/DashboardPage";
import Setting from "features/setting/Setting";
import SettingLayout from "features/setting/SettingLayout";
import PostList from "pages/PostListPage";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/create" element={<Create />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/layout" element={<SettingLayout />} />
        <Route path="/post" element={<PostList />} />

        <Route path="/sample" element={<SamplePage />} />
      </Routes>
    </div>
  );
}

export default App;
