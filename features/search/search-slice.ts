import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the state of the slice as an object
interface SearchState {
  searchText: string;
}

// Define an initial state
const initialState: SearchState = {
  searchText: '',
};

// Create a slice containing the configuration of the state
// and the reducers functions
const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    updateSearchText(state, action: PayloadAction<string>) {
      state.searchText = action.payload.toLowerCase();
    },
  },
});

// Export each reducers function defined in createSlice
export const { updateSearchText } = searchSlice.actions;

// Export default the slice reducer
export default searchSlice.reducer;
