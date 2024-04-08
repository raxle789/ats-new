import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

enum process {
  general = 'general',
  userInformation = 'userInformation',
  mandatoryInformation = 'mandatoryInformation',
}

type RegisterState = {
  onProcess: string;
  process: {
    general: {
      status: boolean;
    };
    userInformation: {
      status: boolean;
    };
    mandatoryInformation: {
      status: boolean;
    };
  };
};

type userRegisterData = {
  email: string;
  password: string;
};

const userRegisterState: RegisterState = {
  onProcess: process.general,
  process: {
    general: {
      status: false,
    },
    userInformation: {
      status: false,
    },
    mandatoryInformation: {
      status: false,
    },
  },
};

export const userRegisterSlice = createSlice({
  name: 'userRegister',
  initialState: userRegisterState,
  reducers: {
    setGeneralInformation: (state, action: PayloadAction<boolean>) => {
      /* set onProcess value */
      state.onProcess = process.mandatoryInformation;
      /* set the general status */
      state.process.general.status = action.payload;
    },
    setUserInformation: (state, action: PayloadAction<boolean>) => {
      /* set onProcecss value */
      state.onProcess = process.userInformation;
      /* set the userInformation status */
      state.process.userInformation.status = action.payload;
    },
    setMandatoryInformation: (state, action: PayloadAction<boolean>) => {
      /* set the mandatoryInformation status */
      state.process.mandatoryInformation.status = action.payload;
    },
  },
});

// const createAccount = createAsyncThunk(
//     'userRegister/create',
//     async (userCreateData: userRegisterData) {

//     }
// )

export const {
  setGeneralInformation,
  setUserInformation,
  setMandatoryInformation,
} = userRegisterSlice.actions;

// export default userRegisterSlice.reducer;
