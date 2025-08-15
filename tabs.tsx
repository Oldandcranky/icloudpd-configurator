import React, { isValidElement, useState } from 'react'

type TabsProps = { defaultValue: string; children: React.ReactNode; className?: string }
type WithState = { current?: string; setCurrent?: (v: string) => void }

export function Tabs({ defaultValue, children, className }: TabsProps) {
  const [current, setCurrent] = useState(defaultValue)
  return (
    <div className={className as any}>
      {React.Children.map(children, (child) => {
        if (!isValidElement(child)) return child
        // Pass current + setCurrent to all direct children
        return React.cloneElement(child as React.ReactElement<any>, { current, setCurrent } as WithState)
      })}
    </div>
  )
}

export function TabsList({ children, current, setCurrent }: any) {
  return (
    <div style={{ display: 'grid', gridAutoFlow: 'column', gap: 8, marginBottom: 8 }}>
      {React.Children.map(children, (child: any) =>
        React.isValidElement(child) ? React.cloneElement(child, { current, setCurrent }) : child
      )}
    </div>
  )
}

export function TabsTrigger({ children, value, current, setCurrent }: any) {
  const active = current === value
  return (
    <button
      onClick={() => setCurrent(value)}
      style={{
        padding: '8px 12px',
        borderRadius: 10,
        border: '1px solid #1f2937',
        background: active ? '#1f2937' : 'transparent',
        color: '#e5e7eb',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  )
}

export function TabsContent({ children, value, current }: any) {
  if (current !== value) return null
  return <div style={{ marginTop: 8 }}>{children}</div>
}