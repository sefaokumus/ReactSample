import React from 'react'

import { DeleteOutlined, UndoOutlined }        from '@ant-design/icons'
import { useStoreActions, useStoreState }      from '@monorepo/common/hooks'
import { DynamicRow, EditableTableColumnType } from '@monorepo/common/types'
import { Button }                              from 'antd'

import { getIconOfInputType } from '../EditableTableConstants'

import { DynamicColumnManagerProps } from '.'
import DynamicColumnManagerListRow   from './DynamicColumnManagerListRow'

interface DeletedColumnsEditorProps {
  shortlist_id: string
  setScreen: (screen: DynamicColumnManagerProps['screen']) => void
}

export default function DeletedColumnsEditor ({ shortlist_id, setScreen } : DeletedColumnsEditorProps) {
  const { columns }                               = useStoreState(state => state.dynamicData)
  const { restoreColumn, deleteColumnCompletely } = useStoreActions(actions => actions.dynamicData)

  const deletedColumns = (columns[shortlist_id] as EditableTableColumnType<DynamicRow>[]).filter(m => m.isDeleted)

  React.useEffect(() => {
    if (deletedColumns.length === 0) { setScreen('PropertiesEditor') }
  }, [deletedColumns])

  return (<div>
    {
      deletedColumns.map(column => (
        <DynamicColumnManagerListRow
          key={column.dataIndex as string}
          content={<>
            {getIconOfInputType(column.inputType)}
            <span style={{
              marginLeft: 8,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>{column.title as string}</span>
          </>}
          right={<>
            <Button type='text' size="small" onClick={() => restoreColumn({ shortlist_id, dataIndex: column.dataIndex as string })}>
              <UndoOutlined />
            </Button>
            <Button type='text' size="small" onClick={() => deleteColumnCompletely({ shortlist_id, dataIndex: column.dataIndex as string })}>
              <DeleteOutlined />
            </Button>
          </>
          }
          onClick={() => { setScreen('DeletedColumns') }}
        />
      ))}

  </div>
  )
}
