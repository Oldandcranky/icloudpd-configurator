import React from 'react'
export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} style={{ width:'100%', padding:'8px 10px', borderRadius:10, background:'#0b0f14', color:'#e5e7eb', border:'1px solid #1f2937' }} />
}
