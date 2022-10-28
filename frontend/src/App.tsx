import Setting from "features/setting/Setting";
import SettingLayout from "features/setting/SettingLayout";
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import SamplePage from "./pages/SamplePage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<p>Main</p>} />
        <Route path="/sample" element={<SamplePage />} />
      </Routes>
    </div>
  );
}

export default App;
