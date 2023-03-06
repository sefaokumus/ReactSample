import React, { useState } from 'react'

import { RightOutlined }  from '@ant-design/icons'
import { InputTypeEnum  } from '@monorepo/common/types'
import { Input  }         from 'antd'

import { getIconOfInputType } from '../EditableTableConstants'

import DynamicColumnManagerListRow from './DynamicColumnManagerListRow'

type ColumnPickerProps = {
  onColumnSelect: (column: keyof typeof InputTypeEnum) => void
}
export const ColumnPicker = ({ onColumnSelect }: ColumnPickerProps) => {
  const initialItems = Object.keys(InputTypeEnum).map(dataIndex => ({
    dataIndex,
    value: dataIndex as keyof typeof InputTypeEnum
  }))

  const [items, setItems] = useState(initialItems)

  return <React.Fragment>
    <Input.Search placeholder="Search"
      onChange={
        e => {
          const value = e.target.value
          setItems(initialItems.filter(item => item.value.toLowerCase().includes(value.toLowerCase())))
        }}
      style={{ marginBottom: 12 }}
    />

    {
      items.map(item => (
        <DynamicColumnManagerListRow
          key={item.dataIndex}
          content={<>
            {getIconOfInputType(item.value)}
            <span style={{
              marginLeft: 8,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>{InputTypeEnum[item.value]}</span>
          </>}
          right={<RightOutlined />}
          onClick={() => onColumnSelect(item.value)}
        />
      ))}

  </React.Fragment>
}
