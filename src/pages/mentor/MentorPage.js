import React from 'react'
import {Row, Col} from 'antd'
import glamorous from 'glamorous'
import Loader from '../../components/loader'
import Sentiment from '../../components/sentiment'

export default function MentorPage ({loading, mentor, comments, ...props}) {
  console.log('props', {loading, mentor, comments, ...props})
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Heading mentor={mentor} />
          <br/><br/>
          <h2>Recent Activity</h2>
          <CommentFeed comments={comments} />
        </div>
      )}
    </div>
  )
}

function Heading ({mentor}) {
  return (
    <Row type="flex">
      <Col span={5}>
        <ProfilePicture src={mentor.avatar} />
      </Col>
      <Col span={19}>
        <h2>{mentor.name}</h2>
      </Col>
    </Row>
  )
}

const byLikes = comments => comments.slice().sort((a, b) => b.comment.like_count - a.comment.like_count)

const commentLink = comment => (
  ''
)

function CommentFeed ({comments}) {
  return (
    <div>
      {byLikes(comments).map(({comment, context}) => (
        <CommentRow
          comment={comment}
          context={context}
        />
      ))}
    </div>
  )
}

function CommentRow ({comment, context}) {
  return (
    <div style={{marginBottom: 10}}>
      {comment.message}<br/>
      likes: {comment.like_count} - sentiment: <Sentiment score={comment.sentiment.score} /> - <a href="#">view</a>
    </div>
  )
}

const ProfilePicture = glamorous.img({
  width: 200
})
