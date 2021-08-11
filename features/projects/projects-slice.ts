import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotionDatabase, NotionProperty } from 'app-types';
import { RootState } from 'app/store';
import {
  filterProjectsBySearch,
  filterProjectsByTags,
  getListOfProjects,
} from 'computations/filters';
import { pipe } from 'fp-ts/lib/function';

interface ProjectsState {
  projectList: NotionProperty[];
}

const initialState: ProjectsState = {
  projectList: [],
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    initProjectList(state, action: PayloadAction<NotionDatabase>) {
      state.projectList = getListOfProjects(action.payload);
    },
  },
});

export const { initProjectList } = projectsSlice.actions;
export default projectsSlice.reducer;

export const selectFilteredProjectList = (state: RootState): NotionProperty[] =>
  pipe(
    state.projects.projectList,
    filterProjectsByTags(state.tags.tagList),
    filterProjectsBySearch(state.search.searchText)
  );
