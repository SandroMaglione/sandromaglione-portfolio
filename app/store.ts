import { configureStore } from '@reduxjs/toolkit';
import projectsSlice from 'features/projects/projects-slice';
import tagsSlice from 'features/tags/tags-slice';

import searchSlice from '../features/search/search-slice';

export const store = configureStore({
  reducer: {
    search: searchSlice,
    tags: tagsSlice,
    projects: projectsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
