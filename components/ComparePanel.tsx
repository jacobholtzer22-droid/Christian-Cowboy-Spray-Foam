'use client'

import { useRef, useState, type KeyboardEvent } from 'react'

export interface PanelTab {
  key: string
  name: string
  description: string
}

/**
 * The comparison tab picker: real buttons with aria-pressed, one tab stop for
 * the group, and arrow, Home, and End keys within it. The parent owns the
 * selection and the polite live region.
 */
export default function ComparePanel({
  tabs,
  current,
  selected,
  onSelect,
  hint,
  className = '',
}: {
  tabs: PanelTab[]
  /** The tab on screen, shown in the "Showing" row. */
  current: PanelTab
  selected: string
  onSelect: (key: string) => void
  hint?: string | null
  className?: string
}) {
  const [focusKey, setFocusKey] = useState(selected)
  const buttons = useRef<(HTMLButtonElement | null)[]>([])

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = tabs.findIndex((t) => t.key === focusKey)
    const last = tabs.length - 1
    let next: number | null = null
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = index >= last ? 0 : index + 1
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = index <= 0 ? last : index - 1
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = last
    const target = next === null ? undefined : tabs[next]
    if (next === null || !target) return
    event.preventDefault()
    setFocusKey(target.key)
    buttons.current[next]?.focus()
  }

  return (
    <div className={className}>
      <div className="flex items-center gap-3 border-b border-line pb-3">
        <span aria-hidden="true" className="h-8 w-8 shrink-0 rounded-site border border-line bg-accent" />
        <div>
          <p className="text-step--1 text-muted">Showing</p>
          <p className="font-heading text-step-0 font-semibold text-ink">{current.name}</p>
        </div>
      </div>
      <div
        role="group"
        aria-label="Insulation types"
        onKeyDown={onKeyDown}
        className="mt-3 grid grid-cols-1 gap-2"
      >
        {tabs.map((tab, i) => {
          const pressed = tab.key === selected
          return (
            <button
              key={tab.key}
              ref={(el) => {
                buttons.current[i] = el
              }}
              type="button"
              aria-pressed={pressed}
              aria-label={tab.name}
              aria-describedby={`tab-${tab.key}-description`}
              tabIndex={tab.key === focusKey ? 0 : -1}
              onFocus={() => setFocusKey(tab.key)}
              onClick={() => onSelect(tab.key)}
              className={`flex min-h-12 items-center gap-3 rounded-site border px-3 py-2 text-left transition-[background-color,border-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface active:bg-surface-raised ${pressed ? 'border-accent bg-surface-raised' : 'border-line bg-bg hover:border-muted hover:bg-surface-raised'}`}
            >
              <span
                aria-hidden="true"
                className={`h-5 w-5 shrink-0 rounded-md border ${pressed ? 'border-accent bg-accent' : 'border-line'}`}
              />
              <span className="min-w-0 flex-1">
                <span className="block text-step--1 font-semibold text-ink">{tab.name}</span>
                <span id={`tab-${tab.key}-description`} className="block truncate text-step--1 text-muted">
                  {tab.description}
                </span>
              </span>
              <span aria-hidden="true" className={`text-accent-ink ${pressed ? 'opacity-100' : 'opacity-0'}`}>
                &#10003;
              </span>
            </button>
          )
        })}
      </div>
      {hint && (
        <p className="mt-3 hidden text-center text-step--1 uppercase tracking-[0.16em] text-muted lg:block">{hint}</p>
      )}
    </div>
  )
}
