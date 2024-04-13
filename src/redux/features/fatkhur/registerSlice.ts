import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialRegisterState = {
  next: '',
};

const userRegisterStepSlice = createSlice({
  name: 'register-step',
  initialState: initialRegisterState,
  reducers: {
    setRegisterStep: (state, action: PayloadAction<string>) => {
      state.next = action.payload;
    },
  },
});

export const { setRegisterStep } = userRegisterStepSlice.actions;
export default userRegisterStepSlice.reducer;
