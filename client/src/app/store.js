import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

import authReducer from "../features/auth/authSlice";
import storageModule from "redux-persist/lib/storage";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import expenseReducer from "../features/expense/expenseSlice";
import budgetReducer from "../features/budget/budgetSlice";
import uiReducer from "../features/ui/uiSlice";
import profileReducer from "../features/profile/profileSlice";

const storage = storageModule.default || storageModule;
const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  budget: budgetReducer,
  expense: expenseReducer,
  ui: uiReducer,
  profile: profileReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
