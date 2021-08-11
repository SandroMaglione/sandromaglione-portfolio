declare module 'app-types' {
  import('io-ts');
  import('@validation/validation');
  import('@practical-fp/union-types');
  import { TypeOf } from 'io-ts';
  import { notionDatabase, notionProperty } from '@validation/validation';
  import { Variant } from '@practical-fp/union-types';

  type ErrorMessage = string;
  type NotionDatabase = TypeOf<typeof notionDatabase>;
  type NotionProperty = TypeOf<typeof notionProperty>;

  type FilterState = Variant<'selected'> | Variant<'unselected'>;
  interface TagFilter {
    name: string;
    filterState: FilterState;
  }
}
