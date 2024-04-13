import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface IRegisterState {
  dataCandidate: {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
    gender: string;
    phoneNumber: string;
    dateOfBirth: string;
    // uploadPhoto: string;
    source: string;
    haveLinkedin: string;
    linkedinURL: string;
    isExperienced: string;
    expectedSalary: number;
  };
}

// Define the initial state using that type
const initialState: IRegisterState = {
  dataCandidate: {
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    gender: '',
    phoneNumber: '',
    dateOfBirth: '',
    // uploadPhoto: '',
    source: '',
    haveLinkedin: '',
    linkedinURL: '',
    isExperienced: '',
    expectedSalary: 0,
  },
};

export const registerSlice = createSlice({
  name: 'candidate account state',
  initialState,
  reducers: {
    setRegister: (
      state,
      action: PayloadAction<{
        name: string;
        email: string;
        password: string;
        confirm_password: string;
        gender: string;
        phoneNumber: string;
        dateOfBirth: string;
        // uploadPhoto: string;
        source: string;
        haveLinkedin: string;
        linkedinURL: string;
        isExperienced: string;
        expectedSalary: number;
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
