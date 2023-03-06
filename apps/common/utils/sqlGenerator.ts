import { ScreenFilterObjType } from '../types'

import { analysisScreenWhitelist } from './whitelist'

const selectFields = `count(*) as matchCount, 
AVG(first) as avgFirst, 
SUM(first) as sumFirst, 
AVG(goals) as avgGoals, 
SUM(goals) as sumGoals, 
AVG(penalty) as avgPenalty, 
SUM(penalty) as sumPenalty, 
AVG(assists) as avgAssists, 
SUM(assists) as sumAssists, 
AVG(minutes_played) as avgMinutesPlayed, 
SUM(minutes_played) as sumMinutesPlayed, 
AVG(red_cards) as avgRedCards, 
SUM(red_cards) as sumRedCards, 
AVG(yellow_cards) as avgYellowCards, 
SUM(yellow_cards) as sumYellowCards, 
AVG(shots) as avgShots, 
SUM(shots) as sumShots, 
AVG(shots_on_target) as avgShotsOnTarget, 
SUM(shots_on_target) as sumShotsOnTarget, 
AVG(dribble) as avgDribble, 
SUM(dribble) as sumDribble, 
AVG(dribble_succ) as avgDribbleSucc, 
SUM(dribble_succ) as sumDribbleSucc, 
AVG(clearances) as avgClearances, 
SUM(clearances) as sumClearances, 
AVG(blocked_shots) as avgBlockedShots, 
SUM(blocked_shots) as sumBlockedShots, 
AVG(interceptions) as avgInterceptions, 
SUM(interceptions) as sumInterceptions, 
AVG(tackles) as avgTackles, 
SUM(tackles) as sumTackles, 
AVG(passes) as avgPasses, 
SUM(passes) as sumPasses, 
AVG(passes_accuracy) as avgPassesAccuracy, 
SUM(passes_accuracy) as sumPassesAccuracy, 
AVG(key_passes) as avgKeyPasses, 
SUM(key_passes) as sumKeyPasses, 
AVG(crosses) as avgCrosses, 
SUM(crosses) as sumCrosses, 
AVG(crosses_accuracy) as avgCrossesAccuracy, 
SUM(crosses_accuracy) as sumCrossesAccuracy, 
AVG(long_balls) as avgLongBalls, 
SUM(long_balls) as sumLongBalls, 
AVG(long_balls_accuracy) as avgLongBallsAccuracy, 
SUM(long_balls_accuracy) as sumLongBallsAccuracy, 
AVG(duels) as avgDuels, 
SUM(duels) as sumDuels, 
AVG(duels_won) as avgDuelsWon, 
SUM(duels_won) as sumDuelsWon, 
AVG(dispossessed) as avgDispossessed, 
SUM(dispossessed) as sumDispossessed, 
AVG(fouls) as avgFouls, 
SUM(fouls) as sumFouls, 
AVG(was_fouled) as avgWasFouled, 
SUM(was_fouled) as sumWasFouled, 
AVG(offsides) as avgOffsides, 
SUM(offsides) as sumOffsides, 
AVG(yellow2red_cards) as avgYellow2RedCards, 
SUM(yellow2red_cards) as sumYellow2RedCards, 
AVG(saves) as avgSaves, 
SUM(saves) as sumSaves, 
AVG(punches) as avgPunches, 
SUM(punches) as sumPunches, 
AVG(runs_out) as avgRunsOut, 
SUM(runs_out) as sumRunsOut, 
AVG(runs_out_succ) as avgRunsOutSucc, 
SUM(runs_out_succ) as sumRunsOutSucc, 
AVG(good_high_claim) as avgGoodHighClaim, 
SUM(good_high_claim) as sumGoodHighClaim, 
AVG(rating) as avgRating, 
SUM(rating) as sumRating, 
AVG(freekicks) as avgFreekicks, 
SUM(freekicks) as sumFreekicks, 
AVG(freekick_goals) as avgFreekickGoals, 
SUM(freekick_goals) as sumFreekickGoals, 
AVG(hit_woodwork) as avgHitWoodwork, 
SUM(hit_woodwork) as sumHitWoodwork, 
AVG(fastbreaks) as avgFastbreaks, 
SUM(fastbreaks) as sumFastbreaks, 
AVG(fastbreak_shots) as avgFastbreakShots, 
SUM(fastbreak_shots) as sumFastbreakShots, 
AVG(fastbreak_goals) as avgFastbreakGoals, 
SUM(fastbreak_goals) as sumFastbreakGoals, 
AVG(poss_losts) as avgPossLosts, 
SUM(poss_losts) as sumPossLosts`

