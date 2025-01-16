import { LeagueOfLegendsApiWrapper } from './RGLoL';
import dotenv from 'dotenv';
import { RiotServer } from './types/constants';
import { MatchDto, SummonerDto, SummonerRiotAccount } from './types';
import { MatchHelper } from './MatchHelper';
import { ItemsHelper } from './ItemsHelper';
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
  const particiantsData: SummonerRiotAccount[] = [];

  for (const participant of match.metadata.participants) {
    const summoner = await lol.getSummonerByPUUID(participant);
    const account = await lol.getAccountByPUUID(summoner.puuid);
    particiantsData.push({ riotAccount: account, summoner: summoner });
  }
  console.log('participantsData', particiantsData);
  console.log('info.participants', match.info.participants);

  const basicDataFromParticipants = MatchHelper.getBasicDataFromParticipants(
    match.info.participants
  );
  console.log('basicDataFromParticipants', basicDataFromParticipants);
  console.log('testImage', ItemsHelper.getImagesFromItems([1004, 1006, 1018]));
  return match;
}

// getSummoner();
getMatchData();
