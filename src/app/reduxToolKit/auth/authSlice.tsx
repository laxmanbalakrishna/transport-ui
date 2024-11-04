// reduxToolKit/auth/authSlice.tsx
import { baseUrl } from "@/app/utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

// Define async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${baseUrl}/login/`, {
        email,
        password,
      });
      const { token, user_type, username } = response.data;

      // Store the credentials in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user_type", user_type);
      localStorage.setItem("username", username);

      toast.success("Login successful");

      // Trigger localStorage event to rerender NavBar
      window.dispatchEvent(new Event("storage"));

      return { token, user_type, username };
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data.non_field_errors
          ? error.response.data.non_field_errors[0]
          : "Login failed";
        toast.error(errorMessage);
      } else {
        toast.error("An error occurred. Please try again.");
      }
      return rejectWithValue(error.response.data);
    }
  }
);

// Define async thunk for logout
export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const userType = localStorage.getItem("user_type");
      const userName = localStorage.getItem("username");

      if (!token || !userType || !userName) {
        throw new Error("UserType or Token or UserName not found");
      }

      // Determine the API endpoint based on user type
      const endpoint =
        userType === "Installed User"
          ? `${baseUrl}/installations/logout/`
          : `${baseUrl}/logout/`;

      await axios.post(
        endpoint,
        {},
        {
          headers: { Authorization: `Token ${token}` },
        }
      );

      // Clear the local storage
      localStorage.removeItem("token");
      localStorage.removeItem("user_type");
      localStorage.removeItem("username");

      toast.success("Logout successful");

      return;
    } catch (error: any) {
      toast.error("An error occurred during logout.");
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    user_type: null,
    username: null,
    loading: false,
    error: null as null | unknown,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.user_type = action.payload.user_type;
      state.username = action.payload.username;
      state.loading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Login failed";
    });

    // Handle logout
    builder.addCase(logout.fulfilled, (state) => {
      state.token = null;
      state.user_type = null;
      state.username = null;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export default authSlice.reducer;
