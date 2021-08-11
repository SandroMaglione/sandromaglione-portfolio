import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotionDatabase, TagFilter } from 'app-types';
import { getListOfFilters, toggleFilterState } from 'computations/filters';
import { map } from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/function';

interface TagsState {
  tagList: TagFilter[];
}

const initialState: TagsState = {
  tagList: [],
};

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    initTagList(state, action: PayloadAction<NotionDatabase>) {
      state.tagList = getListOfFilters(action.payload);
    },
    toggleTag(state, action: PayloadAction<string>) {
      state.tagList = pipe(
        state.tagList,
        map(({ name, filterState }) => ({
          name,
          filterState:
            name === action.payload
              ? toggleFilterState(filterState)
              : filterState,
        }))
      );
    },
  },
});

export const { initTagList, toggleTag } = tagsSlice.actions;
export default tagsSlice.reducer;
