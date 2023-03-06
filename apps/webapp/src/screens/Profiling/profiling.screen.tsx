import React, { useCallback, useEffect, useState } from 'react'

import { useStoreActions, useStoreState }                      from '@monorepo/common/hooks'
import { ListType }                                            from '@monorepo/common/types'
import { Tabs, Modal, Space, Typography, Form, Input, Select } from 'antd'
import type { TabsProps }                                      from 'antd'

import ShortlistTable from './components/ShortlistTable'

export default function ProfilingScreen () {
  const { shortlists }                       = useStoreState((state) => state.dynamicData)
  const { getMyShortlists, createShortlist } = useStoreActions(actions => actions.dynamicData)

  const [activeKey, setActiveKey] = useState('0')
  const [items, setItems]         = useState<TabsProps['items']>([])

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [newListName, setNewListName]       = useState('')
  const [newListType, setNewListType]       = useState('Shortlist')

  const generateShortlistTabs = useCallback((): TabsProps['items'] => {
    console.log('generateShortlistTabs')
    const defaultShortlistIds = Object.keys(shortlists).filter((key) => shortlists[key].is_default)
    const otherShortlistIds   = Object.keys(shortlists).filter((key) => !shortlists[key].is_default)

    const defaultShortlist = defaultShortlistIds.map((id) => shortlists[id]).sort((a, b) => {
      if (a.list_type === ListType.Clubneed && b.list_type === ListType.Shortlist) {
        return -1
      }
      if (a.list_type === ListType.Shortlist && b.list_type === ListType.Clubneed) {
        return 1
      }
      return 0
    })

    const otherShortlist = otherShortlistIds.map((id) => shortlists[id])

    return [
      {
        label: 'My Lists',
        children: (<div style={{
          overflowY: 'scroll',
          height: 'calc(100vh - 130px)'
        }}>
          {
            defaultShortlist.map((shortlist) => (
              <ShortlistTable shortlistInfo={shortlist} key={shortlist.shortlist_id} />
            ))
          }
        </div>),
        closable: false,
        key: '0'
      },
      ...otherShortlist.map((shortlist, index) => (
        {
          label: shortlist.shortlist_name,
          children: (<ShortlistTable shortlistInfo={shortlist} />),
          closable: false,
          key: (index + 1).toString()
        }
      ))
    ]
  }, [shortlists])

  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey)
  }

  useEffect(() => {
    getMyShortlists()
  }, [])

  useEffect(() => {
    const newItems = generateShortlistTabs() || []
    setItems(newItems)
    // set last tab as the active tab
    setActiveKey((newItems.length - 1).toString())
  }, [Object.keys(shortlists).length, shortlists])

  const handleAddNewList = () => {
    if (newListName && newListType) {
      createShortlist({
        shortlist_name: newListName,
        list_type: newListType === 'Shortlist' ? ListType.Shortlist : ListType.Clubneed,
        is_default: false
      })
      setIsModalVisible(false)
    }
  }

  // @ts-ignore
  const onEdit : TabsProps['onEdit'] = (targetKey : string, action : 'add' | 'remove') => {
    if (action === 'add') {
      setIsModalVisible(true)
    }
  }

  return (
    <>
      <Tabs
        type="editable-card"
        onChange={onChange}
        activeKey={activeKey}
        onEdit={onEdit}
        tabPosition="bottom"
        style={{
          background: '#fff',
          borderRadius: 12,
          overflow: 'hidden',
          height: 'calc(100vh - 80px)',
          boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)'
        }}
        items={items}
      />

      <Modal
        title="Add New List"
        okText="Add"
        okButtonProps={{
          disabled: !newListName,
          danger: true
        }}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => {
          handleAddNewList()
        }}
        maskClosable={false}
      >
        <Space direction="vertical" style={{ width: '100%' }}>

          <Typography.Text>
            Please enter the name of the new list
          </Typography.Text>

          <Form.Item
            rules={[
              {
                required: true,
                message: 'Please input a List Name!'
              }
            ]}
          >
            <Input
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            rules={[
              { required: true, message: 'Please select a List Type!' }
            ]}
          >

            {/* select ListType */}
            <Select style={{ width: 120 }} value={newListType} onChange={(e) => { setNewListType(e) }}>
              <Select.Option value="Clubneed">Clubneed</Select.Option>
              <Select.Option value="Shortlist">Shortlist</Select.Option>
            </Select>
          </Form.Item>
        </Space>
      </Modal>
    </>

  )
}
