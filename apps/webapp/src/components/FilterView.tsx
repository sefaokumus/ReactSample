import React from 'react'

import { PlayerFilter, SelectedFilter }                                        from '@monorepo/common/types'
import { Checkbox, Col, InputNumber, Radio, Row, Select,  Typography, Slider } from 'antd'

import RemoteMultipleSelectPicker from './EditableTable/Pickers/RemoteMultipleSelectPicker'

type FilterViewProps = {
  filter: PlayerFilter
  style?: React.CSSProperties
  value? : SelectedFilter['value']
  onChange?: (value: SelectedFilter) => void
}

const FilterView = ({ filter, value, style, onChange  }: FilterViewProps) => {
  const [filterValue, setFilterValue]         = React.useState<SelectedFilter['value']>(value || '')
  const [rangeDisplay, setRangeDisplay]       = React.useState<[number, number]>([filter.minVal || 0, filter.maxVal || 0])
  const [showMultiSelect, setShowMultiSelect] = React.useState<boolean>(false)

  React.useEffect(() => {
    setFilterValue(value || '')

    if (filter.type === 'range') {
      setRangeDisplay(value as [number, number] || [filter.minVal || 0, filter.maxVal || 0])
    }
    return () => { }
  }, [value])

  const handleChangeValue = (value: SelectedFilter['value']) => {
    setFilterValue(value)
    onChange && onChange({
      id: filter.id,
      name: filter.name,
      type: filter.type,
      value
    })
  }

  const handleChangeRange = (value: [number, number]) => {
    onChange && onChange({
      id: filter.id,
      name: filter.name,
      type: filter.type,
      value
    })
  }

  return (
    <div style={style}>
      {
        ((filter.type !== 'filter') && (!filter.hideTitle)) && <Typography.Text type='secondary' >{filter.name}</Typography.Text>
      }

      {
        filter.type === 'filter' && (
          // @ts-ignore
          filter.options?.map((option: PlayerFilter) =>
            <FilterView
              key={option.id}
              filter={option}
              style={style}
              onChange={onChange} />)
        )
      }
      {
        filter.type === 'select' && (
          <Select
            showSearch
            labelInValue
            allowClear
            style={{ width: '100%' }}
            placeholder={`Select ${filter.name}`}
            optionFilterProp="children"
            value={filterValue}
            onChange={(op:any) => handleChangeValue(op.value)}
            onClear={() => handleChangeValue('')}
            options={filter.options?.map(option => ({ label: option, value: option }))}
          />
        )
      }

      {
        filter.type === 'multiselect' && (
          <Select
            mode='multiple'
            labelInValue
            style={{ width: '100%' }}
            open={showMultiSelect}
            onFocus={() => setShowMultiSelect(true)}
            onBlur={() => setShowMultiSelect(false)}
            placeholder={`Select ${filter.name}`}
            optionFilterProp="children"
            value={(filterValue as string[]) || []}
            onChange={(op : any[]) => handleChangeValue(op.length === 0 ? '' : op.map((o: any) => o.value))}
            onClear={() => handleChangeValue('')}
            options={filter.options?.map(option => ({ label: option, value: option }))}
          />
        )
      }
      {
        (filter.type === 'positionSelect' || filter.type === 'footSelect') && (
          <Select
            mode='multiple'
            labelInValue
            style={{ width: '100%' }}
            open={showMultiSelect}
            onFocus={() => setShowMultiSelect(true)}
            onBlur={() => setShowMultiSelect(false)}
            placeholder={`Select ${filter.name}`}
            optionFilterProp="children"
            value={(filterValue as string[]) || []}
            onChange={(op : any[]) => handleChangeValue(op.length === 0 ? '' : op.map((o: any) => o.value))}
            onClear={() => handleChangeValue('')}
            showSearch
            allowClear
            autoFocus
            options={filter.options}
          />
        )
      }

      {
        filter.type === 'radio' && (
          <Radio.Group
            value={filterValue}
            options={(filter.options as string[])?.map(option => ({ label: option, value: option }))}
            onChange={(op) => handleChangeValue(op.target.value)}
          />

        )
      }

      {
        filter.type === 'checkbox' && (
          <Checkbox.Group
            value={filterValue as string[]}
            options={(filter.options as {label : string, value: string}[])}
            onChange={(checkedValues) => {
              handleChangeValue(checkedValues)
            }}
          />

        )
      }
      {
        filter.type === 'range' && (
          <Row gutter={[8, 0]} align='stretch'>
            <Col span={24}>
              <Slider
                range={{ draggableTrack: true }}
                min={filter.minVal}
                max={filter.maxVal}
                value={(rangeDisplay as [number, number])}
                onChange={(value:[number, number]) => { setRangeDisplay(value) }}
                onAfterChange={(val: any) => handleChangeRange(val)}
              />
            </Col>
            <Col span={12}>
              <InputNumber
                style={{ maxWidth: '100%' }}
                value={rangeDisplay[0]}
                onChange={(val) => handleChangeRange([val as number, (filterValue as [number, number])[1]])}
                min={filter?.minVal || 0}
                max={filter?.maxVal || 1}
                defaultValue={filter?.minVal || 0}
              />
            </Col>
            <Col span={12}>
              <InputNumber
                style={{ maxWidth: '100%', float: 'right' }}
                value={rangeDisplay[1]}
                onChange={(val) => handleChangeRange([(filterValue as [number, number])[0], val as number])}
                min={filter?.minVal || 0}
                max={filter?.maxVal || 1}
                defaultValue={filter?.maxVal || 1} />
            </Col>
          </Row>
        )
      }

      {
        (filter.type === 'teamSelect' ||  filter.type === 'playerSelect' || filter.type === 'countrySelect' || filter.type === 'leagueSelect') && (
          <RemoteMultipleSelectPicker
            inputType={filter.type}
            title={filter.name}
            handleChange={handleChangeValue}
            value={filterValue ? filterValue as any[] : undefined}
          />
        )
      }

    </div>
  )
}

export default React.memo(FilterView)
