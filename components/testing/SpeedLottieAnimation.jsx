import Script from 'next/script'
import { useState, useEffect } from 'react'

const SpeedLottieAnimation = ({ speed, id = 'speed-animation-view' }) => {
  useEffect(() => {
    if (window && window.lottie) {
      console.log('Window Lottie Effect')
      setState({ ...state, ready: true })
    }
  }, [window.lottie])

  const [state, setState] = useState({
    ready: false,
    animationData: null,
    animation: null,
  })

  useEffect(() => {
    console.log('ready effect')
    if (state.ready)
      fetch('/speed-animation.json')
        .then((res) => res.json())
        .then((res) => {
          console.log('ready effect then')
          updateAnimation(res)
        })
  }, [state.ready])

  useEffect(() => {
    if (state.ready && state.animationData)
      updateAnimation({ ...state.animationData })
  }, [speed])

  const updateAnimation = (animationData) => {
    console.log('updateAnimation')
    if (!animationData) return
    console.log('updateAnimation animation exist', { ...animationData })
    let currentFrame = null
    debugger
    if (state.animation) {
      currentFrame = state.animation.currentFrame
      state.animation.destroy()
    }
    if (animationData?.layers[0]?.ef[0]?.ef[0]?.v)
      animationData.layers[0].ef[0].ef[0].v.k = parseInt((speed * 270) / 12)

    const container = document.getElementById(id)
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
        onLoad={() => {
          console.log('onload')
          setState({ ...state, ready: true })
        }}
      />
      {state.ready ? <div id={id} /> : <div>Loading</div>}
    </>
  )
}

export default SpeedLottieAnimation
