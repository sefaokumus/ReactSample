import React from 'react'

import {  Table, Tag }      from 'antd'
import type { ColumnType } from 'antd/es/table'

interface DataType {
  key: string;
  league : string
  homeTeam: {
    name: string;
    id: string;
    logo: string;
  }
  awayTeam: {
    name: string;
    id: string;
    logo: string;
  }
  minutes : number;
  goalsHomeTeam : number;
  goalsAwayTeam : number;
  goalsOfPlayer : number;
  assistsOfPlayer : number;
  yellowCardsOfPlayer : number;
  redCardsOfPlayer : number;
  shotsOnGoalOfPlayer : number;
  ratingOfPlayer : number;

}
const matchColStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 0.2fr 1fr',
  gridTemplateRows: '1fr',
  gap: 8,
  alignItems: 'center'

}

const columns: ColumnType<DataType> = [
  {
    title: 'League',
    dataIndex: 'league',
    key: 'league',
    render: text => <a>{text}</a>
  },
  {
    title: 'Match',
    align: 'center',
    render: (text, record) => (
      <div style={matchColStyle}>
        <div style={{ textAlign: 'right' }}>
          <a>{record.homeTeam.name}</a>
          <img src={record.homeTeam.logo} style={{ width: 30, height: 30 }} />
        </div>
        <div style={{ textAlign: 'center' }}>
          {record.goalsHomeTeam} - {record.goalsAwayTeam}
        </div>
        <div style={{ textAlign: 'left' }}>
          <img src={record.awayTeam.logo} style={{ width: 30, height: 30 }} />
          <a>{record.awayTeam.name}</a>
        </div>
      </div>
    )
  },
  {
    title: 'Minutes',
    dataIndex: 'minutes',
    key: 'minutes',
    render: (_, { minutes }) => {
      return minutes > 0 ? minutes : '-'
    }
  },
  {
    title: 'Goal',
    key: 'goalsOfPlayer',
    dataIndex: 'goalsOfPlayer',
    render: (_, { goalsOfPlayer }) => {
      return goalsOfPlayer > 0 ? <Tag color='green'>{goalsOfPlayer}</Tag> : '-'
    }
  },
  {
    title: 'Assist',
    key: 'assistsOfPlayer',
    dataIndex: 'assistsOfPlayer',
    render: (_, { assistsOfPlayer }) => {
      return assistsOfPlayer > 0 ? <Tag color='green'>{assistsOfPlayer}</Tag> : '-'
    }
  },
  {
    title: 'Rating',
    key: 'ratingOfPlayer',
    dataIndex: 'ratingOfPlayer',
    render: (_, { ratingOfPlayer }) => {
      return  <Tag color='geekblue'>{ratingOfPlayer}</Tag>
    }
  }
]

const data: DataType[] = [
  {
    key: '1',
    league: 'Bundesliga',
    homeTeam: {
      id: '111111',
      name: '1. FSV Mainz 05',
      logo: 'https://img.thesports.com/football/team/aa2245702c40f77799a5ad4b119581a8.png'
    },
    awayTeam: {
      id: '222222',
      name: 'RB Leipzing',
      logo: 'https://img.thesports.com/football/team/aa2245702c40f77799a5ad4b119581a8.png'
    },
    minutes: 90,
    goalsHomeTeam: 1,
    goalsAwayTeam: 1,
    goalsOfPlayer: 1,
    assistsOfPlayer: 0,
    yellowCardsOfPlayer: 0,
    redCardsOfPlayer: 0,
    shotsOnGoalOfPlayer: 0,
    ratingOfPlayer: 8.57
  },
  {
    key: '2',
    league: 'Bundesliga',
    homeTeam: {
      id: '222222',
      name: 'RB Leipzing',
      logo: 'https://img.thesports.com/football/team/aa2245702c40f77799a5ad4b119581a8.png'
    },
    awayTeam: {
      id: '333333',
      name: 'Borussia Dortmund',
      logo: 'https://img.thesports.com/football/team/aa2245702c40f77799a5ad4b119581a8.png'
    },
    minutes: 90,
    goalsHomeTeam: 3,
    goalsAwayTeam: 0,
    goalsOfPlayer: 0,
    assistsOfPlayer: 0,
    yellowCardsOfPlayer: 0,
    redCardsOfPlayer: 0,
    shotsOnGoalOfPlayer: 0,
    ratingOfPlayer: 6.31
  }

]

const PlayerMatchesTable: React.FC = () => <Table columns={columns} dataSource={data} />

export default PlayerMatchesTable
