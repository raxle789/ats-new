import { checkEmailVerifiedStatus } from '@/libs/Registration';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// const fetchUseEmail = async (): Promise<number> => {
//   const status = await checkEmailVerifiedStatus();
//   if(status) {
//     return 3;
//   };
//   return 2;
// };

// const init = fetchUseEmail();
// const init = 3;

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
