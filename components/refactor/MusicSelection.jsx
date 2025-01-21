import { useEffect, useMemo, useRef, useState } from 'react'
import { Select } from '../common'

const SONGS = [
  { name: 'Song 1', src: '/music/1.Ken Davis - Rollercoaster.mp3' },
  { name: 'Song 2', src: '/music/2.Ken Davis - modern world.wav' },
  { name: 'Song 3', src: '/music/1.Ken Davis - Rollercoaster.mp3' },
]

const MusicSelection = ({ exercise }) => {
  const [activeSong, setActiveSong] = useState(null)
  const isDisabled = useMemo(() => exercise && exercise.audio, [exercise])

  const audioRef = useRef(null)
  // Clear active song when exercise changes
  useEffect(() => {
    if (exercise) setActiveSong(null)
  }, [exercise])

  return (
    <div>
      <div className="training-settings__title">Music</div>
      <Select
        value={activeSong?.name || null}
        onChange={(value) => {
          setActiveSong(null)
          setTimeout(() => {
            setActiveSong(SONGS.find((song) => song.name === value))
          }, 100)
        }}
        options={SONGS.map(({ name }) => name)}
        disabled={isDisabled}
      />

      {activeSong && !isDisabled && (
        <audio
          ref={audioRef}
          controls
          autoPlay
          style={{ marginTop: '0.5rem', width: '100%', position: 'relative' }}
        >
          <source src={activeSong.src} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  )
}

export default MusicSelection
