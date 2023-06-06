import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account_id: "",
  email: "",
  username: "",
  password: "",
  role: "",
  status: "",
  birthday: "",
  phone: "",
  address: "",
  rememberLogin: false,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.account_id = action.payload.account_id;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.role = action.payload.role;
      state.status = action.payload.status;
      state.birthday = action.payload.birthday ? action.payload.birthday : "";
      state.phone = action.payload.phone ? action.payload.phone : "";
      state.address = action.payload.address ? action.payload.address : "";
      state.rememberLogin = false;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.account_id = "";
      state.email = "";
      state.username = "";
      state.password = "";
      state.role = "";
      state.status = "";
      state.birthday = "";
      state.phone = "";
      state.address = "";
      state.rememberLogin = false;
      state.isAuthenticated = false;
    },
    update: (state, action) => {
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.birthday = action.payload.birthday ? action.payload.birthday : "";
      state.phone = action.payload.phone ? action.payload.phone : "";
      state.address = action.payload.address ? action.payload.address : "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, update } = authSlice.actions;

export default authSlice.reducer;
