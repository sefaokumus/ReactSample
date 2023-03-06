/* eslint-disable no-unused-vars */
import React from 'react'

import {
  AimOutlined,
  AlignLeftOutlined,
  CalendarOutlined,
  CheckSquareOutlined,
  DollarCircleOutlined,
  DownCircleOutlined,
  FlagOutlined,
  LinkOutlined,
  NumberOutlined,
  SkinOutlined,
  SlidersFilled,
  SlidersOutlined,
  TeamOutlined,
  TrophyOutlined,
  UnorderedListOutlined,
  UserOutlined
} from '@ant-design/icons'
import { InputTypeEnum }                              from '@monorepo/common/types'
import { IoFootstepsOutline, IoRadioButtonOnOutline } from 'react-icons/io5'

const getIconOfInputType = (inputType : keyof typeof InputTypeEnum) => {
  switch (inputType) {
  case 'text':
    return <AlignLeftOutlined />
  case 'number':
    return <NumberOutlined />
  case 'checkbox':
    return <CheckSquareOutlined />
  case 'date':
    return <CalendarOutlined/>
  case 'select':
    return <DownCircleOutlined />
  case 'multiselect':
    return <UnorderedListOutlined />
  case 'range':
    return <SlidersOutlined />
  case 'radio':
    return <IoRadioButtonOnOutline />
  case 'teamSelect':
    return <SkinOutlined />
  case 'positionSelect':
    return <AimOutlined />
  case 'footSelect':
    return <IoFootstepsOutline style={{ marginRight: 8 }} />
  case 'playerSelect':
    return <UserOutlined />
  case 'multiplayerSelect':
    return <TeamOutlined />
  case 'leagueSelect':
    return <TrophyOutlined />
  case 'countrySelect':
    return <FlagOutlined />
  case 'url':
    return <LinkOutlined />
  case 'salary':
    return <DollarCircleOutlined />
  case 'budget':
    return <SlidersFilled />
  default:
  }
}
export { getIconOfInputType }
