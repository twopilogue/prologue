import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import SamplePage from "./pages/SamplePage";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<p>Main</p>} />
        <Route path="/sample" element={<SamplePage />} />
      </Routes>
    </div>
  );
}

export default App;
