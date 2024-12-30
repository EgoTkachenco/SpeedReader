export function timeDifferenceInMinutesAndSeconds(time) {
  if (time < 0) {
    return '00:00' // Return 00:00 if the given date is in the future
  }

  // Convert milliseconds to minutes and seconds
  const diffMinutes = Math.floor(time / 60) // Total minutes
  const diffSeconds = Math.floor(time % 60) // Remaining seconds

  // Pad minutes and seconds with leading zeros if needed
  const minutes = String(diffMinutes).padStart(2, '0')
  const seconds = String(diffSeconds).padStart(2, '0')

  return `${minutes}:${seconds}`
}
