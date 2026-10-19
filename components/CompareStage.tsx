'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import ComparePanel from './ComparePanel'

export interface CompareTab {
  key: string
  name: string
  description: string
  body: string
  bestFor: string[]
  /** Null when no photograph exists for this type: the tab renders text only. */
  image: { src: string; srcSet: string; width: number; height: number; alt: string } | null
}

/**
 * Compare Insulation Types. One photograph per tab where one exists, stacked
 * and cross-faded; a tab with no photograph shows its text and the stage keeps
 * the last frame rather than flashing an empty box.
 *
 * Structure carried over from the scene switcher this was repurposed from:
 * - Tab buttons are real buttons with aria-pressed, one tab stop, and arrow
 *   keys within the group. A polite live region announces the change.
 * - Only the photograph on screen is exposed to assistive tech; the rest carry
 *   aria-hidden.
 * - Every other photograph is fetched only when a visitor picks that tab, and
 *   its <img> is not in the document until then. A picked tab appears once its
 *   photo settles, loaded or failed, so the frame is never blank and a failed
 *   photo never locks the control. The 0.6s cross-fade is an instant cut under
 *   reduced motion (app/globals.css).
 */
export default function CompareStage({
  tabs,
  defaultTab,
  hint,
  children,
}: {
  tabs: CompareTab[]
  defaultTab: string
  hint?: string | null
  children: ReactNode
}) {
  const [selected, setSelected] = useState(defaultTab)
  const [requested, setRequested] = useState<ReadonlySet<string>>(() => new Set([defaultTab]))
  const [announcement, setAnnouncement] = useState('')
  const [shown, setShown] = useState(defaultTab)
  const [settled, setSettled] = useState<ReadonlySet<string>>(() => new Set())
  const photos = useRef<Record<string, HTMLImageElement | null>>({})

  const withPhotos = tabs.filter((t) => t.image)
  const nameOf = (key: string) => tabs.find((t) => t.key === key)?.name ?? key
  const settle = (key: string) => setSettled((prev) => (prev.has(key) ? prev : new Set(prev).add(key)))
  const request = (key: string) => setRequested((prev) => (prev.has(key) ? prev : new Set(prev).add(key)))

  function select(key: string) {
    if (key === selected) return
    request(key)
    setSelected(key)
  }

  // A photo that settled before hydration never fires onLoad or onError in React.
  useEffect(() => {
    for (const [key, img] of Object.entries(photos.current)) {
      if (img?.complete && img.currentSrc) settle(key)
    }
  }, [tabs])

  // A tab with no photograph has nothing to wait for.
  useEffect(() => {
    const target = tabs.find((t) => t.key === selected)
    const ready = !target?.image || settled.has(selected)
    if (selected !== shown && ready) {
      setShown(selected)
      setAnnouncement(`Showing ${nameOf(selected)}`)
    }
    if (selected !== shown && !ready) setAnnouncement(`Loading ${nameOf(selected)}`)
    // nameOf only reads tabs, which is already a dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, shown, settled, tabs])

  function onPhotoSettled(key: string) {
    return () => settle(key)
  }

  const current = tabs.find((t) => t.key === shown) ?? tabs[0]
  if (!current) return null

  return (
    <div className="relative lg:aspect-[16/9] lg:max-h-[58.75rem] lg:w-full">
      <div className="relative z-20 px-4 pb-12 pt-16 lg:absolute lg:left-[max(2rem,5vw)] lg:top-[8%] lg:max-w-xl lg:p-0">
        {children}
        <div className="mt-6 max-w-measure">
          <p className="text-step-1 text-ink-soft">{current.body}</p>
          <p className="mt-5 text-step--1 font-semibold uppercase tracking-[0.16em] text-muted">Best for</p>
          <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-step-0 text-ink-soft">
            {current.bestFor.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {withPhotos.length > 0 && (
        <div className="relative aspect-[4/3] overflow-hidden bg-bg sm:aspect-[16/9] lg:absolute lg:inset-0 lg:aspect-auto">
          {withPhotos.map((tab) => {
            const active = tab.key === shown
            const img = tab.image
            // Not requested yet: no element at all, so the document never
            // carries a placeholder <img> that would need its own alt text.
            if (!img || !requested.has(tab.key)) return null
            return (
              <img
                key={tab.key}
                ref={(el) => {
                  photos.current[tab.key] = el
                }}
                src={img.src}
                srcSet={img.srcSet}
                sizes="100vw"
                width={img.width}
                height={img.height}
                alt={img.alt}
                aria-hidden={active ? undefined : true}
                decoding="async"
                // The hero above is the LCP element, so these never compete with it.
                loading="lazy"
                {...{ fetchpriority: 'low' }}
                data-tab={tab.key}
                onLoad={onPhotoSettled(tab.key)}
                onError={onPhotoSettled(tab.key)}
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[600ms] ease-out"
                style={{ opacity: active ? 1 : 0 }}
              />
            )
          })}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden lg:block"
            style={{ background: 'var(--stage-scrim)' }}
          />
        </div>
      )}

      <ComparePanel
        tabs={tabs}
        current={current}
        selected={selected}
        onSelect={select}
        hint={hint}
        className="relative z-20 px-4 py-6 lg:absolute lg:right-[6%] lg:top-1/2 lg:w-[17rem] lg:-translate-y-1/2 lg:rounded-panel lg:border lg:border-line lg:bg-surface lg:px-4 lg:py-5 lg:shadow-site"
      />

      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </div>
  )
}
