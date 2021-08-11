import { matchExhaustive } from '@practical-fp/union-types';
import {
  FilterState,
  NotionDatabase,
  NotionProperty,
  TagFilter,
} from 'app-types';
import { filter } from 'fp-ts/lib/Array';
import { intersection } from 'fp-ts/lib/Array';
import { chain, map, some, uniq } from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/function';
import * as S from 'fp-ts/string';
import { filterStateImpl } from './impl';

export const getListOfProjects = ({
  response: { results },
}: NotionDatabase): NotionProperty[] =>
  pipe(
    results,
    map(({ properties }) => properties)
  );

export const getListOfFilters = ({
  response: { results },
}: NotionDatabase): TagFilter[] =>
  pipe(
    results,
    chain(
      ({
        properties: {
          technology: { multi_select },
        },
      }) =>
        pipe(
          multi_select,
          map(({ name }) => name)
        )
    ),
    uniq(S.Eq),
    map(
      (name): TagFilter => ({
        name,
        filterState: filterStateImpl.unselected(),
      })
    )
  );

export const toggleFilterState = (filterState: FilterState): FilterState =>
  matchExhaustive(filterState, {
    unselected: () => filterStateImpl.selected,
    selected: () => filterStateImpl.unselected,
  })();

export const isTagSelected =
  (tagList: TagFilter[]) =>
  (tagName: string): FilterState =>
    pipe(
      tagList,
      some(
        ({ name, filterState }) =>
          filterStateImpl.selected.is(filterState) && name === tagName
      ),
      (check) => (check ? filterStateImpl.selected : filterStateImpl.unselected)
    )();

const filterSelectedTags = (tagList: TagFilter[]): TagFilter[] =>
  pipe(
    tagList,
    filter(({ filterState }) => filterStateImpl.selected.is(filterState))
  );

export const filterProjectsByTags =
  (tagList: TagFilter[]) =>
  (projectList: NotionProperty[]): NotionProperty[] =>
    pipe(
      projectList,
      filter(({ technology: { multi_select } }) =>
        pipe(
          tagList,
          filterSelectedTags,
          (selectedTags) =>
            selectedTags.length === 0 ||
            pipe(
              multi_select,
              map(({ name }) => name),
              intersection(S.Eq)(
                pipe(
                  selectedTags,
                  map(({ name }) => name)
                )
              ),
              (selected) => selected.length > 0
            )
        )
      )
    );

export const filterProjectsBySearch =
  (search: string) =>
  (projectList: NotionProperty[]): NotionProperty[] =>
    pipe(
      projectList,
      filter(
        ({ title: { title }, description: { rich_text: description } }) =>
          search.length === 0 ||
          pipe(
            title[0].plain_text.toLowerCase(),
            S.includes(search.toLowerCase())
          ) ||
          pipe(
            description[0].plain_text.toLowerCase(),
            S.includes(search.toLowerCase())
          )
      )
    );
