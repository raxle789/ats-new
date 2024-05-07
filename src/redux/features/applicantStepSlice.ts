import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface IApplicantStepState {
  step: number;
}

interface ISetApplicantStepPayload {
  currentStep: number;
}

// Define the initial state using that type
const initialState: IApplicantStepState = {
  // number 1 means applicant menu, 2 is shortlisted, and so on
  step: 1,
};

export const applicantStepSlice = createSlice({
  name: 'applicant step tracker',
  initialState,
  reducers: {
    setApplicantStep: (
      state,
      action: PayloadAction<ISetApplicantStepPayload>,
    ) => {
      state.step = action.payload.currentStep;
    },
  },
});

export const { setApplicantStep } = applicantStepSlice.actions;

export default applicantStepSlice.reducer;
