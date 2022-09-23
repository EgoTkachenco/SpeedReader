import Script from 'next/script'
import { useState, useEffect } from 'react'

const SpeedLottieAnimation = ({ speed }) => {
  // Lottie lib ready for use
  const [ready, setReady] = useState(false)
  // Animation
  const [animation, setAnimation] = useState(null)
  const [animationData, setAnimationData] = useState(null)
  // Loade config from locale storage and animation data
  useEffect(() => {
    if (ready)
      fetch('/speed-animation.json')
        .then((res) => res.json())
        .then((res) => {
          updateAnimation(res)
        })
  }, [ready])
  useEffect(() => {
    if (ready) updateAnimation(animationData)
  }, [speed])
  const updateAnimation = (animationData) => {
    if (animation) animation.destroy()

    const currentFrame = animation.currentFrame

    if (!animationData) return

    animationData.layers[0].ef[0].ef[0].v.k = parseInt((speed * 270) / 12)

    const container = document.getElementById('speed-animation-view')
    setAnimationData(animationData)
    const options = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      renderer: 'svg',
      container,
    }

    const newAnimation = lottie.loadAnimation(options)
    newAnimation.goToAndPlay(currentFrame, true)
    setAnimation(newAnimation)
  }
  return (
    <>
      <Script
        src="/lottie.js"
        strategy="lazyOnload"
        onLoad={() => setReady(true)}
      />
      {ready ? <div id="speed-animation-view" /> : <div>Loading</div>}
    </>
  )
}

export default SpeedLottieAnimation
