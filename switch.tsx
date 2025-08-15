import React from 'react'
type Props = { checked: boolean; onCheckedChange: (v: boolean) => void }
export function Switch({ checked, onCheckedChange }: Props) {
  return (
    <label style={{ display:'inline-flex', alignItems:'center', gap:8, cursor:'pointer' }}>
      <input type="checkbox" checked={checked} onChange={e => onCheckedChange(e.target.checked)} style={{ display:'none' }} />
      <span style={{ width:40, height:22, borderRadius:999, background: checked ? '#2563eb' : '#334155', position:'relative', transition:'background .2s' }}>
        <span style={{ position:'absolute', top:3, left: checked ? 20 : 3, width:16, height:16, borderRadius:999, background:'#e5e7eb', transition:'left .2s' }} />
      </span>
    </label>
  )
}
