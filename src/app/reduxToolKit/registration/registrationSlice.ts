// reduxToolKit/registrationSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RegistrationState {
  email: string;
  username: string;
  password: string;
  contactNumber: string;
  userType: string;
  branch: string;
  salaryDetails: string;
  formErrors: {
    email: string;
    username: string;
    password: string;
    contactNumber: string;
    userType: string;
    branch: string;
    salaryDetails: string;
  };
}

const initialState: RegistrationState = {
  email: "",
  username: "",
  password: "",
  contactNumber: "",
  userType: "",
  branch: "",
  salaryDetails: "",
  formErrors: {
    email: "",
    username: "",
    password: "",
    contactNumber: "",
    userType: "",
    branch: "",
    salaryDetails: "",
  },
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    setField: (
      state,
      action: PayloadAction<{
        field: keyof Omit<RegistrationState, "formErrors">;
        value: string;
      }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },
    setFormErrors: (
      state,
      action: PayloadAction<Partial<RegistrationState["formErrors"]>>
    ) => {
      state.formErrors = { ...state.formErrors, ...action.payload };
    },
    resetForm: (state) => initialState,
  },
});

export const { setField, setFormErrors, resetForm } = registrationSlice.actions;
export default registrationSlice.reducer;
