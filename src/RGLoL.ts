import axios from 'axios';
import {
  GetSummonerByNameAndTag,
  RiotAccountDto,
  SummonerDto,
  LoLApiWrapperConstructor,
  MatchDto,
} from './types';
import { RiotRegion, RiotServer, RiotServerToRegion } from './types/constants';

export class LeagueOfLegendsApiWrapper {
  API_KEY: string;
  USE_API_KEY: string;
  REGION: RiotRegion;
  SERVER: RiotServer;
  RIOT_URL: string;
  LOL_BASE_URL: string;
  constructor(params: LoLApiWrapperConstructor) {
    if (!params.API_KEY) {
      throw new Error('No API Key provided');
    }
    this.API_KEY = params.API_KEY;
    this.USE_API_KEY = `api_key=${this.API_KEY}`;
    this.LOL_BASE_URL = `https://${params.server.toLowerCase()}.api.riotgames.com/lol`;
    this.SERVER = params.server;
    this.REGION = RiotServerToRegion[params.server as RiotServer];
    this.RIOT_URL = `https://${this.REGION.toLowerCase()}.api.riotgames.com`;
  }

  async getAccountByNameAndTag(
    data: GetSummonerByNameAndTag
  ): Promise<RiotAccountDto> {
    try {
      const { name, tag } = data;

      const request = await axios.get(`
        ${this.RIOT_URL}/riot/account/v1/accounts/by-riot-id/${name}/${tag}?${this.USE_API_KEY}
      `);
      return request.data as RiotAccountDto;
    } catch (error) {
      console.error(error);
      throw new Error('error');
    }
  }

  async getAccountByPUUID(PUUID: string): Promise<RiotAccountDto> {
    const request = await axios.get(
      `https://${this.REGION.toLowerCase()}.api.riotgames.com/riot/account/v1/accounts/by-puuid/${PUUID}?${
        this.USE_API_KEY
      }`
    );
    return request.data as RiotAccountDto;
  }

  async getSummonerByPUUID(PUUID: string): Promise<SummonerDto> {
    const request = await axios.get(
      `${this.LOL_BASE_URL}/summoner/v4/summoners/by-puuid/${PUUID}?${this.USE_API_KEY}`
    );
    return request.data;
  }

  async getSummonerByNameAndTag(
    data: GetSummonerByNameAndTag
  ): Promise<SummonerDto> {
    try {
      const account = await this.getAccountByNameAndTag({
        name: data.name,
        tag: data.tag,
      });

      const summoner = await this.getSummonerByPUUID(account.puuid);

      return summoner as SummonerDto;
    } catch (error) {
      console.error(error);
      throw new Error('error');
    }
  }

  async getMatchesIDByNameAndTag(
    data: GetSummonerByNameAndTag
  ): Promise<string[]> {
    const { name, tag } = data;
    const account = await this.getAccountByNameAndTag({ name: name, tag: tag });

    const request = await axios.get(
      `https://${this.REGION.toLowerCase()}.api.riotgames.com/lol/match/v5/matches/by-puuid/${
        account.puuid
      }/ids?${this.USE_API_KEY}`
    );
    return request.data as string[];
  }

  async getMatchByID(matchID: string) {
    const request = await axios.get(
      `https://${this.REGION.toLowerCase()}.api.riotgames.com/lol/match/v5/matches/${matchID}?${
        this.USE_API_KEY
      }`
    );
    return request.data as MatchDto;
  }
}
