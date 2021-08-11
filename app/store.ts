import { configureStore } from '@reduxjs/toolkit';

// Import the previously created search slice
import searchSlice from '../features/search/search-slice';

// Create the store, adding the search slice to it
export const store = configureStore({
  reducer: {
    search: searchSlice,
  },
});

// Export some helper types used to improve type-checking
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
