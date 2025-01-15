import axios from 'axios';
import {
  GetSummonerByNameAndTag,
  RiotAccountDto,
  SummonerDto,
  LoLApiWrapperConstructor,
} from './types';

export class LeagueOfLegendsApiWrapper {
  API_KEY: string;
  USE_API_KEY: string;
  RIOT_URL: string = 'https://europe.api.riotgames.com';
  LOL_BASE_URL: string;
  constructor(params: LoLApiWrapperConstructor) {
    this.API_KEY = params.API_KEY;
    this.USE_API_KEY = `api_key=${this.API_KEY}`;
    this.LOL_BASE_URL = `https://${params.region.toLowerCase()}.api.riotgames.com/lol`;
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

  async getSummonerByNameAndTag(
    data: GetSummonerByNameAndTag
  ): Promise<SummonerDto> {
    try {
      const account = await this.getAccountByNameAndTag({
        name: data.name,
        tag: data.tag,
      });
      console.log(
        'LOG',
        `${this.LOL_BASE_URL}/summoner/v4/summoners/by-puuid/${account.puuid}?${this.USE_API_KEY}`
      );
      const request = await axios.get(
        `${this.LOL_BASE_URL}/summoner/v4/summoners/by-puuid/${account.puuid}?${this.USE_API_KEY}`
      );
      return request.data as SummonerDto;
    } catch (error) {
      console.error(error);
      throw new Error('error');
    }
  }
}
