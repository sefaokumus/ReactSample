import React from 'react'

import { createUseStyles } from 'react-jss'

import type { ResizeCallbackData } from 'react-resizable'
import { Resizable }               from 'react-resizable'

const useStyles = createUseStyles({
  resizableHandle: {
    position: 'absolute',
    right: '-10px',
    bottom: 0,
    zIndex: 1,
    width: 20,
    height: '100%',
    cursor: 'col-resize'
  }
})

const ResizableTitle = (
  props: React.HTMLAttributes<any> & {
    onResize: (
      e: React.SyntheticEvent<Element>,
      data: ResizeCallbackData
    ) => void;
    width: number;
  }
) => {
  const { onResize, width, ...restProps } = props
  const classes                           = useStyles()

  return (
    <Resizable
      width={width || 75}
      height={0}
      handle={
        <span
          className={classes.resizableHandle}
          onClick={(e) => {
            e.stopPropagation()

            console.log('click')
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: true }}
    >
      <th {...restProps} />
    </Resizable>
  )
}

export default ResizableTitle
