import React from 'react'

import { Team }            from '@monorepo/common/types/API'
import { Table }           from 'antd'
import type { ColumnType } from 'antd/es/table'

interface DataType {
  key: string;
  season: string
  date: string
  left: Team
  joined: Team
  marketValue: {
    value: number
    currency: string
  }
  fee: {
    value: number
    currency: string
  }
}

const columns: ColumnType<DataType>[] = [
  {
    title: 'Season',
    dataIndex: 'season',
    key: 'season'
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date'
  },
  {
    title: 'Left',
    dataIndex: 'left',
    key: 'left',
    render: (text, record) => (
      <div>
        {record?.left?.logo &&  <img src={record.left.logo} style={{ width: 30, height: 30 }} />}
        <a>{record.left.name}</a>
      </div>
    )

  },
  {
    title: 'Joined',
    dataIndex: 'joined',
    key: 'joined',
    render: (text, record) => (
      <div>
        {record.joined.logo && <img src={record.joined.logo} style={{ width: 30, height: 30 }} />}
        <a>{record.joined.name}</a>
      </div>
    )
  },
  {
    title: 'MV',
    dataIndex: 'marketValue',
    key: 'marketValue',
    render: (text, record) => (
      <div>
        {record.marketValue.currency}{record.marketValue.value}
      </div>
    )
  },
  {
    title: 'Fee',
    dataIndex: 'fee',
    key: 'fee',
    render: (text, record) => (
      <div>
        {record.fee.currency}{record.fee.value}
      </div>
    )
  }

]

const data: DataType[] = [
  {
    key: '1',
    season: '2020/2021',
    date: '2021-01-01',
    left: {
      __typename: 'Team',
      name: 'FC Barcelona',
      logo: 'https://media.api-sports.io/football/teams/81.png'
    },
    joined: {
      __typename: 'Team',
      name: 'FC Bayern Munich',
      logo: 'https://media.api-sports.io/football/teams/5.png'
    },
    marketValue: {
      value: 10000000,
      currency: '€'
    },
    fee: {
      value: 10000000,
      currency: '€'
    }
  },
  {
    key: '2',
    season: '2019/2020',
    date: '2020-01-01',
    left: {
      __typename: 'Team',
      name: 'FC Bayern Munich',
      logo: 'https://media.api-sports.io/football/teams/5.png'
    },
    joined: {
      __typename: 'Team',
      name: 'FC Barcelona',
      logo: 'https://media.api-sports.io/football/teams/81.png'
    },
    marketValue: {
      value: 10000000,
      currency: '€'
    },
    fee: {
      value: 10000000,
      currency: '€'
    }
  }
]

const PlayerTransferHistoryTable: React.FC = () => <Table
  style={{ fontSize: 10 }}
  bordered
  size="small"
  columns={columns}
  dataSource={data}
  scroll={{ x: 100 }}
/>

export default PlayerTransferHistoryTable
