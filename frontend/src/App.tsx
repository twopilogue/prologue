import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import SamplePage from "./pages/SamplePage";
import Setting from "features/setting/Setting";
import SettingLayout from "features/setting/SettingLayout";
import PostList from "pages/PostListPage";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<p>Main</p>} />
        <Route path="/sample" element={<SamplePage />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/layout" element={<SettingLayout />} />
        <Route path="/post" element={<PostList />} />
      </Routes>
    </div>
  );
}

export default App;
