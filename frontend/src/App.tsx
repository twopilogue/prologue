import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import SamplePage from "./pages/SamplePage";
import SettingPage from "pages/SettingPage";
import SettingLayout from "features/setting/SettingLayout";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<p>Main</p>} />
        <Route path="/sample" element={<SamplePage />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/layout" element={<SettingLayout />} />
      </Routes>
    </div>
  );
}

export default App;
