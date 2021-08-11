import { GetServerSidePropsResult } from 'next';
import React, { ReactElement } from 'react';
import * as E from 'fp-ts/Either';
import { ErrorMessage, NotionDatabase } from 'app-types';
import { pipe } from 'fp-ts/lib/function';
import { getNotionDatabase } from 'actions/actions';
import PortfolioLayout from '@components/PortfolioLayout';

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
            (notionDatabase) => (
              <PortfolioLayout notionDatabase={notionDatabase} />
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
