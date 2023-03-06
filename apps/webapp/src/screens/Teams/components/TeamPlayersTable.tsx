import React from 'react'

import { PlayerStat }                  from '@monorepo/common/types'
import {  Avatar, Image, List, Table } from 'antd'
import type { ColumnsType }            from 'antd/es/table'
import moment                          from 'moment'
import numeral                         from 'numeral'
import { Link }                        from 'react-router-dom'

const columns: ColumnsType<PlayerStat> = [
  {
    title: 'Player',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => (a.player_name || 'a').localeCompare(b.player_name || 'b'),
    render: (text, record) => (
      <List.Item.Meta
        avatar={record.player_logo ? <Avatar src={record.player_logo}/> : <Avatar>{record?.player_name?.[0]?.toUpperCase() || ''}</Avatar>}
        title={<Link to={`/player/${record.player_id}`}>{record.player_name}</Link>}
        description={record.player_positions} />
    )
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    sorter: (a, b) => (a.player_age || 0) - (b.player_age || 0)
  },
  {
    title: 'Nationality',
    dataIndex: 'country_name',
    key: 'country_name',
    sorter: (a, b) => (a?.player_country_name  || 'a').localeCompare((b?.player_country_name || 'b')),
    render: (text, record) => {
      if (record.player_country_logo) {
        return <Image src={record.player_country_logo} preview={false} height={15} />
      }
      return record.player_nationality
    }
  },
  {
    title: 'Contract',
    dataIndex: 'contract_until',
    key: 'contract_until',
    sorter: (a, b) => moment(a.player_contract_until).unix() - moment(b.player_contract_until).unix(),
    render: (text, record) => {
      return <span>{moment.unix(record?.player_contract_until || moment().unix()).format('lll')}</span>
    }
  },
  {
    title: 'Market Value',
    dataIndex: 'market_value',
    key: 'market_value',
    render: (text, record) => {
      return <span>{record.player_market_value_currency}{numeral(record.player_market_value).format('0,0')}</span>
    }
  }

]

interface TeamPlayersTableProps {
  data: PlayerStat[]
}

const TeamPlayersTable: React.FC<TeamPlayersTableProps> = ({ data }) => <Table
  style={{ fontSize: 10 }}
  bordered
  size="small"
  columns={columns}
  dataSource={data}
/>

export default TeamPlayersTable
