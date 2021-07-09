import type { KeyboardEvent, FC, EventHandler } from 'react'
import React, { useState, useEffect, useMemo, createRef } from 'react'

import { v4 as uuid } from 'uuid'

import { Button } from '../button/Button'
import { KEYS } from '../../util/keys'
import cn from 'classnames'

export interface TabsProps {
  className?: string
  /**
   * Should tab buttons take up the full width of the container
   */
  fullWidth?: boolean
  /**
   * A short description for the Tabs. It gets passed to `aria-label`
   */
  label: string
  /**
   * An array of each tab name
   */
  tabs: string[]
  /**
   * Panel to render for corresponding active tab.
   */
  children: Array<React.ReactNode>
}

// Add or subtract depending on key pressed
const DIRECTION = {
  [KEYS.left]: -1, // retreat
  [KEYS.right]: 1, // advance
}

export const Tabs: FC<TabsProps> = ({
  children,
  className,
  fullWidth = false,
  label,
  tabs,
}) => {
  const [activeTab, setActiveTab] = useState(0)
  const [focusTab, setFocusTab] = useState<number | null>(null)

  // create id for panels
  const prefixId = useMemo(() => uuid(), [])
  const ids = tabs.map((tabName, index) => `${prefixId}-${tabName}-${index}`)

  // create refs for all the tabs
  const refs = useMemo(
    () =>
      new Array(tabs.length).fill('').map(() => createRef<HTMLButtonElement>()),
    [tabs]
  )

  useEffect(() => {
    if (focusTab === null) return

    const ref = refs[focusTab]
    if (ref?.current) {
      ref.current.focus()
    }
  }, [refs, focusTab])

  const handleClick = (index: number) => () => {
    setActiveTab(index)
  }

  const handleKeydown: EventHandler<KeyboardEvent<HTMLButtonElement>> = (
    event
  ) => {
    const { key } = event

    switch (key) {
      case KEYS.end:
        event.preventDefault()
        // Activate last tab
        setActiveTab(tabs.length - 1)
        break
      case KEYS.home:
        event.preventDefault()
        // Activiate first tab
        setActiveTab(0)
        break
      case KEYS.up:
      case KEYS.down:
        // Up and down are in keydown
        // because we need to prevent page scroll
        // Do nothing
        break
    }
  }

  const handleKeyup =
    (index: number): EventHandler<KeyboardEvent<HTMLButtonElement>> =>
    (event) => {
      const { key } = event

      switch (key) {
        case KEYS.left:
        case KEYS.right:
          event.preventDefault()
          // Either focus the next, previous, first, or last tab, depending on key pressed
          if (DIRECTION[key]) {
            // Modulus allows the end to circle to the beginning
            const next = (index + DIRECTION[key]) % tabs.length
            // Circle from beginning to end
            if (next === -1) {
              // focus the last item
              setFocusTab(tabs.length - 1)
            } else {
              setFocusTab(next)
            }
          }
          break
        case KEYS.enter:
        case KEYS.space:
          // Activate current tab or tab with focus
          setActiveTab(index)
          break
      }
    }

  if (!tabs || !tabs.length) {
    return null
  }

  const renderTabs = tabs.map((tab, index) => {
    const isSelected = activeTab === index
    const addAriaProps = isSelected ? {} : { tabIndex: -1 }
    const id = ids[index]
    return (
      <Button
        variant="ghost"
        className={cn(
          'border-0 border-b border-current hover:!text-green-500',
          isSelected ? '!text-green-500' : '!text-gray-200',
          fullWidth && 'flex-1'
        )}
        aria-controls={`panel-${id}`}
        aria-selected={isSelected}
        fullWidth={fullWidth}
        id={`button-${id}`}
        key={`button-${id}`}
        onClick={handleClick(index)}
        onKeyDown={handleKeydown}
        onKeyUp={handleKeyup(index)}
        ref={refs[index]}
        role="tab"
        {...addAriaProps}
      >
        {tab}
      </Button>
    )
  })

  const renderPanels = React.Children.map(children, (panel, index) => {
    const isVisible = activeTab === index
    // Only render visible panels for better performance
    const renderPanel = isVisible ? panel : null
    // Keep the wrapper in the DOM so the aria attributes between
    // button and panel are always linked
    const id = ids[index]
    return (
      <div
        className={cn('overflow-auto', !isVisible && 'hidden')}
        key={`panel-${id}`}
        aria-hidden={!isVisible}
        aria-labelledby={`button-${id}`}
        id={`panel-${id}`}
        role="tabpanel"
        tabIndex={0}
      >
        {renderPanel}
      </div>
    )
  })

  return (
    <div className={className}>
      <div
        className={cn('flex', fullWidth && 'space-x-3')}
        role="tablist"
        aria-label={label}
        onBlur={() => {
          setFocusTab(null)
        }}
      >
        {renderTabs}
      </div>
      {renderPanels}
    </div>
  )
}

export default Tabs