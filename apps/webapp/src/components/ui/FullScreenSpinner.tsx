import React from 'react'

import { Spin }            from 'antd'
import type { SpinProps }  from 'antd'
import { createUseStyles } from 'react-jss'

const useStyles                              = createUseStyles({
  wrapper: {
    background: 'rgb(0 0 0 / 15%)',
    position: 'relative',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0

  }
})
const FullScreenSpinner: React.FC<SpinProps> = (props) => {
  const classes = useStyles()
  return (
    <Spin size="large" wrapperClassName={classes.wrapper}  tip='Loading...' {...props} />
  )
}

export default FullScreenSpinner
