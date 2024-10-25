export const SETTINGS_LOCALE_STORAGE_KEY = 'sra_2.4_conf'
export const TOKEN_NAME = 'sra_access_token'
export const REFRESH_TOKEN_NAME = 'sra_refresh_token'
export const USER_STORE_NAME = 'sra__user'

export const BLOCK_SIZE = 4800

export const SIZES = {
  small: {
    title: 'Small',
    key: 'small',
    fontSize: '0.8rem',
    page: 35,
    row: 80,
  },
  medium: {
    title: 'Medium',
    key: 'medium',
    fontSize: '1rem',
    page: 30,
    row: 55,
  },
  large: {
    title: 'Large',
    key: 'large',
    fontSize: '1.25rem',
    page: 25,
    row: 45,
  },
  extraLarge: {
    title: 'Extra Large',
    key: 'extraLarge',
    fontSize: '1.45rem',
    page: 20,
    row: 40,
  },
}

export const COLORS = {
  dark: '#000000',
  gray: '#2A2B43',
  yellow: '#FCB900',
  'light-green': '#AFFF83',
  green: '#00D084',
  'light-blue': '#8ED1FC',
  blue: '#0693E3',
  grey: '#ABB8C3',
  white: '#FFFFFF',
  pink: '#F78DA7',
  violet: '#AE1CE1',
  red: '#EB1D36',
  orange: '#FFA500',
}

export const SPEED_LEVELS = {
  1: 700,
  2: 900,
  3: 800,
  4: 700,
  5: 600,
  6: 500,
  7: 125,
  8: 100,
  9: 70,
  10: 20,
  11: 25,
  12: 10,
}

export const DEFAULT_SETTINGS = {
  speed: 1,
  highlightColor: COLORS.violet,
  textColor: COLORS.white,
  pageColor: COLORS.gray,
  rotate: false,
  highlightTypeS: '',
  highlightTypeV: '1',
  count: 1,
  type: 'book',
  fontType: SIZES['small'],
  book: '',
  fullscreen: false,
  words: null,
}
