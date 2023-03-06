import React from 'react'

import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  dndRow: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    userSelect: 'none',
    minHeight: 28,
    fontSize: 14,
    marginLeft: 8,
    marginRight: 6,
    minWidth: 0,
    flex: '1 1 auto',
    color: 'rgba(0,0,0, 70%)',
    fill: 'rgba(0,0,0, 70%)',
    paddingLeft: 8,
    paddingRight: 0,
    borderRadius: 8,
    '&:hover': {
      color: 'rgba(0, 0, 0, 0.85)',
      background: '#d4d4d4',
      borderColor: 'transparent'
    }
  },

  dndColLeft: {
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  dndColRight: {
    marginLeft: 'auto',
    marginRight: 12,
    minWidth: 0,
    flexShrink: 0
  },
  dndGrabber: {
    cursor: 'grab',
    marginRight: 8
  }

})
interface DynamicColumnManagerListRowProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  left?: React.ReactNode
  leftProps?: React.HTMLAttributes<HTMLDivElement>
  right?: React.ReactNode
  rightProps?: React.HTMLAttributes<HTMLDivElement>
  content: React.ReactNode
  contentProps?: React.HTMLAttributes<HTMLDivElement>
}
const DynamicColumnManagerListRow = ({ left, right, content, leftProps, rightProps, contentProps, onClick, ...rest  }: DynamicColumnManagerListRowProps) => {
  const classes = useStyles()

  return (
    <div className={classes.dndRow} onClick={onClick} {...rest}>
      <div className={classes.dndColLeft} {...contentProps}>
        {left && (
          <div className={classes.dndGrabber} {...leftProps} >
            {left}
          </div>)
        }
        {content}
      </div>
      {
        right && (
          <div className={classes.dndColRight} {...rightProps}>
            {right}
          </div>
        )
      }

    </div>
  )
}
export default DynamicColumnManagerListRow
