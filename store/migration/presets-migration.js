const DATA = require('./data.json')
const fs = require('fs')

const initial_state = {
  speed: 1,
  highlightColor: '#AE1CE1',
  textColor: '#FFFFFF',
  pageColor: '#2A2B43',
  rotate: false,
  highlightTypeS: '',
  highlightTypeV: '1',
  count: 1,
  type: 'book',
  fontType: {
    title: 'Small',
    key: 'small',
    fontSize: '0.8rem',
    page: 35,
    row: 70,
  },
  fullscreen: false,
  words: null,
}

function migratePresets() {
  const result = []
  for (let i = 0; i < DATA.length; i++) {
    const preset = DATA[i]
    const new_preset = { ...preset, exercises: [] }
    for (let j = 0; j < preset.exercises.length; j++) {
      const exercise_data = preset.exercises[j].data
      const new_exercise_data = migrate_exercise(exercise_data)
      new_preset.exercises.push({
        ...preset.exercises[j],
        data: new_exercise_data,
      })
    }
    result.push(new_preset)
  }

  fs.writeFileSync('./data-updated.json', JSON.stringify(result))
}

function migrate_exercise(exercise_data) {
  let result = []
  let settings = { ...initial_state }
  for (let i = 0; i < exercise_data.length; i++) {
    const level = exercise_data[i]
    settings = get_new_state(settings, level.action)
    result.push({ ...level, action: settings })
  }
  return result
}

function get_new_state(state = initial_state, updates) {
  let result = { ...state, ...updates }
  if (!updates.hasOwnProperty('book')) delete result.book
  if (!updates.hasOwnProperty('count')) delete result.count
  if (!updates.hasOwnProperty('type')) delete result.count
  if (!updates.hasOwnProperty('fontType')) delete result.fontType
  return result
}

migratePresets()
