import { useState, useEffect } from 'react'
import ReaderConfigurator from './ReaderConfigurator'
// import ReaderViewer from './ReaderViewer'
import Script from 'next/script'

const DEFAULT_CONFIG = {
  speed: 50,
  highlightColor: '#afff83',
  textColor: '#000000',
  pageColor: '#ffffff',
  rotate: false,
  zoom: false,
  // highlightTypeS: 4,
  // highlightTypeV: 1,
  // booksNumber: 1,
  book: '1',
  animationData: null,
}

export default function SpeedReader() {
  // Animation Configuration
  const [config, setConfig] = useState(null)
  // Lottie lib ready for use
  const [ready, setReady] = useState(false)
  // Animation
  const [animation, setAnimation] = useState(null)
  // Loade config from locale storage and animation data

  useEffect(() => {
    if (!process.browser) return
    const localeConfig = localStorage.getItem('speed-reader-config')
    setConfig(localeConfig ? JSON.parse(localeConfig) : DEFAULT_CONFIG)
    console.log('Init config:', localeConfig)
  }, [])
  useEffect(() => {
    if (ready)
      fetch('/books/book_1.json')
        .then((res) => res.json())
        .then((res) => {
          const newConfig = { ...config, animationData: res }
          updateConfig(newConfig)
          updateAnimation(newConfig, true)
        })
  }, [ready])

  const changeConfig = (key, value) => {
    if (config.hasOwnProperty(key)) {
      let formatedValue = value
      let initAnimation = false
      let restartAnimation = false
      switch (key) {
        case 'speed':
          if (animation) animation.setSpeed(formatedValue / 100)
          break
        case 'rotate':
        case 'zoom':
          formatedValue = !config[key]
          break
        case 'highlightColor':
        case 'textColor':
        case 'pageColor':
          initAnimation = true
          break
        case `book`:
          // case `bookNumber`:
          initAnimation = true
          restartAnimation = true
          break
      }
      const newConfig = { ...config, [key]: formatedValue }
      updateConfig(newConfig)
      if (initAnimation) updateAnimation(newConfig, restartAnimation)
    }
  }

  const updateConfig = (newConfig) => {
    setConfig(newConfig)
    localStorage.setItem(
      'speed-reader-config',
      JSON.stringify({ ...newConfig, animationData: null })
    )
  }

  const updateAnimation = (configData, restartAnimation) => {
    debugger
    if (animation) animation.destroy()

    const currentFrame = animation ? animation.currentFrame : null
    let animationData = configData.animationData

    if (!animationData) return

    // update colors
    animationData.layers[0].ef[4].ef[0].v.k = hexToRgbA(
      configData.highlightColor
    )
    animationData.layers[0].ef[2].ef[0].v.k = hexToRgbA(configData.pageColor)
    animationData.layers[0].ef[3].ef[0].v.k = hexToRgbA(configData.textColor)

    // line types update
    animationData.layers[0].ef[1].ef[0].v.k = parseInt(
      configData.highlightTypeS
    )
    animationData.layers[0].ef[1].ef[0].v.k = parseInt(
      configData.highlightTypeV
    )

    // book
    animationData.layers[0].ef[0].ef[0].v.k = parseInt(configData.book)

    const container = document.getElementById('reader-view')

    const options = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      renderer: 'svg',
      container,
    }

    const newAnimation = lottie.loadAnimation(options)
    newAnimation.setSpeed(configData.speed / 100)
    if (!restartAnimation) newAnimation.goToAndPlay(currentFrame, true)
    setAnimation(newAnimation)
  }

  return (
    <div className="container-fluid h-100">
      <div className="row">
        <div className="col-12 col-md-4 custom-form">
          {config && (
            <ReaderConfigurator config={config} onChange={changeConfig} />
          )}
        </div>
        <div className="col-12 col-md-8 align-self-center">
          <Script
            src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.6.4/lottie_svg.min.js"
            strategy="lazyOnload"
            onLoad={() => setReady(true)}
          />
          {ready ? (
            <div
              id="reader-view"
              style={{
                transform: `${config.rotate ? 'rotate(180deg)' : ''} ${
                  config.zoom ? 'scale(1.1)' : ''
                }`,
              }}
            />
          ) : (
            <div>Loading</div>
          )}
        </div>
      </div>
    </div>
  )
}

function scaleRGB(n) {
  return Math.round((n / 255) * 100) / 100
}

function hexToRgbA(hex) {
  var c
  var list = []

  hex = hex.trim()
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('')
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]]
    }
    c = '0x' + c.join('')
    list.push(scaleRGB((c >> 16) & 255))
    list.push(scaleRGB((c >> 8) & 255))
    list.push(scaleRGB(c & 255))
    list.push(1)
    return list
  }
  return hexToRgbA('#000000')
}
