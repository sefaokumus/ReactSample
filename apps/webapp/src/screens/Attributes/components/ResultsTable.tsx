import React, { useState } from 'react'

import { DynamicRow, EditableTableColumnType, PlayerStat } from '@monorepo/common/types'
import EditableTable                                       from 'src/components/EditableTable'
import Box                                                 from 'src/components/ui/Box'
import { shortlistTableFilters }                           from 'src/screens/Profiling/components/ShortlistFilters'
import { shortlistTableRenderers }                         from 'src/screens/Profiling/components/ShortlistRenderers'
import { shortlistTableSorters }                           from 'src/screens/Profiling/components/ShortlistSorters'

const ResultsTable = ({ data }: { data: PlayerStat[] }) => {
  const initialColumns:  EditableTableColumnType<DynamicRow>[] = [
    {
      title: 'Player',
      width: 180,
      ellipsis: { showTitle: true },
      dataIndex: 'player_col',
      fixed: 'left',
      inputType: 'playerSelect'
    },
    {
      title: 'Team',
      width: 160,
      dataIndex: 'player_team_col',
      inputType: 'teamSelect'
    },
    {
      title: 'Age',
      dataIndex: 'player_age',
      inputType: 'number',
      width: 90
    },
    {
      title: 'Position',
      dataIndex: 'player_position_col',
      inputType: 'positionSelect',
      width: 120
    },
    {
      title: 'Country',
      dataIndex: 'player_country_col',
      width: 140,
      inputType: 'countrySelect'
    },

    { title: 'Matches', dataIndex: 'matches', width: 120, inputType: 'number' },
    { title: 'Minutes', dataIndex: 'minutes_played', width: 120, inputType: 'number'  },
    { title: 'Goals', dataIndex: 'goals',  width: 120, inputType: 'number' },
    { title: 'Assists', dataIndex: 'assists', width: 120, inputType: 'number'  },

    {

      title: 'Rating',
      dataIndex: 'rating',
      width: 120,
      inputType: 'number'
    },
    {
      title: 'Abilities',
      dataIndex: 'player_ability_col',
      width: 230,
      inputType: 'select'
    },
    {
      title: 'Advantages',
      dataIndex: 'player_advantages_col',
      width: 190,
      inputType: 'select'
    },
    {
      title: 'Disadvantages',
      dataIndex: 'player_disadvantages_col',
      width: 190,
      inputType: 'select'
      // render: (text, record) => {
      //   return (record?.player_characteristics?.[1]) && (
      //     record?.player_characteristics?.[1]?.map((c, i) =>
      //       // @ts-ignore
      //       <Tag key={i} style={{ margin: 4, whiteSpace: 'break-spaces' }} color="red">{`${tCharacteristics(c[0])} (${c[1]})`}</Tag>)
      //   )
      // }
    }
  ]

  const [columns, setColumns] = useState<EditableTableColumnType<DynamicRow>[]>(initialColumns)

  return (
    <Box style={{ background: '#fff' }}>
      <EditableTable
        columns={columns}
        dataSource={data}
        rowKey='player_id'
        size="small"
        bordered
        tableLayout='fixed'
        tableId={'attributesTable'}
        setColumns={setColumns}
        editable={false}
        pagination={{
          defaultPageSize: 20,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50', '100', '200', '500']
        }}
        customRenderers={shortlistTableRenderers}
        customSorters={shortlistTableSorters}
        customFilters={shortlistTableFilters}

        style={{ background: '#fff' }}
      />
    </Box>
  )
}

export default ResultsTable
