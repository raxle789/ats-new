import { combineReducers, configureStore } from '@reduxjs/toolkit';
import wishlistSlice from './features/wishlist';
import filterSlice from './features/filterSlice';
import stepSlice from './features/stepSlice';
import registerSlice from './features/registerSlice';
import sidebarSlice from './features/sidebarSlice';
import applicantStepSlice from './features/applicantStepSlice';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  filter: filterSlice,
  sidebar: sidebarSlice,
  wishlist: wishlistSlice,
  step: stepSlice,
  register: registerSlice,
  applicantStep: applicantStepSlice,
});

const persistConfig = {
  key: 'ats-erajaya',
  storage,
  whitelist: ['applicantStep'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({ serializableCheck: false }),
// middleware: (getDefaultMiddleware) =>
//   getDefaultMiddleware({
//     serializableCheck: {
//       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//     },
//   }),
// });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
