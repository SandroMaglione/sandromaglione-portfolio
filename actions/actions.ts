import { notionDatabase } from '@validation/validation';
import { ErrorMessage, NotionDatabase } from 'app-types';
import axios, { AxiosResponse } from 'axios';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';

const validateNotionDatabase = (
  response: AxiosResponse<unknown>
): E.Either<ErrorMessage, NotionDatabase> =>
  pipe(
    notionDatabase.decode(response.data),
    E.mapLeft((errors) => {
      errors
        .flatMap((e) => e.value)
        .forEach((e) => {
          console.log({ e: e });
        });

      return `Error while validating database: ${errors
        .map((e) => e.value)
        .join(',')}`;
    })
  );

export const getNotionDatabase = (
  url: string
): TE.TaskEither<ErrorMessage, NotionDatabase> =>
  pipe(
    TE.tryCatch(
      async () => axios.get(url),
      (error) => `Error while fetching database at ${url}: ${error}`
    ),
    TE.chain((response) =>
      pipe(response, validateNotionDatabase, TE.fromEither)
    )
  );
