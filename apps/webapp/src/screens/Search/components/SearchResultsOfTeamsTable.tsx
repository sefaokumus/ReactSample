import React, { memo } from 'react'

import { Team }                                   from '@monorepo/common/types/API'
import { Avatar,  Image, Table, Tag, Typography } from 'antd'
import type { ColumnsType, TableProps }           from 'antd/es/table'
import numeral                                    from 'numeral'
import { Link }                                   from 'react-router-dom'

const columns: ColumnsType<Team> = [
  {
    title: 'Logo',
    dataIndex: 'logo',
    key: 'logo',
    width: 50,
    render: (_, record) => {
      return <Avatar size="large" shape="square" src={record.logo} />
    }
  },
  {
    title: 'Club Name',
    dataIndex: 'name',
    key: 'name',
    width: 200,
    render: (_, record) => {
      return <Link to={`/team/${record.id}`} >{record.name}</Link>
    }
  },
  {
    title: 'Country',
    key: 'country_id',
    render: (_, record) => (
      record.country_logo
        ? <><Image height={15} src={record.country_logo} preview={false} /><Tag>{record.country_name}</Tag></>
        : <Tag>{record.country_name}</Tag>
    )
  },
  {
    title: 'Squad',
    dataIndex: 'national_players',
    key: 'national_players',
    width: 70
  },
  {
    title: 'Market Value',
    key: 'market_value',
    render: (_, record) => (
      `${record.market_value_currency} ${numeral(record.market_value).format('0,0')}`
    )
  }

]

interface SearchResultsOfTeamsTableProps extends TableProps<Team> {
  teams: Team[]
}

const SearchResultsOfTeamsTable = memo(function PlayersTable ({ teams }: SearchResultsOfTeamsTableProps) {
  return <Table
    title={() => <Typography.Title level={5}>Teams Results</Typography.Title>}
    size='small'
    bordered
    columns={columns}
    dataSource={teams} />
})

export default SearchResultsOfTeamsTable
