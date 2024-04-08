import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface IAuthorizeState {
  authState: boolean;
}

interface IAuthorizePayload {
  newAuthState: boolean;
}

// Define the initial state using that type
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
