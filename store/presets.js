import { COLORS, SIZES } from './constants'

const DEFAULT_COLORS = {
  highlightColor: COLORS.green,
  textColor: COLORS.dark,
  pageColor: COLORS.white,
}

export const PRESETS = [
  {
    name: 'Standard',
    exercises: [
      // {
      //   name: 'TEST',
      //   data: [
      //     {
      //       action: {
      //         book: '5',
      //         speed: 3,
      //         rotate: false,
      //         count: 1,
      //         type: 'book',
      //         highlightTypeS: '1',
      //         fullscreen: false,
      //         ...DEFAULT_COLORS,
      //       },
      //       duration: 4000,
      //     },
      //     {
      //       action: {
      //         speed: 5,
      //       },
      //       duration: 4000,
      //     },
      //   ],
      // },
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
              fontType: SIZES.medium,
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
              fontType: SIZES.medium,
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
              fontType: SIZES.medium,
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
              fontType: SIZES.medium,
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
              fontType: SIZES.medium,
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
    exercises: [
      {
        name: 'Exercise 1',
        video_tutorial:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        audio: '/music/1.Ken Davis - Rollercoaster.mp3',
        data: [
          {
            action: {
              book: '10',
              speed: 1,
              rotate: false,
              count: 1,
              type: 'zoom',
              fullscreen: false,
              fontType: SIZES.medium,
              highlightTypeS: '1',
              ...DEFAULT_COLORS,
            },
            duration: 4000,
          },
          {
            action: {
              speed: 3,
            },
            duration: 4000,
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
              speed: 7,
              rotate: false,
            },
            duration: 4000,
          },

          {
            action: {
              highlightTypeS: '2',
              speed: 2,
            },
            duration: 4000,
          },
          {
            action: {
              speed: 4,
            },
            duration: 4000,
          },
          {
            action: {
              speed: 6,
              rotate: true,
            },
            duration: 8000,
          },
          {
            action: {
              speed: 7,
              rotate: false,
            },
            duration: 4000,
          },

          {
            action: {
              highlightTypeS: '4',
              speed: 3,
            },
            duration: 4000,
          },
          {
            action: {
              speed: 5,
              textColor: COLORS.red,
              pageColor: COLORS.dark,
            },
            duration: 6000,
          },
          {
            action: {
              speed: 6,
              textColor: COLORS.yellow,
            },
            duration: 6000,
          },
          {
            action: {
              speed: 7,
              textColor: COLORS.blue,
              pageColor: COLORS.yellow,
            },
            duration: 8000,
          },

          {
            action: {
              highlightTypeS: '8',
              speed: 3,
              textColor: COLORS.dark,
              pageColor: COLORS.red,
            },
            duration: 10000,
          },
          {
            action: {
              speed: 5,
              textColor: COLORS.blue,
              pageColor: COLORS.yellow,
            },
            duration: 10000,
          },

          {
            action: {
              highlightTypeS: '16',
              speed: 4,
              textColor: COLORS.dark,
              pageColor: COLORS.white,
              rotate: true,
            },
            duration: 10000,
          },
          {
            action: {
              highlightTypeS: '4',
              speed: 3,
              rotate: false,
            },
            duration: 10000,
          },
          {
            action: {
              highlightTypeS: '8',
              speed: 8,
              textColor: COLORS.dark,
              pageColor: COLORS.yellow,
            },
            duration: 10000,
          },
          {
            action: {
              highlightTypeS: '4',
              speed: 8,
              textColor: COLORS.pink,
              pageColor: COLORS.dark,
            },
            duration: 6000,
          },
          {
            action: {
              highlightTypeS: '8',
              speed: 6,
              textColor: COLORS.dark,
              pageColor: COLORS.pink,
            },
            duration: 12000,
          },
          {
            action: {
              highlightTypeS: '2',
              speed: 8,
              textColor: COLORS.dark,
              pageColor: COLORS.white,
            },
            duration: 10000,
          },
          {
            action: {
              highlightTypeS: '1',
              speed: 10,
              rotate: true,
            },
            duration: 10000,
          },
          {
            action: {
              highlightTypeS: '2',
              speed: 6,
              rotate: false,
            },
            duration: 10000,
          },
          {
            action: {
              highlightTypeS: '4',
              speed: 4,
            },
            duration: 10000,
          },
        ],
      },
      {
        name: 'Exercise 2',
        audio: '/music/2.Ken Davis - modern world.wav',
        data: [
          {
            action: {
              book: '11',
              speed: 3,
              rotate: false,
              count: 1,
              type: 'book',
              fullscreen: false,
              fontType: SIZES.medium,
              highlightTypeS: '1',
              ...DEFAULT_COLORS,
            },
            duration: 5000,
          },
          {
            action: {
              highlightTypeS: '16',
              type: 'zoom',
              speed: 6,
              rotate: true,
            },
            duration: 7000,
          },
          {
            action: {
              highlightTypeS: '1',
              type: 'book',
              speed: 4,
              rotate: false,
            },
            duration: 5000,
          },
          {
            action: {
              highlightTypeS: '16',
              type: 'zoom',
              speed: 8,
              textColor: COLORS.red,
              pageColor: COLORS.dark,
            },
            duration: 8000,
          },
          {
            action: {
              highlightTypeS: '1',
              type: 'book',
              speed: 5,
            },
            duration: 5000,
          },
          {
            action: {
              highlightTypeS: '16',
              type: 'zoom',
              speed: 7,
              rotate: true,
              textColor: COLORS.blue,
              pageColor: COLORS.yellow,
            },
            duration: 10000,
          },
          {
            action: {
              highlightTypeS: '1',
              type: 'book',
              speed: 6,
              rotate: false,
              textColor: COLORS.dark,
              pageColor: COLORS.white,
            },
            duration: 8000,
          },
          {
            action: {
              speed: 10,
              rotate: true,
            },
            duration: 8000,
          },
          {
            action: {
              highlightTypeS: '16',
              type: 'zoom',
              rotate: false,
              speed: 9,
              textColor: COLORS.dark,
              pageColor: COLORS.red,
            },
            duration: 6000,
          },
          {
            action: {
              highlightTypeS: '1',
              type: 'book',
              speed: 7,
              textColor: COLORS.dark,
              pageColor: COLORS.white,
            },
            duration: 5000,
          },
          {
            action: {
              highlightTypeS: '16',
              type: 'zoom',
              speed: 4,
            },
            duration: 10000,
          },
          {
            action: {
              highlightTypeS: '1',
              type: 'book',
              speed: 5,
            },
            duration: 5000,
          },
          {
            action: {
              highlightTypeS: '16',
              type: 'zoom',
              rotate: true,
              speed: 10,
            },
            duration: 10000,
          },
          {
            action: {
              rotate: false,
              speed: 10,
              textColor: COLORS.dark,
              pageColor: COLORS.orange,
            },
            duration: 8000,
          },
          {
            action: {
              speed: 8,
              textColor: COLORS.dark,
              pageColor: COLORS.white,
            },
            duration: 5000,
          },
          {
            action: {
              speed: 8,
              rotate: true,
            },
            duration: 8000,
          },
          {
            action: {
              rotate: false,
              speed: 6,
            },
            duration: 8000,
          },
          {
            action: {
              speed: 5,
            },
            duration: 5000,
          },
          {
            action: {
              highlightTypeS: '1',
              type: 'book',
              speed: 5,
            },
            duration: 15000,
          },
        ],
      },
      {
        name: 'Exercise 3',
        data: [
          {
            action: {
              book: '1',
              speed: 2,
              rotate: false,
              count: 1,
              type: 'rolling',
              fullscreen: false,
              fontType: SIZES.medium,
              highlightTypeS: '1',
              words: 2,
              ...DEFAULT_COLORS,
            },
            duration: 4000,
          },
          {
            action: {
              speed: 4,
              words: 2,
            },
            duration: 4000,
          },
          {
            action: {
              speed: 6,
              words: 2,
            },
            duration: 4000,
          },
          {
            action: {
              rotate: true,
              speed: 8,
              words: 2,
            },
            duration: 6000,
          },

          {
            action: {
              rotate: false,
              speed: 3,
              words: 3,
            },
            duration: 4000,
          },
          {
            action: {
              speed: 5,
              words: 3,
            },
            duration: 4000,
          },
          {
            action: {
              speed: 7,
              words: 3,
            },
            duration: 4000,
          },
          {
            action: {
              rotate: true,
              speed: 9,
              words: 3,
            },
            duration: 6000,
          },

          {
            action: {
              rotate: false,
              speed: 4,
              words: 4,
            },
            duration: 4000,
          },
          {
            action: {
              speed: 6,
              words: 4,
            },
            duration: 4000,
          },
          {
            action: {
              speed: 8,
              words: 4,
            },
            duration: 4000,
          },
          {
            action: {
              rotate: true,
              speed: 10,
              words: 4,
            },
            duration: 6000,
          },

          {
            action: {
              rotate: false,
              speed: 5,
              words: 5,
            },
            duration: 4000,
          },
          {
            action: {
              speed: 6,
              words: 5,
            },
            duration: 4000,
          },
          {
            action: {
              speed: 7,
              words: 5,
            },
            duration: 4000,
          },
          {
            action: {
              rotate: true,
              speed: 8,
              words: 5,
            },
            duration: 6000,
          },

          {
            action: {
              rotate: false,
              words: null,
              speed: 2,
              highlightTypeS: '1',
            },
            duration: 4000,
          },
          {
            action: {
              words: null,
              speed: 3,
              highlightTypeS: '1',
              textColor: COLORS.blue,
            },
            duration: 4000,
          },
          {
            action: {
              words: null,
              speed: 4,
              highlightTypeS: '1',
              textColor: COLORS.black,
            },
            duration: 4000,
          },
          {
            action: {
              words: null,
              speed: 5,
              highlightTypeS: '1',
              textColor: COLORS.red,
            },
            duration: 4000,
          },
          {
            action: {
              words: null,
              speed: 6,
              highlightTypeS: '1',
              textColor: COLORS.green,
            },
            duration: 4000,
          },
          {
            action: {
              words: null,
              speed: 7,
              highlightTypeS: '1',
              textColor: COLORS.black,
            },
            duration: 4000,
          },
          {
            action: {
              words: null,
              rotate: true,
              speed: 9,
              highlightTypeS: '1',
              textColor: COLORS.black,
            },
            duration: 6000,
          },
          {
            action: {
              words: null,
              rotate: false,
              speed: 8,
              highlightTypeS: '1',
              textColor: COLORS.black,
            },
            duration: 10000,
          },

          {
            action: {
              words: null,
              rotate: false,
              speed: 4,
              highlightTypeS: '2',
              textColor: COLORS.black,
            },
            duration: 4000,
          },
          {
            action: {
              words: null,
              rotate: true,
              speed: 7,
              highlightTypeS: '2',
              textColor: COLORS.black,
            },
            duration: 6000,
          },
          {
            action: {
              words: null,
              rotate: false,
              speed: 5,
              highlightTypeS: '2',
              textColor: COLORS.black,
            },
            duration: 4000,
          },
          {
            action: {
              words: null,
              rotate: false,
              speed: 6,
              highlightTypeS: '2',
              textColor: COLORS.blue,
            },
            duration: 4000,
          },
          {
            action: {
              words: null,
              rotate: false,
              speed: 6,
              highlightTypeS: '2',
              textColor: COLORS.red,
            },
            duration: 4000,
          },
          {
            action: {
              words: null,
              rotate: false,
              speed: 6,
              highlightTypeS: '2',
              textColor: COLORS.green,
            },
            duration: 4000,
          },
          {
            action: {
              words: null,
              rotate: false,
              speed: 6,
              highlightTypeS: '2',
              textColor: COLORS.yellow,
            },
            duration: 4000,
          },
          {
            action: {
              words: null,
              rotate: false,
              speed: 6,
              highlightTypeS: '2',
              textColor: COLORS.orange,
            },
            duration: 4000,
          },
          {
            action: {
              words: null,
              rotate: false,
              speed: 6,
              highlightTypeS: '2',
              textColor: COLORS.violet,
            },
            duration: 4000,
          },

          {
            action: {
              words: null,
              rotate: true,
              speed: 10,
              highlightTypeS: '2',
              textColor: COLORS.black,
            },
            duration: 6000,
          },
          {
            action: {
              words: null,
              rotate: false,
              speed: 7,
              highlightTypeS: '2',
              textColor: COLORS.black,
            },
            duration: 10000,
          },
          {
            action: {
              words: null,
              rotate: false,
              speed: 6,
              highlightTypeS: '2',
              textColor: COLORS.black,
            },
            duration: 10000,
          },
          {
            action: {
              words: null,
              rotate: false,
              speed: 5,
              highlightTypeS: '2',
              textColor: COLORS.black,
            },
            duration: 20000,
          },
        ],
      },
    ],
  },
  { name: 'Extra challenging', exercises: [] },
]
