
import { DynamicRow, EditableTableColumnType, FootEnum, PositionEnum } from '../types'

export const defaultClubNeedsTableColumns: EditableTableColumnType<DynamicRow>[] = [
  {
    title: 'Club',
    dataIndex: 'team_col',
    isRequired: false,
    editable: true,
    inputType: 'teamSelect',
    width: 250,
    isDefault: true,
    fixed: 'left'
  },
  {
    title: 'Club\'s Country',
    dataIndex: 'team_country_col',
    isRequired: false,
    editable: false,
    inputType: 'countrySelect',
    width: 120,
    isDefault: true
  },
  {
    title: 'Club\'s League',
    dataIndex: 'team_league_col',
    isRequired: false,
    editable: false,
    inputType: 'leagueSelect',
    width: 120,
    isDefault: true
  },
  {
    title: 'Position',
    dataIndex: 'position_col',
    isRequired: false,
    editable: true,
    inputType: 'positionSelect',
    width: 120,
    isDefault: true,
    options: Object.keys(PositionEnum).map(d => ({ value: d, label: PositionEnum[d as keyof typeof PositionEnum] }))
  },
  {
    title: 'Foot',
    dataIndex: 'foot_col',
    editable: true,
    isRequired: false,
    inputType: 'footSelect',
    width: 120,
    isDefault: true,
    options: Object.keys(FootEnum).map(d => ({ value: d, label: FootEnum[d as keyof typeof FootEnum] }))
  },
  {
    title: 'Height',
    dataIndex: 'height_col',
    inputType: 'range',
    editable: true,
    isRequired: false,
    width: 150,
    isDefault: true

  },
  {
    title: 'Age',
    dataIndex: 'age_col',
    width: 85,
    editable: true,
    isRequired: false,
    inputType: 'range',
    isDefault: true
  },
  {
    title: 'Transfer Budget',
    dataIndex: 'budget_col',
    editable: true,
    isRequired: false,
    inputType: 'budget',
    width: 150,
    isDefault: true
  },
  {
    title: 'Salary',
    dataIndex: 'salary_col',
    editable: true,
    isRequired: false,
    inputType: 'salary',
    width: 150,
    isDefault: true
  },

  {
    title: 'Offered Players',
    dataIndex: 'offeredPlayers_col',
    editable: true,
    isRequired: false,
    inputType: 'multiplayerSelect',
    width: 250,
    isDefault: true

  },
  {
    title: 'Status',
    dataIndex: 'status_col',
    editable: true,
    isRequired: false,
    inputType: 'select',
    width: 120,
    isDefault: true,
    options: [
      { color: 'gray',  label: 'Not Started' },
      { color: 'geekblue', label: 'In Progress' },
      { color: 'green', label: 'Completed' }
    ]
  },
  {
    title: 'Transfer Season',
    dataIndex: 'transferSeason_col',
    editable: true,
    isRequired: false,
    inputType: 'select',
    width: 160,
    isDefault: true,
    options: Array.from({ length: 10 }).flatMap((_, i) => ['Summer', 'Winter'].flatMap(d => ({ color: 'magenta', label: `${i + 2021} ${d}` })))
  },
  {
    title: 'Country',
    dataIndex: 'country_col',
    isRequired: false,
    editable: true,
    inputType: 'countrySelect',
    width: 250,
    isDefault: true,
    isHidden: true
  },
  {
    title: 'League',
    dataIndex: 'league_col',
    isRequired: false,
    editable: true,
    inputType: 'leagueSelect',
    width: 250,
    isDefault: true,
    isHidden: true
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
  }

]
