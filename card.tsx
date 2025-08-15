import React from 'react'
export function Card({ children }: { children: React.ReactNode }) {
  return <div style={{ background:'#12161b', border:'1px solid #1f2937', borderRadius:12, boxShadow:'0 1px 0 rgba(255,255,255,0.02) inset' }}>{children}</div>
}
export function CardHeader({ children }: { children: React.ReactNode }) {
  return <div style={{ padding:'14px 16px', borderBottom:'1px solid #1f2937' }}>{children}</div>
}
export function CardTitle({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize:16, fontWeight:700 }}>{children}</div>
}
export function CardContent({ children }: { children: React.ReactNode }) {
  return <div style={{ padding:'16px' }}>{children}</div>
}
