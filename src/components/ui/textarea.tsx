import React from 'react'
export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} style={{ width:'100%', padding:'10px', borderRadius:10, background:'#0b0f14', color:'#e5e7eb', border:'1px solid #1f2937' }} />
}
