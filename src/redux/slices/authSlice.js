import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.role = action.payload.role;
      state.status = action.payload.status;
      state.birthday = action.payload.birthday;
      state.phone = action.payload.phone;
      state.address = action.payload.address;
      state.rememberLogin = false;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    logout: (state) => {
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
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
