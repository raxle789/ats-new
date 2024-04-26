import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IInitState {
  isOpen: boolean;
}

const initialState: IInitState = {
  isOpen: false,
};

export const createInterviewSlice = createSlice({
  name: 'create interview modal state',
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setIsOpen } = createInterviewSlice.actions;
export default createInterviewSlice.reducer;
