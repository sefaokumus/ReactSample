import { PositionEnum, PositionType, StatEnum } from '../types'

export const translatePlayerStat = (stat: StatEnum) => {
  switch (stat) {
  case StatEnum.avgFirst:
    return 'First'
  case StatEnum.avgGoals:
    return 'Goals'
  case StatEnum.avgPenalty:
    return 'Penalty'
  case StatEnum.avgAssists:
    return 'Assists'
  case StatEnum.avgMinutesPlayed:
    return 'Minutes Played'
  case StatEnum.avgRedCards:
    return 'Red Cards'
  case StatEnum.avgYellowCards:
    return 'Yellow Cards'
  case StatEnum.avgShots:
    return 'Shots'
  case StatEnum.avgShotsOnTarget:
    return 'Shots On Target'
  case StatEnum.avgDribble:
    return 'Dribble'
  case StatEnum.avgDribbleSucc:
    return 'Successful Dribble'
  case StatEnum.avgClearances:
    return 'Clearances'
  case StatEnum.avgBlockedShots:
    return 'Blocked Shots'
  case StatEnum.avgInterceptions:
    return 'Interceptions'
  case StatEnum.avgTackles:
    return 'Tackles'
  case StatEnum.avgPasses:
    return 'Passes'
  case StatEnum.avgPassesAccuracy:
    return 'Passes Accuracy'
  case StatEnum.avgKeyPasses:
    return 'Key Passes'
  case StatEnum.avgCrosses:
    return 'Crosses'
  case StatEnum.avgCrossesAccuracy:
    return 'Crosses Accuracy'
  case StatEnum.avgLongBalls:
    return 'Long Balls'
  case StatEnum.avgLongBallsAccuracy:
    return 'Long Balls Accuracy'
  case StatEnum.avgDuels:
    return 'Duels'
  case StatEnum.avgDuelsWon:
    return 'Duels Won'
  case StatEnum.avgDispossessed:
    return 'Dispossessed'
  case StatEnum.avgFouls:
    return 'Fouls'
  case StatEnum.avgWasFouled:
    return 'Was Fouled'
  case StatEnum.avgOffsides:
    return 'Offsides'
  case StatEnum.avgYellow2RedCards:
    return 'Yellow to Red Cards'
  case StatEnum.avgSaves:
    return 'Saves'
  case StatEnum.avgPunches:
    return 'Punches'
  case StatEnum.avgRunsOut:
    return 'Runs Out'
  case StatEnum.avgRunsOutSucc:
    return 'Successful Runs Out'
  case StatEnum.avgGoodHighClaim:
    return 'Good High Claim'
  case StatEnum.avgRating:
    return 'Rating'
  case StatEnum.avgFreekicks:
    return 'Freekicks'
  case StatEnum.avgFreekickGoals:
    return 'Freekick Goals'
  case StatEnum.avgHitWoodwork:
    return 'Hit Woodwork'
  case StatEnum.avgFastbreaks:
    return 'Fastbreaks'
  case StatEnum.avgFastbreakShots:
    return 'Fastbreak Shots'
  case StatEnum.avgFastbreakGoals:
    return 'Fast Goals'
  case StatEnum.avgPossLosts:
    return 'Possession Lost'
  default:
    return 'Unknown'
  }
}

export const positionMap: Record<string, PositionType> = {
  'left forward': 'LW',
  'right forward': 'RW',
  forward: 'ST',
  'Attacking type': 'CAM',
  'left midfield': 'LM',
  'center midfield': 'CM',
  'right midfield': 'RM',
  'Defensive center': 'DM',
  'left back': 'LB',
  'center back': 'CB',
  'right back': 'RB',
  'goalkeeper,': 'GK'
}

export type PositionGroups = {
  LW: PositionEnum.LW | PositionEnum.LF,
  RW: PositionEnum.RW | PositionEnum.RF
  ST: PositionEnum.ST | PositionEnum.CF
  AM: PositionEnum.CAM | PositionEnum.RAM | PositionEnum.LAM
  DM: PositionEnum.DM | PositionEnum.RDM | PositionEnum.LDM
  DC: PositionEnum.CB | PositionEnum.RCB | PositionEnum.LCB
  ML: PositionEnum.LM
  MR: PositionEnum.RM
  MC: PositionEnum.CM | PositionEnum.RCM | PositionEnum.LCM
  DL: PositionEnum.LB | PositionEnum.LWB
  DR: PositionEnum.RB | PositionEnum.RWB
  GK: PositionEnum.GK
}

export const footMap = {
  0: 'Unknown',
  1: 'Left',
  2: 'Right',
  3: 'Left And Right'
}

export const characteristicsMap = {
  1: 'Unloading',
  2: 'Penalty Kick',
  3: 'Direct Free Kick',
  4: 'Long Shot',
  5: 'Single Shot',
  6: 'Pass',
  7: 'Organize the Attack',
  8: 'Dribble',
  9: 'Interrupt the Ball',
  10: 'Tackle',
  11: 'Stability',
  12: 'Excellent',
  13: 'Long Pass',
  14: 'Ball Control',
  15: 'Air Confrontation',
  16: 'Ground Confrontation',
  17: 'Error Tendency',
  18: 'Discipline',
  19: 'Punch Penalty',
  20: 'Reaction',
  21: 'Abandon Goal to Participate in Attack',
  22: 'High ball Interception',
  23: 'Handle the Ball',
  24: 'Long Shots',
  25: 'Stance',
  26: 'High Pressing',
  27: 'Long Shots Save',
  28: 'Crossing',
  29: 'Offside Awareness',
  30: 'Close Shot Saves',
  31: 'Concentration',
  32: 'Defensive Participation',
  33: 'Key Passing Ball',
  34: 'Header',
  35: 'Set Ball',
  36: 'Straight Pass',
  37: 'Counter Attack',
  38: 'One Kick',
  39: 'Up High Ball',
  40: 'Fouling',
  41: 'Inward Cut',
  42: 'Boxing Ball',
  43: 'Clearance'

}

export const abilityMap = {
  1: 'Save',
  2: 'Pre-judgment',
  3: 'Handling the ball',
  4: 'Air',
  5: 'Tactics',
  6: 'Attack',
  7: 'Defense',
  8: 'Creativity',
  9: 'Technology'
}
export const leagueTypeMap = {
  0: 'Unknown',
  1: 'League',
  2: 'Cup',
  3: 'Friendly'
}

export const tPosition = (position: string | null | undefined) : (PositionType | string) => {
  if (!position) return ''

  return positionMap[position] || position
}

export const tFoot = (foot: number |string | null | undefined) => {
  if (!foot) return ''

  return footMap[foot] || foot
}

export const tCharacteristics = (number: number | string | null) => {
  if (!number) return ''

  return characteristicsMap[number] || number
}

export const tAbility = (number: number | string) => {
  if (!number) return ''

  return abilityMap[number] || number
}

export const tLeagueType = (number: number | string) => {
  if (!number) return ''

  return leagueTypeMap[number] || number
}