export const analysisGroupingColumns = ['player_id', 'player_name']
export const attributeGroupingColumns = ['player_id', 'player_name', 'player_logo', 'player_age', 'team_name', 'team_id', 'team_logo', 'player_country_id', 'player_country_name', 'player_country_logo', 'player_positions', 'player_characteristics', 'player_ability'] // ,

export function createAnalysisSQLQuery (filters: ScreenFilterObjType): string {
  if (Object.keys(filters).length === 0) {
    return ''
  }

  const whereClause = Object.keys(filters).map(key => {
    const filter = filters[key]

    if (filter.type === 'range') {
      return `${filter.id} BETWEEN ${(filter.value as [number, number])[0]} AND ${(filter.value as [number, number])[1]}`
    } else if (filter.type === 'multiselect' || filter.type === 'checkbox' || filter.type === 'positionSelect') {
      return `${filter.id} IN (${(filter.value as string[]).map(value => `'${value}'`).join(',')})`
    } else if (filter.type === 'playerSelect' || filter.type === 'teamSelect' || filter.type === 'leagueSelect' || filter.type === 'countrySelect') {
      return `${filter.id} IN ('${(filter.value as {label : string, value:string}[]).map(value => value.value).join("','")}')`
    } else {
      return `${filter.id} = '${filter.value}'`
    }
  })

  const query = `SELECT 
                  *
                  FROM player_season_stat
                  WHERE season_league_id IN (${analysisScreenWhitelist.map(w => `'${w}'`).join(',')}) ${whereClause.length > 0 ? 'AND' : ''} ${whereClause.join(' AND ')}
                  LIMIT  10000`

  console.log(query)
  return query
}

export function createComparisonFilterQuery (selectedTeams? :{label: string, value: string}[], selectedPlayers?:{label: string, value: string}[]) : string {
  const whereClause = []
  if (selectedTeams?.length === 0 && selectedPlayers?.length === 0) {
    return ''
  }

  if (selectedTeams && selectedTeams.length > 0) {
    whereClause.push(`team_id IN ('${selectedTeams.map(team => team.value).join("','")}')`)
  }

  if (selectedPlayers && selectedPlayers.length > 0) {
    whereClause.push(`player_id IN ('${selectedPlayers.map(player => player.value).join("','")}')`)
  }

  const query = `SELECT 
                 *
                 FROM player_season_stat
                 WHERE season_league_id IN (${analysisScreenWhitelist.map(w => `'${w}'`).join(',')}) ${whereClause.length > 0 ? 'AND' : ''} ${whereClause.join(' AND ')}
                 LIMIT  10000`

  console.log(query)
  return query
}

export function createAttributesSQLQuery (filters: ScreenFilterObjType): string {
  if (Object.keys(filters).length === 0) {
    return ''
  }

  const whereClause = Object.keys(filters).filter(key => key.indexOf('avg') === -1).map(key => {
    const filter = filters[key]

    if (filter.type === 'range' && filter.id !== 'minutes_played') {
      return `${filter.id} >= ${(filter.value as [number, number])[0]} AND ${filter.id} <= ${(filter.value as [number, number])[1]}`
    } else if (filter.type === 'multiselect' || filter.type === 'checkbox' || filter.type === 'positionSelect') {
      return `${filter.id} IN (${(filter.value as string[]).map(value => `'${value}'`).join(',')})`
    } else if (filter.type === 'playerSelect' || filter.type === 'teamSelect' || filter.type === 'leagueSelect' || filter.type === 'countrySelect') {
      return `${filter.id} IN ('${(filter.value as {label : string, value:string}[]).map(value => value.value).join("','")}')`
    } else {
      return `${filter.id} = '${filter.value}'`
    }
  })

  // const havingClause = Object.keys(filters).filter(key => key.indexOf('avg') !== -1).map(key => {
  //   const filter = filters[key]
  //   return `(${key} >= ${(filter.value as [number, number])[0]} AND ${key} <= ${(filter.value as [number, number])[1]})`
  // })

  const query = `SELECT 
                  *
                  FROM player_season_stat
                  WHERE season_league_id IN (${analysisScreenWhitelist.map(w => `'${w}'`).join(',')}) ${whereClause.length > 0 ? 'AND' : ''} ${whereClause.join(' AND ')}
                  LIMIT  1000`

  console.log(query)
  return query
}

export function createGetPlayerStatSqlQuery (player_id: string) : string {
  if (player_id === '') {
    return ''
  }
  const query = `SELECT ${selectFields} FROM player_match_stat WHERE player_id = '${player_id}' GROUP BY player_id, player_name  LIMIT  10000`
  return query
}
