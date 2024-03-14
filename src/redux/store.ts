import wishlistSlice from './features/wishlist';
import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './features/filterSlice';
import sidebarSlice from './features/sidebarSlice';

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    wishlist: wishlistSlice,
    sidebar: sidebarSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
