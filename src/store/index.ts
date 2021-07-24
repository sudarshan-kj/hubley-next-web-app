import { configureStore } from "@reduxjs/toolkit";

import usersReducer from "../features/user/userSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export default store;
