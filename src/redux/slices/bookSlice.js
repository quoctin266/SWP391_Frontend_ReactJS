import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderID: "",
  estimate: "",
  created: "",
  name: "",
  phone: "",
  address: "",
  initCost: "",
  extraBirdCost: "",
  unitCost: "",
  packageCost: "",
  totalCost: "",
  distance: "",
  extraBird: "",
  capacityUnit: "",
  package: "",
  invoiceSent: false,
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    saveBooking: (state, action) => {
      state.orderID = action?.payload?.orderID;
      state.estimate = action?.payload?.estimate;
      state.created = action?.payload?.created;
      state.name = action?.payload?.full_name;
      state.phone = action?.payload?.phone_number;
      state.address = action?.payload?.address;
      state.initCost = action?.payload?.initCost;
      state.extraBirdCost = action?.payload?.extraBirdCost;
      state.packageCost = action?.payload?.packageCost;
      state.unitCost = action?.payload?.unitCost;
      state.totalCost = action?.payload?.totalCost;
      state.distance = action?.payload?.distance;
      state.extraBird = action?.payload?.extraBird;
      state.capacityUnit = action?.payload?.capacityUnit;
      state.package = action?.payload?.package;
      state.invoiceSent = false;
    },
    removeBookingData: (state) => {
      state.name = "";
      state.phone = "";
      state.address = "";
      state.initCost = "";
      state.extraBirdCost = "";
      state.packageCost = "";
      state.unitCost = "";
      state.totalCost = "";
      state.distance = "";
      state.extraBird = "";
      state.capacityUnit = "";
      state.package = "";
      state.invoiceSent = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveBooking, removeBookingData } = bookSlice.actions;

export default bookSlice.reducer;
