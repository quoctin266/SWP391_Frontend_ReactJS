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
  avatar: "",
  rememberLogin: false,
  isAuthenticated: false,
  resetCode: "",
  recoverEmail: "",
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
      state.avatar = action.payload.avatar ? action.payload.avatar : "";
      state.rememberLogin = false;
      state.isAuthenticated = true;
      state.recoverEmail = "";
      state.resetCode = "";
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
      state.avatar = "";
      state.rememberLogin = false;
      state.isAuthenticated = false;
    },
    update: (state, action) => {
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.birthday = action.payload.birthday ? action.payload.birthday : "";
      state.phone = action.payload.phone ? action.payload.phone : "";
      state.address = action.payload.address ? action.payload.address : "";
      state.avatar = action.payload.avatar ? action.payload.avatar : "";
    },
    updatePassword: (state, action) => {
      state.password = action.payload.password;
    },
    recoverPassword: (state, action) => {
      state.resetCode = action.payload.code;
      state.recoverEmail = action.payload.email;
    },
    resetPassCode: (state) => {
      state.resetCode = "";
    },
    clearEmail: (state) => {
      state.recoverEmail = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  login,
  logout,
  update,
  updatePassword,
  recoverPassword,
  resetPassCode,
  clearEmail,
} = authSlice.actions;

export default authSlice.reducer;
