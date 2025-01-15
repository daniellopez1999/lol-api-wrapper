export interface GetSummonerByNameAndTag {
  name: string;
  tag: string;
}

export interface RiotAccountDto {
  puuid: string;
  gameName: string;
  tagLine: string;
}

export interface SummonerDto {
  id: string;
  accountId: string;
  puuid: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
}

export interface LoLApiWrapperConstructor {
  API_KEY: string;
  region: string;
}
