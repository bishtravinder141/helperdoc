import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import commonSlice from "./CommonSlice";
import jobSlice from "./JobSlice";

const persistConfig = {
  key: "root",
  storage,
};

// const combinedReducers = {
//   common: commonSlice,
// };
const reducers = combineReducers({
  common: commonSlice,
  job:jobSlice
});
// export default configureStore({
//   reducer: combinedReducers,
// });

const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const reduxStore = persistStore(store);
