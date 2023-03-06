import React from 'react'

export default function Box ({ children, style, ...props } : React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      style={{
        borderRadius: 6,
        boxShadow: '0 0 6px rgba(0, 0, 0, 0.2)',
        border: '1px solid #e8e8e8',
        marginBottom: 6,
        padding: 8,
        ...style
      }}
      {...props}
    >{children}</div>
  )
}
