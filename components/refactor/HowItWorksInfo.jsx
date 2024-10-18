import { useState } from 'react'
import { Button, Modal } from '../common'

const tutorial_video_url =
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'

const HowItWorksInfo = ({}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>How it works</Button>
      <Modal show={isOpen} onClose={() => setIsOpen(false)}>
        <div className="exercise-tutorial">
          <div className="exercise-tutorial__title">How it works</div>
          <div className="exercise-tutorial__text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
            magni repellat maxime rerum, quo laboriosam sequi suscipit.
            Consequuntur accusantium neque velit natus itaque sed
            exercitationem, laudantium voluptates nostrum odit laborum?
          </div>
          <video
            src={tutorial_video_url}
            controls
            className="exercise-tutorial__video"
          />
        </div>
      </Modal>
    </>
  )
}

export default HowItWorksInfo
