import { useAppDispatch, useAppSelector } from 'app/hooks';
import { toggleTag } from 'features/tags/tags-slice';
import { map } from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/function';
import { ReactElement } from 'react';
import TagChip from './TagChip';

export default function TagsContainer(): ReactElement {
  const tagList = useAppSelector((state) => state.tags.tagList);
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-wrap gap-2">
      {pipe(
        tagList,
        map(({ name, filterState }) => {
          return (
            <TagChip
              key={name}
              name={name}
              filterState={filterState}
              onClick={() => dispatch(toggleTag(name))}
            />
          );
        })
      )}
    </div>
  );
}
