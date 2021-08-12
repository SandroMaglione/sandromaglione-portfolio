import { GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import React, { ReactElement } from 'react';
import * as E from 'fp-ts/Either';
import { ErrorMessage, NotionDatabase } from 'app-types';
import { pipe } from 'fp-ts/lib/function';
import { getNotionDatabase } from 'actions/actions';
import PortfolioLayout from '@components/PortfolioLayout';
import CopyrightNotice from '@components/CopyrightNotice';

interface PageProps {
  notionDatabase: E.Either<ErrorMessage, NotionDatabase>;
}

export default function Home({ notionDatabase }: PageProps): ReactElement {
  return (
    <>
      <Head>
        <title>
          Portfolio And Projects - Sandro Maglione | Computer Engineer
        </title>
      </Head>
      <div className="mx-4 mt-8 sm:mt-12 sm:mx-14">
        <div>
          {pipe(
            notionDatabase,
            E.fold(
              (error) => (
                <span className="text-sm font-bold tracking-widest text-red-600">
                  {error}
                </span>
              ),
              (notionDatabase) => (
                <PortfolioLayout notionDatabase={notionDatabase} />
              )
            )
          )}
        </div>
        <div className="mt-12 mb-24 text-center sm:text-left sm:mt-24 sm:mb-4">
          <CopyrightNotice />
        </div>
      </div>
    </>
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
