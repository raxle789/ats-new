import { combineReducers, configureStore } from '@reduxjs/toolkit';
import spinFullScreenSlice from './features/spinFullScreenSlice';
import wishlistSlice from './features/wishlist';
import filterSlice from './features/filterSlice';
import sidebarSlice from './features/sidebarSlice';
import applicantStepSlice from './features/applicantStepSlice';
import userRegisterStepSlice from './features/fatkhur/registerSlice';
// import stepSlice from './features/stepSlice';
// import registerSlice from './features/registerSlice';
// import authSlice from './features/authorizingSlice';
// import candidateDetailsSlice from './features/candidateDetailsSlice';
// import createInterviewSlice from './features/createInterviewSlice';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  filter: filterSlice,
  sidebar: sidebarSlice,
  wishlist: wishlistSlice,
  applicantStep: applicantStepSlice,
  spinFullScreen: spinFullScreenSlice,

  // step: stepSlice,
  // register: registerSlice,
  // auth: authSlice,
  // candidateModal: candidateDetailsSlice,
  // createInterviewModal: createInterviewSlice,
  // fatkhur
  userRegisterStep: userRegisterStepSlice,
});

const persistConfig = {
  key: 'ats-erajaya',
  storage,
  whitelist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
