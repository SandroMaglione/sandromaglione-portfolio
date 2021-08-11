import * as t from 'io-ts';
import { nonEmptyArray } from 'io-ts-types';

const stringOrNull = t.union([t.string, t.null]);

const notionPropertyPlainText = t.type({
  plain_text: t.string,
});

const notionPropertyText = t.type({
  id: t.string,
  rich_text: nonEmptyArray(notionPropertyPlainText),
});

const notionPropertyTitle = t.type({
  id: t.string,
  title: nonEmptyArray(notionPropertyPlainText),
});

const notionPropertyUrl = t.type({
  id: t.string,
  url: t.string,
});

const notionPropertyDate = t.type({
  id: t.string,
  date: t.type({
    start: t.string,
    end: stringOrNull,
  }),
});

const notionPropertyMultiSelect = t.type({
  id: t.string,
  multi_select: t.array(
    t.type({
      id: t.string,
      name: t.string,
    })
  ),
});

export const notionProperty = t.type({
  link: notionPropertyUrl,
  date: notionPropertyDate,
  technology: notionPropertyMultiSelect,
  tags: notionPropertyMultiSelect,
  'link-repository': notionPropertyUrl,
  repository: notionPropertyText,
  description: notionPropertyText,
  title: notionPropertyTitle,
});

const notionResult = t.type({
  id: t.string,
  properties: notionProperty,
});

const notionResponse = t.type({
  results: t.array(notionResult),
});

export const notionDatabase = t.type({
  response: notionResponse,
});
