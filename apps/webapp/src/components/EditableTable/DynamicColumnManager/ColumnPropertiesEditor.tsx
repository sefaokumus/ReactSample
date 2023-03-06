import React, { useState } from 'react'

import { DeleteOutlined, EyeInvisibleOutlined, EyeOutlined, RightOutlined } from '@ant-design/icons'
import { useStoreActions, useStoreState }                                   from '@monorepo/common/hooks'
import { DynamicRow,    EditableTableColumnType }                           from '@monorepo/common/types'
import { reOrderDynamicColumns }                                            from '@monorepo/common/utils/helper'
import { Button, Input, Typography }                                        from 'antd'
import { DragDropContext, Droppable, Draggable, DropResult }                from 'react-beautiful-dnd'
import { MdDragIndicator }                                                  from 'react-icons/md'

import { createUseStyles } from 'react-jss'

import { getIconOfInputType } from '../EditableTableConstants'

import { DynamicColumnManagerProps } from '.'
import ListRow                       from './DynamicColumnManagerListRow'

type ColumnPropertiesEditorProps = {
  shortlist_id: string
  setScreen: (screen : DynamicColumnManagerProps['screen']) => void
  onColumnSelect: (column: EditableTableColumnType<DynamicRow>) => void
  handleUpdateColumn?: (column: EditableTableColumnType<DynamicRow>) => void
  handleDeleteColumn?: (dataIndex: string) => void
  handleToggleColumnVisibility?: (dataIndex: string) => void
}

interface DraggableRowProps {
  shortlist_id : string
  column: EditableTableColumnType<DynamicRow>
  index: number
  isDragDisabled?: boolean
  onClick: (column: EditableTableColumnType<DynamicRow>) => void
  toggleCol: (prop: { shortlist_id: string, dataIndex: string }) => void
  deleteCol : (prop : { shortlist_id: string, dataIndex: string }) => void
}

const useStyles = createUseStyles({
  dndRow: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    userSelect: 'none',
    minHeight: 28,
    fontSize: 14,
    marginLeft: 8,
    marginRight: 6,
    minWidth: 0,
    flex: '1 1 auto',
    color: 'rgba(0,0,0, 70%)',
    fill: 'rgba(0,0,0, 70%)',
    '&:hover': {
      color: 'rgba(0, 0, 0, 0.85)',
      background: '#d4d4d4',
      borderColor: 'transparent'
    }
  },

  dndColLeft: {
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  dndColRight: {
    marginLeft: 'auto',
    marginRight: 12,
    minWidth: 0,
    flexShrink: 0
  },
  dndGrabber: {
    cursor: 'grab',
    marginRight: 8
  },

  dndColTitle: {
    marginLeft: 8,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }

})

export const ColumnPropertiesEditor = ({ shortlist_id, setScreen, onColumnSelect }: ColumnPropertiesEditorProps) => {
  const { columns }                                   = useStoreState(state => state.dynamicData)
  const { updateColumns, toggleColumn, deleteColumn } = useStoreActions(actions => actions.dynamicData)
  const dynamicColumns                                = (columns[shortlist_id] as EditableTableColumnType<DynamicRow>[])

  const hasHiddenColumns              = dynamicColumns.some(c => c.isHidden)
  const activeColumns                 = dynamicColumns.filter(c => !c.isDeleted)
  const deletedColumns                = dynamicColumns.filter(c => c.isDeleted)
  const [searchQuery, setSearchQuery] = useState('')
  const handleDragEnd                 = (result: DropResult): void => {
    const { destination, source } = result
    if (!destination) {
      return
    }
    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return
    }
    // if (destination?.index === 0) {
    //   return
    // }
    const itemToMove = dynamicColumns.find(c => c.dataIndex === result.draggableId)

    if (itemToMove) {
      const newOrder = reOrderDynamicColumns(dynamicColumns, source, destination)
      updateColumns({ shortlist_id, columns: newOrder })
    }
  }

  return <React.Fragment>
    <Input.Search placeholder="Search"
      onChange={
        e => {
          setSearchQuery(e.target.value.toLowerCase())
        }}
      allowClear
      style={{ marginBottom: 8 }}
    />
    <DragDropContext onDragEnd={handleDragEnd} onDragUpdate={(result) => {
      const { destination } = result

      if (destination?.index === 0) {
        console.log('destination?.index', destination?.index)
        return null
      }
    }
    }
    >

      {['v', 'h'].map((area, index) => {
        if (area === 'h' && !hasHiddenColumns) {
          return null
        }
        return (<div key={area}>
          {area === 'h' && <Typography.Text  type="secondary">Hidden Columns</Typography.Text>}
          <Droppable droppableId={area}  >
            {(provided, snapshot) => {
              return (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    background: snapshot.isDraggingOver
                      ? '#f1f0f0'
                      : 'white',
                    minHeight: 20
                  }}
                >
                  {
                    activeColumns
                      .filter(item => (item?.title as string || '').toLowerCase().includes(searchQuery))
                      .filter(i => (area !== 'h' && !i.isHidden) || (area === 'h' && i.isHidden))
                      .map((item, index) => (
                        <DraggableRow
                          key={index}
                          shortlist_id={shortlist_id}
                          index={index}
                          column={item}
                          toggleCol={toggleColumn}
                          deleteCol={deleteColumn}
                          isDragDisabled={searchQuery !== ''}
                          onClick={onColumnSelect}
                        />)
                      )}
                  {provided.placeholder}
                </div>
              )
            }}
          </Droppable>
        </div>
        )
      })}

    </DragDropContext>

    {
      deletedColumns.length > 0 &&  <ListRow
        left={<DeleteOutlined size={18} />}
        content={<Typography.Text type="secondary">Deleted Columns</Typography.Text>}
        right={<><Typography.Text style={{ marginRight: 8 }}>{deletedColumns.length}</Typography.Text><RightOutlined /></>}
        onClick={() => {  setScreen('DeletedColumns') }}
      />
    }

  </React.Fragment>
}

const DraggableRow = ({ shortlist_id, column, index, isDragDisabled, onClick, toggleCol, deleteCol }: DraggableRowProps) => {
  const classes = useStyles()
  return <Draggable isDragDisabled={isDragDisabled} key={column.dataIndex as string} draggableId={column.dataIndex as string} index={index} >
    {(provided, snapshot): JSX.Element => (
      <div ref={provided.innerRef} {...provided.draggableProps}>
        <ListRow
          onClick={(event) => {
            event.preventDefault()
            onClick(column)
          }}
          left={<MdDragIndicator className={classes.dndGrabber} size={18}  />}
          leftProps={{ ...provided.dragHandleProps }}
          content={<>
            {getIconOfInputType(column.inputType)}
            <span className={classes.dndColTitle}>{column.title as string}</span>
          </>}
          right={<>

            {
              !column.isDefault && (
                <Button type='text' size='small' danger onClick={(event) => {
                  event.stopPropagation()
                  deleteCol({ shortlist_id, dataIndex: column.dataIndex as string })
                }}>
                  <DeleteOutlined />
                </Button>
              )
            }

            <Button type='text' size='small' onClick={(event) => {
              event.stopPropagation()
              toggleCol({ shortlist_id, dataIndex: column.dataIndex as string })
            }}>
              { column.isHidden ? <EyeInvisibleOutlined /> :  <EyeOutlined />}
            </Button>
            <RightOutlined /></>
          }
          style= {{ backgroundColor: snapshot.isDragging ? '#d4d4d4' : undefined }}
        />

      </div>
    )}
  </Draggable>
}
