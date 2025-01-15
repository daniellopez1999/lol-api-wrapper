import { LeagueOfLegendsApiWrapper } from './RGLoL';
import dotenv from 'dotenv';
dotenv.config();

const lol = new LeagueOfLegendsApiWrapper(process.env.RIOT_GAMES_API_KEY!);
async function getSummoner() {
  const account = await lol.getSummonerByNameAndTag({
    name: 'Motero Sónico',
    tag: '6478',
  });
}
getSummoner();
