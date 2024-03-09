import axios from "axios";
export const client = axios.create({
  baseURL: 'https://api.opendota.com/api',
});

const key = 'KEY_HERE'
// To use your key, add api_key=XXXX as a query parameter to your API request:
// https://api.opendota.com/api/matches/271145478?api_key=ab903a9d-7331-4805-b986-00dc55355759'