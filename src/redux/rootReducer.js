import authReducer from "./slices/authSlice";
import bookReducer from "./slices/bookSlice";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  auth: authReducer,
  book: bookReducer,
});
