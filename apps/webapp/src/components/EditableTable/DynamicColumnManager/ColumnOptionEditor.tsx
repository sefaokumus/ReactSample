import React, { useState, useRef } from 'react'

import {  DeleteOutlined, EnterOutlined, PlusCircleOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons'
import { OptionType }                                                                      from '@monorepo/common/types'
import { reOrder, toTitleCase }                                                            from '@monorepo/common/utils/helper'
import { Typography, Tooltip, Button, Input, Divider, Tag, Popover }                       from 'antd'

import { PresetColorType, PresetColorTypes }                 from 'antd/es/_util/colors'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'

import { MdDragIndicator } from 'react-icons/md'

import DynamicColumnManagerListRow from './DynamicColumnManagerListRow'

interface DraggableOptionRowProps {
  tag: OptionType
  index: number
  isDragDisabled?: boolean
  updateTag: (tag: OptionType | null) => void
}
interface ColumnOptionEditorProps {
  value?: any[]
  onChange?: (props :any) => void
}

const ColumnOptionEditor = ({ value, onChange } : ColumnOptionEditorProps) => {
  const [options, setOptions]       = useState<OptionType[]>([])
  const [showInput, setShowInput]   = useState(false)
  const [inputValue, setInputValue] = useState('')
  const inputEl                     = useRef(null)

  React.useEffect(() => {
    if (value) { setOptions(value) }
  }, [value])

  const handleDragEnd = (result: DropResult): void => {
    const { destination, source } = result
    if (!destination) {
      return
    }

    const items = reOrder(
      options,
      source.index,
      destination.index
    )

    setOptions(items)
  }

  React.useEffect(() => {
    onChange?.(options)
  }, [options])

  const getRandomColor = (): PresetColorType => {
    const random = Math.floor(Math.random() * PresetColorTypes.length)
    return PresetColorTypes[random] as PresetColorType
  }

  const handleInputConfirm = () => {
    if (inputValue?.indexOf(',') === -1) {
      setOptions(prev => {
        if (inputValue && prev.indexOf(toTitleCase(inputValue)) === -1) {
          prev = [...prev, { label: toTitleCase(inputValue), color: getRandomColor() }]
        }
        return prev
      })
      setInputValue('')
    } else {
      const newTags = inputValue.split(',').map(tag => ({ label: toTitleCase(tag), color: getRandomColor() }))

      setOptions(prev => {
        newTags.forEach(nt => {
          if (prev.indexOf(nt) === -1) { prev = [...prev, nt] }
        })

        return prev
      })
    }
  }
  return <div style={{ width: '100%', margin: '8px 0px' }}>
    <div style={{  padding: 8, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography.Text strong>Options</Typography.Text>
      { options.length > 0 && <Button type="text" size='small' icon={<PlusCircleOutlined />} onClick={() => setShowInput(true)} /> }

    </div>

    {
      !showInput
        ? options.length === 0 && <DynamicColumnManagerListRow
          left={<PlusOutlined /> }
          content="Add an option"
          onClick={() => setShowInput(true)}
        />
        : <Input
          ref={inputEl}
          autoFocus
          type="text"
          size="middle"
          value={inputValue}
          placeholder="Enter tags"
          onChange={(e) => setInputValue(e.target.value)}
          style={{ marginBottom: 8 }}
          onBlur={() => {
            handleInputConfirm()
            setShowInput(false)
          } }
          onPressEnter={handleInputConfirm}
          suffix={

            <Tooltip placement="right" color='magenta' title='İçerği yazıp Enter tuşuna basın'>
              <EnterOutlined />
            </Tooltip>
          }
        />
    }

    <DragDropContext onDragEnd={handleDragEnd} >

      <Droppable droppableId={'optionsDroppableArea'} >
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
                options.map((item, index) => (
                  <DraggableOptionRow
                    key={index}
                    index={index}
                    tag={item}
                    updateTag={(tag) => {
                      console.log(tag, index)
                      if (!tag) {
                        setOptions(prev => {
                          prev = prev.filter((_, i) => i !== index)
                          return prev
                        })
                        return
                      }

                      setOptions(prev => {
                        prev[index] = tag
                        return prev
                      })
                    }}
                  />)
                )}
              {provided.placeholder}
            </div>
          )
        }}
      </Droppable>

    </DragDropContext>

  </div>
}

const DraggableOptionRow = ({ tag, updateTag, index, isDragDisabled }: DraggableOptionRowProps) => {
  const [tagTitle, setTagTitle]       = useState(tag?.label)
  const [openPopover, setOpenPopover] = useState(false)

  const handleTagLabelUpdate = () => {
    updateTag({ ...tag, label: tagTitle })
    hide()
  }
  const handleDeleteTag = () => {
    updateTag(null)
    hide()
  }

  const hide = () => {
    setOpenPopover(false)
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpenPopover(newOpen)
  }

  return <Draggable isDragDisabled={isDragDisabled} draggableId={`tag_${tag.label}_${index}`} index={index} >
    {(provided, snapshot): JSX.Element => (
      <div ref={provided.innerRef} {...provided.draggableProps}>

        <Popover align={{
          targetOffset: [0, 20]
        }}
        placement='bottomLeft'
        trigger={['click']}
        showArrow={false}
        open={openPopover}
        onOpenChange={handleOpenChange}
        content={<>
          <Input autoFocus placeholder="Column Title" value={tagTitle} onChange={t => setTagTitle(t.target.value)} onBlur={handleTagLabelUpdate} onPressEnter={handleTagLabelUpdate} style={{ marginBottom: 8 }} />
          <Button key={'deleteTag'} type="text" icon={<DeleteOutlined />} block danger onClick={handleDeleteTag} style={{ textAlign: 'left' }}>Delete Option</Button>
          <Divider key={index} style={{ margin: 0 }} />

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }} >
            <Typography.Text strong>Colors</Typography.Text>
            {
              PresetColorTypes.map((color, index) => {
                return <Button
                  key={index}
                  size="small"
                  type="text"
                  icon={<Tag color={color}
                    style={{ height: 20, width: 20 }} />}
                  block
                  onClick={() => updateTag({ ...tag, color })}
                  style={{
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center'
                  }}>{color.charAt(0).toUpperCase() + color.slice(1)}</Button>
              })
            }

          </div>
        </>}
        >
          <div >
            <DynamicColumnManagerListRow
              onClick={(event) => {
                event.preventDefault()
              }}
              left={<MdDragIndicator style={{ cursor: 'grab', marginRight: 8 }} size={18}  />}
              leftProps={{ ...provided.dragHandleProps }}
              content={<Tag color={tag.color}>{tag.label}</Tag>}
              right={<RightOutlined /> }
              style= {{ backgroundColor: snapshot.isDragging ? '#d4d4d4' : undefined }}
            />
          </div>
        </Popover>

      </div>
    )}
  </Draggable>
}

export default ColumnOptionEditor
