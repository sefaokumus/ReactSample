
import { EditableTableColumnType, DynamicRow  } from '../types'

export const defaultShortlistTableColumns: EditableTableColumnType<DynamicRow>[] = [
  {
    title: 'Player',
    dataIndex: 'player_col',
    isRequired: true,
    editable: true,
    inputType: 'playerSelect',
    width: 250,
    isDefault: true
  },
  {
    title: 'Team',
    dataIndex: 'player_team_col',
    width: 135,
    isRequired: false,
    inputType: 'teamSelect',
    editable: false,
    isDefault: true

  },
  {
    title: 'Position',
    dataIndex: 'player_position_col',
    editable: false,
    width: 120,
    isRequired: false,
    inputType: 'positionSelect',
    isDefault: true
  },
  {
    title: 'Foot',
    dataIndex: 'player_foot_col',
    editable: false,
    width: 120,
    isRequired: false,
    inputType: 'footSelect',
    isDefault: true
  },
  {
    title: 'Height',
    dataIndex: 'player_height_col',
    editable: false,
    width: 150,
    isRequired: false,
    inputType: 'number',
    isDefault: true
  },
  {
    title: 'Age',
    dataIndex: 'player_age_col',
    width: 135,
    editable: false,
    isRequired: false,
    inputType: 'number',
    isDefault: true
  },
  {
    title: 'Market Value',
    dataIndex: 'player_market_value_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true
  },

  {
    title: 'Agent',
    dataIndex: 'agent_col',
    isRequired: false,
    inputType: 'text',
    editable: true,
    width: 120,
    isDefault: true
  },

  {
    title: 'Transfer Fee',
    dataIndex: 'budget_col',
    isRequired: false,
    editable: true,
    inputType: 'range',
    width: 150,
    isDefault: true
  },
  {
    title: 'Salary Request',
    dataIndex: 'salary_col',
    editable: true,
    isRequired: false,
    inputType: 'range',
    width: 150,
    isDefault: true
  },
  {
    title: 'Available For Loan',
    dataIndex: 'availableForLoan_col',
    isRequired: false,
    editable: true,
    inputType: 'checkbox',
    width: 120,
    isDefault: true
  },

  {
    title: 'Offered Clubs',
    dataIndex: 'offeredClubs_col',
    isRequired: false,
    editable: true,
    inputType: 'multiselect',
    width: 250,
    isDefault: true
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt_col',
    editable: false,
    isRequired: false,
    inputType: 'date',
    width: 120,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Updated At',
    dataIndex: 'updatedAt_col',
    editable: false,
    isRequired: false,
    inputType: 'date',
    width: 120,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Created By',
    dataIndex: 'createdBy_col',
    editable: false,
    isRequired: false,
    inputType: 'text',
    width: 120,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Updated By',
    dataIndex: 'updatedBy_col',
    editable: false,
    isRequired: false,
    inputType: 'text',
    width: 120,
    isDefault: true,
    isHidden: true
  },

  {
    title: 'Country',
    dataIndex: 'player_country_col',
    width: 135,
    isRequired: false,
    inputType: 'countrySelect',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'League',
    dataIndex: 'player_league_col',
    width: 135,
    isRequired: false,
    inputType: 'leagueSelect',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Nationality',
    dataIndex: 'player_nationality_col',
    width: 135,
    isRequired: false,
    inputType: 'text',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Contract Due Date',
    dataIndex: 'player_contract_until_col',
    width: 135,
    isRequired: false,
    inputType: 'date',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Weight',
    dataIndex: 'player_weight_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'First',
    dataIndex: 'player_avgFirst_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Goals',
    dataIndex: 'player_avgGoals_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Penalty',
    dataIndex: 'player_avgPenalty_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Assists',
    dataIndex: 'player_avgAssists_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Minutes Played',
    dataIndex: 'player_avgMinutesPlayed_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Red Cards',
    dataIndex: 'player_avgRedCards_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Yellow Cards',
    dataIndex: 'player_avgYellowCards_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Shots',
    dataIndex: 'player_avgShots_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Shots On Target',
    dataIndex: 'player_avgShotsOnTarget_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Dribble',
    dataIndex: 'player_avgDribble_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Successful Dribble',
    dataIndex: 'player_avgDribbleSucc_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Clearances',
    dataIndex: 'player_avgClearances_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Blocked Shots',
    dataIndex: 'player_avgBlockedShots_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Interceptions',
    dataIndex: 'player_avgInterceptions_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Tackles',
    dataIndex: 'player_avgTackles_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Passes',
    dataIndex: 'player_avgPasses_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Passes Accuracy',
    dataIndex: 'player_avgPassesAccuracy_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Key Passes',
    dataIndex: 'player_avgKeyPasses_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Crosses',
    dataIndex: 'player_avgCrosses_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Crosses Accuracy',
    dataIndex: 'player_avgCrossesAccuracy_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Long Balls',
    dataIndex: 'player_avgLongBalls_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Long Balls Accuracy',
    dataIndex: 'player_avgLongBallsAccuracy_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Duels',
    dataIndex: 'player_avgDuels_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Duels Won',
    dataIndex: 'player_avgDuelsWon_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Dispossessed',
    dataIndex: 'player_avgDispossessed_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Fouls',
    dataIndex: 'player_avgFouls_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Was Fouled',
    dataIndex: 'player_avgWasFouled_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Offsides',
    dataIndex: 'player_avgOffsides_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Red From Yellow Cards',
    dataIndex: 'player_avgYellow2RedCards_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Saves',
    dataIndex: 'player_avgSaves_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Punches',
    dataIndex: 'player_avgPunches_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Runs Out',
    dataIndex: 'player_avgRunsOut_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Successful Run Out',
    dataIndex: 'player_avgRunsOutSucc_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true,
    isHidden: true
  },

  {
    title: 'Good High Claim',
    dataIndex: 'player_avgGoodHighClaim_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Rating',
    dataIndex: 'player_avgRating_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Freekicks',
    dataIndex: 'player_avgFreekicks_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Freekick Goals',
    dataIndex: 'player_avgFreekickGoals_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Hit Woodwork',
    dataIndex: 'player_avgHitWoodwork_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Fast Breaks',
    dataIndex: 'player_avgFastbreak_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Fast Break Shots',
    dataIndex: 'player_avgFastbreakShots_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Fast Break Goals',
    dataIndex: 'player_avgFastbreakGoals_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'Position Lost',
    dataIndex: 'player_avgPossLosts_col',
    width: 135,
    isRequired: false,
    inputType: 'number',
    editable: false,
    isDefault: true,
    isHidden: true
  }

]
