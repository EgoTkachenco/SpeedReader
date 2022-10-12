import { COLORS } from './constants'

const DEFAULT_COLORS = {
  highlightColor: COLORS.green,
  textColor: COLORS.dark,
  pageColor: COLORS.white,
}

export const PRESETS = [
  {
    name: 'Standart',
    exercises: [
      {
        name: 'Exercise 1',
        data: [
          {
            action: {
              book: '5',
              speed: 3,
              rotate: false,
              count: 1,
              type: 'book',
              highlightTypeS: '1',
              fullscreen: false,
              ...DEFAULT_COLORS,
            },
            duration: 8000,
          },
          {
            action: {
              speed: 5,
            },
            duration: 8000,
          },
          {
            action: {
              speed: 6,
              rotate: true,
              highlightTypeS: '2',
            },
            duration: 8000,
          },
          {
            action: {
              speed: 5,
              rotate: false,
            },
            duration: 8000,
          },
          {
            action: {
              highlightColor: COLORS.pink,
              textColor: COLORS.blue,
              pageColor: COLORS.yellow,
              rotate: true,
              speed: 8,
              highlightTypeS: '1',
            },
            duration: 8000,
          },
          {
            action: {
              ...DEFAULT_COLORS,
              rotate: false,
              speed: 7,
              highlightTypeV: '1',
            },
            duration: 8000,
          },
          {
            action: {
              speed: 9,
              highlightTypeV: '2',
              highlightColor: COLORS.pink,
              textColor: COLORS.blue,
              pageColor: COLORS.yellow,
              rotate: true,
            },
            duration: 12000,
          },
          {
            action: {
              speed: 8,
              rotate: false,
            },
            duration: 8000,
          },

          {
            action: {
              speed: 7,
              ...DEFAULT_COLORS,
            },
            duration: 20000,
          },
          {
            action: {
              highlightTypeV: '1',
              speed: 6,
            },
            duration: 12000,
          },
        ],
      },
      {
        name: 'Exercise 2',
        data: [
          {
            action: {
              book: '6',
              speed: 2,
              rotate: false,
              count: 1,
              type: 'zoom',
              highlightTypeS: '1',
              fullscreen: false,
              ...DEFAULT_COLORS,
            },
            duration: 8000,
          },
          {
            action: {
              speed: 5,
              rotate: true,
            },
            duration: 8000,
          },
          {
            action: {
              speed: 5,
              rotate: false,
              highlightTypeS: '2',
              textColor: COLORS.yellow,
              pageColor: COLORS.dark,
            },
            duration: 8000,
          },
          {
            action: {
              speed: 6,
              rotate: true,
              ...DEFAULT_COLORS,
            },
            duration: 8000,
          },
          {
            action: {
              rotate: false,
              highlightTypeS: '1',
              textColor: COLORS.white,
              pageColor: COLORS.red,
            },
            duration: 8000,
          },
          {
            action: {
              speed: 8,
              rotate: true,
              highlightTypeS: '2',
              textColor: COLORS.blue,
              pageColor: COLORS.yellow,
            },
            duration: 8000,
          },
          {
            action: {
              speed: 9,
              rotate: false,
              ...DEFAULT_COLORS,
            },
            duration: 8000,
          },
          {
            action: {
              speed: 6,
              rotate: true,
              highlightTypeS: '4',
              textColor: COLORS.red,
              pageColor: COLORS.dark,
            },
            duration: 8000,
          },
          {
            action: {
              speed: 9,
              rotate: false,
              highlightTypeS: '2',
              textColor: COLORS.red,
              pageColor: COLORS.white,
            },
            duration: 12000,
          },
          {
            action: {
              speed: 8,
              rotate: true,
              highlightTypeS: '2',
              ...DEFAULT_COLORS,
            },
            duration: 10000,
          },
          {
            action: {
              speed: 7,
              rotate: false,
              highlightTypeS: '2',
              textColor: COLORS.blue,
              pageColor: COLORS.yellow,
              highlightColor: COLORS.pink,
            },
            duration: 10000,
          },
          {
            action: {
              speed: 10,
              rotate: true,
              highlightTypeS: '4',
              ...DEFAULT_COLORS,
            },
            duration: 10000,
          },
          {
            action: {
              speed: 5,
              highlightTypeS: '2',
              rotate: false,
            },
            duration: 20000,
          },
        ],
      },
      {
        name: 'Exercise 3',
        data: [
          {
            action: {
              book: '7',
              speed: 2,
              rotate: false,
              count: 1,
              type: 'rolling',
              highlightTypeS: '1',
              fullscreen: false,
              ...DEFAULT_COLORS,
            },
            duration: 6000,
          },
          {
            action: {
              speed: 5,
              rotate: true,
            },
            duration: 8000,
          },
          {
            action: {
              speed: 5,
              rotate: false,
              highlightTypeS: '2',
              textColor: COLORS.yellow,
              pageColor: COLORS.dark,
            },
            duration: 8000,
          },
          {
            action: {
              speed: 6,
              rotate: true,
              ...DEFAULT_COLORS,
            },
            duration: 8000,
          },
          {
            action: {
              rotate: false,
              highlightTypeS: '1',
              textColor: COLORS.white,
              pageColor: COLORS.red,
            },
            duration: 8000,
          },
          {
            action: {
              speed: 8,
              rotate: true,
              highlightTypeS: '2',
              textColor: COLORS.blue,
              pageColor: COLORS.yellow,
            },
            duration: 8000,
          },
          {
            action: {
              speed: 9,
              rotate: false,
              ...DEFAULT_COLORS,
            },
            duration: 8000,
          },
          {
            action: {
              speed: 6,
              rotate: true,
              highlightTypeS: '4',
              textColor: COLORS.red,
              pageColor: COLORS.dark,
            },
            duration: 8000,
          },
          {
            action: {
              speed: 9,
              rotate: false,
              highlightTypeS: '2',
              textColor: COLORS.red,
              pageColor: COLORS.white,
            },
            duration: 12000,
          },
          {
            action: {
              speed: 8,
              rotate: true,
              highlightTypeS: '2',
              ...DEFAULT_COLORS,
            },
            duration: 10000,
          },
          {
            action: {
              speed: 7,
              rotate: false,
              highlightTypeS: '2',
              textColor: COLORS.blue,
              pageColor: COLORS.yellow,
              highlightColor: COLORS.pink,
            },
            duration: 10000,
          },
          {
            action: {
              speed: 10,
              rotate: true,
              highlightTypeS: '4',
              ...DEFAULT_COLORS,
            },
            duration: 10000,
          },
          {
            action: {
              speed: 5,
              highlightTypeS: '2',
              rotate: false,
            },
            duration: 20000,
          },
        ],
      },
      {
        name: 'Exercise 4',
        data: [
          {
            action: {
              book: '8',
              speed: 2,
              rotate: false,
              count: 1,
              type: 'scroll',
              highlightTypeS: '1',
              fullscreen: false,
              ...DEFAULT_COLORS,
            },
            duration: 6000,
          },
          {
            action: {
              speed: 5,
              rotate: true,
            },
            duration: 8000,
          },
          {
            action: {
              speed: 5,
              rotate: false,
              highlightTypeS: '2',
              textColor: COLORS.yellow,
              pageColor: COLORS.dark,
            },
            duration: 8000,
          },
          {
            action: {
              speed: 6,
              rotate: true,
              ...DEFAULT_COLORS,
            },
            duration: 8000,
          },
          {
            action: {
              rotate: false,
              highlightTypeS: '1',
              textColor: COLORS.white,
              pageColor: COLORS.red,
            },
            duration: 8000,
          },
          {
            action: {
              speed: 8,
              rotate: true,
              highlightTypeS: '2',
              textColor: COLORS.blue,
              pageColor: COLORS.yellow,
            },
            duration: 8000,
          },
          {
            action: {
              speed: 9,
              rotate: false,
              ...DEFAULT_COLORS,
            },
            duration: 8000,
          },
          {
            action: {
              speed: 6,
              rotate: true,
              highlightTypeS: '4',
              textColor: COLORS.red,
              pageColor: COLORS.dark,
            },
            duration: 8000,
          },
          {
            action: {
              speed: 9,
              rotate: false,
              highlightTypeS: '2',
              textColor: COLORS.red,
              pageColor: COLORS.white,
            },
            duration: 12000,
          },
          {
            action: {
              speed: 8,
              rotate: true,
              highlightTypeS: '2',
              ...DEFAULT_COLORS,
            },
            duration: 10000,
          },
          {
            action: {
              speed: 7,
              rotate: false,
              highlightTypeS: '2',
              textColor: COLORS.blue,
              pageColor: COLORS.yellow,
              highlightColor: COLORS.pink,
            },
            duration: 10000,
          },
          {
            action: {
              speed: 10,
              rotate: true,
              highlightTypeS: '4',
              ...DEFAULT_COLORS,
            },
            duration: 10000,
          },
          {
            action: {
              speed: 5,
              highlightTypeS: '2',
              rotate: false,
            },
            duration: 20000,
          },
        ],
      },
      {
        name: 'Exercise 5',
        data: [
          {
            action: {
              book: '9',
              speed: 4,
              rotate: false,
              count: 1,
              type: 'book',
              highlightTypeS: '1',
              fullscreen: false,
              ...DEFAULT_COLORS,
            },
            duration: 6000,
          },
          {
            action: {
              speed: 4,
              highlightTypeS: '2',
              rotate: true,
            },
            duration: 6000,
          },
          {
            action: {
              speed: 4,
              type: 'zoom',
              highlightTypeS: '2',
              rotate: false,
            },
            duration: 8000,
          },
          {
            action: {
              speed: 6,
              type: 'zoom',
              highlightTypeS: '4',
              rotate: true,
              textColor: COLORS.red,
              pageColor: COLORS.dark,
            },
            duration: 10000,
          },
          {
            action: {
              speed: 6,
              type: 'book',
              highlightTypeS: '2',
              rotate: false,
              ...DEFAULT_COLORS,
            },
            duration: 8000,
          },
          {
            action: {
              speed: 7,
              type: 'zoom',
              highlightTypeS: '2',
            },
            duration: 8000,
          },
          {
            action: {
              speed: 5,
              highlightTypeS: '1',
            },
            duration: 20000,
          },
          {
            action: {
              speed: 10,
              highlightTypeS: '4',
            },
            duration: 8000,
          },
          {
            action: {
              speed: 6,
              highlightTypeS: '2',
            },
            duration: 20000,
          },
        ],
      },
    ],
  },
  {
    name: 'Challenging',
    exercises: [],
  },
  { name: 'Extra challenging', exercises: [] },
]
