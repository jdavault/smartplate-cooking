import { Client, Account, Avatars, Databases } from 'react-native-appwrite';

export const client = new Client()
  .setEndpoint('https://nyc.cloud.appwrite.io/v1')
  .setProject('6826e85e000d14956dc8')
  .setPlatform('cooking.smartplate-ninja');

export const account = new Account(client);
export const avatars = new Avatars(client);
export const databases = new Databases(client);
