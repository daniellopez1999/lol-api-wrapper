import { LeagueOfLegendsApiWrapper } from './RGLoL';
import dotenv from 'dotenv';
import { Region } from './types/constants';
dotenv.config();

const lol = new LeagueOfLegendsApiWrapper({
  API_KEY: process.env.RIOT_GAMES_API_KEY!,
  region: Region.EUW1,
});
async function getSummoner() {
  const account = await lol.getSummonerByNameAndTag({
    name: 'Motero Sónico',
    tag: '6478',
  });
  console.log(account);
}
getSummoner();
