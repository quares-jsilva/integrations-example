// pages/api/calendar.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { google } from 'googleapis';
import { getGoogleClient } from '../../../../api';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });

    if (!session) {
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    console.log('session: ', session )
    
    const auth = getGoogleClient( session.accessToken! );

    console.log({ auth })

    const calendar = await google.calendar({ version: 'v3', auth }).events.list({
      'calendarId': 'primary',
      // 'timeMin': (new Date()).toISOString(),
      // 'showDeleted': false,
      // 'singleEvents': true,
      // 'maxResults': 10,
      // 'orderBy': 'startTime',
    });

    console.log({ calendar })
    
    // const events = await calendar..patch({ calendarId: 'primary' })
    // console.log({ events  })

    res.status(200).json( calendar );
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    res.status(500).json([]);
  }
};
