import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderID: "",
  estimate: "",
  created: "",
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    saveBooking: (state, action) => {
      state.orderID = action.payload.orderID;
      state.estimate = action.payload.estimate;
      state.created = action.payload.created;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveBooking } = bookSlice.actions;

export default bookSlice.reducer;
