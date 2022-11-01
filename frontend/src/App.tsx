import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import SamplePage from "./pages/SamplePage";
import SettingPage from "pages/SettingPage";
import SettingLayout from "features/setting/SettingLayout";
import { Helmet } from "react-helmet-async";
import LayoutSample from "features/setting/layout/LayoutSample";
import PostList from "pages/PostListPage";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Helmet>
                <title>Prologue</title>
              </Helmet>
              <p>Main</p>
            </>
          }
        />
        <Route path="/sample" element={<SamplePage />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/layout" element={<SettingLayout />} />
        <Route path="/laysample" element={<LayoutSample />} />
        <Route path="/post" element={<PostList />} />
      </Routes>
    </div>
  );
}

export default App;
