import { useState } from 'react'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Select from '../components/common/Select'
import Checkbox from '../components/common/Checkbox'

export default function Test() {
  const [state, setState] = useState({ input: '', select: '', check: false })
  const onInputChange = (v) => setState({ ...state, input: v })
  const onSelectChange = (v) => setState({ ...state, select: v })
  const onCheckChange = (v) => setState({ ...state, check: v })
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px 32px',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', gap: '32px 32px', alignItems: 'center' }}>
        <Button>Click</Button>
        <Button type="success">Click</Button>
        <Button type="text">Click</Button>
      </div>
      <div style={{ display: 'flex', gap: '32px 32px', alignItems: 'center' }}>
        <Input
          value={state.input}
          onChange={onInputChange}
          placeholder="Placeholder"
        />

        <Input
          value={state.input}
          onChange={onInputChange}
          placeholder="Placeholder"
          error="error"
        />

        <Input
          value={state.input}
          onChange={onInputChange}
          placeholder="Placeholder"
          hint="hint"
        />
      </div>
      <div style={{ display: 'flex', gap: '32px 32px', alignItems: 'center' }}>
        <Select
          value={state.select}
          onChange={onSelectChange}
          options={[1, 2, 3]}
          renderOption={(option) =>
            option ? option + ' option' : '--- select option ---'
          }
        />
      </div>
      <div style={{ display: 'flex', gap: '32px 32px', alignItems: 'center' }}>
        <Checkbox value={state.check} onChange={onCheckChange} label="Label" />
      </div>
    </div>
  )
}
