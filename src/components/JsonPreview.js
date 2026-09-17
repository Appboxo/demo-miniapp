import React from 'react'
import { StatusLine } from './FeatureCard'

import './JsonPreview.scss'

const prettyKey = (key) => (
  String(key)
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
)

const formatValue = (value) => {
  if (value === null || value === undefined) {
    return '—'
  }
  if (typeof value === 'boolean' || typeof value === 'number') {
    return String(value)
  }
  if (typeof value === 'object') {
    return JSON.stringify(value)
  }
  return String(value)
}

export const formatJson = (data) => {
  if (data == null || data === '') {
    return ''
  }
  if (typeof data === 'string') {
    try {
      return JSON.stringify(JSON.parse(data), null, 2)
    } catch (error) {
      return data
    }
  }
  try {
    return JSON.stringify(data, null, 2)
  } catch (error) {
    return String(data)
  }
}

const parseData = (data) => {
  if (data == null || data === '') {
    return null
  }
  if (typeof data === 'string') {
    try {
      return JSON.parse(data)
    } catch (error) {
      return data
    }
  }
  return data
}

const JsonPreview = ({ data }) => {
  const parsed = parseData(data)

  if (parsed == null) {
    return null
  }

  const fields = parsed && typeof parsed === 'object' && !Array.isArray(parsed)
    ? Object.entries(parsed)
    : []

  return (
    <div className="json-preview">
      {fields.length > 0 && (
        <div className="json-preview__fields">
          {fields.map(([key, value]) => (
            <StatusLine
              key={key}
              label={`${prettyKey(key)}:`}
              value={formatValue(value)}
            />
          ))}
        </div>
      )}
      <div className="json-preview__panel">
        <div className="json-preview__label">JSON</div>
        <pre className="json-preview__json">
          {formatJson(parsed)}
        </pre>
      </div>
    </div>
  )
}

export default JsonPreview
