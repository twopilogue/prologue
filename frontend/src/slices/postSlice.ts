import { createSlice } from "@reduxjs/toolkit";

interface postConfig {
  title: string;
  category: string;
}

const initialState: postConfig = {
  title: "",
  category: "",
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
});

export default postSlice.reducer;
