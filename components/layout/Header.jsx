import { useState } from 'react'
import { Select, Checkbox } from '../common'
import Image from 'next/image'

const Header = ({ title }) => {
  const [state, setState] = useState({ lang: 'ENG' })
  return (
    <header className="header">
      <div className="header-left">
        <div className="header-left-top">
          <div>
            <div className="header-left__label">Theme settings:</div>
            <Select value="Night" options={['Night']} />
          </div>
          <div className="header-left-checkboxes">
            <Checkbox
              value={state.lang === 'ENG'}
              label="ENG"
              onChange={() => setState({ lang: 'ENG' })}
            />
            {/* <Checkbox
              value={state.lang === 'ESP'}
              label="ESP"
              onChange={() => setState({ lang: 'ESP' })}
            />
            <Checkbox
              value={state.lang === 'GER'}
              label="GER"
              onChange={() => setState({ lang: 'GER' })}
            />
            <Checkbox
              value={state.lang === 'THA'}
              label="THA"
              onChange={() => setState({ lang: 'THA' })}
            /> */}
          </div>
        </div>
        <div className="header-left__title">{title || 'TITLE'}</div>
      </div>

      {/* <img className="header__logo" src="/logo-dark.svg" alt="logo" /> */}
      <Image src="/logo.webp" alt="logo" width={364} height={218} unoptimized />
    </header>
  )
}

export default Header
