import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface IFilterState {
  isOpen: boolean;
}

// Define the initial state using that type
const initialState: IFilterState = {
  isOpen: false,
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      //   if (action.payload) {
      //     state.isOpen = true;
      //   } else {
      //     state.isOpen = false;
      //   }

      state.isOpen = action.payload;

      console.info(state, action.payload);
    },
  },
});

export const { setIsOpen } = sidebarSlice.actions;

export default sidebarSlice.reducer;
