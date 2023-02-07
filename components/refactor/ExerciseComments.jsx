import { useState, useEffect } from 'react'
import { Button } from '../common'
import user_store from '../../store/'
import { COMMENT_API } from '../../store/api'

const ExerciseComments = ({ exercise }) => {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  useEffect(() => {
    if (exercise)
      COMMENT_API.getComments(exercise.id).then((comments) => {
        setComments(comments)
      })
  }, [exercise])

  const createComment = () => {
    const data = {
      exerciseId: exercise.id,
      content: newComment,
      userId: user_store.user.id,
      username: user_store.user.slug,
    }
    COMMENT_API.createComment(data).then((comment) => {
      setNewComment('')
      setComments([...comments, comment])
    })
  }

  return (
    <div className="exercise-comments">
      <div className="exercise-comments-new">
        <textarea
          name="comment"
          id="comment"
          placeholder="Write your comment"
          rows="4"
          className="exercise-comments__textarea"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <Button onClick={createComment}>Send</Button>
      </div>
      {comments.map((comment) => (
        <div className="exercise-coaching-card" key={comment.id}>
          <div className="exercise-coaching-card-top">{comment.username}</div>
          <div className="exercise-coaching-card__text">{comment.content}</div>
        </div>
      ))}
    </div>
  )
}

export default ExerciseComments
