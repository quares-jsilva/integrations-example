// utils/google.ts
import { google } from 'googleapis';

export const getGoogleClient = (accessToken: string) => {
  const oAuth2Client = new google.auth.OAuth2({
    credentials: {
      access_token: accessToken,
      scope: 'https://www.googleapis.com/auth/calendar'
    }
  });
  // oAuth2Client.setCredentials({ access_token: accessToken });
  return oAuth2Client;
};
