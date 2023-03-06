import { DraggableLocation } from 'react-beautiful-dnd'

import { EditableTableColumnType, PlayerSeasonStat, PlayerStat } from '../types'

export const toTitleCase = (phrase) => {
  return phrase
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export const reOrderDynamicColumns = (list: EditableTableColumnType<any>[],   start: DraggableLocation, end: DraggableLocation) => {
  const result = Array.from(list)
  // split list into two parts according to isHidden
  const hiddenColumns  = result.filter(column => column.isHidden)
  const visibleColumns = result.filter(column => !column.isHidden)

  // if column is dragged from visible to hidden
  if (start.droppableId === 'v' && end.droppableId === 'h') {
    // remove column from visibleColumns
    const [removed]  = visibleColumns.splice(start.index, 1)
    removed.isHidden = true
    // add column to hiddenColumns
    hiddenColumns.splice(end.index, 0, removed)
  }

  // if column is dragged from hidden to visible
  if (start.droppableId === 'h' && end.droppableId === 'v') {
    // remove column from hiddenColumns
    const [removed]  = hiddenColumns.splice(start.index, 1)
    removed.isHidden = false
    // add column to visibleColumns
    visibleColumns.splice(end.index, 0, removed)
  }

  // if column is dragged within visibleColumns
  if (start.droppableId === 'v' && end.droppableId === 'v') {
    // remove column from visibleColumns
    const [removed] = visibleColumns.splice(start.index, 1)
    // add column to visibleColumns
    visibleColumns.splice(end.index, 0, removed)
  }

  // if column is dragged within hiddenColumns
  if (start.droppableId === 'h' && end.droppableId === 'h') {
    // remove column from hiddenColumns
    const [removed] = hiddenColumns.splice(start.index, 1)
    // add column to hiddenColumns
    hiddenColumns.splice(end.index, 0, removed)
  }

  // merge visibleColumns and hiddenColumns
  return [...visibleColumns, ...hiddenColumns]
}

export const reOrder :  (list: any[], startIndex: number, endIndex: number) =>any[] = (list, startIndex, endIndex)  => {
  const result    = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export function tryParseJson (str : string) : string | object {
  try {
    return JSON.parse(str)
  } catch (e) {
    return str
  }
}

export function isBase64 (str) {
  if (!str) { return false }
  if (str === '' || str.trim() === '') { return false }
  return str.length % 4 === 0 && /^[A-Za-z0-9+/]+[=]{0,2}$/.test(str)
}

export const getValuesRecursively = (branch: any, keys: string[], result: object) => {
  const branchKeys = Object.keys(branch)
  // check if branchKEys has any of the keys
  const found = branchKeys.find((key) => {
    return keys.some((k) => key.includes(k))
  })

  // if found is the second key in keys, then this is the first call
  if (found === `${keys[1]}.keyword`) {
    result[keys[0].replace('.keyword', '')] = safeString(branch.key)
  }

  if (found) {
    result[found.replace('.keyword', '')] = safeString(branch[found].buckets[0]?.key)

    if (branch[found].buckets[0]) {
      return getValuesRecursively(branch[found].buckets[0], keys, result)
    } else { return result }
  } else {
    result[keys[keys.length - 1].replace('.keyword', '')] = safeString(branch.key)

    delete branch.key
    delete branch.doc_count
    const final = {
      ...result,
      ...Object.keys(branch).reduce((acc, cur) => {
        acc[cur] = branch[cur].value
        return acc
      }, {})
    }
    return final
  }
}

export const safeString = (str: any) => {
  if (typeof str === 'string' && str?.indexOf('[') !== -1) {
    if (str.includes('Decimal')) {
      const key = str.replace(/Decimal\('(\d+)'\)/g, '$1')
      return JSON.parse(key)
    } else {
      const key = str.replace(/(\[|\])/g, '').replace(/'/g, '')
      return key.split(', ')
    }
  } else {
    return str
  }
}

export const convertPlayerSeasonStatsToPlayerStats = (playerSeasonStats: Omit<PlayerSeasonStat, '__typename'>[]): PlayerStat[] => {
  return playerSeasonStats.map(({ ...playerSeasonStat }) => {
    const playerStat: PlayerStat = {
      ...playerSeasonStat,
      avgAssists: playerSeasonStat.assists / playerSeasonStat.matches,
      avgGoals: playerSeasonStat.goals / playerSeasonStat.matches,
      avgBlockedShots: playerSeasonStat.blocked_shots / playerSeasonStat.matches,
      avgShots: playerSeasonStat.shots / playerSeasonStat.matches,
      avgClearances: playerSeasonStat.clearances / playerSeasonStat.matches,
      avgLongBalls: playerSeasonStat.long_balls / playerSeasonStat.matches,
      avgInterceptions: playerSeasonStat.interceptions / playerSeasonStat.matches,
      avgTackles: playerSeasonStat.tackles / playerSeasonStat.matches,
      avgFouls: playerSeasonStat.fouls / playerSeasonStat.matches,
      avgOffsides: playerSeasonStat.offsides / playerSeasonStat.matches,
      avgCrosses: playerSeasonStat.crosses / playerSeasonStat.matches,
      avgPasses: playerSeasonStat.passes / playerSeasonStat.matches,
      avgCrossesAccuracy: playerSeasonStat.crosses_accuracy / playerSeasonStat.matches,
      avgPassesAccuracy: playerSeasonStat.passes_accuracy / playerSeasonStat.matches,
      avgSaves: playerSeasonStat.saves / playerSeasonStat.matches,
      avgDispossessed: playerSeasonStat.dispossessed / playerSeasonStat.matches,
      avgYellowCards: playerSeasonStat.yellow_cards / playerSeasonStat.matches,
      avgRedCards: playerSeasonStat.red_cards / playerSeasonStat.matches,
      avgDribble: playerSeasonStat.dribble / playerSeasonStat.matches,
      avgDribbleSucc: playerSeasonStat.dribble_succ / playerSeasonStat.matches,
      avgDuels: playerSeasonStat.duels / playerSeasonStat.matches,
      avgDuelsWon: playerSeasonStat.duels_won / playerSeasonStat.matches,
      avgFastbreakGoals: playerSeasonStat.fastbreak_goals / playerSeasonStat.matches,
      avgFastbreaks: playerSeasonStat.fastbreaks / playerSeasonStat.matches,
      avgFastbreakShots: playerSeasonStat.fastbreak_shots / playerSeasonStat.matches,
      avgFirst: playerSeasonStat.first / playerSeasonStat.matches,
      avgFreekickGoals: playerSeasonStat.freekick_goals / playerSeasonStat.matches,
      avgFreekicks: playerSeasonStat.freekicks / playerSeasonStat.matches,
      avgGoodHighClaim: playerSeasonStat.good_high_claim / playerSeasonStat.matches,
      avgHitWoodwork: playerSeasonStat.hit_woodwork / playerSeasonStat.matches,
      avgKeyPasses: playerSeasonStat.key_passes / playerSeasonStat.matches,
      avgLongBallsAccuracy: playerSeasonStat.long_balls_accuracy / playerSeasonStat.matches,
      avgMinutesPlayed: playerSeasonStat.minutes_played / playerSeasonStat.matches,
      avgPenalty: playerSeasonStat.penalty / playerSeasonStat.matches,
      avgPossLosts: playerSeasonStat.poss_losts / playerSeasonStat.matches,
      avgPunches: playerSeasonStat.punches / playerSeasonStat.matches,
      avgRating: playerSeasonStat.rating / playerSeasonStat.matches,
      avgRunsOut: playerSeasonStat.runs_out / playerSeasonStat.matches,
      avgRunsOutSucc: playerSeasonStat.runs_out_succ / playerSeasonStat.matches,
      avgShotsOnTarget: playerSeasonStat.shots_on_target / playerSeasonStat.matches,
      avgWasFouled: playerSeasonStat.was_fouled / playerSeasonStat.matches,
      avgYellow2RedCards: playerSeasonStat.yellow2red_cards / playerSeasonStat.matches,
      player_ability: safeString(playerSeasonStat.player_ability) as Array<Array<number | null> | null> | null,
      player_characteristics: safeString(playerSeasonStat.player_characteristics) as Array< Array< Array< number | null > | null > | null > | null,
      player_positions: safeString(playerSeasonStat.player_positions) as Array< string | string[] | null > | null

    }

    return playerStat
  })
}
