import React from 'react'
import { Card, Flex, Footnote1, Headline } from '@appboxo/ui-kit'

import './FeatureCard.scss'

const SUCCESS = ['success', 'expanded', 'enabled', 'completed', 'signed in', 'logged in', 'restored', 'true']
const DANGER = ['failed', 'error', 'rejected', 'collapsed', 'disabled', 'false']
const INFO = ['sent', 'refreshing']
const WARNING = ['idle', 'unknown', 'not logged in']

const inferTone = (value) => {
  const text = String(value).trim().toLowerCase()
  if (SUCCESS.includes(text)) return 'success'
  if (DANGER.includes(text)) return 'danger'
  if (INFO.includes(text)) return 'info'
  if (WARNING.includes(text)) return 'warning'
  return 'neutral'
}

const isCompactStatus = (value) => {
  const text = String(value).trim()
  return text.length > 0 && text.length <= 28 && !/[{}[\]]/.test(text)
}

export const StatusBadge = ({ tone = 'neutral', children }) => (
  <span className={`status-badge status-badge--${tone}`}>{children}</span>
)

export const StatusLine = ({
  label,
  value,
  tone,
  placeholder = 'Waiting',
  children
}) => {
  const hasValue = value != null && value !== ''
  const hasChildren = React.Children.toArray(children).some(Boolean)
  const compact = hasValue && isCompactStatus(value)
  const badgeTone = tone || (compact ? inferTone(value) : 'data')

  return (
    <Flex className="status-line" gap={8} align="center">
      {label && <Footnote1>{label}</Footnote1>}
      {hasValue && (
        <StatusBadge tone={badgeTone}>{value}</StatusBadge>
      )}
      {!hasValue && !hasChildren && (
        <StatusBadge tone="empty">{placeholder}</StatusBadge>
      )}
      {hasChildren ? children : null}
    </Flex>
  )
}

const FeatureCard = ({ title, children }) => (
  <Card>
    <Flex vertical gap={16}>
      {title && <Headline weight="semibold">{title}</Headline>}
      {children}
    </Flex>
  </Card>
)

export default FeatureCard
