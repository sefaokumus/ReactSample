import React, { useEffect, useState } from 'react'

import { DeleteOutlined, DownOutlined, ShareAltOutlined }                 from '@ant-design/icons'
import { useStoreActions, useStoreState }                                 from '@monorepo/common/hooks'
import {  DynamicRow, InputTypeEnum, EditableTableColumnType, Shortlist } from '@monorepo/common/types'
import { Button, Dropdown, Menu, Popconfirm, Typography }                 from 'antd'
import type {  TableProps }                                               from 'antd/es/table'
// @ts-ignore
import scrollIntoView from 'scroll-into-view'

import EditableTable from 'src/components/EditableTable'

import { shortlistTableFilters }   from './ShortlistFilters'
import { shortlistTableRenderers } from './ShortlistRenderers'
import { shortlistTableSorters }   from './ShortlistSorters'

interface ShortlistTableProps extends TableProps<any> {
  shortlistInfo: Shortlist
}

const ShortlistTable = ({ shortlistInfo }: ShortlistTableProps) => {
  const shortlist_id = shortlistInfo.shortlist_id || ''
  const {
    dynamicData: {
      columns: dynamicColumns,
      rows,
      isLoading,
      isUpdating
    }
  } = useStoreState(state => state)
  const {
    getRows,
    addColumn,
    toggleColumn,
    deleteColumn,
    updateColumn,

    createRow,
    deleteRow,
    updateCell,

    deleteShortlist,
    updateShortlist
  } = useStoreActions(actions => actions.dynamicData)

  const [columns, setColumns]           = useState<EditableTableColumnType<DynamicRow>[]>([])
  const [openDropdown, setOpenDropdown] = useState(false)

  useEffect(() => {
    getRows({ shortlist_id })
  }, [])

  useEffect(() => {
    // @ts-ignore
    const initialUserColumns : EditableTableColumnType<DynamicRow>[] = dynamicColumns[shortlist_id].map(col => {
      return {
        ...col,
        editable: col.editable,
        inputType: col.inputType,
        isRequired: col.isRequired,
        isDefault: col.isDefault,
        isHidden: col.isHidden,
        isDeleted: col.isDeleted,
        title: col.title,
        options: col.options,
        onCell: (record: DynamicRow) => ({
          record,
          ...col,
          editable: col.editable,
          inputType: col.inputType,
          isRequired: col.isRequired,
          title: col.title,
          options: col.options,
          width: col.width,
          handleUpdateRow
        })
      }
    })

    setColumns([
      ...initialUserColumns
    ].filter((col: EditableTableColumnType<DynamicRow>) => !col.isHidden && !col.isDeleted))
  }, [dynamicColumns])

  const handleDeleteRow = (row_id: string) => {
    deleteRow({
      shortlist_id,
      row_id
    })
  }

  const handleAddRow = () => {
    createRow({
      shortlist_id
      // row: {
      //   rowKey: 'new',
      //   createdAt_col: moment().unix(),
      //   updatedAt_col: moment().unix(),
      //   createdBy_col: userData?.username || 'unknown',
      //   updatedBy_col: userData?.username || 'unknown'
      // }
    })
  }

  const handleUpdateRow = (dataIndex : string, row: DynamicRow) => {
    // console.log(dataIndex, row)
    updateCell({
      shortlist_id,
      row_id: row.row_id,
      dataIndex,
      value: row[dataIndex as keyof DynamicRow]
    })
  }

  const handleAddColumn = (value:  keyof typeof InputTypeEnum) => {
    const columnName = InputTypeEnum[value] as string

    const uniqueKey = `${columnName.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}_${Math.random().toString(36).substr(2, 5)}`

    const newColumn: EditableTableColumnType<DynamicRow> = {
      title: columnName.charAt(0).toUpperCase() + columnName.slice(1),
      dataIndex: uniqueKey,
      isRequired: false,
      isDefault: false,
      inputType: value,
      editable: true,
      width: 150,
      onCell: (record: any) => ({
        record,
        editable: true,
        inputType: value,
        isRequired: false,
        title: columnName.charAt(0).toUpperCase() + columnName.slice(1),
        options: [],
        dataIndex: columnName.toLocaleLowerCase().replace(' ', '_')
      })
    }

    scrollIntoView(document.querySelector('.editable-row'), {
      align: {
        left: 9999999
      }
    })

    addColumn({
      shortlist_id,
      column: newColumn
    })

    return newColumn
  }

  const handleDeleteColumn = (dataIndex: string) => {
    deleteColumn({
      shortlist_id,
      dataIndex
    })
  }

  const handleToggleColumnVisibility = (dataIndex: string) => {
    toggleColumn({
      shortlist_id,
      dataIndex
    })
  }

  const handleUpdateColumn = (column: EditableTableColumnType<DynamicRow>) => {
    updateColumn({
      shortlist_id,
      column
    })
  }

  const handleDeleteShortlist = () => {
    deleteShortlist({
      shortlist_id
    })

    setOpenDropdown(false)
  }

  const handleUpdateShortlist = (str : string) => {
    updateShortlist({
      shortlist_id,
      shortlist_name: str
    })
  }

  const generateTitle = () => {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
      }}>
        <Typography.Title level={5} editable={!shortlistInfo.is_default ? { onChange: (e) => handleUpdateShortlist(e) } : false}>{shortlistInfo.shortlist_name}</Typography.Title>
        {!shortlistInfo.is_default && (
          <Dropdown overlay={<Menu
            items={[
              {
                key: '1',
                label: 'Share',
                icon: <ShareAltOutlined />
              },
              {
                key: '2',
                label: <Popconfirm title={'Sure to delete?'}
                  onConfirm={() => handleDeleteShortlist()}
                  onCancel={() => setOpenDropdown(false)}
                >
                  <a>Delete</a>
                </Popconfirm>,
                icon: <DeleteOutlined />
              }
            ]}
          />}
          open={openDropdown}
          trigger={['click']}>
            <Button icon={<DownOutlined />} type="primary" onClick={() => setOpenDropdown(prev => !prev)} >
              Actions
            </Button>
          </Dropdown>)}

      </div>
    )
  }

  return (
    <EditableTable
      tableId={shortlist_id}
      columns={columns}
      setColumns={setColumns}
      dataSource={rows[shortlist_id]}
      handleAddRow={handleAddRow}
      handleDeleteRow={handleDeleteRow}
      handleUpdateRow={handleUpdateRow}
      title={generateTitle}
      handleAddColumn={handleAddColumn}
      handleDeleteColumn={handleDeleteColumn}
      handleUpdateColumn={handleUpdateColumn}
      handleToggleColumnVisibility={handleToggleColumnVisibility}
      loading={isLoading || isUpdating}
      pagination={{
        defaultPageSize: 5,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '50', '100', '200', '500']
      }}
      customRenderers={shortlistTableRenderers}
      customSorters={shortlistTableSorters}
      customFilters={shortlistTableFilters}
    />
  )
}

export default ShortlistTable
