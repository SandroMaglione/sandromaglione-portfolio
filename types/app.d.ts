declare module 'app-types' {
  import('io-ts');
  import('@validation/validation');
  import { TypeOf } from 'io-ts';
  import { notionDatabase } from '@validation/validation';

  type ErrorMessage = string;
  type NotionDatabase = TypeOf<typeof notionDatabase>;
}
