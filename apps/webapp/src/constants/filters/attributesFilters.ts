import { PlayerFilter, PositionGroups } from '@monorepo/common/types'

const attributesFilters: PlayerFilter[] = [
  {
    name: 'Country',
    id: 'team_country_id',
    hideTitle: true,
    type: 'countrySelect'
  },
  {
    name: 'League',
    hideTitle: true,
    id: 'season_league_id',
    type: 'leagueSelect'
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
    name: 'Nationality',
    id: 'player_country_id',
    hideTitle: true,
    type: 'countrySelect'
  },
  {
    name: 'Contract Days',
    id: 'contractEndDays',
    hideTitle: true,
    type: 'range',
    minVal: 0,
    maxVal: 1800
  },
  {
    name: 'Minutes Played',
    id: 'sumMinutesPlayed',
    hideTitle: true,
    type: 'range',
    minVal: 0,
    maxVal: 10000
  },
  {
    name: 'Value (M $)',
    id: 'market_value',
    hideTitle: true,
    type: 'range',
    minVal: 0,
    maxVal: 300
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
    name: 'Foot',
    id: 'player_preferred_foot',
    hideTitle: true,
    type: 'footSelect'
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
    name: 'Rating',
    id: 'avgRating',
    hideTitle: true,
    type: 'range',
    minVal: 0,
    maxVal: 20
  },
  {
    name: 'Attacking',
    id: 'attacking-filters',
    type: 'filter',
    options: [
      {
        name: 'Goal Per Game',
        id: 'avgGoals',
        type: 'range',
        minVal: 0,
        maxVal: 20
      },
      {
        name: 'Assist Per Game',
        id: 'avgAssists',
        type: 'range',
        minVal: 0,
        maxVal: 20
      },
      {
        name: 'Dribbles Per Game',
        id: 'avgDribble',
        type: 'range',
        minVal: 0,
        maxVal: 20
      },
      {
        name: 'Shots Total Per Game',
        id: 'avgShots',
        type: 'range',
        minVal: 0,
        maxVal: 20
      }
    ]
  },
  {
    name: 'Passing',
    id: 'passing-parameters',
    type: 'filter',
    options: [
      {
        name: 'Cross Total Per Game',
        id: 'avgCrosses',
        type: 'range',
        minVal: 0,
        maxVal: 20
      },
      {
        name: 'Cross Success Per Game',
        id: 'avgCrossesAccuracy',
        type: 'range',
        minVal: 0,
        maxVal: 20
      },
      {
        name: 'Pass Accuracy Per Game',
        id: 'pavgPassesAccuracy',
        type: 'range',
        minVal: 0,
        maxVal: 20
      },
      {
        name: 'Key Pass Per Game',
        id: 'avgKeyPasses',
        type: 'range',
        minVal: 0,
        maxVal: 20
      },
      {
        name: 'Pass Total Per Game',
        id: 'avgPasses',
        type: 'range',
        minVal: 0,
        maxVal: 20
      },
      {
        name: 'Yellow Card Per Game',
        id: 'avgYellowCards',
        type: 'range',
        minVal: 0,
        maxVal: 20
      },
      {
        name: 'Was Fouls Per Game',
        id: 'avgWasFouled',
        type: 'range',
        minVal: 0,
        maxVal: 20
      }
    ]
  },
  {
    name: 'Defending',
    id: 'Defending-parameters',
    type: 'filter',
    options: [
      {
        name: 'Blocks Per Game',
        id: 'avgBlockedShots',
        type: 'range',
        minVal: 0,
        maxVal: 20
      },
      {
        name: 'Interceptions Per Game',
        id: 'avgInterceptions',
        type: 'range',
        minVal: 0,
        maxVal: 20
      },
      {
        name: 'Tackles Per Game',
        id: 'avgTackles',
        type: 'range',
        minVal: 0,
        maxVal: 20
      },
      {
        name: 'Saves Per Game',
        id: 'avgSaves',
        type: 'range',
        minVal: 0,
        maxVal: 20
      },
      {
        name: 'Fouls Per Game',
        id: 'avgFouls',
        type: 'range',
        minVal: 0,
        maxVal: 20
      }
    ]
  }
]

export default attributesFilters
