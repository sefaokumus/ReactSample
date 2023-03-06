import React, { useState, memo } from 'react'

import { CheckSquareOutlined, DeleteOutlined  }          from '@ant-design/icons'
import { useStoreActions, useStoreState }                from '@monorepo/common/hooks'
import { translatePlayerStat }                           from '@monorepo/common/utils/translator'
import { Button, Checkbox, Dropdown, Menu, Popconfirm  } from 'antd'
import { createUseStyles }                               from 'react-jss'

const useStyles = createUseStyles({
  root: { display: 'flex', justifyContent: 'end',  gap: 8 }
})

const ChartsTypesDropdown = memo(function ChartsTypesDropdown () {
  const [openDropdown, setOpenDropdown]                   = useState(false)
  const { analysisCharts }                                = useStoreState(state => state.appData)
  const { toggleAnalysisChart, removeFromAnalysisCharts } = useStoreActions(actions => actions.appData)
  const classes                                           = useStyles()

  const chartsMenu = () => {
    return (
      <Menu>
        <Menu.ItemGroup title="Default Charts">
          {
            analysisCharts.filter(ac => (ac.isDefault)).map((scatter, index) =>
              <Menu.Item key={`scatterDefault_${index}`}>
                <Checkbox
                  checked={scatter.visible}
                  onChange={() => scatter.id && toggleAnalysisChart(scatter.id)}>
                  {translatePlayerStat(scatter.yField)} vs {translatePlayerStat(scatter.xField)}
                </Checkbox>
              </Menu.Item>)
          }
        </Menu.ItemGroup>
        <Menu.Divider />
        <Menu.ItemGroup title="Custom Charts">
          {
            analysisCharts.filter(ac => !ac.isDefault).map((scatter, index) =>
              <Menu.Item key={`scatterCustom_${index}`}>
                <Checkbox
                  checked={scatter.visible}
                  onChange={() => scatter.id && toggleAnalysisChart(scatter.id)}>
                  {translatePlayerStat(scatter.yField)} vs {translatePlayerStat(scatter.xField)}
                </Checkbox>

                <Popconfirm
                  title="Are you sure to delete this chart?"
                  onConfirm={() => scatter.id && removeFromAnalysisCharts(scatter.id)}
                  okText="Yes"
                  cancelText="No"
                  placement='bottom'
                >
                  <Button
                    size='small'
                    style={{ margin: 0, zIndex: 9999  }}
                    shape="circle"
                    icon={<DeleteOutlined />}
                  />
                </Popconfirm>
              </Menu.Item>
            )
          }

        </Menu.ItemGroup>
      </Menu>)
  }

  return (
    <div className={classes.root}>
      <Dropdown
        overlay={chartsMenu}
        open={openDropdown}
        trigger={['click']}
      >
        <Button icon={<CheckSquareOutlined />} onClick={() => setOpenDropdown(prev => !prev)}  type="primary">Charts</Button>
      </Dropdown>
    </div>
  )
})

export default ChartsTypesDropdown
