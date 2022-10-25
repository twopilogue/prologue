import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <p>page</p>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
