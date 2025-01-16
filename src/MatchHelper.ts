import { BasicParticipantData, ParticipantDto } from './types';
import { ItemsHelper } from './ItemsHelper';
export class MatchHelper {
  constructor() {}

  public static getBasicDataFromParticipants(
    participantsData: ParticipantDto[]
  ): BasicParticipantData[] {
    const participants: BasicParticipantData[] = participantsData.map(
      (participant) => {
        return {
          championName: participant.championName,
          championId: participant.championId,
          assists: participant.assists,
          kills: participant.kills,
          deaths: participant.deaths,
          itemsPurchased: participant.itemsPurchased,
          puuid: participant.puuid,
          riotIdGameName: participant.riotIdGameName,
          items: ItemsHelper.getParticipantItems(participant),
        };
      }
    );
    return participants;
  }
}
