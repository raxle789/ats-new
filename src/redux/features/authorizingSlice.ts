import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAuthorizeState {
  authState: boolean;
}

interface IAuthorizePayload {
  newAuthState: boolean;
}

const initialState: IAuthorizeState = {
  authState: false,
};

export const authSlice = createSlice({
  name: 'auth state',
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<IAuthorizePayload>) => {
      state.authState = action.payload.newAuthState;
    },
  },
});

export const { setAuthState } = authSlice.actions;

export default authSlice.reducer;
