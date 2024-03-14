import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface IStepState {
  step: number;
}

interface ISetStepPayload {
  newStep: number;
}

// Define the initial state using that type
const initialState: IStepState = {
  step: 1,
};

export const stepSlice = createSlice({
  name: 'step counter',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<ISetStepPayload>) => {
      state.step = action.payload.newStep;
    },
  },
});

export const { setStep } = stepSlice.actions;

export default stepSlice.reducer;
