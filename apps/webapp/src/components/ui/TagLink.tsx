import React from 'react'

import { Tag }             from 'antd'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  tag: {
    cursor: 'pointer',

    '&:hover': {
      textDecoration: 'underline'
    }
  }
})

export default function TagLink ({ children, ...rest }: React.ComponentProps<typeof Tag>) {
  const classes = useStyles()
  return (
    <Tag className={classes.tag} {...rest}> {children}</Tag>
  )
}
