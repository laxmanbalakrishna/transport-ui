import { baseUrl } from "@/app/utils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state
interface BranchState {
  branches: Array<{ id: string; name: string }>;
  loadingBranches: boolean;
  error: string | null;
}

const initialState: BranchState = {
  branches: [],
  loadingBranches: false,
  error: null,
};

// Create an async thunk for fetching branches
export const fetchBranches = createAsyncThunk<BranchState["branches"]>(
  "branch/fetchBranches",
  async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${baseUrl}/branches/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  }
);

// Create the slice
const branchSlice = createSlice({
  name: "branch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBranches.pending, (state) => {
        state.loadingBranches = true;
        state.error = null;
      })
      .addCase(fetchBranches.fulfilled, (state, action) => {
        state.loadingBranches = false;
        state.branches = action.payload;
      })
      .addCase(fetchBranches.rejected, (state, action) => {
        state.loadingBranches = false;
        state.error = action.error.message || "Failed to fetch branches";
      });
  },
});

// Export the actions (if any) and the reducer
export default branchSlice.reducer;
