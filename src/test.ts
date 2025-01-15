import { LeagueOfLegendsApiWrapper } from './RGLoL';
import dotenv from 'dotenv';
import { RiotServer } from './types/constants';
import { MatchDto } from './types';
dotenv.config();

const mockDataFE = {
  server: RiotServer.EUW1,
};
const lol = new LeagueOfLegendsApiWrapper({
  API_KEY: process.env.RIOT_GAMES_API_KEY!,
  server: mockDataFE.server,
});
async function getSummoner() {
  const account = await lol.getSummonerByNameAndTag({
    name: 'Motero Sónico',
    tag: '6478',
  });
  console.log(account);
}
async function getMatchData() {
  const matches = await lol.getMatchesIDByNameAndTag({
    name: 'Motero Sónico',
    tag: '6478',
  });

  const match: MatchDto = await lol.getMatchByID(matches[0]);
  console.log(match);
  return match;
}
// getSummoner();
getMatchData();
