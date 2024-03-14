import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface IRegisterState {
  dataCandidate: {
    fullName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    // uploadPhoto: FileList | string | null;
  };
}

// Define the initial state using that type
const initialState: IRegisterState = {
  dataCandidate: {
    fullName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    // uploadPhoto: '',
  },
};

export const registerSlice = createSlice({
  name: 'candidate account state',
  initialState,
  reducers: {
    setRegister: (
      state,
      action: PayloadAction<{
        fullName: string;
        email: string;
        phoneNumber: string;
        dateOfBirth: string;
        // uploadPhoto: FileList | string | null;
      }>,
    ) => {
      state.dataCandidate = action.payload;
      // state.email = action.payload.email;
      // state.phoneNumber = action.payload.phoneNumber;
      // state.dateOfBirth = action.payload.dateOfBirth;
    },
  },
});

export const { setRegister } = registerSlice.actions;

export default registerSlice.reducer;
