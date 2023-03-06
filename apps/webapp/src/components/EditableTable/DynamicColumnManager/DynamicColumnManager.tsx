import React, { forwardRef, useImperativeHandle, ForwardRefExoticComponent  } from 'react'

import {
  ArrowLeftOutlined,
  CloseOutlined
} from '@ant-design/icons'
import {  DynamicRow, InputTypeEnum, EditableTableColumnType } from '@monorepo/common/types'
import { Button, Typography }                                  from 'antd'
import { createUseStyles }                                     from 'react-jss'

import { ColumnEditor }           from './ColumnEditor'
import { ColumnPicker }           from './ColumnPicker'
import { ColumnPropertiesEditor } from './ColumnPropertiesEditor'
import DeletedColumnsEditor       from './DeletedColumnsEditor'

export * from './ColumnEditor'
export * from './ColumnPicker'
export interface DynamicColumnManagerProps {
  shortlist_id: string
  onClose: () => void
  handleAddColumn: (dataIndex :keyof typeof InputTypeEnum) => EditableTableColumnType<any>
  handleDeleteColumn: (dataIndex: string) => void
  handleUpdateColumn: (column: EditableTableColumnType<DynamicRow>) => void
  handleToggleColumnVisibility: (dataIndex: string) => void
  screen?: 'AddColumn' | 'EditColumn' | 'PropertiesEditor' | 'DeletedColumns'
}

export type DynamicColumnManagerHandlers = {
  goToScreen: (screen: DynamicColumnManagerProps['screen']) => void
  columnToEdit?: (column: EditableTableColumnType<DynamicRow>) => void
};

const useStyles = createUseStyles({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
})

const DynamicColumnManager: ForwardRefExoticComponent<any> = forwardRef<DynamicColumnManagerHandlers, any>(function Manager ({
  shortlist_id,
  onClose,
  handleAddColumn,
  handleDeleteColumn,
  handleUpdateColumn,
  handleToggleColumnVisibility
} : DynamicColumnManagerProps, ref) {
  const classes = useStyles()
  // const [columnTypeToAdd, setColumnTypeToAdd] = React.useState<keyof typeof InputTypeEnum | null>(null)
  const [columnToEdit, setColumnToEdit] = React.useState<EditableTableColumnType<DynamicRow> | null>(null)
  const [_screen, setScreen]            = React.useState<DynamicColumnManagerProps['screen']>('AddColumn')

  useImperativeHandle(ref, () => ({
    goToScreen (screen) {
      setScreen(screen)
    },
    columnToEdit (column : EditableTableColumnType<DynamicRow>) {
      setColumnToEdit(column)
    }
  }))

  const showBackButton = _screen === 'EditColumn' || _screen === 'PropertiesEditor' || _screen === 'DeletedColumns'

  const goBack         = () => {
    if (_screen === 'EditColumn' || _screen === 'DeletedColumns') {
      setScreen('PropertiesEditor')
    }

    if (_screen === 'PropertiesEditor') { setScreen('AddColumn') }
  }
  const goToEditScreen = (column: EditableTableColumnType<DynamicRow>) => {
    setColumnToEdit(column)
    setScreen('EditColumn')
  }

  const getTitleOfScreen = (screen: DynamicColumnManagerProps['screen'] = _screen) => {
    switch (screen) {
    case 'AddColumn':
      return 'Add New Column'
    case 'EditColumn':
      return 'Edit Column'
    case 'PropertiesEditor':
      return 'Column Properties'
    case 'DeletedColumns':
      return 'Deleted Columns'
    }
  }

  const Header = () => (
    <div className={classes.header}>
      <div className={classes.headerLeft}>
        { (showBackButton) && <Button icon={<ArrowLeftOutlined />} type="text" onClick={goBack} /> }
        <Typography.Title level={5} style={{ margin: 0 }}>{getTitleOfScreen(_screen)}</Typography.Title>
      </div>

      <Button icon={<CloseOutlined />} type="text" onClick={() => { setScreen('AddColumn'); onClose?.() }} />
    </div>
  )

  const handleAddNewColumn = (dataIndex: keyof typeof InputTypeEnum) => {
    const column = handleAddColumn(dataIndex)
    setColumnToEdit(column)
    setScreen('EditColumn')
  }

  return (<React.Fragment>
    <Header />

    {
      _screen === 'PropertiesEditor' && <ColumnPropertiesEditor shortlist_id={shortlist_id} onColumnSelect={goToEditScreen} setScreen={setScreen} />
    }

    {
      _screen === 'DeletedColumns' && <DeletedColumnsEditor shortlist_id={shortlist_id} setScreen={setScreen} />
    }

    {
      _screen === 'AddColumn' && <ColumnPicker onColumnSelect={handleAddNewColumn} />
    }

    {
      _screen === 'EditColumn' && columnToEdit  && <ColumnEditor
        column={columnToEdit}
        showEditOptions
        handleDeleteColumn={handleDeleteColumn}
        handleUpdateColumn={handleUpdateColumn}
        handleToggleColumnVisibility={handleToggleColumnVisibility}
        goBack={goBack}
      />
    }

  </React.Fragment>
  )
})

export default DynamicColumnManager
