import React from 'react'

import {  League }              from '@monorepo/common/types/API'
import { tLeagueType }          from '@monorepo/common/utils/translator'
import {  Avatar, List, Table } from 'antd'
import type { ColumnType }      from 'antd/es/table'
import { Link }                 from 'react-router-dom'

const columns: ColumnType<League>[] = [
  {
    title: 'League Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => (a.name || 'a').localeCompare(b.name || 'b'),
    render: (text, record) => (
      <List.Item.Meta
        avatar={record.logo ? <Avatar src={record.logo}/> : <Avatar>{record?.name?.[0]?.toUpperCase() || ''}</Avatar>}
        title={<Link to={`/league/${record.id}`}>{record.name}</Link>}
      />
    )
  },
  {
    title: 'Squad Size',
    dataIndex: 'type',
    key: 'type',
    sorter: (a, b) => (a?.type || 0) - (b?.type || 0),
    render: (text, record) => {
      return tLeagueType(text)
    }
  },

  {
    title: 'Colors',
    key: 'colors',
    render: (text, record) => (
      <div style={{ height: 30, width: 60, display: 'flex', flexDirection: 'row' }}>
        <div style={{ height: 30, width: 30, backgroundColor: record?.primary_color || '#fff' }} />
        <div style={{ height: 30, width: 30, backgroundColor: record?.secondary_color || '#fff' }} />
      </div>
    )
  }

]

interface CountryLeaguesTableProps {
  data: League[]
}

const CountryLeaguesTable: React.FC<CountryLeaguesTableProps> = ({ data }) => <Table
  style={{ fontSize: 10 }}
  bordered
  size="small"
  columns={columns}
  dataSource={data}
/>

export default CountryLeaguesTable
