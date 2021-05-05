import { color, marginY, shadow, spacing } from '@oxide/css-helpers'
import type { ShadowVariant } from '@oxide/css-helpers'
import React from 'react'
import styled from 'styled-components'
import Text from '../text/Text'

const Wrapper = styled.div`
  padding: ${spacing(4)};
  background-color: ${color('gray700')};
`

const ShadowBox = styled.div<{ shadow?: ShadowVariant }>`
  height: 100px;
  width: 100%;

  border: 1px solid ${color('gray600')};
  border-radius: 1em;

  padding: ${spacing(4)};
  ${marginY(4)};

  ${({ shadow: value }) => shadow(value)};
`

const shadowVariants = [
  'sm',
  undefined,
  'md',
  'lg',
  'xl',
  '2xl',
  'inner',
] as const

export const AllShadows = () => (
  <Wrapper>
    {shadowVariants.map((v) => (
      <React.Fragment key={v || 'base'}>
        <Text size="lg" color="gray50" font="sans">
          {v || 'base'}
        </Text>
        <br />
        <Text size="base" color="gray100" font="mono">
          {`\${shadow(${(v && `'${v}'`) || ''})}`}
        </Text>
        <ShadowBox key={v} shadow={v}></ShadowBox>
      </React.Fragment>
    ))}
  </Wrapper>
)