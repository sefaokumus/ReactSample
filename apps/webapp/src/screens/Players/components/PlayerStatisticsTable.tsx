import React from 'react'

import { red, blue }        from '@ant-design/colors'
import { PlayerSeasonStat } from '@monorepo/common/types'
import { Table }            from 'antd'
import type { ColumnType }  from 'antd/es/table'

interface DataType {
  key: string;
  statistic: {
    name: string,
    lastSeason: string | JSX.Element,
    currentSeason : string | JSX.Element
  }
  lastSeasonTeam?: {
    name: string;
    id: string;
    logo: string;
    league_id: string;
    league_name: string;
  }
  currentSeasonTeam?: {
    name: string;
    id: string;
    logo: string;
    league_id: string;
    league_name: string;
  }

}

const columns: ColumnType<DataType>[] = [
  {
    title: 'Statistic',
    dataIndex: ['statistic', 'name'],
    key: 'statistic',
    width: 250
  },

  {
    title: 'Last Season Team',
    width: 200,
    render: (_, record) => {
      return record.statistic.lastSeason || '-'
    }

  },
  {
    title: 'Current Season Team',
    width: 200,
    render: (_, record) => {
      return record.statistic.currentSeason || '-'
    }
  },
  {
    title: 'Ranking',
    render: (text, record) => {
      if (typeof record.statistic.lastSeason === 'object' || typeof record.statistic.currentSeason === 'object') return null

      const rowTotal       = (parseFloat(record.statistic.currentSeason) + parseFloat(record.statistic.lastSeason))
      const lastPercent    = (parseFloat(record.statistic.lastSeason) / rowTotal) * 100
      const currentPercent = (parseFloat(record.statistic.currentSeason) / rowTotal) * 100

      return (
        <div style={{ backgroundColor: '#fff', width: 200, height: 25, display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <div style={{ backgroundColor: red[1], height: 25, width: lastPercent, justifySelf: 'flex-end' }} />
          <div style={{ backgroundColor: blue[1], height: 25, width: currentPercent }} />
          {/* <a>{record.lastSeasonTeam.name}</a>
        <a>{record.currentSeasonTeam.name}</a> */}
        </div>
      )
    }
  }

]

type PlayerStatisticsTableProps ={
  player: PlayerSeasonStat | null
}

const PlayerStatisticsTable: React.FC<PlayerStatisticsTableProps> = ({ player }) => {
  const data: DataType[] = [
    {
      key: '0',
      statistic: {
        name: 'Team',
        lastSeason: <div>
          -
        </div>,
        currentSeason: <div>
          <img src={player?.team_logo} style={{ width: 30, height: 30 }} />
          <a>{player?.team_name}</a>
        </div>
      }
    },
    {
      key: '1',
      statistic: {
        name: 'Matches',
        lastSeason: '0',
        currentSeason: `${player?.matches}`
      }
    },
    {
      key: '2',
      statistic: {
        name: 'Minutes',
        lastSeason: '0',
        currentSeason: `${player?.minutes_played}`
      }
    },
    {
      key: '3',
      statistic: {
        name: 'Goals',
        lastSeason: '0',
        currentSeason: `${player?.goals}`
      }
    },
    {
      key: '4',
      statistic: {
        name: 'Assists',
        lastSeason: '0',
        currentSeason: `${player?.assists}`
      }
    },
    {
      key: '5',
      statistic: {
        name: 'Shots On Target',
        lastSeason: '0',
        currentSeason: `${player?.shots_on_target}`
      }
    },
    {
      key: '6',
      statistic: {
        name: 'Total Passes',
        lastSeason: '0',
        currentSeason: `${player?.passes}`
      }
    },
    {
      key: '7',
      statistic: {
        name: 'Long Passes',
        lastSeason: '0',
        currentSeason: `${player?.long_balls}`
      }
    },
    {
      key: '8',
      statistic: {
        name: 'Key Passes',
        lastSeason: '0',
        currentSeason: `${player?.key_passes}`
      }
    },
    {
      key: '9',
      statistic: {
        name: 'Tackles',
        lastSeason: '0',
        currentSeason: `${player?.tackles}`
      }
    },
    {
      key: '10',
      statistic: {
        name: 'Duels',
        lastSeason: '0',
        currentSeason: `${player?.duels}`
      }
    },
    {
      key: '11',
      statistic: {
        name: 'Duels Won',
        lastSeason: '0',
        currentSeason: `${player?.duels_won}`
      }
    },
    {
      key: '12',
      statistic: {
        name: 'Dribbling',
        lastSeason: '0',
        currentSeason: `${player?.dribble}`
      }
    }

  ]
  return (
    <Table
      size={'small'}
      pagination={{
        pageSize: 20
      }}
      bordered
      columns={columns}
      dataSource={data} />
  )
}

export default PlayerStatisticsTable
