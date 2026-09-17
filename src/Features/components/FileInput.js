import React, { useRef, useState } from 'react'
import { Body2, SecondaryButton } from '@appboxo/ui-kit'
import FeatureCard, { StatusLine } from '../../components/FeatureCard'

const FileInput = () => {
  const [filesNames, setFilesNames] = useState([])

  const inputEl = useRef(null)

  const openInput = () => {
    inputEl.current.click()
  }

  const onChangeFile = (event) => {
    const files = event.target.files
    const names = Object.keys(files).map(key => files[key].name)
    setFilesNames(names)
  }

  return (
    <FeatureCard title="File">
      <input type='file' onChange={onChangeFile} ref={inputEl} multiple hidden />
      <SecondaryButton text="Open Files" onClick={openInput} />
      <StatusLine label="Response:">
        {!!filesNames.length && filesNames.map((name, i) => (
          <Body2 key={i} color="var(--tertiary-color)">{name}</Body2>
        ))}
      </StatusLine>
    </FeatureCard>
  )
}

export default FileInput
