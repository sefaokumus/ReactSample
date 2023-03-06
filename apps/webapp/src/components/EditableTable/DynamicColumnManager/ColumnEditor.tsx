import React, { useState } from 'react'

import {  DeleteOutlined, EditOutlined, EyeInvisibleOutlined,  PushpinFilled    } from '@ant-design/icons'
import {  DynamicRow, EditableTableColumnType, OptionType }                       from '@monorepo/common/types'
import { Button, Input, Divider }                                                 from 'antd'

import ColumnOptionEditor from './ColumnOptionEditor'

type ColumnEditorProps = {
  column: EditableTableColumnType<DynamicRow>
  showEditOptions: boolean
  handleUpdateColumn?: (column: EditableTableColumnType<DynamicRow>) => void
  handleDeleteColumn?: (dataIndex: string) => void
  handleToggleColumnVisibility?: (dataIndex: string) => void
  goBack?: () => void
  onEditClick?: () => void
  hidePopover?: () => void
}

type ColumnListItem = {
  label?: string
  dataIndex?: string
  icon?: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  danger?: boolean
  type?: 'button' | 'divider' | 'optionsEditor'
}

export const ColumnEditor = ({
  column,
  showEditOptions = true,
  handleUpdateColumn,
  handleDeleteColumn,
  handleToggleColumnVisibility,
  goBack,
  onEditClick,
  hidePopover
}: ColumnEditorProps) => {
  const [columnTitle, setColumnTitle] = useState(column?.title as string)

  const items: ColumnListItem[] = [
    {
      label: `${column?.isHidden ? 'Show' : 'Hide'} Column`,
      dataIndex: `${column?.isHidden ? 'show' : 'hide'}-column`,
      icon: column?.isHidden ? <EyeInvisibleOutlined /> : <EyeInvisibleOutlined />,
      onClick: (e) => {
        e.stopPropagation()
        handleToggleColumnVisibility && handleToggleColumnVisibility(column.dataIndex as string)
      }
    }
  ]

  items.push(
    {
      label: `${column?.fixed ? 'Release' : 'Freeze'} Column`,
      dataIndex: `${column?.fixed ? 'release' : 'freeze'}-column`,
      icon: column?.fixed ? <PushpinFilled /> : <PushpinFilled />,
      onClick: (e) => {
        e.stopPropagation()
        handleUpdateColumn && handleUpdateColumn({ ...column, fixed: column?.fixed ? false : 'left' })
        hidePopover?.()
      }
    })

  if (!column?.isDefault) {
    items.push({
      label: 'Delete Column',
      dataIndex: 'delete-column',
      icon: <DeleteOutlined />,
      onClick: (e) => {
        e.stopPropagation()
        handleDeleteColumn && handleDeleteColumn(column.dataIndex as string)
        goBack?.()
      },
      danger: true
    })
  }
  items.push({ type: 'divider' })
  if (column.inputType === 'select' || column.inputType === 'multiselect') {
    if (showEditOptions) {
      items.push({ type: 'optionsEditor' })
    } else {
      items.push({ label: 'Edit Column', dataIndex: 'edit-options', icon: <EditOutlined />, onClick: () => onEditClick?.() })
    }
  }

  const handleUpdateTitle   = () => {
    handleUpdateColumn && handleUpdateColumn({
      ...column,
      title: columnTitle
    })
  }
  const handleUpdateOptions = (options: OptionType[]) => {
    handleUpdateColumn && handleUpdateColumn({
      ...column,
      options
    })
  }

  return <React.Fragment>
    <Input autoFocus
      placeholder="Column Title"
      value={columnTitle}
      onChange={t => setColumnTitle(t.target.value)}
      onBlur={handleUpdateTitle}
      onPressEnter={handleUpdateTitle}
      style={{ marginBottom: 8 }}
    />
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }} >
      {
        items.map((item, index) => {
          if (item.type === 'divider') return <Divider key={index} style={{ margin: 0 }} />
          if (item.type === 'optionsEditor') return <ColumnOptionEditor value={column.options} onChange={(options) => { handleUpdateOptions(options) }} />

          return  <Button key={`colKey_${index}`} type="text" icon={item.icon} block danger={item.danger} onClick={item.onClick} style={{ textAlign: 'left' }}>{item.label}</Button>
        })
      }
    </div>
  </React.Fragment>
}
