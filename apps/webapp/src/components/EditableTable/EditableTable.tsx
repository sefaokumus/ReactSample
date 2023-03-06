
import React, { memo, useRef, useState } from 'react'

import {
  EllipsisOutlined, FullscreenExitOutlined, FullscreenOutlined,
  PlusCircleOutlined, InsertRowBelowOutlined, DeleteOutlined
} from '@ant-design/icons'
import { DynamicRow, EditableTableColumnType, EditableTableProps }       from '@monorepo/common/types'
import { Button, Drawer, Popconfirm, Table, Popover, Space, Typography } from 'antd'

import { ColumnType, TableProps }  from 'antd/es/table'
import Tooltip                     from 'antd/es/tooltip'
import classNames                  from 'classnames'
import { createUseStyles }         from 'react-jss'
import type { ResizeCallbackData } from 'react-resizable'
// @ts-ignore
import scrollIntoView from 'scroll-into-view'

import DynamicColumnManager, { ColumnEditor, DynamicColumnManagerHandlers, DynamicColumnManagerProps } from './DynamicColumnManager'

import './EditableTable.css'
import EditableCell           from './EditableCell'
import { getIconOfInputType } from './EditableTableConstants'
import EditableRow            from './EditableTableRow'
import ResizableTitle         from './ResizableTitle'

const components = {
  body: {
    row: EditableRow,
    cell: EditableCell
  },
  header: {
    cell: ResizableTitle
  }
}

const useStyles = createUseStyles({
  wrapper: {
    position: 'relative',
    overflow: 'hidden',
    background: '#fafafa'
  },
  fullscreen: {
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    padding: 8,
    position: 'fixed',
    boxShadow: 'none',
    transition: 'all 0.3s',
    borderRadius: 0,
    background: '#d9d9d9',
    zIndex: 99999
  }
})

