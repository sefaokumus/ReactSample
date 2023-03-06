import React, { useState } from 'react'

import { DatePicker }  from 'antd'
import moment          from 'moment'
import type { Moment } from 'moment'
interface RangePickerProps {
  value?: number;
  onChange?: (value: number | null) => void;
  onBlur?: () => void;
  placeholder?: string;
}

const DateStringPicker: React.FC<RangePickerProps> = ({ value = moment().unix(), onChange, onBlur, placeholder }) => {
  const [dateMoment, setDateMoment] = useState<Moment>(moment.unix(value))

  const handleChange = (val: Moment | null) => {
    setDateMoment(val!)
    if (val) {
      onChange?.(moment(val).unix())
    } else {
      onChange?.(null)
    }
  }

  return (
    <DatePicker value={dateMoment} onChange={handleChange} onBlur={onBlur} onSelect={onBlur} placeholder={placeholder}  />
  )
}
export default DateStringPicker
