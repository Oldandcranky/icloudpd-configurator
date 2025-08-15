import React from 'react'
export function Label({ children, style }: { children: React.ReactNode, style?: React.CSSProperties }) {
  return <label style={{ fontSize:12, color:'#94a3b8', ...style }}>{children}</label>
}
