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
              speed: 2,
              rotate: false,
              count: 1,
              type: 'book',
              highlightTypeS: '1',
              ...DEFAULT_COLORS,
            },
            duration: 8000,
          },
          {
            action: {
              speed: 4,
              rotate: true,
            },
            duration: 5000,
          },
          {
            action: {
              speed: 3,
              rotate: false,
            },
            duration: 8000,
          },
          {
            action: {
              rotate: true,
              speed: 6,
            },
            duration: 8000,
          },
          {
            action: {
              rotate: false,
              speed: 4,
            },
            duration: 8000,
          },
          {
            action: {
              speed: 8,
              highlightColor: COLORS.pink,
              textColor: COLORS.blue,
              pageColor: COLORS.yellow,
              rotate: true,
            },
            duration: 8000,
          },
          {
            action: {
              speed: 7,
              rotate: false,
              ...DEFAULT_COLORS,
            },
            duration: 8000,
          },
          {
            action: {
              speed: 6,
            },
            duration: 8000,
          },
          {
            action: {
              highlightTypeS: '2',
              highlightColor: COLORS.pink,
              textColor: COLORS.blue,
              pageColor: COLORS.yellow,
              rotate: true,
              speed: 9,
            },
            duration: 12000,
          },
          {
            action: {
              speed: 8,
            },
            duration: 8000,
          },
          {
            action: {
              speed: 7,
              rotate: false,
              ...DEFAULT_COLORS,
            },
            duration: 20000,
          },
        ],
      },
      {
        name: 'Exercise 2',
        data: [
          {
            action: {
              speed: 2,
              rotate: false,
              count: 1,
              type: 'book',
              highlightTypeS: '1',
              ...DEFAULT_COLORS,
            },
            duration: 2000,
          },
          {
            action: {
              speed: 8,
              highlightColor: COLORS.pink,
              textColor: COLORS.blue,
              pageColor: COLORS.yellow,
              rotate: true,
            },
            duration: 2000,
          },
          {
            action: {
              speed: 2,
              rotate: false,
              count: 1,
              type: 'book',
              highlightTypeS: '1',
              ...DEFAULT_COLORS,
            },
            duration: 2000,
          },
          {
            action: {
              speed: 8,
              highlightColor: COLORS.pink,
              textColor: COLORS.blue,
              pageColor: COLORS.yellow,
              rotate: true,
            },
            duration: 2000,
          },
          {
            action: {
              speed: 2,
              rotate: false,
              count: 1,
              type: 'book',
              highlightTypeS: '1',
              ...DEFAULT_COLORS,
            },
            duration: 2000,
          },
          {
            action: {
              speed: 8,
              highlightColor: COLORS.pink,
              textColor: COLORS.blue,
              pageColor: COLORS.yellow,
              rotate: true,
            },
            duration: 2000,
          },
        ],
      },
      {
        name: 'Exercise 3',
        data: [],
      },
      {
        name: 'Exercise 4',
        data: [],
      },
      {
        name: 'Exercise 5',
        data: [],
      },
    ],
  },
  {
    name: 'Challenging',
    exercises: [],
  },
  { name: 'Extra challenging', exercises: [] },
]
