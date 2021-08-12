import { NotionDatabase } from 'app-types';
import { ReactElement, useEffect } from 'react';
import { mapWithIndex } from 'fp-ts/lib/Array';
import ProjectContainer from '@components/ProjectContainer';
import SearchContainer from '@components/SearchContainer';
import TagsContainer from '@components/TagsContainer';
import { pipe } from 'fp-ts/lib/function';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { initTagList } from 'features/tags/tags-slice';
import {
  initProjectList,
  selectFilteredProjectList,
} from 'features/projects/projects-slice';
import ContactByEmail from './ContactByEmail';

export default function PortfolioLayout({
  notionDatabase,
}: {
  notionDatabase: NotionDatabase;
}): ReactElement {
  const projectList = useAppSelector(selectFilteredProjectList);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initProjectList(notionDatabase));
    dispatch(initTagList(notionDatabase));
  }, [notionDatabase, dispatch]);
  return (
    <div>
      <ContactByEmail />
      <div className="mx-4">
        <div>
          <SearchContainer />
        </div>
        <div className="mt-3">
          <TagsContainer />
        </div>
      </div>
      <div className="mt-8">
        {pipe(
          projectList,
          mapWithIndex((index, properties) => (
            <ProjectContainer
              key={properties.title.title[0].plain_text}
              index={index}
              notionProperty={properties}
            />
          ))
        )}
      </div>
    </div>
  );
}
