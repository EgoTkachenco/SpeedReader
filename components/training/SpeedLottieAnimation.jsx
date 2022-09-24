import Script from 'next/script'
import { useState, useEffect } from 'react'

const SpeedLottieAnimation = ({ speed }) => {
  const [state, setState] = useState({
    ready: false,
    animationData: null,
    animation: null,
  })
  useEffect(() => {
    if (state.ready)
      fetch('/speed-animation.json')
        .then((res) => res.json())
        .then((res) => {
          updateAnimation(res)
        })
  }, [state.ready])
  useEffect(() => {
    if (state.ready) updateAnimation({ ...state.animationData })
  }, [speed])
  const updateAnimation = (animationData) => {
    if (!animationData) return

    let currentFrame = null
    if (state.animation) {
      currentFrame = state.animation.currentFrame
      state.animation.destroy()
    }
    animationData.layers[0].ef[0].ef[0].v.k = parseInt((speed * 270) / 12)

    const container = document.getElementById('speed-animation-view')
    const options = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      renderer: 'svg',
      container,
    }
    const animation = lottie.loadAnimation(options)
    if (currentFrame) animation.goToAndPlay(currentFrame, true)

    setState({ ...state, animationData, animation })
  }
  return (
    <>
      <Script
        src="/lottie.js"
        strategy="lazyOnload"
        onLoad={() => setState({ ...state, ready: true })}
      />
      {state.ready ? <div id="speed-animation-view" /> : <div>Loading</div>}
    </>
  )
}

export default SpeedLottieAnimation
