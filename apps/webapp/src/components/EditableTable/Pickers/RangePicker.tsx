import React, {  useState } from 'react'

import { CheckSquareOutlined }   from '@ant-design/icons'
import {  InputNumber, Button  } from 'antd'
interface RangePickerProps {
  value?: [number, number];
  onChange?: (value: [number, number]) => void;
  onComplete?: (value: [number, number]) => void;
  min?: number;
  max?: number;
  formatter?: (value: number | undefined) => string;
}

const RangePicker: React.FC<RangePickerProps> = ({ value = [0, 0], onChange, onComplete, min, max, formatter }) => {
  const [range, setRange] = useState<[number, number]>(value)

  const handleComplete = () => {
    onChange?.(range)
    onComplete?.(range)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 4, margin: '4px 0px' }}>
      <InputNumber
        style={{ maxWidth: '100%' }}
        size='small'
        placeholder='Min'
        value={range[0]}
        onChange={(val) => setRange([val as number, range[1]])}
        min={min}
        onPressEnter={handleComplete}
      />

      <InputNumber
        style={{ maxWidth: '100%', float: 'right' }}
        value={range[1]}
        placeholder='Max'
        size='small'
        onChange={(val) => setRange([range[0], val as number])}
        min={min}
        onPressEnter={handleComplete}
      />
      <Button
        icon={<CheckSquareOutlined />}
        size='small'
        type="primary"
        block
        onClick={() => handleComplete()}
      >Save</Button>
    </div>
  )
}
export default RangePicker
