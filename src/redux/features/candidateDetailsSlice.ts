import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IInitState {
  isOpen: boolean;
}

const initialState: IInitState = {
  isOpen: false,
};

export const candidateDetailsSlice = createSlice({
  name: 'candidate details modal state',
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setIsOpen } = candidateDetailsSlice.actions;
export default candidateDetailsSlice.reducer;
