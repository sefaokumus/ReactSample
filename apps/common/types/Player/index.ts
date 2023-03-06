/* eslint-disable no-unused-vars */

import { PlayerSeasonStat } from "../API";

export enum PositionEnum {
  GK= 'Goalkeeper',
  CB= 'Centre Back',
  LCB= 'Left Centre Back',
  RCB= 'Right Centre Back',
  LB= 'Left-Back',
  RB= 'Right-Back',
  LWB= 'Left Wing-Back',
  RWB= 'Right Wing-Back',
  DM= 'Defensive Midfield',
  LDM= 'Left Defensive Midfield',
  RDM= 'Right Defensive Midfield',
  CM= 'Central Midfield',
  LCM= 'Left Central Midfield',
  RCM= 'Right Central Midfield',
  LM= 'Left Midfield',
  RM= 'Right Midfield',
  CAM= 'Central Attacking Midfield',
  RAM= 'Right Attacking Midfield',
  LAM= 'Left Attacking Midfield',
  LW= 'Left Wing',
  RW= 'Right Wing',
  LF= 'Left Forward',
  RF= 'Right Forward',
  CF= 'Centre-Forward',
  ST= 'Striker',
}


export enum PositionGroups {
  LW= 'Left Wing',
  RW= 'Right Wing',
  ST= 'Striker',
  AM= 'Attacking Midfield',
  DM= 'Defensive Midfield',
  DC= 'Defensive Centre',
  ML= 'Midfield Left',
  MR= 'Midfield Right',
  MC= 'Midfield Centre',
  DL= 'Defensive Left',
  DR= 'Defensive Right',
  GK = 'Goalkeeper',
}

export enum FootEnum
{ 
  'Unknown' = '0',
  'Left' = '1',
  'Right' = '2',
  'Either' = '3'
}

export enum StatEnum {
  avgFirst = 'avgFirst',
  avgGoals = 'avgGoals',
  avgPenalty = 'avgPenalty',
  avgAssists = 'avgAssists',
  avgMinutesPlayed = 'avgMinutesPlayed',
  avgRedCards = 'avgRedCards',
  avgYellowCards = 'avgYellowCards',
  avgShots = 'avgShots',
  avgShotsOnTarget = 'avgShotsOnTarget',
  avgDribble = 'avgDribble',
  avgDribbleSucc = 'avgDribbleSucc',
  avgClearances = 'avgClearances',
  avgBlockedShots = 'avgBlockedShots',
  avgInterceptions = 'avgInterceptions',
  avgTackles = 'avgTackles',
  avgPasses = 'avgPasses',
  avgPassesAccuracy = 'avgPassesAccuracy',
  avgKeyPasses = 'avgKeyPasses',
  avgCrosses = 'avgCrosses',
  avgCrossesAccuracy = 'avgCrossesAccuracy',
  avgLongBalls = 'avgLongBalls',
  avgLongBallsAccuracy = 'avgLongBallsAccuracy',
  avgDuels = 'avgDuels',
  avgDuelsWon = 'avgDuelsWon',
  avgDispossessed = 'avgDispossessed',
  avgFouls = 'avgFouls',
  avgWasFouled = 'avgWasFouled',
  avgOffsides = 'avgOffsides',
  avgYellow2RedCards = 'avgYellow2RedCards',
  avgSaves = 'avgSaves',
  avgPunches = 'avgPunches',
  avgRunsOut = 'avgRunsOut',
  avgRunsOutSucc = 'avgRunsOutSucc',
  avgGoodHighClaim = 'avgGoodHighClaim',
  avgRating = 'avgRating',
  avgFreekicks = 'avgFreekicks',
  avgFreekickGoals = 'avgFreekickGoals',
  avgHitWoodwork = 'avgHitWoodwork',
  avgFastbreaks = 'avgFastbreaks',
  avgFastbreakShots = 'avgFastbreakShots',
  avgFastbreakGoals = 'avgFastbreakGoals',
  avgPossLosts = 'avgPossLosts'
  }

export interface PlayerStat extends Omit<PlayerSeasonStat, '__typename' | 'player_ability' | 'player_characteristics' | 'player_positions'>, Record<StatEnum, number> {
  player_ability?: Array< Array< number | null > | null > | null,
  player_characteristics?: Array< Array< Array< number | null > | null > | null > | null,
  player_positions?: Array< string | string[] | null > | null,
  // player_ability: Array<Array<number>>
  // player_characteristics: Array<Array<Array<number | null > | null> | null> | null,
  // player_positions: Array<string>
}

export type PositionType = keyof typeof PositionEnum | ''
export type FootType = keyof typeof FootEnum
