import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface IFilterState {
  loading: boolean;
}

// Define the initial state using that type
const initialState: IFilterState = {
  loading: true,
};

export const spinFullScreenSlice = createSlice({
  name: 'spinFullScreen',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = spinFullScreenSlice.actions;

export default spinFullScreenSlice.reducer;
