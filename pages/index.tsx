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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Sandro Maglione is a Computer Engineer, Mobile, Web, and Full-Stack Developer. Here you can view all the projects he developed during is career. Web development, mobile development, backend development, open-source, and more."
        />
        <meta
          property="og:title"
          content="Portfolio And Projects - Sandro Maglione"
          key="ogtitle"
        />
        <meta
          property="og:description"
          content="Sandro Maglione is a Computer Engineer, Mobile, Web, and Full-Stack Developer. Here you can view all the projects he developed during is career. Web development, mobile development, backend development, open-source, and more."
          key="ogdesc"
        />
        <meta
          property="og:url"
          content="https://portfolio.sandromaglione.com/"
          key="ogurl"
        />
        <meta
          property="og:image"
          content="https://www.sandromaglione.com/aboutme/static/media/profile3.d01ad877.png"
          key="ogimage"
        />
        <meta
          property="og:site_name"
          content="Sandro Maglione Portfolio And Projects"
          key="ogsitename"
        />
        <meta name="twitter:card" content="summary" key="twcard" />
        <meta name="twitter:creator" content="SandroMaglione" key="twhandle" />
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

const SOURCE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/hello`;
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
