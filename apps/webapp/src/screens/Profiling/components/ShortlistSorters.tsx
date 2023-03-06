import { BudgetCellType, Country, DynamicRow, FootType, InputTypeEnum, League,  PlayerStat, SalaryCellType, Team } from '@monorepo/common/types'
import { safeString }                                                                                              from '@monorepo/common/utils/helper'
import moment                                                                                                      from 'moment'

export const shortlistTableSorters = (dataIndex: any, inputType: keyof typeof InputTypeEnum) => {
  if (dataIndex === 'team_country_col') {
    return function teamCountrySelectSorter (a: DynamicRow, b: DynamicRow) {
      const aName = (a.team_col as Team).country_name || ''
      const bName = (b.team_col as Team).country_name || ''
      return aName.localeCompare(bName)
    }
  }

  if (dataIndex === 'team_league_col') {
    return function teamCountrySelectSorter (a: DynamicRow, b: DynamicRow) {
      const aName = (a.team_col as Team).league_name || ''
      const bName = (b.team_col as Team).league_name || ''
      return aName.localeCompare(bName)
    }
  }

  if (dataIndex === 'player_team_col') {
    return function playerTeamSelectSorter (a: DynamicRow, b: DynamicRow) {
      const aName = (a.player_col as PlayerStat).team_name || ''
      const bName = (b.player_col as PlayerStat).team_name || ''
      return aName.localeCompare(bName)
    }
  }

  if (dataIndex === 'player_position_col') {
    // TODO
    return function playerPositionSelectSorter (a: DynamicRow, b: DynamicRow) {
      const aName = (a.player_col as PlayerStat).player_position || ''
      const bName = (b.player_col as PlayerStat).player_position || ''
      return aName.localeCompare(bName)
    }
  }

  if (dataIndex === 'player_foot_col') {
    return function playerFootSelectSorter (a: DynamicRow, b: DynamicRow) {
      const aName = (a.player_col as PlayerStat).player_preferred_foot || 0
      const bName = (b.player_col as PlayerStat).player_preferred_foot || 0
      return  aName - bName
    }
  }

  if (dataIndex === 'player_height_col') {
    return function playerHeightSelectSorter (a: DynamicRow, b: DynamicRow) {
      const aName = (a.player_col as PlayerStat).player_height || 0
      const bName = (b.player_col as PlayerStat).player_height || 0
      return  aName - bName
    }
  }

  if (dataIndex === 'player_age_col') {
    return function playerAgeSelectSorter (a: DynamicRow, b: DynamicRow) {
      const aName = (a.player_col as PlayerStat).player_age || 0
      const bName = (b.player_col as PlayerStat).player_age || 0
      return  aName - bName
    }
  }

  if (dataIndex === 'player_market_value_col') {
    return function playerMarketValueSelectSorter (a: DynamicRow, b: DynamicRow) {
      const aName = (a.player_col as PlayerStat).player_market_value || 0
      const bName = (b.player_col as PlayerStat).player_market_value || 0
      return  aName - bName
    }
  }

  if (dataIndex === 'player_country_col') {
    return function playerCountrySelectSorter (a: DynamicRow, b: DynamicRow) {
      const aName = (a.player_col as PlayerStat).player_country_name || ''
      const bName = (b.player_col as PlayerStat).player_country_name || ''
      return aName.localeCompare(bName)
    }
  }

  if (dataIndex === 'player_league_col') {
    return function playerLeagueSelectSorter (a: DynamicRow, b: DynamicRow) {
      const aName = (a.player_col as PlayerStat).team_league_name || ''
      const bName = (b.player_col as PlayerStat).team_league_name || ''
      return aName.localeCompare(bName)
    }
  }

  if (dataIndex === 'player_nationality_col') {
    return function playerNationalitySelectSorter (a: DynamicRow, b: DynamicRow) {
      const aName = (a.player_col as PlayerStat).player_nationality || ''
      const bName = (b.player_col as PlayerStat).player_nationality || ''
      return aName.localeCompare(bName)
    }
  }

  if (dataIndex === 'player_contract_until_col') {
    return function playerContractUntilSelectSorter (a: DynamicRow, b: DynamicRow) {
      const aName = (a.player_col as PlayerStat).player_contract_until || 0
      const bName = (b.player_col as PlayerStat).player_contract_until || 0
      return  aName - bName
    }
  }

  if (dataIndex === 'player_ability_col') {
    return function playerAbilitySelectSorter (a: DynamicRow, b: DynamicRow) {
      const aName = safeString((a.player_col as PlayerStat).player_ability)?.length || 0
      const bName = safeString((b.player_col as PlayerStat).player_ability)?.length || 0
      return aName - bName
    }
  }

  if (/player_(\w+)_col/.test(dataIndex)) {
    const statName = dataIndex.replace('player_', '').replace('_col', '')
    return function playerStatSorter (a: DynamicRow, b: DynamicRow) {
      // @ts-ignore
      const aName = (a.player_col as PlayerStat)[statName] || 0
      // @ts-ignore
      const bName = (b.player_col as PlayerStat)[statName] || 0
      return  aName - bName
    }
  }

  if (inputType === 'select') {
    return function selectSorter (a: DynamicRow, b: DynamicRow) {
      const aVal = (a[dataIndex] as string) || ''
      const bVal = (b[dataIndex] as string) || ''
      return aVal.localeCompare(bVal)
    }
  }
  if (inputType === 'multiselect') {
    return function multiselectSorter (a: DynamicRow, b: DynamicRow) {
      const aVal = (a[dataIndex] as { label: string, value: string }[])?.length
      const bVal = (b[dataIndex] as { label: string, value: string }[])?.length
      return aVal - bVal
    }
  }
  if (inputType === 'teamSelect') {
    return function teamSelectSorter (a: DynamicRow, b: DynamicRow) {
      const aName = (a[dataIndex] as Team)?.name || ''
      const bName = (b[dataIndex] as Team)?.name || ''
      return aName.localeCompare(bName)
    }
  }
  if (inputType === 'playerSelect') {
    return function playerSelectSorter (a: DynamicRow, b: DynamicRow) {
      const aName = (a[dataIndex] as PlayerStat)?.player_name || ''
      const bName = (b[dataIndex] as PlayerStat)?.player_name || ''
      return aName.localeCompare(bName)
    }
  }
  if (inputType === 'countrySelect') {
    return function countrySelectSorter (a: DynamicRow, b: DynamicRow) {
      const aName = (a[dataIndex] as Country)?.name || ''
      const bName = (b[dataIndex] as Country)?.name || ''
      return aName.localeCompare(bName)
    }
  }

  if (inputType === 'leagueSelect') {
    return function leagueSelectSorter (a: DynamicRow, b: DynamicRow) {
      const aName = (a[dataIndex] as League)?.name || ''
      const bName = (b[dataIndex] as League)?.name || ''
      return aName.localeCompare(bName)
    }
  }
  if (inputType === 'positionSelect') {
    // 1. Gk
    // 2. Rb
    // 3. Cb right
    // 4. Cb left
    // 5. Left back
    // 6. Def mid
    // 7. Right winger
    // 8. Mid center
    // 10. Att midfielder
    // 11. Left winger
    // 90. Forward
    // 98. Secondary striker
    // 99. Striker

  }
  if (inputType === 'footSelect') {
    return function positionSelectSorter (a: DynamicRow, b: DynamicRow) {
      const aName = (a[dataIndex] as FootType) || ''
      const bName = (b[dataIndex] as FootType) || ''
      return aName.localeCompare(bName)
    }
  }
  if (inputType === 'multiplayerSelect') {
    return function multiplayerSelectSorter (a: DynamicRow, b: DynamicRow) {
      const aLen = (a[dataIndex] as PlayerStat[]).length
      const bLen = (b[dataIndex] as PlayerStat[]).length
      return aLen - bLen
    }
  }
  if (inputType === 'range') {
    return function rangeSorter (a: DynamicRow, b: DynamicRow) {
      const aVal = (a[dataIndex] as [number, number]) || [0, 0]
      const bVal = (b[dataIndex] as [number, number]) || [0, 0]

      const [fromA, toA] = aVal
      const [fromB, toB] = bVal
      const fromDiff     = fromA - fromB
      const toDiff       = toA - toB

      if (fromDiff) {
        return fromDiff
      }
      if (toDiff) {
        return toDiff
      }
      return 0
    }
  }
  if (inputType === 'budget') {
    return function rangeSorter (a: DynamicRow, b: DynamicRow) {
      const aVal = (a[dataIndex] as BudgetCellType) || { from: 0, to: 0 }
      const bVal = (b[dataIndex] as BudgetCellType) || { from: 0, to: 0 }

      const { from: fromA = 0, to: toA = 0 } = aVal
      const { from: fromB = 0, to: toB = 0 } = bVal
      const fromDiff                   = fromA - fromB
      const toDiff                     = toA - toB

      if (fromDiff) {
        return fromDiff
      }
      if (toDiff) {
        return toDiff
      }
      return 0
    }
  }
  if (inputType === 'salary') {
    return function rangeSorter (a: DynamicRow, b: DynamicRow) {
      const aVal = (a[dataIndex] as SalaryCellType) || { from: 0, to: 0 }
      const bVal = (b[dataIndex] as SalaryCellType) || { from: 0, to: 0 }

      const { from: fromA = 0, to: toA = 0 } = aVal
      const { from: fromB = 0, to: toB = 0 } = bVal
      const fromDiff                   = fromA - fromB
      const toDiff                     = toA - toB

      if (fromDiff) {
        return fromDiff
      }
      if (toDiff) {
        return toDiff
      }
      return 0
    }
  }
  if (inputType === 'date') {
    return function dateSorter (a: DynamicRow, b: DynamicRow) {
      if (!a[dataIndex] || !b[dataIndex]) return 0
      const dateA = moment(a[dataIndex] as string)
      const dateB = moment(b[dataIndex] as string)
      return dateA.diff(dateB)
    }
  }
  if (inputType === 'url' || inputType === 'text') {
    return function textSorter (a: DynamicRow, b: DynamicRow) {
      if (!a[dataIndex] || !b[dataIndex]) return 0
      return (a[dataIndex] as string).localeCompare((b[dataIndex] as string))
    }
  }

  if (inputType === 'checkbox') {
    return function checkboxSorter (a: DynamicRow, b: DynamicRow) {
      return (a[dataIndex] as boolean) ? 1 : -1
    }
  }

  if (inputType === 'number') {
    return function numberSorter (a: DynamicRow, b: DynamicRow) {
      return (a[dataIndex] as number) - (b[dataIndex] as number)
    }
  }

  return function defaultSorter (a: DynamicRow, b: DynamicRow) {
    return (a[dataIndex] as string).localeCompare(b[dataIndex] as string)
  }
}
