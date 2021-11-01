import React from 'react'
import type { ComponentProps } from 'react'
import type { StoryObj } from '@storybook/react'
import type { TagVariant, TagColor } from './Tag'
import { Tag, tagColors } from './Tag'
import { Section } from '../../util/story-section'

type Story = StoryObj<ComponentProps<typeof Tag>>

export default {
  component: Tag,
} as Story

export const All = () => {
  return (
    <main className="flex flex-wrap">
      <Section title="Normal">
        <div className="grid grid-cols-2 grid-flow-col w-max gap-y-1 gap-x-6">
          {Object.entries(tagColors).flatMap(([variant, colors], index) =>
            Object.keys(colors).map((color) => (
              <span
                key={`${variant}-${color}`}
                style={{ gridColumn: index + 1 }}
              >
                <Tag variant={variant as TagVariant} color={color as TagColor}>
                  {variant} {color}
                </Tag>
              </span>
            ))
          )}
        </div>
      </Section>
      <Section title="Narrow">
        <div className="grid grid-cols-2 grid-flow-col w-max gap-x-6">
          {Object.entries(tagColors).flatMap(([variant, colors], index) =>
            Object.keys(colors).map((color) => (
              <span
                key={`${variant}-${color}`}
                style={{ gridColumn: index + 1 }}
              >
                <Tag
                  narrow
                  variant={variant as TagVariant}
                  color={color as TagColor}
                >
                  {variant} {color}
                </Tag>
              </span>
            ))
          )}
        </div>
      </Section>
      <Section title="Closable">
        <div className="grid grid-cols-2 grid-flow-col w-max gap-y-1 gap-x-6">
          {Object.entries(tagColors).flatMap(([variant, colors], index) =>
            Object.keys(colors).map((color) => (
              <span
                key={`${variant}-${color}`}
                style={{ gridColumn: index + 1 }}
              >
                <Tag
                  variant={variant as TagVariant}
                  color={color as TagColor}
                  onClose={() => {}}
                >
                  {variant} {color}
                </Tag>
              </span>
            ))
          )}
        </div>
      </Section>
      <Section title="Closable Narrow">
        <div className="grid grid-cols-2 grid-flow-col w-max gap-x-6">
          {Object.entries(tagColors).flatMap(([variant, colors], index) =>
            Object.keys(colors).map((color) => (
              <span
                key={`${variant}-${color}`}
                style={{ gridColumn: index + 1 }}
              >
                <Tag
                  narrow
                  variant={variant as TagVariant}
                  color={color as TagColor}
                  onClose={() => {}}
                >
                  {variant} {color}
                </Tag>
              </span>
            ))
          )}
        </div>
      </Section>
    </main>
  )
}

export const Default: Story = {
  args: {},
}