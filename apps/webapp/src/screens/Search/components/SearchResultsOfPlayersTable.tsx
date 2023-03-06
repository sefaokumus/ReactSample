import React, { memo } from 'react'

import { PlayerStat }                             from '@monorepo/common/types'
import { tPosition }                              from '@monorepo/common/utils/translator'
import { Avatar,  Image, Table, Tag, Typography } from 'antd'
import type { ColumnsType, TableProps }           from 'antd/es/table'
import numeral                                    from 'numeral'
import { Link }                                   from 'react-router-dom'

const columns: ColumnsType<PlayerStat> = [
  {
    title: 'Photo',
    dataIndex: 'logo',
    key: 'logo',
    width: 50,
    render: (_, record) => {
      return <Avatar size="large" shape="square" src={record.player_logo} />
    }
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 200,
    render: (_, record) => {
      return <Link to={`/player/${record.player_id}`} >{record.player_name}</Link>
    }
  },

  {
    title: 'Position',
    dataIndex: 'position_main',
    key: 'position_main',
    width: 70,
    render: (text) => {
      return <Tag>{tPosition(text)}</Tag>
    }
  },
  {
    title: 'Team',
    width: 150,
    render: (text, record) => {
      return (
        <Link to={`/team/${record.team_id}`} style={{ flexDirection: 'row', gap: 8, display: 'flex', alignItems: 'center' }} >
          <Avatar src={record.team_logo} />
          <Typography.Text style={{ fontSize: 12 }}> {record.team_name}</Typography.Text>
        </Link>
      )
    }
  },
  {
    title: 'Age',
    key: 'age',
    dataIndex: 'age'
  },
  {
    title: 'Nationality',
    key: 'nationality',
    render: (_, record) => (
      record.player_country_logo
        ? <><Image height={15} src={record.player_country_logo} preview={false} /><Tag>{record.player_country_name}</Tag></>
        : <Tag>{record.player_country_name}</Tag>
    )
  },
  {
    title: 'Market Value',
    key: 'market_value',
    render: (_, record) => (
      `${record.player_market_value_currency} ${numeral(record.player_market_value).format('0,0')}`
    )
  }
]

interface SearchResultsOfPlayersTableProps extends TableProps<PlayerStat> {
  players: PlayerStat[]
}

const SearchResultsOfPlayersTable = memo(function PlayersTable ({ players }: SearchResultsOfPlayersTableProps) {
  if (!players) return null

  return <Table
    title={() => <Typography.Title level={5}>Players Results</Typography.Title>} size='small' bordered
    columns={columns}
    dataSource={players} />
})

export default SearchResultsOfPlayersTable
