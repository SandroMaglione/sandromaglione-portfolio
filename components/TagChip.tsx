import { matchExhaustive } from '@practical-fp/union-types';
import { FilterState } from 'app-types';
import { ReactElement } from 'react';
import LanguageIcon from './LanguageIcon';

export default function TagChip({
  name,
  filterState,
  onClick,
}: {
  name: string;
  filterState: FilterState;
  onClick: () => void;
}): ReactElement {
  return (
    <button
      type="button"
      className={`${matchExhaustive(filterState, {
        unselected: () => 'text-[#0366d6] bg-[#d6f8ff] hover:bg-[#dbedff]',
        selected: () => 'text-[#fff] bg-[#172945] hover:bg-[#2e466b]',
      })} px-4 items-center flex gap-2 py-2 text-xs rounded-2xl font-light hover-sm`}
      onClick={onClick}
    >
      <LanguageIcon language={name} />
      <span>{name}</span>
    </button>
  );
}
