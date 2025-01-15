import axios from 'axios';
import { GetSummonerByNameAndTag, RiotAccountDto, SummonerDto } from './types';

export class LeagueOfLegendsApiWrapper {
  API_KEY: string;
  USE_API_KEY: string;
  RIOT_URL: string = 'https://europe.api.riotgames.com';
  EUW1_URL: string = 'https://euw1.api.riotgames.com/lol';
  constructor(API_KEY: string) {
    this.API_KEY = API_KEY;
    this.USE_API_KEY = `api_key=${this.API_KEY}`;
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

      const request = await axios.get(
        `${this.EUW1_URL}/summoner/v4/summoners/by-puuid/${account.puuid}?${this.USE_API_KEY}`
      );
      return request.data as SummonerDto;
    } catch (error) {
      console.error(error);
      throw new Error('error');
    }
  }
}
