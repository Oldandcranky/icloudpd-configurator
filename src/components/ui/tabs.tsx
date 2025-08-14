import React, { useState } from 'react'
export function Tabs({ defaultValue, children, className }: { defaultValue: string; children: React.ReactNode; className?: string }) {
  const [value, setValue] = useState(defaultValue)
  return <div className={className as any}>{React.Children.map(children, (child: any) => React.cloneElement(child, { value, setValue }))}</div>
}
export function TabsList({ children }: any) {
  return <div style={{ display:'grid', gridAutoFlow:'column', gap:8, marginBottom:8 }}>{children}</div>
}
export function TabsTrigger({ children, value: current, setValue, value }: any) {
  const active = current === value
  return <button onClick={() => setValue(value)} style={{ padding:'8px 12px', borderRadius:10, border:'1px solid #1f2937', background: active ? '#1f2937' : 'transparent', color:'#e5e7eb' }}>{children}</button>
}
export function TabsContent({ children, value: current, value }: any) {
  if (current !== value) return null
  return <div style={{ marginTop:8 }}>{children}</div>
}
