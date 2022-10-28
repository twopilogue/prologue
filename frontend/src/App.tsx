import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import SamplePage from "./pages/SamplePage";
import Setting from "features/setting/Setting";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<p>Main</p>} />
        <Route path="/sample" element={<SamplePage />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </div>
  );
}

export default App;
