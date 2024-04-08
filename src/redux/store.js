import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import authReducer from "./slices/authSlice"
import storage from 'redux-persist/lib/storage';
import { productApi } from "./api/productApi";
import { imageApi } from "./api/imageApi";
import { jwtDecode } from "jwt-decode";

const checkTokenExpirationMiddleware = store => next => action => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  if (token && jwtDecode(token).exp < Date.now() / 1000) {
    localStorage.clear();
  }
  next(action);
};

const persistConfig = {
  key: "auth",
  storage: storage,
}

const persistedAuthReducer = persistReducer(persistConfig, authReducer)
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [imageApi.reducerPath]: imageApi.reducer,
    auth: persistedAuthReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      //   ignoredActionPaths: [authApi.middlewarePath, userApi.middlewarePath, productApi.middlewarePath, imageApi.middlewarePath],
      // },
    }).concat(authApi.middleware, userApi.middleware, productApi.middleware, imageApi.middleware, checkTokenExpirationMiddleware),
    // enhancers: [composeEnhancers]
});

export const persistor = persistStore(store);

export default store;
