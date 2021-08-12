import { NotionProperty } from 'app-types';
import { ReactElement } from 'react';
import * as timeago from 'timeago.js';
import { pipe } from 'fp-ts/lib/function';
import { map } from 'fp-ts/lib/Array';
import TagChip from './TagChip';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { toggleTag } from 'features/tags/tags-slice';
import { isTagSelected } from 'computations/filters';

export default function ProjectContainer({
  notionProperty,
}: {
  notionProperty: NotionProperty;
}): ReactElement {
  const tagList = useAppSelector((state) => state.tags.tagList);
  const dispatch = useAppDispatch();
  return (
    <div
      key={notionProperty.title.id}
      className="px-10 py-10 border-b border-[#0366d6] border-opacity-50"
    >
      <div className="flex flex-wrap gap-2 text-sm font-light text-[#586069]">
        <a
          href={notionProperty['link-repository'].url}
          target="_blank"
          rel="noreferrer"
          className="text-indigo-500 hover:text-indigo-600 hover:underline"
        >
          {notionProperty.repository.rich_text[0].plain_text}
        </a>
        <span>-</span>
        <span>{`Updated ${timeago.format(
          notionProperty.date.date.start
        )}`}</span>
      </div>
      <h2 className="mt-1.5 text-4xl font-bold tracking-wider text-[#0366d6]">
        <a
          href={notionProperty.link.url}
          target="_blank"
          rel="noreferrer"
          className="hover:underline"
        >
          {notionProperty.title.title[0].plain_text}
        </a>
      </h2>
      <div className="flex gap-1.5 mt-3 flex-wrap">
        {pipe(
          notionProperty.category.multi_select,
          map(({ id, name }) => (
            <span
              key={id}
              className="font-medium opacity-40 rounded-2xl hover:opacity-75 text-xs text-[#586069] border border-[#8c95a0] px-3 py-0.5"
            >
              {name}
            </span>
          ))
        )}
      </div>
      <p className="mt-3 text-lg font-light tracking-tight text-[#586069]">
        {notionProperty.description.rich_text[0].plain_text}
      </p>
      <div className="flex flex-wrap gap-1.5 mt-5">
        {pipe(
          notionProperty.technology.multi_select,
          map(({ id, name }) => {
            const filterState = isTagSelected(tagList)(name);
            return (
              <TagChip
                key={id}
                name={name}
                onClick={() => dispatch(toggleTag(name))}
                filterState={filterState}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
