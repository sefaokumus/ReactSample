import { PlayerFilter, PositionGroups } from '@monorepo/common/types'
import moment                           from 'moment'

const analysisFilters: PlayerFilter[] = [
  {
    name: 'Season Year',
    id: 'season_year',
    type: 'multiselect',
    options: Array.from({ length: 7 }, (_, i) => `${moment().year() - i}-${moment().year() + 1 - i}`)
  },
  // {
  //   name: 'Country',
  //   id: 'player_country_id', // team_country_id',
  //   hideTitle: true,
  //   type: 'countrySelect'
  // },
  {
    name: 'League',
    hideTitle: true,
    id: 'season_league_id', // 'match_league_id',
    type: 'leagueSelect'
  },
  {
    name: 'Position Groups',
    id: 'player_position',
    type: 'checkbox',
    hideTitle: true,
    options: [
      { value: 'G', label: 'Goalkeeper' },
      { value: 'D', label: 'Defender' },
      { value: 'M', label: 'Midfielder' },
      { value: 'F', label: 'Forward' }
    ]
  },
  {
    name: 'Positions',
    id: 'player_positions',
    type: 'positionSelect',
    hideTitle: true,
    options: Object.keys(PositionGroups).map(d => ({ value: d, label: PositionGroups[d as keyof typeof PositionGroups] }))
  },
  {
    name: 'Team',
    hideTitle: true,
    id: 'team_id',
    type: 'teamSelect'
  },
  {
    name: 'Player',
    hideTitle: true,
    id: 'player_id',
    type: 'playerSelect'
  },
  {
    name: 'Nationality',
    id: 'player_country_id',
    hideTitle: true,
    type: 'countrySelect'
  },
  {
    name: 'Age',
    id: 'player_age',
    hideTitle: true,
    type: 'range',
    minVal: 0,
    maxVal: 50
  },
  {
    name: 'Height',
    id: 'player_height',
    hideTitle: true,
    type: 'range',
    minVal: 150,
    maxVal: 250
  },
  {
    name: 'Minutes Played',
    id: 'minutes_played',
    hideTitle: true,
    type: 'range',
    minVal: 0,
    maxVal: 10000
  },
  {
    name: 'Team',
    hideTitle: true,
    id: 'comparison_team_id',
    type: 'teamSelect'
  },
  {
    name: 'Player',
    hideTitle: true,
    id: 'comparison_player_id',
    type: 'playerSelect'
  }

]

export default analysisFilters
