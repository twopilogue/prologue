import Setting from "features/setting/Setting";
import SettingLayout from "features/setting/SettingLayout";
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/setting" element={<Setting />} />
        <Route path="/layoutTest" element={<SettingLayout />} />
      </Routes>
    </div>
  );
}

export default App;
