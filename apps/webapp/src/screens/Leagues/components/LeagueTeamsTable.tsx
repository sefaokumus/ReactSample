import React from 'react'

import {  Team }                 from '@monorepo/common/types/API'
import {  Avatar,  List, Table } from 'antd'
import type { ColumnType }       from 'antd/es/table'
import numeral                   from 'numeral'
import { Link }                  from 'react-router-dom'

const columns: ColumnType<Team>[] = [
  {
    title: 'Club',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => (a.name || 'a').localeCompare(b.name || 'b'),
    render: (text, record) => (
      <List.Item.Meta
        avatar={record.logo ? <Avatar src={record.logo}/> : <Avatar>{record?.name?.[0]?.toUpperCase() || ''}</Avatar>}
        title={<Link to={`/team/${record.id}`}>{record.name}</Link>}
      />
    )
  },
  {
    title: 'Squad Size',
    dataIndex: 'total_players',
    key: 'total_players',
    sorter: (a, b) => (a?.total_players || 0) - (b?.total_players || 0),
    render: (text, record) => {
      return <Link to={`/team/${record.id}`}>{record.total_players}</Link>
    }
  },

  {
    title: 'Foreign Players',
    dataIndex: 'foreign_players',
    key: 'foreign_players',
    sorter: (a, b) => (a?.foreign_players || 0) - (b?.foreign_players || 0)
  },
  {
    title: 'Market Value',
    dataIndex: 'market_value',
    key: 'market_value',
    sorter: (a, b) => (a?.market_value || 0) - (b?.market_value || 0),
    render: (text, record) => {
      return <span>{record.market_value_currency}{numeral(record.market_value).format('0,0')}</span>
    }
  }

]

interface LeagueTeamsTableProps {
  data: Team[]
}

const LeagueTeamsTable: React.FC<LeagueTeamsTableProps> = ({ data }) => <Table
  style={{ fontSize: 10 }}
  bordered
  size="small"
  columns={columns}
  dataSource={data}
/>

export default LeagueTeamsTable
