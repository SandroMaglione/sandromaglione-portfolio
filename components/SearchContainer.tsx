import { useAppDispatch, useAppSelector } from 'app/hooks';
import { updateSearchText } from 'features/search/search-slice';
import { ReactElement } from 'react';

export default function SearchContainer(): ReactElement {
  const search = useAppSelector((state) => state.search.searchText);
  const dispatch = useAppDispatch();
  return (
    <div className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
      <label htmlFor="name" className="block text-sm font-medium text-gray-900">
        Search project
      </label>
      <input
        type="text"
        name="name"
        id="name"
        className="block w-full p-0 mt-1 text-lg text-gray-900 placeholder-gray-500 border-0 focus:ring-0 sm:text-sm"
        placeholder="Search project by name"
        value={search}
        onChange={(e) => dispatch(updateSearchText(e.target.value))}
      />
    </div>
  );
}
