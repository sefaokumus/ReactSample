import React, { useState } from 'react'

import { CheckSquareOutlined }                   from '@ant-design/icons'
import { CurrencyEnum  }                         from '@monorepo/common/types'
import {   InputNumber, Button, Dropdown, Menu } from 'antd'

type MoneyFieldType = {
  currency: CurrencyEnum;
  from: number;
  to: number;
  salaryType?: 'Net' | 'Gross'
}

interface MoneyRangePickerProps {
  mode : 'budget' | 'salary'
  value?: MoneyFieldType | string;
  onChange?: (value: MoneyFieldType) => void;
  onComplete?: (value: MoneyFieldType) => void;
  min?: number;
  max?: number;
}

const MoneyRangePicker: React.FC<MoneyRangePickerProps> = ({ value = { currency: CurrencyEnum.EUR, from: 0, to: 100, salaryType: 'Gross' }, mode, onChange, onComplete, min, max }) => {
  const [range, setRange] = useState<MoneyFieldType>(typeof value === 'string' ?  { currency: CurrencyEnum.EUR, from: 0, to: 100, salaryType: 'Gross' } : value)

  console.log(range)

  const handleComplete = () => {
    onChange?.(range)
    onComplete?.(range)
  }
  return (

    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 4 }}>
      <InputNumber
        style={{ width: '100%' }}
        value={range.from}
        placeholder='Min'
        onChange={(val) => setRange(prev => ({ ...prev, from: val as number }))}
        step={0.01}
        min={min}
        max={max}
        size="small"
      />
      <InputNumber
        style={{ width: '100%' }}
        value={range.to}
        placeholder='Max'
        onChange={(val) => setRange(prev => ({ ...prev, to: val as number }))}
        step={0.01}
        min={min}
        size="small"
      />
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 4 }}>
        <Dropdown overlay={<Menu
          items={
            Object.keys(CurrencyEnum).map((key, index) => ({
              key: index,
              label: CurrencyEnum[key as keyof typeof CurrencyEnum],
              value: key,
              onClick: () => setRange(prev => ({ ...prev, currency: CurrencyEnum[key as keyof typeof CurrencyEnum] }))
            }))
          }
        />}  >
          <Button size='small'>{range.currency || '$'}</Button>
        </Dropdown>
        {
          mode === 'salary' && (
            <Dropdown overlay={<Menu
              items={
                ['Net', 'Gross'].map((key, index) => ({
                  key: index,
                  label: key,
                  value: key,
                  // @ts-ignore
                  onClick: () => setRange(prev => ({ ...prev, salaryType: key }))
                }))
              }
            />}  >
              <Button size='small'>{range.salaryType || 'Net'}</Button>
            </Dropdown>
          )
        }
        <Button
          icon={<CheckSquareOutlined />}
          type="primary"
          size="small"
          onClick={() => handleComplete()}
        />
      </div>
    </div>
  )
}
export default MoneyRangePicker
