import React, { useState, useEffect, useRef } from 'react'

import { EnterOutlined } from '@ant-design/icons'
import { toTitleCase }   from '@monorepo/common/utils/helper'

import { Tag, Input, Tooltip  } from 'antd'

interface TagListFormItemProps  {
  value?: string[],
  onChange?: (value: string[]) => void,
}

export const TagListFormItem = ({ value, onChange }: TagListFormItemProps) => {
  const [tags, setTags]             = useState<string[]>(value || [])
  const [inputValue, setInputValue] = useState('')
  const inputEl                     = useRef(null)

  useEffect(() => {
    onChange && onChange(tags)
  }, [tags])

  const handleRemove = (removedTag :string) => setTags(prev => {
    prev = prev.filter(tag => tag !== removedTag)
    return prev
  })

  const handleInputConfirm = () => {
    if (inputValue?.indexOf(',') === -1) {
      setTags(prev => {
        if (inputValue && prev.indexOf(toTitleCase(inputValue)) === -1) {
          prev = [...prev, toTitleCase(inputValue)]
        }
        return prev
      })
      setInputValue('')
    } else {
      const newTags = inputValue.split(',').map(tag => toTitleCase(tag))

      setTags(prev => {
        newTags.forEach(nt => {
          if (prev.indexOf(nt) === -1) { prev = [...prev, nt] }
        })

        return prev
      })
    }
  }

  return (
    <>
      <Input
        ref={inputEl}
        type="text"
        size="middle"
        value={inputValue}
        placeholder="Enter tags"
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={handleInputConfirm}
        onPressEnter={handleInputConfirm}
        suffix={

          <Tooltip placement="right" color='magenta' title='İçerği yazıp Enter tuşuna basın'>
            <EnterOutlined />
          </Tooltip>
        }
      />

      <div style={{ marginTop: tags.length === 0 ? 0 : 16 }}>
        {tags.map((tag, index) => {
          return (
            <span key={index} style={{ display: 'inline-block' }}>
              <Tag
                closable
                onClose={e => {
                  e.preventDefault()
                  handleRemove(tag)
                }}
                color='magenta'
                style={{ marginBottom: 5 }}
              >
                {tag}
              </Tag>
            </span>
          )
        })}
      </div>

    </>
  )
}

export default TagListFormItem
