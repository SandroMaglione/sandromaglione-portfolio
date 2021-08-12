import { useAppDispatch, useAppSelector } from 'app/hooks';
import { updateSearchText } from 'features/search/search-slice';
import { ReactElement } from 'react';

export default function SearchContainer(): ReactElement {
  const search = useAppSelector((state) => state.search.searchText);
  const dispatch = useAppDispatch();
  return (
    <div>
      <label
        htmlFor="search"
        className="block text-sm font-medium text-[#586069]"
      >
        Search project
      </label>
      <div className="relative mt-1 rounded-md">
        <input
          type="text"
          name="search"
          id="search"
          className="block w-full pr-10 border-gray-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Search project by name"
          value={search}
          onChange={(e) => dispatch(updateSearchText(e.target.value))}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
