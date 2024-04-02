import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface IApplicantStepState {
  step: string;
}

interface ISetApplicantStepPayload {
  currentStep: string;
}

// Define the initial state using that type
const initialState: IApplicantStepState = {
  step: 'initial',
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
