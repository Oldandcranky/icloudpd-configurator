import React from 'react'
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'secondary' | 'outline' | 'default' }
export function Button({ variant='default', style, ...rest }: Props) {
  const base = { padding:'8px 12px', borderRadius:10, border:'1px solid #1f2937', background:'#1f2937', color:'#e5e7eb', cursor:'pointer' }
  const secondary = { background:'#111827' }
  const outline = { background:'transparent' }
  const s = variant==='secondary' ? { ...base, ...secondary, ...style } : variant==='outline' ? { ...base, ...outline, ...style } : { ...base, ...style }
  return <button style={s} {...rest} />
}
