import type { NextApiRequest, NextApiResponse } from 'next';

import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const response = await notion.databases.query({
    database_id: databaseId as string,
    sorts: [
      {
        property: 'date',
        direction: 'descending',
      },
    ],
  });
  res.status(200).json({ response });
}
