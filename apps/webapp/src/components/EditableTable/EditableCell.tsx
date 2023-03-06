import React, { useContext, useState } from 'react'

import { EditableCellProps, FootEnum, OptionType, PositionEnum }               from '@monorepo/common/types'
import { Button, Form, Input, InputNumber, Tag, Typography, Checkbox, Select } from 'antd'

import { Rule }            from 'antd/lib/form'
import { createUseStyles } from 'react-jss'

import EditableContext from './EditableContext'

import AutoCompletePicker from './Pickers/AutoCompletePicker'
import DateStringPicker   from './Pickers/DateStringPicker'
import MoneyRangePicker   from './Pickers/MoneyRangePicker'
import RangePicker        from './Pickers/RangePicker'

const useStyles                                 = createUseStyles({
  cellWrap: {
    padding: '5px 12px',
    cursor: 'pointer',
    minHeight: 30,
    minWidth: 20
  }
})
const EditableCell: React.FC<EditableCellProps> = ({
  title, children, dataIndex, editable, inputType, record, isRequired = true, isDefault, isHidden, options, handleUpdateRow, ...restProps
}) => {
  const classes               = useStyles()
  const [editing, setEditing] = useState(inputType === 'checkbox')
  const form                  = useContext(EditableContext)!
  const offeredPlayers        = Form.useWatch('offeredPlayers_col', form)

  const handleChange = (newValue: any) => {
    const values = form.getFieldsValue()

    if (inputType === 'teamSelect'    ||
      inputType === 'playerSelect'    ||
      inputType === 'positionSelect'  ||
      inputType === 'footSelect'      ||
      inputType === 'countrySelect'   ||
      inputType === 'leagueSelect'    ||
      inputType === 'select'          ||
      inputType === 'multiselect'
    ) {
      form.setFieldsValue({
        ...values,
        [dataIndex]: newValue || ''
      })
      save()
    }

    if (inputType === 'multiplayerSelect') {
      form.setFieldsValue({
        ...values,
        offeredPlayers_col: [...(values.offeredPlayers_col || []), newValue]
      })
    }
  }

  const handleRemovePlayer = (playerId: string) => {
    const values = form.getFieldsValue()

    form.setFieldsValue({
      ...values,
      offeredPlayers_col: values.offeredPlayers_col.filter((player: any) => player.id !== playerId)
    })
  }

  const toggleEdit = () => {
    setEditing(!editing)
    form.setFieldsValue({ [dataIndex]: record[dataIndex] })
  }

  const save = async () => {
    try {
      const values = await form.validateFields()
      if (inputType !== 'checkbox') {
        toggleEdit()
      }
      handleUpdateRow(dataIndex, { ...record, ...values })
    } catch (errInfo) {
      console.log('Save failed:', errInfo)
    }
  }

  let childNode   = children
  let editingNode = null

  switch (inputType) {
  case 'checkbox':
    editingNode = <Checkbox onChange={save}  />
    break
  case 'number':
    editingNode = <InputNumber onPressEnter={save} onBlur={save} placeholder={`Add a ${title}`} />
    break
  case 'date':
    editingNode = <DateStringPicker onBlur={save} placeholder={`Add a ${title}`}  />
    break
  case 'range':
    editingNode = <RangePicker min={0} max={dataIndex === 'height_col' ? 250 : dataIndex === 'weight_col' ? 150 : dataIndex === 'age_col' ? 50 : dataIndex === 'budget_col' ? 1000 : 100} onComplete={save} />
    break
  case 'budget':
    editingNode = <MoneyRangePicker min={0} max={500 } onComplete={save} mode='budget' />
    break
  case 'salary':
    editingNode = <MoneyRangePicker min={0} max={100} onComplete={save} mode='salary' />
    break
  case 'teamSelect': case 'playerSelect': case 'countrySelect': case 'leagueSelect':
    editingNode = <AutoCompletePicker
      inputType={inputType}
      title={title}
      handleChange={handleChange}
      onBlur={save}
    />
    break
  case 'select': case 'multiselect':
    editingNode = <Select
      mode={inputType === 'multiselect' ? 'multiple' : undefined}
      size="small"
      style={{ width: '100%' }}
      onChange={handleChange}
      onBlur={save}
      onSelect={save}
      optionLabelProp="label"
      allowClear
      autoFocus
      placeholder={`Select a ${title}`}
    >
      {
        options?.map((option: OptionType) => <Select.Option key={option.label} value={option.label}><Tag color={option.color} >{option.label}</Tag></Select.Option>)
      }
    </Select>
    break
  case 'positionSelect': case 'footSelect':
    editingNode = <Select
      style={{ width: '100%' }}
      onChange={handleChange}
      onBlur={save}
      onSelect={save}
      optionLabelProp="label"
      showSearch
      allowClear
      autoFocus
      placeholder={`Select a ${title}`}

      options={inputType === 'positionSelect'
        ? Object.keys(PositionEnum).map(d => ({ value: d, label: PositionEnum[d as keyof typeof PositionEnum] }))
        : Object.keys(FootEnum).map(d => ({ value: d, label: d }))
      }
    />
    break
  case 'multiplayerSelect':
    editingNode = <React.Fragment>
      <AutoCompletePicker
        inputType={inputType}
        title={title}
        handleChange={handleChange}
      />

      {
        dataIndex === 'offeredPlayers_col' && Array.isArray(offeredPlayers) && offeredPlayers.length > 0 && (
          <>
            <Typography>Players</Typography>
            <div style={{ display: 'flex', flexDirection: 'row', gap: 4, flexWrap: 'wrap' }}>
              { offeredPlayers.map((p: { id: string, name: string }) => <Tag key={p.id} id={p.id} closable onClose={() => handleRemovePlayer(p.id)}  >{p.name}</Tag>) }
            </div>
          </>
        )
      }
      {
        dataIndex === 'offeredPlayers_col' && (<Button onClick={save} type='primary' size="small" style={{ marginTop: 8 }} block >Update</Button>)
      }
    </React.Fragment>
    break
  case 'text':
    editingNode = <Input.TextArea  onBlur={save} placeholder={`Add a ${title}`} autoFocus/>
    break
  case 'url':
    editingNode = <Input onPressEnter={save} onBlur={save} placeholder={`Add a ${title}`} autoFocus />
    break
  default:
    editingNode = <Input onPressEnter={save} onBlur={save} placeholder={`Add a ${title}`} autoFocus/>
  }

  const rules: Rule[] = []
  if (isRequired) { rules.push({ required: true, message: `${title} is required.` }) }

  if (inputType === 'range') {
    if (dataIndex === 'budget_col' || dataIndex === 'salary_col') {
      rules.push({
        validator: (_, value) => {
          if (value && value?.from && value?.to && value.from > value.to) {
            return Promise.reject(new Error('From value must be less than To value.'))
          }
          return Promise.resolve()
        }
      })
    } else {
      rules.push({
        validator: (_, value) => {
          if (value && value[0] && value[1] && value[0] > value[1]) {
            return Promise.reject(new Error('Min value must be less than max value.'))
          }
          return Promise.resolve()
        }
      })
    }
  }

  if (editable || inputType === 'checkbox') {
    childNode = editing
      ? (
        <Form.Item
          style={{ margin: 0, textAlign: 'center' }}
          name={dataIndex}
          initialValue={record[dataIndex]}
          valuePropName={inputType === 'checkbox' ? 'checked' : 'value'}
          rules={rules}
        >
          {editingNode}
        </Form.Item>
      )
      : (
        <div className={classes.cellWrap} onClick={toggleEdit}>
          {children}
        </div>
      )
  }

  return <td {...restProps}>{childNode}</td>
}

export default EditableCell