const EditableTable: React.FC<EditableTableProps<DynamicRow>> = memo(
  function EditableTable ({
    tableId,
    columns,
    extraItem,
    dataSource,
    editable = true,
    setColumns,
    handleAddRow,
    handleDeleteRow,
    handleUpdateRow,
    handleAddColumn,
    handleDeleteColumn,
    handleUpdateColumn,
    handleToggleColumnVisibility,
    style,
    customRenderers,
    customSorters,
    customFilters,
    ...rest
  }) {
    const classes                                         = useStyles()
    const [drawerOpen, setDrawerOpen]                     = useState(false)
    const [openPopoverDataIndex, setOpenPopoverDataIndex] = useState<string | null>(null)
    const [isFullScreen, setIsFullScreen]                 = useState<boolean>(false)
    // const [filteredInfo, setFilteredInfo]                 = useState<Record<string, FilterValue | null>>({})
    // const [sortedInfo, setSortedInfo]                     = useState<SorterResult<DynamicRow>>({})
    // const [filterKey, setFilterKey]                       = useState<string | null>(null)

    const dynamicColumnManagerRef = useRef<DynamicColumnManagerHandlers>()

    const hide             = () => {
      setOpenPopoverDataIndex(null)
    }
    const handleOpenChange = (newOpen: boolean, dataIndex: string) => {
      if (newOpen) {
        setOpenPopoverDataIndex(dataIndex)
      } else {
        hide()
      }
    }

    const openDrawer: (mode: DynamicColumnManagerProps['screen']) => void = (mode) => {
      setDrawerOpen(true)
      scrollIntoView(document.querySelector('.editable-row'), {
        align: {
          left: 9999999
        },
        time: 1

      })
      setTimeout(() => {
        dynamicColumnManagerRef.current?.goToScreen(mode)
      }, 10)
      // setDrawerMode(mode)
    }

    const closeDrawer = () => setDrawerOpen(false)

    const ActionHeader = () => <div>
      <Button type='text' onClick={() => openDrawer('AddColumn')} icon={<PlusCircleOutlined />} />
      <Button type='text' onClick={() => openDrawer('PropertiesEditor')} icon={<EllipsisOutlined />} />
      <Button type='text' onClick={() => setIsFullScreen(prev => !prev)} icon={isFullScreen ? <FullscreenExitOutlined /> :  <FullscreenOutlined />} />
    </div>

    const DynamicTitle = (column: EditableTableColumnType<DynamicRow>) => {
      if (typeof column.title === 'string') {
        return (
          <Popover align={{
            // targetOffset: [0, 20]
          }}
          open={openPopoverDataIndex === column.dataIndex}
          onOpenChange={(isOpen) => handleOpenChange(isOpen, column.dataIndex as string)}
          placement='bottomLeft'
          trigger={['click']}
          showArrow={false}
          overlayStyle={{ padding: 0 }}
          content={<ColumnEditor
            column={column}
            showEditOptions={false}
            handleDeleteColumn={handleDeleteColumn}
            handleUpdateColumn={handleUpdateColumn}
            handleToggleColumnVisibility={handleToggleColumnVisibility}
            onEditClick={() => {
              openDrawer('EditColumn')
              hide()
              setTimeout(() => {
                // @ts-ignore
                dynamicColumnManagerRef.current?.columnToEdit(column)
              }, 100)
            }}
            hidePopover={hide}
          />} >
            <Tooltip title={(column.title.length * 10) > (column?.width as number) ? column.title : undefined} autoAdjustOverflow>
              {/* onClick={e => e.stopPropagation()} */}
              <Button block type='text' icon={ getIconOfInputType(column.inputType)} style={{ borderRadius: 0, textAlign: 'start' }} onClick={e => e.stopPropagation()}>{ column.title }</Button>
            </Tooltip>
          </Popover>
        )
      }
      return column.title
    }

    const handleResize = (index: number) => (_: React.SyntheticEvent<Element>, { size }: ResizeCallbackData) => {
      const newColumns  = [...columns]
      newColumns[index] = {
        ...newColumns[index],
        width: size.width > 75 ? size.width : 75
      }
      setColumns(newColumns)
    }

    const handleChange: TableProps<DynamicRow>['onChange'] = (pagination, filters, sorter) => {
      console.log('Various parameters', pagination, filters, sorter)
    }

    const tableColumns: TableProps<DynamicRow>['columns'] =
      [...columns.map((c: EditableTableColumnType<DynamicRow>, index: number) => {
        return {
          ...c,
          title: editable ? DynamicTitle(c) : () => <div style={{ padding: '8px 4px' }}>{c.title as string}</div>,
          render: customRenderers && customRenderers(c.dataIndex, c.inputType, c.options, c.editable),
          sorter: customSorters && customSorters(c.dataIndex, c.inputType),
          // sortOrder: sortedInfo.columnKey === c.dataIndex ? sortedInfo.order : null,
          showSorterTooltip: false,
          filterSearch: true,
          filterMultiple: true,
          // if customFilters defined destructure it and pass it to the column
          ...customFilters && customFilters(c.dataIndex, c.inputType, dataSource),

          onHeaderCell: (c: ColumnType<any>) => ({
            width: c.width,
            onResize: handleResize(index)
          })
        }
      })
      ]

    if (editable && handleDeleteRow) {
      tableColumns.push(
        {
          title: () => <ActionHeader />,
          dataIndex: 'action_col',
          width: 100,
          fixed: 'right',
          render: (_: any, record) =>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 80 }}>
              <Popconfirm title={'Sure to delete?'} onConfirm={() => handleDeleteRow(record.row_id)}>
                <Button icon={<DeleteOutlined />} shape="circle" type="text" size="small" />
              </Popconfirm>
            </div>
        })
    }

    return (
      <div className={classNames(classes.wrapper, isFullScreen && classes.fullscreen)} >
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          columns={tableColumns}
          size="small"
          dataSource={dataSource}
          rowKey={record => record.row_id}
          scroll={{ x: 1300 }}
          style={{ marginRight: drawerOpen ? 300 : 0, ...style }}
          onChange={handleChange}
          footer={() => handleAddRow && (
            <Space>
              <Button onClick={() => handleAddRow()} icon={<InsertRowBelowOutlined />} type="ghost" size="small">Add Row</Button>
              {extraItem}
            </Space>
          )}
          {...rest}
        />
        {
          editable && (
            <Drawer
              headerStyle={{ padding: 0, textAlign: 'start' }}
              bodyStyle={{ padding: '4px 8px' }}
              onClose={() => closeDrawer()}
              closable={false}
              open={drawerOpen}
              width={300}

            >
              <DynamicColumnManager
                shortlist_id={tableId}
                ref={dynamicColumnManagerRef}
                handleAddColumn={handleAddColumn}
                handleDeleteColumn={handleDeleteColumn}
                handleUpdateColumn={handleUpdateColumn}
                handleToggleColumnVisibility={handleToggleColumnVisibility}
                onClose={() => closeDrawer()}
              />
            </Drawer>)

        }

      </div>
    )
  })

export default EditableTable
