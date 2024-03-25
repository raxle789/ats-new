import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

type TypeAuthorizeState = {
  formData: {
    email: string;
    password: string;
  };
  errors: {
    email?: string;
    password?: string;
  };
};

const initialAuthorizeState: TypeAuthorizeState = {
  formData: {
    email: '',
    password: '',
  },
  errors: {},
};

const authorizeSlice = createSlice({
  name: 'authorize',
  initialState: initialAuthorizeState,
  reducers: {
    setAuthorizeForm(
      state,
      action: PayloadAction<{ email: string; password: string }>,
    ) {
      state.formData = action.payload;
    },
    setAuthorizeFormErrors(
      state,
      action: PayloadAction<{ email?: string; password?: string }>,
    ) {
      state.errors = action.payload;
    },
  },
});

export const { setAuthorizeForm, setAuthorizeFormErrors } =
  authorizeSlice.actions;
export default authorizeSlice.reducer;
