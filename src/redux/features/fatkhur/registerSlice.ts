import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialRegisterState = {
  next: 3,
};

const userRegisterStepSlice = createSlice({
  name: 'register-step',
  initialState: initialRegisterState,
  reducers: {
    setRegisterStep: (state, action: PayloadAction<number>) => {
      state.next = action.payload;
    },
  },
});

export const { setRegisterStep } = userRegisterStepSlice.actions;
export default userRegisterStepSlice.reducer;
