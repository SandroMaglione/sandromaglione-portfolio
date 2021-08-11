import { GetServerSidePropsResult } from 'next';
import { ReactElement } from 'react';
import * as E from 'fp-ts/Either';
import { ErrorMessage, NotionDatabase } from 'app-types';
import { pipe } from 'fp-ts/lib/function';
import { getNotionDatabase } from 'actions/actions';
import { map } from 'fp-ts/lib/Array';
import * as timeago from 'timeago.js';
import DartIcon from 'icons/dart';
import TypescriptIcon from 'icons/typescript';

interface PageProps {
  notionDatabase: E.Either<ErrorMessage, NotionDatabase>;
}

export default function Home({ notionDatabase }: PageProps): ReactElement {
  return (
    <div className="my-12 mx-14">
      <div>
        {pipe(
          notionDatabase,
          E.fold(
            (error) => <span>{error}</span>,
            ({ response: { results } }) => (
              <div>
                <div>
                  {pipe(
                    results,
                    map(({ properties }) => {
                      return (
                        <div
                          key={properties.title.id}
                          className="px-10 py-10 border-b border-gray-200"
                        >
                          <div className="flex flex-wrap gap-2 text-sm font-light text-[#586069]">
                            <a
                              href={properties['link-repository'].url}
                              className="text-indigo-500 hover:text-indigo-600 hover:underline"
                            >
                              {properties.repository.rich_text[0].plain_text}
                            </a>
                            <span>-</span>
                            <span>
                              {`Updated ${timeago.format(
                                properties.date.date.start
                              )}`}
                            </span>
                          </div>
                          <h2 className="mt-1.5 text-4xl font-bold tracking-wider text-[#0366d6]">
                            <a
                              href={properties.link.url}
                              className="hover:underline"
                            >
                              {properties.title.title[0].plain_text}
                            </a>
                          </h2>
                          <p className="mt-2 text-lg font-light tracking-tight text-[#586069]">
                            {properties.description.rich_text[0].plain_text}
                          </p>
                          <div className="flex flex-wrap gap-1.5 mt-4">
                            {pipe(
                              properties.technology.multi_select,
                              map(({ id, name }) => {
                                return (
                                  <div
                                    key={id}
                                    className="px-4 items-center flex gap-2 py-2 text-xs font-light text-[#0366d6] bg-[#d6f8ff] hover:bg-[#dbedff] rounded-2xl"
                                  >
                                    <TypescriptIcon />
                                    <span>{name}</span>
                                  </div>
                                );
                              })
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}

const SOURCE_URL = 'http://localhost:3000/api/hello';
export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<PageProps>
> {
  return pipe(
    await getNotionDatabase(SOURCE_URL)(),
    (either): GetServerSidePropsResult<PageProps> => ({
      props: {
        notionDatabase: either,
      },
    })
  );
}
