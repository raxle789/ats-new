import wishlistSlice from './features/wishlist';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import filterSlice from './features/filterSlice';
import stepSlice from './features/stepSlice';
import registerSlice from './features/registerSlice';
import sidebarSlice from './features/sidebarSlice';
// import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  filter: filterSlice,
  wishlist: wishlistSlice,
  step: stepSlice,
  register: registerSlice,
  sidebar: sidebarSlice,
});

// const persistConfig = {
//   key: "simple-next-js",
//   storage,
// };

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
